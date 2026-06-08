# Firmalo — план первых бэклинков и листингов

Цель: дать Googlebot доверенные внешние ссылки → пути к краулу страниц в статусе
«Discovered – never crawled (1970-01-01)», плюс начать набор авторитета домена.
Каждая ссылка — отдельный сигнал; 3–5 качественных размещений важнее 50 спамных.

## Приоритет 1 — идеальное попадание по нише (сделать первыми)

| Площадка | Почему | Куда вести |
|----------|--------|-----------|
| **AlternativeTo** (alternativeto.net) | У нас уже есть страницы «alternativa a SmallPDF/DocuSign» — добавить Firmalo как бесплатную альтернативу DocuSign и SmallPDF. Сильный тематический бэклинк. | `/es` |
| **Product Hunt** | Запуск «free, private, client-side PDF signing». DoFollow-ссылка + трафик. | `/` |
| **SaaSHub / Saasworthy** | Каталоги инструментов, секция e-signature / PDF tools. | `/es` |
| **G2 / Capterra (free listing)** | Категория Electronic Signature. Долгий, но авторитетный бэклинк. | `/es` |

## Приоритет 2 — каталоги бесплатных инструментов

- alternativeto.net, toolfinder, freebie/PDF-tool директории
- «free online tools» агрегаторы (поиск: `submit free tool directory`)
- Listings вроде «free DocuSign alternatives 2026» (написать авторам статей)

## Приоритет 3 — комьюнити LATAM (контекстные упоминания, не спам)

- Reddit: r/es, r/mexico, r/argentina, r/brasil — отвечать в тредах «cómo firmar un PDF gratis / como assinar PDF» ссылкой по делу
- Форумы/группы фрилансеров и риелторов (контракты аренды — наш usecase)
- Quora ES/PT: вопросы «firmar PDF sin pagar», «assinar PDF de graça»

## Готовые описания под копипаст

**ES (краткое, ~160 симв.):**
> Firmalo — firma PDF online gratis, sin registro y sin marca de agua. Todo se
> procesa en tu navegador: tu archivo nunca se sube a un servidor. Alternativa
> gratuita a DocuSign y SmallPDF.

**PT (~160 симв.):**
> Firmalo — assine PDF online grátis, sem cadastro e sem marca d'água. Tudo é
> processado no seu navegador: seu arquivo nunca vai para um servidor.
> Alternativa gratuita ao DocuSign e SmallPDF.

**EN (для PH / G2 / международных каталогов):**
> Firmalo is a free, private PDF signing tool. Draw, type, or upload your
> signature and sign any PDF entirely in your browser — files never leave your
> device. No signup, no watermark. Built for LATAM (Spanish & Portuguese).

**Теги/категории:** electronic signature, e-signature, PDF tools, productivity,
privacy, free tools, DocuSign alternative, SmallPDF alternative.

## После размещения

1. Через 2–3 дня проверить в GSC, сменился ли «последнее сканирование» с 1970 на
   реальную дату у целевых страниц.
2. Дублировать ручным «Запросить индексирование» в GSC (см. список в истории).
3. Отслеживать рост `indexStatus` (PASS) по weekly-снимкам.
