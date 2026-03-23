<!-- components/InstallButton.vue -->
<template>
  <div>
    <!-- Botón para Android/Desktop con PWA -->
    <q-btn v-if="showInstallPrompt" color="primary" icon="install_mobile" label="Instalar App" @click="installApp"
      glossy no-caps />

    <!-- Botón para iOS (instrucciones específicas) -->
    <q-btn v-else-if="isIOS" color="secondary" icon="apple" label="Instalar en iOS" @click="showIOSInstructions" glossy
      no-caps />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const showInstallPrompt = ref(false)
const isIOS = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Detectar iOS
  isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  // Escuchar evento de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallPrompt.value = true
  })
})

const installApp = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    $q.notify({
      type: 'positive',
      message: '¡Aplicación instalada correctamente!',
      position: 'top'
    })
    showInstallPrompt.value = false
  }

  deferredPrompt = null
}

const showIOSInstructions = () => {
  $q.dialog({
    title: 'Instalar en iOS',
    message: 'Para instalar esta app:\n\n1. Toca el botón "Compartir"\n2. Desplázate hacia abajo\n3. Toca "Agregar a pantalla de inicio"',
    persistent: true,
    ok: {
      label: 'Entendido',
      color: 'primary'
    }
  })
}
</script>

<style scoped>
/* Estilos opcionales para darle un mejor aspecto */
.q-btn {
  min-width: 150px;
  margin: 8px 0;
}

@media (max-width: 600px) {
  .q-btn {
    width: 100%;
  }
}
</style>
