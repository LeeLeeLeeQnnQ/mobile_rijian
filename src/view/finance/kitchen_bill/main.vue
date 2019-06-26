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
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 预览凭证 -->
    <Modal title="凭证预览" v-model="showStoreBudgetList">
      <div class="img-upload-list" v-for="item in storeBudgetList">
        <div>
          <img :src="item">
          <div class="img-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          </div>
        </div>
      </div>
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
      <Modal v-model="showEditStoreBillModal" title="编辑商户账单" @on-ok="editStoreBill" :mask-closable="false">
        <Form :model="storeBill" :label-width="120">
          <Card shadow>
            <p slot="title">
                <Icon type="logo-usd" />
                {{storeBill.month}} {{storeBill.store_name}}  总未缴款 : {{(storeBill.unpaid_fee*1).toFixed(2)}} 
            </p>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="本次缴纳金额">
                  <Input v-model="storeBill.money" style="width: 200px"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="本次缴纳凭证">
                  <div class="img-upload-list" v-for="item in uploadLetter">
                    <div>
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item,'uploadLetter')"></Icon>
                      </div>
                    </div>
                  </div>
                  <Upload
                      ref="uploadLetter"
                      :show-upload-list="false"
                      :on-success="uploadLetterSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="4200"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="/api/Index/upload"
                      style="display: inline-block;width:60px;">
                      <div style="width: 60px;height:60px;line-height: 60px;">
                          <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                </FormItem>
              </i-col>
            </Row>
          </Card>
        </Form>
      </Modal>
      <Modal v-model="showEditStoreBudgetModal" title="本月上缴" :mask-closable="false" width="80%">
        <tables :columns="budget_columns" v-model="budget_list" @data-delete="deleteStoreBudget" @voucher-view="showStoreBudgetVoucher"></tables>
      </Modal>
      <tables :columns="bill_columns" v-model="bill_list" @data-view="viewEnergyBill" @data-add="showEditStoreBill" @data-edit="showEditStoreBudget" ></tables>
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList , getStoreChargeList } from '@/api/data'
export default {
  name: 'finance-kitchen-bill',
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
        {title: '能源费', key: 'engery_bill'},
        {title: '房租', key: 'rent_bill'},
        {title: '滞纳金', key: 'late_fee'},
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
              '查看能源账单')
            }
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                style: {},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑上缴列表')
            }
          ]
        },
        {
          title: '添加',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '添加商户收支！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-add', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {marginLeft: '8px'}
                }, '添加上缴')
              ])
            }
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
      // 图片
      imgUrl: '',
      visible: false,
      // 上传
      uploadLetter:[],
      // 收支表格
      budget_columns:[
        {title: '金额', key: 'money'},
        {title: '操作时间', key: 'time'},
        {title: '操作人', key: 'operator'},
        {
          title: '查看凭证',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Button', {
                style: {},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('voucher-view', params)
                  }
                }},
              '查看凭证')
            }
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '删除该条收支！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-delete', params)
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
        },
      ],
      budget_list:[
        {
          money:'1000',
          time:'2018-10-12 10:11',
          operator:'123456',
          voucher:'http://ww1.sinaimg.cn/bmiddle/6ba13c21gw1ek6c3auz9jj20fa0mxgnc.jpg',
        }
      ],
      // 展示收支
      showEditStoreBudgetModal:false,
      // 凭证
      showStoreBudgetList:false,
      storeBudgetList:[],
      // 查看能源账单
      viewModal:false,
      viewItem:{},
      // 能源费用列表
      storeFeeTable:[],
    }
  },
  methods: {
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 删除图片
    handleRemove (file, name) {
      const fileList = this.$refs[name].fileList
      this.$refs[name].fileList.splice(fileList.indexOf(file), 1)
      this[name].splice(fileList.indexOf(file), 1)
    },
    // 错误提示
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传jpg／jpeg／png格式.'
      })
    },
    // 超大提示
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过最大限制',
        desc: '文件  ' + file.name + ' 过大, 不能超过 2M.'
      })
    },
    // 发送触发
    handleBeforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
      }
    },
    // 退场其他
    uploadLetterSuccess (res, file) {
      if (res.code == 0) {
        this.uploadLetter.push(res.data)
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
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
    showEditStoreBill(params){
      this.uploadLetter = [];
      this.storeBill = {}
      this.storeBill = params.row;
      this.showEditStoreBillModal = true;
    },
    // 编辑商户账单
    editStoreBill(){
      // 验证操作
      if(isNaN(this.storeBill.engery_bill*1)){
        this.$Notice.warning({
          title: '非数字！'
        })
        return
      }

      // 提交修改

    },
    // 展示收支
    showEditStoreBudget(){
      this.showEditStoreBudgetModal = true;
    },
    // 展示凭证
    showStoreBudgetVoucher(params){
      console.log(1)
      let voucher = !!params.row.voucher ? params.row.voucher.split(',') : [];
      this.storeBudgetList = [];
      this.storeBudgetList = voucher;
      this.showStoreBudgetList = true;
    },
    // 删除一条收支
    deleteStoreBudget(params){

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
      });
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
