<template>
  <section
    class="relative min-h-screen flex items-center justify-center text-white"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Overlay oscuro -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Contenido -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        PYM SYSTEMS
      </h1>
      <CustomButton variant="outline" class="text-lg">
        Conoce Más
      </CustomButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import CustomButton from '../common/CustomButton.vue'


defineProps<{
  backgroundImage?: string
}>()
</script>