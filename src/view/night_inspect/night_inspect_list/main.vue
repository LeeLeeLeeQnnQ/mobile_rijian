<template>
  <div class="night_inspect_list-warp">
    <h3>闭店例检</h3>
    <div class="night_inspect_list-sreach">
      <Select v-model="curentKitchen" @on-change="getNewKitchen">
        <Option v-for="item in kitchenList"  style="width:100%;" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
      </Select>
    </div>
    <div class="night_inspect_list-list">
      <div class="night_inspect_list-item" v-for="item in dayInspectList"  @click="handleItem(item)">
        <h3>{{ item.store_no }}</h3>
        <p>{{ item.store_name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getKitchenList , getDayInspectList } from '@/api/data'
import { getCurentTime } from '@/libs/util'
export default {
  name: 'night_inspect_list',
  components: {

  },
  data () {
    return {
      kitchenList:[],
      curentKitchen:'',
      dayInspectList:[],
    }
  },
  methods: {
    handleItem (item) {
      this.$store.commit("setStoreInfo",{store_name:item.store_name,store_no:item.store_no})
      let obj = {}
      obj.store_id = item.store_id;
      obj.ptype = item.ptype;
      obj.kitchen_id = this.curentKitchen;
      obj.work_date = this.curentTime;
      const route = {
        name: 'night_inspect_item',
        query: obj
      }
      this.$router.push(route)
    },
    getNewKitchen(){
      this.init()
    },
    init(){
      let obj = { kitchen_id : this.curentKitchen }
      getDayInspectList(obj).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning('请求异常！')
          return
        }
        const zone = { store_id : 0 , ptype : '2' + this.curentKitchen + '2',  store_name :'厨房公共区域'}
        const dbody = data.data || [];
        dbody.forEach( (element, index) => {
          element.ptype = '2' +'' + element.kitchen_id +'' + '1';
        });
        dbody.unshift(zone)
        this.dayInspectList = dbody;
      })
    },
  },
  created () {
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchenList = dbody.data || []
      this.curentKitchen = this.kitchenList[this.kitchenList.length - 1].id
      this.init()
    })
  },
  computed: {
    curentTime () {
      return getCurentTime()
    },
  }
}
</script>
<style scoped lang="less">
  .night_inspect_list-warp{
    width: 100%;
    height:90%;
    overflow-y: auto;
    padding-bottom: 3rem;
    h3{
      margin-top: 0.5rem;
      text-align: center;
      font-size: 1rem;
    }
  }
  .night_inspect_list-sreach{
    width: 80%;
    text-align: center;
    margin: 1rem auto;
  }
  .night_inspect_list-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .night_inspect_list-item{
      width: 30%;
      box-sizing: border-box;
      padding: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #FFAF01;
      box-shadow: 1px 1px 5px #999;
      color:#fff;
      border-radius: 5px;
      height:7.5em;
      margin-bottom: 5px;
      p{
        font-size: 0.5rem;
      }
    }
  }
</style>


