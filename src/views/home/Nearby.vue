<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link v-for="item in nearbyList" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfo :item="item"></ShopInfo>
    </router-link>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { ref } from 'vue'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return {
    nearbyList,
    getNearbyList
  }
}
export default {
  name: 'NearBy',
  components: {
    ShopInfo
  },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.nearby {
    &__title {
      margin: 0.16rem 0 0.02rem 0;
      font-size: 0.18rem;
      font-weight: normal;
      color: $content-fontcolor;
    }
    a {
      text-decoration: none;
    }
}
</style>
