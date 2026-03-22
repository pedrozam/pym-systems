<template>
  <q-page class="q-pa-md">
    <div class="text-center text-white mb-6">
      <h2 class="text-3xl font-bold">Nuestros Servicios</h2>
      <p class="text-base text-cyan-200">Elige el que más se ajusta a tu proyecto y avanza con tu transformación
        digital.</p>
    </div>

    <!-- <q-banner class="bg-blue-grey-9 text-white mb-6" rounded>
      <div>
        A continuación puedes conocer nuestros servicios.
      </div>
    </q-banner>

    <q-btn to="/servicios" label="Refrescar lista" color="cyan" class="mb-1" /> -->

    <div class="q-gutter-md grid grid-cols-1 md:grid-cols-2 p-6">
      <CardServicios v-for="(servicio, index) in servicios" :key="servicio.nombre_servicio" :service="servicio"
        :index="index" />
    </div>
  </q-page>
</template>

<script setup>
import CardServicios from 'components/cards/CardServicios.vue'

const servicios = [
  {
    nombre_servicio: 'Páginas web - Landing Page',
    descripcion:
      'Para tu negocio, emprendimiento, empresa, o incluso personales para profesionales independientes, entre otros.',
    image: '../src/assets/servicios/1.png',
    costo_servicio: 'Desde los 350 Bs.',
    costo_alojamiento: 'Desde los 80 Bs. mensuales',
    costo_dominio: 'Si lo necesitas, desde los 120 Bs. anuales',
    costo_correo: 'Si lo necesitas, desde 40 Bs. mensuales',
    ventajas:
      'Diseño personalizado|Metodología ágil de desarrollo|Reuniones cada 3 días|Panel de administración|Incluye acceso de tus redes sociales|Tu proyecto estará preparado para convertirse en un sistema web modular',
    tiempo: 'Desde los 7 días',
    boton1: 'Más información',
    icono1: 'info',
    ruta1: '/paginas-web',
    boton2: 'Pre visualiza',
    icono2: 'visibility',
    ruta2: '/paginas-web/previsualiza',
    boton3: 'Solicítalo ahora',
    icono3: 'shopping_cart',
    ruta3: '/paginas-web/solicitud',
  },
  {
    nombre_servicio: 'Sistemas web',
    descripcion:
      'La automatización de tu empresa o negocio llegó; explícanos los procesos manuales o semi-automáticos que podrías estar realizando y las posibles dificultades que tienes. Nosotros nos contactamos y te haremos una propuesta de automatización.',
    image: '../src/assets/servicios/3.png',
    costo_servicio: 'Desde los 1500 Bs.',
    costo_alojamiento: 'Desde los 150 Bs. mensuales',
    costo_dominio: 'Si lo necesitas, desde los 120 Bs. anuales',
    costo_correo: 'Si lo necesitas, desde 40 Bs. mensuales',
    ventajas:
      'Diseño personalizado a medida|Metodología ágil de desarrollo|Reuniones cada 3 días y entrega de avances semanales de acuerdo a tu cronograma|Incluye manuales de usuario|Puede incluir tu página web',
    tiempo: 'Desde los 15 días (según tu necesidad, ahondaremos esfuerzos y equipo de desarrollo para ayudarte)',
    boton1: 'Más información',
    icono1: 'info',
    ruta1: '/sistemas-web',
    boton2: 'Pre visualiza',
    icono2: 'visibility',
    ruta2: '/sistemas-web/previsualiza',
    boton3: 'Solicítalo ahora',
    icono3: 'shopping_cart',
    ruta3: '/sistemas-web/solicitud',
  },
  {
    nombre_servicio: 'Sitios E-Commerce',
    descripcion:
      'Este servicio está orientado a emprendimientos, negocios y empresas que necesitan automatizar sus ventas en línea.',
    image: '../src/assets/servicios/4.png',
    costo_servicio: 'Desde los 1500 Bs.',
    costo_alojamiento: 'Desde los 150 Bs. mensuales',
    costo_dominio: 'Si lo necesitas, desde los 120 Bs. anuales',
    costo_correo: 'Si lo necesitas, desde 40 Bs. mensuales',
    ventajas:
      'Catálogo de tus productos|Carrito de compras|Diseño personalizado a medida|Metodología ágil de desarrollo|Reuniones cada 3 días y entrega de avances semanales de acuerdo a tu cronograma|Incluye manuales de usuario|Panel de administración de cuentas|Cobros por QR|Facturación electrónica',
    tiempo: 'Desde los 20 días (según tu necesidad, ahondaremos esfuerzos y equipo de desarrollo para ayudarte)',
    boton1: 'Más información',
    icono1: 'info',
    ruta1: '/ecommerce',
    boton2: 'Pre visualiza',
    icono2: 'visibility',
    ruta2: '/ecommerce/previsualiza',
    boton3: 'Solicítalo ahora',
    icono3: 'shopping_cart',
    ruta3: '/ecommerce/solicitud',
  },
  {
    nombre_servicio: 'Servicio de mantenimiento de equipos',
    descripcion:
      'Si en tu casa, oficina o lugar donde tengas equipos CPU, laptops, MAC o impresoras, necesitas soporte y asistencia técnica, contrata un plan para que te apoyemos en todo momento.',
    image: '../src/assets/servicios/2.png',
    costo_servicio: 'Desde los 100 Bs.',
    costo_alojamiento: null,
    costo_dominio: null,
    costo_correo: null,
    ventajas:
      'Diagnóstico y relevamiento de tus equipos|Soporte las 24 horas los 365 días del año, virtual o presencial|Actualización de software (programas, drivers, etc.)|Actualización de componentes (discos HDD a SSD, memorias RAM, tarjetas de video, tarjetas de red, tarjetas de sonido, etc.)|Provisión de suministros en tinta o tóner para impresoras',
    tiempo: 'De acuerdo a tu solicitud',
    boton1: 'Más información',
    icono1: 'info',
    ruta1: '/mantenimiento-equipos',
    boton2: 'Planes',
    icono2: 'list',
    ruta2: '/mantenimiento-equipos/planes',
    boton3: null,
    icono3: null,
    ruta3: null,
  },
]
</script>
