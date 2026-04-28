'use client'

import type { Category } from '@/data/categories'
import type { City } from '@/data/cities'

interface SpecialistProps {
  specialist: {
    id: string
    name: string
    experience_years: number
    price_from: number
    price_to: number
    rating: number
    reviews_count: number
    is_featured: boolean
    is_verified: boolean
    description: string
    photo_url: string | null
  }
  category: Category
  city: City
}

export default function SpecialistCard({ specialist: s, category, city }: SpecialistProps) {
  const initials = s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  const stars = '★'.repeat(Math.floor(s.rating)) + '☆'.repeat(5 - Math.floor(s.rating))

  return (
    <div className={`bg-white border rounded-xl p-4 transition-all hover:shadow-md ${s.is_featured ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-100'}`}>
      {s.is_featured && (
        <div className="text-xs text-blue-600 font-medium mb-2 flex items-center gap-1">
          ⭐ Топ специалист
        </div>
      )}
      <div className="flex gap-4">
        {/* Аватар */}
        <div className="flex-shrink-0">
          {s.photo_url ? (
            <img src={s.photo_url} alt={s.name} className="w-14 h-14 rounded-xl object-cover" />
          ) : (
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
              {initials}
            </div>
          )}
        </div>

        {/* Инфо */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                {s.name}
                {s.is_verified && (
                  <span className="text-blue-500 text-sm" title="Документы проверены">✓</span>
                )}
              </p>
              <p className="text-sm text-gray-500">{category.name} · Опыт {s.experience_years} лет</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-gray-900 text-sm">
                от {s.price_from.toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-xs text-gray-400">{category.priceUnit}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{s.description}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400 text-sm">{stars.slice(0, 5)}</span>
              <span className="text-sm font-medium text-gray-700">{s.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({s.reviews_count} отзывов)</span>
            </div>
            <button
              onClick={() => {
                const form = document.getElementById('lead-form')
                form?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Связаться
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
