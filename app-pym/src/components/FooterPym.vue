<!-- components/FooterPym.vue -->
<template>
  <q-footer elevated class="bg-black/90 backdrop-blur-md border-t border-cyan-400/30 mt-auto">
    <div class="container mx-auto px-4 py-8 md:py-10">
      <!-- Top section with logo and social media -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <!-- Logo izquierda -->
        <div class="flex-shrink-0">
          <img
            src="/favicon.ico"
            alt="App logo"
            class="size-24 md:size-28 p-2 cursor-pointer hover:animate-tada hover:infinite"
          />
        </div>

        <div>
          <simple-visitor-counter/>
        </div>

        <!-- Social media links -->
        <div class="flex flex-col items-start md:items-end gap-2">
          <h3 class="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Nuestras redes sociales
          </h3>
          <div class="flex gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_#00f0ff] p-2 rounded-full"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Newsletter section -->
      <div class="border-t border-b border-cyan-400/20 py-6 my-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <h4 class="text-white font-semibold text-lg mb-1">
              Entérate de todas las novedades en tecnología
            </h4>
            <p class="text-gray-400 text-sm">
              Suscríbete a nuestro newsletter y recibe las últimas actualizaciones
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              v-model="suscripcionData.correo"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              class="px-4 py-2 rounded-lg bg-black/50 border border-cyan-400/40 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all w-full sm:w-72"
              :class="{ 'border-red-500': emailError }"
            />
            <q-btn
              @click="subscribeNewsletter"
              color="primary"
              class="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(0,240,255,0.5)]"
              :loading="subscribing"
            >
              Suscribirse
            </q-btn>
          </div>
        </div>
        <p v-if="emailError" class="text-red-400 text-sm mt-2 text-center">
          Por favor ingresa un correo electrónico válido
        </p>
        <p v-if="dataNewlester.subscribeSuccess" class="text-green-400 text-sm mt-2 text-center">
          ¡Suscripción exitosa! Revisa tu correo.
        </p>
      </div>

      <!-- Footer links -->
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 my-6">
        <a
          href="/preguntas"
          class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
        >
          Preguntas frecuentes
        </a>
        <a
          href="/terminos"
          class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
        >
          Términos y condiciones
        </a>
        <a
          href="/privacidad"
          class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
        >
          Privacidad
        </a>
        <a
          href="/trabajo"
          class="text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
        >
          Trabaja con nosotros
        </a>
      </div>

      <!-- Bolivia attribution -->
      <div class="flex flex-col items-center justify-center gap-3 mt-8 pt-4 border-t border-cyan-400/20">
        <div class="flex items-center gap-3">
          <!-- Bolivia flag SVG -->
          <svg class="w-8 h-6 rounded shadow" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="6.67" fill="#D52B1E"/>
            <rect y="6.67" width="30" height="6.66" fill="#F9E300"/>
            <rect y="13.33" width="30" height="6.67" fill="#007934"/>
          </svg>
          <span class="text-gray-400 text-sm">
            Hecho en Bolivia 🇧🇴
          </span>
        </div>
        <p class="text-gray-500 text-xs text-center">
          De Bolivia para el mundo con ❤️
        </p>
      </div>
    </div>
  </q-footer>
</template>

<script setup>
import useNewlester from 'src/composables/useNewlester'
import { ref, watch } from 'vue'
import SimpleVisitorCounter from './SimpleVisitorCounter.vue';

// Obtener los datos del composable
const {
  dataNewlester,
  gestionNewlester,
  limpiarDatosSuscripcion,
  resetearSuccess
} = useNewlester();

// Desestructurar para acceder más fácilmente
const { suscripcionData } = dataNewlester.value;

// Estado local para la UI
const emailError = ref(false)
const subscribing = ref(false)

// Watch para resetear el mensaje de éxito después de 3 segundos
watch(() => dataNewlester.value.subscribeSuccess, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      resetearSuccess();
      limpiarDatosSuscripcion();
    }, 3000);
  }
});

async function subscribeNewsletter() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!suscripcionData.correo || !emailRegex.test(suscripcionData.correo)) {
    emailError.value = true
    return
  }

  emailError.value = false
  subscribing.value = true

  try {
    // Preparar el JSON para enviar al servicio
    const datosSuscripcion = {
      transaccion: suscripcionData.transaccion,
      estado: suscripcionData.estado,
      correo: suscripcionData.correo,
      id_usuario_sesion: suscripcionData.id_usuario_sesion,
      ci_usuario_sesion: suscripcionData.ci_usuario_sesion,
      id_suscriptor: suscripcionData.id_suscriptor,
      id_usuario: suscripcionData.id_usuario
    }

    // Llamar al servicio
    const resultado = await gestionNewlester(datosSuscripcion)

    if (resultado && resultado.correcto) {
      // Si la suscripción fue exitosa, el composable ya maneja las notificaciones
      // Solo limpiamos el correo localmente
      suscripcionData.correo = null
    }
  } catch (error) {
    console.error('Error en la suscripción:', error)
  } finally {
    subscribing.value = false
  }
}
</script>
