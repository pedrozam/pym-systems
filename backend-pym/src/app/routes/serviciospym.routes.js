const express = require('express');
const router = express.Router();
const passport = require("passport");


const {
   listarServiciospym,
   listarTecnologias,
   gestionContactoWaap,
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

/**
 * @swagger
 * /api/servicios/listarTecnologias/{estado}:
 *  get:
 *      summary: Obtiene listado de tecnologías de PyM Systems
 *      tags: [Servicios PyM]
 *      parameters:
 *           - name: estado
 *             in: path
 *             description: Estado de la tecnología a listar
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
    '/listarTecnologias/:estado',
    listarTecnologias
);

/**
 * @swagger
 * /api/servicios/gestionContactoWaap:
 *   post:
 *     summary: Gestionar contacto por Waap
 *     description: |
 *       Endpoint para gestionar contactos a través de Waap. Soporta las siguientes transacciones:
 *       - **ENVIAR**: Crear un nuevo contacto y derivar a WhatsApp
 *       - **ANULAR**: Anular un contacto existente
 *       - **RESTAURAR**: Restaurar un contacto anulado
 *       - **ATENDER**: Marcar un contacto como atendido
 *     tags: [Contactos Waap]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transaccion
 *               - estado
 *             properties:
 *               transaccion:
 *                 type: string
 *                 enum: [ENVIAR, ANULAR, RESTAURAR, ATENDER]
 *                 description: Tipo de transacción a realizar
 *                 example: ENVIAR
 *               estado:
 *                 type: string
 *                 description: Estado actual del contacto
 *                 example: PENDIENTE
 *               id_usuario_sesion:
 *                 type: integer
 *                 description: ID del usuario que realiza la operación
 *                 example: 123
 *               id_contacto:
 *                 type: integer
 *                 description: ID del contacto (solo para transacciones que no sean ENVIAR)
 *                 example: 1
 *               nombre_contacto:
 *                 type: string
 *                 description: Nombre del contacto
 *                 example: Juan Pérez
 *               institucion_empresa:
 *                 type: string
 *                 description: Institución o empresa
 *                 example: Empresa XYZ
 *               celular:
 *                 type: string
 *                 description: Número de celular
 *                 example: 59171234567
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico
 *                 example: pedro.zambrana.rivera@gmail.com
 *               mensaje:
 *                 type: string
 *                 description: Mensaje de consulta
 *                 example: Necesito información sobre los servicios
 *               resolucion_consulta:
 *                 type: string
 *                 description: Resolución de la consulta (para ATENDER)
 *               fecha_atencion:
 *                 type: string
 *                 format: date
 *               fecha_conclusion:
 *                 type: string
 *                 format: date
 *               id_suscriptor:
 *                 type: integer
 *                 description: ID del suscriptor (requerido para ANULAR, RESTAURAR, ATENDER)
 *                 example: 1
 *           examples:
 *             envio:
 *               summary: Ejemplo para ENVIAR
 *               value:
 *                 transaccion: "ENVIAR"
 *                 estado: "INICIAL"
 *                 id_usuario_sesion: 2
 *                 nombre_contacto: "Juan Pérez"
 *                 institucion_empresa: "Empresa XYZ"
 *                 celular: "59171234567"
 *                 correo: "pedro.zambrana.rivera@gmail.com"
 *                 mensaje: "Necesito información"
 *             actualizacion:
 *               summary: Ejemplo para ANULAR/RESTAURAR/ATENDER
 *               value:
 *                 transaccion: "ANULAR"
 *                 estado: "ACTIVO"
 *                 id_usuario_sesion: 123
 *                 id_suscriptor: 1
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     correcto:
 *                       type: boolean
 *                       example: true
 *                     notificacion:
 *                       type: string
 *                       example: "Te estamos derivando a Whatsaap..."
 *                     codigoresultado:
 *                       type: integer
 *                       example: 200
 *                     datoadicional:
 *                       type: integer
 *                       example: 123
 *       400:
 *         description: Error en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post(
    '/gestionContactoWaap',
    gestionContactoWaap
);

module.exports = router;
