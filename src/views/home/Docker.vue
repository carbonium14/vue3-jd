<template>
  <div class="docker">
      <div v-for="(item, index) in dockerList" :key="index" class="docker__item"
      :class="{'docker__item': true, 'docker__item--active':index===0 ? true : false}">
        <router-link :to="item.to">
          <div class="iconfont" v-html="item.icon"></div>
          <div class="docker__title">{{ item.text }}</div>
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DOCKER',
  setup () {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe7e5;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe61e;', text: '订单', to: { name: 'Home' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  padding: 0 0.18rem;
  box-sizing: border-box;
  border-top: 0.01rem solid $content-bgcolor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
