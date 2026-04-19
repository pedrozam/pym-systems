<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">📊 Estadísticas de Google Analytics 4</div>
        <div class="text-subtitle2">Datos de los últimos 30 días</div>
      </q-card-section>

      <q-card-section>
        <!-- Indicador de carga -->
        <q-linear-progress v-if="loading" :indeterminate="true" color="primary" />

        <!-- Métricas principales -->
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-md-3 col-sm-6 col-xs-12" v-for="metric in metricsList" :key="metric.label">
            <q-card flat bordered class="text-center">
              <q-card-section>
                <div class="text-h4 text-primary">{{ metric.value }}</div>
                <div class="text-caption text-grey-7">{{ metric.label }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Gráfico de visitas diarias -->
        <div class="q-mt-lg">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1">📈 Visitas diarias (últimos 7 días)</div>
            </q-card-section>
            <q-card-section>
              <canvas ref="dailyVisitsChart"></canvas>
            </q-card-section>
          </q-card>
        </div>

        <!-- Botón de actualización -->
        <div class="q-mt-md text-center">
          <q-btn
            label="Actualizar datos"
            icon="refresh"
            color="primary"
            @click="loadAllData"
            :loading="loading"
            :disable="loading"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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

// Lista de métricas para mostrar
const metricsList = computed(() => [
  {
    label: 'Usuarios Totales',
    value: metrics.value.totalUsers.toLocaleString(),
    icon: 'people'
  },
  {
    label: 'Usuarios Activos',
    value: metrics.value.activeUsers.toLocaleString(),
    icon: 'trending_up'
  },
  {
    label: 'Nuevos Usuarios',
    value: metrics.value.newUsers.toLocaleString(),
    icon: 'person_add'
  },
  {
    label: 'Vistas de Página',
    value: metrics.value.pageViews.toLocaleString(),
    icon: 'visibility'
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

// Actualizar gráfico
const updateChart = () => {
  if (!dailyVisits.value.length) return

  const dates = dailyVisits.value.map(item => {
    const date = item.date
    return `${date.slice(6, 8)}/${date.slice(4, 6)}` // Formato DD/MM
  })

  const visits = dailyVisits.value.map(item => item.visits)

  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = document.querySelector('canvas')?.getContext('2d')
  if (ctx) {
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Visitas',
          data: visits,
          borderColor: 'rgb(59, 91, 150)',
          backgroundColor: 'rgba(59, 91, 150, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => `Visitas: ${context.parsed.y}`
            }
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

// Notificaciones
const showSuccess = (message) => {
  if (window.$q) {
    window.$q.notify({
      type: 'positive',
      message: message,
      position: 'top',
      timeout: 2000
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

// Ciclo de vida
onMounted(() => {
  loadAllData()
  // Actualizar cada 5 minutos
  const interval = setInterval(loadAllData, 5 * 60 * 1000)
  // Limpiar intervalo al desmontar
  return () => {
    clearInterval(interval)
    if (chartInstance) {
      chartInstance.destroy()
    }
  }
})
</script>

<style scoped>
.my-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
