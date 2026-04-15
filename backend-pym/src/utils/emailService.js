const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  initTransporter() {
    // DEBUG: Verificar variables de entorno
    console.log("=== VERIFICANDO VARIABLES DE ENTORNO ===");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST || "NO DEFINIDO");
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT || "NO DEFINIDO");
    console.log("EMAIL_USER:", process.env.EMAIL_USER || "NO DEFINIDO");
    console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "*** DEFINIDO ***" : "NO DEFINIDO");
    console.log("EMAIL_SECURE:", process.env.EMAIL_SECURE || "NO DEFINIDO");
    console.log("======================================");

    // Validar que existan las credenciales
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ ERROR: Faltan credenciales de correo");
      console.error("   EMAIL_USER:", process.env.EMAIL_USER ? "OK" : "FALTA");
      console.error("   EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "OK" : "FALTA");
      return;
    }

    const config = {
      host: process.env.EMAIL_HOST || "mail.privateemail.com",
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE || false,
      auth: {
        user: process.env.EMAIL_USER.trim(), // Asegurar que no hay espacios
        pass: process.env.EMAIL_PASSWORD.trim(),
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    };

    console.log(`📧 Configurando con: ${config.auth.user}@${config.host}:${config.port}`);
    this.transporter = nodemailer.createTransport(config);
    
    this.verifyConnection();
  }

  async verifyConnection() {
    if (!this.transporter) {
      console.error("❌ Transporter no inicializado por falta de credenciales");
      return;
    }
    
    try {
      await this.transporter.verify();
      console.log("✅ Private Email configurado correctamente");
    } catch (error) {
      console.error("❌ Error al verificar Private Email:", error.message);
    }
  }

  async verifyConnection() {
    if (!this.transporter) return;
    
    try {
      await this.transporter.verify();
      console.log("✅ Private Email configurado correctamente");
    } catch (error) {
      console.error("❌ Error al verificar Private Email:", error.message);
    }
  }

  async enviarCorreo(datos, user) {
    if (!this.transporter) {
      console.error("❌ Transporter no inicializado");
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

      const mailOptions = {
        from: `"${datos[5] || 'Sistema'}" <${process.env.EMAIL_USER}>`,
        to: user.correo,
        subject: datos[1] || "Notificación del sistema",
        html: contenidoPersonalizado,
      };

      console.log(`📧 Enviando correo a: ${user.correo}`);
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Correo enviado a: ${user.correo}`);
      return info;
      
    } catch (error) {
      console.error("❌ Error al enviar correo:", error.message);
      throw error;
    }
  }

  // Mantén tus otros métodos aquí...
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