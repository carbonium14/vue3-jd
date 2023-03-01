<template>
    <div class="order">
        <div class="order__price">实付金额:&nbsp;<b>&yen;{{ calculations.price }}</b></div>
        <div v-show="showSubmitBtn" class="order__btn" @click="() => handleSubmitClick(true)">提交订单</div>
    </div>
    <div class="mask" v-show="showConfirm" @click="() => handleSubmitClick(false)">
      <div class="mask__content" @click.stop>
        <h3 class="mask__content__title">确认要离开收银台?</h3>
        <p class="mask__content__desc">尽快完成支付,否则订单会被取消</p>
        <div class="mask__content__btns">
          <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
          <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirmOrder(false)">确认支付</div>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '@/effects/cartEffect'
import { useRoute, useRouter } from 'vue-router'
import { post } from '@/utils/request'
import { useToastEffect } from '@/components/Toast.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
const useMakeOrderEffect = (productList, shopId, shopName, addressId) => {
  const router = useRouter()
  const store = useStore()
  const { showToast } = useToastEffect()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({
        id: parseInt(product.id, 10),
        num: product.count
      })
    }
    try {
      const result = await post('/api/order', {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        const cartList = JSON.parse(localStorage.cartList || '{}')
        delete cartList[shopId]
        localStorage.cartList = JSON.stringify(cartList)
        store.commit('clearCartData', {
          shopId
        })
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      showToast(e)
    }
  }
  return {
    handleConfirmOrder
  }
}
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (status) => {
    showConfirm.value = status
  }
  return {
    showConfirm,
    handleSubmitClick
  }
}
export default {
  name: 'ORDER',
  setup () {
    const route = useRoute()
    const shopId = +route.params.id
    const addressId = route.query.addressId
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(productList, shopId, shopName, addressId)
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    return {
      showSubmitBtn: !!addressId,
      calculations,
      handleConfirmOrder,
      showConfirm,
      handleSubmitClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    background: $bgColor;
    &__price {
        flex: 1;
        text-indent: 0.24rem;
        color: $content-fontcolor;
        font-size: 0.14rem;
    }
    &__btn {
        width: 0.98rem;
        background: #4fb0f9;
        color: $bgColor;
        text-align: center;
        font-size: 0.14rem;
    }
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  background: rgba(0,0,0,0.5);
  &__content {
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border-radius: 0.04rem;
    &__title {
      font-size: 0.18rem;
      color: #333;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #666;
      margin: 0.08rem 0 0 0;
    }
    &__btns {
      margin: 0.24rem 0.58rem;
      display: flex;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        color: #4fb0f9;
        border: 0.01rem solid #4fb0f9;
      }
      &--last {
        margin-left: 0.12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
