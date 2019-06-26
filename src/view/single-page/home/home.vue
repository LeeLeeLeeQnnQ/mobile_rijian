<template>
  <div class="home-warp">
    <div class="wlc-user">
      <h3 class="wlc-user-title"> {{userName}} / {{curentTime}} </h3>
    </div>
    <div class="inspect_box">
      <div class="inspect_item" @click="goDayInspect">日检任务</div>
      <div class="inspect_item" @click="goNightInspect">闭店例检</div>
      <div class="inspect_item" @click="goWeekInspect">周检任务</div>
    </div>
  </div>
</template>

<script>
import { getUsername , getCurentTime } from '@/libs/util'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      curentTime:''
    }
  },
  methods: {
    // goDayInspect
    goDayInspect(){
      this.$router.push({
        name: 'day_inspect_list'
      })
    },
    // goNightInspect
    goNightInspect(){
      this.$router.push({
        name: 'night_inspect_list'
      })
    },
    // goWeekInspect
    goWeekInspect(){
      this.$router.push({
        name: 'week_inspect_list'
      })
    },
  },
  created () {
    this.curentTime = getCurentTime()
  },
  computed: {
    userName () {
      return getUsername()
    },
  }
}
</script>
<style scoped>
  .home-warp .wlc-user-title{
    font-size: 1rem;
    color: #666;
    text-align: center;
    margin: 0.4rem 0;
    margin-top: 1rem;
  }
  .inspect_box{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    height: 20rem;
  }
  .inspect_item{
    background-color: orange;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
    height: 3rem;
    line-height: 3rem;
    width: 55%;
    color: #fff;
  }

</style>


