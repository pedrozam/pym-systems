<template>
    <q-dialog v-model="opened" persistent :overlay-class="overlayClass">
        <q-card class="dialog-servicio bg-primary text-white" style="min-width: 360px; max-width: 680px;">
            <q-bar class="bg-primary text-white">
                <div class="text-h6 font-bold">{{ service.nombre_servicio }}</div>
                <q-space />
                <q-btn dense flat round icon="close" @click="close" />
            </q-bar>

            <q-carousel v-model="tab" animated control-color="white" navigation autoplay="4200" unlimited
                class="contenedor-carousel">
                <q-carousel-slide name="duracion" class="slide-color">
                    <div class="slide-content">
                        <h2 class="slide-title">Duración</h2>
                        <p class="slide-body">{{ service.tiempo }}</p>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="costos" class="slide-color">
                    <div class="slide-content">
                        <h2 class="slide-title">Costos</h2>
                        <div class="slide-body">
                            <div v-for="(item, i) in costos" :key="i" class="slide-item">
                                <q-icon :name="item.icon" class="text-cyan-2" />
                                <strong>{{ item.label }}:</strong> {{ item.value }}
                            </div>
                        </div>
                    </div>
                </q-carousel-slide>

                <q-carousel-slide name="ventajas" class="slide-color">
                    <div class="slide-content">
                        <h2 class="slide-title">Ventajas</h2>
                        <ul class="slide-body list-disc ml-4">
                            <li v-for="(item, i) in ventajas" :key="i">{{ item.trim() }}</li>
                        </ul>
                    </div>
                </q-carousel-slide>
            </q-carousel>

            <q-card-actions class="bg-primary-9" align="around">
                <q-btn dense round icon="schedule" :class="{ 'btn-hover-mode': true }" @click="tab = 'duracion'"
                    @mouseenter="btnText = 'Duración'" @mouseleave="btnText = ''">
                    <template v-if="btnText === 'Duración'">{{ btnText }}</template>
                </q-btn>

                <q-btn dense round icon="payments" :class="{ 'btn-hover-mode': true }" @click="tab = 'costos'"
                    @mouseenter="btnText = 'Costos'" @mouseleave="btnText = ''">
                    <template v-if="btnText === 'Costos'">{{ btnText }}</template>
                </q-btn>

                <q-btn dense round icon="thumb_up" :class="{ 'btn-hover-mode': true }" @click="tab = 'ventajas'"
                    @mouseenter="btnText = 'Ventajas'" @mouseleave="btnText = ''">
                    <template v-if="btnText === 'Ventajas'">{{ btnText }}</template>
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:modelValue'])

const opened = ref(props.modelValue)
const tab = ref('duracion')
const btnText = ref('')

watch(
    () => props.modelValue,
    (val) => {
        opened.value = val
    }
)
watch(opened, (val) => {
    emit('update:modelValue', val)
})

const close = () => {
    opened.value = false
}

const overlayClass = 'bg-blue-grey-12 bg-opacity-85'

const ventajas = computed(() => {
    if (!props.service.ventajas) return []
    return props.service.ventajas.split('|')
})

const costos = computed(() => {
    const list = []
    const s = props.service
    if (s.costo_servicio) list.push({ label: 'Servicio', value: s.costo_servicio, icon: 'work' })
    if (s.costo_alojamiento) list.push({ label: 'Alojamiento', value: s.costo_alojamiento, icon: 'home' })
    if (s.costo_dominio) list.push({ label: 'Dominio', value: s.costo_dominio, icon: 'language' })
    if (s.costo_correo) list.push({ label: 'Correo', value: s.costo_correo, icon: 'email' })
    return list
})
</script>

<style scoped>
.dialog-servicio {
    border-radius: 18px;
    border: 1px solid rgba(35, 176, 241, 0.5);
}

.contenedor-carousel {
    background: #0b1f33;
    min-height: 320px;
}

.slide-color {
    background: linear-gradient(140deg, #0f273f 0%, #122e4f 50%, #143454 100%);
}

.slide-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 18px;
    color: #e8f8ff;
}

.slide-title {
    font-size: 1.9rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #8ee7ff;
}

.slide-body {
    font-size: 1.05rem;
    color: #e0f4ff;
    max-width: 520px;
}

.slide-item {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    padding: 8px 12px;
    margin: 6px 0;
    background: rgba(8, 28, 47, 0.6);
}

.btn-hover-mode {
    width: 44px;
    height: 44px;
    transition: all 0.19s ease;
    min-width: 44px;
}

.btn-hover-mode:hover {
    width: auto;
    min-width: 120px;
    border-radius: 8px;
    background: rgba(30, 156, 211, 0.95);
    color: #031d2c;
    opacity: 1;
}
</style>