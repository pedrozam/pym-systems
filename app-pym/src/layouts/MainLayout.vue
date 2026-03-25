<template>
  <div class="digital-laptop-bg" @mousemove="updateMouse">
    <div class="mouse-spotlight" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>

    <!-- <div v-if="!logoInToolbar" class="loading-dots">
      <span></span><span></span><span></span><span></span><span></span>
    </div> -->
    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-black/75">
          <q-toolbar class="custom-toolbar p-2 row">
            <q-toolbar-title class="col-2">
              <a href="/"><img src="/favicon.ico" alt="App logo" class="size-28 p-3 cursor-pointer hover:animate-tada hover:infinite " to="/"/></a>
            </q-toolbar-title>
            <div class="align-center col-10">
              <q-btn-toggle
                v-model="model"
                flat
                stretch
                toggle-color="yellow"
                :options="menuOptions"
                class="items-center gap-1 icon-hover"
              />
            </div>
            <q-btn class="floating-sesion" icon="account_circle"
              @click="showLogin = true" label="Iniciar sesión">
            </q-btn>

            <q-btn round color="primary" class="floating-button" @click="showContactar = true">
              <svg width="32" height="32" class="p-1">
                <use :xlink:href="`${spriteUrl}#waap`" />
              </svg>
              <q-tooltip anchor="top right" self="center left" :offset="[10, 10]">
                Contactar a PyM Systems
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
import { usePWA } from 'src/composables/mobil/usePwa'
import ContactarForm from '../components/forms/ContactarForm.vue'
import spriteUrl from 'assets/sprite.svg'
// Inicializar PWA
const { showInstallPrompt, isInstalled, isIOS } = usePWA()

const $q = useQuasar()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)
const showContactar = ref(false)
const menuOptions = [
  { label: 'Inicio', value: 'inicio', icon: 'home', to:'/' },
  { label: 'Quienes somos', value: 'quienes', icon: 'groups', to:'/' },
  { label: 'Servicios', value: 'servicios', icon: 'settings', to:'/servicios' },
  { label: 'Tecnología', value: 'tecnologia', icon: 'code', to:'/presentacion' },
  { label: 'Proyectos en curso', value: 'proyectos', icon: 'developer_board', to:'/proyectos' },
]

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
