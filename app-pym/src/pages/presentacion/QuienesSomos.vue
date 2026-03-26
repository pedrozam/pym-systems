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
              :src="currentImage"
              :key="currentImage"
              alt="Imagen de la empresa"
              class="rotating-image"
            />
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
            <div class="timeline-item">
              <div class="timeline-year">2023</div>
              <div class="timeline-desc">Fundación de la empresa</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2024</div>
              <div class="timeline-desc">SINNA - Primera etapa (MOSPA, MID, MODEFA)</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2024 - 2025</div>
              <div class="timeline-desc">SINNA - Segunda etapa (MOLIV, MODIPI)</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2025</div>
              <div class="timeline-desc">SINNA - Tercera etapa (Implementación nacional)</div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2025</div>
              <div class="timeline-desc">Sistema AVP - Órgano Electoral Plurinacional</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: CEO's -->
    <section class="ceo-section q-mb-xl">
      <h2 class="section-title text-center neon-text q-mb-lg">Nuestros Líderes</h2>
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <div
            class="ceo-card"
            data-aos="zoom-in"
          >
            <div
              class="ceo-image"
              @click="openCV('/ceo/cvPedro.pdf')"
              @mouseenter="showTooltip = true"
              @mouseleave="showTooltip = false"
            >
              <img
                src="/ceo/pedro.png"
                alt="Pedro Zambrana"
                class="ceo-photo"
              />
              <div class="ceo-photo-glow"></div>
              <div
                class="cv-overlay"
                v-show="showTooltip"
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
            </div>
            <h3 class="ceo-name">Pedro Zambrana</h3>
            <p class="ceo-role">CEO & Project Manager</p>
            <div class="ceo-bio">
              <p class="text-justify">
                Ingeniero de Sistemas con amplia experiencia en desarrollo de software para
                instituciones como UNICEF, Ministerio de Trabajo y Órgano Electoral. Especialista en
                metodologías ágiles SCRUM, arquitectura de sistemas y gestión de proyectos
                tecnológicos. Su enfoque combina la excelencia técnica con la capacidad de liderar
                equipos multidisciplinarios para entregar soluciones que transforman procesos
                organizacionales.
              </p>
            </div>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/in/pedrozamb/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon linkedin"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#linkedin`" />
                </svg>
              </a>
              <a
                href="https://github.com/pedrozam"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon github"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#github`" />
                </svg>
              </a>
              <a
                href="https://gitlab.com/pedrozam"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon gitlab"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#gitlab`" />
                </svg>
              </a>
              <a
                href="mailto:pedrozam@pymsystems.com"
                class="social-icon email"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#email`" />
                </svg>
              </a>
              <a
                href="https://twitter.com/pedrozam20"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon x"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#x`" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div
            class="ceo-card"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div
              class="ceo-image"
              @click="openCV('/ceo/cvMaria.pdf')"
              @mouseenter="showTooltipMaria = true"
              @mouseleave="showTooltipMaria = false"
            >
              <img
                src="/ceo/maria.png"
                alt="María Veizaga"
                class="ceo-photo"
              />
              <div class="ceo-photo-glow"></div>
              <div
                class="cv-overlay"
                v-show="showTooltipMaria"
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
            </div>
            <h3 class="ceo-name">María Veizaga</h3>
            <p class="ceo-role">CEO & Project Design</p>
            <div class="ceo-bio">
              <p class="text-justify">
                Ingeniera de Sistemas con más de 10 años de experiencia en desarrollo fullstack y
                diseño de experiencias de usuario. Ha liderado proyectos estratégicos para UNICEF y
                EDUCO, destacándose en la creación de sistemas intuitivos con enfoque mobile first.
                Su pasión por el diseño centrado en el usuario y su capacidad para traducir
                necesidades complejas en soluciones prácticas la convierten en una pieza fundamental
                para garantizar la usabilidad y el impacto de nuestros desarrollos.
              </p>
            </div>
            <div class="social-icons">
              <a
                href="https://linkedin.com/in/maria-veizaga-zelaya"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon linkedin"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#linkedin`" />
                </svg>
              </a>
              <a
                href="https://github.com/mariavz"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon github"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#github`" />
                </svg>
              </a>
              <a
                href="https://gitlab.com/mariavz"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon gitlab"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#gitlab`" />
                </svg>
              </a>
              <a
                href="mailto:mariaveizaga@pymsystems.com"
                class="social-icon email"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#email`" />
                </svg>
              </a>
              <a
                href="https://twitter.com/mariavz"
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon x"
              >
                <svg
                  width="20"
                  height="20"
                >
                  <use :xlink:href="`${spriteUrl}#x`" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección: Nuestro Equipo -->
    <section class="section-container q-mb-xl">
      <h2 class="section-title text-center neon-text q-mb-lg">Nuestro Equipo</h2>
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

// Texto animado para la descripción
const description =
  'Somos una empresa de software, que pretende dar soluciones tecnológicas a emprendimientos, profesionales, empresas, instituciones u organizaciones, que les permita tomar el control de las actividades que realizan, aportando nuestra experiencia para poder automatizar procesos, diseñando sistemas informáticos prácticos que puedan ser accesibles por medio de cualquier dispositivo (diseño mobile first), con un enfoque y diseño de sistemas enfocado a contar con registros transaccionales, manejo de flujos de trabajo (workflow). Dándole a nuestros clientes una administración de sus aplicaciones completa, asegurando la seguridad e integridad de la información.'

const animatedDescription = ref('')
let currentIndex = 0

// Variables para tooltips
const showTooltip = ref(false)
const showTooltipMaria = ref(false)

// Variables para el carrusel de imágenes
const imageFiles = ref([])
const currentImage = ref('')
let imageInterval = null

// Datos del equipo
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

// Función para abrir CV en nueva pestaña
const openCV = (pdfPath) => {
  // Usar window.location.origin para obtener la URL base
  const baseUrl = window.location.origin
  const fullUrl = `${baseUrl}${pdfPath}`
  window.open(fullUrl, '_blank')
}

// Función para cargar las imágenes
const loadImages = async () => {
  try {
    const images = [
      '/quienes-somos/1.jpg',
      '/quienes-somos/2.jpg',
      '/quienes-somos/3.jpg',
      '/quienes-somos/4.jpg',
      '/quienes-somos/5.jpg',
    ]

    const validImages = []
    for (const img of images) {
      try {
        const response = await fetch(img, { method: 'HEAD' })
        if (response.ok) {
          validImages.push(img)
        }
      } catch {
        console.log(`Imagen no encontrada: ${img}`)
      }
    }

    if (validImages.length === 0) {
      validImages.push('/quienes-somos/default.jpg')
    }

    imageFiles.value = validImages
    currentImage.value = imageFiles.value[0]

    let imageIndex = 0
    imageInterval = setInterval(() => {
      imageIndex = (imageIndex + 1) % imageFiles.value.length
      currentImage.value = imageFiles.value[imageIndex]
    }, 4000)
  } catch (error) {
    console.error('Error al cargar las imágenes:', error)
    currentImage.value = '/quienes-somos/default.jpg'
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

<style scoped>
.quienes-somos-page {
  background: radial-gradient(
    circle at 20% 20%,
    #0a122a 0%,
    #04060f 40%,
    #020310 75%,
    #00050a 100%
  );
  min-height: 100vh;
  padding: 2rem;
}

/* Logo animado */
.main-logo {
  width: 128px;
  height: 128px;
  filter: drop-shadow(0 0 10px rgba(22, 179, 196, 0.5));
}

.animate-logo {
  animation:
    logoFloat 3s ease-in-out infinite,
    logoGlow 2s ease-in-out infinite alternate;
}

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

/* Secciones */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(11, 31, 51, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(22, 179, 196, 0.2);
  transition: all 0.3s ease;
}

.section-container:hover {
  border-color: rgba(22, 179, 196, 0.5);
  box-shadow: 0 0 20px rgba(22, 179, 196, 0.2);
}

/* Sección de CEO sin borde */
.ceo-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: transparent;
}

/* Títulos */
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.neon-text {
  color: #16b3c4;
  text-shadow:
    0 0 5px rgba(22, 179, 196, 0.5),
    0 0 10px rgba(34, 211, 230, 0.3);
  animation: textPulse 2s ease-in-out infinite;
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

/* Texto animado */
.animated-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #e0f2fe;
}

.typing-text {
  border-right: 2px solid #16b3c4;
  animation: blink 0.75s step-end infinite;
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

/* Imagen con degradado y rotación */
.image-container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8, #0b1f33);
}

.image-container:hover {
  transform: scale(1.02);
}

.rotating-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: opacity 0.5s ease-in-out;
  animation: imageFade 0.5s ease-in-out;
}

@keyframes imageFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.85;
  }
}

.floating-shapes {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 40%, rgba(22, 179, 196, 0.3), transparent 70%);
  animation: floatShapes 4s ease-in-out infinite;
  pointer-events: none;
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

/* Cards neon */
.card-neon {
  background: rgba(11, 31, 51, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(22, 179, 196, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.card-neon.visible {
  opacity: 1;
  transform: translateY(0);
}

.card-neon:hover {
  border-color: #16b3c4;
  box-shadow: 0 0 30px rgba(22, 179, 196, 0.3);
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.8rem;
  color: #4fd1e8;
  margin-bottom: 1rem;
}

.card-text {
  color: #e0f2fe;
  line-height: 1.6;
}

/* Timeline */
.timeline-container {
  padding: 1rem;
}

.timeline-item {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
  border-left: 2px solid #16b3c4;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: bold;
  color: #16b3c4;
  margin-bottom: 0.5rem;
}

.timeline-desc {
  color: #e0f2fe;
}

/* CEO Cards */
.ceo-card {
  background: rgba(11, 31, 51, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(22, 179, 196, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.6s ease-out;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ceo-card.visible {
  opacity: 1;
  transform: scale(1);
}

.ceo-card:hover {
  border-color: #16b3c4;
  box-shadow: 0 0 30px rgba(22, 179, 196, 0.4);
  transform: translateY(-5px);
}

.ceo-image {
  position: relative;
  width: 280px;
  height: 320px;
  margin: 0 auto 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.ceo-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.5s ease;
  position: relative;
  z-index: 2;
}

.ceo-card:hover .ceo-photo {
  transform: scale(1.05);
}

.ceo-photo-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: radial-gradient(circle at center, rgba(22, 179, 196, 0.2), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.ceo-card:hover .ceo-photo-glow {
  opacity: 1;
  animation: photoGlow 1.5s ease-in-out infinite;
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

/* Overlay para CV */
.cv-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 10;
  cursor: pointer;
  animation: fadeInOverlay 0.3s ease;
}

.cv-overlay svg {
  filter: drop-shadow(0 0 5px rgba(22, 179, 196, 0.5));
}

.cv-overlay span {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(22, 179, 196, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  border: 1px solid rgba(22, 179, 196, 0.5);
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.ceo-name {
  font-size: 1.5rem;
  color: #16b3c4;
  margin-bottom: 0.5rem;
}

.ceo-role {
  color: #4fd1e8;
  font-weight: 500;
  margin-bottom: 1rem;
}

.ceo-bio {
  color: #e0f2fe;
  line-height: 1.6;
  text-align: left;
  flex: 1;
}

/* Redes sociales */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.social-icon svg {
  width: 18px;
  height: 18px;
  fill: white;
}

/* Colores de redes sociales */
.social-icon.linkedin {
  background: #fff;
}
.social-icon.github {
  background: #333;
}
.social-icon.gitlab {
  background: #75716e;
}
.social-icon.email {
  background: #ea4335;
}
.social-icon.x {
  background: #000;
}

/* Team Cards */
.team-card {
  background: rgba(11, 31, 51, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(22, 179, 196, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.team-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.team-card:hover {
  border-color: #16b3c4;
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 20px rgba(22, 179, 196, 0.3);
}

.team-image {
  margin-bottom: 1rem;
}

.team-image .image-placeholder {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: rgba(22, 179, 196, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-name {
  font-size: 1.2rem;
  color: #16b3c4;
  margin-bottom: 0.25rem;
}

.team-role {
  color: #4fd1e8;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.team-bio {
  color: #e0f2fe;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.team-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: auto;
}

.team-skills span {
  background: rgba(22, 179, 196, 0.15);
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.75rem;
  color: #4fd1e8;
}

/* Animaciones scroll */
.scroll-animate-text {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.scroll-animate-text.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .quienes-somos-page {
    padding: 1rem;
  }

  .section-container,
  .ceo-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .card-title {
    font-size: 1.4rem;
  }

  .ceo-card,
  .team-card {
    margin-bottom: 1rem;
  }

  .image-container {
    height: 250px;
    margin-top: 1rem;
  }

  .ceo-image {
    width: 220px;
    height: 260px;
  }

  .cv-overlay span {
    font-size: 0.75rem;
  }

  .cv-overlay svg {
    width: 30px;
    height: 30px;
  }
}
</style>
