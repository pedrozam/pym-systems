<template>
  <q-page
    class="relative bg-cover bg-center bg-no-repeat"
    :style="backgroundStyle"
  >
    <div class="text-center text-white mb-6">
      <h2 class="text-3xl font-bold">Tecnologias utilizadas</h2>
      <p class="text-base text-cyan-200">
        Aqui podrás revisar las tecnologías que empleamos en nuestros proyectos. Da clic a cualquiera de ellas para que puedas tener mas información.
      </p>
      

    </div>
    <!-- Contenedor principal -->
    <div class="relative min-h-screen w-full overflow-hidden">
      <!-- PRIMERA ETAPA: texto centrado vertical/horizontalmente -->
      <div
        v-if="showCenteredCard"
        ref="heroContainer"
        class="fixed inset-0 flex items-center justify-center z-20"
        :class="{ 'pointer-events-none': true }"
      >
        <div
          ref="movingCard"
          class="bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-cyan-400/40 shadow-2xl transition-all duration-500 w-11/12 md:w-auto max-w-2xl"
        >
          <h2 class="text-3xl md:text-5xl font-extrabold text-white neon-text tracking-tight">
            Somos PyM Systems
          </h2>
          <p class="text-base md:text-xl text-cyan-200 mt-3 font-medium">
            Tu aliado en automatización y transformación digital.
          </p>
        </div>
      </div>

      <!-- SEGUNDA ETAPA: Layout final con card a la derecha y tecnologías -->
      <div
        v-else
        class="pt-8 md:pt-12 px-4 md:px-8 max-w-7xl mx-auto"
        :class="{ 'fade-in': showFinalLayout }"
      >
        <div class="flex flex-wrap gap-6">
          <!-- Card en posición col-4 (derecha) -->
          <div class="w-full lg:w-1/3">
            <div
              class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/50 shadow-2xl h-full"
            >
              <h2 class="text-2xl md:text-3xl font-bold text-white neon-text">Somos PyM Systems</h2>
              <p class="text-base text-cyan-200 mt-2">
                Tu aliado en automatización y transformación digital.
              </p>

              <!-- Información adicional de tecnología seleccionada -->
              <div
                v-if="selectedTech"
                class="mt-6 pt-4 border-t border-cyan-400/30"
              >
                <div class="flex items-center gap-3 mb-3">
                  <svg
                    width="40"
                    height="40"
                    class="animate-float"
                  >
                    <use :xlink:href="`${spriteUrl}#${selectedTech.icon}`" />
                  </svg>
                  <h3 class="text-xl font-bold text-cyan-300">{{ selectedTech.name }}</h3>
                </div>
                <p class="text-sm text-white/80 leading-relaxed mb-3">
                  {{ selectedTech.description }}
                </p>
                <a
                  :href="selectedTech.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 transition-colors"
                >
                  Visitar sitio oficial
                  <i class="fas fa-external-link-alt text-xs"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Sección de tecnologías -->
          <div class="flex-1 min-w-[260px]">
            <div class="space-y-8">
              <!-- Card principal de presentación -->
              <div
                class="tech-card p-5 md:p-7 border border-cyan-300/30 rounded-2xl backdrop-blur-md"
              >
                <p class="text-white md:text-xl font-semibold leading-relaxed">
                  <q-icon
                    name="laptop_windows"
                    class="text-cyan-400 mr-2"
                  />
                  Tenemos experiencia en la creación de sitios web profesionales utilizando las
                  siguientes tecnologías:
                </p>
              </div>

              <!-- Frontend -->
              <div class="tech-card p-5 md:p-6 rounded-2xl border border-cyan-300/30">
                <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  <i class="fas fa-desktop"></i> Frontend
                </h3>
                <div class="flex flex-wrap gap-5 items-center">
                  <div
                    v-for="tech in frontendTechs"
                    :key="tech.id"
                    class="flex flex-col items-center gap-1 icon-hover cursor-pointer"
                    @click="showTechInfo(tech)"
                  >
                    <svg
                      width="40"
                      height="40"
                      class="p-1 transition-transform hover:scale-110"
                    >
                      <use :xlink:href="`${spriteUrl}#${tech.icon}`" />
                    </svg>
                    <span class="text-xs text-white/70">{{ tech.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Backend y Base de datos en layout de 2 columnas -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Backend -->
                <div class="tech-card p-5 md:p-6 rounded-2xl border border-cyan-300/30">
                  <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <i class="fas fa-server"></i> Backend
                  </h3>
                  <div class="flex flex-wrap gap-5 items-center">
                    <div
                      v-for="tech in backendTechs"
                      :key="tech.id"
                      class="flex flex-col items-center gap-1 icon-hover cursor-pointer"
                      @click="showTechInfo(tech)"
                    >
                      <svg
                        width="40"
                        height="40"
                        class="p-1 transition-transform hover:scale-110"
                      >
                        <use :xlink:href="`${spriteUrl}#${tech.icon}`" />
                      </svg>
                      <span class="text-xs text-white/70">{{ tech.name }}</span>
                    </div>
                  </div>
                </div>

                <!-- Base de Datos -->
                <div class="tech-card p-5 md:p-6 rounded-2xl border border-cyan-300/30">
                  <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <i class="fas fa-database"></i> Base de datos
                  </h3>
                  <div class="flex flex-wrap gap-5 items-center">
                    <div
                      v-for="tech in databaseTechs"
                      :key="tech.id"
                      class="flex flex-col items-center gap-1 icon-hover cursor-pointer"
                      @click="showTechInfo(tech)"
                    >
                      <svg
                        width="40"
                        height="40"
                        class="p-1 transition-transform hover:scale-110"
                      >
                        <use :xlink:href="`${spriteUrl}#${tech.icon}`" />
                      </svg>
                      <span class="text-xs text-white/70">{{ tech.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Herramientas de Desarrollo -->
              <div class="tech-card p-5 md:p-6 rounded-2xl border border-cyan-300/30">
                <h3 class="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                  <i class="fas fa-tools"></i> Herramientas de desarrollo
                </h3>
                <div class="flex flex-wrap gap-5 items-center">
                  <div
                    v-for="tech in devToolsTechs"
                    :key="tech.id"
                    class="flex flex-col items-center gap-1 icon-hover cursor-pointer"
                    @click="showTechInfo(tech)"
                  >
                    <svg
                      width="40"
                      height="40"
                      class="p-1 transition-transform hover:scale-110"
                    >
                      <use :xlink:href="`${spriteUrl}#${tech.icon}`" />
                    </svg>
                    <span class="text-xs text-white/70">{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})
// Estados
const showCenteredCard = ref(true)
const showFinalLayout = ref(false)
const heroContainer = ref(null)
const movingCard = ref(null)
const selectedTech = ref(null)

// Definición de tecnologías con sus descripciones y URLs oficiales
const frontendTechs = [
  {
    id: 'quasar',
    name: 'Quasar',
    icon: 'quasar',
    description:
      'Framework Vue.js que permite desarrollar aplicaciones para múltiples plataformas (web, móvil, escritorio) con un solo código base. Ofrece componentes pre-construidos y rendimiento excepcional.',
    url: 'https://quasar.dev/',
  },
  {
    id: 'vue',
    name: 'Vue 3',
    icon: 'vue',
    description:
      'Framework progresivo de JavaScript para construir interfaces de usuario. Vue 3 ofrece Composition API, mejor rendimiento y TypeScript mejorado, permitiendo crear aplicaciones reactivas y escalables.',
    url: 'https://vuejs.org/',
  },
  {
    id: 'html',
    name: 'HTML5',
    icon: 'html',
    description:
      'Lenguaje de marcado esencial para la estructura de páginas web. HTML5 introduce elementos semánticos, soporte multimedia nativo y APIs avanzadas para aplicaciones web modernas.',
    url: 'https://developer.mozilla.org/es/docs/Web/HTML',
  },
  {
    id: 'css',
    name: 'CSS3',
    icon: 'css',
    description:
      'Lenguaje de estilos que permite diseñar interfaces visualmente atractivas. CSS3 incluye animaciones, flexbox, grid layout y responsive design para experiencias web profesionales.',
    url: 'https://developer.mozilla.org/es/docs/Web/CSS',
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    icon: 'tailwind',
    description:
      'Framework CSS utility-first que permite construir diseños personalizados rápidamente sin salir del HTML. Ofrece flexibilidad, consistencia y excelente rendimiento.',
    url: 'https://tailwindcss.com/',
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: 'angular',
    description:
      'Plataforma de desarrollo de aplicaciones web basada en TypeScript. Proporciona una estructura robusta con inyección de dependencias, componentes reutilizables y herramientas para aplicaciones empresariales.',
    url: 'https://angular.io/',
  },
  {
    id: 'php',
    name: 'PHP',
    icon: 'php',
    description:
      'Lenguaje de programación del lado del servidor ampliamente utilizado para desarrollo web dinámico. Ideal para crear aplicaciones robustas y sistemas de gestión de contenido.',
    url: 'https://www.php.net/',
  },
]

const backendTechs = [
  {
    id: 'node',
    name: 'Node.js',
    icon: 'node',
    description:
      'Entorno de ejecución de JavaScript del lado del servidor. Permite construir aplicaciones escalables y de alto rendimiento usando el mismo lenguaje tanto en frontend como backend.',
    url: 'https://nodejs.org/',
  },
  {
    id: 'express',
    name: 'ExpressJS',
    icon: 'express',
    description:
      'Framework minimalista y flexible para Node.js que proporciona características robustas para aplicaciones web y APIs. Es el estándar de facto para servidores con Node.js.',
    url: 'https://expressjs.com/',
  },
  {
    id: 'spring',
    name: 'SpringBoot',
    icon: 'spring',
    description:
      'Framework de Java que simplifica la creación de aplicaciones empresariales. Spring Boot ofrece configuración automática, microservicios y ecosistema completo para desarrollo backend.',
    url: 'https://spring.io/projects/spring-boot',
  },
  {
    id: 'nest',
    name: 'NestJs',
    icon: 'nestjs',
    description:
      'Framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables. Utiliza TypeScript y combina elementos de OOP, FP y FRP.',
    url: 'https://nestjs.com/',
  },
]

const databaseTechs = [
  {
    id: 'pg',
    name: 'PostgreSQL',
    icon: 'pg',
    description:
      'Sistema de base de datos relacional de código abierto potente y avanzado. Ofrece características como integridad transaccional, concurrencia y soporte para datos JSON.',
    url: 'https://www.postgresql.org/',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: 'mysql',
    description:
      'Sistema de gestión de bases de datos relacional ampliamente utilizado. Es conocido por su velocidad, confiabilidad y facilidad de uso en aplicaciones web.',
    url: 'https://www.mysql.com/',
  },
  {
    id: 'oracle',
    name: 'Oracle',
    icon: 'oracle',
    description:
      'Base de datos empresarial líder en el mercado. Ofrece alto rendimiento, seguridad avanzada y características para aplicaciones críticas y big data.',
    url: 'https://www.oracle.com/database/',
  },
]

const devToolsTechs = [
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    description:
      'Plataforma de desarrollo colaborativo basada en Git. Permite alojar proyectos, control de versiones, revisión de código y gestión de equipos de desarrollo.',
    url: 'https://github.com/',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'gitlab',
    description:
      'Plataforma DevOps completa que proporciona gestión de repositorios Git, CI/CD, seguimiento de problemas y despliegue continuo en un solo lugar.',
    url: 'https://gitlab.com/',
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: 'docker',
    description:
      'Plataforma de contenedores que permite empaquetar aplicaciones y sus dependencias en entornos aislados, garantizando consistencia en desarrollo y producción.',
    url: 'https://www.docker.com/',
  },
  {
    id: 'vc',
    name: 'Visual Studio Code',
    icon: 'vc',
    description:
      'Editor de código ligero pero potente desarrollado por Microsoft. Ofrece debugging inteligente, resaltado de sintaxis, control de versiones integrado y miles de extensiones.',
    url: 'https://code.visualstudio.com/',
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    icon: 'dbeaver',
    description:
      'Cliente de base de datos universal gratuito y de código abierto. Soporta múltiples bases de datos como MySQL, PostgreSQL, Oracle, SQL Server y más.',
    url: 'https://dbeaver.io/',
  },
  {
    id: 'openvpn',
    name: 'OpenVPN',
    icon: 'openvpn',
    description:
      'Solución de red privada virtual (VPN) de código abierto. Proporciona conexiones seguras y encriptadas para acceso remoto a redes privadas.',
    url: 'https://openvpn.net/',
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: 'canva',
    description:
      'Plataforma de diseño gráfico online que permite crear diseños profesionales para interfaces, presentaciones, branding y material visual para proyectos.',
    url: 'https://www.canva.com/',
  },
]

// Background style con la imagen
const backgroundStyle = {
  backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 20, 30, 0.85)), url('/servicios/inicio.webp')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
}

// Mostrar información de la tecnología seleccionada
const showTechInfo = (tech) => {
  selectedTech.value = tech
}

// Función para animar el card hacia la derecha
const animateCardToRight = () => {
  if (!movingCard.value) return

  // Obtener dimensiones actuales del card
  const originalRect = movingCard.value.getBoundingClientRect()

  // Crear clon del card para animar
  const clonedCard = movingCard.value.cloneNode(true)
  clonedCard.id = 'animatedCloneCard'
  clonedCard.style.position = 'fixed'
  clonedCard.style.top = `${originalRect.top}px`
  clonedCard.style.left = `${originalRect.left}px`
  clonedCard.style.width = `${originalRect.width}px`
  clonedCard.style.margin = '0'
  clonedCard.style.zIndex = '9999'
  clonedCard.style.transition = 'all 0.85s cubic-bezier(0.2, 0.9, 0.4, 1.2)'
  clonedCard.style.backdropFilter = 'blur(12px)'
  clonedCard.style.backgroundColor = 'rgba(0,0,0,0.65)'

  // Ocultar el original temporalmente
  movingCard.value.style.opacity = '0'
  movingCard.value.style.visibility = 'hidden'

  document.body.appendChild(clonedCard)

  // Forzar reflow
  clonedCard.offsetHeight

  // Mostrar temporalmente el layout final para obtener coordenadas
  showCenteredCard.value = false
  showFinalLayout.value = true

  // Esperar a que el DOM se actualice
  setTimeout(() => {
    // Obtener la posición de destino (card derecha)
    const rightCard = document.querySelector('.lg\\:w-1\\/3 > div')
    if (rightCard) {
      const targetRect = rightCard.getBoundingClientRect()

      // Animar el clon hacia la posición destino
      clonedCard.style.top = `${targetRect.top}px`
      clonedCard.style.left = `${targetRect.left}px`
      clonedCard.style.width = `${targetRect.width}px`
      clonedCard.style.height = `${targetRect.height}px`

      // Ajustar estilos del contenido para que se vea bien
      const clonedHeading = clonedCard.querySelector('h2')
      const clonedPara = clonedCard.querySelector('p')
      if (clonedHeading) {
        clonedHeading.classList.add('text-xl', 'md:text-2xl')
      }
      if (clonedPara) {
        clonedPara.classList.add('text-sm', 'md:text-base')
      }

      // Cuando termine la animación, remover el clon
      clonedCard.addEventListener('transitionend', () => {
        if (clonedCard && clonedCard.parentNode) {
          clonedCard.remove()
        }
      })

      // Fallback por si no se dispara transitionend
      setTimeout(() => {
        if (clonedCard && clonedCard.parentNode) {
          clonedCard.remove()
        }
      }, 1000)
    }
  }, 50)
}

// Iniciar la animación después de 5 segundos
onMounted(() => {
  setTimeout(() => {
    animateCardToRight()
  }, 5000)
})
</script>

<style scoped>
/* Efecto neon para textos */
.neon-text {
  text-shadow:
    0 0 5px #0ff,
    0 0 10px #0ff,
    0 0 20px rgba(0, 255, 255, 0.5);
}

/* Estilos para los cards de tecnología */
.tech-card {
  backdrop-filter: blur(12px);
  background: rgba(10, 20, 30, 0.55);
  border-radius: 1.5rem;
  transition: all 0.4s ease;
  opacity: 1;
  transform: translateY(0);
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  border-color: rgba(0, 255, 255, 0.7);
}

/* Efecto hover para íconos */
.icon-hover {
  transition: all 0.2s ease;
  cursor: pointer;
}

.icon-hover:hover {
  filter: drop-shadow(0 0 8px cyan);
  transform: scale(1.1);
}

/* Animación float infinita para el ícono seleccionado */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Animación de fade in para el layout final */
.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Animación de pulso para el card centrado */
@keyframes gentlePulse {
  0% {
    box-shadow: 0 0 0px rgba(0, 255, 255, 0.2);
    border-color: rgba(0, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 18px rgba(0, 255, 255, 0.6);
    border-color: rgba(0, 255, 255, 0.7);
  }
}

:deep(#movingCard) {
  animation: gentlePulse 1.8s infinite alternate;
}

/* Estilos para el clon animado */
:deep(#animatedCloneCard) {
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #0ff;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0cc;
}

/* Ajustes responsivos */
@media (max-width: 1024px) {
  .tech-card {
    margin-bottom: 1rem;
  }
}

/* Transiciones suaves */
* {
  transition: all 0.3s ease;
}
</style>
