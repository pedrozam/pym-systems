<template>
  <div class="digital-laptop-bg" @mousemove="updateMouse">
    <div class="mouse-spotlight" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>

    <div v-if="!logoInToolbar" class="loading-dots">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-black/75">
          <q-toolbar class="custom-toolbar p-2">
            <q-toolbar-title>
              <img src="/favicon.ico" alt="App logo"
                :class="logoInToolbar ? 'toolbar-logo favicon-rotate' : 'center-logo'" />
            </q-toolbar-title>

            <q-btn class="p-2" icon="account_circle" label="Iniciar Sesión" color="primary" @click="showLogin = true" />

          </q-toolbar>
        </q-header>

        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>

    <q-dialog v-model="showLogin" class="flex flex-center">
      <LoginForm />
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import LoginForm from '../components/forms/LoginForm.vue'

const $q = useQuasar()
const logoInToolbar = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const showLogin = ref(false)

function updateMouse(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  $q.dark.set(false)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)
})
</script>
