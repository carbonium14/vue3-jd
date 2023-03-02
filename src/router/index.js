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
  path: '/orderConfirmation/:id',
  name: 'OrderConfirmation/:id',
  component: () => import(/* webpackChunkName: 'orderConfirmation' */ '../views/orderConfirmation/OrderConfirmation.vue')
}, {
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: 'orderList' */ '../views/orderList/OrderList.vue')
}, {
  path: '/search',
  name: 'Search',
  component: () => import(/* webpackChunkName: 'search' */ '../views/search/Search.vue')
}, {
  path: '/searchList',
  name: 'SearchList',
  component: () => import(/* webpackChunkName: 'searchList' */ '../views/searchList/SearchList.vue')
}, {
  path: '/address',
  name: 'Address',
  component: () => import(/* webpackChunkName: 'address' */ '../views/address/Address.vue')
}, {
  path: '/my',
  name: 'My',
  component: () => import(/* webpackChunkName: 'my' */ '../views/my/My.vue')
}, {
  path: '/addressEdit',
  name: 'AddressEdit',
  component: () => import(/* webpackChunkName: 'addressEdit' */ '../views/addressEdit/AddressEdit.vue')
}, {
  path: '/addressSelect',
  name: 'AddressSelect',
  component: () => import(/* webpackChunkName: 'addressSelect' */ '../views/addressSelect/AddressSelect.vue')
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
