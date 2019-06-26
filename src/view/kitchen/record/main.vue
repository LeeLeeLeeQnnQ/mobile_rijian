<template>
  <div>
    <!-- 头部搜索 按钮 -->
    <Card shadow style="margin-top: 5px">
      <Row type="flex" justify="start" align="middle" :gutter="20">
        <i-col span="20">
          <Select v-model="select_kitchen_id" style="width: 200px;margin-right:10px;" @on-change="selectKitchen">
            <Option v-for="item in kitchen" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
          <DatePicker type="month" :value="select_time" placeholder="选择月份" format="yyyy-MM" @on-change="selectDate" style="width: 200px"></DatePicker>
        </i-col>
      </Row>
    </Card>
    <Modal v-model="editMeterModal" title="编辑抄表信息" @on-ok="saveEditMeter">
      <Form :model="editMeterItem" :label-width="80">
        <FormItem label="电表名">
          <Input v-model="editMeterItem.meter_name" readonly style="width: 200px"></Input>
        </FormItem>
        <FormItem label="开始值">
          <Input v-model="editMeterItem.start_value" placeholder="输入名称" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="结束值">
          <Input v-model="editMeterItem.end_value" placeholder="输入名称" style="width: 200px"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 数据 -->
    <Card shadow style="margin-top: 5px;">
      <Tabs>
        <TabPane label="电表">
          <Card shadow>
            <tables :columns="energy_record_columns" v-model="energy_record_list" @data-edit="handleMeter"></tables>
          </Card>
        </TabPane>
        <TabPane label="水表">
            <tables :columns="water_record_columns" v-model="water_record_list" @data-edit="handleMeter"></tables>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList } from '@/api/data'
import { queryMeterList  , editMeter } from '@/api/kitchen'
export default {
  name: 'kitchen-record',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索
      kitchen:[],
      select_time:'',
      select_kitchen:[],
      select_kitchen_id:'',
      // 弹窗
      // 增加公摊表弹窗
      showAddModal:false,
      addItem:{},
      // 电表数据
      energy_record_list:[],
      energy_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 电表表格头
      energy_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '月份', key: 'month'},
        {title: '电表名称', key: 'meter_name'},
        {title: '抄表日期', key: 'create_time'},
        {title: '倍率', key: 'multiple'},
        {title: '起始值', key: 'start_value'},
        {title: '结束值', key: 'end_value'},
        { title: '差值',
          render: (h, params) => {
            let start_value = params.row.start_value
            let end_value = params.row.end_value
            let val = (end_value*1 - start_value*1).toFixed(2);
            return h('span', val)
          },
          width: 80
        },
        {title: '操作人', key: 'creator_name'},
        {
          title: '编辑',
          key: 'handle',
          width : 90,
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
      ],
      // 电表数据
      water_record_list:[],
      water_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 电表表格头
      water_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '月份', key: 'month'},
        {title: '电表名称', key: 'meter_name'},
        {title: '抄表日期', key: 'create_time'},
        {title: '倍率', key: 'multiple'},
        {title: '起始值', key: 'start_value'},
        {title: '结束值', key: 'end_value'},
        { title: '差值',
          render: (h, params) => {
            let start_value = params.row.start_value
            let end_value = params.row.end_value
            let val = (end_value*1 - start_value*1).toFixed(2);
            return h('span', val)
          },
          width: 80
        },
        {title: '操作人', key: 'creator_name'},
        {
          title: '编辑',
          key: 'handle',
          width : 90,
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
      ],
      // 电表信息 editMeterItem
      editMeterItem:{},
      // 编辑框显示 editMeterModal
      editMeterModal:false,
    }
  },
  methods: {
    // 搜索功能
    // 月份选择
    selectDate(date){
      this.select_time = date;
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id })
    },
    // 厨房选择
    selectKitchen(){
      let that = this;
      this.kitchen.forEach( function(element, index) {
        if(that.select_kitchen_id == element.id){
          that.select_kitchen = element;
        }
      });
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id })
    },
    // 编辑电表
    handleMeter( params ){
      this.editMeterItem = {};
      this.editMeterItem = params.row;
      this.editMeterModal = true;
    },
    // saveEditMeter 保存修改
    saveEditMeter(){
      if( this.editMeterItem.start_value*1 < 0 || this.editMeterItem.end_value*1 < 0){
        this.$Notice.warning({
          title: "数值填写有误！"
        })
        return
      }
      delete this.editMeterItem.create_time
      delete this.editMeterItem.update_time
      editMeter( this.editMeterItem ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "修改成功！"
        })
      })
    },
    // 初始化
    initData( data ){
      let that = this;
      this.energy_record_list = [];
      this.water_record_list = [];
      // 获取抄表列表
      queryMeterList( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let arr1 = [];
        let arr2 = [];
        dbody.data.forEach( function(element, index) {
          if( element.meter_type*1 == 1 ){
            arr1.push( element )
          }
          if( element.meter_type*1 == 2 ){
            arr2.push( element )
          }
        });
        this.energy_record_list = arr1;
        this.water_record_list = arr2;
      })
    },
  },
  created () {
    let mYear = new Date().getFullYear();
    let mMonth = (new Date().getMonth() + 1) + ''
    mMonth = mMonth < 10 ? "0" + mMonth : mMonth;
    this.select_time = mYear +'-'+ mMonth;
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data || []
      this.select_kitchen = this.kitchen[this.kitchen.length*1-1];
      this.select_kitchen_id = this.select_kitchen.id;
      this.initData({ month : this.select_time , kitchen_id:this.select_kitchen_id })
    })
  }
}
</script>

<style lang="less">

</style>
