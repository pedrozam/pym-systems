<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">
    <!-- Hero Section basado en el cartel de pizza -->
    <div id="inicio" class="relative overflow-hidden">
      <div class="absolute inset-0 bg-black/20 z-0"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div class="bg-gradient-to-r from-orange-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden">
          <div class="p-8 md:p-12 text-center text-white">
            <div class="mb-4">
              <span class="text-amber-300 font-bold text-sm uppercase tracking-wider">🔥 ESPECIAL DE LA SEMANA 🔥</span>
              <h1 class="text-5xl md:text-7xl font-black mt-2 mb-4">
                VIERNES DE <span class="text-amber-300">PIZZA</span>
              </h1>
              <p class="text-xl md:text-2xl font-semibold mb-2">
                🍕 VEN Y COMPARTE UNA DELICIOSA PIZZA 🍕
              </p>
              <p class="text-lg md:text-xl">
                RECIÉN SALIDA DEL HORNO CON QUIENES MÁS QUIERES
              </p>
            </div>

            <div class="flex flex-wrap justify-center gap-4 mt-8">
              <div class="bg-black/40 rounded-full px-4 py-2 flex items-center gap-2">
                <svg width="20" height="20" class="text-amber-300">
                  <use :xlink:href="`${spriteUrl}#calendar`" />
                </svg>
                <span class="font-semibold">VIERNES 17 · 17:00 HRS</span>
              </div>
              <div class="bg-black/40 rounded-full px-4 py-2 flex items-center gap-2">
                <svg width="20" height="20" class="text-amber-300">
                  <use :xlink:href="`${spriteUrl}#location`" />
                </svg>
                <span>AV. TITO YUPANQUI #220, VILLA COPACABANA</span>
              </div>
              <div class="bg-black/40 rounded-full px-4 py-2 flex items-center gap-2">
                <svg width="20" height="20" class="text-amber-300">
                  <use :xlink:href="`${spriteUrl}#phone`" />
                </svg>
                <span class="font-bold">☺ 79543794</span>
              </div>
            </div>

            <div class="mt-10">
              <q-btn
                label="RESERVA AHORA"
                color="amber"
                glossy
                size="lg"
                class="font-bold text-black px-8 py-3 rounded-full hover:scale-105 transition-transform"
                @click="reservarAhora"
                icon="event_available"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Nuestro Menú -->
    <div id="menu" class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-orange-800 mb-3">
          🍕 Nuestro Menú 🍕
        </h2>
        <p class="text-xl text-gray-700">Las pizzas artesanales que enamoran a todos</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Pizza Margherita -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza Margherita" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">Margherita Especial</h3>
            <p class="text-gray-600 mb-3">Mozzarella, albahaca fresca, tomates cherry y aceite de oliva. Masa artesanal.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 59</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('Margherita Especial')" />
            </div>
          </div>
        </div>

        <!-- Pizza Pepperoni -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza Pepperoni" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">Pepperoni Fire</h3>
            <p class="text-gray-600 mb-3">Doble pepperoni, queso mozzarella, salsa de tomate y orégano.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 72</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('Pepperoni Fire')" />
            </div>
          </div>
        </div>

        <!-- Pizza Cuatro Quesos -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza Cuatro Quesos" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">Cuatro Quesos</h3>
            <p class="text-gray-600 mb-3">Mozzarella, parmesano, gorgonzola y fontina. Cremosa e irresistible.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 85</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('Cuatro Quesos')" />
            </div>
          </div>
        </div>

        <!-- Pizza Hawaiana -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza Hawaiana" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">Hawaiana Tropical</h3>
            <p class="text-gray-600 mb-3">Jamón, piña caramelizada, mozzarella y un toque de curry.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 68</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('Hawaiana Tropical')" />
            </div>
          </div>
        </div>

        <!-- Pizza Vegetariana -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza Vegetariana" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">Vegetariana Deluxe</h3>
            <p class="text-gray-600 mb-3">Champiñones, pimientos, aceitunas negras, cebolla morada y albahaca.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 65</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('Vegetariana Deluxe')" />
            </div>
          </div>
        </div>

        <!-- Pizza BBQ Chicken -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
          <img src="https://images.pexels.com/photos/1596887/pexels-photo-1596887.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pizza BBQ Chicken" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-orange-700 mb-2">BBQ Chicken</h3>
            <p class="text-gray-600 mb-3">Pollo asado, salsa BBQ, cebolla crispy y queso ahumado.</p>
            <div class="flex justify-between items-center">
              <span class="text-3xl font-bold text-orange-600">Bs. 79</span>
              <q-btn flat color="orange" label="Ordenar" icon="shopping_cart" @click="ordenarPizza('BBQ Chicken')" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Pedidos -->
    <div id="pedidos" class="bg-orange-100 py-16">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-3xl shadow-xl p-8">
          <div class="text-center mb-8">
            <svg width="60" height="60" class="mx-auto text-orange-600 mb-4">
              <use :xlink:href="`${spriteUrl}#pizza`" />
            </svg>
            <h2 class="text-4xl font-bold text-orange-800 mb-2">Haz tu Pedido</h2>
            <p class="text-gray-600">¡Llámanos o reserva tu lugar! Viernes 17 de 17:00 a 23:00 hrs.</p>
          </div>

          <form @submit.prevent="enviarPedido">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Tu nombre</label>
                <input
                  v-model="pedidoForm.nombre"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                >
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Teléfono / WhatsApp</label>
                <input
                  v-model="pedidoForm.telefono"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                >
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 font-semibold mb-2">¿Qué pizza deseas?</label>
              <textarea
                v-model="pedidoForm.pedidoDetalle"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Ej. Una pizza Pepperoni grande, dos Coca-Colas..."
              ></textarea>
            </div>
            <div class="text-center">
              <q-btn
                type="submit"
                color="orange"
                size="lg"
                class="px-8 rounded-full font-bold"
                label="Enviar Pedido ✨"
                icon="send"
              />
            </div>
          </form>

          <div class="flex justify-center gap-4 mt-6">
            <q-btn flat round icon="call" color="dark" size="md" label="79543794" @click="llamar" />
            <q-btn flat round icon="fab fa-whatsapp" color="green" size="md" label="79543794" @click="openWhatsApp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

// Definir props (aunque no se usen directamente, se pasan desde el layout)
defineProps({
  spriteUrl: {
    type: String,
    default: '/sprite.svg'
  }
})

const $q = useQuasar()
const pedidoForm = ref({
  nombre: '',
  telefono: '',
  pedidoDetalle: ''
})

function reservarAhora() {
  $q.dialog({
    title: 'Reservar mesa',
    message: '¿Deseas hacer una reserva para el Viernes 17 a las 17:00?',
    cancel: {
      label: 'Cancelar',
      flat: true
    },
    persistent: true,
    ok: { label: 'Reservar', color: 'orange' }
  }).onOk(() => {
    $q.notify({ type: 'positive', message: '¡Reserva confirmada! Te esperamos.', position: 'top' })
  })
}

function ordenarPizza(pizzaName) {
  $q.notify({
    message: `🍕 Agregaste ${pizzaName} al carrito. Completa tu pedido en la sección "Pedidos".`,
    color: 'orange-7',
    icon: 'shopping_cart',
    position: 'bottom'
  })
  // Scroll a la sección pedidos
  document.getElementById('pedidos')?.scrollIntoView({ behavior: 'smooth' })
  pedidoForm.value.pedidoDetalle = pizzaName
}

function enviarPedido() {
  if (!pedidoForm.value.nombre || !pedidoForm.value.telefono) {
    $q.notify({ type: 'warning', message: 'Por favor completa nombre y teléfono', position: 'top' })
    return
  }
  $q.notify({
    type: 'positive',
    message: `✅ Pedido enviado, ${pedidoForm.value.nombre}. Te contactaremos al ${pedidoForm.value.telefono}`,
    position: 'top'
  })
  pedidoForm.value = { nombre: '', telefono: '', pedidoDetalle: '' }
}

function llamar() {
  window.location.href = 'tel:79543794'
}

function openWhatsApp() {
  window.open('https://wa.me/59179543794?text=Hola!%20Quisiera%20hacer%20un%20pedido%20de%20pizza', '_blank')
}
</script>
