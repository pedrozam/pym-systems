const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    listarTransacciones, listarMenus, obtenerModulos, listarModulos,actualizarPasswordViaCorreo,
    gestionUsuarios,listarUsuariosEstado, subirDocumentosUsuario,solicitarCorreoPassword,
    combrobarCiUsuario, subirContrato, obtenerDocsUsr, obtenerUsuarioCI, obtenerUsuarioConsulta,
    obtenerNroUsuarios
} = require ('../controllers/workflow.controller')

const upload = require("../middlewares/archivoUploadMiddleware");

/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_transacciones:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *              tabla:
 *                  type: string
 *                  description: número de la tabla transaccional
 *              estado:
 *                  type: string
 *                  description: es el estado consultado para obtener las transacciones
 *          required:
 *              - ci_usuario
 *              - tabla
 *              - estado
 *          example:
 *              ci_usuario: '888999'
 *              tabla: '3'
 *              estado: 'CREADO'
 */
/**
 * @swagger
 * /api/workflow/listarTransacciones:
 *  post:
 *      summary: Obtiene el listado de transacciones habilitadas a aplicar segun el estado<v_json>
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_transacciones'
 *      responses:
 *          200:
 *              description: Listado de transacciones obtenidas correctamente
 *
 */

router.post('/listarTransacciones',
    passport.authenticate('jwt', {session:false}),
    listarTransacciones
);

/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_menus:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *              moudlo:
 *                  type: string
 *                  description: modulo del que se quiere obtener la lista de menus
 *          required:
 *              - ci_usuario
 *              - modulo
 *          example:
 *              ci_usuario: '888999'
 *              modulo: 'MOSPA'
 */
/**
 * @swagger
 * /api/workflow/listarMenus:
 *  post:
 *      summary: Obtiene la lista de menús de acuerdo al modulo solicitado<v_json>
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_menus'
 *      responses:
 *          200:
 *              description: Listado de menus obtenido correctamente
 */

router.post('/listarMenus',
    passport.authenticate('jwt', {session:false}),
    listarMenus
);

/**
 * @swagger
 * components:
 *  schemas:
 *      Workflow_modulos:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci del usuario, para identificar el perfil asignado
 *          required:
 *              - ci_usuario
 *          example:
 *              ci_usuario: '888999'
 */
/**
 * @swagger
 * /api/workflow/obtenerModulos:
 *  post:
 *      summary: Obtiene los modulos a los que tiene acceso un usuario
 *      tags: [Listar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Workflow_modulos'
 *      responses:
 *          200:
 *              description: Listado de modulos obtenidos correctamente
 */
router.post('/obtenerModulos', 
    passport.authenticate('jwt', {session:false}),
    obtenerModulos
);

router.get('/listarModulos',
    passport.authenticate('jwt', {session:false}),
    listarModulos
);

// router.post('/gestionUsuarios',
//     passport.authenticate('jwt', {session:false}),
//     gestionUsuarios
// );

router.post('/gestionUsuarios',
  passport.authenticate('jwt', {session:false}),
  upload.fields([
    { name: 'url_foto_memo', maxCount: 1 },
    { name: 'url_foto_ci', maxCount: 1 },
    { name: 'url_foto_ddjj', maxCount: 1 },
    { name: 'url_contrato_pdf', maxCount: 1 },
  ]),
  upload.errorHandler,
  gestionUsuarios
);

router.post('/listarUsuariosEstado',
    passport.authenticate('jwt', {session:false}),
    listarUsuariosEstado
);
router.post('/subirDocumentosUsuario',
    passport.authenticate('jwt', {session:false}),
    upload.fields([
        { name: 'url_foto_memo', maxCount: 1 },
        { name: 'url_foto_ci', maxCount: 1 },
        { name: 'url_foto_ddjj', maxCount: 1 },
        { name: 'url_contrato_pdf', maxCount: 1 },
    ]),
    upload.errorHandler,
    subirDocumentosUsuario
);

router.post('/subirContrato',
    passport.authenticate('jwt', {session:false}),
    upload.single( 'url_contrato_pdf'),
    upload.errorHandler,
    subirContrato
);

router.get('/combrobarCiUsuario/:ci',
    passport.authenticate('jwt', {session:false}),
    combrobarCiUsuario
);

router.get('/obtenerDocsUsr/:ci',
    passport.authenticate('jwt', {session:false}),
    obtenerDocsUsr
);


router.get('/obtenerUsuarioCI',
    passport.authenticate('jwt', {session:false}),
    obtenerUsuarioCI
);

router.get('/obtenerUsuarioConsulta/:ci/:id',
    passport.authenticate('jwt', {session:false}),
    obtenerUsuarioConsulta
);

/**
 * @swagger
 * components:
 *  schemas:
 *      SolicitarCorreoPassword:
 *          type: object
 *          properties:
 *              ci_usuario:
 *                  type: string
 *                  description: ci de usuario.
 *          required:
 *              - ci_usuario
 *          example:
 *              ci_usuario: "123"
 */
/**
 * @swagger
 * /api/workflow/solicitarCorreoPassword:
 *  post:
 *      summary: Solicitar correo para actualizar password
 *      description: Permite actualizar la contraseña del usuario en el sistema.
 *      tags: [Gestión de Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SolicitarCorreoPassword'
 *      responses:
 *          200:
 *              description: Correo enviado correctamente a sadsa@gufum.com
 *          400:
 *              description: Usuario incorrecto o inactivo
 */


router.post('/solicitarCorreoPassword',
    solicitarCorreoPassword
);

/**
 * @swagger
 * components:
 *  schemas:
 *      ActualizarPasswordViaCorreo:
 *          type: object
 *          properties:
 *              codigo:
 *                  type: string
 *                  description: Código enviado por correo electrónico.
 *              password:
 *                  type: string
 *                  description: Contraseña nueva. 
 *          required:
 *              - codigo
 *              - password
 *          example:
 *              codigo: "U2FsdGVkX18ofcopPtV/wFP52KnBo3EJ5XvMVuODvL0="
 *              password: "prueba"
 */
/**
 * @swagger
 * /api/workflow/actualizarPasswordViaCorreo:
 *  post:
 *      summary: Actualización de Password 
 *      description: Permite actualizar la contraseña del usuario en el sistema.
 *      tags: [Gestión de Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ActualizarPasswordViaCorreo'
 *      responses:
 *          200:
 *              description: Contraseña actualizada correctamente
 *          400:
 *              description: Contraseña actual incorrecta
 */

router.post('/actualizarPasswordViaCorreo',
    actualizarPasswordViaCorreo
);

router.get('/obtenerNroUsuarios/:m',
    passport.authenticate('jwt', {session:false}),
    obtenerNroUsuarios
);

module.exports = router;
