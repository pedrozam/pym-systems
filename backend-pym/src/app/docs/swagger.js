const dotenv = require('dotenv');
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path")

dotenv.config();
const port = process.env.PORT || 3000;
const uri = process.env.URI || 'http://localhost';
const nodeEnv = process.env.NODE_ENV || 'development';

// En producción usa /backend, en desarrollo usa /
const serverUrl = nodeEnv === 'production' ? "/backend" : "/";

//Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PYM SYSTEMS BACKEND API", 
            version: "1.0.0"
        },
        servers: [
            {
                url: serverUrl,
                description: nodeEnv === 'production' ? 'Production Server (via nginx proxy)' : 'Development Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
            `${path.join(__dirname, "../routes/serviciospym.routes.js")}`,
            `${path.join(__dirname, "../routes/newlester.routes.js")}`,

        ]
};
//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
const swaggerDocs = (app, port) => {
    const customOptions = {
        swaggerOptions: {
            deepLinking: true,
            url: nodeEnv === 'production' ? '/backend/api/docs.json' : '/api/docs.json',
            persistAuthorization: true
        },
        customCss: '.swagger-ui { padding-top: 1rem; }'
    };
    
    app.use('/api/docs', swaggerUi.serve);
    app.get('/api/docs', swaggerUi.setup(swaggerSpec, customOptions));
    
    app.use('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`La documentación de la API puede ser consultada en ${uri}:${port}/api/docs`)
};

module.exports = { swaggerDocs }