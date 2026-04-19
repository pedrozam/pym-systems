<template>
  <div class="visitor-counter">
    <q-chip
      color="primary"
      text-color="white"
      icon="bar_chart"
      clickable
      @click="$router.push('/staticsGA4')"
    >
      Google Analytics: {{ totalVisits.toLocaleString() }} {{totalVisits>1? 'visitas':'visita'}}

      <q-tooltip :offset="[0, 10]" class="!bg-transparent !p-0">
        <div class="bg-gradient-to-r from-[#0B1F33] to-[#123A56] text-white text-xs px-3 py-1.5 rounded-lg border border-[#16B3C4] shadow-lg flex items-center gap-2">
          <q-icon name="insights" class="text-[#22D3E6] text-sm" />
          <span>Ver estadísticas GA4</span>
          <q-icon name="chevron_right" class="text-[#16B3C4] text-xs" />
        </div>
      </q-tooltip>
    </q-chip>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios'

const totalVisits = ref(0)

onMounted(async () => {
  try {
    const response = await api.get('/api/ga4/metrics')
    if (response.data.success) {
      totalVisits.value = response.data.data.totalUsers
    }
  } catch (error) {
    console.error('Error cargando visitas:', error)
  }
})
</script>
