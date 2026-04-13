<template>
  <q-card
    class="relative rounded-lg overflow-hidden border border-[rgba(14,176,255,0.35)] bg-gradient-to-br from-[rgba(11,31,51,0.96)] to-[rgba(4,13,24,0.85)] shadow-[0_0_30px_rgba(12,173,255,0.25)] transition-all duration-250 ease hover:-translate-y-1.5 hover:shadow-[0_0_80px_rgba(143,146,146,0.45)] hover:opacity-80 group animate-slide-in-left"
    bordered
    flat
  >
    <!-- Imagen Wrap -->
    <div
      class="relative min-h-[240px] overflow-hidden bg-[#081e34] transition-transform group-hover:-rotate-12 group-hover:scale-125"
    >
      <img
        :src="service.image"
        :alt="service.nombre_servicio"
        class="w-full h-[240px] object-cover opacity-95 transition-transform duration-500 ease group-hover:scale-115 group-hover:object-contain"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-[rgba(5,18,34,0.3)] to-[rgba(1,9,19,0.75)]"
      ></div>

      <!-- Título -->
      <div class="absolute bottom-4 left-4 right-4 text-left">
        <h3
          class="m-0 text-white text-xl leading-none font-black text-center [text-shadow:0_0_28px_rgba(40,215,255,0.65)] group-hover:rotate-372"
        >
          {{ service.nombre_servicio }}
        </h3>
      </div>
    </div>

    <!-- Descripción -->
    <q-card-section>
      <p class="text-[#d7edf8] text-sm leading-relaxed text-center font-medium">
        {{ service.descripcion }}
      </p>
    </q-card-section>

    <q-separator />

    <!-- Botón Ver más -->
    <BotonInicio
      class="absolute inset-0 w-full h-full text-weight-bold opacity-0 hover:opacity-80 transition-all duration-300 hover:shadow-[0_0_10px_#00ff88,0_0_20px_#00ff88] [text-shadow:0_0_5px_#00ff88,0_0_10px_#00ff88]"
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
