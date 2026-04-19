<template>
  <div class="visitor-counter">
    <q-chip color="primary" text-color="white" icon="visibility">
      Visitas: {{ totalVisits.toLocaleString() }}
    </q-chip>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

const totalVisits = ref(0)

onMounted(async () => {
  try {
    const response = await api.get('/ga4/metrics')
    if (response.data.success) {
      totalVisits.value = response.data.data.totalUsers
    }
  } catch (error) {
    console.error('Error cargando visitas:', error)
  }
})
</script>
