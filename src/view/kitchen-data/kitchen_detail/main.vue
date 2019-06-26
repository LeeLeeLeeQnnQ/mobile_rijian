<template>
  <Card shadow>
    <Tabs>
      <TabPane label="基础资料">
        <Form v-model="kitchen" :label-width="100">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="厨房名称" >
                <Input v-model="kitchen.kitchen_name" placeholder="输入厨房名称" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="负责人" >
                <Input v-model="kitchen.manage_name" placeholder="输入负责人名称" style="width: 200px"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="2">
              <FormItem label="负责人电话" >
                <Input v-model="kitchen.manage_phone" placeholder="输入负责人电话" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Divider />
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="应支出房租" >
                <Input v-model="kitchen.kitchen_rent" placeholder="输入应支出房租(每月)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="2">
              <FormItem label="垃圾及隔油池" >
                <Input v-model="kitchen.garbage_fee" placeholder="输入垃圾及隔油池(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="烟道清洗" >
                <Input v-model="kitchen.flue_fee" placeholder="输入烟道清洗(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="2">
              <FormItem label="消杀" >
                <Input v-model="kitchen.kill_fee" placeholder="输入消杀(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="网络使用费" >
                <Input v-model="kitchen.network_fee" placeholder="输入网络使用费(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="2">
              <FormItem label="卫生费" >
                <Input v-model="kitchen.health_fee" placeholder="输入卫生费(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="电费基数" >
                <Input v-model="kitchen.energy_fee" placeholder="输入电费基数(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="2">
              <FormItem label="水费基数" >
                <Input v-model="kitchen.water_fee" placeholder="输入水费基数(固定费用)" style="width: 200px"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem>
                 <Button type="primary" @click="editBaseinfo">保存</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </TabPane>
      <TabPane label="档口列表">
        <Card style="padding-top: 2em;">
          <a href="#" slot="extra" @click.prevent="showAddModalFn">
              新建档口
          </a>
          <tables ref="tables" v-model="kitchenStoreList" :columns="storeColumns" 
            @data-edit="handleEdit"
            @data-dele="handleDele"
          />
          <Page :total="store_page.total" :page-size="store_page.list_rows" style="margin-top:10px;" 
            @on-change="getNewKitchenStorePage"/>
          <Modal v-model="showAddModal" title="添加档口" @on-ok="saveAddModalInfo">
            <Form :model="addStore" :label-width="80">
              <FormItem label="档口名称">
                <Input v-model="addStore.store_no" placeholder="输入档口名称" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="店铺面积">
                <Input v-model="addStore.area" placeholder="输入店铺面积" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="原价入场费">
                <Input v-model="addStore.entrance_fee" placeholder="输入原价入场费" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="实际入场费">
                <Input v-model="addStore.entrance_sell" placeholder="输入实际入场费" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="原价租金">
                <Input v-model="addStore.rent_fee" placeholder="输入原价租金" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="实际租金">
                <Input v-model="addStore.rent_sell" placeholder="输入实际租金" style="width: 200px"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Modal v-model="showEditModal" title="修改店铺数据" @on-ok="saveEditModalInfo">
            <Form :model="editStore" :label-width="80">
              <FormItem label="档口名称">
                <Input v-model="editStore.store_no" placeholder="输入档口名称" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="店铺面积">
                <Input v-model="editStore.area" placeholder="输入店铺面积" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="原价入场费">
                <Input v-model="editStore.entrance_fee" placeholder="输入原价入场费" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="实际入场费">
                <Input v-model="editStore.entrance_sell" placeholder="输入实际入场费" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="原价租金">
                <Input v-model="editStore.rent_fee" placeholder="输入原价租金" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="实际租金">
                <Input v-model="editStore.rent_sell" placeholder="输入实际租金" style="width: 200px"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Modal
              title="删除操作"
              v-model="showDeleModal"
              @on-ok="saveDeleModalInfo"
              :style="{top: '20px'}">
              <p>确认删除档口吗？</p>
          </Modal>
        </Card>
      </TabPane>
      <TabPane label="公摊电表">
          <Card>
            <p slot="title">
              电表
            </p>
            <a href="#" slot="extra" @click.prevent="addMeter(1)">
                增加公摊电表
            </a>
            <tables :columns="energy_record_columns" v-model="energy_record_list" @data-dele="deleteKitchenMeter"/>
          </Card>
          <Card style="margin-top: 10px">
            <p slot="title">
              水表
            </p>
            <a href="#" slot="extra" @click.prevent="addMeter(2)">
                增加公摊水表
            </a>
            <tables :columns="water_record_columns" v-model="water_record_list" @data-dele="deleteKitchenMeter"/>
          </Card>
          <Modal v-model="addMeterShowModal" title="编辑表格" @on-ok="addKitchenMeter">
            <Form :model="addMeterItem" :label-width="80">
              <FormItem label="类型">
                <Select v-model="addMeterItem.meter_type" disabled>
                    <Option :value="1" :key="1">电表</Option>
                    <Option :value="2" :key="2">水表</Option>
                </Select>
              </FormItem>
              <FormItem label="表名">
                <Input v-model="addMeterItem.meter_name" placeholder="输入表名"></Input>
              </FormItem>
              <FormItem label="倍率">
                <Input v-model="addMeterItem.multiple" placeholder="输入倍率"></Input>
              </FormItem>
            </Form>
        </Modal>
      </TabPane>
      <TabPane label="支出列表">
        <tables v-model="kitchen_expend_list" :columns="expend_list_columns"/>
        <Page :total="expend_page.total" :page-size="expend_page.list_rows" style="margin-top:10px;" @on-change="getExpendNewPage"/>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList , getKitchenStoreList , addKitchenStore , editKitchenStore, deleKitchenStore , editKitchen , getKitchenMeterList , addKitchenMeter ,deleteKitchenMeter } from '@/api/setting'
import { getKitchenExpendList } from '@/api/finance'
export default {
  name: 'kitchen-data-kitchen-detail',
  components: {
    Tables
  },
  data () {
    return {
      kitchen_id:'',
      // 基本信息
      kitchen:{},
      eidtkitchen:{},
      // 档口列表
      kitchenStoreList:[],
      storeColumns:[
        {title: '档口号', key: 'store_no'},
        {title: '档口面积', key: 'area'},
        {title: '原价入场费', key: 'entrance_fee'},
        { title: '入场费折扣',
          render: (h, params) => {
            let t = params.row.entrance_fee*1;
            let b = params.row.entrance_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际入场费', key: 'entrance_sell'},
        {title: '原价租金', key: 'rent_fee'},
        { title: '租金折扣',
          render: (h, params) => {
            let t = params.row.rent_fee*1;
            let b = params.row.rent_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际租金', key: 'rent_sell'},
        {
          title: '操作',
          key: 'handle',
          width : 160,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                'click': () => {
                  vm.$emit('data-edit', params)
                }
              }},
              '修改')
            },
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0 0 0 0.5em'},
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      store_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      showAddModal:false,
      addStore:{},
      showEditModal:false,
      editStore:{},
      showDeleModal:false,
      store_id:'',
      // 公摊能源
      // 表头
      energy_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '电表名称', key: 'meter_name'},
        {title: '倍率', key: 'multiple'},
        {title: '添加人', key: 'creator_name'},
        {
          title: '操作',
          key: 'handle',
          width : 90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      water_record_columns:[
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '水表名称', key: 'meter_name'},
        {title: '倍率', key: 'multiple'},
        {title: '添加人', key: 'creator_name'},
        {
          title: '操作',
          key: 'handle',
          width : 90,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      // 表身
      energy_record_list:[],
      water_record_list:[],
      // 增加
      addMeterItem:{},
      addMeterShowModal:false,


      // 第四页-支出
      kitchen_expend_list:[],
      expend_list_columns: [
        {title: '所属厨房', key: 'kitchen_name'},
        {title: '标题', key: 'title'},
        {title: '报账日期', key: 'expend_date'},
        {title: '登记时间', key: 'create_time'},
        {title: '金额总计', key: 'money'},
        {title: '备注', key: 'money'},
      ],
      expend_page: {
        curmoney_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
    }
  },
  methods: {
    // 初始化
    // 获取厨房信息
    getKitchen( ){
      getKitchenList(  ).then(res => {
        let that = this;
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let kitchenList = dbody.data.list || [];
        kitchenList.forEach( function(element, index) {
          if(that.kitchen_id*1 == element.id*1){
            that.kitchen = element;
            // that.initBaseInfo( that.kitchen );
          }
          return
        });
      })
    },
    // 初始化数据
    setBaseInfo( obj ){
      this.eidtkitchen = {};
      this.eidtkitchen.id = obj.id;
      this.eidtkitchen.position = 0;
      this.eidtkitchen.kitchen_name = obj.kitchen_name;
      this.eidtkitchen.manage_name = obj.manage_name;
      this.eidtkitchen.manage_phone = obj.manage_phone;
      this.eidtkitchen.kitchen_rent = obj.kitchen_rent;
      this.eidtkitchen.garbage_fee = obj.garbage_fee;
      this.eidtkitchen.flue_fee = obj.flue_fee;
      this.eidtkitchen.kill_fee = obj.kill_fee;
      this.eidtkitchen.network_fee = obj.network_fee;
      this.eidtkitchen.health_fee = obj.health_fee;
      this.eidtkitchen.water_fee = obj.water_fee;
      this.eidtkitchen.energy_fee = obj.energy_fee;
    },
    // 第一页
    editBaseinfo(){
      this.setBaseInfo( this.kitchen )
      editKitchen(this.eidtkitchen).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        // 处理成功逻辑
        this.$Notice.warning({
          title: "保存成功！"
        })
      })
    },
    // 第二页 档口页面
    // 获取档口列表
    getKitchenStoreList( obj ){
      getKitchenStoreList( obj ).then(res => {
        const dbody = res.data;
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if( !dbody.data.list || dbody.data.list.length <= 0){
          this.kitchenStoreList = [];
          return;
        }
        this.kitchenStoreList = dbody.data.list
        this.store_page = dbody.data.page
      })
    },
    // 点击分页
    getNewKitchenStorePage( page ){
      let data = { 
        kitchen_id : this.kitchen_id ,
        page : page ,
      }
      this.getKitchenStoreList( data );
    },
    // 添加验证
    //验证发送对象
    verifyObj( obj ){
      if( !obj.store_no ){
        this.$Notice.warning({
          title: '请输入档口名！'
        })
        return false
      }
      if(isNaN(obj.area*1) || obj.area*1 <= 0){
        this.$Notice.warning({
          title: '请输入正确面积！'
        })
        return false
      }
      if(isNaN(obj.entrance_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.entrance_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      return true;
    },
    // 添加档口弹窗
    showAddModalFn(){
      this.addStore = {};
      this.showAddModal = true;
    },
    // 保存添加档口 - 弹窗
    saveAddModalInfo () {
      if( this.verifyObj( this.addStore ) ){
        let obj = this.addStore;
        obj.kitchen_id = this.kitchen_id;
        addKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "添加成功！"
          })
          this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        })
      }
    },
    // 编辑弹窗
    // 编辑档口弹窗
    handleEdit (params) {
      this.editStore = {};
      this.store_id = '';
      this.store_id  =  params.row.id ;
      this.editStore.store_no = params.row.store_no;
      this.editStore.area = params.row.area;
      this.editStore.entrance_fee = params.row.entrance_fee;
      this.editStore.entrance_sell = params.row.entrance_sell;
      this.editStore.rent_fee = params.row.rent_fee;
      this.editStore.rent_sell = params.row.rent_sell;
      this.showEditModal = true;
    },
    // 编辑修改
    saveEditModalInfo () {
      if( this.verifyObj( this.editStore ) ){
        let obj = this.editStore;
        obj.kitchen_id = this.kitchen_id;
        obj.id = this.store_id;
        editKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: '修改成功！'
          })
          this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        })
      }
    },
    // 删除弹窗
    handleDele (params) {
      this.store_id = '';
      this.store_id = params.row.id;
      this.showDeleModal = true
    },
    // 删除操作
    saveDeleModalInfo () {
      deleKitchenStore({ id: this.store_id }).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: '删除成功！'
        })
        this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
      })
    },
    // 第三页
    // 获取电表水表
    getKitchenMeterList( obj ){
      getKitchenMeterList( obj ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let arr = dbody.data;
        let arr_e = [];
        let arr_w = [];
        arr.forEach( function(element, index) {
          if(element.meter_type*1  == 1){
            arr_e.push(element)
          }else{
            arr_w.push(element)
          }
        });
        this.energy_record_list = arr_e;
        this.water_record_list = arr_w;
      })
    },
    // 增加公摊表
    addMeter( meter_type ){
      this.addMeterItem = {};
      this.addMeterItem.meter_type = meter_type;
      this.addMeterShowModal = true;
    },
    // 确认增加
    addKitchenMeter(){
      if(!this.addMeterItem.meter_name){
        this.$Notice.warning({
          title: "表名必须填写！"
        })
        return
      }
      if(!this.addMeterItem.multiple){
        this.$Notice.warning({
          title: "倍率必须填写！"
        })
        return
      }
      this.addMeterItem.kitchen_id = this.kitchen_id;
      addKitchenMeter( this.addMeterItem ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "添加成功！"
        })
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
      })
    },
    // 删除表
    deleteKitchenMeter(params){
      let id = params.row.id;
      deleteKitchenMeter( { id : id } ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "删除成功！"
        })
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
      })
    },
    // 第四页 支出列表
    // 获取新页面
    getExpendNewPage (page) {
      let obj = {
        kitchen_id: this.kitchen_id,
        page:page
      }
      this.getKitchenExpendList( obj );
    },
    // 获取支出列表
    getKitchenExpendList( obj ){
      getKitchenExpendList( obj ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.kitchen_expend_list = dbody.data.list || [];
        this.expend_page = dbody.data.page;
      })
    },
  },
  created () {
    this.$nextTick(()=>{
        this.kitchen_id = this.$route.query.kitchen_id;
        this.getKitchen( );
        this.getKitchenStoreList({ kitchen_id : this.kitchen_id});
        this.getKitchenExpendList({ kitchen_id : this.kitchen_id});
        this.getKitchenMeterList({ kitchen_id : this.kitchen_id});
    })
     
  }
}
</script>


<style lang="less" scoped>
  .ivu-tabs-content{
    overflow-x: hidden;
  }
  .tableFooter{
    margin-left: 20px;
  }
  .cellTit{
    margin-bottom: 12px;
    span{
      color:#fff;
      background-color:#3399ff;
      border-radius:5px;
      padding:5px 8px;
      margin-right: 10px;
    }
    .noData{
      background-color: #ff9900;
    }
  }
  .img-upload-list{
      display: inline-block;
      width: 60px;
      min-height: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
  }
  .img-upload-list img{
      width: 100%;
      height: 100%;
  }
  .img-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
  }
  .img-upload-list:hover .img-upload-list-cover{
      display: block;
  }
  .img-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
</style>
