<template>
  <div>
    <div>
      <Card shadow>
        <Row :gutter="20">
          <i-col :xs="5" :md="5" :lg="5">
            <DatePicker v-model="curentTime" type="date" @on-change="setCurentTime" placeholder="选择日期" style="width:100%;"></DatePicker>
          </i-col>
        </Row>
      </Card>
      <div style="margin-top: 10px;margin-bottom: 10px;font-size: 18px;padding-left: 20px;border-bottom: 1px solid #d7dde4;line-height: 2em;color: #657180;">
      </div>
    </div>
    <Card>
      <tables ref="tables" v-model="orderList" :columns="columns" @data-view="handleView"/>
      <!-- <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getInspectList } from '@/api/standard'
export default {
  name: 's-shop-inspect-list',
  components: {
    Tables
  },
  data () {
    return {
      // 也属 数据
      // page:{
      //   current_page: 1,
      //   last_page: "",
      //   list_rows: 0,
      //   total: 0
      // },
      columns: [
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '店铺名称', key: 'store_name'},
        {title: '店铺房号', key: 'store_no'},
        {title: '日检人员', key: 'employee_name'},
        { title: '白班夜班',
          render: (h, params) => {
            let status = params.row.work_type
            if (status == 1) { return h('span', '白班') };
            if (status == 2) { return h('span', '夜班') };
          }
        },
        {title: '日检分数', key: 'score'},
        {title: '状态', key: 'check'},
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '查看报告')
            }
          ]
        }
      ],
      orderList: [],
      curentTime: ''
    }
  },
  methods: {
    handleView (params) {
      let id = params.row.id
      const route = {
        name: 'standardReport',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    setCurentTime (date) {
      this.curentTime = date
      let str = '?work_date=' + this.curentTime
      getInspectList(str).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.orderList = dbody.data || []
      })
    },
    //
    getCurentTime () {
      let now = new Date()
      let year = now.getFullYear() // 年
      let month = now.getMonth() + 1 // 月
      let day = now.getDate() // 日
      let clock = year + '-'
      if (month < 10) { clock += '0' }
      clock += month + '-'
      if (day < 10) { clock += '0' }
      clock += day + ' '
      return clock
    },
    // getNewPage
    getNewPage (page) {
      let str = '?work_date=' + this.curentTime + '&page=' + page
      getInspectList(str).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.orderList = dbody.data.list || []
        this.page = dbody.data.page
      })
    }
  },
  created () {
    // 获取当前时间
    this.curentTime = this.getCurentTime()
    let str = '?work_date=' + this.curentTime
    getInspectList(str).then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      this.orderList = dbody.data || []
    })
  },
  computed: {

  }
}
</script>

<style>

</style>
