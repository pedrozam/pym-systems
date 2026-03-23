<template>
  <div class="digital-laptop-bg" @mousemove="updateMouse">
    <div class="mouse-spotlight" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>

    <div v-if="!logoInToolbar" class="loading-dots">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-black/75">
          <q-toolbar class="custom-toolbar p-2">
            <q-toolbar-title>
              <img src="/favicon.ico" alt="App logo" :class="logoInToolbar ? 'toolbar-logo' : 'center-logo'" />
            </q-toolbar-title>


            <div class="group relative inline-block">
              <q-btn class="p-2 group-hover:pr-4 transition-all duration-600" icon="account_circle" color="primary"
                @click="showLogin = true">
                <span
                  class="inline-block max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-600 whitespace-nowrap">
                  Iniciar Sesión
                </span>
              </q-btn>
            </div>



            <div class="fixed bottom-0 right-0 p-2 opacity-10 hover:opacity-100 transition-opacity duration-300">
              <div class="row items-center">
                <q-icon name="info" size="sm" class="q-mr-sm" />
                <span class="text-caption">
                  Estado:
                  <strong :class="isInstalled ? 'text-positive' : 'text-warning'">
                    {{ isInstalled ? 'Instalada' : 'No instalada' }}
                  </strong>
                </span>
              </div>
              <div class="text-caption q-mt-xs">
                Prompt visible: {{ showInstallPrompt }}
              </div>
              <div class="text-caption">
                iOS: {{ isIOS }}
              </div>
              <div>
                <InstallButton />
              </div>
            </div>

            <q-btn round color="primary" icon="support_agent" class="floating-button" @click="showContactar = true">
              <q-tooltip anchor="top right" self="center left" :offset="[10, 10]">
                Contactar a PyM Systems
                <svg width="32" height="32">
                  <use xlink:href="/assets/sprite.svg#x" />
                </svg>
              </q-tooltip>
            </q-btn>




          </q-toolbar>
        </q-header>

        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>

    <q-dialog v-model="showLogin" class="flex flex-center">
      <LoginForm />
    </q-dialog>
  </div>

  <!-- Dialog del formulario -->
  <q-dialog v-model="showContactar" persistent>
    <ContactarForm @close="showContactar = false" />

  </q-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import LoginForm from '../components/forms/LoginForm.vue'
import InstallButton from '../components/botones/InstallButton.vue'
import { usePWA } from 'src/composables/mobil/usePwa'
import ContactarForm from '../components/forms/ContactarForm.vue'
// Inicializar PWA
const { showInstallPrompt, isInstalled, isIOS } = usePWA()

const $q = useQuasar()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)
const showContactar = ref(false)


function updateMouse(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  $q.dark.set(false)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)

  // Log para debug
  console.log('MainLayout montado')
  console.log('Estado inicial - showInstallPrompt:', showInstallPrompt.value)
  console.log('Estado inicial - isInstalled:', isInstalled.value)
  console.log('Estado inicial - isIOS:', isIOS.value)
})
</script>
