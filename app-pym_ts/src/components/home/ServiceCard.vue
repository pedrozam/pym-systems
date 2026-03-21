<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div class="p-6">
      <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
        <svg v-if="icon" class="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
          <use :xlink:href="`/src/assets/svg/sprite.svg#${icon}`" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{ description }}
      </p>
      <CustomButton variant="secondary" class="text-sm">
        {{ buttonText }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '../common/CustomButton.vue'

defineProps<{
  title: string
  description: string
  icon?: string
  buttonText?: string
}>()
</script>
