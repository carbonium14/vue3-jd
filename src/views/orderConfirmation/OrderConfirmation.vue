<template>
    <div class="wrapper">
        <TopArea></TopArea>
        <ProductList></ProductList>
        <Order></Order>
    </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: {
    TopArea,
    ProductList,
    Order
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
    overflow-y: scroll;
}
</style>
