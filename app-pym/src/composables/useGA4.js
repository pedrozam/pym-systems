import { ref } from 'vue'
import { api } from 'src/boot/axios'

export function useGA4() {
  const loading = ref(false)
  const metrics = ref({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    pageViews: 0
  })
  const dailyVisits = ref([])

  const fetchMetrics = async () => {
    loading.value = true
    try {
      const response = await api.get('/api/ga4/metrics')
      if (response.data.success) {
        metrics.value = response.data.data
        return response.data.data
      }
    } catch (error) {
      console.error('Error fetching GA4 metrics:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchDailyVisits = async () => {
    try {
      const response = await api.get('/api/ga4/daily-visits')
      if (response.data.success) {
        dailyVisits.value = response.data.data
        return response.data.data
      }
    } catch (error) {
      console.error('Error fetching daily visits:', error)
      throw error
    }
  }

  const fetchAllData = async () => {
    await Promise.all([
      fetchMetrics(),
      fetchDailyVisits()
    ])
  }

  return {
    loading,
    metrics,
    dailyVisits,
    fetchMetrics,
    fetchDailyVisits,
    fetchAllData
  }
}
