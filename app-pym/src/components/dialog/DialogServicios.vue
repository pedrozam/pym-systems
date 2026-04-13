<template>
  <q-dialog
    v-model="opened"
    persistent
    full-width
    full-height
  >
    <q-card
      ref="dialogCard"
      class="rounded-2xl border border-[rgba(22,179,196,0.3)] bg-[rgba(11,31,51,0.9)] backdrop-blur-[10px] max-w-[90vw] max-h-[90vh] text-white flex flex-col"
    >
      <q-bar
        class="bg-gradient-to-r from-[#16b3c4] to-[#4fd1e8] border-b border-[rgba(22,179,196,0.5)] text-[#0b1f33] font-bold shrink-0"
      >
        <div class="text-h6 font-bold text-[#0b1f33]">{{ service.nombre_servicio }}</div>
        <q-space />
        <q-btn
          dense
          flat
          round
          icon="close"
          @click="close"
        >
          <q-tooltip>Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section
        ref="scrollContainer"
        class="p-8 overflow-y-auto flex-1"
      >
        <!-- New Header Section -->
        <div class="text-center text-white mb-6">
          <h2 class="text-3xl font-bold">Solicítala ahora</h2>
          <p class="text-base text-cyan-200">
            ¡Solicita y obtén tu Landing Page ahora e ingresa al mundo digital!
          </p>
        </div>

        <!-- Tarjetas de precios principales (solo id_servicio != 0) -->
        <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-8">
          <div
            v-for="(costo, index) in mainCostos"
            :key="costo.id_costo"
            class="rounded-xl border-2 border-[rgba(22,179,196,0.15)] bg-[rgba(11,31,51,0.6)] backdrop-blur-[10px] text-white transition-all duration-300 cursor-pointer overflow-hidden group transition hover:border-[rgba(22,179,196,0.4)] hover:-translate-y-0.5"
            :class="{
              'selected-card': selectedCostoId === costo.id_costo,
            }"
            @click="selectCosto(costo.id_costo)"
          >
            <!-- Color Header -->
            <div
              class="h-10 bg-[rgba(22,179,196,0.1)] transition-all duration-300"
              :class="{
                'plan-0-header': selectedCostoId === costo.id_costo && index === 0,
                'plan-1-header': selectedCostoId === costo.id_costo && index === 1,
                'plan-2-header': selectedCostoId === costo.id_costo && index === 2,
              }"
            ></div>

            <!-- Content -->
            <div class="flex flex-col gap-3 p-4">
              <!-- Plan Title -->
              <h2
                class="text-lg font-bold text-white uppercase tracking-wide leading-tight text-center m-0"
              >
                {{ costo.detalle_costo }}
              </h2>

              <!-- Price Banner -->
              <div class="text-center p-3 bg-[#1a1a1a] rounded-lg my-2">
                <span class="text-xl font-bold text-white">
                  Bs. {{ formatPrice(costo.monto_costo) }}
                </span>
              </div>

              <!-- SVG Icon Section -->
              <div
                class="flex justify-center items-center p-2 min-h-[60px] group-hover:scale-115 group-hover:-rotate-24 transition-transform"
              >
                <svg
                  v-if="costo.svg_costo"
                  class="size-28"
                  :class="{ 'opacity-50': !iconLoaded }"
                >
                  <use :href="`${spriteUrl}#${costo.svg_costo}`" />
                </svg>
                <div
                  v-else
                  class="w-12 h-12 flex items-center justify-center bg-[rgba(22,179,196,0.1)] rounded-full text-[#4fd1e8]"
                >
                  <q-icon name="image" />
                </div>
              </div>

              <!-- Delivery Time Section -->
              <div
                class="flex items-center justify-center gap-2 py-2 px-3 bg-[rgba(22,179,196,0.1)] rounded-full my-1 group-hover:scale-115 transition-transform"
              >
                <q-icon
                  name="schedule"
                  class="text-base text-[#4fd1e8]"
                />
                <span class="text-xs text-[#c0e0e8] uppercase tracking-wide"
                  >Tiempo de entrega:</span
                >
                <span class="text-sm font-semibold text-white">{{ costo.tiempo_entrega }}</span>
              </div>

              <!-- Advantages List -->
              <div
                class="flex flex-col gap-2 py-3 px-1 pb-8 bg-transparent rounded-none border-none overflow-y-auto"
              >
                <div
                  v-for="ventaja in costo.ventajas"
                  :key="ventaja.id_ventaja_srv"
                  class="flex items-start gap-2 text-sm leading-tight text-[#c0e0e8] hover:text-blue-300 hover:font-bold transition"
                >
                  <q-icon
                    name="check"
                    class="text-[#16b3c4] shrink-0 mt-0.5 text-base"
                    :class="{ 'opacity-30': !ventaja.incluido }"
                  />
                  <span>{{ ventaja.ventaja }}</span>
                </div>
              </div>

              <!-- Select Package Button -->
              <q-btn
                :class="
                  selectedCostoId === costo.id_costo
                    ? 'select-button'
                    : 'bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 border-white no-uppercase'
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
          ref="extraSection"
          v-if="selectedCostoId"
          class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-4 group transition"
        >
          <!-- Columna Izquierda: Servicios Extras -->
          <div
            class="bg-[rgba(22,179,196,0.05)] border border-[rgba(22,179,196,0.2)] rounded-xl p-4 group transition"
          >
            <h3 class="text-xl font-bold text-[#4fd1e8] text-left mb-4 tracking-wide">
              Servicios extras:
            </h3>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
              <div
                v-for="extra in serviciosExtras"
                :key="extra.id_costo"
                class="bg-[rgba(11,31,51,0.8)] border border-[rgba(22,179,196,0.3)] rounded-lg p-3 cursor-pointer transition-all duration-200 hover:border-[rgba(22,179,196,0.7)] hover:-translate-y-0.5"
                :class="{ 'extra-selected-card': selectedExtrasIds.includes(extra.id_costo) }"
                @click="toggleExtra(extra)"
              >
                <div class="flex items-center gap-2 mb-2">
                  <q-icon
                    :name="
                      selectedExtrasIds.includes(extra.id_costo)
                        ? 'check_circle'
                        : 'add_circle_outline'
                    "
                    class="text-xl text-[#4fd1e8]"
                  />
                  <h4 class="text-sm font-semibold m-0 text-white flex-1">
                    {{ extra.detalle_costo }}
                  </h4>
                </div>
                <div class="text-base font-bold text-[#4fd1e8] mb-1">
                  Bs. {{ formatPrice(extra.monto_costo) }}
                </div>
                <div class="flex items-center gap-1 text-xs text-[#c0e0e8] mb-2">
                  <q-icon
                    name="schedule"
                    size="14px"
                  />
                  <span>Pago {{ extra.tiempo_entrega }}</span>
                </div>
                <div
                  v-if="extra.svg_costo"
                  class="flex justify-end"
                >
                  <svg class="relative -rotate-6 size-14 transition">
                    <use :href="`${spriteUrl}#${extra.svg_costo}`" />
                  </svg>
                </div>
              </div>
              <div
                v-if="selectedExtras.length === 0"
                class="text-center text-[#c0e0e8] p-4 italic w-full"
              >
                Si no seleccionas ninguno puedes hacerlo despues...
              </div>
            </div>
            <div
              v-if="serviciosExtras.length === 0"
              class="text-center text-[#c0e0e8] p-4 italic"
            >
              No hay servicios extras disponibles
            </div>
          </div>

          <!-- Columna Derecha: Resumen de contratación -->
          <div
            class="bg-[rgba(22,179,196,0.05)] border border-[rgba(22,179,196,0.2)] rounded-xl p-4 flex flex-col gap-4 h-fit"
          >
            <h3
              class="text-lg font-bold text-white text-center border-b border-[rgba(22,179,196,0.3)] pb-2 mb-0"
            >
              Resumen de tu selección
            </h3>

            <!-- Servicio principal seleccionado -->
            <div
              v-if="selectedCostoInfo"
              class="pb-2 border-b border-[rgba(22,179,196,0.2)]"
            >
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#c0e0e8]">{{ selectedCostoInfo.detalle_costo }}</span>
                <span class="text-[#4fd1e8] font-semibold"
                  >Bs. {{ formatPrice(selectedCostoInfo.monto_costo) }}</span
                >
              </div>
              <div class="flex items-center gap-1 text-xs text-[#8aa8b8] mt-1">
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
              class="space-y-1"
            >
              <div class="text-xs font-semibold text-[#4fd1e8] mb-1">Servicios extras:</div>
              <div
                v-for="extra in selectedExtras"
                :key="extra.id_costo"
                class="pl-2 pb-1 border-b border-dashed border-[rgba(22,179,196,0.2)]"
              >
                <div class="flex justify-between items-center text-sm">
                  <span class="text-[#c0e0e8]">{{ extra.detalle_costo }}</span>
                  <span class="text-[#4fd1e8] font-semibold"
                    >Bs. {{ formatPrice(extra.monto_costo) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Total / Subtotal -->
            <div
              class="flex justify-between items-center pt-3 mt-2 border-t-2 border-[rgba(22,179,196,0.4)] font-bold"
            >
              <span class="text-base text-white">Total:</span>
              <span class="text-xl text-[#4fd1e8]">Bs. {{ formatPrice(totalAmount) }}</span>
            </div>

            <!-- Botón Enviar solicitud -->
            <q-btn
              class="cta-button"
              icon="send"
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
import { ref, watch, computed, nextTick } from 'vue'
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
const selectedExtrasIds = ref([])
const formModalOpened = ref(false)
const scrollContainer = ref(null)
const extraSection = ref(null)

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

// Función para scroll suave
const smoothScrollToBottom = async () => {
  await nextTick()
  if (scrollContainer.value && scrollContainer.value.$el) {
    const container = scrollContainer.value.$el
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    })
  } else if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  }
}

const scrollToTop = async () => {
  await nextTick()
  if (scrollContainer.value && scrollContainer.value.$el) {
    const container = scrollContainer.value.$el
    container.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } else if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

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
  // Si se hace clic en la misma tarjeta que ya está seleccionada
  if (selectedCostoId.value === costoId) {
    // Deseleccionar
    selectedCostoId.value = null
    selectedExtrasIds.value = []
    // Scroll hacia arriba
    scrollToTop()
  } else {
    // Seleccionar nueva tarjeta
    selectedCostoId.value = costoId
    // Resetear extras al cambiar el plan principal
    selectedExtrasIds.value = []
    // Scroll hacia abajo después de seleccionar
    smoothScrollToBottom()
  }
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

<style scoped>
/* Solo estilos que no son fácilmente reemplazables por Tailwind */

.selected-card {
  border-color: rgba(22, 179, 196, 0.8);
  box-shadow:
    0 0 30px rgba(22, 179, 196, 0.5),
    inset 0 0 20px rgba(22, 179, 196, 0.1);
  transform: translateY(-4px);
}

.plan-0-header {
  background: linear-gradient(to right, #1b7f4d, #22a85e);
}

.plan-1-header {
  background: linear-gradient(to right, #0052a3, #0066cc);
}

.plan-2-header {
  background: linear-gradient(to right, #001a3d, #003366);
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
}

.select-button:hover {
  box-shadow: 0 0 25px rgba(22, 179, 196, 0.4);
}

.select-button :deep(.q-btn__content) {
  color: #0b1f33;
}

.extra-selected-card {
  border-color: #16b3c4;
  background: rgba(22, 179, 196, 0.15);
  box-shadow: 0 0 15px rgba(22, 179, 196, 0.3);
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
}

.cta-button:hover {
  box-shadow: 0 0 25px rgba(22, 179, 196, 0.7);
  transform: translateY(-2px);
}

.cta-button :deep(.q-btn__content) {
  color: #0b1f33;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  :deep(.two-columns-section) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  :deep(.pricing-container) {
    max-width: 100%;
    max-height: 100vh;
  }
}
</style>
