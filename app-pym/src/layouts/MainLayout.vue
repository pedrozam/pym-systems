<template>
  <div
    class="digital-laptop-bg"
    @mousemove="updateMouse"
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
                toggle-color="red"
                :options="menuOptions"
                class="items-center gap-1 icon-hover neon-menu-items"
              />
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

// Variables para el efecto de humo
let hue = 0
let lastX = 0
let lastY = 0
let spotlightElement = null
let lastTrailTime = 0

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

  // Actualizar el gradiente de colores dinámicamente
  if (spotlightElement) {
    // Calcular velocidad del mouse
    const deltaX = Math.abs(event.clientX - lastX)
    const deltaY = Math.abs(event.clientY - lastY)
    const speed = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 1.5, 25)

    // Cambiar color basado en velocidad y posición
    const positionHue = (event.clientX / window.innerWidth) * 360
    hue = (hue + speed + 2) % 360

    // Mezclar color basado en posición y velocidad
    const finalHue = (hue + positionHue) / 2

    // Crear gradiente radial con múltiples puntos de luz para efecto orgánico
    const gradient = `radial-gradient(circle at ${30 + Math.sin(Date.now() * 0.005) * 20}% ${40 + Math.cos(Date.now() * 0.007) * 20}%, 
      hsla(${finalHue}, 100%, 65%, 0.95) 0%,
      hsla(${(finalHue + 40) % 360}, 100%, 60%, 0.85) 12%,
      hsla(${(finalHue + 80) % 360}, 100%, 55%, 0.75) 25%,
      hsla(${(finalHue + 120) % 360}, 100%, 50%, 0.65) 38%,
      hsla(${(finalHue + 160) % 360}, 100%, 45%, 0.55) 52%,
      hsla(${(finalHue + 200) % 360}, 100%, 40%, 0.45) 66%,
      hsla(${(finalHue + 240) % 360}, 100%, 35%, 0.35) 80%,
      transparent 100%)`

    spotlightElement.style.background = gradient

    // Ajustar tamaño basado en velocidad (más rápido = más grande)
    const baseSize = 150
    const sizeIncrease = Math.min(speed * 3, 80)
    spotlightElement.style.width = `${baseSize + sizeIncrease}px`
    spotlightElement.style.height = `${baseSize + sizeIncrease}px`

    // Crear estela de humo con limitador de frecuencia
    const now = Date.now()
    if (speed > 5 && now - lastTrailTime > 50) {
      const numberOfTrails = Math.min(Math.floor(speed / 8), 3)
      for (let i = 0; i < numberOfTrails; i++) {
        setTimeout(() => {
          createSmokeTrail(event.clientX, event.clientY, finalHue, speed, i)
        }, i * 30)
      }
      lastTrailTime = now
    }

    lastX = event.clientX
    lastY = event.clientY
  }
}

// Función para crear estela de humo con formas aleatorias
function createSmokeTrail(x, y, baseHue, speed) {
  const trail = document.createElement('div')

  // Tamaño variable basado en velocidad y índice
  const size = 40 + Math.random() * 80 + speed * 1.5

  // Formas aleatorias para cada estela
  const randomShape = getRandomShape()

  trail.className = 'smoke-trail'
  trail.style.cssText = `
    left: ${x + (Math.random() - 0.5) * 30}px;
    top: ${y + (Math.random() - 0.5) * 30}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: ${randomShape};
    background: radial-gradient(circle at ${20 + Math.random() * 60}% ${20 + Math.random() * 60}%,
      hsla(${baseHue + Math.random() * 80}, 100%, 65%, 0.8) 0%,
      hsla(${baseHue + 100 + Math.random() * 80}, 100%, 60%, 0.6) 25%,
      hsla(${baseHue + 200 + Math.random() * 80}, 100%, 55%, 0.4) 50%,
      transparent 85%);
    filter: blur(${6 + Math.random() * 18 + speed * 0.5}px);
    animation: fadeOutSmoke ${0.6 + Math.random() * 0.6}s ease-out forwards;
    transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
  `

  document.body.appendChild(trail)

  // Remover la estela después de la animación
  setTimeout(() => {
    if (trail && trail.remove) {
      trail.remove()
    }
  }, 1200)
}

// Generar formas orgánicas aleatorias
function getRandomShape() {
  const shapes = [
    `${40 + Math.random() * 30}% ${50 + Math.random() * 30}% ${30 + Math.random() * 40}% ${50 + Math.random() * 30}% / ${45 + Math.random() * 30}% ${40 + Math.random() * 30}% ${50 + Math.random() * 30}% ${45 + Math.random() * 30}%`,
    `${50 + Math.random() * 40}% ${30 + Math.random() * 40}% ${40 + Math.random() * 30}% ${60 + Math.random() * 30}% / ${55 + Math.random() * 30}% ${45 + Math.random() * 30}% ${40 + Math.random() * 30}% ${50 + Math.random() * 30}%`,
    `${45 + Math.random() * 35}% ${55 + Math.random() * 35}% ${35 + Math.random() * 45}% ${45 + Math.random() * 35}% / ${50 + Math.random() * 40}% ${50 + Math.random() * 30}% ${45 + Math.random() * 35}% ${55 + Math.random() * 30}%`,
  ]
  return shapes[Math.floor(Math.random() * shapes.length)]
}

// Limpiar estelas periódicamente
function cleanupSmokeTrails() {
  const trails = document.querySelectorAll('.smoke-trail')
  if (trails.length > 60) {
    for (let i = 0; i < trails.length - 40; i++) {
      trails[i].remove()
    }
  }
}

function selectMenuItem(option) {
  model.value = option.value
  if (option.to) {
    router.push(option.to)
  }
}

onMounted(() => {
  $q.dark.set(false)

  // Obtener referencia al elemento spotlight
  setTimeout(() => {
    spotlightElement = document.querySelector('.mouse-spotlight')
    if (spotlightElement) {
      spotlightElement.style.width = '150px'
      spotlightElement.style.height = '150px'
    }
  }, 100)

  // Limpiar estelas cada 4 segundos
  const cleanupInterval = setInterval(cleanupSmokeTrails, 4000)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)

  // Guardar intervalo para limpiar en el unmount
  window._cleanupInterval = cleanupInterval
})

onBeforeUnmount(() => {
  // Limpiar todas las estelas
  const trails = document.querySelectorAll('.smoke-trail')
  trails.forEach((trail) => trail.remove())

  // Limpiar intervalo
  if (window._cleanupInterval) {
    clearInterval(window._cleanupInterval)
  }
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

/* Estilos responsivos para mostrar/ocultar menús */
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
}

/* Estilos para los efectos neon y animaciones */
.neon-menu-items :deep(.q-btn) {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Efecto neon al pasar el mouse */
.neon-menu-items :deep(.q-btn:hover) {
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 30px rgba(255, 215, 0, 0.4);
  transform: scale(1.05);
  animation: neonPulse 1s infinite;
}

/* Efecto digital al hacer clic */
.neon-menu-items :deep(.q-btn:active) {
  transform: scale(0.95);
  animation: digitalClick 0.3s ease-out;
}

/* Efecto para el botón del menú móvil */
.neon-menu-btn {
  transition: all 0.3s ease;
}

.neon-menu-btn:hover {
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6);
  transform: scale(1.1);
  animation: neonPulse 1s infinite;
}

.neon-menu-btn:active {
  transform: scale(0.9);
  animation: digitalClick 0.3s ease-out;
}

/* Estilos para los items del menú móvil */
.mobile-menu-list {
  min-width: 220px;
  padding: 0.5rem 0;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  font-size: 0.95rem;
}

.mobile-menu-item:hover {
  text-shadow:
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6);
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  transform: translateX(5px);
  animation: neonPulse 1s infinite;
}

.mobile-menu-item:active {
  transform: translateX(5px) scale(0.98);
  animation: digitalClick 0.3s ease-out;
}

.mobile-menu-item .q-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.mobile-menu-item:hover .q-icon {
  transform: scale(1.1);
}

.login-item {
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  margin-top: 0.5rem;
  padding-top: 0.75rem;
}

/* Animaciones */
@keyframes neonPulse {
  0% {
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }

  50% {
    text-shadow:
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 30px rgba(255, 215, 0, 0.6);
  }

  100% {
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
}

@keyframes digitalClick {
  0% {
    filter: brightness(1);
    letter-spacing: normal;
    transform: scale(1);
  }

  50% {
    filter: brightness(1.3);
    letter-spacing: 2px;
    transform: scale(0.98);
  }

  100% {
    filter: brightness(1);
    letter-spacing: normal;
    transform: scale(1);
  }
}

/* Efecto de brillo adicional para items seleccionados */
.neon-menu-items :deep(.q-btn-item--active) {
  text-shadow:
    0 0 15px rgba(255, 215, 0, 1),
    0 0 25px rgba(255, 215, 0, 0.8);
  position: relative;
}

.neon-menu-items :deep(.q-btn-item--active)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  animation: linePulse 1.5s infinite;
}

@keyframes linePulse {
  0% {
    opacity: 0.3;
    transform: scaleX(0.8);
  }

  50% {
    opacity: 1;
    transform: scaleX(1);
  }

  100% {
    opacity: 0.3;
    transform: scaleX(0.8);
  }
}

/* Ajustes para el toolbar en móvil */
@media (max-width: 767px) {
  .custom-toolbar {
    padding: 0.5rem;
  }

  .right-buttons {
    gap: 0.25rem;
  }
}

/* Estilo para el menú desplegable */
:deep(.q-menu) {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.2);
}

:deep(.q-menu .q-item) {
  padding: 0;
}
</style>
