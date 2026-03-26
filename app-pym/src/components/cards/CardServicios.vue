<template>
  <q-card
    class="card-servicio p-4 bg-gradient text-white shadow-2xl overflow-hidden animate-slide-in-left"
    bordered
    flat
  >
    <div class="card-img-wrap">
      <img
        :src="service.image"
        :alt="service.nombre_servicio"
        class="card-img"
      />
      <div class="card-overlay"></div>
      <div class="card-titulo-wrapper">
        <h3 class="card-titulo">{{ service.nombre_servicio }}</h3>
      </div>
    </div>

    <q-card-section>
      <p class="card-text">{{ service.descripcion }}</p>
    </q-card-section>

    <q-separator />

    <BotonInicio
      class="absolute inset-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 transition-opacity"
      label="Ver más"
      icon="visibility"
      @click="openDialog"
    />

    <DialogServicios
      :service="service"
      v-model="dialogOpen"
      :spriteUrl="spriteUrl"
    />
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import BotonInicio from 'src/components/botones/BotonInicio.vue'
import DialogServicios from 'components/dialog/DialogServicios.vue'

const { service, spriteUrl } = defineProps({
  service: {
    type: Object,
    required: true,
  },
  spriteUrl: {
    type: String,
    required: false,
  },
})
const dialogOpen = ref(false)

const openDialog = () => {
  dialogOpen.value = true
}
</script>

<style scoped>
.card-servicio {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(14, 176, 255, 0.35);
  background: linear-gradient(145deg, rgba(11, 31, 51, 0.96), rgba(4, 13, 24, 0.85));
  box-shadow: 0 0 30px rgba(12, 173, 255, 0.25);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.card-servicio:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 40px rgba(34, 220, 255, 0.45);
  opacity: 1;
}

.card-img-wrap {
  position: relative;
  min-height: 240px;
  overflow: hidden;
  background: #081e34;
}

.card-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  opacity: 0.95;
  transition: transform 0.5s ease;
}

.card-img-wrap:hover .card-img {
  transform: scale(1.15);
  object-fit: contain;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5, 18, 34, 0.3), rgba(1, 9, 19, 0.75));
}

.card-titulo-wrapper {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  text-align: left;
}

.card-titulo {
  margin: 0;
  color: #ffffff;
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 900;
  text-shadow: 0 0 28px rgba(40, 215, 255, 0.65);
  text-align: center;
}

.card-text {
  color: #d7edf8;
  font-size: 0.8rem;
  line-height: 1.45;
  text-align: center;
  font-weight: 500;
}
</style>
