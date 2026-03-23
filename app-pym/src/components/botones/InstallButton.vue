<!-- components/botones/InstallButton.vue -->
<template>
  <div>
    <!-- Botón para Android/Desktop -->
    <q-btn v-if="showInstallPrompt && !isInstalled" color="primary" icon="install_mobile" label="Instalar App"
      @click="installApp" glossy no-caps />

    <!-- Botón para iOS -->
    <q-btn v-else-if="isIOS && !isInstalled" color="secondary" icon="apple" label="Instalar en iOS"
      @click="showIOSInstructions" glossy no-caps />

    <!-- Indicador de app instalada -->
    <q-chip v-if="isInstalled" color="positive" text-color="white" icon="check_circle" class="q-ml-sm">
      App Instalada
    </q-chip>

    <!-- Debug: Mostrar estado actual (solo en desarrollo) -->
    <div v-if="false" class="text-caption q-mt-xs">
      Estado: show={{ showInstallPrompt }}, installed={{ isInstalled }}, ios={{ isIOS }}
    </div>
  </div>
</template>

<script setup>
import { usePWA } from 'src/composables/mobil/usePwa'

const {
  showInstallPrompt,
  isInstalled,
  isIOS,
  installApp,
  showIOSInstructions
} = usePWA()

// Log para debug
console.log('InstallButton montado')
console.log('showInstallPrompt:', showInstallPrompt.value)
console.log('isInstalled:', isInstalled.value)
console.log('isIOS:', isIOS.value)
</script>

<style scoped>
.q-btn {
  min-width: 150px;
}
</style>
