import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'СпецРФ — справочник специалистов по всей России',
  description: 'Найдите проверенного специалиста в вашем городе: юристы, психологи, репетиторы, врачи, электрики и другие. Реальные отзывы, честные цены.',
  metadataBase: new URL('https://specrf.pages.dev'),
  openGraph: { siteName: 'СпецРФ', locale: 'ru_RU', type: 'website' },
  verification: { yandex: '3a5617dca826f365', google: 'l4mtPwdUSB3Qlh2VjQjSFKvZSZcIXbRdu_YRA6wWT2o' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header>
          <div>
            <a href="/" className="logo">СпецРФ</a>
            <nav>
              <a href="/yurist">Юристы</a>
              <a href="/psiholog">Психологи</a>
              <a href="/repetitor">Репетиторы</a>
              <a href="/elektrik">Электрики</a>
            </nav>
            <a href="/add-specialist" className="cta-btn">Стать специалистом</a>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div>
            <div className="footer-grid">
              <div>
                <p className="footer-title">СпецРФ</p>
                <p>Справочник специалистов по всей России</p>
              </div>
              <div>
                <p className="footer-title">Категории</p>
                <ul>
                  <li><a href="/yurist">Юристы</a></li>
                  <li><a href="/psiholog">Психологи</a></li>
                  <li><a href="/repetitor">Репетиторы</a></li>
                  <li><a href="/vrach">Врачи</a></li>
                </ul>
              </div>
              <div>
                <p className="footer-title">Города</p>
                <ul>
                  <li><a href="/yurist/moskva">Москва</a></li>
                  <li><a href="/yurist/sankt-peterburg">Санкт-Петербург</a></li>
                  <li><a href="/yurist/novosibirsk">Новосибирск</a></li>
                  <li><a href="/yurist/ekaterinburg">Екатеринбург</a></li>
                </ul>
              </div>
              <div>
                <p className="footer-title">Компания</p>
                <ul>
                  <li><a href="/about">О сервисе</a></li>
                  <li><a href="/add-specialist">Добавить специалиста</a></li>
                  <li><a href="/privacy">Конфиденциальность</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-copy">© 2026 СпецРФ. Все права защищены.</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
