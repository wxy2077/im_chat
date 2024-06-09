<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="form.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登陆
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<style lang="scss">

.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {userLogin} from '@/api/user'
import {useRouter} from 'vue-router'

const router = useRouter()

const formRef = ref(null);

const form = reactive({
  username: '',
  password: '',
});


const loading = ref(false)

const onSubmit = async () => {
  try {
    const response = await userLogin(null, { username: 'hanli', password: '12345' });

    if (response.success) {

      // 将 token 存储在 localStorage
      localStorage.setItem('token', response.data.token);

      // 跳转到 '/home'
      await router.push('/home');
    } else {
      // 处理其他响应码的情况
      console.error("Login failed with code:", response.success);
    }
  } catch (error) {
    console.error("Login request failed:", error);
  }
};

</script>