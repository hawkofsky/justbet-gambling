const env = require('dotenv').config()
module.exports = {
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/fonts/AvenirNextCyr/stylesheet.css',
    '@/assets/scss/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/redirect',
    '~/plugins/scroller',
    '~/plugins/tronweb',
    '~/plugins/i18n',
    '~/plugins/filters',
    '~/plugins/delay',
    '~/plugins/checkReferral',
    { src: '~/plugins/progress', ssr: false },
    { src: '~/plugins/socket', ssr: false },
    { src: '~/plugins/owlcarousel.js', ssr: false }
  ],
  router: {
    middleware: 'i18n'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/svg'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    },
    extend(config, ctx) {
      if (ctx.isDev)
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
    }
  }
}
