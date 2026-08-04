# ТЗ: регистрация firmalo в standalone Topvisor-реестре seo-tracker

**Дата:** 2026-08-04
**Основание:** `seo-tracker/STATUS.md`, раздел «Осталось» — «Зарегистрировать firmalo дескриптором; решить судьбу legacy reusable workflow».
**Репозитории:** `seo-tracker` (`/Volumes/Kirill_HDD/_CLAUDE/seo-tracker`), `firmalo` (этот репозиторий, `golatam/firmalo`).

---

## 0. Контекст

`seo-tracker` сменил архитектуру (решение 2026-06-29): вместо reusable-workflow, который каждый сайт подключает к себе в репозиторий, теперь один central-сервис мониторит много сайтов через дескрипторы `projects/<id>.json`. Источник позиций — Topvisor (read-only чтение уже собранной истории), не GSC average position.

golatam этот переход уже прошёл: `projects/golatam.json` в статусе `active`, `data/golatam/semantic-core.json` на месте, снапшоты идут через Topvisor. firmalo остался на старом пути: `.github/workflows/seo-weekly.yml` в этом репозитории зовёт `golatam/seo-tracker/.github/workflows/weekly-check.yml` cross-repo, источник позиций там — GSC/Slack-путь (`RANK_SOURCE` не задан явно, ждёт дефолта в самом пакете).

**Важная находка:** часть подготовительной работы для firmalo в Topvisor уже сделана 2026-06-30 (см. `seo-tracking/topvisor-setup-2026-06-30.md`) — Topvisor-проект создан, 80 ключевых фраз импортированы. Просто финальный шаг — регистрация дескриптором в `seo-tracker` — не был сделан. Ниже — что уже готово и что осталось сделать руками.

---

## 1. Что уже готово (проверить, не создавать заново)

- **Topvisor-проект существует**: ID `29516939`, URL в Topvisor — `firmalo.app`, 80 ключевых фраз, 17 групп импорта, движок Google desktop, глубина Top 10. Checker (`checker/go`, платный запуск) **не запускался** — это подтверждено в `topvisor-setup-2026-06-30.md`, ничего страшного оплачено не было.
- **Список регионов задокументирован**, но не факт, что все они реально добавлены как searcher'ы в самом проекте Topvisor — в файле 19 стран LATAM+ES с региональными индексами, но фраза «Added Google desktop, depth 1» не уточняет, для каких именно регионов. **Это надо проверить в Topvisor UI перед регистрацией** (см. чек-лист (a)).
- **Список отслеживаемых ключей есть в CSV**: `seo-tracking/rank-tracker-import-2026-06-30.csv` — 80 строк, `keyword,url,lang,page_title,page_category,priority,intent,engine,core_status,tracker_policy,reason`. Это и есть тот набор, что реально лежит в Topvisor-проекте.
- **Старый `semantic-core.json`** (`seo-tracking/semantic-core.json`) устарел относительно этого набора: 20 страниц / 63 ключа, только `/es/` и `/pt/` базовые страницы без восьми Wave 1 страниц из `tracking-vs-backlog-2026-06-30.md` (`firmar-pdf-sin-imprimir` и т.п.). Кластеры в нём — в старом Slack-формате эмодзи (`:page_facing_up:`), не unicode.
- **Расширенный черновик core** — `seo-tracking/semantic-core.expanded-2026-06-30.json` (36 страниц, 263 ключа) — это карта спроса и backlog, **не** список для трекинга (см. `tracking-vs-backlog-2026-06-30.md`, раздел «Policy: core vs tracker»). Не копировать 1-в-1 в `data/firmalo/semantic-core.json`.

## 2. Несостыковка, которую нужно решить до регистрации

**Домен.** Topvisor-проект создан на `firmalo.app`. Продакшн-домен по `STATUS.md` и текущему caller-yaml (`seo-weekly.yml`) — `https://firmalo.io`. Нужно вручную проверить в Topvisor UI, какой домен реально в проекте, и либо:
- поправить домен в самом Topvisor-проекте на `firmalo.io` (если `.app` — ошибка при создании), либо
- если `.app` — сознательный редирект/алиас, зафиксировать это явно и использовать `firmalo.io` в дескрипторе (`domain`, `siteUrl`, `siteProperty`) независимо от того, что видит Topvisor, — GSC/индексация всё равно идёт по продакшн-домену.

Без этой проверки дескриптор рискует смотреть не на тот домен, что реально в проде.

---

## 3. Чек-лист регистрации

### (a) Проверить/донастроить Topvisor-проект

- [ ] Открыть проект `29516939` в Topvisor UI, свериться с `topvisor-setup-2026-06-30.md`.
- [ ] Уточнить и зафиксировать домен (см. раздел 2).
- [ ] Проверить, какие регионы/searcher'ы реально добавлены — не по документу-плану, а по факту в проекте. Собрать финальный список `topvisorRegions` как comma-separated индексы (по образцу golatam: `"1,2"`).
- [ ] Проверить, что 80 ключей из `rank-tracker-import-2026-06-30.csv` действительно все в проекте (могло разойтись за месяц). Если нужно добавить новые — использовать `node scripts/import-topvisor-keywords.mjs firmalo <csv-path> --dry-run` из `seo-tracker` (сначала `--dry-run`, потом без флага). Скрипт **не запускает** платный checker.
- [ ] Убедиться, что `TOPVISOR_USER_ID`/`TOPVISOR_API_TOKEN` в `seo-tracker/.env` — тот же аккаунт, что владеет проектом `29516939` (сейчас там же лежат креды golatam — один `.env` = один Topvisor-аккаунт на весь central-сервис, это ограничение архитектуры, см. `docs/architecture/2026-06-29-standalone-topvisor-service.md`, раздел «Consequences»).

### (b) Собрать `data/firmalo/semantic-core.json`

- [ ] Взять за основу `rank-tracker-import-2026-06-30.csv` (80 ключей — то, что реально трекается в Topvisor), не старый `semantic-core.json` и не расширенный черновик.
- [ ] Собрать в формат `{ site, updated, pages: [...], clusters: {...} }`, как в `data/golatam/semantic-core.json` (образец есть в `seo-tracker`).
- [ ] Кластеры — конвертировать из старого Slack-формата (`:page_facing_up:`) в unicode-эмодзи, как у golatam (`🏷`, `🏠`, …) — старый формат создан для Slack-нотификатора, firmalo уже на Telegram (`notify-telegram.mjs` unicode ожидает, не `:code:`).
- [ ] Не терять backlog: `semantic-core-backlog-2026-06-30.csv` и `semantic-core.expanded-2026-06-30.json` остаются в `firmar/seo-tracking/` как справочный материал — переносить в `seo-tracker` не нужно, это вне weekly-пайплайна (та же логика, что зафиксирована для golatam в `TZ_golatam_crm_simplification.md`, блок G1: «semantic core — карта, не список мониторинга»).
- [ ] Положить итоговый файл в `seo-tracker/data/firmalo/semantic-core.json`.

### (c) Создать `projects/firmalo.json`

По образцу `projects/golatam.json`, под конкретику firmalo (LATAM, только Google, без Яндекса):

```json
{
  "id": "firmalo",
  "name": "Firmalo",
  "domain": "firmalo.io",
  "siteUrl": "https://firmalo.io",
  "siteProperty": "sc-domain:firmalo.io",
  "rankSource": "topvisor",
  "topvisorProjectId": 29516939,
  "topvisorRegions": "<заполнить по итогам (a)>",
  "topvisorDateMode": "lastTwo",
  "enableYandex": false,
  "notifier": "telegram",
  "status": "waiting_for_keywords",
  "reportProfile": "seo-weekly",
  "data": {
    "corePath": "data/firmalo/semantic-core.json",
    "snapshotsDir": "data/firmalo/snapshots"
  }
}
```

- [ ] `domain`/`siteUrl`/`siteProperty` — только после решения по разделу 2.
- [ ] `topvisorProjectId: 29516939` — перепроверить в UI перед вставкой (вдруг с 2026-06-30 проект пересоздавали).
- [ ] `status: "waiting_for_keywords"` до тех пор, пока `data/firmalo/semantic-core.json` не появится на месте (пункт (b)); затем вручную переключить на `"active"` — по онбординг-флоу из `docs/architecture/2026-06-29-standalone-topvisor-service.md`.
- [ ] `enableYandex` — не указывать `true`: у firmalo никогда не было Yandex-контура (только Google, LATAM), в отличие от golatam.

### (d) Локальная проверка

Из корня `seo-tracker`:

```bash
node scripts/check-project.mjs --validate-only firmalo
node scripts/check-project.mjs firmalo --dry-run
```

- [ ] `--validate-only` проходит без ошибок (в первую очередь — проверка, что в дескрипторе нет секрет-подобных ключей, `FORBIDDEN_SECRET_KEYS`).
- [ ] `--dry-run` реально дотягивается до Topvisor (`get/positions_2/history`), строит отчёт, **не пишет** снапшот и **не шлёт** уведомление — проверить глазами, что позиции по ключам из (b) выглядят разумно, до первого «боевого» прогона.
- [ ] Только после этого — реальный прогон `node scripts/check-project.mjs firmalo` (без `--dry-run`), чтобы получился первый снапшот в `data/firmalo/snapshots/`.

### (e) Судьба legacy reusable workflow (`golatam/firmalo/.github/workflows/seo-weekly.yml`)

Файл сейчас **запинен** на коммит `ea69f34`, с явным комментарием в самом workflow: пин стоит, потому что `seo-tracker`/main собирался задефолтить `RANK_SOURCE` на `topvisor`, а у firmalo Topvisor-секретов не было. После регистрации по этому ТЗ секреты/дескриптор появятся — комментарий устареет, его тоже нужно будет поправить или убрать (не в рамках этого ТЗ, отдельным действием после решения ниже).

Два варианта, выбор — за Кириллом:

**Вариант 1 — оставить как safety net на 1–2 недели (тот же приём, что применён к golatam, блок G1 `TZ_golatam_crm_simplification.md`).**
- Плюсы: параллельное сравнение старого GSC-average-position пути и нового Topvisor-пути перед тем, как доверять новому источнику; ничего не ломается, если в дескрипторе (a)-(d) найдётся ошибка.
- Минусы: две системы позиций одновременно ещё 1-2 недели, лишние cron-прогоны, нужно не забыть вернуться и выключить.
- Механика: закомментировать `schedule: cron: '0 12 * * 1'` в `seo-weekly.yml`, оставить `workflow_dispatch`; файл не удалять ещё месяц.

**Вариант 2 — выключить сразу после первого успешного `--dry-run` + одного боевого прогона.**
- Плюсы: не тратится время на разбор двух параллельных источников, меньше путаницы «какому отчёту верить».
- Минусы: если в дескрипторе ошибка (домен, регионы, ключи) — узнаём об этом только по следующему понедельнику, без запасного пути.

Рекомендация — вариант 1, для консистентности с тем, как это уже сделано для golatam, но решение явно за Кириллом.

- [ ] Выбрать вариант и применить (закомментировать cron / оставить как есть).
- [ ] Обновить `STATUS.md` в `seo-tracker`: убрать пункт «Зарегистрировать firmalo дескриптором» из «Осталось», добавить в историю.

---

## 4. Секреты — что НЕ должно попасть в дескриптор

`projects/firmalo.json` — **config only**. Реестр (`scripts/project-registry.mjs`, `FORBIDDEN_SECRET_KEYS`) жёстко отвергает любой из этих ключей прямо в дескрипторе:

`topvisorApiToken`, `topvisorUserId`, `gscClientId`, `gscClientSecret`, `gscRefreshToken`, `slackBotToken`, `slackChannelId`, `telegramBotToken`, `telegramChatId`, `telegramThreadId`, `yandexOauthToken`.

Всё это уже должно жить только в `seo-tracker/.env` (ambient env), общее на весь central-сервис. Если у firmalo нет отдельного Telegram-треда — им подойдёт дефолтный чат/тред, уже настроенный для golatam (см. `TELEGRAM_THREAD_ID` в архитектурной доке — на проект сейчас всего один тред-роутинг, per-project секреты — известный будущий доработок).

---

## 5. Приёмка

- `node scripts/check-project.mjs --validate-only firmalo` и `--dry-run` проходят без ошибок.
- `node scripts/check-project.mjs --all` подхватывает firmalo в статусе `active` наравне с golatam.
- Первый снапшот `data/firmalo/snapshots/<date>.json` создан, `source: topvisor`.
- Домен в дескрипторе (`firmalo.io` или иной, по итогам раздела 2) совпадает с реальным продакшн-доменом и с тем, что видит Topvisor.
- Судьба `seo-weekly.yml` явно решена и отражена (закомментированный cron либо явное отключение), `STATUS.md` в `seo-tracker` обновлён.
