const express = require('express');
const router = express.Router();
const ga4Service = require('../services/ga4-service');

// Middleware para manejar errores async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Obtener métricas básicas
router.get('/metrics', asyncHandler(async (req, res) => {
    const metrics = await ga4Service.getBasicMetrics();
    res.json({
        success: true,
        data: metrics
    });
}));

// Obtener visitas diarias
router.get('/daily-visits', asyncHandler(async (req, res) => {
    const dailyVisits = await ga4Service.getDailyVisits();
    res.json({
        success: true,
        data: dailyVisits
    });
}));

// Health check específico para GA4
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'GA4 API is working',
        propertyId: process.env.GA4_PROPERTY_ID ? 'configured' : 'missing'
    });
});

module.exports = router;