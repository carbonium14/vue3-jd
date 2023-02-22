<template>
  <div class="wrapper">
    <div class="search">
        <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
        <div class="search__content">
            <span class="search__content__icon iconfont">&#xe62d;</span>
            <input type="text" class="search__content__input" placeholder="请输入商品名称"/>
        </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"></ShopInfo>
    <Content :shopName="item.name"></Content>
    <Cart></Cart>
  </div>
</template>

<script>
import ShopInfo from '@/components/ShopInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '@/utils/request'
import { reactive, toRefs } from 'vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return {
    item,
    getItemData
  }
}
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return {
    handleBackClick
  }
}
export default {
  name: 'SHOP',
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return {
      item,
      handleBackClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
    padding: 0 0.18rem;
}
.search {
    margin: 0.14rem 0 0.04rem 0;
    display: flex;
    line-height: 0.32rem;
    &__back {
        width: 0.32rem;
        font-size: 0.24rem;
        color: #b6b6b6;
    }
    &__content {
        display: flex;
        flex: 1;
        background-color: $search-bgcolor;
        border-radius: 0.16rem;
        &__icon {
            width: 0.44rem;
            text-align: center;
            color: $search-fontColor;
        }
        &__input {
            height: 0.32rem;
            border: none;
            outline: none;
            background: none;
            display: block;
            width: 100%;
            padding-right: 0.2rem;
            color: $content-fontcolor;
            &::placeholder {
                color: $content-fontcolor;
                font-size: 0.14rem;
            }
        }
    }
}
</style>
