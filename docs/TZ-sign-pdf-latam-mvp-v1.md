# ТЗ: Sign PDF LATAM SEO MVP (ES/PT)

Версия: v1  
Дата: 2026-04-09  
Владелец: Go Latam  
Цель: запустить SEO-first MVP для интента «подписать PDF онлайн бесплатно» на ES/PT-BR и получить первые лиды/трафик за 7–14 дней.

---

## 1) Scope (что делаем)

### Включено в MVP
1. Веб-инструмент: загрузка PDF → добавление подписи → позиционирование → скачивание.
2. Без регистрации (guest flow).
3. 2 языковые зоны: **/es/** и **/pt/**.
4. 20 SEO-страниц (10 ES + 10 PT) с уникальными title/meta/H1/H2/FAQ.
5. Базовая аналитика и SEO-техничка (sitemap, hreflang, canonical, schema).
6. Ограничение бесплатного режима: до 3 файлов/день/IP.

### Не включено (Post-MVP)
- Командные фичи, workflow подписания по email, audit trail enterprise.
- Хранение документов в аккаунте.
- E-sign compliance уровня DocuSign (advanced/legal workflows).

---

## 2) Целевые URL (обязательные страницы)

### ES (10)
1. /es/firmar-pdf-online-gratis
2. /es/firmar-pdf-sin-registro
3. /es/firmar-pdf-sin-marca-de-agua
4. /es/anadir-firma-a-pdf
5. /es/crear-firma-online
6. /es/firmar-pdf-desde-celular
7. /es/firmar-contrato-alquiler-pdf
8. /es/firmar-pdf-para-visa
9. /es/alternativa-smallpdf-firmar-pdf
10. /es/alternativa-docusign-gratis

### PT-BR (10)
11. /pt/assinar-pdf-online-gratis
12. /pt/assinar-pdf-sem-cadastro
13. /pt/assinar-pdf-sem-marca-dagua
14. /pt/adicionar-assinatura-no-pdf
15. /pt/criar-assinatura-online
16. /pt/assinar-pdf-no-celular
17. /pt/assinar-contrato-pdf-online
18. /pt/assinar-pdf-para-visto
19. /pt/alternativa-smallpdf-assinar-pdf
20. /pt/alternativa-docusign-gratis

---

## 3) Функциональные требования (Tool)

### 3.1 User Flow
1. Пользователь открывает страницу.
2. Нажимает CTA «Subir PDF / Enviar PDF».
3. Загружает PDF (до 20 MB).
4. Выбирает тип подписи:
   - Draw (рисование)
   - Type (шрифтовая подпись)
   - Upload image (PNG/JPG)
5. Размещает подпись на странице(ах) PDF.
6. Нажимает «Descargar firmado / Baixar assinado».
7. Получает итоговый PDF.

### 3.2 Ограничения и правила
- Бесплатно: 3 завершённых экспорта/день/IP.
- После лимита: блок с предложением вернуться завтра или апгрейд (заглушка CTA).
- Сессионные файлы удаляются автоматически через 60 минут.
- Максимум 20 MB на файл, только .pdf.

### 3.3 Ошибки (обязательные сообщения)
- Неподдерживаемый формат: «Только PDF».
- Превышен размер: «Максимум 20 MB».
- Битый PDF: «Не удалось обработать файл, попробуйте другой PDF».
- Превышен лимит: «Лимит бесплатных подписей на сегодня достигнут».

---

## 4) SEO ТЗ (обязательно)

### 4.1 Техбаза
- SSR/SSG для всех 20 SEO-страниц.
- Уникальные `<title>`, `<meta name="description">`, H1 на каждой странице.
- `canonical` на саму страницу.
- `hreflang`:
  - es
  - pt-BR
  - x-default
- `robots.txt` + `sitemap.xml` (все 20 URL + tool core page).
- Open Graph + Twitter meta.

### 4.2 Schema
- Для tool-страниц: `SoftwareApplication` + `FAQPage`.
- Для how-to: `HowTo` + `FAQPage`.
- Для alternative/compare: `ItemList` (сравнение) + `FAQPage`.

### 4.3 Контент-структура (на каждой SEO-странице)
1. H1 (точный intent)
2. Короткий value block (1–2 абзаца)
3. How it works (3 шага)
4. Преимущества (буллеты)
5. Security/privacy блок
6. Country block (LATAM GEO)
7. FAQ (4–6 вопросов)
8. Sticky CTA

### 4.4 GEO блок
- ES: México, Colombia, Argentina, Chile, Perú.
- PT: Brasil.
- Формат: «Firmar/Assinar PDF online en/em [страна]» + локальные примеры документов.

---

## 5) UX/UI ТЗ

### 5.1 Базовые компоненты
- Header (logo + language switch ES/PT).
- Hero (H1 + subtext + primary CTA).
- Upload zone (drag&drop + button).
- Signature modal (draw/type/upload).
- PDF canvas preview с draggable signature.
- Download CTA.
- FAQ accordion.
- Footer (privacy/terms/contact).

### 5.2 Mobile-first
- Корректная работа с touch для перемещения/масштаба подписи.
- Core Web Vitals на мобиле: LCP < 2.5s, CLS < 0.1.

### 5.3 CTA
- ES: «Firmar ahora», «Subir PDF», «Probar gratis».
- PT: «Assinar agora», «Enviar PDF», «Testar grátis».

---

## 6) Backend/API ТЗ

### 6.1 Минимальные endpoints
1. `POST /api/upload`
   - Input: multipart PDF
   - Output: `file_id`, pages count, temp URL
2. `POST /api/signature`
   - Input: signature type + payload
   - Output: `signature_id`
3. `POST /api/apply`
   - Input: `file_id`, `signature_id`, coordinates/page
   - Output: `job_id`
4. `POST /api/export`
   - Input: `job_id`
   - Output: signed file URL
5. `GET /api/limits`
   - Input: IP/session
   - Output: used/remaining

### 6.2 Нефункциональные
- Время экспорта файла до 10 страниц: <= 8 сек.
- Retry на сбойные jobs.
- Логи ошибок по endpoint + request id.

---

## 7) Data & Privacy ТЗ

- Не хранить документы дольше 60 минут.
- Не использовать пользовательские PDF для обучения моделей.
- Шифрование in-transit (HTTPS).
- Минимальная политика хранения IP/логов (например, 30 дней).
- Privacy/Terms страницы обязательны до релиза.

---

## 8) Аналитика ТЗ (события)

### 8.1 События
- `page_view` (url, lang)
- `cta_click` (url, cta_label)
- `upload_started`
- `upload_completed` (file_size_mb, pages)
- `signature_created` (type: draw/type/upload)
- `signature_applied`
- `export_started`
- `export_completed`
- `export_failed` (reason)
- `limit_reached`

### 8.2 KPI (первые 2 недели)
- Upload → Export conversion >= 35%
- Bounce rate SEO pages < 70%
- CTR в SERP по Tier1 страницам > 3%

---

## 9) Контент ТЗ (копирайт)

### 9.1 Tone
- Прямо и утилитарно: «сделать действие быстро».
- Без enterprise-жаргона.

### 9.2 Требования к текстам
- 100% уникальные тексты между страницами (не шаблон-копипаста).
- Для каждой страницы: 
  - Title
  - Meta
  - H1
  - 4–6 H2
  - 4–6 FAQ
- Добавить внутреннюю перелинковку между intent-кластерами.

---

## 10) QA / Acceptance Criteria

Релиз считается принятым, если:
1. Все 20 URL открываются, индексируемы, имеют уникальные Title/Meta/H1.
2. Tool flow работает end-to-end на desktop + mobile.
3. Ограничение 3 файла/день/IP работает стабильно.
4. Sitemap и hreflang валидны.
5. Все schema проходят Rich Results Test без критических ошибок.
6. Нет блокирующих багов P0/P1.

---

## 11) План реализации (7 дней)

### Day 1
- Архитектура, URL map, шаблон страницы, базовый UI kit.

### Day 2
- Upload + PDF preview + signature modal (draw/type/upload).

### Day 3
- Apply signature + export signed PDF + обработка ошибок.

### Day 4
- Генерация 20 страниц (ES/PT), базовые тексты, внутренние ссылки.

### Day 5
- SEO техничка: sitemap, hreflang, canonical, schema.

### Day 6
- Analytics events + privacy/terms + rate limit.

### Day 7
- QA + багфикс + soft launch.

---

## 12) Что передать разработке прямо сейчас (пакет)

1. Этот документ (product + SEO + tech + QA).
2. Список 20 URL (раздел 2).
3. Контент-брифы для каждой страницы (title/meta/H2/FAQ) — уже готовы в треде.
4. Приоритет: сначала 8 Tier1 страниц (4 ES + 4 PT), затем остальные 12.

---

## 13) Риски и mitigation

- Риск: дубли контента между страницами → строгая уникализация intent+use-case.
- Риск: медленный PDF-рендер на мобиле → ограничение веса, lazy loading preview.
- Риск: юридические ожидания по «электронной подписи» → отдельный legal disclaimer на страницах use-case.

---

## 14) Post-MVP backlog

- EN слой + дополнительные LATAM GEO-лендинги.
- Watermark A/B тест (on/off).
- Lead capture до/после экспорта (email optional).
- Compare pages против iLovePDF/PDF24/Sejda.
- API/white-label для SMB.
