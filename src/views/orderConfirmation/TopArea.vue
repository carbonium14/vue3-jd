<template>
    <div class="top">
        <div class="top__header">
            <div class="iconfont top__header__back" @click="handleBackClick">&#xe6f2;</div>
            确认订单
        </div>
        <div class="top__receiver" @click="handleAddressClick">
            <div class="top__receiver__title">收货地址</div>
            <div class="top__receiver__address">{{ hasAddress ? `${data.city} ${data.department} ${data.houseNumber}` : '请选择收货地址' }}</div>
            <div v-if="hasAddress" class="top__receiver__info">
                <span class="top__receiver__info__name">{{ data.name }}</span>
                <span class="top__receiver__info__name">{{ data.phone }}</span>
            </div>
            <div class="iconfont top__receiver__icon">&#xe6f2;</div>
        </div>
    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, reactive } from 'vue'
import { get } from '@/utils/request'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const addressId = route.query.addressId
    const data = reactive({})
    const handleBackClick = () => {
      router.back()
    }
    const handleAddressClick = () => {
      router.push(`/addressSelect?path=${route.path}`)
    }
    onBeforeMount(async () => {
      if (addressId) {
        const result = await get(`/api/user/address/${addressId}`)
        if (result?.errno === 0) {
          data.city = result.data.city
          data.department = result.data.department
          data.houseNumber = result.data.houseNumber
          data.name = result.data.name
          data.phone = result.data.phone
        }
      }
    })
    return {
      hasAddress: !!addressId,
      handleBackClick,
      handleAddressClick,
      data
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.top {
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg,rgba(0,145,255,0.00) 4%,$button-bgcolor 50%);
    background-repeat: no-repeat;
    position: relative;
    &__header {
        padding-top: 0.26rem;
        line-height: 0.24rem;
        color: $bgColor;
        text-align: center;
        position: relative;
        font-size: 0.16rem;
        &__back {
            position: absolute;
            left: 0.18rem;
        }
    }
    &__receiver {
        position: absolute;
        left: 0.18rem;
        right: 0.18rem;
        bottom: 0;
        height: 1.11rem;
        background: $bgColor;
        border-radius: 0.04rem;
        &__title {
            padding: 0.16rem 0 0.14rem 0.16rem;
            font-size: 0.16rem;
            line-height: 0.22rem;
            color: $content-fontcolor;
        }
        &__address {
            padding: 0 0.4rem 0 0.16rem;
            color: $content-fontcolor;
            font-size: 0.14rem;
            line-height: 0.2rem;
        }
        &__info {
            padding: 0.06rem 0 0 0.16rem;
            &__name {
                color: $light-fontColor;
                font-size: 0.12rem;
                line-height: 0.18rem;
                margin-right: 0.06rem;
            }
        }
        &__icon {
            position: absolute;
            right: 0.16rem;
            top: 0.5rem;
            color: $light-fontColor;
            font-size: 0.2rem;
            transform: rotate(180deg);
        }
    }
}
</style>
