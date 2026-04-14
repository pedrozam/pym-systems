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

        <!-- NEW FOOTER SECTION -->
        <q-footer
          elevated
          class="bg-black/90 backdrop-blur-md border-t border-cyan-400/30 mt-auto"
        >
          <div class="container mx-auto px-4 py-8 md:py-10">
            <!-- Top section with logo and social media -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <!-- Logo izquierda -->
              <div class="flex-shrink-0">
                <img
                  src="/favicon.ico"
                  alt="App logo"
                  class="size-24 md:size-28 p-2 cursor-pointer hover:animate-tada hover:infinite"
                />
              </div>
              
              <!-- Social media links -->
              <div class="flex flex-col items-start md:items-end gap-2">
                <h3 class="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">
                  Nuestras redes sociales
                </h3>
                <div class="flex gap-4">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Newsletter section -->
            <div class="border-t border-b border-cyan-400/20 py-6 my-6">
              <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-center md:text-left">
                  <h4 class="text-white font-semibold text-lg mb-1">
                    Entérate de todas las novedades en tecnología
                  </h4>
                  <p class="text-gray-400 text-sm">
                    Suscríbete a nuestro newsletter y recibe las últimas actualizaciones
                  </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    class="px-4 py-2 rounded-lg bg-black/50 border border-cyan-400/40 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all w-full sm:w-72"
                    :class="{ 'border-red-500': emailError }"
                  />
                  <q-btn
                    @click="subscribeNewsletter"
                    color="primary"
                    class="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(0,240,255,0.5)]"
                    :loading="subscribing"
                  >
                    Suscribirse
                  </q-btn>
                </div>
              </div>
              <p v-if="emailError" class="text-red-400 text-sm mt-2 text-center">
                Por favor ingresa un correo electrónico válido
              </p>
              <p v-if="subscribeSuccess" class="text-green-400 text-sm mt-2 text-center">
                ¡Suscripción exitosa! Revisa tu correo.
              </p>
            </div>

            <!-- Footer links -->
            <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 my-6">
              <a
                href="/preguntas"
                class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
              >
                Preguntas frecuentes
              </a>
              <a
                href="/terminos"
                class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
              >
                Términos y condiciones
              </a>
              <a
                href="/privacidad"
                class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
              >
                Privacidad
              </a>
              <a
                href="/trabajo"
                class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
              >
                Trabaja con nosotros
              </a>
            </div>

            <!-- Bolivia attribution -->
            <div class="flex flex-col items-center justify-center gap-3 mt-8 pt-4 border-t border-cyan-400/20">
              <div class="flex items-center gap-3">
                <!-- Bolivia flag SVG -->
                <svg class="w-8 h-6 rounded shadow" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="6.67" fill="#D52B1E"/>
                  <rect y="6.67" width="30" height="6.66" fill="#F9E300"/>
                  <rect y="13.33" width="30" height="6.67" fill="#007934"/>
                </svg>
                <span class="text-gray-400 text-sm">
                  Hecho en Bolivia 🇧🇴
                </span>
              </div>
              <p class="text-gray-500 text-xs text-center">
                De Bolivia para el mundo con ❤️
              </p>
            </div>
          </div>
        </q-footer>
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

// Newsletter state
const email = ref('')
const emailError = ref(false)
const subscribing = ref(false)
const subscribeSuccess = ref(false)

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

function subscribeNewsletter() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value || !emailRegex.test(email.value)) {
    emailError.value = true
    return
  }
  
  emailError.value = false
  subscribing.value = true
  subscribeSuccess.value = false
  
  // Simulate API call
  setTimeout(() => {
    subscribing.value = false
    subscribeSuccess.value = true
    email.value = ''
    
    setTimeout(() => {
      subscribeSuccess.value = false
    }, 3000)
  }, 1000)
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