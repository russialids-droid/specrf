import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/seo'
import LeadForm from '@/components/LeadForm'
import SpecialistCard from '@/components/SpecialistCard'

interface Props {
  params: Promise<{ category: string; city: string }>
}

// Генерация всех статических путей — 20 категорий × 50 городов = 1000 страниц пилота
export async function generateStaticParams() {
  const paths: { category: string; city: string }[] = []
  const pilotCategories = CATEGORIES.slice(0, 20)
  const pilotCities = CITIES.slice(0, 50)

  for (const cat of pilotCategories) {
    for (const city of pilotCities) {
      paths.push({ category: cat.slug, city: city.slug })
    }
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, city: citySlug } = await params
  const category = CATEGORIES.find((c) => c.slug === catSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!category || !city) return {}

  const { title, description } = generatePageMeta(category, city)
  return {
    title,
    description,
    alternates: { canonical: `https://specrf.ru/${catSlug}/${citySlug}/` },
    openGraph: { title, description, locale: 'ru_RU', type: 'website' },
  }
}

// Моковые специалисты — заменяются реальными из Supabase после наполнения БД
function getMockSpecialists(category: { name: string; avgPrice: string; icon: string }, city: { name: string }, count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}`,
    name: getMockName(i),
    experience_years: 3 + (i * 2) % 15,
    price_from: parseInt(category.avgPrice.split('–')[0].replace(/\D/g, '')),
    price_to: parseInt((category.avgPrice.split('–')[1] || category.avgPrice.split('–')[0]).replace(/\D/g, '')),
    rating: 4.2 + (i % 8) * 0.1,
    reviews_count: 5 + i * 7,
    is_featured: i < 2,
    is_verified: i < 5,
    description: `Опытный ${category.name.toLowerCase()} в ${city.name}. Индивидуальный подход к каждому клиенту.`,
    photo_url: null,
  }))
}

function getMockName(i: number) {
  const names = ['Александр Петров', 'Ирина Смирнова', 'Дмитрий Козлов', 'Наталья Иванова',
    'Сергей Волков', 'Елена Новикова', 'Андрей Морозов', 'Татьяна Соколова']
  return names[i % names.length]
}

export default async function CityPage({ params }: Props) {
  const { category: catSlug, city: citySlug } = await params

  const category = CATEGORIES.find((c) => c.slug === catSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!category || !city) notFound()

  const specialists = getMockSpecialists(category, city)
  const faqSchema = generateFAQSchema(category, city)
  const breadcrumbSchema = generateBreadcrumbSchema(category, city)
  const listSchema = generateLocalBusinessSchema(category, city)

  const relatedCategories = CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 6)
  const relatedCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 8)

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
          <a href="/" className="hover:text-blue-600">Главная</a>
          <span>/</span>
          <a href={`/${category.slug}`} className="hover:text-blue-600">{category.namePlural}</a>
          <span>/</span>
          <span className="text-gray-700">{city.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            {/* H1 */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                {category.namePlural} в {city.namePred}
              </h1>
              <p className="text-gray-600">
                Найдите проверенного {category.nameVin} в {city.namePred}. {specialists.length} специалистов
                в базе — с отзывами, опытом и ценами.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  ✓ Проверенные документы
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  💰 {category.avgPrice} {category.priceUnit}
                </span>
                <span className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  ⭐ Реальные отзывы
                </span>
              </div>
            </div>

            {/* Специалисты */}
            <div className="space-y-4 mb-10">
              {specialists.map((spec, i) => (
                <SpecialistCard
                  key={spec.id}
                  specialist={spec}
                  category={category}
                  city={city}
                />
              ))}
            </div>

            {/* FAQ */}
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">
                Частые вопросы о {category.nameRod} в {city.namePred}
              </h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq, i) => (
                  <details key={i} className="bg-white border border-gray-100 rounded-xl group">
                    <summary className="p-4 cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors list-none flex justify-between items-center">
                      {faq.name}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">›</span>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* SEO-текст уникальный для страницы */}
            <section className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-600 leading-relaxed">
              <h2 className="text-base font-semibold text-gray-800 mb-3">
                О {category.nameRod} в {city.namePred}
              </h2>
              <p className="mb-3">
                {city.name} — {getPopulationText(city.population)} России с населением{' '}
                {city.population.toLocaleString('ru-RU')} человек. {category.namePlural} в {city.namePred}{' '}
                работают как в частном порядке, так и в составе крупных компаний и клиник.
              </p>
              <p>
                На СпецРФ вы можете найти {category.nameVin} в {city.namePred}, сравнить цены
                и отзывы, и оставить заявку не выходя из дома. Все специалисты проходят
                базовую проверку документов перед размещением.
              </p>
            </section>

            {/* Смежные категории */}
            <section className="mt-8">
              <h3 className="font-semibold mb-3 text-gray-700">Другие специалисты в {city.namePred}</h3>
              <div className="flex flex-wrap gap-2">
                {relatedCategories.map((cat) => (
                  <a
                    key={cat.slug}
                    href={`/${cat.slug}/${city.slug}`}
                    className="bg-white border border-gray-200 text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {cat.icon} {cat.namePlural}
                  </a>
                ))}
              </div>
            </section>

            {/* Смежные города */}
            <section className="mt-6">
              <h3 className="font-semibold mb-3 text-gray-700">{category.namePlural} в других городах</h3>
              <div className="flex flex-wrap gap-2">
                {relatedCities.map((c) => (
                  <a
                    key={c.slug}
                    href={`/${category.slug}/${c.slug}`}
                    className="bg-white border border-gray-200 text-sm text-gray-600 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Сайдбар — форма заявки */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <LeadForm
                categorySlug={category.slug}
                citySlug={city.slug}
                categoryName={category.nameVin}
                cityName={city.namePred}
              />

              {/* Мини-статистика */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 mt-4">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">О городе</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Регион</span>
                    <span className="font-medium text-gray-800">{city.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Население</span>
                    <span className="font-medium text-gray-800">{(city.population / 1000).toFixed(0)} тыс.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Специалистов</span>
                    <span className="font-medium text-gray-800">{specialists.length}+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getPopulationText(population: number): string {
  if (population > 1000000) return 'один из крупнейших городов'
  if (population > 500000) return 'крупный город'
  if (population > 200000) return 'город'
  return 'город'
}
