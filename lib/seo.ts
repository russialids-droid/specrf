import type { Category } from '@/data/categories'
import type { City } from '@/data/cities'

export function generatePageMeta(category: Category, city: City) {
  const title = `${category.namePlural} в ${city.namePred} — найти и заказать | СпецРФ`
  const description = `${category.namePlural} в ${city.namePred}: ${category.description}. Проверенные специалисты, отзывы, цены. Средняя стоимость: ${category.avgPrice} ${category.priceUnit}.`

  return { title, description }
}

export function generateCategoryMeta(category: Category) {
  const title = `${category.namePlural} по всей России — найти специалиста | СпецРФ`
  const description = `Найдите ${category.nameVin} в вашем городе. ${category.description}. Сравните цены и отзывы.`
  return { title, description }
}

export function generateLocalBusinessSchema(category: Category, city: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.namePlural} в ${city.namePred}`,
    description: `Список проверенных ${category.nameRod} в ${city.nameRod}`,
    url: `https://specrf.ru/${category.slug}/${city.slug}/`,
    numberOfItems: 20,
    itemListElement: [],
  }
}

export function generateFAQSchema(category: Category, city: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Сколько стоит ${category.nameVin} в ${city.namePred}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Средняя стоимость услуг ${category.nameRod} в ${city.namePred} составляет ${category.avgPrice} ${category.priceUnit}. Точная цена зависит от опыта специалиста и сложности задачи.`,
        },
      },
      {
        '@type': 'Question',
        name: `Как найти хорошего ${category.nameVin} в ${city.namePred}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `На СпецРФ размещены проверенные ${category.namePlural} в ${city.namePred} с реальными отзывами и подтверждёнными документами. Выберите специалиста, сравните цены и оставьте заявку.`,
        },
      },
      {
        '@type': 'Question',
        name: `Как быстро ${category.nameVin} приедет в ${city.namePred}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Большинство ${category.nameRod} в ${city.namePred} готовы выехать в течение 1–24 часов после заявки. Некоторые специалисты принимают срочные вызовы.`,
        },
      },
      {
        '@type': 'Question',
        name: `Можно ли вызвать ${category.nameVin} на дом в ${city.namePred}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Да, многие ${category.namePlural} из нашей базы работают с выездом на дом в ${city.namePred}. Отметка «выезд на дом» есть в профиле каждого специалиста.`,
        },
      },
      {
        '@type': 'Question',
        name: `Есть ли ${category.namePlural} в ${city.namePred} с опытом от 5 лет?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `В базе СпецРФ представлены ${category.namePlural} в ${city.namePred} с различным опытом — от начинающих до специалистов с опытом 10+ лет. Вы можете фильтровать по опыту при выборе.`,
        },
      },
    ],
  }
}

export function generateBreadcrumbSchema(category: Category, city: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://specrf.ru/' },
      { '@type': 'ListItem', position: 2, name: category.namePlural, item: `https://specrf.ru/${category.slug}/` },
      { '@type': 'ListItem', position: 3, name: city.name, item: `https://specrf.ru/${category.slug}/${city.slug}/` },
    ],
  }
}
