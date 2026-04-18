<template>
  <div
    class="bbq-layout-bg relative overflow-hidden min-h-screen"
    @mousemove="updateMouse"
    @click="handleClick"
  >
    <!-- Efecto spotlight -->
    <div
      class="mouse-spotlight fixed pointer-events-none rounded-full bg-gradient-radial from-amber-400/40 via-orange-500/20 to-transparent transition-all duration-75"
      :class="isSpotlightActive ? 'scale-110 opacity-100' : 'opacity-70'"
      :style="{
        left: mouseX + 'px',
        top: mouseY + 'px',
        width: '40px',
        height: '40px',
        transform: 'translate(-50%, -50%)',
      }"
    ></div>

    <!-- Líneas decorativas -->
    <div class="bbq-lines"></div>

    <div class="bbq-content">
      <q-layout view="hHh lpR fff">
        <!-- Header con menú -->
        <q-header elevated class="bg-black/75 backdrop-blur-md border-b border-amber-500/30">
          <q-toolbar class="flex justify-between items-center w-full px-2 md:px-4 py-2">
            <!-- Logo izquierda -->
            <a href="#/bbq" class="flex-shrink-0">
              <img
                src="/bbq/logo.png"
                alt="Pizza logo"
                class="size-24 md:size-28 p-2 cursor-pointer hover:animate-pulse"
              />
            </a>

            <!-- Menú desktop centrado -->
            <div class="hidden md:flex flex-1 justify-center mx-4">
              <q-btn-toggle
                v-model="model"
                flat
                stretch
                toggle-color="orange"
                :options="menuOptions"
                class="items-center gap-1"
                :class="neonBtnClass"
              />
            </div>

            <!-- Botones derecha -->
            <div class="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <!-- Menú hamburguesa mobile -->
              <div class="md:hidden">
                <q-btn
                  flat
                  round
                  icon="menu"
                  class="transition-all duration-300 hover:scale-110 hover:text-amber-400 text-amber-200"
                >
                  <q-menu
                    anchor="bottom right"
                    self="top right"
                    :offset="[0, 10]"
                    class="bg-black/95 backdrop-blur-md border border-amber-400/30 rounded-lg shadow-lg"
                  >
                    <div class="mobile-menu-list">
                      <div
                        v-for="option in menuOptions"
                        :key="option.value"
                        class="flex items-center px-6 py-3 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:text-amber-400 hover:bg-amber-400/10 text-white font-medium"
                        @click="selectMenuItem(option)"
                      >
                        <svg width="24" height="24" class="mr-3">
                          <use :xlink:href="`${spriteUrl}#${option.icon}`" />
                        </svg>
                        <span>{{ option.label }}</span>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
              </div>

              <!-- Botón flotante WhatsApp -->
              <q-btn
                round
                color="green"
                class="fixed bottom-5 left-5 z-[9999] transition-transform hover:scale-105 shadow-lg"
                @click="openWhatsApp"
              >
                <svg width="28" height="28" class="p-1">
                  <use :xlink:href="`${spriteUrl}#waap`" />
                </svg>
                <q-tooltip anchor="top right" self="center left" :offset="[10, 10]">
                  ¡Pide tu pizza por WhatsApp!
                </q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <router-view :spriteUrl="spriteUrl" />
        </q-page-container>

        <!-- Footer componente separado -->
        <FooterBbq :spriteUrl="spriteUrl" />
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import FooterBbq from 'src/components/FooterBbq.vue'

const spriteUrl = '/sprite.svg'
const router = useRouter()
const mouseX = ref(0)
const mouseY = ref(0)
const model = ref('inicio')
const isSpotlightActive = ref(false)

let spotlightElement = null
let activeTimeout = null

const neonBtnClass =
  '[&_.q-btn]:relative [&_.q-btn]:overflow-hidden [&_.q-btn]:text-amber-200 [&_.q-btn]:bg-transparent [&_.q-btn]:font-medium [&_.q-btn]:transition-all [&_.q-btn]:duration-300 [&_.q-btn:hover]:scale-110 [&_.q-btn:hover]:text-amber-400 [&_.q-btn:hover]:shadow-[0_0_12px_#ff8c00] [&_.q-btn:hover]:bg-amber-400/5 [&_.q-btn[aria-pressed=true]]:text-amber-400 [&_.q-btn[aria-pressed=true]]:shadow-[0_0_20px_#ff8c00] [&_.q-btn[aria-pressed=true]]:bg-amber-400/15'

const menuOptions = [
  { label: 'Inicio', value: 'inicio', icon: 'home', to: '/' },
  { label: 'Nuestro Menu', value: 'menu', icon: 'menu_book', to: '/menu' },
  { label: 'Pedidos', value: 'pedidos', icon: 'shopping_cart', to: '/pedidos' },
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
  dataPoint.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;background:#ff8c00;border-radius:50%;box-shadow:0 0 8px #ff8c00;pointer-events:none;z-index:10000;animation:fadeOut 0.5s ease-out forwards;`
  document.body.appendChild(dataPoint)
  setTimeout(() => dataPoint.remove(), 500)

  const codeDigits = ['🍕', '🔥', '⭐', '✨', '🍖', '🌶️']
  const codeDigit = document.createElement('div')
  codeDigit.textContent = codeDigits[Math.floor(Math.random() * codeDigits.length)]
  codeDigit.style.cssText = `position:fixed;left:${x + (Math.random() - 0.5) * 40}px;top:${y + (Math.random() - 0.5) * 40}px;color:#ff8c00;font-family:monospace;font-size:16px;pointer-events:none;z-index:10001;animation:floatUp 1s ease-out forwards;`
  document.body.appendChild(codeDigit)
  setTimeout(() => codeDigit.remove(), 1000)
}

function createDigitalRipple(x, y) {
  const ripple = document.createElement('div')
  ripple.className = 'digital-ripple'
  ripple.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:40px;height:40px;transform:translate(-50%,-50%);border:2px solid #ff8c00;border-radius:50%;pointer-events:none;z-index:10002;animation:rippleExpand 0.6s ease-out forwards;`
  document.body.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

function selectMenuItem(option) {
  model.value = option.value
  if (option.to) {
    router.push(option.to)
  }
}

function openWhatsApp() {
  window.open('https://wa.me/59179543794?text=Hola!%20Quisiera%20hacer%20un%20pedido%20de%20pizza', '_blank')
}

onMounted(() => {
  setTimeout(() => {
    spotlightElement = document.querySelector('.mouse-spotlight')
  }, 100)
  window._lastDataPoint = 0
})

onBeforeUnmount(() => {
  if (activeTimeout) clearTimeout(activeTimeout)
  document.querySelectorAll('.data-point, .code-digit, .digital-ripple').forEach((el) => el.remove())
})
</script>

<style>
@keyframes fadeOut {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(2); }
}

@keyframes floatUp {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-50px); }
}

@keyframes rippleExpand {
  0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(3); }
}

.bg-gradient-radial {
  background-image: radial-gradient(circle, var(--tw-gradient-stops));
}

.bbq-layout-bg {
  background: linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%);
  min-height: 100vh;
}

.bbq-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 140, 0, 0.03) 0px,
    rgba(255, 140, 0, 0.03) 2px,
    transparent 2px,
    transparent 8px
  );
}
</style>
