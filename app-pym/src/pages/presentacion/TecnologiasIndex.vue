<template>
  <q-page
    class="relative bg-cover bg-center bg-no-repeat"
    :style="backgroundStyle"
  >
    <div class="text-center text-white mb-6 px-4">
      <h2 class="text-3xl font-bold">Tecnologias utilizadas</h2>
      <p class="text-base text-cyan-200 max-w-2xl mx-auto">
        Aqui podrás revisar las tecnologías que empleamos en nuestros proyectos. Da clic a
        cualquiera de ellas para que puedas tener mas información.
      </p>
    </div>

    <!-- Contenedor principal -->
    <div class="relative min-h-screen w-full overflow-hidden">
      <!-- PRIMERA ETAPA: texto centrado vertical/horizontalmente -->
      <div
        v-if="showCenteredCard"
        ref="heroContainer"
        class="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <div
          ref="movingCard"
          class="bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-cyan-400/40 shadow-2xl transition-all duration-500 w-11/12 md:w-auto max-w-2xl animate-pulse-border"
        >
          <h2
            class="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
            :class="neonTextClass"
          >
            Somos PyM Systems
          </h2>
          <p class="text-base md:text-xl text-cyan-200 mt-3 font-medium">
            Tu aliado en automatización y transformación digital.
          </p>
        </div>
      </div>

      <!-- SEGUNDA ETAPA: Layout final con card a la derecha y tecnologías -->
      <div
        v-else
        class="pt-8 md:pt-12 px-4 md:px-8 max-w-7xl mx-auto transition-opacity duration-500"
        :class="{ 'opacity-100': showFinalLayout, 'opacity-0': !showFinalLayout }"
      >
        <div class="flex flex-wrap gap-6">
          <!-- Card en posición col-4 (derecha) -->
          <div class="w-full lg:w-1/3">
            <div
              class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/50 shadow-2xl h-full transition-all duration-300 hover:shadow-cyan-500/30"
            >
              <h2
                class="text-2xl md:text-3xl font-bold text-white"
                :class="neonTextClass"
              >
                Somos PyM Systems
              </h2>
              <p class="text-base text-cyan-200 mt-2">
                Tu aliado en automatización y transformación digital.
              </p>

              <!-- Información adicional de tecnología seleccionada -->
              <div
                v-if="selectedTech"
                class="mt-6 pt-4 border-t border-cyan-400/30"
              >
                <div class="flex items-center gap-3 mb-3">
                  <svg
                    width="40"
                    height="40"
                    class="animate-float"
                  >
                    <use :xlink:href="`${spriteUrl}#${selectedTech.svg}`" />
                  </svg>
                  <h3 class="text-xl font-bold text-cyan-300">{{ selectedTech.nombre_tecnologia }}</h3>
                </div>
                <p class="text-sm text-white/80 leading-relaxed mb-3">
                  {{ selectedTech.descripcion_tecnologia }}
                </p>
                <a
                  :href="selectedTech.url_tecnologia"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 transition-colors"
                >
                  Visitar sitio oficial
                  <i class="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Sección de tecnologías -->
          <div class="flex-1 min-w-[260px]">
            <div class="space-y-8">
              <!-- Card principal de presentación -->
              <div
                class="p-5 md:p-7 border border-cyan-300/30 rounded-2xl backdrop-blur-md bg-cyan-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
              >
                <p class="text-white md:text-xl font-semibold leading-relaxed">
                  <q-icon
                    name="laptop_windows"
                    class="text-cyan-400 mr-2"
                  />
                  Tenemos experiencia en la creación de sitios web profesionales utilizando las
                  siguientes tecnologías:
                </p>
              </div>

              <!-- Frontend -->
              <div
                v-if="frontendTechs.length > 0"
                class="p-5 md:p-6 rounded-2xl border border-cyan-300/30 bg-cyan-950/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
              >
                <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  <i class="fas fa-desktop"></i> Frontend
                </h3>
                <div class="flex flex-wrap gap-5 items-center">
                  <div
                    v-for="tech in frontendTechs"
                    :key="tech.id_tecnologia"
                    class="flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer hover:scale-110 hover:drop-shadow-cyan"
                    @click="showTechInfo(tech)"
                  >
                    <svg
                      width="40"
                      height="40"
                      class="p-1 transition-transform"
                    >
                      <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                    </svg>
                    <span class="text-xs text-white/70">{{ tech.nombre_tecnologia }}</span>
                  </div>
                </div>
              </div>

              <!-- Backend y Base de datos en layout de 2 columnas -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Backend -->
                <div
                  v-if="backendTechs.length > 0"
                  class="p-5 md:p-6 rounded-2xl border border-cyan-300/30 bg-cyan-950/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
                >
                  <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <i class="fas fa-server"></i> Backend
                  </h3>
                  <div class="flex flex-wrap gap-5 items-center">
                    <div
                      v-for="tech in backendTechs"
                      :key="tech.id_tecnologia"
                      class="flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer hover:scale-110 hover:drop-shadow-cyan"
                      @click="showTechInfo(tech)"
                    >
                      <svg
                        width="40"
                        height="40"
                        class="p-1 transition-transform"
                      >
                        <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                      </svg>
                      <span class="text-xs text-white/70">{{ tech.nombre_tecnologia }}</span>
                    </div>
                  </div>
                </div>

                <!-- Base de Datos -->
                <div
                  v-if="databaseTechs.length > 0"
                  class="p-5 md:p-6 rounded-2xl border border-cyan-300/30 bg-cyan-950/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
                >
                  <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <i class="fas fa-database"></i> Base de datos
                  </h3>
                  <div class="flex flex-wrap gap-5 items-center">
                    <div
                      v-for="tech in databaseTechs"
                      :key="tech.id_tecnologia"
                      class="flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer hover:scale-110 hover:drop-shadow-cyan"
                      @click="showTechInfo(tech)"
                    >
                      <svg
                        width="40"
                        height="40"
                        class="p-1 transition-transform"
                      >
                        <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                      </svg>
                      <span class="text-xs text-white/70">{{ tech.nombre_tecnologia }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Herramientas de Desarrollo -->
              <div
                v-if="devToolsTechs.length > 0"
                class="p-5 md:p-6 rounded-2xl border border-cyan-300/30 bg-cyan-950/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
              >
                <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  <i class="fas fa-tools"></i> Herramientas de desarrollo
                </h3>
                <div class="flex flex-wrap gap-5 items-center">
                  <div
                    v-for="tech in devToolsTechs"
                    :key="tech.id_tecnologia"
                    class="flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer hover:scale-110 hover:drop-shadow-cyan"
                    @click="showTechInfo(tech)"
                  >
                    <svg
                      width="40"
                      height="40"
                      class="p-1 transition-transform"
                    >
                      <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                    </svg>
                    <span class="text-xs text-white/70">{{ tech.nombre_tecnologia }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useServiciosPym from 'src/composables/useServiciosPym'

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

// Usar el composable
const { listarTecnologias, dataServpym } = useServiciosPym()

// Estados
const showCenteredCard = ref(true)
const showFinalLayout = ref(false)
const heroContainer = ref(null)
const movingCard = ref(null)
const selectedTech = ref(null)
const isLoading = ref(true)

// Clase neon para Tailwind
const neonTextClass = 'neon-text'

// Computed para filtrar tecnologías por tipo
const frontendTechs = computed(() => {
  return dataServpym.value?.list?.filter(
    tech => tech.nombre_tipo_tecnologia === 'Frontend' && tech.estado === 'ACTIVO'
  ).sort((a, b) => a.orden - b.orden) || []
})

const backendTechs = computed(() => {
  return dataServpym.value?.list?.filter(
    tech => tech.nombre_tipo_tecnologia === 'Backend' && tech.estado === 'ACTIVO'
  ).sort((a, b) => a.orden - b.orden) || []
})

const databaseTechs = computed(() => {
  return dataServpym.value?.list?.filter(
    tech => tech.nombre_tipo_tecnologia === 'Base de Datos' && tech.estado === 'ACTIVO'
  ).sort((a, b) => a.orden - b.orden) || []
})

const devToolsTechs = computed(() => {
  return dataServpym.value?.list?.filter(
    tech => tech.nombre_tipo_tecnologia === 'DevOps & Herramientas' && tech.estado === 'ACTIVO'
  ).sort((a, b) => a.orden - b.orden) || []
})

// Background style con la imagen
const backgroundStyle = {
  backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 20, 30, 0.85)), url('/servicios/inicio.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
}

// Cargar tecnologías desde el servicio
const loadTecnologias = async () => {
  isLoading.value = true
  await listarTecnologias('ACTIVO')
  isLoading.value = false
}

// Mostrar información de la tecnología seleccionada y hacer scroll hacia arriba
const showTechInfo = (tech) => {
  selectedTech.value = tech
  // Scroll suave hacia arriba
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// Función para animar el card hacia la derecha
const animateCardToRight = () => {
  if (!movingCard.value) return

  // Obtener dimensiones actuales del card
  const originalRect = movingCard.value.getBoundingClientRect()

  // Crear clon del card para animar
  const clonedCard = movingCard.value.cloneNode(true)
  clonedCard.id = 'animatedCloneCard'
  clonedCard.style.position = 'fixed'
  clonedCard.style.top = `${originalRect.top}px`
  clonedCard.style.left = `${originalRect.left}px`
  clonedCard.style.width = `${originalRect.width}px`
  clonedCard.style.margin = '0'
  clonedCard.style.zIndex = '9999'
  clonedCard.style.transition = 'all 0.85s cubic-bezier(0.2, 0.9, 0.4, 1.2)'
  clonedCard.style.backdropFilter = 'blur(12px)'
  clonedCard.style.backgroundColor = 'rgba(0,0,0,0.65)'

  // Ocultar el original temporalmente
  movingCard.value.style.opacity = '0'
  movingCard.value.style.visibility = 'hidden'

  document.body.appendChild(clonedCard)

  // Forzar reflow
  clonedCard.offsetHeight

  // Mostrar temporalmente el layout final para obtener coordenadas
  showCenteredCard.value = false
  showFinalLayout.value = true

  // Esperar a que el DOM se actualice
  setTimeout(() => {
    // Obtener la posición de destino (card derecha)
    const rightCard = document.querySelector('.lg\\:w-1\\/3 > div')
    if (rightCard) {
      const targetRect = rightCard.getBoundingClientRect()

      // Animar el clon hacia la posición destino
      clonedCard.style.top = `${targetRect.top}px`
      clonedCard.style.left = `${targetRect.left}px`
      clonedCard.style.width = `${targetRect.width}px`
      clonedCard.style.height = `${targetRect.height}px`

      // Ajustar estilos del contenido para que se vea bien
      const clonedHeading = clonedCard.querySelector('h2')
      const clonedPara = clonedCard.querySelector('p')
      if (clonedHeading) {
        clonedHeading.classList.add('text-xl', 'md:text-2xl')
      }
      if (clonedPara) {
        clonedPara.classList.add('text-sm', 'md:text-base')
      }

      // Cuando termine la animación, remover el clon
      clonedCard.addEventListener('transitionend', () => {
        if (clonedCard && clonedCard.parentNode) {
          clonedCard.remove()
        }
      })

      // Fallback por si no se dispara transitionend
      setTimeout(() => {
        if (clonedCard && clonedCard.parentNode) {
          clonedCard.remove()
        }
      }, 1000)
    }
  }, 50)
}

// Iniciar la animación después de cargar los datos
onMounted(async () => {
  await loadTecnologias()
  
  setTimeout(() => {
    animateCardToRight()
  }, 2000)
})
</script>

<style scoped>
/* Estilos personalizados que no se pueden reemplazar fácilmente con Tailwind */

/* Efecto neon para textos */
.neon-text {
  text-shadow:
    0 0 5px #0ff,
    0 0 10px #0ff,
    0 0 20px rgba(0, 255, 255, 0.5);
}

/* Animación float infinita para el ícono seleccionado */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Animación de pulso para el card centrado */
@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.6);
    border-color: rgba(0, 255, 255, 0.7);
  }
}

.animate-pulse-border {
  animation: pulse-border 1.8s infinite alternate;
}

/* Drop shadow para hover en íconos */
.hover\:drop-shadow-cyan:hover {
  filter: drop-shadow(0 0 8px cyan);
}

/* Estilos para el clon animado */
#animatedCloneCard {
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #0ff;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0cc;
}
</style>