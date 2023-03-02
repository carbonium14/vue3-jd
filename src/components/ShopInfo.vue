<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgUrl" alt="图片">
        <div :class="{'shop__content': true, 'shop__content__bordered': hideBorder ? false : true}">
            <div class="shop__content__title">{{ item.name }}</div>
            <div class="shop__content__tags">
                <span class="shop__content__tag">月售: {{ item.sales }}</span>
                <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
                <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
            </div>
            <p class="shop__content__highlight">{{ item.slogan }}</p>
            <div class="shop__products" v-if="item.products">
              <div class="shop__product" v-for="product in item.products" :key="product.name">
                <img class="shop__product__img" :src="product.imgUrl" alt="图片">
                <p class="shop__product__title">{{ product.name }}</p>
                <p class="shop__product__price">
                  <span class="yen">&yen;</span><span class="price">{{ product.price }}</span>
                  <span class="origin" v-if="product.price !== product.oldPrice">&yen;{{ product.oldPrice }}</span>
                </p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    item: {
      type: Object
    },
    hideBorder: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.shop {
      display: flex;
      padding-top: 0.12rem;
      &__img {
        margin-right: 0.16rem;
        width: 0.56rem;
        height: 0.56rem;
      }
    &__content {
      flex: 1;
      padding-bottom: 0.12rem;
      &__bordered {
        border-bottom: 0.01rem solid $content-bgcolor;
      }
      &__title {
        line-height: 0.22rem;
        font-size: 0.16rem;
        color: $content-fontcolor;
      }
      &__tags {
        margin-top: 0.08rem;
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: $content-fontcolor;
      }
      &__tag {
        margin-right: 0.16rem;
      }
      &__highlight {
        color: $highlight-fontColor;
        line-height: 0.18rem;
        font-size: 0.13rem;
        margin: 0.08rem 0 0 0;
      }
    }
    &__products {
      margin: 0.08rem 0.07rem 0 -0.18rem;
      overflow: hidden;
    }
    &__product {
      width: 33.33%;
      box-sizing: border-box;
      padding-left: 0.18rem;
      float: left;
      &__img {
        width: 100%;
      }
      &__title {
        font-size: 0.12rem;
        color: $content-fontcolor;
        line-height: 0.17rem;
        margin: 0.04rem 0 0 0;
        @include ellipsis
      }
      &__price {
        margin: 0.02rem 0 0.12rem 0;
        line-height: 0.2rem;
        color: $medium-fontColor;
        font-size: 0.14rem;
        @include ellipsis;
        .yen {
          font-size: 0.12rem;
          color: $highlight-fontColor;
        }
        .price {
          color: $highlight-fontColor;
        }
        .origin {
          font-size: 0.12rem;
          margin-left: 0.06rem;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
