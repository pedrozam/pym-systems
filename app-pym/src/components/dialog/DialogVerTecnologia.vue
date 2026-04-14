<!-- components/DialogVerTecnologia.vue -->
<template>
  <q-dialog
    v-model="dialogVisible"
    class="backdrop-blur-sm"
    @update:model-value="handleDialogUpdate"
  >
    <div
      class="bg-linear-to-br from-[#0B1F33] to-[#123A56] rounded-2xl max-w-md w-full p-6 border border-turquesa/30 shadow-[0_0_30px_rgba(22,179,196,0.3)]"
    >
      <div
        v-if="technology"
        class="text-center"
      >
        <div class="mb-4 inline-flex p-3 rounded-full bg-white/10 border border-turquesa/40">
          <svg
            width="48"
            height="48"
          >
            <use :xlink:href="`${spriteUrl}#${technology.icon}`" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ technology.name }}</h3>
        <p class="text-white/70 text-sm mb-4">{{ technology.description }}</p>
        <a
          :href="technology.url"
          target="_blank"
          class="inline-flex items-center gap-2 text-turquesa hover:text-cyan-300 transition-colors"
        >
          Visitar sitio oficial
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  technology: {
    type: Object,
    default: null,
  },
  spriteUrl: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const handleDialogUpdate = (value) => {
  if (!value) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>

</style>