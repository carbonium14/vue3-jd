<template>
    <div class="products">
        <div class="products__title">{{ shopName }}</div>
        <div class="products__wrapper">
            <div class="products__list">
                <div class="products__item" v-for="item in productList" :key="item._id">
                    <img class="products__item__img" :src="item.imgUrl" alt="图片">
                    <div class="products__item__detail">
                        <h4 class="products__item__title">{{ item.name }}</h4>
                        <p class="products__item__price">
                            <span class="products__item__single">
                                <span class="products__item__yen">&yen;</span>{{ item.price }} x {{ item.count }}
                            </span>
                            <span class="products__item__total">
                                <span class="products__item__yen">&yen;</span>{{ (item.price * item.count).toFixed(2) }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '@/effects/cartEffect'
import { useRoute } from 'vue-router'
export default {
  name: 'ProduceList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return {
      productList,
      shopName
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.products {
    margin: 0.16rem 0.18rem 0.1rem 0.18rem;
    background-color: $bgColor;
    &__title {
        font-size: 0.16rem;
        color: $content-fontcolor;
        padding: 0.16rem 0.16rem 0.16rem 0.16rem;
    }
    &__wrapper {
        overflow-y: scroll;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.6rem;
        top: 2.61rem;
        margin: 0 0.18rem;
    }
    &__list {
        background-color: $bgColor;
    }
    &__item {
        position: relative;
        display: flex;
        padding: 0 0.16rem 0.16rem 0.16rem;
        &__img {
            width: 0.46rem;
            height: 0.46rem;
            margin-right: 0.16rem;
        }
        &__detail {
            flex: 1;
        }
        &__title {
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $content-fontcolor;
            margin: 0;
            @include ellipsis;
        }
        &__price {
            display: flex;
            margin: 0.06rem 0 0 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $highlight-fontColor;
        }
        &__total {
            text-align: right;
            flex: 1;
            color: $dark-fontColor;
        }
        &__yen {
            font-size: 0.12rem;
        }
    }
}
</style>
