<template>
  <q-card class="q-pa-md bg-dark text-white relative">
    <q-card-section>
      <div class="text-h6 flex items-center">
        <img src="/favicon.ico" alt="Logo" class="w-8 h-8 mr-2" />
        Iniciar Sesión
      </div>
    </q-card-section>
    <q-card-section>
      <InputText class="border-neon p-2 mb-4" etiqueta="Usuario" tipo="text" v-model:valor="username" />
      <InputPassword class="border-neon p-2 mb-4" etiqueta="Contraseña" tipo="password" v-model:valor="password" />
      <div class="text-center mb-4">
        <q-btn flat label="Recuperar contraseña" class="text-secundary" />
      </div>
    </q-card-section>
    <q-card-section class="text-center text-sm">
      Estás a punto de iniciar sesión en PyM Systems, si no tienes acceso contacta a soporte técnico.
    </q-card-section>
    <q-card-actions class="justify-center">
      <q-btn label="Iniciar Sesión" color="primary" @click="login" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '../inputs/InputText.vue'
import InputPassword from '../inputs/InputPassword.vue'

const username = ref('')
const password = ref('')

const login = () => {
  // Lógica de inicio de sesión
  console.log('Usuario:', username.value, 'Contraseña:', password.value)
  // Aquí puedes agregar la lógica real de autenticación
}
</script>
