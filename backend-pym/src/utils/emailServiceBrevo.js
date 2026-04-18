axios = require("axios");
const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

class EmailService {
  constructor() {
    this.apiKey = null;
    this.initBrevo();
  }

  initBrevo() {
    // DEBUG: Verificar variables de entorno
    console.log("=== VERIFICANDO VARIABLES DE ENTORNO BREVO ===");
    console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY ? "*** DEFINIDO ***" : "NO DEFINIDO");
    console.log("BREVO_SENDER_EMAIL:", process.env.BREVO_SENDER_EMAIL || "NO DEFINIDO (usará test@brevo.com)");
    console.log("BREVO_SENDER_NAME:", process.env.BREVO_SENDER_NAME || "NO DEFINIDO (usará Sistema SINNA)");
    console.log("==============================================");

    if (!process.env.BREVO_API_KEY) {
      console.error("❌ ERROR: Falta BREVO_API_KEY en variables de entorno");
      return;
    }

    this.apiKey = process.env.BREVO_API_KEY.trim();
    console.log("✅ Brevo configurado correctamente");
  }

  // Método principal para enviar correo usando API de Brevo
  async enviarCorreo(datos, user) {
    if (!this.apiKey) {
      console.error("❌ API key no inicializada");
      throw new Error("Servicio de correo no configurado");
    }

    try {
      // Leer plantilla
      let plantillaHTML;
      try {
        plantillaHTML = await fs.readFile("src/assets/plantillaCorreo.html", "utf-8");
      } catch (fileError) {
        // Plantilla por defecto si no existe
        plantillaHTML = `
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"></head>
          <body style="font-family: Arial, sans-serif;">
            <h2>{{titulo}}</h2>
            <h3>{{subTitulo}}</h3>
            <p>{{mensaje}}</p>
            <a href="{{direccionUrl}}" style="display:inline-block;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;">{{nombreBoton}}</a>
            <hr>
            <footer>{{entidad}}</footer>
          </body>
          </html>
        `;
      }

      const contenidoPersonalizado = plantillaHTML
        .replace(/{{titulo}}/g, datos[0] || "")
        .replace(/{{subTitulo}}/g, datos[1] || "")
        .replace(/{{mensaje}}/g, datos[2] || "")
        .replace(/{{nombreBoton}}/g, datos[3] || "Ver más")
        .replace(/{{direccionUrl}}/g, datos[4] || "#")
        .replace(/{{entidad}}/g, datos[5] || "Sistema")
        .replace(/{{emailDestinatario}}/g, user.correo)
        .replace(/{{nombreSuscriptor}}/g, datos[6] || "suscriptor");

      // Configurar remitente
      const senderEmail = process.env.BREVO_SENDER_EMAIL || "test@brevo.com";
      const senderName = process.env.BREVO_SENDER_NAME || datos[5] || "Sistema SINNA";

      // Preparar payload para Brevo API
      const payload = {
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: user.correo,
            name: user.nombre || "Usuario"
          }
        ],
        subject: datos[1] || "Notificación del sistema",
        htmlContent: contenidoPersonalizado,
        // Opcional: si quieres copia oculta (BCC)
        // bcc: [{ email: "admin@tudominio.com", name: "Admin" }]
      };

      console.log(`📧 Enviando correo a: ${user.correo} vía Brevo API`);
      
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        payload,
        {
          headers: {
            "accept": "application/json",
            "api-key": this.apiKey,
            "content-type": "application/json"
          },
          timeout: 30000
        }
      );

      console.log(`✅ Correo enviado a: ${user.correo} - MessageId: ${response.data.messageId}`);
      return response.data;
      
    } catch (error) {
      console.error("❌ Error al enviar correo vía Brevo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  // Métodos de encriptación (sin cambios)
  encriptarTexto(texto) {
    const timestamp = Date.now();
    const textoConTimestamp = `${texto}|${timestamp}`;
    const encriptado = CryptoJS.AES.encrypt(textoConTimestamp, process.env.CLAVE).toString();
    return encriptado;
  }

  desencriptarTexto(encriptado) {
    try {
      const bytes = CryptoJS.AES.decrypt(encriptado, process.env.CLAVE);
      const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
      if (!textoDesencriptado) return { error: "Token inválido" };
      
      const partes = textoDesencriptado.split("|");
      if (partes.length === 2) {
        const [ci_usuario, timestamp] = partes;
        const diferenciaMinutos = (Date.now() - parseInt(timestamp)) / 60000;
        if (diferenciaMinutos > 10) {
          return { error: "El enlace ha expirado", expirado: true };
        }
        return { ci_usuario, valido: true };
      }
      return { ci_usuario: textoDesencriptado, valido: true };
    } catch (error) {
      return { error: "Error al desencriptar token" };
    }
  }

  async enviarCorreoPorTransaccion(transaccion, reqBody, user, resultado, password = null) {
    let datosCorreo = [];

    switch (transaccion) {
      case "HABILITAR":
        datosCorreo = [
          "HABILITACIÓN DE CUENTA, SISTEMA SINNA",
          "Estimado(a) " + user.nombre,
          "Su cuenta ha sido activada satisfactoriamente.<br><b>Acciones habilitadas a su perfil:</b> " +
            reqBody.nom_operacion_solicitada +
            ".<br>Ingrese al sistema haciendo click en el siguiente enlace:",
          "Ingresar al sistema",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte - Sistema SINNA",
        ];
        break;
      case "CREAR":
        datosCorreo = [
          "USUARIO SOLICITADO, SISTEMA SINNA",
          "Estimado(a) " + reqBody.nombres + " " + reqBody.primer_apellido,
          "Su solicitud ha sido recepcionada.<br><b>Contraseña:</b> " + password +
            "<br><b>Código de usuario:</b> " + (resultado.datoadicional || ""),
          "Hacer seguimiento",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte - Sistema SINNA",
        ];
        break;
      case "OBSERVAR":
        datosCorreo = [
          "USUARIO OBSERVADO, SISTEMA SINNA",
          "Estimado(a) " + reqBody.nombres,
          "Su solicitud ha sido observada.<br><b>Observación:</b> " + reqBody.observacion,
          "Subsanar solicitud",
          process.env.ENDPOINT_FRONT,
          "Equipo de Soporte - Sistema SINNA",
        ];
        break;
      default:
        return null;
    }

    if (datosCorreo.length > 0) {
      return await this.enviarCorreo(datosCorreo, user);
    }
  }

  async enviarCorreoRestablecerPassword(user) {
    const codigo = this.encriptarTexto(user.ci_usuario);
    const datos = [
      "RESTABLECER CONTRASEÑA",
      "Estimado(a) " + user.nombre,
      "Ha solicitado restablecer su contraseña. Este enlace expirará en 10 minutos.",
      "Restablecer contraseña",
      process.env.ENDPOINT_FRONT + "restablecerPassword/" + encodeURIComponent(codigo),
      "Equipo de Soporte - Sistema SINNA",
    ];
    return await this.enviarCorreo(datos, user);
  }
}

module.exports = new EmailService();