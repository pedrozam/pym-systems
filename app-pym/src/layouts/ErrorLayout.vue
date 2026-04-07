<template>
  <div
    class="digital-laptop-bg"
    @mousemove="updateMouse"
  >
    <div
      class="mouse-spotlight"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>

    <div class="neon-typing-lines"></div>
    <div class="neon-typing-highlight"></div>

    <div class="laptop-content">
      <q-layout view="hHh lpR fFf">
        <q-header
          elevated
          class="bg-black/75"
        >
          <q-toolbar class="custom-toolbar p-2">
            <q-toolbar-title>
              <img
                src="/favicon.ico"
                alt="App logo"
                class="center-logo"
              />
            </q-toolbar-title>

            <q-btn
              class="p-2"
              icon="send"
              label="Volver"
              color="primary"
              to="/"
            />
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
const logoInToolbar = ref(true)
const mouseX = ref(0)
const mouseY = ref(0)

function updateMouse(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  $q.dark.set(false)

  // Redimensionar el spotlight
  setTimeout(() => {
    const spotlightElement = document.querySelector('.mouse-spotlight')
    if (spotlightElement) {
      spotlightElement.style.width = '80px'
      spotlightElement.style.height = '80px'
    }
  }, 100)

  setTimeout(() => {
    logoInToolbar.value = true
  }, 5000)
})
</script>
