<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
        <div class="product__header">
            <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
                <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"></span>
                全选
            </div>
            <div class="product__header__clear">
                <span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)">清空购物车</span>
            </div>
        </div>
        <div class="product__item" v-for="item in productList" :key="item._id">
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
                <span class="product__number__minus iconfont" @click="()=>changeCartItemInfo(shopId, item._id, item, -1)">&#xe691;</span>
                {{ item.count || 0 }}
                <span class="product__number__plus iconfont" @click="()=>changeCartItemInfo(shopId, item._id, item, 1)">&#xe668;</span>
            </div>
        </div>
    </div>
    <div class="check">
        <div class="check__icon">
            <img class="check__icon__img" @click="handleCartShowChange" src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="图片">
            <div class="check__icon__tag">{{ calculations.total }}</div>
        </div>
        <div class="check__info">
            总计:<span class="check__info__price">&nbsp;&yen; {{ calculations.price }}</span>
        </div>
        <div class="check__btn" v-show="calculations.total > 0">
          <router-link :to="{path: `/orderConfirmation/${shopId}`}" >去结算</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffect'
const useCartEffect = (shopId) => {
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  const store = useStore()
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
    calculations
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
    const { calculations, productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useCartEffect(shopId)
    return {
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange,
      calculations
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
        &__minus {
            position: relative;
            top: 0.02rem;
            color: $medium-fontColor;
            margin-right: 0.05rem;
        }
        &__plus {
            position: relative;
            top: 0.02rem;
            color: $button-bgcolor;
            margin-left: 0.05rem;
        }
    }
}
</style>
