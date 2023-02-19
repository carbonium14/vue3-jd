<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="图片">
    <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model="username">
    </div>
    <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password">
    </div>
    <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" placeholder="确认密码" v-model="ensurement">
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '@/utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const { username, password, ensurement } = data
      if (username.trim() === '' || password.trim() === '') {
        showToast('请输入用户名或密码')
        return
      }
      if (password.trim() !== ensurement.trim()) {
        showToast('两次输入的密码不一致')
        return
      }
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast(e)
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return {
    username,
    password,
    ensurement,
    handleRegister
  }
}
const useHandleLoginClick = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return {
    handleLoginClick
  }
}
export default {
  name: 'REGISTER',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useHandleLoginClick()
    return {
      handleLoginClick,
      show,
      toastMessage,
      username,
      password,
      ensurement,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/viriables.scss';
@import '@/style/mixins.scss';
.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
        width: 0.66rem;
        height: 0.66rem;
        display: block;
        margin: 0 auto 0.4rem auto;
    }
    &__input {
        background-color: #f9f9f9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 0.06rem;
        height: 0.48rem;
        margin: 0 0.4rem 0.16rem 0.4rem;
        padding: 0 0.16rem;
        &__content {
            width: 100%;
            border: none;
            outline: none;
            line-height: 0.48rem;
            background: none;
            font-size: 0.16rem;
            color: $content-notice-fontColor;
            &::placeholder {
                color: $content-notice-fontColor;
            }
        }
    }
    &__register-button {
        background-color: $button-bgcolor;
        box-shadow: 0 0.04rem 0.08rem 0 rgba(0,145,255,0.32);
        border-radius: 0.04rem;
        color: $bgColor;
        margin: 0.32rem 0.4rem 0.16rem 0.4rem;
        line-height: 0.48rem;
        font-size: 0.16rem;
        text-align: center;
    }
    &__register-link {
        font-size: 0.14rem;
        color: $content-notice-fontColor;
        text-align: center;
    }
}
</style>
