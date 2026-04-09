<template>
  <q-dialog
    v-model="opened"
    persistent
    full-width
    full-height
  >
    <q-card class="pricing-container">
      <q-bar class="pricing-header">
        <div class="text-h6 font-bold">{{ service.nombre_servicio }}</div>
        <q-space />
        <q-btn
          dense
          flat
          round
          icon="close"
          @click="close"
        >
          <q-tooltip> Cerrar </q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="pricing-content">
        <!-- New Header Section -->
        <div class="text-center text-white mb-6">
          <h2 class="text-3xl font-bold">Solicítala ahora</h2>
          <p class="text-base text-cyan-200">
            ¡Solicita y obtén tu Landing Page ahora e ingresa al mundo digital!
          </p>
        </div>

        <!-- Tarjetas de precios principales (solo id_servicio != 0) -->
        <div class="plans-grid">
          <div
            v-for="(costo, index) in mainCostos"
            :key="costo.id_costo"
            class="pricing-card hover:scale-105 transition group"
            :class="{
              selected: selectedCostoId === costo.id_costo,
              'plan-0': index === 0,
              'plan-1': index === 1,
              'plan-2': index === 2,
            }"
            @click="selectCosto(costo.id_costo)"
          >
            <!-- Color Header -->
            <div class="card-color-header"></div>

            <!-- Content -->
            <div class="pricing-plan">
              <!-- Plan Title -->
              <h2 class="plan-title">{{ costo.detalle_costo }}</h2>

              <!-- Price Banner -->
              <div class="plan-price">
                <span class="amount"> Bs. {{ formatPrice(costo.monto_costo) }} </span>
              </div>

              <!-- SVG Icon Section -->
              <div class="svg-icon-container">
                <svg
                  v-if="costo.svg_costo"
                  class="size-28 group-hover:-rotate-12 group-hover:scale-125 transition"
                  :class="{ 'icon-loading': !iconLoaded }"
                >
                  <use :href="`${spriteUrl}#${costo.svg_costo}`" />
                </svg>
                <div
                  v-else
                  class="no-icon"
                >
                  <q-icon name="image" />
                </div>
              </div>

              <!-- Delivery Time Section -->
              <div class="delivery-time group-hover:scale-125 transition">
                <q-icon
                  name="schedule"
                  class="delivery-icon"
                />
                <span class="delivery-label">Tiempo de entrega:</span>
                <span class="delivery-value">{{ costo.tiempo_entrega }}</span>
              </div>

              <!-- Advantages List -->
              <div class="plan-advantages">
                <div
                  v-for="ventaja in costo.ventajas"
                  :key="ventaja.id_ventaja_srv"
                  class="advantage-item hover:text-blue-300 hover:text-bold-700 hover:p-0 transition"
                >
                  <q-icon
                    name="check"
                    class="advantage-icon"
                    :class="{ 'icon-disabled': !ventaja.incluido }"
                  />
                  <span>{{ ventaja.ventaja }}</span>
                </div>
              </div>

              <!-- Select Package Button -->
              <q-btn
                :class="
                  selectedCostoId === costo.id_costo
                    ? 'select-button'
                    : 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 border-white text-transform-none'
                "
                :icon="selectedCostoId === costo.id_costo ? 'check_circle' : 'add_shopping_cart'"
                :label="selectedCostoId === costo.id_costo ? 'Seleccionado' : 'Solicitar'"
                flat
              />
            </div>
          </div>
        </div>

        <!-- Sección de dos columnas: Servicios Extras (izquierda) y Resumen (derecha) -->
        <div
          v-if="selectedCostoId"
          class="two-columns-section"
        >
          <!-- Columna Izquierda: Servicios Extras -->
          <div class="extras-section">
            <h3 class="extras-title">Servicios extras</h3>
            <div class="extras-grid">
              <div
                v-for="extra in serviciosExtras"
                :key="extra.id_costo"
                class="extra-card hover:scale-105 transition group"
                :class="{ 'extra-selected': selectedExtrasIds.includes(extra.id_costo) }"
                @click="toggleExtra(extra)"
              >
                <div class="extra-card-header">
                  <q-icon
                    :name="
                      selectedExtrasIds.includes(extra.id_costo)
                        ? 'check_circle'
                        : 'add_circle_outline'
                    "
                    class="extra-select-icon"
                  />
                  <h4 class="extra-title">{{ extra.detalle_costo }}</h4>
                </div>
                <div class="extra-price">Bs. {{ formatPrice(extra.monto_costo) }}</div>
                <div class="extra-delivery">
                  <q-icon
                    name="schedule"
                    size="14px"
                  />
                  <span>Pago {{ extra.tiempo_entrega }}</span>
                </div>
                <div v-if="extra.svg_costo">
                  <svg
                    class="relative -rotate-6 size-14 group-hover:-rotate-12 group-hover:scale-125 transition"
                  >
                    <use :href="`${spriteUrl}#${extra.svg_costo}`" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              v-if="serviciosExtras.length === 0"
              class="no-extras"
            >
              No hay servicios extras disponibles
            </div>
          </div>

          <!-- Columna Derecha: Resumen de contratación -->
          <div class="contratar-section">
            <h3 class="resumen-title">Resumen de tu selección</h3>

            <!-- Servicio principal seleccionado -->
            <div
              v-if="selectedCostoInfo"
              class="resumen-item principal-item"
            >
              <div class="resumen-item-header">
                <span class="resumen-item-name">{{ selectedCostoInfo.detalle_costo }}</span>
                <span class="resumen-item-price"
                  >Bs. {{ formatPrice(selectedCostoInfo.monto_costo) }}</span
                >
              </div>
              <div class="resumen-item-detail">
                <q-icon
                  name="schedule"
                  size="12px"
                />
                <span>{{ selectedCostoInfo.tiempo_entrega }}</span>
              </div>
            </div>

            <!-- Servicios extras seleccionados -->
            <div
              v-if="selectedExtras.length > 0"
              class="extras-resumen"
            >
              <div class="resumen-subtitle">Servicios extras:</div>
              <div
                v-for="extra in selectedExtras"
                :key="extra.id_costo"
                class="resumen-item extra-item"
              >
                <div class="resumen-item-header">
                  <span class="resumen-item-name">{{ extra.detalle_costo }}</span>
                  <span class="resumen-item-price">Bs. {{ formatPrice(extra.monto_costo) }}</span>
                </div>
              </div>
            </div>

            <!-- Total / Subtotal -->
            <div class="resumen-total">
              <span class="total-label">Total:</span>
              <span class="total-amount">Bs. {{ formatPrice(totalAmount) }}</span>
            </div>

            <!-- Botón Enviar solicitud -->
            <q-btn
              class="cta-button"
              label="Enviar solicitud"
              flat
              @click="openFormModal"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal del formulario -->
    <FormSolServicios
      v-model="formModalOpened"
      :service-name="service.nombre_servicio"
      :selected-plan="selectedCostoInfo"
      :selected-extras="selectedExtras"
      :total-amount="totalAmount"
      @submit="handleFormSubmit"
    />
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import FormSolServicios from '../forms/FormSolServicios.vue'

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  spriteUrl: {
    type: String,
    required: false,
    default: '/icons/sprite.svg',
  },
})

const emit = defineEmits(['update:modelValue'])

const opened = ref(props.modelValue)
const selectedCostoId = ref(null)
const iconLoaded = ref(true)
const selectedExtrasIds = ref([]) // IDs de servicios extras seleccionados
const formModalOpened = ref(false)

// Costos principales: donde id_servicio es diferente de 0
const mainCostos = computed(() => {
  return props.service.costos?.filter((costo) => costo.id_servicio !== 0) || []
})

// Servicios extras: donde id_servicio es igual a 0 y ver_adicionales es true
const serviciosExtras = computed(() => {
  return props.service.costos?.filter((costo) => costo.id_servicio === 0) || []
})

// Información del costo seleccionado (principal)
const selectedCostoInfo = computed(() => {
  if (!selectedCostoId.value) return null
  return mainCostos.value.find((c) => c.id_costo === selectedCostoId.value)
})

// Servicios extras seleccionados (objetos completos)
const selectedExtras = computed(() => {
  return serviciosExtras.value.filter((extra) => selectedExtrasIds.value.includes(extra.id_costo))
})

// Cálculo del total (principal + extras)
const totalAmount = computed(() => {
  let total = 0
  if (selectedCostoInfo.value) {
    total += parseFloat(selectedCostoInfo.value.monto_costo) || 0
  }
  selectedExtras.value.forEach((extra) => {
    total += parseFloat(extra.monto_costo) || 0
  })
  return total
})

watch(
  () => props.modelValue,
  (val) => {
    opened.value = val
    // Resetear selecciones al abrir
    if (val) {
      selectedCostoId.value = null
      selectedExtrasIds.value = []
    }
  },
)

watch(opened, (val) => {
  emit('update:modelValue', val)
})

const close = () => {
  opened.value = false
}

const selectCosto = (costoId) => {
  selectedCostoId.value = costoId
  // Resetear extras al cambiar el plan principal
  selectedExtrasIds.value = []
}

// Toggle selección de servicio extra
const toggleExtra = (extra) => {
  const index = selectedExtrasIds.value.indexOf(extra.id_costo)
  if (index === -1) {
    selectedExtrasIds.value.push(extra.id_costo)
  } else {
    selectedExtrasIds.value.splice(index, 1)
  }
}

// Abrir modal del formulario
const openFormModal = () => {
  if (!selectedCostoInfo.value) return
  formModalOpened.value = true
}

// Manejar envío del formulario
const handleFormSubmit = (formData) => {
  console.log('Formulario enviado:', formData)
  // Aquí puedes procesar el envío (API, etc.)
  formModalOpened.value = false
  close() // Opcional: cerrar el diálogo principal después del envío
}

// Format price with 2 decimals and thousand separators
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0.00'
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(numericPrice)) return '0.00'
  return numericPrice.toLocaleString('es-BO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<style scoped lang="scss">
.pricing-container {
  border-radius: 1rem;
  border: 1px solid rgba(22, 179, 196, 0.3);
  background: rgba(11, 31, 51, 0.9);
  backdrop-filter: blur(10px);
  max-width: 90vw;
  max-height: 90vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.pricing-header {
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  border-bottom: 2px solid rgba(22, 179, 196, 0.5);
  color: #0b1f33;
  font-weight: bold;
  flex-shrink: 0;

  .text-h6 {
    color: #0b1f33;
  }
}

.pricing-content {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.pricing-card {
  border-radius: 0.75rem;
  border: 2px solid rgba(22, 179, 196, 0.15);
  background: rgba(11, 31, 51, 0.6);
  backdrop-filter: blur(10px);
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: rgba(22, 179, 196, 0.4);
    transform: translateY(-2px);
  }

  &.selected {
    border-color: rgba(22, 179, 196, 0.8);
    box-shadow:
      0 0 30px rgba(22, 179, 196, 0.5),
      inset 0 0 20px rgba(22, 179, 196, 0.1);
    transform: translateY(-4px);
  }

  &.plan-0.selected .card-color-header {
    background: linear-gradient(to right, #1b7f4d, #22a85e);
  }

  &.plan-1.selected .card-color-header {
    background: linear-gradient(to right, #0052a3, #0066cc);
  }

  &.plan-2.selected .card-color-header {
    background: linear-gradient(to right, #001a3d, #003366);
  }
}

.card-color-header {
  height: 40px;
  background: rgba(22, 179, 196, 0.1);
  transition: all 0.3s ease;
}

.pricing-plan {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
}

.plan-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-align: center;
}

.plan-price {
  text-align: center;
  padding: 0.75rem;
  background: #1a1a1a;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
}

.amount {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
}

.svg-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  min-height: 60px;
}

.no-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(22, 179, 196, 0.1);
  border-radius: 50%;
  color: #4fd1e8;
}

.delivery-time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(22, 179, 196, 0.1);
  border-radius: 2rem;
  margin: 0.25rem 0;
}

.delivery-icon {
  font-size: 1rem;
  color: #4fd1e8;
}

.delivery-label {
  font-size: 0.75rem;
  color: #c0e0e8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.delivery-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
}

.plan-advantages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 0.2rem 2rem 0.8rem;
  background: transparent;
  border-radius: 0;
  border: none;
  overflow-y: auto;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2;
  color: #c0e0e8;
}

.advantage-icon {
  color: #16b3c4;
  flex-shrink: 0;
  margin-top: 0.1rem;
  font-size: 1rem;
}

.select-button {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  border-radius: 0.4rem;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  box-shadow: 0 0 15px rgba(22, 179, 196, 0.2);

  &:hover {
    box-shadow: 0 0 25px rgba(22, 179, 196, 0.4);
  }

  &:deep(.q-btn__content) {
    color: #0b1f33;
  }
}

/* Sección de dos columnas */
.two-columns-section {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
  margin-top: 1rem;
}

/* Estilos para Servicios Extras */
.extras-section {
  background: rgba(22, 179, 196, 0.05);
  border: 1px solid rgba(22, 179, 196, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
}

.extras-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4fd1e8;
  margin: 0 0 1rem 0;
  text-align: center;
  letter-spacing: 0.03em;
}

.extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
}

.extra-card {
  background: rgba(11, 31, 51, 0.8);
  border: 1px solid rgba(22, 179, 196, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(22, 179, 196, 0.7);
    transform: translateY(-2px);
  }

  &.extra-selected {
    border-color: #16b3c4;
    background: rgba(22, 179, 196, 0.15);
    box-shadow: 0 0 15px rgba(22, 179, 196, 0.3);
  }
}

.extra-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.extra-select-icon {
  font-size: 1.2rem;
  color: #4fd1e8;
}

.extra-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
  flex: 1;
}

.extra-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: #4fd1e8;
  margin-bottom: 0.25rem;
}

.extra-delivery {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #c0e0e8;
  margin-bottom: 0.5rem;
}

.extra-svg {
  display: flex;
  justify-content: flex-end;
}

.extra-svg-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: #4fd1e8;
}

.no-extras {
  text-align: center;
  color: #c0e0e8;
  padding: 1rem;
  font-style: italic;
}

/* Estilos para el resumen de contratación */
.contratar-section {
  background: rgba(22, 179, 196, 0.05);
  border: 1px solid rgba(22, 179, 196, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
}

.resumen-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  text-align: center;
  border-bottom: 1px solid rgba(22, 179, 196, 0.3);
  padding-bottom: 0.5rem;
}

.resumen-subtitle {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4fd1e8;
  margin: 0.5rem 0 0.25rem 0;
}

.resumen-item {
  padding: 0.5rem 0;
  border-bottom: 1px dashed rgba(22, 179, 196, 0.2);
}

.principal-item {
  border-bottom: 1px solid rgba(22, 179, 196, 0.4);
}

.extra-item {
  padding-left: 0.5rem;
}

.resumen-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.resumen-item-name {
  color: #c0e0e8;
}

.resumen-item-price {
  color: #4fd1e8;
  font-weight: 600;
}

.resumen-item-detail {
  font-size: 0.7rem;
  color: #8aa8b8;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.resumen-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 2px solid rgba(22, 179, 196, 0.4);
  font-weight: 700;
}

.total-label {
  font-size: 1rem;
  color: #ffffff;
}

.total-amount {
  font-size: 1.2rem;
  color: #4fd1e8;
}

.cta-button {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  border-radius: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(22, 179, 196, 0.4);
  font-size: 0.85rem;
  width: 100%;

  &:hover {
    box-shadow: 0 0 25px rgba(22, 179, 196, 0.7);
    transform: translateY(-2px);
  }

  &:deep(.q-btn__content) {
    color: #0b1f33;
  }
}

@media (max-width: 768px) {
  .two-columns-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .extras-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .pricing-content {
    padding: 1.5rem;
  }
}

@media (max-width: 640px) {
  .pricing-container {
    max-width: 100%;
    max-height: 100vh;
  }

  .pricing-content {
    padding: 1rem;
  }

  .plans-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.75rem;
  }

  .extras-grid {
    grid-template-columns: 1fr;
  }
}
</style>
