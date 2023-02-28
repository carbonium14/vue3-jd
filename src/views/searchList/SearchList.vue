<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe62d;</span>
                <input type="text"
                    class="search__content__input"
                    placeholder="请输入商品名称"
                    v-model="keyword"
                    @change="handleSearchInputChange"/>
            </div>
        </div>
        <router-link v-for="item in searchList" :key="item._id" :to="`/shop/${item._id}`">
            <ShopInfo :item="item"></ShopInfo>
        </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo.vue'
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return {
    handleBackClick
  }
}
const useSearchListEffect = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    const result = await get('/api/shop/search', {
      keyword
    })
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data
    }
  }
  return {
    searchList,
    getSearchList
  }
}
export default {
  name: 'SearchList',
  components: {
    ShopInfo
  },
  setup () {
    const route = useRoute()
    const keyword = ref(route.query.keyword || '')
    const { handleBackClick } = useBackRouterEffect()
    const handleSearchInputChange = () => {
      getSearchList(keyword.value)
    }
    const { searchList, getSearchList } = useSearchListEffect()
    getSearchList(keyword.value)
    return {
      handleBackClick,
      keyword,
      handleSearchInputChange,
      searchList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
    padding: 0 0.18rem;
    a {
      text-decoration: none;
    }
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
            font-size: 0.14rem;
            &::placeholder {
                color: $content-fontcolor;
                font-size: 0.14rem;
            }
        }
    }
}
</style>
