<template>
  <q-page class="q-pa-none relative">
    <!-- Contenido principal -->
    <div class="relative z-10 container mx-auto px-4 py-12 md:py-16">
      <!-- Hero Section con efecto neon y escritura en línea -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">
          <span
            class="bg-linear-to-r from-turquesa via-turquesa-light to-cyan-300 bg-clip-text text-transparent animate-gradient"
          >
            Innovación Digital
          </span>
        </h1>
        <div class="relative inline-block">
          <p class="text-xl md:text-2xl text-white/80 tracking-wide">
            {{ displayedFirstLine }}<span class="typing-cursor"></span>
          </p>
          <div
            class="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-turquesa to-transparent animate-glow"
          ></div>
        </div>
      </div>

      <!-- Componente de Servicios (carousel) -->
      <ServiciosIndex :sprite-url="spriteUrl" />

      <!-- Tecnologías que utilizamos -->
      <TecnologiasIndex :sprite-url="spriteUrl" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ServiciosIndex from '../servicios//ServiciosIndex.vue';
import TecnologiasIndex from './TecnologiasIndex.vue';

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

// Efecto de escritura
const firstLineText = 'Tu solución integral para la gestión de sistemas informáticos'
const displayedFirstLine = ref('')
let firstLineIndex = 0
let firstLineInterval = null

const startTypingEffect = () => {
  firstLineInterval = setInterval(() => {
    if (firstLineIndex < firstLineText.length) {
      displayedFirstLine.value += firstLineText.charAt(firstLineIndex)
      firstLineIndex++
    } else {
      clearInterval(firstLineInterval)
    }
  }, 50)
}

onMounted(() => {
  startTypingEffect()
})

onUnmounted(() => {
  if (firstLineInterval) clearInterval(firstLineInterval)
})
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes glow {
  0% {
    opacity: 0.3;
    width: 0%;
    left: 50%;
  }
  50% {
    opacity: 1;
    width: 100%;
    left: 0%;
  }
  100% {
    opacity: 0.3;
    width: 0%;
    left: 50%;
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.typing-cursor {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background-color: #16b3c4;
  margin-left: 2px;
  animation: blink 1s infinite;
  vertical-align: middle;
}
</style>