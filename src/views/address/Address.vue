<template>
    <div class="wrapper">
      <div class="title">
        <span class="iconfont" @click="handleBackClick">&#xe6f2;</span>
        我的地址
        <span class="title__create">
          <router-link to="/addressEdit">新建</router-link>
        </span>
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
          <div class="iconfont">&#xe6f2;</div>
        </div>
      </div>
      <div class="empty" v-else>暂无地址信息</div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '@/utils/request'
import { useRouter } from 'vue-router'
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
  name: 'ADDRESS',
  setup () {
    const router = useRouter()
    const { addressList, getAddressList } = useAddressListListEffect()
    getAddressList()
    const handleAddressClick = (id) => {
      router.push(`/addressEdit?id=${id}`)
    }
    const handleBackClick = () => {
      router.back()
    }
    return {
      addressList,
      handleAddressClick,
      handleBackClick
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
  position: relative;
  @include title;
  .iconfont {
    position: absolute;
    top: 0;
    left: 0.1rem;
    width: 0.32rem;
    font-size: 0.24rem;
    color: #b6b6b6;
    transform: rotate(0);
  }
    &__create {
      position: absolute;
      font-size: 0.14rem;
      right: 0.18rem;
      a {
        text-decoration: none;
        color: $content-fontcolor;
      }
    }
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
.iconfont {
    position: absolute;
    right: 0.16rem;
    top: 0.44rem;
    color: $light-fontColor;
    font-size: 0.2rem;
    transform: rotate(180deg);
}
.empty {
  @include empty;
}
</style>
