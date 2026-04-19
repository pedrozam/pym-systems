import { boot } from 'quasar/wrappers'
import * as VueGtag from 'vue-gtag'

export default boot(({ app, router }) => {
  app.use(VueGtag, {
    config: {
      id: 'G-ECXZDJ8G58' // 👈 Reemplaza con tu ID real
    },
    appName: 'PymSystems',
    pageTrackerScreenviewEnabled: true // Trackea automáticamente las páginas
  }, router)
})
