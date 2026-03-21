<template>
  <section class="py-20 px-4 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto">
      <SectionTitle
        title="Proyectos en Curso"
        subtitle="Innovación y Calidad en Desarrollo de Software Boliviano"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Some une empresa bolivariana concrecionista en desarrollo de módulos virtuales para la gestión de sistemas operativos.
          </p>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300">Experiencia y Profesionalismo</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300">Soluciones Personalizadas</span>
            </div>
          </div>
          <CustomButton variant="primary" class="mt-8">
            Más Sobre Nosotros
          </CustomButton>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <img src="/src/assets/imagenes/project1.jpg" alt="Proyecto 1" class="rounded-lg shadow-lg">
          <img src="/src/assets/imagenes/project2.jpg" alt="Proyecto 2" class="rounded-lg shadow-lg">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '../common/SectionTitle.vue'
import CustomButton from '../common/CustomButton.vue'
</script>
