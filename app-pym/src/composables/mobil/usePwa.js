// composables/mobil/usePwa.js
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

export function usePWA() {
  const $q = useQuasar()
  const showInstallPrompt = ref(false)
  const isInstalled = ref(false)
  const isIOS = ref(false)
  let deferredPrompt = null

  // Detectar si la app ya está instalada
  const checkIfInstalled = () => {
    // Verificar si la app se ejecuta en modo standalone (instalada)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true
      console.log('App ya está instalada (standalone)')
    }

    // Para iOS
    if (window.navigator.standalone === true) {
      isInstalled.value = true
      console.log('App ya está instalada (iOS)')
    }
  }

  // Detectar iOS
  const detectIOS = () => {
    isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    console.log('¿Es iOS?', isIOS.value)
  }

  // Instalar la app
  const installApp = async () => {
    console.log('Intentando instalar...', deferredPrompt)
    if (!deferredPrompt) {
      console.log('No hay deferredPrompt disponible')
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    console.log('Resultado de instalación:', outcome)

    if (outcome === 'accepted') {
      $q.notify({
        type: 'positive',
        message: '¡Aplicación instalada correctamente!',
        position: 'top'
      })
      showInstallPrompt.value = false
      isInstalled.value = true
    } else {
      console.log('Usuario rechazó la instalación')
    }

    deferredPrompt = null
  }

  // Mostrar instrucciones para iOS
  const showIOSInstructions = () => {
    $q.dialog({
      title: 'Instalar en iOS',
      message: 'Para instalar esta app:\n\n1. Toca el botón "Compartir"\n2. Desplázate hacia abajo\n3. Toca "Agregar a pantalla de inicio"',
      persistent: true,
      ok: 'Entendido'
    })
  }

  // Configurar el evento de instalación
  const setupInstallPrompt = () => {
    console.log('Configurando evento beforeinstallprompt...')

    const handleBeforeInstallPrompt = (e) => {
      console.log('Evento beforeinstallprompt capturado!', e)
      e.preventDefault()
      deferredPrompt = e
      showInstallPrompt.value = true
      console.log('showInstallPrompt ahora es:', showInstallPrompt.value)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Retornar función para limpiar
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }

  // Escuchar cambios en el modo de visualización
  const watchDisplayMode = () => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handler = (e) => {
      console.log('Cambio en modo de visualización:', e.matches)
      isInstalled.value = e.matches
    }

    mediaQuery.addEventListener('change', handler)

    // Retornar función para limpiar el evento
    return () => mediaQuery.removeEventListener('change', handler)
  }

  // Inicializar todo
  onMounted(() => {
    console.log('usePWA inicializado')
    detectIOS()
    checkIfInstalled()
    const cleanupPrompt = setupInstallPrompt()
    const cleanupDisplay = watchDisplayMode()

    // Si ya está instalada, no mostrar el prompt
    if (isInstalled.value) {
      showInstallPrompt.value = false
    }

    // Limpiar en desmontaje
    onUnmounted(() => {
      cleanupPrompt()
      cleanupDisplay()
    })
  })

  return {
    // Estado
    showInstallPrompt,
    isInstalled,
    isIOS,

    // Métodos
    installApp,
    showIOSInstructions,
    checkIfInstalled
  }
}
