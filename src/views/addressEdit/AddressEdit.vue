<template>
    <div class="wrapper">
      <div class="title">
        <span class="iconfont" @click="handleBackClick">&#xe6f2;</span>
        {{ id!==undefined ? '编辑地址' : '新建地址'}}
        <span class="title__save" @click="handleSaveClick">保存</span>
      </div>
      <div class="content">
        <div class="content__item">
          <span class="content__item__label">所在城市:&nbsp;</span>
          <input type="text" class="content__item__input" placeholder="请输入所在城市" v-model="city"/>
        </div>
        <div class="content__item">
          <span class="content__item__label">小区/大厦/学校:&nbsp;</span>
          <input type="text" class="content__item__input" placeholder="请输入小区/大厦/学校" v-model="department"/>
        </div>
        <div class="content__item">
          <span class="content__item__label">楼号-门牌号:&nbsp;</span>
          <input type="text" class="content__item__input" placeholder="请输入楼号-门牌号" v-model="houseNumber"/>
        </div>
        <div class="content__item">
          <span class="content__item__label">收货人:&nbsp;</span>
          <input type="text" class="content__item__input" placeholder="请输入收货人" v-model="name"/>
        </div>
        <div class="content__item">
          <span class="content__item__label">联系电话:&nbsp;</span>
          <input type="text" class="content__item__input" placeholder="请输入联系电话" v-model="phone"/>
        </div>
      </div>
      <Toast v-if="show" :message="toastMessage"></Toast>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Toast, { useToastEffect } from '@/components/Toast.vue'
import { get, post } from '@/utils/request'
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
  name: 'AddressEdit',
  components: {
    Toast
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const id = route.query.id
    const city = ref('')
    const department = ref('')
    const houseNumber = ref('')
    const name = ref('')
    const phone = ref('')
    const { handleBackClick } = useBackRouterEffect()
    const { show, toastMessage, showToast } = useToastEffect()
    onBeforeMount(async () => {
      if (id) {
        const result = await get(`/api/user/address/${id}`)
        if (result?.errno === 0) {
          const data = result.data
          city.value = data.city
          department.value = data.department
          houseNumber.value = data.houseNumber
          name.value = data.name
          phone.value = data.phone
        }
      }
    })
    const handleSaveClick = async () => {
      if (!city.value || !department.value || !houseNumber.value || !name.value || !phone.value) {
        showToast('请输入完整内容')
      } else {
        if (id) {
          const result = await post(`/api/user/address/${id}`, {
            city: city.value,
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value
          })
          if (result?.errno === 0) {
            router.back()
          }
        } else {
          const result = await post('/api/user/address', {
            city: city.value,
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value
          })
          if (result?.errno === 0) {
            router.back()
          }
        }
      }
    }
    return {
      handleBackClick,
      handleSaveClick,
      city,
      department,
      houseNumber,
      name,
      phone,
      show,
      toastMessage,
      id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: $dark-bgcolor;
}
.title {
  position: relative;
  @include title;
  .iconfont {
    position: absolute;
    left: 0.1rem;
    width: 0.32rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__save {
      position: absolute;
      font-size: 0.14rem;
      right: 0.18rem;
      color: $content-fontcolor;
    }
}
.content {
  background-color: $bgColor;
  margin-top: 0.12rem;
  padding: 0 0.18rem;
  &__item {
    line-height: 0.44rem;
    height: 0.44rem;
    overflow: hidden;
    border-bottom: 0.01rem solid $content-bgcolor;
    font-size: 0.14rem;
    display: flex;
    &__label {
      color: $content-notice-fontColor;
    }
    &__input {
      border: none;
      outline: none;
      flex: 1;
    }
  }
}
</style>
