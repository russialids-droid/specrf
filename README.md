# СпецРФ — Programmatic SEO справочник специалистов

## Структура проекта
```
specrf/
├── app/
│   ├── page.tsx                    # Главная
│   ├── [category]/page.tsx         # /yurist/ — страница категории
│   ├── [category]/[city]/page.tsx  # /yurist/moskva/ — SEO-страница (1000+ штук)
│   ├── api/leads/route.ts          # API: приём заявок
│   └── api/sitemap/route.ts        # API: XML sitemap
├── components/
│   ├── SpecialistCard.tsx          # Карточка специалиста
│   └── LeadForm.tsx                # Форма заявки
├── data/
│   ├── cities.ts                   # 50 городов России
│   └── categories.ts               # 20 категорий специалистов
├── lib/
│   ├── supabase.ts                 # БД клиент
│   └── seo.ts                      # SEO утилиты, Schema.org
├── supabase-schema.sql             # SQL схема — выполнить в Supabase
└── .github/workflows/deploy.yml   # CI/CD + ежедневный ping поисковиков
```

---

## ЧЕКЛИСТ ЗАПУСКА (твои действия — ~30 минут)

### Шаг 1: GitHub репозиторий
1. Зайти на github.com
2. New repository → название: `specrf`
3. Public, без README
4. Скопировать команды для push (я дам их)

### Шаг 2: Supabase
1. Зайти на supabase.com → Sign Up через GitHub
2. New Project → название: specrf, пароль любой, регион: EU West
3. После создания: Settings → API → скопировать:
   - Project URL
   - anon public key
   - service_role key
4. SQL Editor → вставить содержимое `supabase-schema.sql` → Run

### Шаг 3: Vercel
1. Зайти на vercel.com → Sign Up через GitHub
2. Import repository `specrf`
3. Framework: Next.js (автоопределение)
4. Environment Variables — добавить из `.env.example`:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY
   - ADMIN_EMAIL=russia.lids@gmail.com
   - REVALIDATE_SECRET=(любая строка)
5. Deploy

### Шаг 4: Домен (опционально на старте)
- Купить specrf.ru на reg.ru (~199 ₽/год)
- В Vercel: Settings → Domains → добавить specrf.ru

### Шаг 5: Яндекс Вебмастер
1. webmaster.yandex.ru → Добавить сайт
2. Верификация через meta-тег (я обновлю layout.tsx)
3. Сообщить мне verification token

### Шаг 6: Google Search Console
1. search.google.com/search-console → Add property
2. Domain verification — скопировать TXT запись
3. Добавить в DNS на reg.ru

---

## Что происходит автоматически (без тебя)
- GitHub Actions: каждый день в 06:00 МСК пингует sitemap в Яндекс и Google
- Vercel ISR: новые страницы генерируются при первом запросе и кэшируются
- Supabase: хранит лиды, специалистов, отзывы
- Email: каждый лид приходит на russia.lids@gmail.com

## Масштабирование
После пилота (1000 страниц) — добавить остальные города одной строкой в CITIES
и одним коммитом в main → Vercel автоматически задеплоит 15 000+ страниц
