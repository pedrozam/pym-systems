const app = require('./app.js');
const dotenv = require('dotenv');
const {swaggerDocs: V1SwaggerDocs} = require("./app/docs/swagger")

dotenv.config();
const port = process.env.PORT || 5000;

// start the server - Escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor listo en http://0.0.0.0:${port}`);
    console.log(`API disponible en http://0.0.0.0:${port}/api`);
    V1SwaggerDocs(app, port);
});