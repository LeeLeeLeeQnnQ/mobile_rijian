<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <h3>欢迎使用</h3>
    <Form ref="loginForm" class="loginForm" :model="form" :rules="ruleValidate">
      <FormItem prop="username">
        <Input v-model="form.username" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem  prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem prop="captcha">
        <Input v-model="form.captcha" placeholder="请输入验证码"></Input>
      </FormItem>
      <FormItem>
        <img ref="captcha" style="width:100%;height:100%" :src="captcha_src" name="verify" title="看不清,点击更换验证码" @click="changeCaptcha"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" type="primary" long>登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      captcha_src: '',
      ruleValidate:{
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'setUserInfo'
    ]),
    changeCaptcha () {
      getCaptcha().then(res => {
        this.$refs.captcha.src = res.data.data
      })
    },
    setCaptcha () {
      getCaptcha().then(res => {
        this.captcha_src = res.data.data
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return
        }
      })
      this.handleLogin(this.form).then(res => {
        if (res.code != 0) {
          this.$Message.warning(res.msg)
          return
        }
        this.setUserInfo().then(res => {
          if(res.code == 0){
            this.$nextTick(function () {
              this.$router.push({
                name: this.$config.homeName
              })
            })
          }
        })
      })
    }
  },
  created: function () {
    this.setCaptcha()
  },
}
</script>

<style>

</style>
