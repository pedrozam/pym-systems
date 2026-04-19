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

      <!-- Carousel de Servicios - Nuevo diseño con efecto scroll -->
      <div
        v-if="services.length > 0"
        class="max-w-5xl mx-auto mb-16 scroll-section"
        :class="{ 'section-visible': sectionsVisible.services }"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative">
          <span class="neon-text-cyan"> Nuestros Servicios </span>
          <div
            class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r from-turquesa to-cyan-400 rounded-full"
          ></div>
        </h2>

        <div class="relative">
          <q-carousel
            v-model="currentSlide"
            animated
            swipeable
            infinite
            autoplay
            :autoplay-duration="6000"
            arrows
            navigation
            prev-icon="chevron_left"
            next-icon="chevron_right"
            class="rounded-2xl"
            style="height: auto; min-height: 480px"
          >
            <q-carousel-slide
              v-for="(service, index) in services"
              :key="service.id_servicio"
              :name="index"
              class="q-pa-none"
            >
              <div
                class="rounded-2xl overflow-hidden transition-all duration-300"
                :class="[currentSlide === index ? 'shadow-[0_0_30px_rgba(22,179,196,0.2)]' : '']"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <!-- Lado izquierdo: Imagen -->
                  <div class="relative h-64 md:h-auto overflow-hidden">
                    <img
                      :src="service.image"
                      :alt="service.nombre_servicio"
                      class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent md:from-black/80"
                    ></div>
                    <div class="absolute top-4 left-4 md:top-6 md:left-6">
                      <div
                        class="bg-turquesa/20 backdrop-blur-md rounded-full p-3 border border-turquesa/40"
                      >
                        <svg
                          width="32"
                          height="32"
                          class="text-turquesa"
                        >
                          <use :xlink:href="`${spriteUrl}#${getServiceIcon(service.nom_tipo_servicio)}`" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Lado derecho: Información -->
                  <div
                    class="bg-black/60 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">
                        {{ service.nombre_servicio }}
                      </h3>
                      <p class="text-white/70 mb-6 leading-relaxed">
                        {{ service.descripcion }}
                      </p>
                      <div class="flex items-center gap-6 mb-6">
                        <div>
                          <p class="text-turquesa text-xs uppercase tracking-wider font-semibold">
                            Desde
                          </p>
                          <p class="text-white text-2xl md:text-3xl font-bold">
                            Bs. {{ service.costo_minimo }}
                          </p>
                        </div>
                        <div
                          class="w-px h-10 bg-linear-to-b from-transparent via-turquesa/50 to-transparent"
                        ></div>
                        <div>
                          <p class="text-turquesa text-xs uppercase tracking-wider font-semibold">
                            Tiempo estimado
                          </p>
                          <p class="text-white text-lg font-medium">{{ getTiempoEntrega(service) }}</p>
                        </div>
                      </div>
                      <div class="grid grid-cols-1 gap-2 mb-6">
                        <div
                          v-for="(feature, idx) in service.features"
                          :key="idx"
                          class="flex items-start gap-2"
                        >
                          <div class="mt-1 flex-shrink-0">
                            <svg
                              class="w-4 h-4 text-turquesa"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <span class="text-white/80 text-sm">{{ feature }}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      @click="goToServices"
                      class="mt-4 w-full md:w-auto px-6 py-2.5 bg-linear-to-r from-turquesa to-cyan-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(22,179,196,0.4)]"
                    >
                      Ver más detalles
                    </button>
                  </div>
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>

      <!-- Tecnologías que utilizamos -->
      <div
        class="scroll-section"
        :class="{ 'section-visible': sectionsVisible.technologies }"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative">
          <span class="neon-text-cyan"> Tecnologías que utilizamos </span>
          <div
            class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r from-turquesa to-cyan-400 rounded-full"
          ></div>
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Frontend -->
          <div
            v-if="frontendTechs.length > 0"
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Frontend
            </h3>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="tech in frontendTechs"
                :key="tech.id_tecnologia"
                class="group relative cursor-pointer"
                @click="showTechModal(tech)"
              >
                <div
                  class="bg-white/5 rounded-lg p-2 border border-white/10 hover:border-turquesa/40 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                >
                  <svg
                    width="32"
                    height="32"
                  >
                    <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                  </svg>
                </div>
                <div
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20"
                >
                  <div
                    class="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap border border-turquesa/50"
                  >
                    {{ tech.nombre_tecnologia }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend -->
          <div
            v-if="backendTechs.length > 0"
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM13 10a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Backend
            </h3>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="tech in backendTechs"
                :key="tech.id_tecnologia"
                class="group relative cursor-pointer"
                @click="showTechModal(tech)"
              >
                <div
                  class="bg-white/5 rounded-lg p-2 border border-white/10 hover:border-turquesa/40 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                >
                  <svg
                    width="32"
                    height="32"
                  >
                    <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                  </svg>
                </div>
                <div
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20"
                >
                  <div
                    class="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap border border-turquesa/50"
                  >
                    {{ tech.nombre_tecnologia }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Base de Datos -->
          <div
            v-if="databaseTechs.length > 0"
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M3 12h3v3H3v-3zm4 0h3v3H7v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zM3 8h3v3H3V8zm4 0h3v3H7V8zm4 0h3v3h-3V8zm4 0h3v3h-3V8zM3 4h3v3H3V4zm4 0h3v3H7V4zm4 0h3v3h-3V4zm4 0h3v3h-3V4z"
                />
              </svg>
              Base de Datos
            </h3>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="tech in databaseTechs"
                :key="tech.id_tecnologia"
                class="group relative cursor-pointer"
                @click="showTechModal(tech)"
              >
                <div
                  class="bg-white/5 rounded-lg p-2 border border-white/10 hover:border-turquesa/40 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                >
                  <svg
                    width="32"
                    height="32"
                  >
                    <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                  </svg>
                </div>
                <div
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20"
                >
                  <div
                    class="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap border border-turquesa/50"
                  >
                    {{ tech.nombre_tecnologia }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Herramientas DevOps -->
          <div
            v-if="devToolsTechs.length > 0"
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clip-rule="evenodd"
                />
              </svg>
              DevOps & Herramientas
            </h3>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="tech in devToolsTechs"
                :key="tech.id_tecnologia"
                class="group relative cursor-pointer"
                @click="showTechModal(tech)"
              >
                <div
                  class="bg-white/5 rounded-lg p-2 border border-white/10 hover:border-turquesa/40 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                >
                  <svg
                    width="32"
                    height="32"
                  >
                    <use :xlink:href="`${spriteUrl}#${tech.svg}`" />
                  </svg>
                </div>
                <div
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20"
                >
                  <div
                    class="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap border border-turquesa/50"
                  >
                    {{ tech.nombre_tecnologia }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <button
            @click="goToTecnologias"
            class="group relative px-6 py-2 bg-transparent border border-turquesa rounded-lg font-semibold text-turquesa overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-turquesa/10 hover:shadow-[0_0_20px_rgba(22,179,196,0.3)]"
          >
            <span class="relative z-10">Conocer más</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de tecnología - Componente separado -->
    <DialogVerTecnologia
      v-model="techModalVisible"
      :technology="selectedTechDetails"
      :sprite-url="spriteUrl"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import useServiciosPym from 'src/composables/useServiciospym';
import DialogVerTecnologia from 'src/components/dialog/DialogVerTecnologia.vue';

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

const router = useRouter()

// Usar el composable
const { listarServiciospym, listarTecnologias, dataServpym } = useServiciosPym()

// Efecto de escritura
const firstLineText = 'Tu solución integral para la gestión de sistemas informáticos'
const displayedFirstLine = ref('')
let firstLineIndex = 0
let firstLineInterval = null

// Estado del carousel
const currentSlide = ref(0)
const techModalVisible = ref(false)
const selectedTechDetails = ref(null)
const isLoading = ref(true)

// Visibilidad de secciones
const sectionsVisible = ref({
  services: true,
  technologies: true,
})

// Servicios desde el backend
const services = ref([])

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

// Mapeo de tipos de servicio a íconos
const getServiceIcon = (tipoServicio) => {
  const iconMap = {
    'Pagina Web': 'globe-alt',
    'Sistema Web': 'cog',
    'Sitio E-Commerce': 'shopping-cart',
    'Mantenimiento de equipos': 'support'
  }
  return iconMap[tipoServicio] || 'globe-alt'
}

// Obtener tiempo de entrega del primer costo
const getTiempoEntrega = (service) => {
  if (service.costos && service.costos.length > 0) {
    const costoPrincipal = service.costos.find(c => c.id_servicio === service.id_servicio)
    if (costoPrincipal) {
      return costoPrincipal.tiempo_entrega
    }
  }
  return service.tiempo_inicial || 'Consultar'
}

// Cargar servicios desde el backend
const loadServices = async () => {
  await listarServiciospym('VIGENTE')
  if (dataServpym.value?.list) {
    services.value = dataServpym.value.list
  }
}

// Cargar tecnologías desde el backend
const loadTecnologias = async () => {
  await listarTecnologias('ACTIVO')
}

// Efecto de escritura
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

const handleScroll = () => {
  const viewportHeight = window.innerHeight
  const servicesSection = document.querySelector('.scroll-section:first-of-type')
  if (servicesSection) {
    const servicesRect = servicesSection.getBoundingClientRect()
    if (servicesRect.top < viewportHeight * 0.8 && servicesRect.bottom > 100) {
      sectionsVisible.value.services = true
    } else {
      sectionsVisible.value.services = false
    }
  }

  const techSection = document.querySelector('.scroll-section:last-of-type')
  if (techSection) {
    const techRect = techSection.getBoundingClientRect()
    if (techRect.top < viewportHeight * 0.8 && techRect.bottom > 100) {
      sectionsVisible.value.technologies = true
    } else {
      sectionsVisible.value.technologies = false
    }
  }
}

const goToServices = () => {
  router.push('/servicios')
}

const goToTecnologias = () => {
  router.push('/tecnologias')
}

const showTechModal = (tech) => {
  // Transformar la tecnología al formato esperado por el modal
  selectedTechDetails.value = {
    id: tech.id_tecnologia,
    name: tech.nombre_tecnologia,
    icon: tech.svg,
    description: tech.descripcion_tecnologia,
    url: tech.url_tecnologia
  }
  techModalVisible.value = true
}

onMounted(async () => {
  // Cargar datos desde los servicios
  await Promise.all([loadServices(), loadTecnologias()])
  isLoading.value = false
  
  startTypingEffect()
  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    handleScroll()
  }, 100)
})

onUnmounted(() => {
  if (firstLineInterval) clearInterval(firstLineInterval)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Todos los estilos se mantienen igual */
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
  0%,
  100% {
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

.neon-text-cyan {
  text-shadow:
    0 0 5px rgba(22, 179, 196, 0.5),
    0 0 10px rgba(22, 179, 196, 0.3),
    0 0 20px rgba(22, 179, 196, 0.2);
  background: linear-gradient(135deg, #16b3c4, #22d3e6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.scroll-section {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease-out;
}

.scroll-section.section-visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-section:last-of-type {
  transform: translateX(50px);
}

.scroll-section:last-of-type.section-visible {
  transform: translateX(0);
}

.scroll-section {
  opacity: 1 !important;
  transform: translateX(0) !important;
}

body.loaded .scroll-section {
  transition: all 0.6s ease-out;
}

::-webkit-scrollbar {
  width: 6px;
  background: #0b1f33;
}

::-webkit-scrollbar-thumb {
  background: #16b3c4;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #22d3e6;
}

:deep(.q-carousel__slide) {
  padding: 0 !important;
}

:deep(.q-carousel__control) {
  background: transparent !important;
}

:deep(.q-btn) {
  background: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(4px) !important;
  border: 1px solid rgba(22, 179, 196, 0.5) !important;
  color: white !important;
}

:deep(.q-btn:hover) {
  background: rgba(22, 179, 196, 0.8) !important;
}

:deep(.q-carousel__navigation) {
  bottom: -30px !important;
}

:deep(.q-carousel__navigation .q-carousel__navigation-icon) {
  background: rgba(255, 255, 255, 0.3) !important;
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
}

:deep(.q-carousel__navigation .q-carousel__navigation-icon--active) {
  background: linear-gradient(90deg, #16b3c4, #22d3e6) !important;
  width: 24px !important;
  border-radius: 4px !important;
}
</style>