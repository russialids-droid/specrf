import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'СпецРФ — справочник специалистов по всей России',
  description: 'Найдите проверенного специалиста в вашем городе: юристы, психологи, репетиторы, врачи, электрики и другие. Реальные отзывы, честные цены.',
  metadataBase: new URL('https://specrf.pages.dev'),
  openGraph: {
    siteName: 'СпецРФ',
    locale: 'ru_RU',
    type: 'website',
  },
  verification: {
    yandex: '3a5617dca826f365',
    google: 'l4mtPwdUSB3Qlh2VjQjSFKvZSZcIXbRdu_YRA6wWT2o',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://specrf.ru',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-blue-600 tracking-tight">
              СпецРФ
            </a>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="/yurist" className="hover:text-blue-600 transition-colors">Юристы</a>
              <a href="/psiholog" className="hover:text-blue-600 transition-colors">Психологи</a>
              <a href="/repetitor" className="hover:text-blue-600 transition-colors">Репетиторы</a>
              <a href="/elektrik" className="hover:text-blue-600 transition-colors">Электрики</a>
            </nav>
            <a
              href="/add-specialist"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Стать специалистом
            </a>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-white border-t border-gray-100 mt-16 py-10">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-500">
            <div>
              <p className="font-semibold text-gray-700 mb-3">СпецРФ</p>
              <p>Справочник специалистов по всей России</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-3">Категории</p>
              <ul className="space-y-1">
                <li><a href="/yurist" className="hover:text-blue-600">Юристы</a></li>
                <li><a href="/psiholog" className="hover:text-blue-600">Психологи</a></li>
                <li><a href="/repetitor" className="hover:text-blue-600">Репетиторы</a></li>
                <li><a href="/vrach" className="hover:text-blue-600">Врачи</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-3">Города</p>
              <ul className="space-y-1">
                <li><a href="/yurist/moskva" className="hover:text-blue-600">Москва</a></li>
                <li><a href="/yurist/sankt-peterburg" className="hover:text-blue-600">Санкт-Петербург</a></li>
                <li><a href="/yurist/novosibirsk" className="hover:text-blue-600">Новосибирск</a></li>
                <li><a href="/yurist/ekaterinburg" className="hover:text-blue-600">Екатеринбург</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-3">Компания</p>
              <ul className="space-y-1">
                <li><a href="/about" className="hover:text-blue-600">О сервисе</a></li>
                <li><a href="/add-specialist" className="hover:text-blue-600">Добавить специалиста</a></li>
                <li><a href="/privacy" className="hover:text-blue-600">Конфиденциальность</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
            © 2024 СпецРФ. Все права защищены.
          </div>
        </footer>
      </body>
    </html>
  )
}
