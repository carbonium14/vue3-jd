<template>
    <div class="wrapper">
        <div class="background">
            <div class="user" @click="handleLogoutClick">退出</div>
        </div>
        <div class="board">
            <div class="board__img"></div>
            <div class="board__name">{{ userInfo.username }}</div>
            <div class="board__id">ID: {{ userInfo._id }}</div>
            <div class="board__level">
                <div class="board__level__icon"></div>
                <div class="board__level__number">16</div>
            </div>
            <div class="board__tab">
                <div class="board__tab__item">
                    <div class="board__tab__name">红包</div>
                    <div class="board__tab__value">218</div>
                </div>
                <div class="board__tab__item">
                    <div class="board__tab__name">优惠券</div>
                    <div class="board__tab__value">12张</div>
                </div>
                <div class="board__tab__item">
                    <div class="board__tab__name">鲜豆</div>
                    <div class="board__tab__value">88</div>
                </div>
                <div class="board__tab__item">
                    <div class="board__tab__name">白条</div>
                    <div class="board__tab__value">1000</div>
                </div>
            </div>
        </div>
        <div class="tab">
            <div class="tab__item">
                <div class="tab__item__icon"></div>
                <div class="tab__item__info">我的钱包</div>
                <div class="tab__item__iconfont iconfont">&#xe6f2;</div>
            </div>
            <div class="tab__item" @click="handleAddressClick">
                <div class="tab__item__icon"></div>
                <div class="tab__item__info">我的地址</div>
                <div class="tab__item__iconfont iconfont">&#xe6f2;</div>
            </div>
            <div class="tab__item">
                <div class="tab__item__icon"></div>
                <div class="tab__item__info">客服与帮助</div>
                <div class="tab__item__iconfont iconfont">&#xe6f2;</div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="3"></Docker>
</template>

<script>
import Docker from '@/components/Docker.vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { get } from '@/utils/request'
const useUserEffect = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const result = await get('/api/user/info')
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data
      userInfo._id = _id || ''
      userInfo.username = username || ''
    }
  }
  getUserInfo()
  return userInfo
}
export default {
  name: 'MY',
  components: {
    Docker
  },
  setup () {
    const router = useRouter()
    const handleAddressClick = () => {
      router.push('/address')
    }
    const handleLogoutClick = () => {
      localStorage.removeItem('isLogin')
      router.push('/login')
    }
    const userInfo = useUserEffect()
    return {
      handleAddressClick,
      handleLogoutClick,
      userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.wrapper {
  overflow-y: auto;
  @include fix-content;
  background-color: $dark-bgcolor;
}
.background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
    .user {
        position: absolute;
        left: 3.3rem;
        top: 0.57rem;
        background-color: $bgColor;
        width: 0.24rem;
        height: 0.192rem;
        line-height: 0.192rem;
        text-align: center;
    }
}
.board {
    position: relative;
    z-index: 2;
    width: 3.39rem;
    height: 2.03rem;
    margin: 1.08rem 0.18rem 0 0.18rem;
    background: $bgColor;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.08);
    border-radius: 0.08rem;
    &__img {
        position: absolute;
        left: 1.23rem;
        right: 1.22rem;
        top: -0.47rem;
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 50%;
        background-color: $medium-fontColor;
    }
    &__name {
        width: 1.7rem;
        height: 0.36rem;
        font-size: 0.24rem;
        color: #262628;
        letter-spacing: 0.0019rem;
        text-align: center;
        line-height: 0.36rem;
        padding: 0.59rem 0.84rem 0 0.85rem;
    }
    &__id {
        width: 1.62rem;
        height: 0.17rem;
        font-size: 0.14rem;
        color: #C1C0C9;
        text-align: center;
        margin: 0.02rem 0.88rem 0 0.89rem;
    }
    &__level {
        position: absolute;
        top: 0.7rem;
        bottom: 1.18rem;
        left: 2.67rem;
        right: 0.37rem;
        background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
        border-radius: 0.075rem;
        &__icon {
            width: 0.11rem;
            height: 0.11rem;
            margin: 0.02rem 0 0.02rem 0.02rem;
            background: #FFC700;
            border-radius: 50%;
        }
        &__number {
            position: absolute;
            left: 0.17rem;
            top: 0.01rem;
            line-height: 0.12rem;
            font-size: 0.12rem;
            transform: scale(0.83);
            color: $bgColor;
            letter-spacing: -0.0036rem;
        }
    }
    &__tab {
        position: absolute;
        top: 1.26rem;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 0.01rem solid $content-bgcolor;
        display: flex;
        &__item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__name {
            margin-top: 0.13rem;
            font-size: 0.12rem;
            color: #C1C0C9;
            text-align: center;
        }
        &__value {
            font-size: 0.2rem;
            color: #262628;
            text-align: center;
            padding-top: 0.03rem;
            line-height: 0.28rem;
        }
    }
}
.tab {
    width: 3.39rem;
    height: 1.46rem;
    margin: 0.16rem 0.18rem 0 0.18rem;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0,0,0,0.08);
    border-radius: 0.08rem;
    &__item {
        flex: 1;
        display: flex;
        &__icon {
            width: 0.22rem;
            height: 0.22rem;
            margin-left: 0.16rem;
            margin-top: 0.16rem;
            background: #ED4A47;
            border-radius: 0.08rem;
        }
        &__info {
            font-size: 0.14rem;
            line-height: 0.2rem;
            color: #262626;
            margin-top: 0.17rem;
            margin-left: 0.12rem;
            flex: 1;
        }
        &__iconfont {
            width: 0.07rem;
            height: 0.12rem;
            color: #C2C4CA;
            margin-right: 0.16rem;
            margin-top: 0.25rem;
            font-size: 0.2rem;
            transform: rotate(180deg);
        }
    }
}
</style>
