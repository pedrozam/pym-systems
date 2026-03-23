<template>
  <q-card class="q-pa-md bg-dark text-white" style="min-width: 400px; max-width: 500px;">
    <q-card-section>
      <div class="text-h6 flex items-center justify-between">
        <div class="flex items-center">
          <img src="/favicon.ico" alt="Logo" class="w-8 h-8 mr-2" />
          Contactar a Soporte Técnico
        </div>
        <q-btn flat round dense icon="close" @click="$emit('close')" />
      </div>
    </q-card-section>

    <q-card-section>
      <InputText class="border-neon p-2 mb-4" etiqueta="Tu nombre *" tipo="text" v-model:valor="form.nombre"
        :validacion="[val => !!val || 'El nombre es requerido']" />

      <InputText class="border-neon p-2 mb-4" etiqueta="Empresa o Institución" tipo="text"
        v-model:valor="form.empresa" />

      <InputText class="border-neon p-2 mb-4" etiqueta="Celular de contacto *" tipo="tel" v-model:valor="form.celular"
        mascara="########" :validacion="[val => !!val || 'El celular es requerido']" />

      <InputText class="border-neon p-2 mb-4" etiqueta="Correo electrónico" tipo="email" v-model:valor="form.email"
        :validacion="[
          val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Ingrese un correo válido'
        ]" />

      <InputText class="border-neon p-2 mb-4" etiqueta="Mensaje a enviar *" tipo="textarea" v-model:valor="form.mensaje"
        :validacion="[val => !!val || 'El mensaje es requerido']" :rows="4" />

      <svg width="32" height="32">
        <use xlink:href="/assets/sprite.svg#x" />
      </svg>
    </q-card-section>

    <q-card-actions class="justify-center">

      <q-btn label="Contactar por WhatsApp" color="positive" icon="whatsapp" @click="enviarWhatsApp" :loading="cargando"
        class="q-px-lg" />
    </q-card-actions>

    <q-card-section class="text-center text-sm text-grey-6">
      * Campos obligatorios
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import InputText from '../inputs/InputText.vue'

const $q = useQuasar()
const cargando = ref(false)

const emit = defineEmits(['close'])

const form = reactive({
  nombre: '',
  empresa: '',
  celular: '',
  email: '',
  mensaje: ''
})

const enviarWhatsApp = () => {
  // Validar campos requeridos
  if (!form.nombre || !form.celular || !form.mensaje) {
    $q.notify({
      type: 'negative',
      message: 'Por favor complete los campos obligatorios (*)',
      position: 'top',
      timeout: 3000
    })
    return
  }

  // Validar email si fue proporcionado
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    $q.notify({
      type: 'negative',
      message: 'Por favor ingrese un correo electrónico válido',
      position: 'top',
      timeout: 3000
    })
    return
  }

  cargando.value = true

  // Construir mensaje para WhatsApp
  let mensajeWhatsApp = `*Nuevo contacto desde PyM Systems*%0A%0A`
  mensajeWhatsApp += `*Nombre:* ${form.nombre}%0A`
  if (form.empresa) mensajeWhatsApp += `*Empresa/Institución:* ${form.empresa}%0A`
  mensajeWhatsApp += `*Celular:* ${form.celular}%0A`
  if (form.email) mensajeWhatsApp += `*Correo:* ${form.email}%0A`
  mensajeWhatsApp += `*Mensaje:*%0A${form.mensaje}`

  // Número de teléfono (sin el +)
  const numeroTelefono = '59160140028'

  // Abrir WhatsApp
  const url = `https://wa.me/${numeroTelefono}?text=${mensajeWhatsApp}`

  // Abrir en nueva pestaña
  window.open(url, '_blank')

  // Mostrar notificación de éxito
  $q.notify({
    type: 'positive',
    message: '¡Mensaje preparado! Se abrirá WhatsApp para enviarlo.',
    position: 'top',
    timeout: 6000
  })

  // Limpiar formulario y cerrar
  setTimeout(() => {
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    cargando.value = false
    emit('close')
  }, 9000)
}
</script>

<style scoped>
:deep(.q-field--filled) {
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.q-field__control) {
  background-color: rgba(255, 255, 255, 0.05);
}

:deep(.q-field__label) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.q-field__native) {
  color: white;
}
</style>