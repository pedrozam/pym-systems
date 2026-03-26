<template>
  <q-page class="q-pa-none">
    <ServiciosIndex :spriteUrl="spriteUrl" />
    <PresentacionIndex :spriteUrl="spriteUrl" />
  </q-page>
</template>

<script setup>
import ServiciosIndex from 'pages/servicios/ServiciosIndex.vue'
import PresentacionIndex from 'pages/presentacion/PresentacionIndex.vue'
const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})
</script>
