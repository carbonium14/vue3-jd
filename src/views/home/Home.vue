<template>
    <div class="wrapper">
      <StaticPart></StaticPart>
      <NearBy></NearBy>
    </div>
    <Docker :currentIndex="0"></Docker>
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearBy from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'HOME',
  components: {
    StaticPart,
    NearBy,
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
  padding: 0 0.18rem 0.1rem 0.18rem;
}
</style>
