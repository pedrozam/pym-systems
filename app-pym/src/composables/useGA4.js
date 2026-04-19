import { ref } from "vue";
import GA4Service from "src/services/GA4Service";

export default function () {
  const service = new GA4Service();

  const loading = ref(false);
  const metrics = ref({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    pageViews: 0,
  });
  const dailyVisits = ref([]);

  const fetchMetrics = async () => {
    loading.value = true;
    try {
      const resp = await service.getMetrics();
      if (resp && resp.success) {
        metrics.value = resp.data;
        return resp.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching GA4 metrics:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchDailyVisits = async () => {
    loading.value = true;
    try {
      const resp = await service.getDailyVisits();
      if (resp && resp.success) {
        dailyVisits.value = resp.data;
        return resp.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching daily visits:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchAllData = async () => {
    loading.value = true;
    try {
      await Promise.all([fetchMetrics(), fetchDailyVisits()]);
    } catch (error) {
      console.error("Error fetching all GA4 data:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    metrics,
    dailyVisits,
    fetchMetrics,
    fetchDailyVisits,
    fetchAllData,
  };
}
