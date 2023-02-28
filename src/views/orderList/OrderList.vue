<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div class="order" v-for="(item, index) in list" :key="index">
                <div class="order__title">
                    {{ item.shopName }}
                    <span class="order__status">{{ item.isCanceled ? '已取消' : '已下单' }}</span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
                            <img :src="innerItem.product.img" v-if="innerIndex <= 3" alt="图片" class="order__content__img">
                        </template>
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">&yen;&nbsp;{{ item.totalPrice }}</div>
                        <div class="order__content__count">共&nbsp;{{ item.totalNumber }}&nbsp;件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2"></Docker>
</template>

<script>
import Docker from '@/components/Docker.vue'
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request'
const useOrderListEffect = () => {
  const data = reactive({
    list: []
  })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += productItem?.orderSales || 0
          totalPrice += productItem?.product?.price * productItem?.orderSales || 0
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return {
    list
  }
}
export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup () {
    const { list } = useOrderListEffect()
    return {
      list
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
.order {
    margin: 0.16rem 0.18rem;
    padding: 0.16rem;
    background-color: $bgColor;
    &__title {
        font-size: 0.16rem;
        color: $content-fontcolor;
        line-height: 0.22rem;
        margin-bottom: 0.16rem;
    }
    &__status {
        float: right;
        font-size: 0.14rem;
        color: $medium-fontColor;
    }
    &__content {
        display: flex;
        &__imgs {
            flex: 1;
        }
        &__img {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.12rem;
        }
        &__info {
            width: 0.7rem;
        }
        &__price {
            font-size: 0.14rem;
            color: $highlight-fontColor;
            text-align: right;
            line-height: 0.2rem;
            margin-bottom: 0.04rem;
        }
        &__count {
            font-size: 0.12rem;
            color: $content-fontcolor;
            text-align: right;
            line-height: 0.14rem;
        }
    }
}
</style>
