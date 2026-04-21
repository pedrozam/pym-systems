const jwt = require('jsonwebtoken');
const emailService =require("../../utils/emailServiceBrevo");
const con = require('../../infraestructure/config/config');

const listarServiciospym = async (req, res) => {
    const estado = req.params.estado
    const query = {
        text: `select * from servicios.f_listar_servicios_estado($1)`,
        values: [estado]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const listarTecnologias = async (req, res) => {
    const estado = req.params.estado
    const query = {
        text: `select * from servicios.f_listar_tecnologias_estado($1)`,
        values: [estado]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const gestionContactoWaap = async (req, res) => {
  try {
    const v_json = { ...req.body, ci_usuario_sesion: req.user?.ci || '111' };

    const query = {
      text: `call servicios.p_gestion_contacto_waap($1)`,
      values: [v_json],
    };

    const result = await con.query(query);
    const resultado = result.rows[0];

    res.status(200).json({ result: resultado });

    // Envío de correo asíncrono
    if (resultado && resultado.codigoresultado >= 0 && req.body.correo) {
      setImmediate(async () => {
        try {
          const correo = req.body.correo || req.body.email;
          if (correo) {
            const nombre = req.body.nombre || "Cliente";
            const mensaje = `Gracias por contactarnos, nuestro sistema de atención te ha asignado un codigo de consulta. ${resultado.notificacion}`;
            
            const datosCorreo = [
              "Consultas - PyM Systems",
              "PyM Systems, tu consulta",
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
    console.error("Error en gestion de contactos por waap:", error);
    if (!res.headersSent) {
      res.status(500).json({ mensaje: "Error: " + error.message });
    }
  }
};

module.exports = {
    listarServiciospym,
    listarTecnologias,
    gestionContactoWaap
}