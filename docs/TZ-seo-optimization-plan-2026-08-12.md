# План SEO-оптимизации firmalo.io — 2026-08-12

**Статус (2026-08-12):** код-часть плана реализована и задеплоена на прод (коммит `3c50b0f`) — www→apex редирект, watermark-контент, PT-ссылки, GA4-события. Проверено локальным браузерным прогоном и напрямую на `firmalo.io` после деплоя. **Не в коде, ещё открыто:** переназначение target-ключа `assinar pdf sem cadastro` в самом Topvisor (раздел P1), diagnостический depth-100 съём (раздел P2) — оба требуют действий Кирилла вне этого репозитория.

**Дата:** 2026-08-12
**Источник данных:** прямой запрос к Topvisor API (project `29754841`, домен `firmalo.io`, 80 ключей, 19 регионов LATAM+ES), съём инициирован Кириллом вручную через UI Topvisor. Доступ к API — через skill `~/.claude/skills/topvisor-api/SKILL.md`.
**Соавтор плана:** Hermes/Clavito (через skill `ask-clavito-seo`), evidence-first, две итерации (первый черновик без свежих данных → финал после того, как реальные позиции и два независимых browser-проверенных факта были переданы обратно).

---

## 0. Контекст: почему этот документ появился именно так

`golatam/seo-tracker` (централизованный пакет для сбора позиций/уведомлений) **признан устаревшим 2026-08-12** — Кирилл сообщил об этом прямым текстом в сессии, отметив, что это должно было попасть в документацию раньше и не попало. До этого момента у Claude Code не было прямого доступа к Topvisor; в этой же сессии Кирилл передал API-токен (`User-Id`/`Authorization: bearer`), после чего:

1. Токен сохранён в `~/.topvisor/credentials.env` (`chmod 600`, вне git).
2. Собран project-agnostic skill `topvisor-api` для будущих сессий (firmalo и golatam используют один Topvisor-аккаунт).
3. Данные забраны напрямую по API и дважды пройдены через SEO-консультацию с Hermes — первый раз без данных (общий чек-лист), второй раз с реальными позициями и двумя browser-проверенными поправками.

**Устарело и не использовать:** правило «проверять GitHub issues с лейблом `seo-tz` на старте сессии» (было в этом файле CLAUDE.md с 2026-08-05) — оно зависело от auto-issue механизма seo-tracker, которого больше нет.

---

## 1. Что показали реальные данные Topvisor (07-07 → 08-12)

Из 80 отслеживаемых ключей **7 хотя бы раз попадали в топ-10** за месяц наблюдений. Остальные 73 — вне топ-10 весь период, **что не обязательно проблема**: у всех 19 регионов `depth: 1` в Topvisor — это означает проверку только топ-10; позиция `"--"` значит «вне топ-10», а не «данные не собраны». Реальная позиция по этим 73 ключам (11-е место или 200-е) неизвестна без повышения depth.

| Ключ | Язык | Целевая страница | Тренд |
|---|---|---|---|
| `firmar pdf sin marca de agua` | ES | `/es/firmar-pdf-sin-marca-de-agua` | Не ранжировался до 07-31 → поз. 8 (8 стран) → поз. 8 (3 страны) → **поз. 6 (15 стран, включая Испанию) на 08-12**. Растёт. |
| `firma pdf sin watermark` | ES | та же | Стабильно топ-10 в 17–19 странах с 07-31; сейчас **поз. 3 в Испании** — лучший результат сайта. |
| `smallpdf alternativa sin marca de agua` | ES | та же | Стабильно топ-4 в 5–14 странах. |
| `firmar pdf gratis sin marca de agua` | ES | та же | Был в топ-10 07-31 (6 стран), выпал 08-04/08-12. |
| `assinar pdf sem upload` | PT | `/pt/assinar-pdf-privado-sem-upload` | Стабильно поз. 3–5 в 2–9 странах с 07-20 по 08-12. |
| `assinar pdf sem imprimir e escanear` | PT | `/pt/assinar-pdf-sem-imprimir` | Разовое появление 08-04 (поз. 3, Испания), не повторилось — не тренд. |
| `assinar pdf sem cadastro` | PT | **БАГ**: ранжировался (поз. 8, Чили, 07-20/07-31) на `/pt` (главную), не на выделенный `/pt/assinar-pdf-sem-cadastro`. Выпал из топ-10 08-04/08-12. | Таргетинг-проблема, не органический успех лендинга. |

**Единственный уверенно растущий кластер — ES watermark-removal.** Второй, послабее — PT no-upload/privacy.

## 2. Проверено браузером (не curl) — два уточнения к первому черновику плана

- **GA4 работает.** Playwright-проверка `firmalo.io/es`: `gtag.js` грузится, `g/collect` отправляется с `tid=G-C5ZMVHWP4Z`, `window.gtag` — функция, `page_view` ушёл. Первичный вывод Hermes «GA4 не работает» был получен через `curl` и не мог быть верным: `GoogleAnalytics.tsx` использует `next/script strategy="lazyOnload"`, скрипт не попадает в SSR/curl'нутый HTML в принципе (известная ловушка, уже фиксировалась в project memory `gsc_p0_tz_status` 2026-07-17).
- **www — полноценное зеркало, не просто лишний redirect-хоп.** `http://www.firmalo.io/es/` → 301 → `https://www.firmalo.io/es/` → 308 → `/es` (остаётся на `www`!) → **200, отдаёт полный HTML (94KB, `x-nextjs-prerender`)**. `www` никогда не редиректит на apex-домен. Смягчающий фактор: canonical на www-версии верно указывает на `https://firmalo.io/es` — риск дублей в индексе снижен, но не устранён на уровне хостинга.

## 3. Приоритизированный план (P0–P3)

### P0. Закрепить watermark-кластер ES

**Влияние:** максимальное — единственный подтверждённо растущий кластер.
**Страница:** `/es/firmar-pdf-sin-marca-de-agua` — не менять URL/title/H1/тезис.

- Добавить блок «Alternativa a Smallpdf sin marca de agua» — сравнение только по проверяемым свойствам (watermark, account, price, upload, privacy), без непроверяемых утверждений о конкуренте.
- Усилить внутренние ссылки на страницу: с `/es`, `/es/firmar-pdf-online-gratis`, `/es/alternativa-smallpdf-firmar-pdf`, `/es/alternativa-docusign-gratis`. Анкоры: «firmar PDF sin marca de agua», «firma PDF sin watermark», «alternativa sin marca de agua».
- Добавить в FAQ: «¿Cómo firmar un PDF sin watermark?».
- **Не создавать** отдельную страницу под `firma pdf sin watermark` — семантический вариант того же интента.

**Риск:** расширение до общего «firmar PDF gratis» размоет то, что уже работает.

### P0. Починить www как полноценное зеркало

**Влияние:** высокое.

Одно edge-правило на Railway (не дублировать в Next.js, чтобы не словить цикл):
```
http(s)://www.firmalo.io/:path* → https://firmalo.io/:path*   (308, сохранить path+query)
http://firmalo.io/:path*        → https://firmalo.io/:path*   (301/308)
```

Целевая матрица:

| Вход | Цель | Код |
|---|---|---:|
| `http://www.firmalo.io/es/foo?x=1` | `https://firmalo.io/es/foo?x=1` | 308 |
| `https://www.firmalo.io/es/foo?x=1` | `https://firmalo.io/es/foo?x=1` | 308 |
| `http://firmalo.io/es/foo?x=1` | `https://firmalo.io/es/foo?x=1` | 301/308 |
| `https://firmalo.io/es/foo` | тот же URL | 200 |

### P1. Исправить target для `assinar pdf sem cadastro`

**Влияние:** высокое — Google уже показывал нецелевую `/pt` вместо лендинга.
Целевая страница технически исправна (200, self-canonical, index/follow, H1 соответствует запросу) — проблема не контентная, а в сигнале, что именно она главная.

- В Topvisor оставить единственный target: `https://firmalo.io/pt/assinar-pdf-sem-cadastro`.
- Убрать `assinar pdf sem cadastro` из keyword-map `/pt`, если назначен там.
- На `/pt` заменить общий анкор («sem cadastro» / «não precisa criar uma conta») на точную ссылку на лендинг.
- На `/pt/assinar-pdf-privado-sem-upload` добавить ссылку на `/pt/assinar-pdf-sem-cadastro`.
- Title/H1 целевой страницы не трогать — точная фраза уже в H1.
- На будущее: в API-съёмах фиксировать `actualUrl` по каждому региону — если снова ранжируется `/pt`, это каннибализация, а не «страница пока не растёт».

**Риск:** не ставить canonical между `/pt` и лендингом — это разные полезные страницы, решать через перелинковку.

### P1. Усилить PT privacy / sem upload, не распыляя тему

**Страница:** `/pt/assinar-pdf-privado-sem-upload` — URL/title/H1 не менять.

- Добавить вариант «sem enviar arquivos» один раз (первый экран или FAQ).
- Внутренние ссылки с `/pt`, `/pt/assinar-pdf-sem-cadastro`, `/pt/assinar-pdf-online-gratis`.
- Не объединять с «sem cadastro» — разные интенты (privacy/no-upload vs no-account).

### P2. Не оптимизировать 73 непроверенных ключа вслепую

Depth=1 не позволяет отличить позицию 11 от позиции 200.

1. Следующий платный съём — поднять depth (сначала диагностическая выборка: 20 ES + 20 PT ключей, страны ES/MX/CO/AR/BR, desktop, depth 100 — проверить цену перед запуском).
2. Разделить 73 ключа на очереди: (а) есть подходящая страница, позиция неизвестна → ждать depth-100 среза; (б) есть страница с пересекающимся интентом → проверить `actualUrl`, поправить target/ссылки; (в) подходящей страницы нет → кандидат в контентный backlog, но **только после** depth-100 данных.
3. **Не создавать** 73 новые страницы — риск тонкого/дублирующего контента на двух языках.

Контентный backlog (после depth 50–100): mobile («desde el celular»), «sin/sem imprimir», трудовой договор/аренда/авторизация, iLovePDF/Adobe comparison, privacy/no-upload — если текущие страницы не двигаются.

### P2. `assinar pdf sem imprimir e escanear` — разовый сигнал, не тренд

Одна позиция №3 в Испании 04.08, не повторилась. Не менять страницу, оставить в наблюдении; считать сигналом только при повторе в 2+ следующих съёмах или 2+ регионах.

### P3. Продуктовая аналитика: от «есть page_view» к «понятно, работает ли продукт»

Добавить GA4-события: `pdf_upload_started`, `signature_created`, `pdf_signed_downloaded` (ключевая конверсия — по ней сравнивать SEO-лендинги).

Параметры — только безопасные: `ui_language`, `device_category`, `source_page`, `flow_step`, размер файла диапазоном. **Не передавать:** имя файла, содержимое PDF, email/подпись/любые персональные данные, устойчивый хеш документа.

---

## 4. Что нужно от разработчика

1. Одно edge-правило `www → apex` на Railway, без дублирующего правила в Next.js.
2. Обновить keyword-target map: `assinar pdf sem cadastro` → `/pt/assinar-pdf-sem-cadastro`; убедиться, что `/pt` не назначен target'ом.
3. Внутренние ссылки: `/pt` → `/pt/assinar-pdf-sem-cadastro`; `/pt/assinar-pdf-privado-sem-upload` → `/pt/assinar-pdf-sem-cadastro`; `/pt` + ES homepage + comparison pages → соответствующие privacy/watermark страницы.
4. Точечно усилить только два доказанно работающих кластера (ES watermark, PT no-upload) — по пунктам P0/P1 выше.
5. После согласования — добавить три продуктовых GA4-события, проверить в DebugView.

## 5. Что проверить после релиза

- Все 4 схемы `http/https × www/apex` дают максимум один redirect на `https://firmalo.io/...`.
- `www` больше не отвечает 200 напрямую на SEO-страницы.
- Canonical, hreflang, sitemap — по-прежнему только apex-host.
- На следующем Topvisor-срезе `assinar pdf sem cadastro` либо ранжируется на `/pt/assinar-pdf-sem-cadastro`, либо явно вне топа — `/pt` не считать успехом этого запроса.
- Watermark-кластер не теряет текущий набор стран/позиций через 7–14 дней после точечных правок.
- В GA4 DebugView — все три продуктовых события без PII.

## 6. Порядок действий

1. `www → apex` redirect.
2. Target/internal-link фикс для `sem cadastro`.
3. Точечное усиление watermark (ES) и no-upload (PT).
4. Диагностический Topvisor-съём depth 100 по выборке 40 ключей / 5 рынков (после подтверждения цены Кириллом).
5. Только после (4) — решение, какие из 73 непроверенных ключей заслуживают новый контент.
