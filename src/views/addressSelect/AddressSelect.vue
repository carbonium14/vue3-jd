<template>
    <div class="wrapper">
      <div class="title">
        选择地址
      </div>
      <div class="address" v-if="addressList.length > 0">
        <div class="address__item" v-for="address in addressList" :key="address._id" @click="() => handleAddressClick(address._id)">
          <p class="address__item__basic">
            {{ address.name }}
            <span class="address__item__phone">{{ address.phone }}</span>
          </p>
          <p class="address__item__address">
            {{ `${address.city} ${address.department} ${address.houseNumber}` }}
          </p>
        </div>
      </div>
      <div class="empty" v-else>暂无地址信息</div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import { useRouter, useRoute } from 'vue-router'
const useAddressListListEffect = () => {
  const addressList = ref([])
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data
    }
  }
  return {
    addressList,
    getAddressList
  }
}
export default {
  name: 'AddressSelect',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { addressList, getAddressList } = useAddressListListEffect()
    getAddressList()
    const handleAddressClick = (id) => {
      const path = route.query.path
      router.push(`${path}?addressId=${id}`)
    }
    return {
      addressList,
      handleAddressClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: $dark-bgcolor;
}
.title {
  position: relative;
  @include title;
}
.address {
  margin: 0.16rem 0.18rem 0 0.18rem;
  &__item {
    margin-bottom: 0.16rem;
    background-color: $bgColor;
    border-radius: 0.04rem;
    padding: 0.18rem 0.63rem 0.18rem 0.16rem;
    box-sizing: border-box;
    position: relative;
    &__basic {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $medium-fontColor;
      margin: 0;
    }
    &__phone {
      margin-left: 0.66rem;
    }
    &__address {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      margin: 0.08rem 0 0 0;
    }
  }
}
.empty {
  @include empty;
}
</style>
