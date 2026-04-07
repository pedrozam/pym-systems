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
        <div class="plans-grid">
          <div
            v-for="(costo, index) in service.costos"
            :key="costo.id_costo"
            class="pricing-card"
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
                <span class="amount">Bs. {{ costo.monto_costo }}</span>
              </div>

              <!-- Advantages List -->
              <div class="plan-advantages">
                <div
                  v-for="ventaja in costo.ventajas"
                  :key="ventaja.id_ventaja_srv"
                  class="advantage-item"
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
                class="select-button"
                :label="selectedCostoId === costo.id_costo ? 'SELECCIONADO' : 'SELECCIONAR'"
                flat
              />
            </div>
          </div>
        </div>

        <!-- Contratar Button (shown only when selected) -->
        <div
          v-if="selectedCostoId"
          class="contratar-section"
        >
          <!-- Account Info -->
          <div
            v-if="selectedCostoInfo?.nombre_cuenta"
            class="account-info"
          >
            <p class="info-label">Datos de depósito:</p>
            <p class="info-value">{{ selectedCostoInfo.nombre_cuenta }}</p>
            <p class="info-detail">
              {{ selectedCostoInfo.sigla_cuenta }} - {{ selectedCostoInfo.numero_cuenta }}
            </p>
          </div>

          <!-- CTA Button -->
          <q-btn
            class="cta-button"
            label="CONTRATAR AHORA"
            :to="service.ruta1 || '/contratar'"
            flat
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

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
  },
})

const emit = defineEmits(['update:modelValue'])

const opened = ref(props.modelValue)
const selectedCostoId = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    opened.value = val
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
}

const selectedCostoInfo = ref(null)

watch(selectedCostoId, (newId) => {
  if (newId) {
    selectedCostoInfo.value = props.service.costos.find((c) => c.id_costo === newId)
  } else {
    selectedCostoInfo.value = null
  }
})
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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

  /* Color headers por plan */
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

.plan-header {
  text-align: center;
  position: relative;
}

.plan-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.3;
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

.plan-advantages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  background: transparent;
  border-radius: 0;
  border: none;
  max-height: 150px;
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

  &.icon-disabled {
    color: #d32f2f;
    opacity: 0.7;
  }
}

.select-button {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  border-radius: 0.4rem;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
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

.contratar-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(22, 179, 196, 0.05);
  border: 1px solid rgba(22, 179, 196, 0.2);
  border-radius: 0.75rem;
}

.cta-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #16b3c4, #4fd1e8);
  color: #0b1f33;
  border-radius: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(22, 179, 196, 0.4);
  font-size: 1rem;

  &:hover {
    box-shadow: 0 0 35px rgba(22, 179, 196, 0.7);
    transform: translateY(-2px);
  }

  &:deep(.q-btn__content) {
    color: #0b1f33;
  }
}

.account-info {
  padding: 1rem;
  background: rgba(22, 179, 196, 0.08);
  border-radius: 0.5rem;
  border-left: 3px solid #16b3c4;
  text-align: center;
}

.info-label {
  font-size: 0.8rem;
  color: #4fd1e8;
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  opacity: 0.8;
}

.info-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.info-detail {
  font-size: 0.8rem;
  color: #4fd1e8;
  margin: 0.25rem 0 0 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .pricing-content {
    padding: 1.5rem;
  }

  .plan-title {
    font-size: 1rem;
  }

  .amount {
    font-size: 1.1rem;
  }

  .plan-advantages {
    max-height: 120px;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .pricing-card {
    border-radius: 0.5rem;
  }

  .pricing-plan {
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .card-color-header {
    height: 30px;
  }

  .plan-title {
    font-size: 0.9rem;
  }

  .contratar-section {
    padding: 1rem;
    gap: 0.75rem;
  }
}
</style>
