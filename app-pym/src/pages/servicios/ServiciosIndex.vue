<template>
  <div class="servicios-container">
    <div class="text-center text-white mb-6">
      <h2 class="text-3xl font-bold">Nuestros Servicios</h2>
      <p class="text-base text-cyan-200">
        Elige el que más se ajusta a tu proyecto y avanza con tu transformación digital.
      </p>
    </div>

    <!-- Carousel de Servicios -->
    <div v-if="services.length > 0" class="max-w-7xl mx-auto">
      <div
        class="carousel-modern relative"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <div class="carousel-container">
          <!-- Cards visibles -->
          <div class="carousel-visible">
            <!-- Card Anterior -->
            <div
              class="carousel-card card-side"
              :class="{ 'card-side-left': true, 'card-hidden': isMobile }"
              @click="goToSlide(prevIndex)"
            >
              <div class="card-inner">
                <div class="card-glow"></div>

                <div class="card-image-container">
                  <img
                    :src="services[prevIndex]?.image"
                    :alt="services[prevIndex]?.nombre_servicio"
                    class="card-image"
                  />
                  <div class="image-overlay"></div>
                </div>

                <div class="card-content">
                  <h3 class="card-title">{{ services[prevIndex]?.nombre_servicio }}</h3>
                  <p class="card-description">{{ truncateText(services[prevIndex]?.descripcion, 60) }}</p>
                  <div class="card-info">
                    <div class="info-item">
                      <span class="info-label">Desde</span>
                      <span class="info-value">Bs. {{ services[prevIndex]?.costo_minimo }}</span>
                    </div>
                  </div>
                  <button @click.stop="openDialog(services[prevIndex])" class="card-button-side">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Actual (Destacada) -->
            <div
              class="carousel-card card-center"
              :class="{ 'card-center-mobile': isMobile }"
            >
              <div class="card-inner-center">
                <div class="card-glow-center"></div>

                <div class="card-image-container-center">
                  <img
                    :src="services[currentIndex]?.image"
                    :alt="services[currentIndex]?.nombre_servicio"
                    class="card-image-center-img"
                  />
                  <div class="image-overlay-center"></div>
                </div>

                <div class="card-content-center">
                  <h3 class="card-title-center">{{ services[currentIndex]?.nombre_servicio }}</h3>
                  <p class="card-description-center">{{ truncateText(services[currentIndex]?.descripcion, 100) }}</p>

                  <div class="card-info-center">
                    <div class="info-item-center">
                      <span class="info-label-center">Desde</span>
                      <span class="info-value-center">Bs. {{ services[currentIndex]?.costo_minimo }}</span>
                    </div>
                    <div class="info-divider-center"></div>
                    <div class="info-item-center">
                      <span class="info-label-center">Tiempo estimado</span>
                      <span class="info-value-center">{{ services[currentIndex]?.tiempo_inicial }}</span>
                    </div>
                  </div>

                  <div class="card-features">
                    <div
                      v-for="(feature, idxF) in services[currentIndex]?.features?.slice(0, 3)"
                      :key="idxF"
                      class="feature-item"
                    >
                      <svg class="feature-check" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{{ feature }}</span>
                    </div>
                  </div>

                  <button @click.stop="openDialog(services[currentIndex])" class="card-button-center">
                    Ver más detalles
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Siguiente -->
            <div
              class="carousel-card card-side"
              :class="{ 'card-side-right': true, 'card-hidden': isMobile }"
              @click="goToSlide(nextIndex)"
            >
              <div class="card-inner">
                <div class="card-glow"></div>

                <div class="card-image-container">
                  <img
                    :src="services[nextIndex]?.image"
                    :alt="services[nextIndex]?.nombre_servicio"
                    class="card-image"
                  />
                  <div class="image-overlay"></div>
                </div>

                <div class="card-content">
                  <h3 class="card-title">{{ services[nextIndex]?.nombre_servicio }}</h3>
                  <p class="card-description">{{ truncateText(services[nextIndex]?.descripcion, 60) }}</p>
                  <div class="card-info">
                    <div class="info-item">
                      <span class="info-label">Desde</span>
                      <span class="info-value">Bs. {{ services[nextIndex]?.costo_minimo }}</span>
                    </div>
                  </div>
                  <button @click.stop="openDialog(services[nextIndex])" class="card-button-side">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación -->
        <button class="nav-button nav-prev" @click="prevSlide">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="nav-button nav-next" @click="nextSlide">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicadores -->
        <div class="carousel-indicators">
          <button
            v-for="(service, index) in services"
            :key="index"
            class="indicator-dot"
            :class="{ 'indicator-active': index === currentIndex }"
            @click="goToSlide(index)"
          >
            <span class="indicator-label">{{ index + 1 }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Botón flotante de impuestos -->
    <div class="tax-button-container">
      <div
        class="tax-button"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <svg width="2rem" height="2rem" class="tax-icon">
          <use :xlink:href="`${spriteUrl}#impuestos`" />
        </svg>
        <div v-show="showTooltip" class="tax-tooltip">
          Emitimos factura.
        </div>
      </div>
    </div>

    <!-- Dialog de Servicios -->
    <DialogServicios
      :service="selectedService"
      v-model="dialogOpen"
      :spriteUrl="spriteUrl"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import useServiciosPym from 'src/composables/useServiciospym'
import DialogServicios from 'components/dialog/DialogServicios.vue'

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

const { dataServpym, listarServiciospym } = useServiciosPym()

// Estado del carousel
const currentIndex = ref(0)
let autoplayInterval = null
const isPaused = ref(false)
const services = ref([])
const isTransitioning = ref(false)
const isMobile = ref(window.innerWidth < 768)

// Índices
const prevIndex = computed(() => {
  if (services.value.length === 0) return 0
  return (currentIndex.value - 1 + services.value.length) % services.value.length
})

const nextIndex = computed(() => {
  if (services.value.length === 0) return 0
  return (currentIndex.value + 1) % services.value.length
})

// Dialog
const dialogOpen = ref(false)
const selectedService = ref({})

// Navegación con animación
const nextSlide = () => {
  if (services.value.length === 0 || isTransitioning.value) return

  isTransitioning.value = true
  currentIndex.value = nextIndex.value
  resetAutoplayTimer()

  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const prevSlide = () => {
  if (services.value.length === 0 || isTransitioning.value) return

  isTransitioning.value = true
  currentIndex.value = prevIndex.value
  resetAutoplayTimer()

  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const goToSlide = (index) => {
  if (services.value.length === 0 || isTransitioning.value || index === currentIndex.value) return

  isTransitioning.value = true
  currentIndex.value = index
  resetAutoplayTimer()

  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// Autoplay
const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  if (services.value.length > 1) {
    autoplayInterval = setInterval(() => {
      if (!isPaused.value && !isTransitioning.value) {
        nextSlide()
      }
    }, 5000)
  }
}

const pauseAutoplay = () => {
  isPaused.value = true
}

const resumeAutoplay = () => {
  isPaused.value = false
  resetAutoplayTimer()
}

const resetAutoplayTimer = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    if (!isPaused.value && services.value.length > 1) {
      autoplayInterval = setInterval(() => {
        if (!isPaused.value && !isTransitioning.value) {
          nextSlide()
        }
      }, 5000)
    }
  }
}

// Abrir dialog
const openDialog = (service) => {
  selectedService.value = service
  dialogOpen.value = true
}

// Utilidades
const truncateText = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Detectar móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Cargar servicios
const loadServices = async () => {
  await listarServiciospym('VIGENTE')
  if (dataServpym.value?.list && dataServpym.value.list.length > 0) {
    services.value = dataServpym.value.list
    if (currentIndex.value >= services.value.length) {
      currentIndex.value = 0
    }
  }
}

const showTooltip = ref(false)

watch(services, (newVal) => {
  if (newVal.length > 0) {
    startAutoplay()
  }
})

onMounted(async () => {
  await loadServices()
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(22, 179, 196, 0.3);
    border-color: rgba(22, 179, 196, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(22, 179, 196, 0.6), 0 0 60px rgba(22, 179, 196, 0.3);
    border-color: rgba(22, 179, 196, 0.8);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes neonPulse {
  0% {
    box-shadow: 0 0 0.3125rem rgba(22, 179, 196, 0.4), 0 0 0.625rem rgba(22, 179, 196, 0.2);
    border-color: rgba(22, 179, 196, 0.5);
  }
  100% {
    box-shadow: 0 0 1.25rem rgba(22, 179, 196, 0.8), 0 0 1.875rem rgba(34, 211, 230, 0.5), 0 0 2.5rem rgba(79, 209, 232, 0.3);
    border-color: #16b3c4;
  }
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-0.625rem);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.servicios-container {
  width: 100%;
}

/* Carousel Moderno */
.carousel-modern {
  position: relative;
  padding: 20px 0 60px;
}

.carousel-container {
  overflow: visible;
  position: relative;
}

.carousel-visible {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Cards laterales */
.carousel-card.card-side {
  flex: 0 0 280px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInLeft 0.5s ease-out;
}

.carousel-card.card-side-right {
  animation: slideInRight 0.5s ease-out;
}

.carousel-card.card-side:hover {
  transform: translateY(-5px);
}

.card-side .card-inner {
  opacity: 0.8;
  transition: all 0.3s ease;
}

.card-side:hover .card-inner {
  opacity: 1;
  transform: scale(1.02);
}

/* Card central */
.carousel-card.card-center {
  flex: 0 0 380px;
  z-index: 10;
  animation: fadeInUp 0.5s ease-out;
}

.card-inner,
.card-inner-center {
  position: relative;
  background: linear-gradient(135deg, rgba(10, 20, 30, 0.95), rgba(5, 10, 15, 0.98));
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(22, 179, 196, 0.3);
  transition: all 0.3s ease;
  height: 100%;
}

.card-inner-center {
  animation: pulse-glow 2s ease-in-out infinite;
  border-width: 2px;
}

.card-side .card-inner:hover {
  transform: translateY(-8px);
  border-color: rgba(22, 179, 196, 0.8);
  box-shadow: 0 0 30px rgba(22, 179, 196, 0.4);
}

/* Glow effects */
.card-glow,
.card-glow-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(22, 179, 196, 0.15), transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.card-glow-center {
  opacity: 1;
}

.card-side:hover .card-glow {
  opacity: 1;
}

/* Estilos para imágenes - Cards laterales */
.card-image-container {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-side:hover .card-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.8));
}

/* Estilos para imágenes - Card central */
.card-image-container-center {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image-center-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-inner-center:hover .card-image-center-img {
  transform: scale(1.1);
}

.image-overlay-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9));
}

/* Contenido cards laterales */
.card-content {
  padding: 16px;
  position: relative;
  z-index: 2;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  color: white;
}

.card-description {
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.4;
  margin-bottom: 12px;
}

.card-info {
  margin-bottom: 16px;
}

.info-item {
  text-align: center;
}

.info-label {
  display: block;
  font-size: 0.65rem;
  color: #16b3c4;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.info-value {
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
}

.card-button-side {
  width: 100%;
  padding: 6px 12px;
  background: linear-gradient(90deg, #16b3c4, #0d8b99);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-button-side:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(22, 179, 196, 0.4);
}

/* Contenido card central */
.card-content-center {
  padding: 24px;
  position: relative;
  z-index: 2;
}

.card-title-center {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #fff, #16b3c4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.card-description-center {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.card-info-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(22, 179, 196, 0.1);
  border-radius: 12px;
}

.info-item-center {
  text-align: center;
}

.info-label-center {
  display: block;
  font-size: 0.7rem;
  color: #16b3c4;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.info-value-center {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
}

.info-divider-center {
  width: 1px;
  height: 35px;
  background: linear-gradient(to bottom, transparent, rgba(22, 179, 196, 0.5), transparent);
}

.card-features {
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
}

.feature-check {
  width: 14px;
  height: 14px;
  color: #16b3c4;
  flex-shrink: 0;
}

.card-button-center {
  width: 100%;
  padding: 10px 20px;
  background: linear-gradient(90deg, #16b3c4, #0d8b99);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card-button-center::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.card-button-center:hover::before {
  left: 100%;
}

.card-button-center:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(22, 179, 196, 0.5);
}

/* Botones de navegación */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(22, 179, 196, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
}

.nav-button:hover {
  background: rgba(22, 179, 196, 0.8);
  border-color: rgba(22, 179, 196, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 20px rgba(22, 179, 196, 0.5);
}

.nav-prev {
  left: -24px;
}

.nav-next {
  right: -24px;
}

.nav-icon {
  width: 24px;
  height: 24px;
  color: white;
}

/* Indicadores */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator-dot:hover {
  background: rgba(22, 179, 196, 0.6);
  transform: scale(1.2);
}

.indicator-active {
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(90deg, #16b3c4, #22d3e6);
}

.indicator-label {
  display: none;
}

/* Botón flotante de impuestos */
.tax-button-container {
  position: fixed;
  bottom: 2.25rem;
  right: 1.25rem;
  z-index: 1000;
}

.tax-button {
  width: 3.5rem;
  height: 3.5rem;
  background: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.2);
  position: relative;
  border: 0.125rem solid rgba(22, 179, 196, 0.3);
}

.tax-button:hover {
  transform: scale(1.1);
  background: white;
  box-shadow: 0 0 0.625rem rgba(22, 179, 196, 0.6), 0 0 1.25rem rgba(34, 211, 230, 0.4), 0 0 1.875rem rgba(79, 209, 232, 0.2);
  border-color: #16b3c4;
  animation: neonPulse 0.8s ease-in-out infinite alternate;
}

.tax-icon {
  width: 2rem;
  height: 2rem;
  filter: drop-shadow(0 0 0.125rem rgba(22, 179, 196, 0.5));
  transition: all 0.3s ease;
}

.tax-button:hover .tax-icon {
  filter: drop-shadow(0 0 0.3125rem rgba(22, 179, 196, 0.8));
  transform: scale(1.05);
}

.tax-tooltip {
  position: absolute;
  right: 4.375rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(11, 31, 51, 0.95);
  backdrop-filter: blur(0.625rem);
  color: #16b3c4;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.3);
  border: 0.0625rem solid rgba(22, 179, 196, 0.5);
  pointer-events: none;
  z-index: 1001;
  animation: tooltipFadeIn 0.2s ease-out;
  letter-spacing: 0.03125rem;
}

.tax-tooltip::before {
  content: '';
  position: absolute;
  right: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 0.5rem solid rgba(22, 179, 196, 0.5);
  border-top: 0.375rem solid transparent;
  border-bottom: 0.375rem solid transparent;
}

.tax-tooltip::after {
  content: '';
  position: absolute;
  right: -0.375rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 0.5rem solid rgba(11, 31, 51, 0.95);
  border-top: 0.375rem solid transparent;
  border-bottom: 0.375rem solid transparent;
}

/* Responsive */
@media (max-width: 1024px) {
  .carousel-card.card-side {
    flex: 0 0 240px;
  }

  .carousel-card.card-center {
    flex: 0 0 340px;
  }

  .nav-prev {
    left: -12px;
  }

  .nav-next {
    right: -12px;
  }
}

@media (max-width: 768px) {
  .carousel-card.card-side {
    display: none;
  }

  .carousel-card.card-center {
    flex: 0 0 90%;
    margin: 0 auto;
  }

  .carousel-visible {
    gap: 0;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .nav-prev {
    left: -8px;
  }

  .nav-next {
    right: -8px;
  }

  .card-image-container-center {
    height: 180px;
  }

  .card-content-center {
    padding: 16px;
  }

  .card-title-center {
    font-size: 1.25rem;
  }

  .card-description-center {
    font-size: 0.8rem;
  }

  .info-value-center {
    font-size: 1rem;
  }

  .tax-button-container {
    bottom: 1.25rem;
    right: 1.25rem;
  }

  .tax-button {
    width: 3rem;
    height: 3rem;
  }

  .tax-icon {
    width: 1.75rem;
    height: 1.75rem;
  }

  .tax-tooltip {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
    white-space: nowrap;
  }

  .tax-tooltip::before,
  .tax-tooltip::after {
    display: none;
  }
}
</style>
