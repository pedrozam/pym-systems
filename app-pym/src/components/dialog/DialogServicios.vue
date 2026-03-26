<template>
  <q-dialog
    v-model="opened"
    persistent
    :overlay-class="overlayClass"
  >
    <q-card
      class="dialog-servicio bg-primary text-white"
      style="min-width: 360px; max-width: 680px"
    >
      <q-bar class="bg-primary text-white">
        <div class="text-h6 font-bold">{{ service.nombre_servicio }}</div>
        <q-space />

        <q-btn
          dense
          flat
          round
          icon="close"
          @click="close"
        >
          <q-tooltip>
            <div class="flex items-center gap-1">
              <q-icon
                name="close"
                size="xs"
              />
              <span>Salir</span>
            </div>
          </q-tooltip>
        </q-btn>
      </q-bar>

      <q-carousel
        swipeable
        infinite
        v-model="tab"
        animated
        :autoplay="autoplay"
        ref="carousel"
        class="contenedor-carousel"
        :style="{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <q-carousel-slide
          name="duracion"
          class="slide-color inset-0 bg-black/80"
        >
          <div class="slide-content">
            <h2 class="slide-title">Duración</h2>
            <p class="slide-body">{{ service.tiempo }}</p>
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="costos"
          class="slide-color inset-0 bg-black/80"
        >
          <div class="slide-content">
            <h2 class="slide-title">Costos</h2>
            <div class="slide-body">
              <div
                v-for="(item, i) in costos"
                :key="i"
                class="slide-item"
              >
                <q-icon
                  :name="item.icon"
                  class="text-cyan-2"
                />
                <strong>{{ item.label }}:</strong> {{ item.value }}
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="ventajas"
          class="slide-color inset-0 bg-black/80"
        >
          <div class="slide-content">
            <h2 class="slide-title">Ventajas</h2>
            <ul class="slide-body list-disc ml-4">
              <li
                v-for="(item, i) in ventajas"
                :key="i"
              >
                {{ item.trim() }}
              </li>
            </ul>
          </div>
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            position="top-right"
            :offset="[18, 18]"
            class="text-white rounded-borders"
            style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
          >
            <q-toggle
              dense
              dark
              color="orange"
              v-model="autoplay"
              label="Auto Play"
            />
          </q-carousel-control>

          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
            class="q-gutter-xs"
          >
            <q-btn
              push
              round
              dense
              color="white"
              text-color="black"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="white"
              text-color="black"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>

      <q-card-actions
        class="bg-primary-9 row"
        align="around"
      >
        <q-btn
          class="col-12"
          v-if="service.boton1"
          dense
          flat
          :to="service.ruta1"
          :label="service.boton1"
        >
          <svg
            width="32"
            height="32"
            class="p-1"
          >
            <use :xlink:href="`${spriteUrl}#${service.icono1}`" />
          </svg>
        </q-btn>
        <q-btn
          class="col-12"
          v-if="service.boton2"
          dense
          flat
          :icon="service.icono2"
          :to="service.ruta2"
          :label="service.boton2"
        >
          <svg
            width="32"
            height="32"
            class="p-1"
          >
            <use :xlink:href="`${spriteUrl}#${service.icono2}`" />
          </svg>
        </q-btn>
        <q-btn
          class="col-12"
          v-if="service.boton3"
          dense
          flat
          :icon="service.icono3"
          :to="service.ruta3"
          :label="service.boton3"
        >
          <svg
            width="32"
            height="32"
            class="p-1"
          >
            <use :xlink:href="`${spriteUrl}#${service.icono3}`" />
          </svg>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

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
const tab = ref('duracion')

const autoplay = ref(true)

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

const overlayClass = 'bg-blue-grey-12 bg-opacity-85'

const ventajas = computed(() => {
  if (!props.service.ventajas) return []
  return props.service.ventajas.split('|')
})

const costos = computed(() => {
  const list = []
  const s = props.service
  if (s.costo_servicio) list.push({ label: 'Servicio', value: s.costo_servicio, icon: 'work' })
  if (s.costo_alojamiento)
    list.push({ label: 'Alojamiento', value: s.costo_alojamiento, icon: 'home' })
  if (s.costo_dominio) list.push({ label: 'Dominio', value: s.costo_dominio, icon: 'language' })
  if (s.costo_correo) list.push({ label: 'Correo', value: s.costo_correo, icon: 'email' })
  return list
})
</script>

<style scoped>
.dialog-servicio {
  border-radius: 5px;
  border: 1px solid rgba(35, 176, 241, 0.5);
}

.contenedor-carousel {
  min-height: 320px;
}

.slide-color {
  background: transparent;
}

.slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 18px;
  color: #e8f8ff;
}

.slide-title {
  font-size: 1.9rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #8ee7ff;
}

.slide-body {
  font-size: 1.05rem;
  color: #e0f4ff;
  max-width: 520px;
}

.slide-item {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 8px 12px;
  margin: 6px 0;
  background: rgba(8, 28, 47, 0.6);
}

.btn-hover-mode {
  width: 44px;
  height: 44px;
  transition: all 0.19s ease;
  min-width: 44px;
}

.btn-hover-mode:hover {
  width: auto;
  min-width: 120px;
  border-radius: 8px;
  background: rgba(30, 156, 211, 0.95);
  color: #031d2c;
  opacity: 1;
}
</style>
