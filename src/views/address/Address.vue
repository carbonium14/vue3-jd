<template>
    <div class="wrapper">
      <div class="title">
        我的地址
        <span class="title__create">新建</span>
      </div>
    </div>
    <Docker :currentIndex="3"></Docker>
</template>

<script>
import Docker from '@/components/Docker.vue'
export default {
  name: 'ADDRESS',
  components: {
    Docker
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
    &__create {
      position: absolute;
      font-size: 0.14rem;
      right: 0.18rem;
    }
}
</style>
