/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://azarbi.com',
  generateRobotsTxt: true,
  exclude: ['/account*', '/api*', '/checkout*', '/order-confirmation'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://azarbi.com/server-sitemap.xml',
    ],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/account', '/api', '/checkout'] }
    ]
  }
}
