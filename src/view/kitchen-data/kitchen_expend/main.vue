<template>
  <div>
    <div>
      <Card shadow>
        <Row :gutter="20">
          <i-col :xs="8" :md="8" :lg="8">
            <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择时间段" style="width: 100%" @on-change="selectDaterange"></DatePicker>
          </i-col>
          <i-col :xs="4" :md="4" :lg="4">
            <Button @click="handleSearch" type="primary">
              <Icon type="search"/>&nbsp;&nbsp;搜索
            </Button>
          </i-col>
        </Row>
      </Card>
    </div>
    <Card style="margin-top: 5px;">
      <tables ref="tables"  v-model="orderList" :columns="columns" @data-view="goOrderPage"/>
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { queryWorkOrderList } from '@/api/sreach'
export default {
  name: 'sreach-order-list',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '档口号', key: 'store_no', width: 100},
        {title: '商铺名', key: 'store_name'},
        {title: '工单名称', key: 'title'},
        { title: '工单种类',
          render: (h, params) => {
            let status = params.row.work_type*1
            switch (status) {
              case 1:
                return h('span', '奖惩工单')
                break
              case 2:
                return h('span', '维修工单')
                break
              case 3:
                return h('span', '接驳工单')
                break
              case 4:
                return h('span', '缴费工单')
                break
              case 5:
                return h('span', '厨房费用工单')
                break
              case 6:
                return h('span', '租金工单')
                break
            }
          }
        },
        {title: '提交人', key: 'creator_name'},
        { title: '状态',key: 'work_status'},
        { title: '标签',
          render: (h, params) => {
            let status = params.row.tag_id*1
            switch (status) {
              case 1:
                return h('span', '普通')
                break
              case 2:
                return h('span', { style: {color: '#ed4014'}}, '紧急')
                break
            }
          }
        },
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('a', {style: {margin: '10px 0', display: 'block'},
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '查看')
            }
          ]
        }
      ],
      orderList: [],
      order_type: '0',
      sreachInfo: {
        work_type: '5',
        kitchen_id:'',
        work_status:'3',
        date_range:'',
      },
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      sreachStr: '',
      kitchenList:[],
    }
  },
  methods: {
    selectDaterange(date){
      let strDate = date.join("-");
      strDate = strDate == "-" ? "" : strDate;
      this.sreachInfo.date_range = strDate;
    },
    goOrderPage (params) {
      let id = params.row.id
      let work_type = params.row.work_type
      const route = {
        name: 'searchorderreply',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    getNewPage (page) {
      let data = this.sreachInfo;
      data.page = page;
      queryWorkOrderList(data).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if (!dbody.data.list) {
          this.orderList = [];
          this.page ={
            current_page: 1,
            last_page: '',
            list_rows: 0,
            total: 0
          };
          return
        }
        this.orderList = dbody.data.list
        this.page = dbody.data.page
      })
    },
    // 搜索操作
    handleSearch () {
      queryWorkOrderList(this.sreachInfo).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if (!dbody.data.list) {
          this.orderList = [];
          this.page ={
            current_page: 1,
            last_page: '',
            list_rows: 0,
            total: 0
          };
          return
        }
        this.orderList = dbody.data.list
        this.page = dbody.data.page
      })
    }
  },
  mounted () {
    this.sreachInfo.kitchen_id = this.$route.query.id;
    queryWorkOrderList(this.sreachInfo).then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      if (!dbody.data.list) {
        return
      }
      this.orderList = dbody.data.list
      this.page = dbody.data.page
    })
  },
}
</script>

<style>

</style>
