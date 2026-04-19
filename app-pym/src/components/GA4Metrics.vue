<template>
  <div class="min-h-screen w-full p-4 md:p-6 bg-transparent">
    <!-- Contenedor principal con efecto glassmorphism -->
    <div class="max-w-6xl mx-auto">

      <!-- Tarjeta principal con efecto neón -->
      <div class="backdrop-blur-md bg-[#0B1F33]/30 rounded-2xl border border-[#16B3C4]/30 shadow-2xl transition-all duration-500 hover:shadow-[#16B3C4]/20 hover:shadow-xl">

        <!-- Encabezado con gradiente neón -->
        <div class="bg-gradient-to-r from-[#0B1F33] via-[#123A56] to-[#16B3C4]/80 rounded-t-2xl p-4 md:p-6">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span class="text-2xl md:text-3xl animate-pulse">📊</span>
                Estadísticas de Google Analytics 4
              </h1>
              <p class="text-[#4FD1E8] text-sm mt-1">Datos de los últimos 30 días, toma en cuenta que los datos procesados por GA4 aparecen pasadas las 24 a 48 horas.</p>
              <!-- Badge de conexión a Google Analytics debajo del subtítulo -->
              <div
                @click="openGoogleAnalytics"
                class="flex items-center gap-2 mt-2 bg-[#16B3C4]/20 px-3 py-1 rounded-full border border-[#16B3C4]/40 w-fit cursor-pointer transition-all duration-300 hover:bg-[#16B3C4]/30 hover:scale-105 hover:border-[#22D3E6]/60"
              >
                <q-icon name="bar_chart" class="text-[#22D3E6] text-sm" />
                <span class="text-xs text-[#22D3E6] font-medium">Conectado a Google Analytics</span>
                <div class="relative">
                  <div class="w-2 h-2 bg-[#16B3C4] rounded-full animate-ping absolute"></div>
                  <div class="w-2 h-2 bg-[#16B3C4] rounded-full"></div>
                </div>
                <!-- Tooltip con efecto neón -->
                <q-tooltip
                  class="custom-tooltip"
                  :offset="[0, 10]"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <div class="flex items-center gap-2">
                    <q-icon name="open_in_new" class="text-[#22D3E6] text-sm" />
                    <span class="text-white">Ir a Google Analytics</span>
                    <q-icon name="bar_chart" class="text-[#16B3C4] text-sm" />
                  </div>
                </q-tooltip>
              </div>
            </div>

            <!-- Botón de actualización en la esquina superior derecha -->
            <button @click="loadAllData" :disabled="loading"
                    class="relative group px-4 py-2 rounded-lg bg-gradient-to-r from-[#16B3C4] to-[#22D3E6] text-[#0B1F33] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,230,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <span class="flex items-center gap-2">
                <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Actualizando...' : 'Actualizar datos' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-4 md:p-6">
          <!-- Indicador de carga -->
          <div v-if="loading" class="mb-6">
            <div class="h-1 bg-[#123A56] rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-[#16B3C4] to-[#22D3E6] rounded-full animate-pulse"
                   style="width: 60%"></div>
            </div>
          </div>

          <!-- Métricas principales en grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div v-for="metric in metricsList" :key="metric.label"
                 class="group relative overflow-hidden rounded-xl bg-[#0B1F33]/40 backdrop-blur-sm border border-[#16B3C4]/30 p-4 transition-all duration-500 hover:scale-105 hover:border-[#22D3E6]/60 hover:shadow-[0_0_15px_rgba(34,211,230,0.3)]">

              <!-- Efecto de brillo al hover -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#16B3C4]/0 via-[#16B3C4]/10 to-[#22D3E6]/0"></div>

              <!-- Icono decorativo -->
              <div class="absolute top-2 right-2 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                {{ metric.icon }}
              </div>

              <!-- Valor -->
              <div class="text-3xl md:text-4xl font-bold text-[#22D3E6] group-hover:text-[#4FD1E8] transition-colors duration-300 text-center">
                {{ metric.value }}
              </div>

              <!-- Etiqueta -->
              <div class="text-xs text-[#4FD1E8]/70 text-center mt-2 uppercase tracking-wider">
                {{ metric.label }}
              </div>
            </div>
          </div>

          <!-- Gráfico de visitas diarias -->
          <div class="mb-8 rounded-xl bg-[#0B1F33]/40 backdrop-blur-sm border border-[#16B3C4]/30 p-4 transition-all duration-500 hover:border-[#22D3E6]/40">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-xl">📈</span>
              <h3 class="text-lg font-semibold text-white">Visitas diarias</h3>
              <span class="text-xs text-[#4FD1E8]/60">últimos 7 días</span>
            </div>
            <div class="relative">
              <canvas ref="dailyVisitsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { api } from 'src/boot/axios'
import Chart from 'chart.js/auto'

// Estados
const loading = ref(false)
const metrics = ref({
  totalUsers: 0,
  activeUsers: 0,
  newUsers: 0,
  pageViews: 0
})
const dailyVisits = ref([])
let chartInstance = null
let intervalId = null

// Lista de métricas para mostrar
const metricsList = computed(() => [
  {
    label: 'Usuarios Totales',
    value: metrics.value.totalUsers.toLocaleString(),
    icon: '👥'
  },
  {
    label: 'Usuarios Activos',
    value: metrics.value.activeUsers.toLocaleString(),
    icon: '📈'
  },
  {
    label: 'Nuevos Usuarios',
    value: metrics.value.newUsers.toLocaleString(),
    icon: '✨'
  },
  {
    label: 'Vistas de Página',
    value: metrics.value.pageViews.toLocaleString(),
    icon: '👁️'
  }
])

// Cargar métricas básicas
const loadMetrics = async () => {
  try {
    const response = await api.get('/api/ga4/metrics')
    if (response.data.success) {
      metrics.value = response.data.data
    }
  } catch (error) {
    console.error('Error cargando métricas:', error)
    showError('Error al cargar métricas básicas')
  }
}

// Cargar visitas diarias
const loadDailyVisits = async () => {
  try {
    const response = await api.get('/api/ga4/daily-visits')
    if (response.data.success && response.data.data) {
      dailyVisits.value = response.data.data
      updateChart()
    }
  } catch (error) {
    console.error('Error cargando visitas diarias:', error)
    showError('Error al cargar visitas diarias')
  }
}

// Actualizar gráfico con estilo neón
const updateChart = () => {
  if (!dailyVisits.value.length) return

  const dates = dailyVisits.value.map(item => {
    const date = item.date
    return `${date.slice(6, 8)}/${date.slice(4, 6)}`
  })

  const visits = dailyVisits.value.map(item => item.visits)

  if (chartInstance) {
    chartInstance.destroy()
  }

  const canvas = document.querySelector('canvas')
  if (canvas) {
    const ctx = canvas.getContext('2d')
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Visitas',
          data: visits,
          borderColor: '#22D3E6',
          backgroundColor: 'rgba(34, 211, 230, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#16B3C4',
          pointBorderColor: '#22D3E6',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              color: '#4FD1E8',
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0B1F33',
            titleColor: '#22D3E6',
            bodyColor: '#4FD1E8',
            borderColor: '#16B3C4',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            grid: { color: '#16B3C4/20' },
            ticks: { color: '#4FD1E8' }
          },
          x: {
            grid: { color: '#16B3C4/20' },
            ticks: { color: '#4FD1E8' }
          }
        }
      }
    })
  }
}

// Cargar todos los datos
const loadAllData = async () => {
  loading.value = true
  try {
    await Promise.all([
      loadMetrics(),
      loadDailyVisits()
    ])
    showSuccess('Datos actualizados correctamente')
  } catch (error) {
    console.error('Error cargando datos:', error)
  } finally {
    loading.value = false
  }
}

// Notificaciones con estilo
const showSuccess = (message) => {
  if (window.$q) {
    window.$q.notify({
      type: 'positive',
      message: message,
      position: 'top',
      timeout: 2000,
      classes: 'bg-[#16B3C4] text-[#0B1F33]'
    })
  }
}

const showError = (message) => {
  if (window.$q) {
    window.$q.notify({
      type: 'negative',
      message: message,
      position: 'top',
      timeout: 3000
    })
  }
}

const openGoogleAnalytics = () => {
  if (typeof window !== 'undefined') {
    window.open('https://analytics.google.com/', '_blank')
  }
}

// Ciclo de vida
onMounted(() => {
  loadAllData()
  intervalId = setInterval(loadAllData, 5 * 60 * 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
/* Solo estilos específicos que Tailwind no puede cubrir fácilmente */
canvas {
  max-height: 400px;
  width: 100%;
}

/* Animación personalizada para el badge */
@keyframes subtle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: subtle-pulse 2s ease-in-out infinite;
}

/* Estilos personalizados para el tooltip */
:deep(.custom-tooltip) {
  background: linear-gradient(135deg, #0B1F33 0%, #123A56 100%);
  border: 1px solid #16B3C4;
  border-radius: 8px;
  padding: 6px 12px;
  box-shadow: 0 0 15px rgba(34, 211, 230, 0.3);
  backdrop-filter: blur(4px);
}

:deep(.custom-tooltip .q-tooltip__content) {
  color: #4FD1E8;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Animación de entrada */
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.custom-tooltip) {
  animation: tooltipFadeIn 0.2s ease-out;
}
</style>
