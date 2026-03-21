<template>
    <q-input filled :label="etiqueta" :type="passwordType" v-model="textComputed" dense :rules="validacion"
        no-error-icon :mask="mascara" :readonly="deshabilitar" clearable :hint="hint" class="text-white">
        <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
    </q-input>
</template>

<script setup>
import { computed, toRefs, ref } from "vue";

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

const { etiqueta, valor, validacion, mascara, deshabilitar, hint } =
    toRefs(props);

const isPwd = ref(true);

const passwordType = computed(() => (isPwd.value ? "password" : "text"));

const textComputed = computed({
    get: () => valor.value,
    set: (val) => emit("update:valor", val),
});
</script>