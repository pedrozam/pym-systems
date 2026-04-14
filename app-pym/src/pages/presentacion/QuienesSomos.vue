<template>
  <q-page class="bg-transparent min-h-screen py-4 md:py-8 px-8 md:px-16 lg:px-24">
    <!-- Logo principal -->
    <div class="py-8">
      <div class="flex justify-center">
        <img
          src="/icons/favicon-128x128.png"
          alt="Logo de la empresa"
          class="w-24 h-24 md:w-32 md:h-32 animate-logo"
        />
      </div>
    </div>

    <!-- Sección: Quiénes somos -->
    <section class="max-w-7xl mx-auto mb-12">
      <div
        class="bg-cyan-950/30 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/20"
      >
        <q-separator
          class="mb-8 md:mb-12"
          color="turquesa"
          size="2px"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Columna izquierda: Texto -->
          <div class="order-1 lg:order-1">
            <h2
              class="text-3xl md:text-4xl font-bold mb-6 text-cyan-400 neon-text animate-text-pulse"
            >
              ¿Quiénes Somos?
            </h2>
            <div class="text-cyan-50 text-base md:text-lg leading-relaxed">
              <p class="border-r-2 border-cyan-400 animate-blink">
                {{ animatedDescription }}
              </p>
            </div>
          </div>

          <!-- Columna derecha: Imagen -->
          <div class="order-2 lg:order-2">
            <div
              class="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-cyan-400 to-cyan-600 via-cyan-800"
            >
              <img
                :src="currentImage?.src"
                :key="currentImage?.src"
                :alt="currentImage?.description"
                class="absolute top-0 left-0 w-full h-full object-cover opacity-85 transition-opacity duration-500 animate-image-fade"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 md:p-4 text-sm md:text-base text-center z-10 border-t border-cyan-400/30 animate-slide-up"
              >
                {{ currentImage?.description }}
              </div>
              <div
                class="absolute inset-0 bg-gradient-radial from-cyan-400/30 to-transparent animate-float-shapes pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        <q-separator
          class="mt-8 md:mt-12"
          color="turquesa"
          size="2px"
        />
      </div>
    </section>

    <!-- Sección: Misión y Visión -->
    <section class="max-w-7xl mx-auto mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-cyan-950/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-cyan-400/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-400/30 hover:-translate-y-1"
        >
          <h3
            class="text-2xl md:text-3xl font-bold text-cyan-300 mb-4 neon-text animate-text-pulse"
          >
            Nuestra Misión
          </h3>
          <p class="text-cyan-50 leading-relaxed text-justify">
            Transformar la gestión de emprendimientos, profesionales y organizaciones a través de
            soluciones tecnológicas innovadoras, accesibles y seguras, automatizando procesos clave
            y facilitando la toma de decisiones mediante sistemas prácticos con enfoque mobile
            first.
          </p>
        </div>
        <div
          class="bg-cyan-950/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-cyan-400/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-400/30 hover:-translate-y-1"
        >
          <h3
            class="text-2xl md:text-3xl font-bold text-cyan-300 mb-4 neon-text animate-text-pulse"
          >
            Nuestra Visión
          </h3>
          <p class="text-cyan-50 leading-relaxed text-justify">
            Ser la empresa líder en desarrollo de software en Bolivia, reconocida por transformar la
            vida de las personas y organizaciones a través de sistemas inteligentes que optimicen
            procesos, aseguren la integridad de la información y promuevan la innovación tecnológica
            continua.
          </p>
        </div>
      </div>
    </section>

    <!-- Sección: Historia -->
    <section class="max-w-7xl mx-auto mb-12">
      <div class="bg-cyan-950/30 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-cyan-400/20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2
              class="text-3xl md:text-4xl font-bold mb-6 text-cyan-400 neon-text animate-text-pulse"
            >
              Nuestra Historia
            </h2>
            <div class="space-y-4 text-cyan-50 leading-relaxed">
              <p class="text-justify">
                Fundada en diciembre de 2023, nuestra empresa nace de la visión compartida de dos
                ingenieros de sistemas con más de una década de experiencia en el desarrollo de
                soluciones tecnológicas para instituciones gubernamentales, organismos
                internacionales y el sector privado.
              </p>
              <p class="text-justify">
                Con trayectorias en UNICEF, el Ministerio de Trabajo, la Defensoría del Pueblo y el
                Órgano Electoral, hemos consolidado un equipo que entiende profundamente las
                necesidades de transformación digital, combinando metodologías ágiles con un enfoque
                centrado en el usuario para crear sistemas que realmente marcan la diferencia.
              </p>
            </div>
          </div>
          <div>
            <div class="space-y-6">
              <div
                v-for="item in timelineItems"
                :key="item.id"
                class="relative pl-6 pb-6 border-l-2 border-cyan-400"
              >
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-cyan-400 rounded-full"></div>
                <div class="text-xl md:text-2xl font-bold text-cyan-400 mb-2">{{ item.year }}</div>
                <div class="text-cyan-50">{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: CEO's - Versión corregida con hover funcionando -->
    <section class="max-w-7xl mx-auto mb-12">
      <h2
        class="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-8 neon-text animate-text-pulse"
      >
        Nuestro equipo de trabajo
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="ceo in ceos"
          :key="ceo.id"
          class="bg-cyan-950/80 backdrop-blur-md rounded-xl p-6 md:p-8 text-center border border-cyan-400/30 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-400/40 hover:-translate-y-1"
        >
          <!-- Contenedor de la imagen con hover -->
          <div
            class="relative w-48 md:w-64 h-64 md:h-80 mx-auto mb-6 rounded-xl overflow-hidden shadow-lg"
          >
            <a
              :href="ceo.cvPath"
              target="_blank"
              rel="noopener noreferrer"
              class="block relative w-full h-full group"
              @mouseenter="ceo.showTooltip = true"
              @mouseleave="ceo.showTooltip = false"
            >
              <img
                :src="ceo.image"
                :alt="ceo.name"
                class="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-radial from-cyan-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-photo-glow pointer-events-none"
              ></div>

              <!-- Overlay que SOLO se muestra en hover -->
              <div
                v-if="ceo.showTooltip"
                class="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 z-10 animate-fade-in"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  class="md:w-10 md:h-10"
                >
                  <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14" />
                </svg>
                <span
                  class="text-white text-sm md:text-base font-medium bg-cyan-400/30 px-2 md:px-3 py-1 rounded-full border border-cyan-400/50"
                  >Ver CV Completo</span
                >
              </div>
            </a>
          </div>

          <h3 class="text-xl md:text-2xl text-cyan-400 mb-2">{{ ceo.name }}</h3>
          <p class="text-cyan-300 font-medium mb-4">{{ ceo.role }}</p>
          <div class="text-cyan-50 leading-relaxed text-left">
            <p class="text-justify">{{ ceo.bio }}</p>
          </div>
          <div class="flex justify-center gap-3 flex-wrap mt-6">
            <a
              v-for="social in ceo.socialLinks"
              :key="social.id"
              :href="social.url"
              :target="social.target || '_blank'"
              :rel="social.rel || 'noopener noreferrer'"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
              :style="{ backgroundColor: social.backgroundColor, color: social.color }"
            >
              <q-tooltip
                :offset="[0, 10]"
                :style="{ backgroundColor: social.color }"
              >
                {{ social.tooltip }}
              </q-tooltip>
              <svg
                width="18"
                height="18"
                class="fill-current"
              >
                <use :xlink:href="`${spriteUrl}#${social.icon}`" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: Nuestro Equipo -->
    <section class="max-w-7xl mx-auto mb-12">
      <h2
        class="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-8 neon-text animate-text-pulse"
      >
        Colaboradores
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="bg-cyan-950/60 backdrop-blur-md rounded-xl p-6 text-center border border-cyan-400/20 transition-all duration-300 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-cyan-400/30"
        >
          <div class="mb-4">
            <div
              class="w-24 h-24 mx-auto bg-cyan-400/15 rounded-full flex items-center justify-center"
            >
              <q-icon
                :name="member.icon"
                size="3rem"
                color="turquesa"
              />
            </div>
          </div>
          <h4 class="text-xl text-cyan-400 mb-1">{{ member.name }}</h4>
          <p class="text-cyan-300 text-sm mb-3">{{ member.role }}</p>
          <p class="text-cyan-50 text-sm leading-relaxed mb-4 text-justify">{{ member.bio }}</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <span
              v-for="skill in member.skills"
              :key="skill"
              class="bg-cyan-400/15 px-2 py-1 rounded-full text-xs text-cyan-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { spriteUrl } = defineProps({
  spriteUrl: { type: String, required: true },
})

// Texto de descripción mejorado
const description =
  'Somos una empresa de software especializada en ofrecer soluciones tecnológicas a emprendimientos, profesionales, empresas e instituciones. Nuestro objetivo es brindarles el control total sobre sus actividades, automatizando procesos clave mediante sistemas prácticos, accesibles desde cualquier dispositivo bajo un enfoque mobile first. Diseñamos sistemas con énfasis en el manejo de registros transaccionales y flujos de trabajo (workflow), asegurando una administración completa de las aplicaciones. Todo ello, garantizando la seguridad e integridad de la información de nuestros clientes.'

const animatedDescription = ref('')
let currentIndex = 0

// Timeline items
const timelineItems = ref([
  {
    id: 1,
    year: 'Nov 2023 a Jul 2024',
    description:
      'Sistema de Información de Niñas, Niños y Adolescentes - SINNA, Primera etapa de desarrollo (MOSPA, MID, MODEFA)',
  },
  {
    id: 2,
    year: 'Sep 2024 - Dic 2024',
    description:
      'Sistema de Información de Niñas, Niños y Adolescentes - SINNA, Segunda etapa de desarrollo y prueba piloto (MOLIV, MODIPI)',
  },
  {
    id: 3,
    year: 'Nov 2024 - Ene 2025',
    description:
      'Sistema defensorial de supervisión y evaluación periódica de la convención sobre los derechos del niño en Bolivia - SIDENIB',
  },
  {
    id: 4,
    year: 'Mar 2025 a Jul 2025',
    description:
      'Sistema de Registro de denuncias y renuncias por acoso y violencia política - AVP.',
  },
  {
    id: 5,
    year: 'Sep 2025 a Dic 2025',
    description:
      'Sistema de Información de Niñas, Niños y Adolescentes - SINNA, Tercera etapa de desarrollo, optimización e implementación del sistema a nivel nacional',
  },
])

// CEOs
const ceos = ref([
  {
    id: 1,
    name: 'Pedro Zambrana',
    role: 'CEO & Project Manager',
    image: '/ceo/pedro.png',
    cvPath: '/ceo/cvPedro.pdf',
    bio: 'Ingeniero de Sistemas con amplia experiencia en desarrollo de software para instituciones como UNICEF, Ministerio de Trabajo y Órgano Electoral. Especialista en metodologías ágiles SCRUM, arquitectura de sistemas y gestión de proyectos tecnológicos.',
    showTooltip: false,
    socialLinks: [
      {
        id: 1,
        icon: 'linkedin',
        url: 'https://www.linkedin.com/in/pedrozamb/',
        tooltip: 'LinkedIn',
        color: '#0A66C2',
        backgroundColor: '#ffffff',
      },
      {
        id: 2,
        icon: 'github',
        url: 'https://github.com/pedrozam',
        tooltip: 'GitHub',
        color: '#1F2937',
        backgroundColor: '#1F2937',
      },
      {
        id: 3,
        icon: 'gitlab',
        url: 'https://gitlab.com/pedrozam',
        tooltip: 'GitLab',
        color: '#FC6D26',
        backgroundColor: '#ffffff',
      },
      {
        id: 4,
        icon: 'email',
        url: 'mailto:pedrozam@pymsystems.com',
        tooltip: 'Email',
        color: '#EA4335',
        backgroundColor: '#ffffff',
        target: '',
        rel: '',
      },
      {
        id: 5,
        icon: 'x',
        url: 'https://twitter.com/pedrozam20',
        tooltip: 'X',
        color: '#000000',
        backgroundColor: '#000000',
      },
    ],
  },
  {
    id: 2,
    name: 'María Veizaga',
    role: 'CEO & Project Design',
    image: '/ceo/maria.png',
    cvPath: '/ceo/cvMaria.pdf',
    bio: 'Ingeniera de Sistemas con más de 10 años de experiencia en desarrollo fullstack y diseño de experiencias de usuario. Ha liderado proyectos estratégicos para UNICEF y EDUCO, destacándose en la creación de sistemas intuitivos con enfoque mobile first.',
    showTooltip: false,
    socialLinks: [
      {
        id: 1,
        icon: 'linkedin',
        url: 'https://linkedin.com/in/maria-veizaga-zelaya',
        tooltip: 'LinkedIn',
        color: '#0A66C2',
        backgroundColor: '#ffffff',
      },
      {
        id: 2,
        icon: 'github',
        url: 'https://github.com/mariavz',
        tooltip: 'GitHub',
        color: '#1F2937',
        backgroundColor: '#1F2937',
      },
      {
        id: 3,
        icon: 'gitlab',
        url: 'https://gitlab.com/mariavz',
        tooltip: 'GitLab',
        color: '#FC6D26',
        backgroundColor: '#ffffff',
      },
      {
        id: 4,
        icon: 'email',
        url: 'mailto:mariaveizaga@pymsystems.com',
        tooltip: 'Email',
        color: '#EA4335',
        backgroundColor: '#ffffff',
        target: '',
        rel: '',
      },
      {
        id: 5,
        icon: 'x',
        url: 'https://twitter.com/mariavz',
        tooltip: 'X',
        color: '#000000',
        backgroundColor: '#000000',
      },
    ],
  },
])

// Team members
const teamMembers = ref([
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'FullStack Developer Senior',
    bio: 'Especialista en microservicios y optimización de BD.',
    skills: ['Java', 'Spring Boot', 'Angular', 'MongoDB', 'AWS'],
    icon: 'code',
  },
  {
    id: 2,
    name: 'Ana Laura Flores',
    role: 'Frontend Developer & UI Designer',
    bio: 'Apasionada por interfaces intuitivas. Experta en Vue.js.',
    skills: ['Vue.js', 'Tailwind CSS', 'Figma', 'JavaScript', 'Quasar'],
    icon: 'design_services',
  },
  {
    id: 3,
    name: 'Javier Rojas',
    role: 'Backend Developer & DevOps',
    bio: 'Experto en CI/CD, despliegue automatizado y seguridad.',
    skills: ['Node.js', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
    icon: 'storage',
  },
])

// Gallery
const galleryImages = ref([
  {
    id: 1,
    src: '/quienes-somos/1.jpg',
    description: 'Proyecto SINNA - Presentación en Cochabamba.',
  },
  { id: 2, src: '/quienes-somos/2.jpg', description: 'Implementación de sistemas integrados.' },
  { id: 3, src: '/quienes-somos/3.jpg', description: 'Capacitación a operadores del sistema.' },
  { id: 4, src: '/quienes-somos/4.jpg', description: 'Reunión con stakeholders del ministerio.' },
  { id: 5, src: '/quienes-somos/5.jpg', description: 'Presentación de resultados y métricas.' },
])

const currentImage = ref(null)
let imageInterval = null
let currentImageIndex = ref(0)

const loadImages = async () => {
  const validImages = []
  for (const img of galleryImages.value) {
    try {
      const response = await fetch(img.src, { method: 'HEAD' })
      if (response.ok) validImages.push(img)
    } catch {
      console.log(`Imagen no encontrada: ${img.src}`)
    }
  }
  if (validImages.length === 0)
    validImages.push({
      id: 0,
      src: '/quienes-somos/default.jpg',
      description: 'Imagen por defecto',
    })

  currentImage.value = validImages[0]
  imageInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % validImages.length
    currentImage.value = validImages[currentImageIndex.value]
  }, 4000)
}

const animateText = () => {
  if (currentIndex < description.length) {
    animatedDescription.value += description[currentIndex]
    currentIndex++
    setTimeout(animateText, 30)
  }
}

onMounted(async () => {
  animateText()
  await loadImages()
})

onBeforeUnmount(() => {
  if (imageInterval) clearInterval(imageInterval)
})
</script>

<style scoped>
@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes logoGlow {
  0% {
    filter: drop-shadow(0 0 5px rgba(22, 179, 196, 0.3));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(34, 211, 230, 0.8));
  }
}
.animate-logo {
  animation:
    logoFloat 3s ease-in-out infinite,
    logoGlow 2s ease-in-out infinite alternate;
}

@keyframes textPulse {
  0%,
  100% {
    text-shadow: 0 0 5px rgba(22, 179, 196, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(34, 211, 230, 0.8);
  }
}
.animate-text-pulse {
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    border-color: transparent;
  }
  50% {
    border-color: #16b3c4;
  }
}
.animate-blink {
  animation: blink 0.75s step-end infinite;
  display: inline-block;
}

@keyframes imageFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.85;
  }
}
.animate-image-fade {
  animation: imageFade 0.5s ease-in-out;
}

@keyframes floatShapes {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, 10px);
  }
}
.animate-float-shapes {
  animation: floatShapes 4s ease-in-out infinite;
}

@keyframes photoGlow {
  0%,
  100% {
    box-shadow: inset 0 0 10px rgba(22, 179, 196, 0.3);
  }
  50% {
    box-shadow: inset 0 0 30px rgba(22, 179, 196, 0.6);
  }
}
.animate-photo-glow {
  animation: photoGlow 1.5s ease-in-out infinite;
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeInOverlay 0.3s ease;
}

@keyframes slideUpIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide-up {
  animation: slideUpIn 0.5s ease-out;
}

.neon-text {
  text-shadow:
    0 0 5px rgba(22, 179, 196, 0.5),
    0 0 10px rgba(34, 211, 230, 0.3);
}

:deep(.q-tooltip) {
  font-weight: 500;
  border-radius: 4px;
  padding: 6px 12px !important;
  color: white !important;
}

.bg-gradient-radial {
  background-image: radial-gradient(circle at center, var(--tw-gradient-stops));
}
</style>
