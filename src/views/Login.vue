<template>
  <div id="login">
    <div class="login-container">
      <!-- NavBar 组件：只需提供 title 标题 -->
      <van-nav-bar title="黑马头条 - 登录" />
      <van-form @submit="login()">
        <van-field
          v-model="form.mobile"
          type="tel"
          label="手机号码"
          placeholder="请输入手机号码"
          required
        ></van-field>
        <van-field
          v-model="form.code"
          type="password"
          label="手机密码"
          placeholder="请输入手机密码"
          required
        ></van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/userAPI'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        // 用户的手机号
        mobile: '18888888882',
        // 登录的密码
        code: '246810'
      },
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          // 11 位手机号的校验规则
          {
            pattern: /^1\d{10}$/,
            message: '请填写正确的手机号',
            trigger: 'onBlur'
          }
        ],
        // 密码的校验规则
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['updateTokenInfo']),
    async login () {
      const { data: res } = await loginAPI(this.form)
      console.log(res)
      if (res.message === 'OK') {
        // TODO1：把登录成功的结果，存储到 vuex 中
        console.log(res)
        // TODO2：登录成功后，跳转到主页
        this.updateTokenInfo(res.data)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
