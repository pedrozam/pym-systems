const express = require('express');
const router = express.Router();
const passport = require("passport");


const {
   listarServiciospym
} = require ('../controllers/serviciospym.controller')

/**
 * @swagger
 * /api/servicios/listarServiciospym/{estado}:
 *  get:
 *      summary: Obtiene listado de servicios de PyM Systems
 *      tags: [Servicios PyM]
 *      parameters:
 *           - name: estado
 *             in: path
 *             description: Estado del servicio a listar
 *             required: true
 *             schema:
 *                  type: string
 *                  style: simple
 *      responses:
 *          200:
 *              description: Peticion Exitosa
 *          400:
 *             description: Peticion No existe
 *
 */

router.get(
    '/listarServiciospym/:estado',
    listarServiciospym
);

module.exports = router;
