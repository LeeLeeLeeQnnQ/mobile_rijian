<template>
  <div>
    <Card shadow style="margin-bottom: 10px">
        <Select v-model="select_kitchen_id" style="width: 200px;margin-right:10px;" @on-change="selectKitchen">
          <Option v-for="item in kitchen" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
        </Select>
    </Card>
    <Tabs>
        <TabPane label="安排值日表">
          <Tabs type="card">
            <TabPane label="日间班表">
              <Calendar  :list="list" @sendCalendar="sendCalendar1"></Calendar>
            </TabPane>
            <TabPane label="晚间班表">
              <Calendar  :list="list" @sendCalendar="sendCalendar2"></Calendar>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane label="生效日间值日表">
          <CellGroup>
            <Row :gutter="20">
              <i-col v-for="item in day_list" :xs="8" :md="8" :lg="8">
                <div style="border:1px solid #eee;padding: 10px;border-radius: 5px;margin-top:5px;">
                  <h3>{{item.store_name}} / {{item.store_no}}</h3>
                  <p>{{item.employee_name}} - {{item.kitchen_name}}</p>
                </div>
              </i-col>
            </Row>
          </CellGroup>
        </TabPane>
        <TabPane label="生效晚间值日表">
          <CellGroup>
            <Row :gutter="20">
              <i-col v-for="item in night_list" :xs="8" :md="8" :lg="8" >
                <div style="border:1px solid #eee;padding: 10px;border-radius: 5px;margin-top:5px;">
                  <h3>{{item.store_name}} / {{item.store_no}}</h3>
                  <p>{{item.employee_name}} - {{item.kitchen_name}}</p>
                </div>
              </i-col>
            </Row>
          </CellGroup>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Tables from '_c/tables'
import Calendar from '_c/calendar'
import { getCalendar, setCalendar } from '@/api/staff'
import { getKitchenList, getKitchenEmployeeList, getStoreList , getKitchenDate} from '@/api/data'
export default {
  name: 'calendar',
  components: {
    Tables,
    Calendar
  },
  data () {
    return {
      // 获取默认厨房
      kitchen: [],
      select_kitchen_id: '',
      list: {
        personList: [],
        shopList: []
      },
      day_list: [],
      night_list: []
    }
  },
  methods: {
    // 获取厨房排班
    getCalendar (kitchen_id) {
      getCalendar(kitchen_id).then(res => {
        const dbody = res.data
        let day = []
        let night = []
        dbody.data.forEach(function (item) {
          switch (item.work_type * 1) {
            case 1:
              day.push(item)
              break
            case 2:
              night.push(item)
              break
          }
        })
        this.day_list = day
        this.night_list = night
      })
    },
    sortData (data) {
      let arr = []
      let that = this
      data.forEach(function (item) {
        let obj = {}
        obj.employee_id = item.person[0].id
        obj.store_id = []
        item.shop.forEach(function (i) {
          obj.store_id.push(i.store_id)
        })
        obj.work_type = data.work_type
        obj.kitchen_id = that.select_kitchen_id
        arr.push(obj)
      })
      return arr
    },
    // 换厨房
    selectKitchen () {
      this.getKitchenDate(this.select_kitchen_id);
      this.getCalendar(this.select_kitchen_id);
    },
    // 白班班表
    sendCalendar1 (data) {
      data.work_type = 1
      let info = this.sortData(data)
      setCalendar({ rule: info }).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '白班班表保存成功！'
          })
          this.getCalendar(this.select_kitchen_id);
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    // 晚班班表
    sendCalendar2 (data) {
      data.work_type = 2
      let info = this.sortData(data)
      setCalendar({ rule: info }).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '晚班班表保存成功！'
          })
          this.getCalendar(this.select_kitchen_id);
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    // 获取厨房数据相关
    getKitchenDate (kitchen_id) {
      getKitchenEmployeeList(kitchen_id).then(res => {
        const dbody = res.data || []
        this.list.personList = dbody.data
      })
      getStoreList(kitchen_id).then(res => {
        const dbody = res.data || []
        this.list.shopList = dbody.data
      })
    }
  },
  created () {
    // 获取默认厨房 与 员工列表
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data || []
      this.select_kitchen_id = this.kitchen[0].id
      // 请求厨房人员
      this.getKitchenDate(this.select_kitchen_id);
      this.getCalendar(this.select_kitchen_id);
    })
  }
}
</script>

<style scoped>
  .cardHigh{
    height: 500px;
    overflow: auto;
  }
  .cardHigh_2{
    height: 250px;
    overflow: auto;
  }
  .pCell{
    padding: 5px;
    cursor: pointer;
  }
  .cardBgc{
    background-color: #f5f7f9;
    border-radius: 5px;
    padding: 5px 0;
    height: 100%;
    overflow: auto;
  }
  .shopCell{
    background-color: #5cadff;
    border-radius: 5px;
    padding: 5px;
    margin-right: 5px;
    color: #fff;
  }
</style>
