<template>
  <div class="digital-laptop-bg">
    <div v-if="!logoInToolbar" class="loading-dots">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-transparent">
          <q-toolbar class="custom-toolbar">
            <q-toolbar-title> </q-toolbar-title>

            <img src="/favicon.ico" alt="App logo"
              :class="logoInToolbar ? 'toolbar-logo favicon-rotate' : 'center-logo'" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'


const $q = useQuasar()
const logoInToolbar = ref(false)

onMounted(() => {
  $q.dark.set(false)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)
})
</script>
