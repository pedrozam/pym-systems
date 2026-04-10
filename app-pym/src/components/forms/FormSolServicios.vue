<template>
  <q-dialog
    v-model="opened"
    persistent
    position="right"
    full-height
  >
    <q-card
      class="w-full max-w-[450px] h-screen bg-[rgba(11,31,51,0.95)] text-white border-l border-[rgba(22,179,196,0.3)] flex flex-col"
    >
      <!-- Header -->
      <q-bar class="bg-black text-white">
        <div class="text-h6 font-bold">Formulario de solicitud</div>
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

      <!-- Content -->
      <q-card-section class="p-6 overflow-y-auto flex-1">
        <p class="text-sm text-[#c0e0e8] mb-6 text-center">
          Para completar tu solicitud favor llena los siguientes datos.
        </p>

        <q-form
          ref="formRef"
          class="flex flex-col gap-4"
          @submit.prevent="handleSubmit"
        >
          <!-- Nombre con InputText tipo nombres -->
          <InputText
            v-model:valor="formData.nombre"
            tipo="nombres"
            etiqueta="Nombres"
            :validacion="[(val) => !!val || 'Los nombres son requeridos']"
            :required="true"
          />

          <!-- Apellidos con InputText tipo nombres -->
          <InputText
            v-model:valor="formData.apellidos"
            tipo="nombres"
            etiqueta="Apellidos"
            :validacion="[(val) => !!val || 'Los apellidos son requeridos']"
            :required="true"
          />

          <!-- Teléfono con InputText tipo telefono -->
          <InputText
            v-model:valor="formData.telefono"
            tipo="telefono"
            etiqueta="Teléfono (opcional)"
            hint="Ejemplo: 71-234567"
          />

          <!-- Celular con InputText tipo celular -->
          <InputText
            v-model:valor="formData.celular"
            tipo="celular"
            etiqueta="Celular"
            hint="Ejemplo: +591 71234567"
            :validacion="[(val) => !!val || 'El celular es requerido']"
            :required="true"
          />

          <!-- Correo (opcional) con InputText tipo email -->
          <InputText
            v-model:valor="formData.correo"
            tipo="email"
            etiqueta="Correo electrónico (opcional)"
            hint="ejemplo@correo.com"
          />

          <!-- Descripción con InputText tipo textarea -->
          <InputText
            v-model:valor="formData.descripcion"
            tipo="textarea"
            etiqueta="Descripción de la idea"
            :rows="4"
            :validacion="[(val) => !!val || 'La descripción es requerida']"
            :required="true"
          />

          <!-- Resumen de selección - Estilo mejorado -->
          <div
            class="bg-[rgba(22,179,196,0.05)] border border-[rgba(22,179,196,0.2)] rounded-xl p-4 mt-2"
          >
            <h3
              class="text-lg font-bold text-white text-center border-b border-[rgba(22,179,196,0.3)] pb-2 mb-3"
            >
              Detalle de la solicitud
            </h3>
            {{ formData }}
            <!-- Servicio principal seleccionado -->
            <div class="pb-2 border-b border-[rgba(22,179,196,0.2)]">
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#c0e0e8]">Plan seleccionado:</span>
                <span class="text-[#4fd1e8] font-semibold">
                  {{ selectedPlan?.detalle_costo || 'Ninguno' }}
                </span>
              </div>
              <div class="flex items-center gap-1 text-xs text-[#8aa8b8] mt-1">
                <q-icon
                  name="schedule"
                  size="12px"
                />
                <span>{{ selectedPlan?.tiempo_entrega || 'No especificado' }}</span>
              </div>
            </div>

            <!-- Servicios extras seleccionados -->
            <div
              v-if="selectedExtras && selectedExtras.length > 0"
              class="space-y-1 mt-2"
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
                <div class="flex items-center gap-1 text-xs text-[#8aa8b8] mt-0.5">
                  <q-icon
                    name="schedule"
                    size="10px"
                  />
                  <span>Pago {{ extra.tiempo_entrega }}</span>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div
              class="flex justify-between items-center pt-3 mt-2 border-t-2 border-[rgba(22,179,196,0.4)] font-bold"
            >
              <span class="text-base text-white">Total:</span>
              <span class="text-xl text-[#4fd1e8]">Bs. {{ formatPrice(totalAmount) }}</span>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-4 mt-4">
            <q-btn
              label="Cancelar"
              flat
              class="flex-1 bg-white/10 text-[#c0e0e8] rounded-lg capitalize hover:bg-white/20"
              @click="close"
            />
            <q-btn
              label="Enviar solicitud"
              type="submit"
              class="flex-1 bg-gradient-to-r from-[#16b3c4] to-[#4fd1e8] text-[#0b1f33] rounded-lg font-bold capitalize hover:shadow-[0_0_15px_rgba(22,179,196,0.5)]"
              :loading="submitting"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import InputText from '../inputs/InputText.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  serviceName: {
    type: String,
    default: '',
  },
  selectedPlan: {
    type: Object,
    default: null,
  },
  selectedExtras: {
    type: Array,
    default: () => [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const opened = ref(props.modelValue)
const submitting = ref(false)
const formRef = ref(null)

// Computed para verificar si hay extras
const hasExtras = computed(() => {
  return props.selectedExtras && props.selectedExtras.length > 0
})

// Construir el array de servicios con los id_costo
const serviciosArray = computed(() => {
  const servicios = []

  // Agregar el plan seleccionado
  if (props.selectedPlan && props.selectedPlan.id_costo) {
    servicios.push(props.selectedPlan.id_costo)
  }

  // Agregar los IDs de los extras seleccionados
  if (props.selectedExtras && props.selectedExtras.length > 0) {
    props.selectedExtras.forEach((extra) => {
      if (extra.id_costo) {
        servicios.push(extra.id_costo)
      }
    })
  }

  return servicios
})

const formData = ref({
  // Datos personales
  nombre: '',
  apellidos: '',
  telefono: '',
  celular: '',
  correo: '',
  descripcion: '',
  // Datos de servicios
  servicios: [],
  // Indicador de extras
  tiene_extras: false,
  // Estado de la solicitud
  estado: 'INICIAL',
  // Tipo de transacción
  transaccion: 'SOLICITAR',
})

// Actualizar formData cuando cambien las props
watch(
  () => [props.selectedPlan, props.selectedExtras],
  () => {
    formData.value.servicios = serviciosArray.value
    formData.value.tiene_extras = hasExtras.value
  },
  { immediate: true, deep: true },
)

watch(
  () => props.modelValue,
  (val) => {
    opened.value = val
    if (!val) {
      // Resetear formulario al cerrar
      formData.value = {
        nombre: '',
        apellidos: '',
        telefono: '',
        celular: '',
        correo: '',
        descripcion: '',
        servicios: serviciosArray.value,
        tiene_extras: hasExtras.value,
        estado: 'INICIAL',
        transaccion: 'SOLICITAR',
      }
    } else {
      // Al abrir, actualizar servicios y tiene_extras
      formData.value.servicios = serviciosArray.value
      formData.value.tiene_extras = hasExtras.value
    }
  },
)

watch(opened, (val) => {
  emit('update:modelValue', val)
})

const close = () => {
  opened.value = false
}

const formatPrice = (price) => {
  if (price === undefined || price === null) return '0.00'
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(numericPrice)) return '0.00'
  return numericPrice.toLocaleString('es-BO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const handleSubmit = async () => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  submitting.value = true

  // Actualizar servicios y tiene_extras antes de enviar
  formData.value.servicios = serviciosArray.value
  formData.value.tiene_extras = hasExtras.value

  const submissionData = {
    ...formData.value,
    serviceName: props.serviceName,
    selectedPlan: props.selectedPlan,
    selectedExtras: props.selectedExtras,
    totalAmount: props.totalAmount,
    timestamp: new Date().toISOString(),
  }

  console.log('Datos enviados:', submissionData)
  emit('submit', submissionData)

  submitting.value = false
  close()
}
</script>
