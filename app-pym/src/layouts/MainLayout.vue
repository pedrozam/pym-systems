<template>
  <div
    class="digital-laptop-bg relative overflow-hidden"
    @mousemove="updateMouse"
    @click="handleClick"
  >
    <!-- ... existing spotlight and effects ... -->
    <div
      class="mouse-spotlight fixed pointer-events-none rounded-full bg-gradient-radial from-cyan-400/40 via-cyan-500/20 to-transparent transition-all duration-75"
      :class="isSpotlightActive ? 'scale-110 opacity-100' : 'opacity-70'"
      :style="{
        left: mouseX + 'px',
        top: mouseY + 'px',
        width: '40px',
        height: '40px',
        transform: 'translate(-50%, -50%)',
      }"
    ></div>

    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fff">
        <!-- ... existing header ... -->
        <q-header
          elevated
          class="bg-black/75"
        >
          <q-toolbar class="flex justify-between items-center w-full px-2 md:px-4 py-2">
            <!-- Logo a la izquierda -->
            <a
              href="/"
              class="flex-shrink-0"
            >
              <img
                src="/favicon.ico"
                alt="App logo"
                class="size-28 p-3 cursor-pointer hover:animate-tada hover:infinite"
              />
            </a>

            <!-- Menú para pantallas grandes (centrado) -->
            <div class="hidden md:flex flex-1 justify-center mx-4">
              <q-btn-toggle
                v-model="model"
                flat
                stretch
                toggle-color="primary"
                :options="menuOptions"
                class="items-center gap-1"
                :class="neonBtnClass"
              />

              <q-btn
                @click="showLogin = true"
                round
                class="ml-2 transition-all duration-300 hover:scale-110 hover:text-cyan-400 hover:shadow-[0_0_16px_rgba(0,240,255,0.5)] text-cyan-200"
              >
                <q-icon name="account_circle" />
                <q-tooltip>Iniciar sesión</q-tooltip>
              </q-btn>
            </div>

            <!-- Contenedor para botones de la derecha -->
            <div class="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <!-- Menú hamburguesa para pantallas pequeñas -->
              <div class="md:hidden">
                <q-btn
                  flat
                  round
                  icon="more_vert"
                  class="transition-all duration-300 hover:scale-110 hover:text-cyan-400 text-cyan-200"
                >
                  <q-menu
                    anchor="bottom right"
                    self="top right"
                    :offset="[0, 10]"
                    class="bg-black/95 backdrop-blur-md border border-cyan-400/30 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(5,215,255,0.2)]"
                  >
                    <div class="mobile-menu-list">
                      <div
                        v-for="option in menuOptions"
                        :key="option.value"
                        class="flex items-center px-6 py-3 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:text-cyan-400 hover:bg-gradient-to-r hover:from-transparent hover:via-cyan-400/10 hover:to-transparent text-white font-medium"
                        @click="selectMenuItem(option)"
                      >
                        <q-icon
                          :name="option.icon"
                          class="mr-3"
                        />
                        <span>{{ option.label }}</span>
                      </div>
                      <div
                        class="flex items-center px-6 py-3 pt-3 mt-2 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:text-cyan-400 border-t border-cyan-400/30 text-white font-medium"
                        @click="showLogin = true"
                      >
                        <q-icon
                          name="account_circle"
                          class="mr-3"
                        />
                        <span>Iniciar sesión</span>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
              </div>

              <!-- Botón de contacto -->
              <q-btn
                round
                color="primary"
                class="fixed bottom-5 left-5 z-[9999] transition-transform hover:scale-105"
                @click="showContactar = true"
              >
                <svg
                  width="32"
                  height="32"
                  class="p-1"
                >
                  <use :xlink:href="`${spriteUrl}#waap`" />
                </svg>
                <q-tooltip
                  anchor="top right"
                  self="center left"
                  :offset="[10, 10]"
                >
                  Contactar a PyM Systems
                </q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <router-view :spriteUrl="spriteUrl" />
        </q-page-container>

        <!-- Footer componente aislado -->
        <FooterPym />

      </q-layout>
    </div>

    <LoginForm
      v-model="showLogin"
      @login-success="handleLoginSuccess"
    />

  </div>

  <q-dialog
    v-model="showContactar"
    persistent
  >
    <ContactarForm
      @close="showContactar = false"
      :spriteUrl="spriteUrl"
    />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import LoginForm from '../components/forms/LoginForm.vue'
import ContactarForm from '../components/forms/ContactarForm.vue'
import FooterPym from '../components/FooterPym.vue'

const spriteUrl = '/sprite.svg'
const $q = useQuasar()
const router = useRouter()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)
const showContactar = ref(false)
const model = ref('inicio')
const isSpotlightActive = ref(false)

let spotlightElement = null
let activeTimeout = null

const neonBtnClass =
  '[&_.q-btn]:relative [&_.q-btn]:overflow-hidden [&_.q-btn]:text-cyan-200 [&_.q-btn]:bg-transparent [&_.q-btn]:font-medium [&_.q-btn]:transition-all [&_.q-btn]:duration-300 [&_.q-btn:hover]:scale-110 [&_.q-btn:hover]:text-cyan-400 [&_.q-btn:hover]:shadow-[0_0_12px_#00f0ff] [&_.q-btn:hover]:bg-cyan-400/5 [&_.q-btn[aria-pressed=true]]:text-cyan-400 [&_.q-btn[aria-pressed=true]]:shadow-[0_0_20px_#00f0ff] [&_.q-btn[aria-pressed=true]]:bg-cyan-400/15 [&_.q-btn[aria-pressed=true]]:animate-pulse'

const menuOptions = [
  { label: 'Inicio', value: 'inicio', icon: 'home', to: '/' },
  { label: 'Quienes somos', value: 'quienes', icon: 'groups', to: '/quienes-somos' },
  { label: 'Servicios', value: 'servicios', icon: 'settings', to: '/servicios' },
  { label: 'Proyectos en curso', value: 'proyectos', icon: 'developer_board', to: '/proyectos' },
]

function updateMouse(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY

  if (spotlightElement) {
    isSpotlightActive.value = true
    clearTimeout(activeTimeout)
    activeTimeout = setTimeout(() => {
      isSpotlightActive.value = false
    }, 200)

    const now = Date.now()
    if (window._lastDataPoint && now - window._lastDataPoint > 100) {
      createDataEffect(event.clientX, event.clientY)
      window._lastDataPoint = now
    }
  }
}

function handleClick(event) {
  createDigitalRipple(event.clientX, event.clientY)

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createDataEffect(
        event.clientX + (Math.random() - 0.5) * 50,
        event.clientY + (Math.random() - 0.5) * 50,
      )
    }, i * 50)
  }
}

function createDataEffect(x, y) {
  const dataPoint = document.createElement('div')
  dataPoint.className = 'data-point'
  dataPoint.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;background:#00f0ff;border-radius:50%;box-shadow:0 0 8px #00f0ff;pointer-events:none;z-index:10000;animation:fadeOut 0.5s ease-out forwards;`
  document.body.appendChild(dataPoint)

  setTimeout(() => dataPoint.remove(), 500)

  const codeDigits = ['01', '10', '11', '00', '0', '1', 'FF', 'A1', 'B2']
  const codeDigit = document.createElement('div')
  codeDigit.className = 'code-digit'
  codeDigit.textContent = codeDigits[Math.floor(Math.random() * codeDigits.length)]
  codeDigit.style.cssText = `position:fixed;left:${x + (Math.random() - 0.5) * 40}px;top:${y + (Math.random() - 0.5) * 40}px;color:#00f0ff;font-family:monospace;font-size:12px;pointer-events:none;z-index:10001;animation:floatUp 1s ease-out forwards;`
  document.body.appendChild(codeDigit)

  setTimeout(() => codeDigit.remove(), 1000)
}

function createDigitalRipple(x, y) {
  const ripple = document.createElement('div')
  ripple.className = 'digital-ripple'
  ripple.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:40px;height:40px;transform:translate(-50%,-50%);border:2px solid #00f0ff;border-radius:50%;pointer-events:none;z-index:10002;animation:rippleExpand 0.6s ease-out forwards;`
  document.body.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

function selectMenuItem(option) {
  model.value = option.value
  if (option.to) {
    router.push(option.to)
  }
}

function handleLoginSuccess() {
  // Lógica después de login exitoso
  console.log('Login exitoso')
}

onMounted(() => {
  $q.dark.set(false)

  setTimeout(() => {
    spotlightElement = document.querySelector('.mouse-spotlight')
  }, 100)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)

  window._lastDataPoint = 0
})

onBeforeUnmount(() => {
  if (activeTimeout) clearTimeout(activeTimeout)

  document
    .querySelectorAll('.data-point, .code-digit, .digital-ripple')
    .forEach((el) => el.remove())
})
</script>

<style>
/* Solo las animaciones que no se pueden hacer con Tailwind fácilmente */
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
}

@keyframes rippleExpand {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(3);
  }
}

.bg-gradient-radial {
  background-image: radial-gradient(circle, var(--tw-gradient-stops));
}
</style>
