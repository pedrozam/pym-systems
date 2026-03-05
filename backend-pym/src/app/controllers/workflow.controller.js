const jwt = require("jsonwebtoken");

const { buscarUsuario } = require("../controllers/auth.controller");
const con = require("../../infraestructure/config/config");
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
/**
 * @param {v_json} req json que envia los datos al SP
 * @param {res_json} res response en formato json
 */
const listarTransacciones = async (req, res) => {
    const query = {
        text: `select * from workflow.f_obtener_lista_transacciones('${req.user.ci}', '${req.body.tabla}', '${req.body.estado}') `,
    };
    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje:
                    "Listado de transacciones obtenidas correctamente. Si no salen resultados, es porque el perfil no tiene asignada las transacciones, revisar el Workflow.",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const listarMenus = async (req, res) => {
    const query = {
        text: `select * from workflow.f_obtener_lista_menu('${req.user.ci}', '${req.body.modulo}') `,
    };

    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Menus obtenidos",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const obtenerModulos = async (req, res) => {
    //console.log(req.user)
    const query = {
        text: `select * from workflow.f_acceso_modulo('${req.user.ci}') `,
    };

    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Modulos obtenidos",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const listarModulos = async (req, res) => {
    //console.log(req.user)
    const query = {
        text: `select * from workflow.f_listar_modulos() `,
    };

    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Modulos obtenidos",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};


const gestionUsuarios = async (req, res) => {
    const bcrypt = require("bcrypt");
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        // Campos que vienen como JSON string y necesitan parseo (ARRAYS)
        const camposArray = [
            'operador_solicitado',
            'id_centro_mid', 
            'id_centro_modefa',
            'id_centro_mospa'
        ];
        
        let v_json = {
            ...req.body,
            ci_usuario: req.user.ci
        };

        // Parsear campos que vienen como JSON string (arrays)
        camposArray.forEach(campo => {
            if (req.body[campo] && typeof req.body[campo] === 'string') {
                try {
                    v_json[campo] = JSON.parse(req.body[campo]);
                } catch (e) {
                    console.warn(`No se pudo parsear el campo ${campo} como JSON:`, req.body[campo]);
                    // Si falla el parsing, intentar convertir de string simple a array
                    if (!isNaN(req.body[campo])) {
                        v_json[campo] = [Number(req.body[campo])];
                    } else {
                        v_json[campo] = req.body[campo];
                    }
                }
            }
        });

        // Caso especial: campo 'perfil' - asegurar que sea valor simple
        if (Array.isArray(v_json.perfil)) {
            // Si llegó como array, tomar solo el primer valor
            v_json.perfil = v_json.perfil[0];
        }
        // Convertir a número si es posible
        if (v_json.perfil && !isNaN(v_json.perfil)) {
            v_json.perfil = Number(v_json.perfil);
        }

        // Procesar archivos
        const archivos = {};
        const camposArchivos = ['url_contrato_pdf', 'url_foto_memo', 'url_foto_ci', 'url_foto_ddjj'];
        
        camposArchivos.forEach(campo => {
            archivos[campo] = req.files?.[campo]?.[0]?.filename || null;
        });

        v_json = { ...v_json, ...archivos };

        console.log('Datos enviados a BD:', JSON.stringify(v_json, null, 2));

        const query = {
            text: `call workflow.p_gestion_usuarios($1)`,
            values: [v_json],
        };

        const result = await con.query(query);
        const resultado = result.rows[0];

        if (!resultado.correcto || resultado.codigoresultado < 0) {
            return res.status(400).json({
                success: false,
                codigoResultado: resultado.codigoresultado,
                message: resultado.notificacion,
                datoAdicional: resultado.datoadicional
            });
        }

        // Lógica de envío de correos
        if (resultado.correcto && resultado.codigoresultado >= 0) {
            await manejarCorreos(req, resultado, req.body.password);
        }

        res.status(200).json({
            success: true,
            codigoResultado: resultado.codigoresultado,
            message: resultado.notificacion,
            datoAdicional: resultado.datoadicional,
            result: resultado
        });

    } catch (e) {
        console.error('Error en gestionUsuarios:', e);
        res.status(500).json({
            success: false,
            codigoResultado: -500,
            error: 'Error interno del servidor: ' + e.message
        });
    }
};

// Función auxiliar para manejar el envío de correos
const manejarCorreos = async (req, resultado, pass) => {
  const transaccion = req.body.transaccion;
  
  // Solo enviar correos para estas transacciones cuando la operación fue exitosa
  if (!['HABILITAR', 'CREAR', 'OBSERVAR'].includes(transaccion)) {
    return;
  }

  try {
    const query = {
      text: `select * from workflow.wf_usuario wu where wu.id_usuario = $1 limit 1`,
      values: [req.body.id_usuario],
    };

    const resultUser = await con.query(query);
    const user = resultUser.rows[0];

    if (!user) {
      console.warn('Usuario no encontrado para envío de correo');
      return;
    }

    let datosCorreo = [];

    switch (transaccion) {
      case 'HABILITAR':
        datosCorreo = [
          "HABILITACIÓN DE CUENTA, SISTEMA SINNA",
          "Estimado(a) " + user.nombre,
          "Su cuenta ha sido activada satisfactoriamente.<br><b>Acciones habilitadas a su perfil:</b> " +
          req.body.nom_operacion_solicitada +
          ".<br>Ingrese al sistema haciendo click en el siguiente enlace:",
          "Ingresar al sistema",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte  - Sistema SINNA",
        ];
        break;

      case 'CREAR':
        datosCorreo = [
          "USUARIO SOLICITADO, SISTEMA SINNA",
          "Estimado(a) " +
          req.body.nombres +
          " " +
          req.body.primer_apellido +
          " " +
          req.body.segundo_apellido,
          "Su solicitud de usuario ha sido recepcionada satisfactoriamente.<br><b>Contraseña:</b>" +
          pass +
          " <br> <b>Código de usuario:</b> " +
          (resultado.datoadicional || '') +
          ". <br>Puede consultar el estado de su solicitud dando clic en el siguiente enlace<br> Ingrese a la opción: <b>REGISTRO DE USUARIOS SINNA AQUI</b>, y luego al menú: <b>CONSULTAR ESTADO</b>",
          "Hacer seguimiento a la solicitud",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte  - Sistema SINNA",
        ];
        break;

      case 'OBSERVAR':
        datosCorreo = [
          "USUARIO OBSERVADO, SISTEMA SINNA",
          "Estimado(a) " +
          req.body.nombres +
          " " +
          req.body.primer_apellido,
          "Su solicitud de usuario ha sido <b>observada</b> <br><b>Observación:</b> " +
          req.body.observacion +
          "<br> Para subsanar ingrese al siguiente link, luego ingrese a la opción: <b>REGISTRO DE USUARIOS SINNA AQUI</b>, y luego al menú: <b>CONSULTAR ESTADO</b> <br> Codigo de usuario: " +
          req.body.id_usuario,
          "Subsanar solicitud",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte  - Sistema SINNA",
        ];
        break;
    }

    if (datosCorreo.length > 0) {
      enviarCorreo(datosCorreo, user);
    }

  } catch (error) {
    console.error('Error al enviar correo:', error);
    // No detenemos la respuesta principal por un error en el correo
  }
};

const listarUsuariosEstado = async (req, res) => {
    const query = {
        text: `select * from workflow.f_listar_usuarios_estado('{ "estado":"${req.body.estado}", "modulo":"${req.body.modulo}"}') `,
    };

    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Lista de usuarios obtenido.",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const subirDocumentosUsuario = async (req, res) => {
  try {
    const archivos = {};
    const campos = ['url_contrato_pdf', 'url_foto_memo', 'url_foto_ci', 'url_foto_ddjj'];
    
    campos.forEach(campo => {
      archivos[campo] = req.files?.[campo]?.[0]?.filename || null;
    });

    const v_json = {
      ...req.body,
      ...archivos,
      ci_usuario: req.user.ci
    };

    const query = {
      text: `call workflow.p_gestion_usuarios($1)`,
      values: [v_json],
    };

    const result = await con.query(query);
    const resultado = result.rows[0];

    if (resultado?.error) {
      return res.status(400).json({
        success: false,
        error: resultado.error
      });
    }

    res.status(200).json({
      success: true,
      message: "Documentos subidos exitosamente",
      data: resultado
    });

  } catch (e) {
    console.error('Error en subirDocumentosUsuario:', e);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

const subirContrato = async (req, res) => {
    try {
        console.log(req.file);
        if (typeof req.file !== "undefined")
            req.body.url_contrato_pdf = req.file.filename;

        req.body.ci_usuario = req.user.ci;

        const v_json = req.body;
        const query = {
            text: `call workflow.p_gestion_usuarios($1) `,
            values: [v_json],
        };
        await con
            .query(query)
            .then((result) => {
                const resultado = result.rows[0];
                res.status(200).json({
                    result: resultado,
                });
            })
            .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
    } catch (e) {
        res.status(500).json({ msg: "Error: " + e });
    }
};

const combrobarCiUsuario = async (req, res) => {
    //console.log(req.user)
    const ci = req.params.ci;

    const query = {
        text: `select * from workflow.f_comprobar_ci_usuario($1) `,
        values: [ci],
    };

    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "CI consultado",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const obtenerDocsUsr = async (req, res) => {
    //console.log(req.user)
    const ci = req.params.ci;
    const query = {
        text: `select * from workflow.f_obtener_documentos_usr($1) `,
        values: [ci],
    };
    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Documentos usuario obtenidos.",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const obtenerUsuarioCI = async (req, res) => {
    const ci = req.user.ci;
    const query = {
        text: `select * from workflow.f_obtener_usuario_ci($1) `,
        values: [ci],
    };
    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Datos obtenidos del usuario",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const obtenerUsuarioConsulta = async (req, res) => {
    const ci = req.params.ci;
    const id = req.params.id;
    const query = {
        text: `select * from workflow.f_obtener_usuario_ciid($1,$2) `,
        values: [ci, id],
    };
    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Datos consultados del usuario",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

const enviarCorreo = async (datos, user) => {
    try {
        const plantillaHTML = await fs.readFile(
            "src/assets/plantillaCorreo.html",
            "utf-8"
        );

        const contenidoPersonalizado = plantillaHTML
            .replace("{{titulo}}", datos[0])
            .replace("{{subTitulo}}", datos[1])
            .replace("{{mensaje}}", datos[2])
            .replace("[[nombreBoton]]", datos[3])
            .replace("[[direccionUrl]]", datos[4])
            .replace("{{entidad}}", datos[5]);

        const transporter = nodemailer.createTransport({
            origen: process.env.EMAIL_USER,
            host: process.env.EMAIL_HOST || "correo.justicia.gob.bo",
            port: process.env.EMAIL_PORT,
            secure: false,
            ignoreTLS: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
            logging: (s) => debug(s),
        });

        const mailOptions = {
            from: '"Soporte, Sistema SINNA" <sinna-soporte@justicia.gob.bo>',
            to: "pedro.zambrana.rivera@gmail.com", //user.correo,
            subject: "Gestión de usuarios - Sistema: SINNA .",
            html: contenidoPersonalizado,
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
        
    } catch (error) {
        console.error("Error al enviar correo:", error);
    }
};

const solicitarCorreoPassword = async (req, res) => {
    const ci_usuario = req.body.ci_usuario;
    const user = await buscarUsuario({ body: { ci_usuario } });
    
    try {
        if (user.estado_wf==='ACTIVO') {
            const codigo = encriptarTexto(user.ci_usuario);
            const datos = [
                "RESTABLECER CONTRASEÑA, DE TU USUARIO, SISTEMA SINNA",
                "Estimado(a) " + user.nombre,
                "Ha solicitado restablecer su contraseña. Este enlace expirará en 10 minutos por seguridad.",
                "Restablecer contraseña",
                process.env.ENDPOINT_FRONT + "restablecerPassword/" + encodeURIComponent(codigo),
                "Equipo de Soporte - Sistema SINNA",
            ];
            const resp= await enviarCorreo(datos, user);
            //console.log(resp.accepted.length);
            if(resp.accepted.length>0){
                res.status(200).json({
                    notificacion: 'Correo enviado correctamente a: ' + user.correo + ', ingresa a tu cuenta para poder restablecer tu contraseña.',
                    codigoresultado: 200
                });
            }else{
                res.status(400).json({
                    notificacion: 'Error al enviar el correo a: ' + user.correo +', contacta a soporte técnico.',
                    codigoresultado: 200
                });
            }
        } else {
            res.status(200).json({
                result: {
                    correcto: false,
                    notificacion: "El usuario no está activo, estado actual: "+ user.estado_wf+', contacta a soporte técnico si crees que es un error.',
                    codigoresultado: 400,
                    datoadicional: null,
                },
            });
        }
    } catch (error) {
        res.status(200).json({
            mensaje: "Error: " + error.message,
            result: {
                    correcto: false,
                    notificacion: "El CI que ingresaste no corresponde a ningun usuario",
                    codigoresultado: 400,
                    datoadicional: null,
                },
        });
    }
};

const actualizarPasswordViaCorreo = async (req, res) => {
    const bcrypt = require("bcrypt");
    
    // Desencriptar y validar el token
    const resultadoDesencriptado = desencriptarTexto(req.body.codigo);
    
    // Si hay error en la desencriptación
    if (resultadoDesencriptado.error) {
        return res.status(200).json({
            result: {
                correcto: false,
                notificacion: resultadoDesencriptado.error,
                codigoresultado: 400,
                datoadicional: null,
            },
        });
    }
    
    // Si el token expiró
    if (resultadoDesencriptado.expirado) {
        return res.status(200).json({
            result: {
                correcto: false,
                notificacion: "El enlace ha expirado. Por favor, solicita un nuevo enlace de restablecimiento.",
                codigoresultado: 400,
                datoadicional: null,
            },
        });
    }
    
    const ci_usuario = resultadoDesencriptado.ci_usuario;
    const user = await buscarUsuario({ body: { ci_usuario } });
    
    if (user) {
        //console.log(user);
        
        // Verificar que el usuario esté activo
        if (user.estado_wf !== 'ACTIVO') {
            return res.status(200).json({
                result: {
                    correcto: false,
                    notificacion: "Usuario inactivo. Contacta a soporte técnico.",
                    codigoresultado: 400,
                    datoadicional: null,
                },
            });
        }
        
        req.body.id_usuario = user.id_usuario;
        req.body.ci_usuario = user.ci_usuario;
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.transaccion = "ACTUALIZAR_PASSWORD";
        req.body.estado = user.estado_wf;

        const v_json = req.body;
        const query = {
            text: `call workflow.p_gestion_usuarios($1) `,
            values: [v_json],
        };
        
        await con
            .query(query)
            .then((result) => {
                const resultado = result.rows[0];
                res.status(200).json({
                    result: resultado,
                });
            })
            .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
    } else {
        res.status(200).json({
            result: {
                correcto: false,
                notificacion: "Código incorrecto o usuario no encontrado",
                codigoresultado: 400,
                datoadicional: null,
            },
        });
    }
};




// Función para encriptar
function encriptarTexto(texto) {
    // Incluir timestamp actual (en milisegundos)
    const timestamp = Date.now();
    const textoConTimestamp = `${texto}|${timestamp}`;
    const encriptado = CryptoJS.AES.encrypt(textoConTimestamp, process.env.CLAVE).toString();
    return encriptado;
}
// Función para desencriptar
function desencriptarTexto(encriptado) {
    try {
        const bytes = CryptoJS.AES.decrypt(encriptado, process.env.CLAVE);
        const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!textoDesencriptado) {
            return { error: "Token inválido" };
        }
        
        // Verificar si el texto contiene timestamp (formato: ci|timestamp)
        const partes = textoDesencriptado.split('|');
        
        if (partes.length === 2) {
            // Tiene timestamp, validar tiempo
            const [ci_usuario, timestamp] = partes;
            const tiempoGeneracion = parseInt(timestamp);
            const tiempoActual = Date.now();
            
            // Calcular diferencia en minutos
            const diferenciaMinutos = (tiempoActual - tiempoGeneracion) / (1000 * 60);
            
            if (diferenciaMinutos > 10) { // 10 minutos de validez
                return { error: "El enlace ha expirado", expirado: true };
            }
            
            return { 
                ci_usuario: ci_usuario,
                valido: true 
            };
        } else {
            // Texto sin timestamp (formato antiguo)
            return { 
                ci_usuario: textoDesencriptado,
                valido: true,
                sinTimestamp: true // Para identificar tokens antiguos
            };
        }
        
    } catch (error) {
        return { error: "Error al desencriptar token" };
    }
}

const obtenerNroUsuarios = async (req, res) => {
    const modulo = req.params.m;
    const query = {
        text: `select * from workflow.f_obtener_nro_usuarios($1) `,
        values: [modulo],
    };
    await con
        .query(query)
        .then((result) => {
            //formateamos el resultado para que retorne solo Rows y Fields
            const resultado = result.rows;
            //console.log(resultado)
            res.status(200).json({
                datoAdicional: resultado,
                mensaje: "Nro de usuarios obtenido",
                cod: 200,
            });
        })
        .catch((e) => res.status(500).json({ mensaje: "Error:" + e }));
};

module.exports = {
    listarTransacciones,
    listarMenus,
    obtenerModulos,
    listarModulos,
    gestionUsuarios,
    listarUsuariosEstado,
    subirDocumentosUsuario,
    combrobarCiUsuario,
    subirContrato,
    obtenerDocsUsr,
    obtenerUsuarioCI,
    obtenerUsuarioConsulta,
    solicitarCorreoPassword,
    actualizarPasswordViaCorreo,
    obtenerNroUsuarios
};
