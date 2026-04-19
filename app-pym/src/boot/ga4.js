import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  // Función para enviar pageview
  const sendPageView = (path) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-ECXZDJ8G58', {
        page_path: path
      })
    }
  }

  // Enviar página inicial
  sendPageView(window.location.pathname)

  // Escuchar cambios de ruta
  router.afterEach((to) => {
    sendPageView(to.path)
  })
})
