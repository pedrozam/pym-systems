const express = require('express');
const passport = require('passport');
const {
    gestionNewlester,
} = require("../controllers/newlester.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GestionNewlesterRequest:
 *       type: object
 *       required:
 *         - transaccion
 *         - estado
 *         - id_usuario_sesion
 *         - ci_usuario_sesion
 *       properties:
 *         transaccion:
 *           type: string
 *           description: Tipo de operación a realizar
 *           enum: [CREAR, ANULAR, RESTAURAR]
 *           example: "CREAR"
 *         estado:
 *           type: string
 *           description: Estado actual de la suscripción
 *           example: "INICIAL"
 *         id_usuario_sesion:
 *           type: integer
 *           description: ID del usuario que realiza la operación
 *           example: 1
 *         ci_usuario_sesion:
 *           type: string
 *           description: CI del usuario que realiza la operación
 *           example: "111"
 *         id_suscriptor:
 *           type: integer
 *           description: ID del suscriptor (requerido para ANULAR y RESTAURAR)
 *           nullable: true
 *           example: 1
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario asociado a la suscripción
 *           nullable: true
 *           example: 2
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico para suscripción (requerido para CREAR)
 *           nullable: true
 *           example: "usuario@ejemplo.com"
 *     
 *     GestionNewlesterResponse:
 *       type: object
 *       properties:
 *         correcto:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         notificacion:
 *           type: string
 *           description: Mensaje descriptivo del resultado
 *           example: "¡Suscripción exitosa! Revisa tu correo."
 *         codigoresultado:
 *           type: integer
 *           description: Código de resultado (200=éxito, 400=error, 404=no encontrado)
 *           example: 200
 *         datoadicional:
 *           type: integer
 *           description: Dato adicional (ej. ID del suscriptor)
 *           example: 5
 *
 * @swagger
 * /api/newlester/gestionNewlester:
 *   post:
 *     summary: Gestionar suscripción al newsletter
 *     description: |
 *       Permite crear una nueva suscripción, anular o restaurar una suscripción existente al newsletter.
 *       El servicio ejecuta el procedimiento almacenado `p_gestion_newlester`.
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GestionNewlesterRequest'
 *           examples:
 *             crearSuscripcion:
 *               summary: Crear nueva suscripción
 *               value:
 *                 transaccion: "CREAR"
 *                 estado: "INICIAL"
 *                 id_usuario_sesion: 2
 *                 ci_usuario_sesion: "111"
 *                 id_suscriptor: null
 *                 id_usuario: 2
 *                 correo: "usuario@ejemplo.com"
 *             anularSuscripcion:
 *               summary: Anular suscripción existente
 *               value:
 *                 transaccion: "ANULAR"
 *                 estado: "ACTIVO"
 *                 id_usuario_sesion: 2
 *                 ci_usuario_sesion: "111"
 *                 id_suscriptor: 1
 *                 id_usuario: null
 *                 correo: null
 *             restaurarSuscripcion:
 *               summary: Restaurar suscripción anulada
 *               value:
 *                 transaccion: "RESTAURAR"
 *                 estado: "ANULADO"
 *                 id_usuario_sesion: 2
 *                 ci_usuario_sesion: "111"
 *                 id_suscriptor: 1
 *                 id_usuario: null
 *                 correo: null
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GestionNewlesterResponse'
 *             examples:
 *               suscripcionExitosa:
 *                 summary: Suscripción creada exitosamente
 *                 value:
 *                   correcto: true
 *                   notificacion: "¡Suscripción exitosa! Revisa tu correo."
 *                   codigoresultado: 200
 *                   datoadicional: 5
 *               suscripcionYaActiva:
 *                 summary: El usuario ya tiene suscripción activa
 *                 value:
 *                   correcto: true
 *                   notificacion: "Hey, ya tienes una suscripción activa. Te seguirá llegando nuestras noticias."
 *                   codigoresultado: 200
 *                   datoadicional: -1
 *               suscripcionAnulada:
 *                 summary: Suscripción anulada exitosamente
 *                 value:
 *                   correcto: true
 *                   notificacion: "Suscripción anulada"
 *                   codigoresultado: 200
 *                   datoadicional: 1
 *       400:
 *         description: Error en la solicitud o permisos insuficientes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GestionNewlesterResponse'
 *             examples:
 *               errorPermisos:
 *                 value:
 *                   correcto: false
 *                   notificacion: "Acción denegada, usted no tiene permisos para realizar la acción"
 *                   codigoresultado: 400
 *                   datoadicional: -1
 *       404:
 *         description: Parámetro no encontrado para actualizar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GestionNewlesterResponse'
 *             example:
 *               correcto: false
 *               notificacion: "Parametro no encontrado para actualizar"
 *               codigoresultado: 404
 *               datoadicional: -1
 */
router.post(
    '/gestionNewlester',
    gestionNewlester
);

module.exports = router;