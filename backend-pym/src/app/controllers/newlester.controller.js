// newlester.controller.js
const emailService =require("../../utils/emailServiceBrevo");
const con = require("../../infraestructure/config/config");

const gestionNewlester = async (req, res) => {
  try {
    const v_json = { ...req.body, ci_usuario_sesion: req.user?.ci || '111' };

    const query = {
      text: `call servicios.p_gestion_newlester($1)`,
      values: [v_json],
    };

    const result = await con.query(query);
    const resultado = result.rows[0];

    res.status(200).json({ result: resultado });

    // Envío de correo asíncrono
    if (resultado && resultado.codigoresultado >= 0) {
      setImmediate(async () => {
        try {
          const correo = req.body.correo || req.body.email;
          if (correo) {
            const nombre = req.body.nombre || "Suscriptor";
            const mensaje = `Hola ${nombre}, tenemos registro de tu correo en nuestra lista de suscriptores. Avisarte que: ${resultado.notificacion}`;
            
            const datosCorreo = [
              "Suscriptores - PyM Systems",
              "PyM Systems, tu suscripción",
              mensaje,
              "Visitar sitio web",
              process.env.ENDPOINT_FRONT || "https://pymsystems.com",
              "Equipo de PyM Systems"
            ];
            
            await emailService.enviarCorreo(datosCorreo, { correo, nombre });
          }
        } catch (error) {
          console.error("Error en envío de correo:", error);
        }
      });
    }
    
  } catch (error) {
    console.error("Error en gestionNewlester:", error);
    if (!res.headersSent) {
      res.status(500).json({ mensaje: "Error: " + error.message });
    }
  }
};

module.exports = { gestionNewlester };