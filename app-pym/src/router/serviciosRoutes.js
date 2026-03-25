const serviciosRoutes = [
  {
    path: 'servicios',
    component: () => import('pages/servicios/ServiciosIndex.vue'),
  },
  {
    path: 'paginas-web',
    component: () => import('pages/servicios/PaginasWeb.vue'),
  },
  {
    path: 'paginas-web/previsualiza',
    component: () => import('pages/servicios/PaginasWebPrevisualiza.vue'),
  },
  {
    path: 'paginas-web/solicitud',
    component: () => import('pages/servicios/PaginasWebSolicitud.vue'),
  },
  {
    path: 'sistemas-web',
    component: () => import('pages/servicios/SistemasWeb.vue'),
  },
  {
    path: 'sistemas-web/previsualiza',
    component: () => import('pages/servicios/SistemasWebPrevisualiza.vue'),
  },
  {
    path: 'sistemas-web/solicitud',
    component: () => import('pages/servicios/SistemasWebSolicitud.vue'),
  },
  {
    path: 'ecommerce',
    component: () => import('pages/servicios/EcommercePage.vue'),
  },
  {
    path: 'ecommerce/previsualiza',
    component: () => import('pages/servicios/EcommercePrevisualiza.vue'),
  },
  {
    path: 'ecommerce/solicitud',
    component: () => import('pages/servicios/EcommerceSolicitud.vue'),
  },
  {
    path: 'mantenimiento-equipos',
    component: () => import('pages/servicios/MantenimientoEquipos.vue'),
  },
  {
    path: 'mantenimiento-equipos/planes',
    component: () => import('pages/servicios/MantenimientoEquiposPlanes.vue'),
  },
  {
    path: 'presentacion',
    component: () => import('pages/presentacion/PresentacionIndex.vue'),
  },
]

export default serviciosRoutes
