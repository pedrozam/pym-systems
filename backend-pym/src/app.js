const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const testRoutes = require ('./app/routes/test.routes')
const workflowRoutes= require ("./app/routes/workflow.routes")
const parametricasRoutes= require ("./app/routes/parametricas.routes")
const authRoutes = require("./app/routes/auth.routes")
const serviciosRoutes = require("./app/routes/serviciospym.routes")

const cors = require("cors")

// Create a new Express app
const app = express();

dotenv.config(); 
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';


// Configure middleware
// middleware to parse request bodies as JSON

app.use('/public', express.static(path.join(__dirname, 'app', 'public')));
app.use(express.json());

app.use(cors({
  origin: ['https://www.pymsystems.com', 'https://pymsystems.com', 'http://localhost:9000', 'http://localhost:5173', 'http://localhost:3000'],
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


module.exports = app;

