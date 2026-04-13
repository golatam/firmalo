#!/usr/bin/env node
/**
 * Send SEO report to Slack (Block Kit) — Firmalo.io
 *
 * Usage:
 *   node seo-tracking/scripts/notify-slack.mjs [--test]
 *
 * Env vars: SLACK_BOT_TOKEN, SLACK_CHANNEL_ID
 */

import { loadEnv, requireEnv } from './env.mjs';
import { NOISE_THRESHOLD } from '../config.mjs';

loadEnv();

// ─── Cluster labels ─────────────────────────────────────────────────

const CLUSTER_LABELS = {
  core: 'Firma PDF',
  feature: 'Funciones',
  usecase: 'Casos de uso',
  competitor: 'Alternativas',
  unknown: 'Otro',
};

const CLUSTER_EMOJI = {
  core: ':page_facing_up:',
  feature: ':wrench:',
  usecase: ':briefcase:',
  competitor: ':vs:',
  unknown: ':grey_question:',
};

const CLUSTER_ORDER = ['core', 'feature', 'usecase', 'competitor', 'unknown'];

// ─── Slack helpers ──────────────────────────────────────────────────

async function postMessage(token, channel, blocks, text, attachments) {
  const payload = { channel, text, blocks };
  if (attachments) payload.attachments = attachments;

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}${data.response_metadata?.messages ? ' — ' + data.response_metadata.messages.join(', ') : ''}`);
  }
  return data;
}

// ─── Format helpers ─────────────────────────────────────────────────

function posChangeText(c) {
  if (c.isNewlyTracked && c.currentPosition !== null) {
    return `-> *${c.currentPosition}* _(new)_`;
  }
  if (c.previousPosition === null && c.currentPosition !== null) {
    return `NEW -> *${c.currentPosition}*`;
  }
  if (c.previousPosition !== null && c.currentPosition === null) {
    return `${c.previousPosition} -> *OUT*`;
  }
  if (c.previousPosition === null && c.currentPosition === null) {
    return `N/A`;
  }
  const arrow = c.change > 0 ? ':arrow_up:' : c.change < 0 ? ':arrow_down:' : '->';
  const sign = c.change > 0 ? `+${c.change}` : `${c.change}`;
  const changeStr = c.change !== 0 ? ` (${sign})` : '';
  return `${c.previousPosition} -> *${c.currentPosition}* ${arrow}${changeStr}`;
}

// ─── Format report for Slack Block Kit ──────────────────────────────

export function formatReport(report) {
  const { summary, changes, currentDate, previousDate } = report;
  const blocks = [];

  blocks.push({
    type: 'header',
    text: { type: 'plain_text', text: ':bar_chart: SEO report: firmalo.io', emoji: true },
  });

  blocks.push({
    type: 'context',
    elements: [{ type: 'mrkdwn', text: `${previousDate} -> ${currentDate}` }],
  });

  blocks.push({ type: 'divider' });

  const avgChange = summary.avgPosition - summary.prevAvgPosition;
  const avgDir = avgChange < 0 ? `:arrow_up: ${Math.abs(avgChange).toFixed(1)}` : avgChange > 0 ? `:arrow_down: ${avgChange.toFixed(1)}` : '-> 0';

  const summaryFields = [
    { type: 'mrkdwn', text: `:key: *Keywords:* ${summary.totalKeywords}` },
    { type: 'mrkdwn', text: `:dart: *Avg:* ${summary.prevAvgPosition} -> ${summary.avgPosition} (${avgDir})` },
    { type: 'mrkdwn', text: `:white_check_mark: Improved: *${summary.improved}*` },
    { type: 'mrkdwn', text: `:x: Declined: *${summary.declined}*` },
    { type: 'mrkdwn', text: `:arrow_right: Unchanged: *${summary.unchanged}*` },
  ];

  if (summary.noData > 0) summaryFields.push({ type: 'mrkdwn', text: `N/A: *${summary.noData}*` });
  if (summary.newInTop > 0) summaryFields.push({ type: 'mrkdwn', text: `:new: Entered TOP: *${summary.newInTop}*` });
  if (summary.droppedFromTop > 0) summaryFields.push({ type: 'mrkdwn', text: `:skull: Left TOP: *${summary.droppedFromTop}*` });

  blocks.push({ type: 'section', text: { type: 'mrkdwn', text: '*Summary*' } });
  blocks.push({ type: 'section', fields: summaryFields.slice(0, 10) });

  // Alerts
  const alerts = changes.filter(c =>
    !c.isNewlyTracked && (
      (c.previousPosition !== null && c.currentPosition === null) ||
      (c.change !== null && c.change < -5)
    )
  );

  const attachments = [];

  if (alerts.length > 0) {
    const alertLines = alerts.slice(0, 10).map(a =>
      `:red_circle: "${a.keyword}" ${posChangeText(a)}`
    );
    attachments.push({
      color: '#E01E5A',
      blocks: [{
        type: 'section',
        text: { type: 'mrkdwn', text: `*:warning: Alerts*\n${alertLines.join('\n')}` },
      }],
    });
  }

  // Cluster summary
  blocks.push({ type: 'divider' });
  blocks.push({ type: 'section', text: { type: 'mrkdwn', text: '*By cluster*' } });

  const byCluster = {};
  for (const c of changes) {
    const cat = c.category || 'unknown';
    if (!byCluster[cat]) byCluster[cat] = [];
    byCluster[cat].push(c);
  }

  const clusterLines = [];
  for (const cat of CLUSTER_ORDER) {
    const clusterChanges = byCluster[cat];
    if (!clusterChanges || clusterChanges.length === 0) continue;
    const emoji = CLUSTER_EMOJI[cat] || ':grey_question:';
    const label = CLUSTER_LABELS[cat] || cat;
    const imp = clusterChanges.filter(c => c.change !== null && c.change > 0).length;
    const dec = clusterChanges.filter(c => c.change !== null && c.change < 0).length;
    clusterLines.push(`${emoji} *${label}:* +${imp} -${dec} (${clusterChanges.length})`);
  }

  if (clusterLines.length > 0) {
    blocks.push({ type: 'section', text: { type: 'mrkdwn', text: clusterLines.join('\n') } });
  }

  // Top improvements
  const improved = changes
    .filter(c => c.change !== null && c.change > NOISE_THRESHOLD && !c.isNewlyTracked)
    .sort((a, b) => b.change - a.change)
    .slice(0, 10);

  if (improved.length > 0) {
    const lines = improved.map(c => {
      const clEmoji = CLUSTER_EMOJI[c.category] || '';
      return `${clEmoji} :large_green_circle: "${c.keyword}" ${posChangeText(c)}`;
    });
    attachments.push({
      color: '#2EB67D',
      blocks: [{ type: 'section', text: { type: 'mrkdwn', text: `*:chart_with_upwards_trend: Top improvements*\n${lines.join('\n')}` } }],
    });
  }

  // Top declines
  const declined = changes
    .filter(c => c.change !== null && c.change < -NOISE_THRESHOLD && !c.isNewlyTracked)
    .sort((a, b) => a.change - b.change)
    .slice(0, 10);

  if (declined.length > 0) {
    const lines = declined.map(c => {
      const clEmoji = CLUSTER_EMOJI[c.category] || '';
      return `${clEmoji} :small_red_triangle_down: "${c.keyword}" ${posChangeText(c)}`;
    });
    attachments.push({
      color: '#ECB22E',
      blocks: [{ type: 'section', text: { type: 'mrkdwn', text: `*:chart_with_downwards_trend: Notable declines*\n${lines.join('\n')}` } }],
    });
  }

  blocks.push({ type: 'divider' });
  blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text: '_Firmalo.io SEO tracker_' }] });

  const text = `SEO report ${previousDate} -> ${currentDate}: +${summary.improved} -${summary.declined} (${summary.totalKeywords} keywords)`;

  return { blocks, attachments, text };
}

export function formatSnapshot(snapshot) {
  const { date, entries, comment } = snapshot;
  const inTop10 = entries.filter(e => e.position !== null && e.position <= 10).length;
  const inTop30 = entries.filter(e => e.position !== null && e.position <= 30).length;
  const outOfTop = entries.filter(e => e.position === null).length;

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: ':round_pushpin: Position snapshot — firmalo.io', emoji: true } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: date + (comment ? ` — _${comment}_` : '') }] },
    { type: 'divider' },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `:key: *Keywords:* ${entries.length}` },
        { type: 'mrkdwn', text: `:trophy: *TOP-10:* ${inTop10}` },
        { type: 'mrkdwn', text: `:bar_chart: *TOP-30:* ${inTop30}` },
        { type: 'mrkdwn', text: `N/A: *${outOfTop}*` },
      ],
    },
    { type: 'divider' },
    { type: 'context', elements: [{ type: 'mrkdwn', text: '_Firmalo.io SEO tracker_' }] },
  ];

  return { blocks, attachments: [], text: `Position snapshot ${date}: ${entries.length} keywords, TOP-10: ${inTop10}` };
}

// ─── Main ────────────────────────────────────────────────────────────

export async function sendSlackReport(reportOrSnapshot, type = 'report') {
  const token = requireEnv('SLACK_BOT_TOKEN', 'Bot User OAuth Token from Slack App (xoxb-...)');
  const channel = requireEnv('SLACK_CHANNEL_ID', 'Slack channel ID');

  const { blocks, attachments, text } = type === 'report'
    ? formatReport(reportOrSnapshot)
    : formatSnapshot(reportOrSnapshot);

  await postMessage(token, channel, blocks, text, attachments.length > 0 ? attachments : undefined);
  console.log('   Sent to Slack');
}

// Test mode
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.includes('--test')) {
    const token = requireEnv('SLACK_BOT_TOKEN');
    const channel = requireEnv('SLACK_CHANNEL_ID');
    const blocks = [
      { type: 'header', text: { type: 'plain_text', text: ':test_tube: Firmalo SEO tracker test', emoji: true } },
      { type: 'section', text: { type: 'mrkdwn', text: 'Bot is working! Reports will be sent here.' } },
      { type: 'context', elements: [{ type: 'mrkdwn', text: '_Firmalo.io SEO tracker_' }] },
    ];
    await postMessage(token, channel, blocks, 'Firmalo SEO tracker test — bot is working!');
    console.log('Test message sent to Slack!');
  } else {
    console.log('Usage: node seo-tracking/scripts/notify-slack.mjs --test');
  }
}
