import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'СпецРФ — найти специалиста в вашем городе',
  description: 'Справочник проверенных специалистов по всей России. Юристы, психологи, репетиторы, врачи, электрики — с реальными отзывами и честными ценами.',
}

export default function HomePage() {
  const topCities = CITIES.slice(0, 16)
  const topCategories = CATEGORIES.slice(0, 20)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Найдите специалиста в вашем городе
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Более 50 категорий специалистов по всей России — с реальными отзывами и проверенными данными
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Юрист, психолог, репетитор..."
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-base outline-none"
            />
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Найти
            </button>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2">Категории специалистов</h2>
        <p className="text-gray-500 mb-8">Выберите нужную специализацию</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`/${cat.slug}`}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <p className="font-medium text-sm text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                {cat.namePlural}
              </p>
              <p className="text-xs text-gray-400 mt-1">{cat.avgPrice}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Популярные города */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Популярные города</h2>
          <p className="text-gray-500 mb-8">Специалисты в крупнейших городах России</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topCities.map((city) => (
              <a
                key={city.slug}
                href={`/yurist/${city.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                  {city.name.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-blue-600 transition-colors">{city.name}</p>
                  <p className="text-xs text-gray-400">{city.region}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Как работает */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Как найти специалиста</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Выберите специальность', desc: 'Найдите нужную категорию специалистов — юрист, врач, репетитор и другие' },
            { step: '2', title: 'Укажите город', desc: 'Выберите ваш город из списка — мы покажем специалистов в вашем регионе' },
            { step: '3', title: 'Оставьте заявку', desc: 'Заполните форму — специалист свяжется с вами в течение часа' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA для специалистов */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Вы специалист?</h2>
          <p className="text-gray-600 mb-6">
            Разместите профиль бесплатно и получайте клиентов из поиска
          </p>
          <a
            href="/add-specialist"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Добавить профиль бесплатно
          </a>
        </div>
      </section>
    </div>
  )
}
