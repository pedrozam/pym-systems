<template>
  <section class="py-20 px-4 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <SectionTitle
        title="Sobre PYM Systems"
        subtitle="Innovación y Calidad en Desarrollo de Software Boliviano"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in projects" :key="index" class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ project.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ project.description }}
          </p>
          <CustomButton variant="secondary" class="text-sm">
            Ver Más Proyectos
          </CustomButton>
        </div>
      </div>

      <div class="text-center mt-12">
        <CustomButton variant="primary" class="text-lg">
          Ver Más Proyectos
        </CustomButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '../common/SectionTitle.vue'
import CustomButton from '../common/CustomButton.vue'

const projects = [
  {
    title: 'Sistema de Gestión Empresarial',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'App de E-Commerce',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Plataforma de Reservas y Citas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]
</script>
