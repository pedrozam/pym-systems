<template>
  <q-page class="quienes-somos-page">
    <!-- Logo principal con animación constante -->
    <div class="logo-header q-py-lg">
      <div class="flex flex-center">
        <img
          src="/icons/favicon-128x128.png"
          alt="Logo de la empresa"
          class="main-logo animate-logo"
        />
      </div>
    </div>

    <!-- Sección: Quiénes somos -->
    <section class="section-container q-mb-xl">
      <q-separator
        class="q-mb-xl"
        color="turquesa"
        size="2px"
      />
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <div class="text-container">
            <h2 class="section-title neon-text">¿Quiénes Somos?</h2>
            <div class="animated-text">
              <p
                class="typing-text text-justify"
                v-html="animatedDescription"
              ></p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="image-container gradient-image">
            <img
              :src="currentImage?.src"
              :key="currentImage?.src"
              alt="Imagen de la empresa"
              class="rotating-image"
            />
            <div class="image-description">
              {{ currentImage?.description }}
            </div>
            <div class="floating-shapes"></div>
          </div>
        </div>
      </div>
      <q-separator
        class="q-mt-xl"
        color="turquesa"
        size="2px"
      />
    </section>

    <!-- Sección: Misión y Visión -->
    <section class="section-container q-mb-xl">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <div
            class="card-neon mission-card"
            data-aos="fade-right"
          >
            <h3 class="card-title neon-text">Nuestra Misión</h3>
            <p class="card-text text-justify">
              Transformar la gestión de emprendimientos, profesionales y organizaciones a través de
              soluciones tecnológicas innovadoras, accesibles y seguras, automatizando procesos
              clave y facilitando la toma de decisiones mediante sistemas prácticos con enfoque
              mobile first.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div
            class="card-neon vision-card"
            data-aos="fade-left"
          >
            <h3 class="card-title neon-text">Nuestra Visión</h3>
            <p class="card-text text-justify">
              Ser la empresa líder en desarrollo de software en Bolivia, reconocida por transformar
              la vida de las personas y organizaciones a través de sistemas inteligentes que
              optimicen procesos, aseguren la integridad de la información y promuevan la innovación
              tecnológica continua.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: Historia -->
    <section class="section-container q-mb-xl">
      <div class="row items-center q-col-gutter-xl">
        <div class="col-12 col-md-6 order-md-2">
          <div class="text-container">
            <h2 class="section-title neon-text">Nuestra Historia</h2>
            <div class="animated-text">
              <p class="scroll-animate-text text-justify">
                Fundada en diciembre de 2023, nuestra empresa nace de la visión compartida de dos
                ingenieros de sistemas con más de una década de experiencia en el desarrollo de
                soluciones tecnológicas para instituciones gubernamentales, organismos
                internacionales y el sector privado.
              </p>
              <p class="scroll-animate-text q-mt-md text-justify">
                Con trayectorias en UNICEF, el Ministerio de Trabajo, la Defensoría del Pueblo y el
                Órgano Electoral, hemos consolidado un equipo que entiende profundamente las
                necesidades de transformación digital, combinando metodologías ágiles con un enfoque
                centrado en el usuario para crear sistemas que realmente marcan la diferencia.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 order-md-1">
          <div class="timeline-container">
            <div
              v-for="item in timelineItems"
              :key="item.id"
              class="timeline-item"
            >
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-desc">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: CEO's -->
    <section class="ceo-section q-mb-xl">
      <h2 class="section-title text-center neon-text q-mb-lg">{{ ceosTitle }}</h2>
      <div class="row q-col-gutter-xl">
        <div
          v-for="(ceo, index) in ceos"
          :key="ceo.id"
          class="col-12 col-md-6"
          :data-aos="index === 0 ? 'zoom-in' : 'zoom-in'"
          :data-aos-delay="index * 200"
        >
          <div class="ceo-card">
            <a
              :href="ceo.cvPath"
              target="_blank"
              rel="noopener noreferrer"
              class="ceo-image"
              @mouseenter="ceo.showTooltip = true"
              @mouseleave="ceo.showTooltip = false"
              style="cursor: pointer; display: block"
            >
              <img
                :src="ceo.image"
                :alt="ceo.name"
                class="ceo-photo"
              />
              <div class="ceo-photo-glow"></div>
              <div
                class="cv-overlay"
                v-show="ceo.showTooltip"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                >
                  <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14" />
                </svg>
                <span>Ver CV Completo</span>
              </div>
            </a>
            <h3 class="ceo-name">{{ ceo.name }}</h3>
            <p class="ceo-role">{{ ceo.role }}</p>
            <div class="ceo-bio">
              <p class="text-justify">{{ ceo.bio }}</p>
            </div>
            <div class="social-icons">
              <a
                v-for="social in ceo.socialLinks"
                :key="social.id"
                :href="social.url"
                :target="social.target || '_blank'"
                :rel="social.rel || 'noopener noreferrer'"
                :class="`social-icon ${social.type}`"
                :style="{ backgroundColor: social.backgroundColor, color: social.color }"
              >
                <q-tooltip
                  :offset="[0, 10]"
                  :style="{ backgroundColor: social.color }"
                >
                  {{ social.tooltip }}
                </q-tooltip>
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#${social.icon}`" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: Nuestro Equipo -->
    <section class="section-container q-mb-xl">
      <h2 class="section-title text-center neon-text q-mb-lg">{{ collaboratorsTitle }}</h2>
      <div class="row q-col-gutter-lg">
        <div
          v-for="(member, index) in teamMembers"
          :key="member.id"
          class="col-12 col-sm-6 col-md-4"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="team-card">
            <div class="team-image">
              <div class="image-placeholder">
                <q-icon
                  :name="member.icon"
                  size="3rem"
                  color="turquesa"
                />
              </div>
            </div>
            <h4 class="team-name">{{ member.name }}</h4>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-bio text-justify">{{ member.bio }}</p>
            <div class="team-skills">
              <span
                v-for="skill in member.skills"
                :key="skill"
                >{{ skill }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'

// Props
const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

// ============================================
// TEXTOS PRINCIPALES
// ============================================
const description =
  'Somos una empresa de software, que pretende dar soluciones tecnológicas a emprendimientos, profesionales, empresas, instituciones u organizaciones, que les permita tomar el control de las actividades que realizan, aportando nuestra experiencia para poder automatizar procesos, diseñando sistemas informáticos prácticos que puedan ser accesibles por medio de cualquier dispositivo (diseño mobile first), con un enfoque y diseño de sistemas enfocado a contar con registros transaccionales, manejo de flujos de trabajo (workflow). Dándole a nuestros clientes una administración de sus aplicaciones completa, asegurando la seguridad e integridad de la información.'

const animatedDescription = ref('')
let currentIndex = 0

// ============================================
// TÍTULOS Y ETIQUETAS
// ============================================
const ceosTitle = 'Nuestro equipo de trabajo'
const collaboratorsTitle = 'Colaboradores'

// ============================================
// DATOS DEL TIMELINE
// ============================================
const timelineItems = ref([
  {
    id: 1,
    year: '2023',
    description: 'Inicio de proyectos de consultoría',
  },
  {
    id: 2,
    year: '2024',
    description: 'SINNA - Primera etapa (MOSPA, MID, MODEFA)',
  },
  {
    id: 3,
    year: '2024 - 2025',
    description: 'SINNA - Segunda etapa (MOLIV, MODIPI)',
  },
  {
    id: 4,
    year: '2025',
    description: 'SINNA - Tercera etapa (Implementación nacional)',
  },
  {
    id: 5,
    year: '2025',
    description: 'Sistema AVP - Órgano Electoral Plurinacional',
  },
])

// ============================================
// DATOS DE LOS CEOs
// ============================================
const ceos = ref([
  {
    id: 1,
    name: 'Pedro Zambrana',
    role: 'CEO & Project Manager',
    image: '/ceo/pedro.png',
    cvPath: '/ceo/cvPedro.pdf',
    bio: 'Ingeniero de Sistemas con amplia experiencia en desarrollo de software para instituciones como UNICEF, Ministerio de Trabajo y Órgano Electoral. Especialista en metodologías ágiles SCRUM, arquitectura de sistemas y gestión de proyectos tecnológicos. Su enfoque combina la excelencia técnica con la capacidad de liderar equipos multidisciplinarios para entregar soluciones que transforman procesos organizacionales.',
    showTooltip: false,
    socialLinks: [
      {
        id: 1,
        type: 'linkedin',
        icon: 'linkedin',
        url: 'https://www.linkedin.com/in/pedrozamb/',
        tooltip: 'Ir al LinkedIn de Pedro',
        color: '#0A66C2',
        backgroundColor: '#ffffff',
      },
      {
        id: 2,
        type: 'github',
        icon: 'github',
        url: 'https://github.com/pedrozam',
        tooltip: 'Ir al GitHub de Pedro',
        color: '#1F2937',
        backgroundColor: '#1F2937',
      },
      {
        id: 3,
        type: 'gitlab',
        icon: 'gitlab',
        url: 'https://gitlab.com/pedrozam',
        tooltip: 'Ir al GitLab de Pedro',
        color: '#FC6D26',
        backgroundColor: '#ffffff',
      },
      {
        id: 4,
        type: 'email',
        icon: 'email',
        url: 'mailto:pedrozam@pymsystems.com',
        target: '',
        rel: '',
        tooltip: 'Enviar email a Pedro',
        color: '#EA4335',
        backgroundColor: '#ffffff',
      },
      {
        id: 5,
        type: 'x',
        icon: 'x',
        url: 'https://twitter.com/pedrozam20',
        tooltip: 'Ir al X (Twitter) de Pedro',
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
    bio: 'Ingeniera de Sistemas con más de 10 años de experiencia en desarrollo fullstack y diseño de experiencias de usuario. Ha liderado proyectos estratégicos para UNICEF y EDUCO, destacándose en la creación de sistemas intuitivos con enfoque mobile first. Su pasión por el diseño centrado en el usuario y su capacidad para traducir necesidades complejas en soluciones prácticas la convierten en una pieza fundamental para garantizar la usabilidad y el impacto de nuestros desarrollos.',
    showTooltip: false,
    socialLinks: [
      {
        id: 1,
        type: 'linkedin',
        icon: 'linkedin',
        url: 'https://linkedin.com/in/maria-veizaga-zelaya',
        tooltip: 'Ir al LinkedIn de María',
        color: '#0A66C2',
        backgroundColor: '#ffffff',
      },
      {
        id: 2,
        type: 'github',
        icon: 'github',
        url: 'https://github.com/mariavz',
        tooltip: 'Ir al GitHub de María',
        color: '#1F2937',
        backgroundColor: '#1F2937',
      },
      {
        id: 3,
        type: 'gitlab',
        icon: 'gitlab',
        url: 'https://gitlab.com/mariavz',
        tooltip: 'Ir al GitLab de María',
        color: '#FC6D26',
        backgroundColor: '#ffffff',
      },
      {
        id: 4,
        type: 'email',
        icon: 'email',
        url: 'mailto:mariaveizaga@pymsystems.com',
        target: '',
        rel: '',
        tooltip: 'Enviar email a María',
        color: '#EA4335',
        backgroundColor: '#ffffff',
      },
      {
        id: 5,
        type: 'x',
        icon: 'x',
        url: 'https://twitter.com/mariavz',
        tooltip: 'Ir al X (Twitter) de María',
        color: '#000000',
        backgroundColor: '#000000',
      },
    ],
  },
])

// ============================================
// DATOS DEL EQUIPO DE TRABAJO
// ============================================
const teamMembers = ref([
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'FullStack Developer Senior',
    bio: 'Especialista en arquitectura de microservicios y optimización de bases de datos. Con experiencia en proyectos gubernamentales y privados.',
    skills: ['Java', 'Spring Boot', 'Angular', 'MongoDB', 'AWS'],
    icon: 'code',
  },
  {
    id: 2,
    name: 'Ana Laura Flores',
    role: 'Frontend Developer & UI Designer',
    bio: 'Apasionada por crear interfaces intuitivas y atractivas. Experta en Vue.js y diseño responsive con enfoque mobile first.',
    skills: ['Vue.js', 'Tailwind CSS', 'Figma', 'JavaScript', 'Quasar'],
    icon: 'design_services',
  },
  {
    id: 3,
    name: 'Javier Rojas',
    role: 'Backend Developer & DevOps',
    bio: 'Experto en integración continua, despliegue automatizado y seguridad de aplicaciones. Certificado en SCRUM y AWS.',
    skills: ['Node.js', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL'],
    icon: 'storage',
  },
])

// ============================================
// DATOS DE IMÁGENES CON DESCRIPCIONES
// ============================================
const galleryImages = ref([
  {
    id: 1,
    src: '/quienes-somos/1.jpg',
    description:
      'Proyecto SINNA - Presentación realizada a usuarios de Centros de Acogida en el departamento de Cochabamba.',
  },
  {
    id: 2,
    src: '/quienes-somos/2.jpg',
    description:
      'Implementación de sistemas integrados para gestión de datos y reportes en tiempo real.',
  },
  {
    id: 3,
    src: '/quienes-somos/3.jpg',
    description: 'Capacitación a operadores sobre nuevas funcionalidades del sistema.',
  },
  {
    id: 4,
    src: '/quienes-somos/4.jpg',
    description: 'Reunión de trabajo con stakeholders del ministerio para validar requerimientos.',
  },
  {
    id: 5,
    src: '/quienes-somos/5.jpg',
    description: 'Presentación de resultados y métricas de desempeño del sistema.',
  },
])

// ============================================
// VARIABLES DE ESTADO
// ============================================
const imageFiles = ref([])
const currentImage = ref(null)
let imageInterval = null
let currentImageIndex = ref(0)

// Función para cargar las imágenes
const loadImages = async () => {
  try {
    const validImages = []
    for (const img of galleryImages.value) {
      try {
        const response = await fetch(img.src, { method: 'HEAD' })
        if (response.ok) {
          validImages.push(img)
        }
      } catch {
        console.log(`Imagen no encontrada: ${img.src}`)
      }
    }

    if (validImages.length === 0) {
      validImages.push({
        id: 0,
        src: '/quienes-somos/default.jpg',
        description: 'Imagen por defecto',
      })
    }

    imageFiles.value = validImages
    currentImage.value = imageFiles.value[0]
    currentImageIndex.value = 0

    imageInterval = setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % imageFiles.value.length
      currentImage.value = imageFiles.value[currentImageIndex.value]
    }, 4000)
  } catch (error) {
    console.error('Error al cargar las imágenes:', error)
    currentImage.value = {
      id: 0,
      src: '/quienes-somos/default.jpg',
      description: 'Imagen por defecto',
    }
  }
}

// Animación de escritura
const animateText = () => {
  if (currentIndex < description.length) {
    animatedDescription.value += description[currentIndex]
    currentIndex++
    setTimeout(animateText, 30)
  }
}

// Observer para animaciones al hacer scroll
let observer = null

onMounted(async () => {
  animateText()
  await loadImages()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 },
  )

  document
    .querySelectorAll('.scroll-animate-text, .card-neon, .ceo-card, .team-card, .timeline-item')
    .forEach((el) => {
      observer.observe(el)
    })
})

onBeforeUnmount(() => {
  if (imageInterval) {
    clearInterval(imageInterval)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped lang="scss">
@import '../../css/quienes-somos/index.scss';
</style>
