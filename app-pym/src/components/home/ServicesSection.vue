<template>
  <section class="py-20 px-4 bg-white dark:bg-gray-900"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <div class="max-w-7xl mx-auto">
      <SectionTitle
        title="Nuestros Servicios"
        subtitle="Creación de páginas web y soluciones tecnológicas a medida"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          title="Desarrollo de Páginas Web y Sistemas"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          icon="web"
          buttonText="Más Info"
        />
        <ServiceCard
          title="Reparación y Mantenimiento de Equipos"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          icon="repair"
          buttonText="Ver Todos los Servicios"
        />
        <ServiceCard
          title="Soluciones Tecnológicas Personalizadas"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          icon="solutions"
          buttonText="Más Info"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '../common/SectionTitle.vue'
import ServiceCard from './ServiceCard.vue'

defineProps<{
  background?: string
}>()
</script>
