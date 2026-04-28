import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import { generateCategoryMeta } from '@/lib/seo'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  if (!category) return {}
  const { title, description } = generateCategoryMeta(category)
  return {
    title,
    description,
    alternates: { canonical: `https://specrf.ru/${categorySlug}/` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params
  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  if (!category) notFound()

  const topCities = CITIES.slice(0, 50)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-blue-600">Главная</a>
        <span>/</span>
        <span className="text-gray-700">{category.namePlural}</span>
      </nav>

      {/* Заголовок */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-3xl font-bold">{category.namePlural} в России</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl">{category.description}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full">
            💰 {category.avgPrice} {category.priceUnit}
          </span>
          {category.subcategories.slice(0, 3).map((sub) => (
            <span key={sub} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Города */}
      <h2 className="text-xl font-bold mb-4">Выберите ваш город</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
        {topCities.map((city) => (
          <a
            key={city.slug}
            href={`/${category.slug}/${city.slug}`}
            className="bg-white border border-gray-100 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <p className="font-medium text-sm group-hover:text-blue-600 transition-colors">{city.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{city.region}</p>
          </a>
        ))}
      </div>

      {/* Подкатегории */}
      <section className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Специализации</h2>
        <div className="flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <span
              key={sub}
              className="bg-white border border-gray-200 text-sm text-gray-700 px-4 py-2 rounded-xl"
            >
              {sub}
            </span>
          ))}
        </div>
      </section>

      {/* SEO текст */}
      <section className="mt-10 prose prose-gray max-w-none">
        <h2>Как найти {category.nameVin} в вашем городе</h2>
        <p>
          СпецРФ — справочник проверенных {category.nameRod} по всей России. Мы собираем информацию
          о специалистах, проверяем их документы и публикуем реальные отзывы клиентов.
          Выберите ваш город из списка выше, чтобы увидеть {category.namePlural} в вашем регионе.
        </p>
        <p>
          Средняя стоимость услуг составляет {category.avgPrice} {category.priceUnit}.
          Точная цена зависит от опыта специалиста, сложности задачи и вашего региона.
        </p>
      </section>
    </div>
  )
}
