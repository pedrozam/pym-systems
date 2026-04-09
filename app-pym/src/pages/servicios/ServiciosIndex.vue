<template>
  <q-page class="q-pa-md">
    <div class="text-center text-white mb-6">
      <h2 class="text-3xl font-bold">Nuestros Servicios</h2>
      <p class="text-base text-cyan-200">
        Elige el que más se ajusta a tu proyecto y avanza con tu transformación digital.
      </p>
    </div>

    <div class="row">
      <span class="col-12 col-sm-1"></span>
      <div class="col-12 col-sm-10 q-gutter-md grid grid-cols-1 md:grid-cols-3">
        <CardServicios
          v-for="(servicio, index) in dataServpym.list"
          :key="servicio.nombre_servicio"
          :service="servicio"
          :index="index"
          :spriteUrl="spriteUrl"
        />
      </div>
      <span class="col-12 col-sm-1"></span>

      <!-- Botón flotante de impuestos -->
      <div class="tax-button-container">
        <div
          class="tax-button"
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
        >
          <svg
            width="2rem"
            height="2rem"
            class="tax-icon"
          >
            <use :xlink:href="`${spriteUrl}#impuestos`" />
          </svg>
          <div
            v-show="showTooltip"
            class="tax-tooltip"
          >
            Emitimos factura para todos nuestros servicios.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CardServicios from 'components/cards/CardServicios.vue'
import useServiciospym from 'src/composables/useServiciospym'

onMounted(() => {
  listarServiciospym('VIGENTE')
})

const { spriteUrl } = defineProps({
  spriteUrl: {
    type: String,
    required: true,
  },
})

const { dataServpym, listarServiciospym } = useServiciospym()
const showTooltip = ref(false)
</script>

<style scoped>
/* Contenedor del botón flotante */
.tax-button-container {
  position: fixed;
  bottom: 2.25rem; /* 100px ≈ 6.25rem */
  right: 3.25rem; /* 20px ≈ 1.25rem */
  z-index: 1000;
}

/* Botón de impuestos - Cuadrado con fondo blanco */
.tax-button {
  width: 3.5rem; /* 56px ≈ 3.5rem */
  height: 3.5rem;
  background: white;
  border-radius: 0.5rem; /* 8px - Esquinas ligeramente redondeadas pero manteniendo forma cuadrada */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.2); /* 0 4px 15px */
  position: relative;
  border: 0.125rem solid rgba(22, 179, 196, 0.3); /* 2px - usando $turquesa */
}

/* Efecto neon al pasar el mouse usando colores de tus variables */
.tax-button:hover {
  transform: scale(1.1);
  background: white;
  box-shadow:
    0 0 0.625rem rgba(22, 179, 196, 0.6),
    /* 10px - usando $turquesa */ 0 0 1.25rem rgba(34, 211, 230, 0.4),
    /* 20px - usando $turquesa-light */ 0 0 1.875rem rgba(79, 209, 232, 0.2); /* 30px - usando $azul-claro */
  border-color: #16b3c4;
  animation: neonPulse 0.8s ease-in-out infinite alternate;
}

/* Icono SVG */
.tax-icon {
  width: 2rem; /* 32px ≈ 2rem */
  height: 2rem;
  filter: drop-shadow(0 0 0.125rem rgba(22, 179, 196, 0.5)); /* 2px */
  transition: all 0.3s ease;
}

.tax-button:hover .tax-icon {
  filter: drop-shadow(0 0 0.3125rem rgba(22, 179, 196, 0.8)); /* 5px */
  transform: scale(1.05);
}

/* Tooltip */
.tax-tooltip {
  position: absolute;
  right: 4.375rem; /* 70px ≈ 4.375rem */
  top: 50%;
  transform: translateY(-50%);
  background: rgba(11, 31, 51, 0.95); /* Usando $primary */
  backdrop-filter: blur(0.625rem); /* 10px */
  color: #16b3c4; /* Usando $turquesa */
  padding: 0.5rem 1rem; /* 8px 16px */
  border-radius: 0.5rem; /* 8px */
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 0.25rem 0.9375rem rgba(0, 0, 0, 0.3); /* 0 4px 15px */
  border: 0.0625rem solid rgba(22, 179, 196, 0.5); /* 1px */
  pointer-events: none;
  z-index: 1001;
  animation: tooltipFadeIn 0.2s ease-out;
  letter-spacing: 0.03125rem; /* 0.5px */
}

/* Flecha del tooltip */
.tax-tooltip::before {
  content: '';
  position: absolute;
  right: -0.5rem; /* -8px */
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 0.5rem solid rgba(22, 179, 196, 0.5); /* 8px */
  border-top: 0.375rem solid transparent; /* 6px */
  border-bottom: 0.375rem solid transparent; /* 6px */
}

.tax-tooltip::after {
  content: '';
  position: absolute;
  right: -0.375rem; /* -6px */
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 0.5rem solid rgba(11, 31, 51, 0.95); /* 8px */
  border-top: 0.375rem solid transparent; /* 6px */
  border-bottom: 0.375rem solid transparent; /* 6px */
}

/* Animaciones */
@keyframes neonPulse {
  0% {
    box-shadow:
      0 0 0.3125rem rgba(22, 179, 196, 0.4),
      /* 5px */ 0 0 0.625rem rgba(22, 179, 196, 0.2); /* 10px */
    border-color: rgba(22, 179, 196, 0.5);
  }
  100% {
    box-shadow:
      0 0 1.25rem rgba(22, 179, 196, 0.8),
      /* 20px */ 0 0 1.875rem rgba(34, 211, 230, 0.5),
      /* 30px */ 0 0 2.5rem rgba(79, 209, 232, 0.3); /* 40px */
    border-color: #16b3c4;
  }
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-0.625rem); /* -10px */
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .tax-button-container {
    bottom: 1.25rem; /* 20px */
    right: 1.25rem; /* 20px */
  }

  .tax-button {
    width: 3rem; /* 48px */
    height: 3rem; /* 48px */
  }

  .tax-icon {
    width: 1.75rem; /* 28px */
    height: 1.75rem; /* 28px */
  }

  .tax-tooltip {
    font-size: 0.75rem; /* 12px */
    padding: 0.375rem 0.75rem; /* 6px 12px */
    white-space: nowrap;
  }

  .tax-tooltip::before,
  .tax-tooltip::after {
    display: none;
  }
}
</style>
