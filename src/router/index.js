import { createRouter, createWebHistory } from 'vue-router'
const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: 'home' */ '../views/home/Home.vue')
}, {
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName: 'cart' */ '../views/cartList/CartList.vue')
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: 'shop' */ '../views/shop/Shop.vue')
}, {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: 'login' */ '../views/login/Login.vue'),
  beforeEnter: (to, from, next) => {
    const isLogin = localStorage.isLogin
    if (isLogin) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: 'register' */ '../views/register/Register.vue'),
  beforeEnter: (to, from, next) => {
    const isLogin = localStorage.isLogin
    if (isLogin) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  const isLoginOrRegister = (to.name === 'Login' || to.name === 'Register')
  if (isLogin || isLoginOrRegister) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
