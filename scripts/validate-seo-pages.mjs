import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = process.cwd();
const sourcePath = path.join(root, 'src/lib/seo-pages.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
  fileName: sourcePath,
}).outputText;

const sandbox = {
  exports: {},
  module: { exports: {} },
  require,
  console,
};
sandbox.exports = sandbox.module.exports;
vm.runInNewContext(compiled, sandbox, { filename: 'seo-pages.cjs' });

const { getSeoPage, getAllSeoPages, getAlternateSlug } = sandbox.module.exports;

const expected = [
  ['es', 'firmar-pdf-sin-imprimir'],
  ['pt', 'assinar-pdf-sem-imprimir'],
  ['es', 'firmar-pdf-privado-sin-subir-archivos'],
  ['pt', 'assinar-pdf-privado-sem-upload'],
  ['es', 'firmar-contrato-trabajo-pdf'],
  ['pt', 'assinar-contrato-trabalho-pdf'],
  ['es', 'firmar-autorizacion-pdf'],
  ['pt', 'assinar-autorizacao-pdf'],
];

const all = getAllSeoPages();
const keys = all.map(({ lang, slug }) => `${lang}/${slug}`);
const keySet = new Set(keys);
const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
if (duplicates.length) {
  throw new Error(`Duplicate seo pages: ${[...new Set(duplicates)].join(', ')}`);
}

for (const [lang, slug] of expected) {
  const page = getSeoPage(lang, slug);
  if (!page) throw new Error(`Missing expected page: ${lang}/${slug}`);
  if (!page.title || !page.metaDescription || !page.heroTitle || !page.heroSubtitle) {
    throw new Error(`Incomplete metadata: ${lang}/${slug}`);
  }
  if (!Array.isArray(page.sections) || page.sections.length < 4) {
    throw new Error(`Thin content sections: ${lang}/${slug}`);
  }
  if (!Array.isArray(page.faq) || page.faq.length < 5) {
    throw new Error(`Thin FAQ: ${lang}/${slug}`);
  }
  const alternate = getAlternateSlug(lang, slug);
  if (!alternate || !getSeoPage(alternate.lang, alternate.slug)) {
    throw new Error(`Missing alternate slug for: ${lang}/${slug}`);
  }
}

for (const { lang, slug } of all) {
  const page = getSeoPage(lang, slug);
  for (const relatedSlug of page.relatedSlugs) {
    if (!keySet.has(`${lang}/${relatedSlug}`)) {
      throw new Error(`Broken relatedSlugs: ${lang}/${slug} -> ${relatedSlug}`);
    }
  }
}

console.log(`SEO pages validation passed: ${all.length} pages, ${expected.length} new wave-1 pages`);
