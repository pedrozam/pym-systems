const serviciosRoutes = [
  {
    path: 'servicios',
    component: () => import('pages/servicios/ServiciosIndex.vue'),
  },
  {
    path: 'tecnologias',
    component: () => import('pages/presentacion/TecnologiasIndex.vue'),
  },
  {
    path: 'quienes-somos',
    component: () => import('pages/presentacion/QuienesSomos.vue'),
  },
]

export default serviciosRoutes
