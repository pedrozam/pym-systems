<template>
  <div
    class="digital-laptop-bg"
    @mousemove="updateMouse"
    @click="handleClick"
  >
    <div
      class="mouse-spotlight"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>

    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header
          elevated
          class="bg-black/75"
        >
          <q-toolbar class="custom-toolbar">
            <!-- Logo a la izquierda -->
            <a
              href="/"
              class="logo-container"
            >
              <img
                src="/favicon.ico"
                alt="App logo"
                class="size-28 p-3 cursor-pointer hover:animate-tada hover:infinite"
              />
            </a>

            <!-- Menú para pantallas grandes (centrado) -->
            <div class="desktop-menu">
              <q-btn-toggle
                v-model="model"
                flat
                stretch
                toggle-color="primary"
                :options="menuOptions"
                class="items-center gap-1 icon-hover neon-menu-items"
              />

              <q-btn
                @click="showLogin = true"
                round
                class="login-btn"
              >
                <q-icon name="account_circle" />
                <q-tooltip>Iniciar sesión</q-tooltip>
              </q-btn>
            </div>

            <!-- Contenedor para botones de la derecha -->
            <div class="right-buttons">
              <!-- Menú hamburguesa para pantallas pequeñas -->
              <div class="mobile-menu-container">
                <q-btn
                  flat
                  round
                  icon="more_vert"
                  class="mobile-menu-btn neon-menu-btn"
                >
                  <q-menu
                    anchor="bottom right"
                    self="top right"
                    :offset="[0, 10]"
                    class="mobile-menu-dropdown bg-black/95 backdrop-blur-md"
                  >
                    <div class="mobile-menu-list">
                      <div
                        v-for="option in menuOptions"
                        :key="option.value"
                        class="mobile-menu-item"
                        @click="selectMenuItem(option)"
                      >
                        <q-icon
                          :name="option.icon"
                          class="mr-3"
                        />
                        <span>{{ option.label }}</span>
                      </div>
                      <div
                        class="mobile-menu-item login-item"
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
                class="floating-button"
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
      </q-layout>
    </div>

    <q-dialog
      v-model="showLogin"
      class="flex flex-center"
    >
      <LoginForm />
    </q-dialog>
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

let spotlightElement = null
let activeTimeout = null

const menuOptions = [
  { label: 'Inicio', value: 'inicio', icon: 'home', to: '/' },
  { label: 'Quienes somos', value: 'quienes', icon: 'groups', to: '/quienes-somos' },
  { label: 'Servicios', value: 'servicios', icon: 'settings', to: '/servicios' },
  { label: 'Tecnología', value: 'tecnologia', icon: 'code', to: '/presentacion' },
  { label: 'Proyectos en curso', value: 'proyectos', icon: 'developer_board', to: '/proyectos' },
]

function updateMouse(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY

  // Activar efecto visual al mover el mouse
  if (spotlightElement) {
    isSpotlightActive.value = true
    clearTimeout(activeTimeout)
    activeTimeout = setTimeout(() => {
      isSpotlightActive.value = false
    }, 200)

    // Crear efecto de datos al mover rápido
    const now = Date.now()
    if (window._lastDataPoint && now - window._lastDataPoint > 100) {
      createDataEffect(event.clientX, event.clientY)
      window._lastDataPoint = now
    }
  }
}

function handleClick(event) {
  // Crear efecto ripple al hacer click
  createDigitalRipple(event.clientX, event.clientY)

  // Crear múltiples puntos de datos
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
  // Crear puntos de datos
  const dataPoint = document.createElement('div')
  dataPoint.className = 'data-point'
  dataPoint.style.left = x + 'px'
  dataPoint.style.top = y + 'px'
  document.body.appendChild(dataPoint)

  setTimeout(() => dataPoint.remove(), 500)

  // Crear código flotante aleatorio
  const codeDigits = ['01', '10', '11', '00', '0', '1', 'FF', 'A1', 'B2']
  const codeDigit = document.createElement('div')
  codeDigit.className = 'code-digit'
  codeDigit.textContent = codeDigits[Math.floor(Math.random() * codeDigits.length)]
  codeDigit.style.left = x + (Math.random() - 0.5) * 40 + 'px'
  codeDigit.style.top = y + (Math.random() - 0.5) * 40 + 'px'
  document.body.appendChild(codeDigit)

  setTimeout(() => codeDigit.remove(), 1000)
}

function createDigitalRipple(x, y) {
  const ripple = document.createElement('div')
  ripple.className = 'digital-ripple'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  ripple.style.width = '40px'
  ripple.style.height = '40px'
  ripple.style.transform = 'translate(-50%, -50%)'
  document.body.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

function selectMenuItem(option) {
  model.value = option.value
  if (option.to) {
    router.push(option.to)
  }
}

onMounted(() => {
  $q.dark.set(false)

  setTimeout(() => {
    spotlightElement = document.querySelector('.mouse-spotlight')
    if (spotlightElement) {
      spotlightElement.style.width = '80px'
      spotlightElement.style.height = '80px'
    }
  }, 100)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)

  window._lastDataPoint = 0
})

onBeforeUnmount(() => {
  if (activeTimeout) clearTimeout(activeTimeout)

  // Limpiar elementos creados
  document
    .querySelectorAll('.data-point, .code-digit, .digital-ripple')
    .forEach((el) => el.remove())
})
</script>

<style scoped>
/* Estructura del toolbar */
.custom-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
}

.logo-container {
  flex-shrink: 0;
}

/* Menú desktop centrado */
.desktop-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 1rem;
}

/* Contenedor de botones de la derecha */
.right-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* Estilos responsivos */
@media (min-width: 768px) {
  .mobile-menu-container {
    display: none;
  }
  .desktop-menu {
    display: flex;
  }
}

@media (max-width: 767px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu-container {
    display: block;
  }
  .custom-toolbar {
    padding: 0.5rem;
  }
  .right-buttons {
    gap: 0.25rem;
  }
}

/* Efectos neon para el menú */
.neon-menu-items :deep(.q-btn) {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: #a8d8ff;
  background: transparent !important;
  font-weight: 500;
}

.neon-menu-items :deep(.q-btn::before) {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.neon-menu-items :deep(.q-btn:hover) {
  text-shadow:
    0 0 12px #00f0ff,
    0 0 24px rgba(0, 240, 255, 0.6);
  transform: scale(1.08);
  color: #00f0ff;
  background: rgba(0, 240, 255, 0.05) !important;
}

.neon-menu-items :deep(.q-btn:hover::before) {
  width: 80%;
}

.neon-menu-items :deep(.q-btn:active) {
  transform: scale(0.95);
}

.neon-menu-items :deep(.q-btn[aria-pressed='true']) {
  text-shadow:
    0 0 20px #00f0ff,
    0 0 40px #00f0ff,
    0 0 60px rgba(0, 240, 255, 1) !important;
  color: #00f0ff !important;
  background: rgba(0, 240, 255, 0.15) !important;
  animation: heartbeat 1.2s ease-in-out infinite !important;
}

.neon-menu-items :deep(.q-btn[aria-pressed='true'])::before {
  width: 95% !important;
  height: 4px;
  background: radial-gradient(ellipse at center, #00f0ff, #dce0e4);
}

.neon-menu-btn {
  transition: all 0.3s ease;
  color: #b5e2ff;
}

.neon-menu-btn:hover {
  text-shadow:
    0 0 10px #05d7ff,
    0 0 20px #05d7ff;
  transform: scale(1.1);
  color: #05d7ff;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  font-weight: 500;
}

.mobile-menu-item:hover {
  text-shadow:
    0 0 10px #05d7ff,
    0 0 20px #05d7ff;
  background: linear-gradient(90deg, transparent, rgba(5, 215, 255, 0.1), transparent);
  transform: translateX(5px);
  color: #05d7ff;
}

.login-item {
  border-top: 1px solid rgba(5, 215, 255, 0.3);
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

/* Estilos para el botón de login */
.login-btn {
  transition: all 0.3s ease !important;
  position: relative;
  color: #a8d8ff !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:hover {
  text-shadow:
    0 0 12px #00f0ff,
    0 0 24px rgba(0, 240, 255, 0.6) !important;
  transform: scale(1.12);
  color: #00f0ff !important;
  background: rgba(0, 240, 255, 0.1) !important;
  box-shadow: 0 0 16px rgba(0, 240, 255, 0.5);
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.08);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.08);
  }
  70% {
    transform: scale(1);
  }
}

:deep(.q-menu) {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(5, 215, 255, 0.3);
  border-radius: 8px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(5, 215, 255, 0.2);
}

.floating-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
}

.floating-button:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
