module.exports = {
  title: 'Vue Storefront Next with SFCC',
  base: '/',
  description: 'Documentation for the SFCC connector for Vue Storefront Next',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
    logo: 'https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067',
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/sfcc/getting-started', 'Getting started'],
          ['/sfcc/configuration', 'Configuration'],
          ['/sfcc/example-ocapi-configuration', 'Example OCAPI Configuration']
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/sfcc/composables/use-product', 'useProduct'],
          ['/sfcc/composables/use-user', 'useUser'],
          ['/sfcc/composables/use-user-shipping', 'useUserShipping'],
          ['/sfcc/composables/use-user-order', 'useUserOrder'],
          ['/sfcc/composables/use-facet', 'useFacet'],
          ['/sfcc/composables/use-cart', 'useCart'],
          ['/sfcc/composables/use-wishlist', 'useWishlist'],
          ['/sfcc/composables/use-category', 'useCategory'],
          ['/sfcc/composables/use-shipping', 'useShipping'],
          ['/sfcc/composables/use-shipping-provider', 'useShippingProvider'],
          ['/sfcc/composables/use-billing', 'useBilling'],
          ['/sfcc/composables/use-payment', 'usePayment'],
          ['/sfcc/composables/use-make-order', 'useMakeOrder']
        ]
      }
    ]
  }
}
