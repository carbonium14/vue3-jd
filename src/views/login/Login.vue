<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="图片">
    <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model="username">
    </div>
    <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password">
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage"></Toast>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username.trim() === '' || password.trim() === '') {
        showToast('请输入用户名或密码')
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast(e)
    }
  }
  const { username, password } = toRefs(data)
  return {
    username,
    password,
    handleLogin
  }
}
const useHandleRegisterClick = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return {
    handleRegisterClick
  }
}
export default {
  name: 'LOGIN',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useHandleRegisterClick()
    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      show,
      toastMessage
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
    &__login-button {
        background-color: #0091ff;
        box-shadow: 0 0.04rem 0.08rem 0 rgba(0,145,255,0.32);
        border-radius: 0.04rem;
        color: #fff;
        margin: 0.32rem 0.4rem 0.16rem 0.4rem;
        line-height: 0.48rem;
        font-size: 0.16rem;
        text-align: center;
    }
    &__login-link {
        font-size: 0.14rem;
        color: $content-notice-fontColor;
        text-align: center;
    }
}
</style>
