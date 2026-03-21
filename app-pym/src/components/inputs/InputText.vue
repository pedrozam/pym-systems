<template>
  <q-input filled :label="etiqueta" :type="tipo ?? 'text'" v-model="textComputed" dense :rules="validacion"
    no-error-icon :mask="mascara" :readonly="deshabilitar" clearable :hint="hint" class="text-white">
  </q-input>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  valor: {
    type: [String, Number, Array],
  },
  validacion: Array,
  tipo: String,
  etiqueta: String,
  mascara: String,
  deshabilitar: {
    type: Boolean,
    default: false,
  },
  hint: String,
});

const emit = defineEmits(["update:valor"]);

const { etiqueta, valor, validacion, tipo, mascara, deshabilitar, hint } =
  toRefs(props);

const textComputed = computed({
  get: () => valor.value,
  set: (val) => emit("update:valor", val),
});
</script>