<!-- components/InstallButton.vue -->
<template>
  <div>
    <!-- Para Android/iOS con PWA -->
    <q-item v-if="showInstallPrompt" clickable v-close-popup @click="installApp">
      <q-item-section avatar>
        <q-icon name="install_mobile" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Instalar App</q-item-label>
        <q-item-label caption>
          Instalar como aplicación en tu dispositivo
        </q-item-label>
      </q-item-section>
    </q-item>

    <!-- Para iOS (instrucciones específicas) -->
    <q-item v-else-if="isIOS" clickable v-close-popup @click="showIOSInstructions">
      <q-item-section avatar>
        <q-icon name="apple" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Instalar en iOS</q-item-label>
        <q-item-label caption>
          Agregar a pantalla de inicio
        </q-item-label>
      </q-item-section>
    </q-item>
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
      message: '¡Aplicación instalada correctamente!'
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
    ok: 'Entendido'
  })
}
</script>
