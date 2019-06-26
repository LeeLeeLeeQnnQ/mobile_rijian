<template>
  <div>
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
    <Card shadow>
      <Modal v-model="showEditStoreBillModal" title="编辑房租" @on-ok="editStoreBill" :mask-closable="false">
        <Form :model="storeBill" :label-width="80">
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem>
                <span>{{storeBill.month}} / {{storeBill.store_name}}</span>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="房租">
                <Input v-model="storeBill.rent_bill" style="width: 200px" ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="10">
              <FormItem label="滞纳金">
                <Input v-model="storeBill.late_fee" style="width: 200px" ></Input>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Modal>
      <Modal v-model="paymentModal" scrollable @on-ok="confrimPaper" fullscreen>
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
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="4">
                <FormItem label="滞纳金">
                  <Input v-model="paymentItem.late_fee" @on-change="updateComputedPaper"></Input>
                </FormItem>
              </i-col>
            </Row>
          </Card>
          <Card style="margin-top: 5px;">
            <h3>总计：{{paymentItem.total}}</h3>
          </Card>
        </Form>
      </Modal>
      <tables :columns="bill_columns" v-model="bill_list" @data-view="viewEnergyBill" @data-edit-rent="showEditStoreRentBill" @data-edit-run="showEditStoreRunBill"></tables>
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList , getStoreChargeList} from '@/api/data'
export default {
  name: 'kitchen-kitchen-bill',
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
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 表格
      bill_columns:[
        {title: '厨房', key: 'kitchen_name'},
        {title: '月份', key: 'month'},
        {title: '商户', key: 'store_name'},
        {title: '经营费用', key: 'engery_bill'},
        {title: '房租', key: 'rent_bill'},
        {title: '往期未缴', key: 'late_fee'},
        { title: '总未缴款',
          key: 'unpaid_fee',
          render: (h, params) => {
            let unpaid_fee = params.row.unpaid_fee;
            if(unpaid_fee*1 > 1000){
              return h('span', { style: {color: '#ff9900'}}, unpaid_fee)
            }else if( unpaid_fee*1 > 0){
              return h('span', { style: {color: '#2d8cf0'}}, unpaid_fee)
            }else{
              return h('span', { style: {color: '#19be6b'}}, unpaid_fee)
            }
          }
        },
        {
          title: '查看',
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
              '经营费用')
            }
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          width :180,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '编辑经营费用！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-run', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '经营费用')
              ])
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '编辑租金！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-rent', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '租金')
              ])
            },
          ]
        },
      ],
      bill_list:[
        {
          kitchen_name:'四道口厨房',
          store_name:'鲜芋仙',
          month:'2019-04',
          engery_bill:'1050.00',
          rent_bill:'25000.00',
          late_fee:'0',
          unpaid_fee:'1500'
        }
      ],
      // 编辑商户账单
      storeBill:{},
      showEditStoreBillModal:false,
      // 查看能源账单
      viewModal:false,
      viewItem:{},
      // 能源费用列表
      storeFeeTable:[],
      // 编辑经营费用
      paymentModal:false,
      paymentItem:{},
    }
  },
  methods: {
    // 搜索
    // 选择厨房
    selectKitchen(){
      
    },
    //选择时间
    selectDate(){

    },
    // 选择新页面
    getNewPage(){

    },
    // 显示弹窗
    showEditStoreRentBill(params){
      this.storeBill = {}
      this.storeBill = params.row;
      this.showEditStoreBillModal = true;
    },
    // 编辑商户账单
    editStoreBill(){
      // 在这里删除多余key

      // 验证操作
      if(isNaN(this.storeBill.engery_bill*1)){
        this.$Notice.warning({
          title: '非数字！'
        })
        return
      }

      // 提交修改

    },
    viewEnergyBill(params){
      this.viewItem = {};
      let id = params.row.store_id;

      // 这里写查找操作
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
    // 获取账单列表
    getStorePaymentList(data){
      // getStoreChargeList(data).then(res => {
      //   const dbody = res.data
      //   this.page = dbody.data.page;
      //   if(dbody.code != 0){
      //     this.$Notice.warning({
      //       title: dbody.msg,
      //     })
      //   }
      //   if(!dbody.data.list){
      //     this.storeFeeTable = [];
      //   }else{
      //     this.storeFeeTable = dbody.data.list;
      //   }
      // });
    },
    // 显示弹窗
    showEditStoreRunBill(params){
      this.paymentItem = {}
      this.paymentItem = params.row;
      this.paymentModal = true;
    },
    // 提交经营费用
    confrimPaper(){

    },
    // 计算总额
    updateComputedPaper(){

    },
    //初始化
    initData( info ){
      // 获取已经生成列表的商户
      this.getStorePaymentList( info );
    },
  },
  created () {
    // 获取当前时间
    let mYear = new Date().getFullYear();
    let mMonth = (new Date().getMonth() + 1) + '';
    mMonth = mMonth < 10 ? "0" + mMonth : mMonth;
    this.select_time = mYear +'-'+ mMonth;
    // 获取厨房列表
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

</style>
