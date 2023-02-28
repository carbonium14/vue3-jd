<template>
    <div class="wrapper">
        <div class="search">
            <span class="iconfont">&#xe62d;</span>
            <input type="text" class="search__area" @change="handleSearchChange" placeholder="山姆会员商店优惠商品">
            <div class="search__cancel" @click="handleCancelSearchClick">取消</div>
        </div>
        <div class="area" v-if="history.length">
            <h4 class="area__title">
                搜索历史
                <span class="area__title__clear" @click="handleClearHistoryClick">清除搜索历史</span>
            </h4>
            <ul class="area__list">
                <li class="area__list__item" v-for="item in history" :key="item" @click="() => goToSearchList(item)">{{ item }}</li>
            </ul>
        </div>
        <div class="area">
            <h4 class="area__title">热门搜索</h4>
            <ul class="area__list">
                <li class="area__list__item" v-for="item in hotWordList" :key="item" @click="() => goToSearchList(item)">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/utils/request'
const useHotWordListEffect = () => {
  const hotWordList = ref([])
  const getHotWordList = async () => {
    const result = await get('/api/shop/search/hot-words')
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data
    }
  }
  return {
    hotWordList,
    getHotWordList
  }
}
export default {
  name: 'SEARCH',
  setup () {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.history || '[]'))
    const handleSearchChange = (e) => {
      const searchValue = e.target.value
      if (!searchValue) {
        return
      }
      const hasValue = history.value.find(item => item === searchValue)
      if (!hasValue) {
        history.value.push(searchValue)
        localStorage.history = JSON.stringify(history.value)
      }
      //   e.target.value = ''
      router.push(`/searchList?keyword=${searchValue}`)
    }
    const handleClearHistoryClick = () => {
      history.value = []
      localStorage.history = JSON.stringify([])
    }
    const handleCancelSearchClick = () => {
      router.back()
    }
    const { hotWordList, getHotWordList } = useHotWordListEffect()
    getHotWordList()
    const goToSearchList = (keyword) => {
      router.push(`/searchList?keyword=${keyword}`)
    }
    return {
      handleSearchChange,
      history,
      handleClearHistoryClick,
      handleCancelSearchClick,
      hotWordList,
      goToSearchList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
    margin: 0 0.18rem;
    .search {
        display: flex;
        position: relative;
        line-height: 0.32rem;
        margin-top: 0.16rem;
        .iconfont {
            position: absolute;
            left: 0.16rem;
            color: $search-fontColor;
        }
        &__area {
            flex: 1;
            background-color: $search-bgcolor;
            border-radius: 0.16rem;
            border: none;
            outline: none;
            padding: 0 0.12rem 0 0.44rem;
            color: $content-fontcolor;
            font-size: 0.14rem;
        }
        &__cancel {
            margin-left: 0.12rem;
            color: $content-fontcolor;
            font-size: 0.16rem;
        }
    }
    .area {
        margin-top: 0.24rem;
        &__title {
            line-height: 0.22rem;
            font-size: 0.16rem;
            color: $content-fontcolor;
            margin: 0;
            &__clear {
                float: right;
                font-size: 0.14rem;
                font-weight: normal;
            }
        }
        &__list {
            margin: 0 0 0 -0.1rem;
            padding: 0;
            list-style-type: none;
            &__item {
                display: inline-block;
                background-color: $search-bgcolor;
                font-size: 0.14rem;
                line-height: 0.32rem;
                border-radius: 0.02rem;
                color: $light-fontColor;
                padding: 0 0.1rem;
                margin-left: 0.1rem;
                margin-top: 0.12rem;
            }
        }
    }
}
</style>
