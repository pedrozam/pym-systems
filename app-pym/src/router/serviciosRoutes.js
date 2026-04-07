const serviciosRoutes = [
  {
    path: 'servicios',
    component: () => import('pages/servicios/ServiciosIndex.vue'),
  },
  {
    path: 'presentacion',
    component: () => import('pages/presentacion/PresentacionIndex.vue'),
  },
  {
    path: 'quienes-somos',
    component: () => import('pages/presentacion/QuienesSomos.vue'),
  },
]

export default serviciosRoutes
