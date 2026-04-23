<!-- components/DialogLogin.vue -->
<template>
  <q-dialog
    v-model="dialogVisible"
    class="backdrop-blur-sm"
    @update:model-value="handleDialogUpdate"
  >
    <div
      class="bg-linear-to-br from-[#0B1F33] to-[#123A56] rounded-2xl max-w-md w-full p-6 border border-turquesa/30 shadow-[0_0_30px_rgba(22,179,196,0.3)]"
    >
      <div class="text-center">
        <!-- Logo y título -->
        <div class="mb-6 inline-flex p-3 rounded-full bg-white/10 border border-turquesa/40">
          <img
            src="/favicon.ico"
            alt="Logo"
            class="w-12 h-12"
          />
        </div>

        <h3 class="text-2xl font-bold text-white mb-2">Iniciar Sesión</h3>
        <p class="text-white/70 text-sm mb-6">Accede a tu cuenta de PyM Systems</p>
      </div>

      <!-- Formulario -->
      <div class="space-y-4">
        <InputText
          etiqueta="Usuario"
          tipo="text"
          v-model:valor="username"
        />
        <InputText
          etiqueta="Contraseña"
          tipo="pass"
          v-model:valor="password"
        />

        <div class="text-center">
          <button
            @click="recoverPassword"
            class="text-white cursor-pointer hover:text-cyan-300 text-sm transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      <!-- Mensaje informativo -->
      <div class="text-center text-white/60 text-xs mt-6 p-3 bg-white/5 rounded-lg">
        Estás a punto de iniciar sesión en PyM Systems,
        si no tienes acceso contacta a soporte técnico.
      </div>

      <!-- Botón de acción -->
      <div class="mt-6">
        <button
          @click="login"
          class="w-full px-6 py-2.5 bg-linear-to-r from-turquesa to-cyan-500 rounded-lg font-semibold text-white transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(22,179,196,0.4)]"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import InputText from '../inputs/InputText.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'login-success'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const username = ref('')
const password = ref('')

const handleDialogUpdate = (value) => {
  if (!value) {
    emit('update:modelValue', false)
    // Limpiar formulario al cerrar
    username.value = ''
    password.value = ''
  }
}

const login = () => {
  // Aquí puedes agregar la lógica real de autenticación
  console.log('Usuario:', username.value, 'Contraseña:', password.value)

  // Emitir evento de éxito si la autenticación es correcta
  // emit('login-success', { username: username.value, password: password.value })

  // Cerrar el diálogo después del login (opcional)
  dialogVisible.value = false
}

const recoverPassword = () => {
  // Lógica para recuperar contraseña
  console.log('Recuperar contraseña')
  // Puedes abrir otro diálogo o redirigir
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
