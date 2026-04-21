<template>
  <q-page class="q-pa-none relative">
    <div class="relative z-10 container mx-auto px-4 py-12 md:py-16">
      <!-- Tecnologías que utilizamos -->
      <div class="scroll-section section-visible">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative">
          <span class="neon-text-cyan"> Tecnologías que utilizamos </span>
          <div
            class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r from-turquesa to-cyan-400 rounded-full"
          ></div>
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Frontend -->
          <div
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg width="32" height="32">
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
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg width="32" height="32">
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
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg width="32" height="32">
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
            class="bg-black/30 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-turquesa/30 transition-all duration-300"
          >
            <h3 class="text-lg font-semibold text-turquesa mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  <svg width="32" height="32">
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
      </div>
    </div>

    <!-- Modal de tecnología -->
    <DialogVerTecnologia
      v-model="techModalVisible"
      :technology="selectedTechDetails"
      :sprite-url="spriteUrl"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useServiciosPym from 'src/composables/useServiciospym'
import DialogVerTecnologia from 'src/components/dialog/DialogVerTecnologia.vue'

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

// Usar el composable
const { listarTecnologias, dataServpym } = useServiciosPym()

// Estados
const techModalVisible = ref(false)
const selectedTechDetails = ref(null)
const isLoading = ref(true)

// Computed para filtrar tecnologías por tipo
const frontendTechs = computed(() => {
  return dataServpym.value?.frontendTechs || []
})

const backendTechs = computed(() => {
  return dataServpym.value?.backendTechs || []
})

const databaseTechs = computed(() => {
  return dataServpym.value?.databaseTechs || []
})

const devToolsTechs = computed(() => {
  return dataServpym.value?.devToolsTechs || []
})

// Cargar tecnologías desde el servicio
const loadTecnologias = async () => {
  isLoading.value = true
  await listarTecnologias('ACTIVO')
  isLoading.value = false
}

const showTechModal = (tech) => {
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
  await loadTecnologias()
})
</script>

<style scoped>
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
</style>
