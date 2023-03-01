<template>
    <div class="wrapper">
        <div class="title">我的全部购物车</div>
        <template v-for="(cart, key) in list" :key="key">
          <div class="cart" v-if="cart.total !== 0" @click="() => handleCartClick(key)">
            <div class="cart__title">{{ cart.shopName }}</div>
            <template v-for="(product, innerkey) in cart.productList" :key="innerkey">
              <div class="cart__item" v-if="product.count !== 0">
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
            </template>
            <div class="cart__total" @click.stop="showAll">
              共计{{ cart.total }}件&nbsp;&nbsp;{{ full ? '↑' : '↓' }}
            </div>
          </div>
        </template>
        <div v-if="isEmpty || Object.keys(list).length === 0" class="empty">暂无购物数据</div>
    </div>
    <Docker :currentIndex="1"></Docker>
</template>

<script>
import Docker from '@/components/Docker.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
export default {
  name: 'CartList',
  components: {
    Docker
  },
  setup () {
    const router = useRouter()
    const list = JSON.parse(localStorage.cartList || '{}')
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
    const isEmpty = computed(() => {
      let empty = false
      for (const i in list) {
        empty = list[i].total === 0
      }
      return empty
    })
    const handleCartClick = (key) => {
      router.push(`/orderConfirmation/${key}`)
    }
    const full = ref(false)
    const showAll = () => {
      full.value = !full.value
    }
    return {
      list,
      handleCartClick,
      isEmpty,
      showAll,
      full
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
  @include empty;
}
</style>
