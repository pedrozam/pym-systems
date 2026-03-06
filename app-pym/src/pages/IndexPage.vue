<template>
  <q-page class="bg-white dark:bg-gray-900">
    <PageContainer>
      <HeroSection :background-image="backgroundImage" />
      <ServicesSection :background="backgroundImage"/>
      <ProjectsSection />
      <AboutSection />
    </PageContainer>
  </q-page>
</template>

<script setup lang="ts">
import PageContainer from 'components/layout/PageContainer.vue'
import HeroSection from 'components/home/HeroSection.vue'
import ServicesSection from 'components/home/ServicesSection.vue'
import ProjectsSection from 'components/home/ProjectsSection.vue'
import AboutSection from 'components/home/AboutSection.vue'
import backgroundImage from '/src/assets/imagenes/bg_inicial.png'
</script>
