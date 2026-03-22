<template>
  <q-btn class="boton1" :label="props.label" :icon="props.icon" color="primary" unelevated rounded
    @click="$emit('click')" />
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Ver mas',
  },
  icon: {
    type: String,
    default: 'visibility',
  },
})
</script>

<style scoped>
.boton1 {
  min-width: 130px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.boton1:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
}
</style>