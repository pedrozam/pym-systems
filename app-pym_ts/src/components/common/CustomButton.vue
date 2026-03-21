<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-all duration-300',
      variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' : '',
      variant === 'secondary' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : '',
      variant === 'outline' ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900' : ''
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
}>()
</script>
