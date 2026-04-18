import paginaRoutes from './paginaRoutes'
import bbqRoutes  from  './bbqRoutes'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      ...paginaRoutes,
    ],
  },
  {
    path: '/bbq',
    component: () => import('layouts/BbqLayout.vue'),
    children: [
      { path: '', component: () => import('pages/bbq/IndexBbq.vue') },
      ...bbqRoutes,
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/ErrorLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ErrorNotFound.vue') },
    ],
  },
]

export default routes
