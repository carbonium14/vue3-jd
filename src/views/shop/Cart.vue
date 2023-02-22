<template>
  <div class="mask" v-if="showCart && caculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && caculations.total > 0">
        <div class="product__header">
            <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
                <span class="product__header__icon iconfont" v-html="caculations.allChecked ? '&#xe652;' : '&#xe667;'"></span>
                全选
            </div>
            <div class="product__header__clear">
                <span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)">清空购物车</span>
            </div>
        </div>
        <template v-for="item in productList" :key="item._id">
            <div class="product__item" v-if="item.count > 0">
                <div class="product__item__checked iconfont" v-html="item.check ? '&#xe652;' : '&#xe667;'"
                    @click.stop="() => changeCartItemChecked(shopId, item._id)">
                </div>
                <img class="product__item__img" :src="item.imgUrl" alt="图片">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{ item.name }}</h4>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{ item.price }}
                        <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus" @click="()=>changeCartItemInfo(shopId, item._id, item, -1)">-</span>
                    {{ item.count || 0 }}
                    <span class="product__number__plus" @click="()=>changeCartItemInfo(shopId, item._id, item, 1)">+</span>
                </div>
            </div>
        </template>
    </div>
    <div class="check">
        <div class="check__icon">
            <img class="check__icon__img" @click="handleCartShowChange" src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="图片">
            <div class="check__icon__tag">{{ caculations.total }}</div>
        </div>
        <div class="check__info">
            总计:<span class="check__info__price">&nbsp;&yen; {{ caculations.price }}</span>
        </div>
        <div class="check__btn">
          <router-link :to="{name: 'Home'}" >去结算</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useCommonCartEffect } from './commonCartEffect'
const useCartEffect = (shopId) => {
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const caculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = {
      total: 0,
      price: 0,
      allChecked: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    return result
  })
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    })
  }
  return {
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked,
    caculations
  }
}
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return {
    handleCartShowChange,
    showCart
  }
}
export default {
  name: 'CART',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { handleCartShowChange, showCart } = toggleCartEffect()
    const { caculations, productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useCartEffect(shopId)
    return {
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
      caculations
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
}
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: $bgColor;
}
.check {
    display: flex;
    line-height: 0.49rem;
    height: 0.49rem;
    border-top: 0.01rem solid $content-bgcolor;
    &__icon {
        position: relative;
        width: 0.84rem;
        &__img {
            width: 0.28rem;
            height: 0.26rem;
            display: block;
            margin: 0.12rem auto;
        }
        &__tag {
            position: absolute;
            left: 0.46rem;
            top: 0.04rem;
            padding: 0 0.04rem;
            min-width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            background-color: $highlight-fontColor;
            border-radius: 0.1rem;
            font-size: 0.12rem;
            text-align: center;
            color: $bgColor;
            transform: scale(0.5);
            transform-origin: left center;
        }
    }
    &__info {
        flex: 1;
        color: $content-fontcolor;
        font-size: 0.12rem;
        &__price {
            color: $highlight-fontColor;
            font-size: 0.18rem;
        }
    }
    &__btn {
        width: 0.98rem;
        background-color: #4fb0f9;
        font-size: 0.14rem;
        text-align: center;
        a {
          color: $bgColor;
          text-decoration: none;
        }
    }
}
.product {
    flex: 1;
    overflow-y: scroll;
    background-color: $bgColor;
    &__header {
        display: flex;
        line-height: 0.52rem;
        border-bottom: 0.01rem solid $content-bgcolor;
        color: $content-fontcolor;
        font-size: 0.14rem;
        &__all {
            width: 0.64rem;
            margin-left: 0.18rem;
        }
        &__clear {
            flex: 1;
            text-align: right;
            margin-right: 0.16rem;
            &__btn {
                display: inline-block;
            }
        }
        &__icon {
            display: inline-block;
            color: $button-bgcolor;
            font-size: 0.2rem;
            vertical-align: top;
            margin-right: 0.1rem;
        }
    }
    &__item {
        position: relative;
        display: flex;
        padding: 0.12rem 0;
        margin: 0 0.16rem;
        border-bottom: 0.01rem solid $content-bgcolor;
        &__checked {
            color: $button-bgcolor;
            font-size: 0.2rem;
            line-height: 0.5rem;
            margin-right: 0.2rem;
        }
        &__detail {
            overflow: hidden;
        }
        &__img {
            width: 0.46rem;
            height: 0.46rem;
            margin-right: 0.16rem;
        }
        &__title {
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $content-fontcolor;
            margin: 0;
            @include ellipsis;
        }
        &__price {
            margin: 0.06rem 0 0 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $highlight-fontColor;
        }
        &__yen {
            font-size: 0.12rem;
        }
        &__origin {
            margin-left: 0.06rem;
            line-height: 0.2rem;
            font-size: 0.12rem;
            color: $light-fontColor;
            text-decoration: line-through;
        }
    }
    &__number {
        position: absolute;
        right: 0;
        bottom: 0.26rem;
        &__minus, &__plus {
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.16rem;
            display: inline-block;
            border-radius: 50%;
            font-size: 0.2rem;
            text-align: center;
        }
        &__minus {
            border: 0.01rem solid $medium-fontColor;
            color: $medium-fontColor;
            margin-right: 0.05rem;
        }
        &__plus {
            background-color: $button-bgcolor;
            color: $bgColor;
            margin-left: 0.05rem;
        }
    }
}
</style>