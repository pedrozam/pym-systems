const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); 

const testRoutes = require ('./app/routes/test.routes')
const workflowRoutes= require ("./app/routes/workflow.routes")
const parametricasRoutes= require ("./app/routes/parametricas.routes")
const authRoutes = require("./app/routes/auth.routes")
const serviciosRoutes = require("./app/routes/serviciospym.routes")
const newlesterRoutes = require("./app/routes/newlester.routes")
const ga4Routes = require("./app/routes/ga4.routes")

const cors = require("cors")

// Create a new Express app
const app = express();


const port = process.env.PORT || 5000;
const uri = process.env.URI || 'http://localhost';


// Configure middleware
// middleware to parse request bodies as JSON

app.use('/public', express.static(path.join(__dirname, 'app', 'public')));
app.use(express.json());

app.use(cors({
  origin: [
    'https://www.pymsystems.com',
    'https://pymsystems.com',
    'http://localhost:9000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));


require('./utils/auth');

// Define routes
app.use('/api',testRoutes);

app.use('/api/workflow',workflowRoutes);
app.use('/api/parametricas',parametricasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/newlester', newlesterRoutes);
app.use('/api/ga4', ga4Routes);

app.get('/api/ga4-test', async (req, res) => {
    try {
        const ga4Service = require('./app/services/ga4-service');
        const metrics = await ga4Service.getBasicMetrics();
        res.json({
            success: true,
            message: 'GA4 está configurado correctamente',
            data: metrics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en GA4',
            error: error.message
        });
    }
});

module.exports = app;

