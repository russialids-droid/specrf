/** @type {import('next').NextConfig} */
const nextConfig = {
  // ISR — страницы перегенерируются раз в сутки
  experimental: {
    // Оптимизация для большого кол-ва статических страниц
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // Генерируем только пилотные 1000 страниц при первом билде
  // Остальные подхватываются через ISR (on-demand)
  output: 'standalone',
}

module.exports = nextConfig
