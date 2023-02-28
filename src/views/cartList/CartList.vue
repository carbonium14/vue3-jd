<template>
    <div class="wrapper">
        <div class="title">我的全部购物车</div>
        <div class="cart" v-for="(cart, key) in list" :key="key" @click="() => handleCartClick(key)">
          <div class="cart__title">{{ cart.shopName }}</div>
          <div class="cart__item" v-for="(product, innerkey) in cart.productList" :key="innerkey">
            <img class="cart__image" :src="product.imgUrl" alt="图片">
            <div class="cart__content">
              <p class="cart__content__title">{{ product.name }}</p>
              <p class="cart__content__price">
                <span class="yen">&yen;</span>{{ product.price }} x {{ product.count }}
                <span class="cart__content__total">
                  <span class="yen">&yen;</span>{{ (product.price * product.count).toFixed(2) }}
                </span>
              </p>
            </div>
          </div>
          <div class="cart__total">
            共计{{ cart.total }}件
          </div>
        </div>
        <div v-if="Object.keys(list).length === 0" class="empty">暂无购物数据</div>
    </div>
    <Docker :currentIndex="1"></Docker>
</template>

<script>
import Docker from '@/components/Docker.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'CartList',
  components: {
    Docker
  },
  setup () {
    const router = useRouter()
    const list = JSON.parse(localStorage.cartList || '[]')
    for (const i in list) {
      const cart = list[i]
      const productList = cart.productList
      let total = 0
      for (const j in productList) {
        const product = productList[j]
        total += product.count
      }
      cart.total = total
    }
    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`)
    }
    return {
      list,
      handleCartClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
  overflow-y: auto;
  @include fix-content;
  background-color: $dark-bgcolor;
}
.title {
  @include title;
}
.cart {
  margin: 0.16rem;
  padding-bottom: 0.16rem;
  background-color: $bgColor;
  &__title {
    padding: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    @include ellipsis;
  }
  &__item {
    display: flex;
    padding: 0 0.16rem 0.16rem 0.16rem;
  }
  &__image {
    width: 0.46rem;
    height: 0.46rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    .yen {
      font-size: 0.12rem;
    }
    &__title {
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
      line-height: 0.2rem;
      margin: 0;
    }
    &__price {
      margin: 0;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__total {
      float: right;
      color: $dark-fontColor;
    }
  }
  &__total {
    line-height: 0.28rem;
    margin: 0 0.16rem 0 0.16rem;
    color: $medium-fontColor;
    font-size: 0.14rem;
    text-align: center;
    background-color: $search-bgcolor;
  }
}
.empty {
  text-align: center;
  line-height: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.16rem;
  color: $light-fontColor;
}
</style>
