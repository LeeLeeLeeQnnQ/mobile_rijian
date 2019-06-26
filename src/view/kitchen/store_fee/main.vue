<template>
  <div>
    <!-- 头部搜索 按钮 -->
    <Card shadow style="margin-top: 5px">
      <Row type="flex" justify="start" align="middle" :gutter="20">
        <i-col span="20">
          <Select v-model="select_kitchen_id" style="width: 200px;margin-right:10px;" @on-change="selectKitchen">
            <Option v-for="item in kitchen" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
          <DatePicker ref="datePicker" type="month" :value="select_time" placeholder="选择月份" format="yyyy-MM" @on-change="selectDate" style="width: 200px"></DatePicker>
        </i-col>
      </Row>
    </Card>
    <!-- 数据展示卡片 -->
    <div>
      <Form ref="formItem" :model="showInfo" :label-width="90">
        <Card shadow style="margin-top: 5px">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="6">
              <FormItem label="垃圾及隔油池">
                  <Input v-model="showInfo.garbage_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="烟道清洗">
                  <Input v-model="showInfo.flue_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="消杀">
                  <Input v-model="showInfo.kill_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="网络使用费">
                  <Input v-model="showInfo.network_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="6">
              <FormItem label="卫生费">
                  <Input v-model="showInfo.health_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="水费基数">
                  <Input v-model="showInfo.water_fee" readonly placeholder="" style="width:100%;"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="电费基数">
                  <Input v-model="showInfo.energy_fee" readonly placeholder="" style="width: 100%;"></Input>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card shadow style="margin-top: 5px">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="6">
              <FormItem label="公摊档口数量">
                  <Input v-model="base_store_list.length" readonly placeholder=""></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="公摊天数总量">
                  <Input v-model="base_store_days" readonly placeholder=""></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="公摊电费">
                  <Input v-model="showEnergyTableTotal" readonly placeholder=""></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="公摊水费">
                  <Input v-model="showWaterTableTotal" readonly placeholder=""></Input>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card shadow style="margin-top: 5px">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="分摊商户">
              <Button v-for="item in base_store_list" v-if="item.isShow" @click="buildPayment(item)" style="margin:3px;" type="dashed"> 
                    <span>{{item.days}} 天 /</span>
                    <span>{{item.store_no}} / {{item.store_name}}</span>
              </Button>
            </FormItem>
          </Row>
        </Card>
      </Form>
    </div>
    <Modal title="账单信息" v-model="paymentModal" scrollable @on-ok="confrimPaper" fullscreen>
      <Form ref="paymentForm" :model="paymentItem" :label-width="110">
        <Card style="border:1px solid #2db7f5;">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="8">
              <FormItem label="店铺名称">
                  <span>{{paymentItem.store_name}}</span>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem label="档口编号">
                  <span>{{paymentItem.store_no}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="4">
              <FormItem label="账单月份">
                  <span>{{paymentItem.month}}</span>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="厨房名称">
                  <span>{{paymentItem.kitchen_name}}</span>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="公摊天数">
                  <span>{{paymentItem.day_number}}</span>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="收费基数">
                  <Input v-model="paymentItem.base_number" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="周期性费用">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="4">
              <FormItem label="垃圾及隔油池">
                  <Input v-model="paymentItem.garbage_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="烟道清洗">
                  <Input v-model="paymentItem.flue_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="消杀">
                  <Input v-model="paymentItem.kill_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="网络使用费">
                  <Input v-model="paymentItem.network_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="4">
              <FormItem label="库房费">
                  <Input v-model="paymentItem.storage_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="卫生费">
                  <Input v-model="paymentItem.health_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="电费">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="公摊电费">
                    <Input v-model="paymentItem.energy_share_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
                <FormItem label="商户电费">
                    <Input v-model="paymentItem.energy_fee" readonly></Input>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem>
                  <Alert type="error">下列值为档口电表，请注意档口是否有商户退租！</Alert>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="电表起始值">
                    <Input v-model="paymentItem.energy_start" @on-change="updateComputedPaper"></Input>
                </FormItem>
                <FormItem label="电表结束值">
                    <Input v-model="paymentItem.energy_end" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="电表倍率">
                    <Input v-model="paymentItem.energy_multiple" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </Row>
            </Card>
          </i-col>
          <i-col span="12">
            <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="水费">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="公摊水费">
                    <Input v-model="paymentItem.water_share_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
                <FormItem label="商户水费">
                    <Input v-model="paymentItem.water_fee" readonly></Input>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem>
                  <Alert type="error">下列值为档口水表，请注意档口是否有商户退租！</Alert>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="水表起始值">
                    <Input v-model="paymentItem.water_start" @on-change="updateComputedPaper"></Input>
                </FormItem>
                <FormItem label="水表结束值">
                    <Input v-model="paymentItem.water_end" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </Row>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <FormItem label="水表倍率">
                    <Input v-model="paymentItem.water_multiple" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </Row>
            </Card>
          </i-col>
        </Row>
        <Card style="border:1px solid #2db7f5;margin-top: 5px;" title="其他">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="4">
              <FormItem label="工程增项">
                  <Input v-model="paymentItem.project_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="罚款">
                  <Input v-model="paymentItem.fine_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="一次性费用">
                  <Input v-model="paymentItem.one_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="4">
              <FormItem label="代收税费">
                  <Input v-model="paymentItem.taxes_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="物业管理费">
                  <Input v-model="paymentItem.manage_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
            <i-col span="4">
              <FormItem label="其他费用">
                  <Input v-model="paymentItem.other_fee" @on-change="updateComputedPaper"></Input>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card style="margin-top: 5px;">
          <h3>总计：{{paymentItem.total}}</h3>
        </Card>
      </Form>
    </Modal>
    <!-- 商户表格卡片 -->
    <Card shadow style="margin-top: 5px">
      <p slot="title">已生成的能源账单</p>
      <tables :columns="storeFeeTableColumns" v-model="storeFeeTable" @data-dele="handleDelePayItem" @data-view="handleViewPayItem" ></tables>
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
    <!-- 展示模版 -->
    <Modal title="账单信息" v-model="viewModal" scrollable>
      <Form :label-width="90">
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="店铺名称" class="cellTit">
                <span>{{viewItem.store_name}}</span>
            </FormItem>
            <FormItem label="档口编号" class="cellTit">
                <span>{{viewItem.store_no}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="账单月份" class="cellTit">
                <span>{{viewItem.month}}</span>
            </FormItem>
            <FormItem label="厨房名称" class="cellTit">
                <span>{{viewItem.kitchen_name}}</span>
            </FormItem>
            <FormItem label="公摊天数" class="cellTit">
                <span>{{viewItem.day_number}}</span>
            </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
            <FormItem label="收费基数" class="cellTit">
                <span>{{viewItem.base_number}}</span>
            </FormItem>
        </Row>
        <Divider></Divider>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12" offset="8">
            <h3>费用列表</h3>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <FormItem label="垃圾及隔油池" class="cellTit">
                <span>{{viewItem.garbage_fee}}</span>
            </FormItem>
            <FormItem label="烟道清洗" class="cellTit">
                <span>{{viewItem.flue_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="消杀" class="cellTit">
                <span>{{viewItem.kill_fee}}</span>
            </FormItem>
            <FormItem label="网络使用费" class="cellTit">
                <span>{{viewItem.network_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <FormItem label="库房费" class="cellTit">
                <span>{{viewItem.storage_fee}}</span>
            </FormItem>
            <FormItem label="工程增项" class="cellTit">
                <span>{{viewItem.project_fee}}</span>
            </FormItem>
            <FormItem label="罚款" class="cellTit">
                <span>{{viewItem.fine_fee}}</span>
            </FormItem>
            <FormItem label="物业管理费" class="cellTit">
                <span>{{viewItem.manage_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="卫生费" class="cellTit">
                <span>{{viewItem.health_fee}}</span>
            </FormItem>
            <FormItem label="一次性费用" class="cellTit">
                <span>{{viewItem.one_fee}}</span>
            </FormItem>
            <FormItem label="代收税费" class="cellTit">
                <span>{{viewItem.taxes_fee}}</span>
            </FormItem>
            <FormItem label="其他费用" class="cellTit">
                <span>{{viewItem.other_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Card shadow>
          <p slot="title">
              <Icon type="ios-flash-outline" /></Icon>
              电费部分
          </p>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="公摊电费" class="cellTit">
                  <span>{{viewItem.energy_share_fee}}</span>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="公摊电费" class="cellTit">
                  <span>{{viewItem.energy_fee}}</span>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Card shadow style="margin-top: 4px;">
          <p slot="title">
              <Icon type="ios-water-outline" /></Icon>
              水费部分
          </p>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="公摊水费" class="cellTit">
                  <span>{{viewItem.water_share_fee}}</span>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="店铺水费" class="cellTit">
                  <span>{{viewItem.water_fee}}</span>
              </FormItem>
            </i-col>
          </Row>
        </Card>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="4">
            <FormItem label="总计：">
                <h3>{{viewItem.total}}</h3>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList } from '@/api/setting'
import { queryStoreByEnergyPayList } from '@/api/data'
import { getKitchenChargeList , editKitchenCharge , addStoreCharge , getStoreChargeList , deleteStoreCharge } from '@/api/kitchen'
import { getEmployeeWageList , solidEmployeeWageList } from '@/api/staff'
import { queryMeterList } from '@/api/kitchen'
export default {
  name: 'count_fee',
  components: {
    Tables,
  },
  data () {
    return {
      // 搜索数据
      select_kitchen:{},
      select_kitchen_id:'',
      select_time:'',
      // 编辑部分
      baseInfo:{},
      kitchen:[],
      //获取到的基本商户列表
      base_store_list:[],
      //更新基本信息
      baseInfoForm:false,
      energy_fee_total:0,
      water_fee_total:0,
      // 展示部分
      showInfo:{},
      // 展示按钮部分
      store_arr:[],
      // 展示部分 账单弹窗
      paymentItem:{},
      paymentModal:false,
      //缴费部分
      storeFeeTableColumns:[
        {title: '厨房', key: 'kitchen_name'},
        {title: '商户', key: 'store_name'},
        {title: '档口号', key: 'store_no'},
        {title: '创建时间', key: 'create_time'},
        {title: '备注', key: 'remark'},
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
              '查看')
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-dele', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '删除')
              ])
            }
          ]
        }
      ],
      // 获取公摊电表列表
      // 电表总表格
      record_list:[],
      energy_record_list:[],
      water_record_list:[],
      // 公摊电表数值
      // energy_record_total:0,
      // water_record_total:0,
      // 
      storeFeeTable:[],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 查看工单
      viewModal:false,
      viewItem:{},
    }
  },
  methods: {
    // 功能函数
    // 获取本年月份列表
    getDayMany ( year, month ) {
      var d = new Date(year, month, 0)
      return d.getDate()
    },

    // 月份选择
    selectDate(date){
      this.select_time = date;
      this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id })
    },
    // 厨房选择
    selectKitchen(){
      let that = this;
      this.kitchen.forEach( function(element, index) {
        if(that.select_kitchen_id == element.id){
          that.select_kitchen = element;
        }
      });
      this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id })
    },
    // 获取列表
    getShowData(data){
      getKitchenChargeList( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if (!dbody.data) {
          this.$Notice.warning({
            title: "没有数据！"
          })
        }
        // 获取已经生成列表的商户
        this.getStorePaymentList( { month : this.select_time , kitchen_id:this.select_kitchen.id } )
        // 初始化缴费缴费基数
        this.initShowData( dbody.data );
      })
    },
    // 初始化展示列表
    initShowData ( info ){
      this.showInfo = {};
      // 分摊天数
      this.showInfo.day_number = info.day_number;
      // 垃圾及隔油池
      this.showInfo.garbage_fee = info.garbage_fee;
      // 烟道清洗
      this.showInfo.flue_fee = info.flue_fee;
      // 消杀
      this.showInfo.kill_fee = info.kill_fee;
      // 网络使用费
      this.showInfo.network_fee = info.network_fee;
      // 水费基数
      this.showInfo.water_fee = info.water_fee;
      // 电费基数
      this.showInfo.energy_fee = info.energy_fee;
      // 库房费
      this.showInfo.storage_fee = info.storage_fee;
      // 卫生费
      this.showInfo.health_fee = info.health_fee;
      // 活跃档口数量
      this.showInfo.store_count  = info.store_count;
      // 商户列表
      this.store_arr = !!info.store_id ? info.store_id.split(',') : [];
    },
    // 添加功能
    // 获取活动商铺列表数据
    queryStoreByEnergyPayList( info ){
      let that = this;
      queryStoreByEnergyPayList( { kitchen_id : this.select_kitchen.id , month : this.select_time } ).then(res => {
        const dbody = res.data;
        const list = dbody.data || [];
        let that = this;
        list.forEach( function(element) {
          let store_id = element.store_id;
          that.storeFeeTable.forEach( function(item) {
            if(store_id*1 == item.store_id){
              element.isShow = false;
            }else{
              element.isShow = true;
            }
          });
        });
        this.base_store_list = list || [];
        // 获取公摊电表
        this.queryMeterList({ month : this.select_time , kitchen_id:this.select_kitchen.id })
      })
    },
    // 编辑一个条目
    buildPayment( stroe ){
      let that = this;
      // 初始化数据
      this.paymentItem = {};
      this.paymentItem.base_number = 1.00;
      this.paymentItem.store_id = stroe.store_id;
      this.paymentItem.store_no = stroe.store_no;
      this.paymentItem.store_name = stroe.store_name;
      this.paymentItem.day_number = stroe.days;
      this.paymentItem.month = this.select_time;
      this.paymentItem.kitchen_id = this.select_kitchen.id;
      this.paymentItem.kitchen_name = this.select_kitchen.kitchen_name;
      this.paymentItem.storage_fee = stroe.storage_fee;

      // 获取商户抄表值
      let store_water = '';
      let store_energy = '';
      this.record_list.forEach((item)=>{
        if(this.paymentItem.store_no == item.store_no){
          if(item.meter_type*1 == 1){
            store_water = item;
          }
          if(item.meter_type*1 == 1){
            store_energy = item;
          }
          return
        }
      });

      // 这里获取水费电费抄表
      this.paymentItem.water_start = store_water.start_value;
      this.paymentItem.water_end = store_water.end_value;
      this.paymentItem.water_value = (store_water.end_value*1 - store_water.start_value*1).toFixed(2);
      this.paymentItem.water_multiple = store_water.multiple;
      this.paymentItem.energy_start = store_energy.start_value;
      this.paymentItem.energy_end = store_energy.end_value;
      this.paymentItem.energy_value =(store_energy.end_value*1 - store_energy.start_value*1).toFixed(2);
      this.paymentItem.energy_multiple = store_energy.multiple;

      this.paymentItem.project_fee = 0;
      this.paymentItem.fine_fee = 0;
      this.paymentItem.one_fee = 0;
      this.paymentItem.taxes_fee = 0;
      this.paymentItem.manage_fee = 0;
      this.paymentItem.other_fee = 0;
      this.paymentEnergyImgList = [];
      this.computedPaper(this.paymentItem);
    },
    // 计算账单
    computedPaper( info ){
      let base_number = info.base_number*1 ;
      let day_number = info.day_number*1 ;
      let base_water = (this.showWaterTableTotal*1 / this.showInfo.day_number*1).toFixed(2) ;
      let base_energy = (this.showEnergyTableTotal*1 / this.showInfo.day_number*1).toFixed(2) ;
      let year = this.select_time.split('-')[0];
      let month = this.select_time.split('-')[1];
      let days = this.getDayMany( year, month );
      // garbage_fee 垃圾及隔油池
      info.garbage_fee = (day_number*1 / days * base_number * this.showInfo.garbage_fee*1).toFixed(2);
      // water_start 水费差
      if( (isNaN(info.water_start) || info.water_start<0 ) || (isNaN(info.water_end) || info.water_end<0) ){
        info.water_fee = 0.00
      }else{
        if(info.water_start*1 > info.water_end*1){
          info.water_fee = 0.00
        }else{
          info.water_value = (info.water_end*1 - info.water_start*1).toFixed(2);
          info.water_fee = (info.water_value*1 * base_number * this.showInfo.water_fee*1 * info.water_multiple).toFixed(2);
        }
      }
      // energy_start 电费差
      if((isNaN(info.energy_start) || info.energy_start<0) || (isNaN(info.energy_end) || info.energy_end<0) ){
        info.energy_fee = 0.00
      }else{
        if(info.energy_start*1 > info.energy_end*1){
          info.energy_fee = 0.00
        }else{
          info.energy_value = (info.energy_end*1 - info.energy_start*1).toFixed(2);
          info.energy_fee = (info.energy_value*1 * base_number * this.showInfo.energy_fee*1 * info.energy_multiple).toFixed(2);
        }
      }
      //water_share_fee 水费公摊
      info.water_share_fee = (base_water * day_number * base_number).toFixed(2);
      //energy_share_fee 电费公摊
      info.energy_share_fee = (base_energy * day_number * base_number).toFixed(2);
      // flue_fee 烟道清洗
      info.flue_fee = (day_number*1 / days * base_number * this.showInfo.flue_fee*1).toFixed(2)
      // kill_fee 消杀
      info.kill_fee = (day_number*1 / days * base_number * this.showInfo.kill_fee*1).toFixed(2)
      // network_fee 网络使用费
      info.network_fee = (day_number*1 / days * base_number * this.showInfo.network_fee*1).toFixed(2);
      // storage_fee 库房费
      info.storage_fee = (day_number*1 / days * base_number * this.showInfo.storage_fee*1).toFixed(2);
      //  health_fee 卫生费
      info.health_fee = (day_number*1 / days * base_number * this.showInfo.health_fee*1).toFixed(2);

      // 总计
      info.total = '';
      info.total = this.getPayItemTotal(info);
      this.paymentModal = true;
    },
    // 更新
    updateComputedPaper(){
      this.paymentModal = false;
      this.computedPaper( this.paymentItem )
    },
    // 确定账单
    confrimPaper(){
      addStoreCharge(this.paymentItem).then(res => {
        const dbody = res.data
        this.paymentItem = {};
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return;
        }
        this.$Notice.warning({
          title: '添加缴费账单成功！',
        })
        // 刷新表格
        this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id})
      })
    },
    // 获取账单列表
    getStorePaymentList(data){
      getStoreChargeList(data).then(res => {
        const dbody = res.data
        this.page = dbody.data.page;
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
        }
        if(!dbody.data.list){
          this.storeFeeTable = [];
        }else{
          this.storeFeeTable = dbody.data.list;
        }
        // 获取要缴费的商户
        this.queryStoreByEnergyPayList( { month : this.select_time , kitchen_id:this.select_kitchen.id });
      });
    },
    getNewPage(page){
      let data = { month : this.select_time , kitchen_id:this.select_kitchen.id };
      data.page = page;
      getStoreChargeList(data).then(res => {
        const dbody = res.data
        this.page = dbody.data.page;
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
        }
        if(!dbody.data.list){
          this.storeFeeTable = [];
        }
        this.storeFeeTable = dbody.data.list;
      });
    },
    // handleDelePayItem 删除一项
    handleDelePayItem( params ){
      let that = this;
      let store_id = params.row.store_id;
      let id = params.row.id;
      deleteStoreCharge( { id : id } ).then(res => {
        const dbody = res.data
        if(dbody.code != 0){
          this.$Notice.warning({
            title: dbody.msg,
          })
          return
        }
        this.$Notice.warning({
          title: "删除成功！",
        })
        that.storeFeeTable.forEach( function(element, index , arr) {
          if (element.store_id == store_id) {
            that.storeFeeTable.splice(index, 1)
            return
          }
        });
        that.store_arr_btn_list.forEach( function(item, index , arr) {
          if (item.store_id == store_id) {
            item.isShow = true;
            return
          }
        });
      })
    },
    // handleDelePayItem 查看一项
    handleViewPayItem(params){
      this.viewItem = {};
      this.viewItem = params.row;
      this.viewItem.water_value = this.viewItem.water_start - this.viewItem.water_end;
      this.viewItem.energy_value = this.viewItem.water_value - this.viewItem.energy_end;
      this.viewItem.total = this.getPayItemTotal(this.viewItem);
      this.viewModal = true;
    },
    // 计算合计
    getPayItemTotal( info ){
      let total = 0;
      total = info.garbage_fee*1 + total;
      total = info.water_fee*1 + total;
      total = info.energy_fee*1 + total;
      total = info.water_share_fee*1 + total;
      total = info.energy_share_fee*1 + total;
      total = info.flue_fee*1 + total;
      total = info.kill_fee*1 + total;
      total = info.network_fee*1 + total;
      total = info.storage_fee*1 + total;
      total = info.health_fee*1 + total;
      total = info.fine_fee*1 + total;
      total = info.one_fee*1 + total;
      total = info.other_fee*1 + total;
      total = info.project_fee*1 + total;
      total = info.taxes_fee*1 + total;
      return total.toFixed(2);
    },
    // 获取公摊电表总数
    // 初始化
    queryMeterList( data ){
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
        this.record_list = dbody.data || [];
        this.record_list.forEach( function(element, index) {
          // if(!!element.store_no){
          //   return
          // }
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
  mounted () {
    let mYear = new Date().getFullYear();
    let mMonth = (new Date().getMonth() + 1) + ''
    mMonth = mMonth < 10 ? "0" + mMonth : mMonth;
    this.select_time = mYear +'-'+ mMonth;
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data.list || []
      this.select_kitchen = this.kitchen[this.kitchen.length*1-1];
      this.select_kitchen_id = this.select_kitchen.id;
      this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id })
    })
  },
  computed:{
    // 计算公摊天数
    base_store_days:function(){
      let that = this;
      if(this.base_store_list.length <= 0){
        return 0;
      }else{
        let total_days = 0;
        this.base_store_list.forEach( function(item) {
          let id = item;
          total_days = total_days + item.days*1;
        });
        return total_days;
      }
    },
    // // 展示部分 电表总计
    showEnergyTableTotal:function() {
      let that = this;
      if(this.energy_record_list.length <= 0){
        return 0;
      }else{
        let total = 0;
        this.energy_record_list.forEach( function(item) {
          total = total + ((item.end_value*1 - item.start_value*1)*item.multiple)
        });
        return total.toFixed(2);
      }
    },
    // // 展示部分 水表总计
    showWaterTableTotal:function() {
      let that = this;
      if(this.water_record_list.length <= 0){
        return 0;
      }else{
        let total = 0;
        this.water_record_list.forEach( function(item) {
          total = total + ((item.end_value*1 - item.start_value*1)*item.multiple)
        });
        return total.toFixed(2);
      }
    },
  }
}
</script>

<style lang="less">
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
      // color:#464c5b;
      // border:1px solid #464c5b;
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
  .check_label{
    margin: 4px;
    padding: 0 5px;
    background-color: #eee;
    border-radius: 4px;
    height: 2.4em;
    line-height: 2.4em;
  }
  .check_label_days{
    background-color: pink;
    color:#464c5b;
    padding: 3px;
    border-radius: 3px;
  }
</style>
