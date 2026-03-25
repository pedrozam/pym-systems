<template>
  <div class="digital-laptop-bg" @mousemove="updateMouse">
    <div class="mouse-spotlight" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>

    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-black/75">
          <q-toolbar class="custom-toolbar">
            <!-- Logo a la izquierda -->
            <a href="/" class="logo-container">
              <img src="/favicon.ico" alt="App logo"
                class="size-28 p-3 cursor-pointer hover:animate-tada hover:infinite" />
            </a>

            <!-- Menú para pantallas grandes (centrado) -->
            <div class="desktop-menu">
              <q-btn-toggle v-model="model" flat stretch toggle-color="red" :options="menuOptions"
                class="items-center gap-1 icon-hover neon-menu-items" />
            </div>

            <!-- Contenedor para botones de la derecha -->
            <div class="right-buttons">
              <!-- Menú hamburguesa para pantallas pequeñas -->
              <div class="mobile-menu-container">
                <q-btn flat round icon="more_vert" class="mobile-menu-btn neon-menu-btn">
                  <q-menu anchor="bottom right" self="top right" :offset="[0, 10]"
                    class="mobile-menu-dropdown bg-black/95 backdrop-blur-md">
                    <div class="mobile-menu-list">
                      <div v-for="option in menuOptions" :key="option.value" class="mobile-menu-item"
                        @click="selectMenuItem(option)">
                        <q-icon :name="option.icon" class="mr-3" />
                        <span>{{ option.label }}</span>
                      </div>
                      <div class="mobile-menu-item login-item" @click="showLogin = true">
                        <q-icon name="account_circle" class="mr-3" />
                        <span>Iniciar sesión</span>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
              </div>

              <!-- Botón de contacto -->
              <q-btn round color="primary" class="floating-button" @click="showContactar = true">
                <svg width="32" height="32" class="p-1">
                  <use :xlink:href="`${spriteUrl}#waap`" />
                </svg>
                <q-tooltip anchor="top right" self="center left" :offset="[10, 10]">
                  Contactar a PyM Systems
                </q-tooltip>
              </q-btn>
            </div>
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

  <q-dialog v-model="showContactar" persistent>
    <ContactarForm @close="showContactar = false" />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import LoginForm from '../components/forms/LoginForm.vue'
import ContactarForm from '../components/forms/ContactarForm.vue'
import spriteUrl from 'assets/sprite.svg'



const $q = useQuasar()
const router = useRouter()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)
const showContactar = ref(false)
const model = ref('inicio')

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
    logoInToolbar.value = true
  }, 5000)

  console.log('MainLayout montado')
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
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8),
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
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8),
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
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8),
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
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8),
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
  text-shadow: 0 0 15px rgba(255, 215, 0, 1),
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.2);
}

:deep(.q-menu .q-item) {
  padding: 0;
}
</style>
