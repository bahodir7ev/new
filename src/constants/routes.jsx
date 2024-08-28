import { Banners, Categories, Dashboard, Orders, Products } from '../pages'

export const routes = [
  {
    id: 1,
    path: '/',
    component: <Dashboard />,
  },
  {
    id: 2,
    path: '/products',
    component: <Products />,
  },
  {
    id: 3,
    path: '/categories',
    component: <Categories />,
  },
  {
    id: 4,
    path: '/orders',
    component: <Orders />,
  },
  {
    id: 5,
    path: '/banners',
    component: <Banners />,
  },
]
