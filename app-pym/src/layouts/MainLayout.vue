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

            <q-btn class="p-2" icon="account_circle" label="Iniciar Sesión" color="primary" @click="showLogin = true" />

            <!-- Botón de instalación directo en el toolbar (para pruebas) -->
            <InstallButton />

            <q-btn flat round icon="menu">
              <q-menu>
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-btn flat icon="home" to="/">Inicio</q-btn>
                    </q-item-section>
                  </q-item>

                  <!-- Botón de instalación en el menú -->
                  <q-item>
                    <q-item-section>
                      <InstallButton />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <!-- Mostrar estado de instalación en el menú -->
                  <q-item>
                    <q-item-section>
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
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import LoginForm from '../components/forms/LoginForm.vue'
import InstallButton from '../components/botones/InstallButton.vue'
import { usePWA } from 'src/composables/mobil/usePwa'

// Inicializar PWA
const { showInstallPrompt, isInstalled, isIOS } = usePWA()

const $q = useQuasar()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)

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
