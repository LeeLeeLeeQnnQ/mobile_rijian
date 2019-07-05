<template>
  <Layout style="height: 100%" class="main">
    <Layout>
      <div class="tHeader">
        <div class="posLeft">
          <a href="#" type="text" @click.prevent="goBack">返回上一页</a>
        </div>
        <div class="posRight">
          <a href="#" type="text" @click.prevent="goQuit">登出</a>
        </div>
      </div>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </Layout>
  </Layout>
</template>
<script>
import './main.less'
import { mapActions } from 'vuex'
export default {
  name: 'Main',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
     // 返回上一页
    goBack(){
      this.$router.go(-1);
    },
    // goQuit
    goQuit(){
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
  },
  watch: {
  },
  created () {
  }
}
</script>