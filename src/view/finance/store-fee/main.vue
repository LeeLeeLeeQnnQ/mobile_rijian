<template>
  <div>
    <!-- 头部搜索 按钮 -->
    <Card shadow style="margin-bottom: 5px">
      <Row type="flex" justify="start" align="middle" :gutter="20">
        <i-col span="10">
          <Select v-model="select_kitchen_id" style="width: 200px;margin-right:10px;" @on-change="selectKitchen">
            <Option v-for="item in kitchen" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
          </Select>
          <DatePicker ref="datePicker" type="month" :value="select_time" placeholder="选择月份" format="yyyy-MM" @on-change="selectDate" style="width: 200px"></DatePicker>
        </i-col>
      </Row>
    </Card>
     <!-- 当铺表格卡片 -->
    <Card shadow style="margin-bottom: 5px">
      <p slot="title">店铺缴费单列表</p>
      <Table :columns="storeFeeTableColumns" :data="storeFeeTable" @data-view="handleViewPayItem"  ></Table>
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card> 
    <!-- 展示模版 -->
    <Modal title="账单信息" v-model="viewModal" scrollable fullscreen ok-text="生成缴费工单" @on-ok="changeIncomeOrder">
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
            <i-col span="20">
              <FormItem label="电费凭证">
                <div class="img-upload-list" v-for="item in viewItem.energyImgList">
                    <img :src="item">
                    <div class="img-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    </div>
                </div>
              </FormItem>
            </i-col>
          </Row>
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
            <i-col span="20">
              <FormItem label="水费凭证">
                <div class="img-upload-list" v-for="item in viewItem.waterImgList">
                    <img :src="item">
                    <div class="img-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    </div>
                </div>
              </FormItem>
            </i-col>
          </Row>
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
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="意见">
              <Input v-model="viewItem.remark" readonly type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="无意见"></Input>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
    <!-- 图片预览 -->
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 基本数据展示 -->
    <Card shadow style="margin-bottom: 5px">
      <p slot="title">基本数据</p>
      <Form ref="formItem" :model="showInfo" :label-width="80">
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="6">
            <FormItem label="垃圾及隔油池" class="cellTit">
                <span>{{showInfo.garbage_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="烟道清洗" class="cellTit">
                <span>{{showInfo.flue_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="消杀" class="cellTit">
                <span>{{showInfo.kill_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="网络使用费" class="cellTit">
                <span>{{showInfo.network_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="6">
            <FormItem label="库房费" class="cellTit">
                <span>{{showInfo.storage_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="卫生费" class="cellTit">
                <span>{{showInfo.health_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="水费基数" class="cellTit">
                <span>{{showInfo.water_fee}}</span>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="电费基数" class="cellTit">
                <span>{{showInfo.energy_fee}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="6">
            <FormItem label="商户数量" class="cellTit">
                <span>{{showInfo.store_count}}</span>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem label="公摊天数总量" class="cellTit">
              <span>{{showInfo.day_number}}</span>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="20">
            <FormItem label="电费凭证">
              <div class="img-upload-list" v-for="item in energyImgList">
                  <img :src="item">
                  <div class="img-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  </div>
              </div>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="电费公摊表格">
              <Table :columns="energyTableColumns" :data="energyTable">
                <div slot="footer" class="tableFooter">
                  <h3>总计： {{ showEnergyTableTotal }}</h3>
                </div>
              </Table>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="20">
            <FormItem label="水费凭证">
              <div class="img-upload-list" v-for="item in waterImgList">
                  <img :src="item">
                  <div class="img-upload-list-cover">
                      <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  </div>
              </div>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="水费公摊表格">
              <Table :columns="waterTableColumns" :data="waterTable">
                <div slot="footer" class="tableFooter">
                  <h3>总计： {{ showWaterTableTotal }}</h3>
                </div>
              </Table>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="意见">
              <Input v-model="showInfo.remark" readonly type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="无意见"></Input>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenList , getWorkCategoryList } from '@/api/data'
import { getKitchenChargeList , getStoreChargeList } from '@/api/kitchen'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'finance_count_fee',
  components: {
    Tables,
  },
  data () {
    return {
      // 搜索部分
      // 厨房列表
      kitchen:[],
      select_kitchen:'',
      select_kitchen_id:'',
      select_time:'',
      // 图片
      imgUrl: '',
      visible: false,
      //缴费部分
      storeFeeTableColumns:[
        {title: '厨房', key: 'kitchen_name'},
        {title: '商户', key: 'store_name'},
        {title: '档口号', key: 'store_no'},
        {title: '创建时间', key: 'create_time'},
        { title: '工单生成',
          render: (h, params) => {
            let status = params.row.is_work*1
            if (status == 1) { return h('span', { style: {color: '#ff9900'}} ,'已生成') };
            if (status != 1) { return h('span', { style: {color: '#2d8cf0'}} ,'未生成') };
          }
        },
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'handle',
          render: (h, params) => {
              return h('div', [
                  h('a', {
                      style: {
                      },
                      on: {
                          click: () => {
                              this.handleViewPayItem(params)
                          }
                      }
                  }, '查看')
              ]);
          }
        }
      ],
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
      // 展示部分
      showInfo:{},
      energyImgList:[],
      energyTableColumns: [
        {title: '电表名称', key: 'title'},
        {title: '添加时间', key: 'time'},
        {title: '起始值', key: 'start_value'},
        {title: '结束值', key: 'end_value'},
        {title: '计算值', key: 'value'},
        {title: '厨房基数', key: 'base_count'},
        {title: '合计', key: 'total_count'},
      ],
      energyTable:[],
      waterImgList:[],
      waterTableColumns:[
        {title: '电表名称', key: 'title'},
        {title: '添加时间', key: 'time'},
        {title: '起始值', key: 'start_value'},
        {title: '结束值', key: 'end_value'},
        {title: '计算值', key: 'value'},
        {title: '厨房基数', key: 'base_count'},
        {title: '合计', key: 'total_count'},
      ],
      waterTable:[],
    }
  },
  methods: {
    // 获取基本信息
    ...mapMutations([
      'setIncomeOrderData',
    ]),
    // 选择时间
    selectDate(date){
      this.select_time = date;
      this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id });
      this.getStorePaymentList({ month : this.select_time , kitchen_id:this.select_kitchen.id });
    },
    // 选择厨房
    // 厨房选择
    selectKitchen(){
      let that = this;
      this.kitchen.forEach( function(element, index) {
        if(that.select_kitchen_id == element.id){
          that.select_kitchen = element;
        }
      });
      this.getShowData({ month : this.select_time , kitchen_id:this.select_kitchen.id });
      this.getStorePaymentList({ month : this.select_time , kitchen_id:this.select_kitchen.id });
    },
    // 获取新页面
    getNewPage(page){
      let data = { month : this.select_time , kitchen_id:this.select_kitchen.id };
      this.getShowData(data);
      data.page = page;
      this.getStorePaymentList(data);
    },
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 获取厨房基本信息列表
    getShowData(data){
      getKitchenChargeList( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let info = dbody.data;
        // 分摊天数
        this.showInfo.day_number = !!info.day_number ? info.day_number : "暂无" ;
        // 垃圾及隔油池
        this.showInfo.garbage_fee = !!info.garbage_fee ? info.garbage_fee : "暂无" ;
        // 烟道清洗
        this.showInfo.flue_fee = !!info.flue_fee ? info.flue_fee : "暂无" ;
        // 消杀
        this.showInfo.kill_fee = !!info.kill_fee ? info.kill_fee : "暂无" ;
        // 网络使用费
        this.showInfo.network_fee = !!info.network_fee ? info.network_fee : "暂无" ;
        // 水费基数
        this.showInfo.water_fee = !!info.water_fee ? info.water_fee : "暂无" ;
        // 电费基数
        this.showInfo.energy_fee = !!info.energy_fee ? info.energy_fee : "暂无" ;
        // 库房费
        this.showInfo.storage_fee = !!info.storage_fee ? info.storage_fee : "暂无" ;
        // 卫生费
        this.showInfo.health_fee = !!info.health_fee ? info.health_fee : "暂无" ;
        // 活跃档口数量
        this.showInfo.store_count  = !!info.store_count ? info.store_count : "暂无" ;
        // 电表图片
        this.energyImgList = !!info.energy_image ? info.energy_image.split(',') : [] ;
        // 水表图片
        this.waterImgList = !!info.water_image ? info.water_image.split(',') : [] ;
        // 电表表格
        this.energyTable = !!info.energy_list ? JSON.parse(info.energy_list) : [];
        // 电表表格
        this.waterTable = !!info.water_list ? JSON.parse(info.water_list) : [];
      })
    },
    // 获取支付账单列表
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
    // handleDelePayItem 查看一项
    handleViewPayItem(params){
      this.viewItem = {};
      this.viewItem = params.row;
      this.viewItem.water_value = this.viewItem.water_start - this.viewItem.water_end;
      this.viewItem.energy_value = this.viewItem.water_value - this.viewItem.energy_end;
      this.viewItem.waterImgList = !!this.viewItem.water_image ? this.viewItem.water_image.split(",") : [];
      this.viewItem.energyImgList = !!this.viewItem.energy_image ? this.viewItem.energy_image.split(",") : [];
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
    // 生成缴费工单
    changeIncomeOrder(){
      let info = this.viewItem;
      let tableData = [];
      for(let key in info){
        let kItem = this.setTableItem( key );
        if(!!kItem){
          kItem.money = info[key];
          tableData.push(kItem);
        }
      }
      let data = {}
      data.title = info.month + " | " + info.kitchen_name + "/" + info.store_name + "【 "+ info.store_no +" 】缴费工单"
      data.kitchenSelect = info.kitchen_id
      data.kitchen_name = info.kitchen_name
      data.store_name = info.store_name
      data.store_no = info.store_no
      data.shopSelect = info.store_id
      data.tagSelect = "1"
      data.uploadList = this.energyImgList.concat(this.waterImgList);
      data.tableData = tableData;
      // 中转数据
      this.setIncomeOrderData(data);
      let id = data.shopSelect
      let work_id = info.id;
      const route = {
        name: 'finance_store_bill',
        query: {
          id,
          work_id
        }
      }
      this.$router.push(route)
    },
    // 生成对象
    setTableItem( key ){
      let modalItem = {
        category_id:'',
        title: '',
        pay_type: 1,
        money: '',
        remark: '',
        quantity: 1
      }
      switch ( key ) {
        case "garbage_fee":
          modalItem.category_id = 23;
          modalItem.title = '垃圾及隔油池';
          return modalItem;
          break;
        case "flue_fee":
          modalItem.category_id = 24;
          modalItem.title = '烟道清洗';
          return modalItem;
          break;
        case "kill_fee":
          modalItem.category_id = 29;
          modalItem.title = '消杀费';
          return modalItem;
          break;
        case "network_fee":
          modalItem.category_id = 41;
          modalItem.title = '网络费';
          return modalItem;
          break;
        case "water_fee":
          modalItem.category_id = 21;
          modalItem.title = '水费';
          return modalItem;
          break;
        case "energy_fee":
          modalItem.category_id = 22;
          modalItem.title = '电费';
          return modalItem;
          break;
        case "water_share_fee":
          modalItem.category_id = 76;
          modalItem.title = '水费分摊';
          return modalItem;
          break;
        case "energy_share_fee":
          modalItem.category_id = 77;
          modalItem.title = '电费分摊';
          return modalItem;
          break;
        case "storage_fee":
          modalItem.category_id = 25;
          modalItem.title = '库房使用费';
          return modalItem;
          break;
        case "manage_fee":
          modalItem.category_id = 39;
          modalItem.title = '物业管理费';
          return modalItem;
          break;
        case "health_fee":
          modalItem.category_id = 31;
          modalItem.title = '卫生费';
          return modalItem;
          break;
        case "project_fee":
          modalItem.category_id = 42;
          modalItem.title = '工程维修';
          return modalItem;
          break;
        case "fine_fee":
          modalItem.category_id = 40;
          modalItem.title = '罚款';
          return modalItem;
          break;
        case "one_fee":
          modalItem.category_id = 28;
          modalItem.title = '堂食耗材汇总';
          return modalItem;
          break;
        case "taxes_fee":
          modalItem.category_id = 32;
          modalItem.title = '代收税费';
          return modalItem;
          break;
        case "other_fee":
          modalItem.category_id = 33;
          modalItem.title = '其他';
          return modalItem;
          break;
        default:
          return false;
          break;
      }
    },
  },
  mounted () {
    let mYear = new Date().getFullYear();
    let mMonth = (new Date().getMonth() + 1) + ''
    mMonth = mMonth < 10 ? "0" + mMonth : mMonth;
    this.select_time = mYear +'-'+ mMonth;
    getKitchenList().then(res => {
      const dbody = res.data
      this.kitchen = dbody.data || []
      this.select_kitchen = this.kitchen[this.kitchen.length - 1];
      this.select_kitchen_id = this.select_kitchen.id;
      this.getStorePaymentList( { month : this.select_time , kitchen_id:this.select_kitchen.id } )
      this.getShowData( { month : this.select_time , kitchen_id:this.select_kitchen.id} )
    })
  },
  computed:{
    // 展示部分 电表总计
    showEnergyTableTotal:function() {
      let that = this;
      if(this.energyTable.length <= 0){
        return 0;
      }else{
        let total = 0;
        this.energyTable.forEach( function(item) {
          total = total + item.total_count*1
        });
        return total.toFixed(2);
      }
    },
    // 展示部分 水表总计
    showWaterTableTotal:function() {
      let that = this;
      if(this.waterTable.length <= 0){
        return 0;
      }else{
        let total = 0;
        this.waterTable.forEach( function(item) {
          total = total + item.total_count*1
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
    margin: 3px;
    padding: 0 5px;
    background-color: #eee;
    border-radius: 4px;
  }
  .check_label_days{
    background-color: pink;
    color:#464c5b;
    padding: 3px;
    border-radius: 3px;
  }
</style>
