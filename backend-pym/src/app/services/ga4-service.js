const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const config = require('../config/ga4-config');

class GA4Service {
    constructor() {
        this.analyticsDataClient = new BetaAnalyticsDataClient({
            keyFilename: config.credentialsPath
        });
        this.propertyId = config.propertyId;
        this.cache = new Map();
    }

    async getBasicMetrics() {
        const cacheKey = 'basic';
        
        // Verificar cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < config.cacheDuration * 1000) {
                return cached.data;
            }
        }

        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                metrics: [
                    { name: 'totalUsers' },
                    { name: 'activeUsers' },
                    { name: 'newUsers' },
                    { name: 'screenPageViews' }
                ],
                dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }]
            });

            const metrics = response.rows?.[0]?.metricValues || [];
            
            const result = {
                totalUsers: parseInt(metrics[0]?.value || '0'),
                activeUsers: parseInt(metrics[1]?.value || '0'),
                newUsers: parseInt(metrics[2]?.value || '0'),
                pageViews: parseInt(metrics[3]?.value || '0'),
                lastUpdated: new Date().toISOString()
            };

            this.cache.set(cacheKey, {
                data: result,
                timestamp: Date.now()
            });

            return result;
        } catch (error) {
            console.error('Error obteniendo métricas GA4:', error);
            throw error;
        }
    }

    async getDailyVisits() {
        try {
            const [response] = await this.analyticsDataClient.runReport({
                property: `properties/${this.propertyId}`,
                metrics: [{ name: 'activeUsers' }],
                dimensions: [{ name: 'date' }],
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }]
            });

            return response.rows?.map(row => ({
                date: row.dimensionValues[0]?.value || '',
                visits: parseInt(row.metricValues[0]?.value || '0')
            })) || [];
        } catch (error) {
            console.error('Error obteniendo visitas diarias:', error);
            throw error;
        }
    }
}

module.exports = new GA4Service();