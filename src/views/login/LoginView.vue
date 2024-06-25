<template>
  <div class="login">

    <div class="floating-element"></div>
    <div class="floating-element"></div>
    <h1>欢迎登录iChat</h1>
    <div class="login-container ">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="form.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          >
            <template #left-icon>
              <van-icon name="user-o"/>
            </template>
          </van-field>
          <van-field
              v-model="form.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          >
            <template #left-icon>
              <van-icon name="lock"/>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button color="linear-gradient(to right, #23a6d5, #23d5ab)" round block type="primary"
                      native-type="submit"> 登陆
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="tip">
      <p>账号:jay peppa qi feifei lufei wukong
        <br> 密码都是12345
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

.login {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-element {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.floating-element:nth-child(1) {
  width: 80px;
  height: 80px;
  top: -40px;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.floating-element:nth-child(2) {
  width: 60px;
  height: 60px;
  bottom: -30px;
  right: 20%;
  animation: float 8s ease-in-out infinite;
}

h1 {
  color: white;
  text-align: center;
  padding-top: 10rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tip {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>

<script setup lang="ts">
import {reactive} from 'vue'
import {userLogin} from '@/api/user'
import {useRouter} from 'vue-router'
import {useUserInfo} from '@/stores/modules/UserInfo'
import {TOKEN} from '@/utils/globalConsts'

const userInfo = useUserInfo()

const router = useRouter()

const form = reactive({
  username: '',
  password: '12345'
})

const onSubmit = async () => {
  try {
    const response = await userLogin(null, {username: form.username, password: form.password})

    if (response.success) {
      // 将 token 存储在 localStorage
      localStorage.setItem(TOKEN, response.data.token)

      await userInfo.fetchUserInfo()

      // 跳转到
      await router.push('/friend')
    } else {
      // 处理其他响应码的情况
      console.error('Login failed with code:', response.success)
    }
  } catch (error) {
    console.error('Login request failed:', error)

    return
  }
}
</script>
