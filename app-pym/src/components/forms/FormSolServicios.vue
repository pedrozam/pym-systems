<template>
  <q-dialog
    v-model="opened"
    persistent
    position="right"
    full-height
    seamless
  >
    <q-card class="form-modal-card">
      <q-bar class="form-modal-header">
        <div class="text-h6 font-bold">Formulario de solicitud</div>
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

      <q-card-section class="form-modal-content">
        <p class="form-subtitle">Para completar tu solicitud favor llena los siguientes datos.</p>

        <q-form
          ref="formRef"
          class="solicitud-form"
          @submit.prevent="handleSubmit"
        >
          <div class="form-field">
            <label class="form-label required">Nombre</label>
            <q-input
              v-model="formData.nombre"
              outlined
              dense
              dark
              color="cyan"
              bg-color="rgba(11, 31, 51, 0.8)"
              class="form-input"
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>

          <div class="form-field">
            <label class="form-label required">Apellidos</label>
            <q-input
              v-model="formData.apellidos"
              outlined
              dense
              dark
              color="cyan"
              bg-color="rgba(11, 31, 51, 0.8)"
              class="form-input"
              :rules="[(val) => !!val || 'Los apellidos son requeridos']"
            />
          </div>

          <div class="form-field">
            <label class="form-label required">Teléfono</label>
            <q-input
              v-model="formData.telefono"
              outlined
              dense
              dark
              color="cyan"
              bg-color="rgba(11, 31, 51, 0.8)"
              class="form-input"
              type="tel"
              :rules="[(val) => !!val || 'El teléfono es requerido']"
            />
          </div>

          <div class="form-field">
            <label class="form-label">Correo (opcional)</label>
            <q-input
              v-model="formData.correo"
              outlined
              dense
              dark
              color="cyan"
              bg-color="rgba(11, 31, 51, 0.8)"
              class="form-input"
              type="email"
            />
          </div>

          <div class="form-field">
            <label class="form-label required">Descripción de la idea</label>
            <q-input
              v-model="formData.descripcion"
              outlined
              dense
              dark
              color="cyan"
              bg-color="rgba(11, 31, 51, 0.8)"
              class="form-input"
              type="textarea"
              rows="4"
              :rules="[(val) => !!val || 'La descripción es requerida']"
            />
          </div>

          <!-- Resumen de la selección (opcional) -->
          <div class="selection-summary">
            <div class="summary-title">Resumen de tu selección</div>
            <div class="summary-item">
              <span>Plan seleccionado:</span>
              <strong>{{ selectedPlan?.detalle_costo || 'Ninguno' }}</strong>
            </div>
            <div
              v-if="selectedExtras && selectedExtras.length > 0"
              class="summary-item"
            >
              <span>Extras:</span>
              <strong>{{ selectedExtras.map((e) => e.detalle_costo).join(', ') }}</strong>
            </div>
            <div class="summary-item total">
              <span>Total:</span>
              <strong>Bs. {{ formatPrice(totalAmount) }}</strong>
            </div>
          </div>

          <div class="form-actions">
            <q-btn
              label="Cancelar"
              flat
              class="cancel-btn"
              @click="close"
            />
            <q-btn
              label="Enviar solicitud"
              type="submit"
              class="submit-btn"
              :loading="submitting"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

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

const formData = ref({
  nombre: '',
  apellidos: '',
  telefono: '',
  correo: '',
  descripcion: '',
})

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
        correo: '',
        descripcion: '',
      }
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

  // Preparar datos para enviar
  const submissionData = {
    ...formData.value,
    serviceName: props.serviceName,
    selectedPlan: props.selectedPlan,
    selectedExtras: props.selectedExtras,
    totalAmount: props.totalAmount,
    timestamp: new Date().toISOString(),
  }

  // Emitir evento con los datos
  emit('submit', submissionData)

  submitting.value = false
  close()
}
</script>

<style scoped lang="scss">
.form-modal-card {
  border-radius: 1rem 0 0 1rem;
  border-left: 1px solid rgba(22, 179, 196, 0.3);
  background: rgba(11, 31, 51, 0.95);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
  height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.form-modal-header {
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  flex-shrink: 0;

  .text-h6 {
    color: #0b1f33;
  }
}

.form-modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.form-subtitle {
  font-size: 0.85rem;
  color: #c0e0e8;
  margin-bottom: 1.5rem;
  text-align: center;
}

.solicitud-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #c0e0e8;

  &.required::after {
    content: '*';
    color: #ff6b6b;
    margin-left: 4px;
  }
}

.form-input {
  :deep(.q-field__control) {
    border-radius: 0.5rem;
    background: rgba(11, 31, 51, 0.8);
  }

  :deep(.q-field__native) {
    color: #ffffff;
  }

  :deep(.q-field__label) {
    color: #8aa8b8;
  }
}

.selection-summary {
  background: rgba(22, 179, 196, 0.08);
  border: 1px solid rgba(22, 179, 196, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
}

.summary-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4fd1e8;
  margin-bottom: 0.5rem;
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #c0e0e8;
  padding: 0.25rem 0;

  span {
    color: #8aa8b8;
  }

  strong {
    color: #ffffff;
    font-weight: 600;
  }

  &.total {
    border-top: 1px solid rgba(22, 179, 196, 0.3);
    margin-top: 0.25rem;
    padding-top: 0.5rem;
    font-size: 0.85rem;

    strong {
      color: #4fd1e8;
    }
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  color: #c0e0e8;
  border-radius: 0.5rem;
  text-transform: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.submit-btn {
  flex: 1;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  border-radius: 0.5rem;
  font-weight: 700;
  text-transform: none;

  &:hover {
    box-shadow: 0 0 15px rgba(22, 179, 196, 0.5);
  }
}

@media (max-width: 600px) {
  .form-modal-card {
    max-width: 100%;
    border-radius: 1rem 1rem 0 0;
  }

  .form-modal-content {
    padding: 1rem;
  }
}
</style>
