import { api } from "src/boot/axios";

class GA4Service {
  async getMetrics() {
    try {
      const { data } = await api.get("/api/ga4/metrics");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getDailyVisits() {
    try {
      const { data } = await api.get("/api/ga4/daily-visits");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default GA4Service;
