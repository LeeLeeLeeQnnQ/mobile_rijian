<template>
  <Card>
    <Modal title="预览图" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <Form ref="baseinfo" :model="baseinfo" :label-width="80">
    <Divider orientation="left" dashed>基本资料</Divider>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="店铺名称" class="cellTit">
            <span>{{formItem.store_name}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="店主姓名" class="cellTit">
            <span>{{formItem.shopkeeper}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="店铺电话" class="cellTit">
            <span>{{formItem.shopkeeper_phone}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="负责店长" class="cellTit">
            <span>{{formItem.manage_name}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="招商经理" class="cellTit">
            <span>{{formItem.manage_lease}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="所属厨房" class="cellTit">
            <span>{{formItem.kitchen_name}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="档口选择" class="cellTit">
            <span>{{formItem.store_no}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="财务上传">
          <div class="img-upload-list" v-for="item in recordList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Divider orientation="left" dashed>凭证资料</Divider>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="合同照片">
          <div class="img-upload-list" v-for="item in contractList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="店主身份证">
          <div class="img-upload-list"  v-for="item in shopkeeperIDcardList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="起租函">
          <div class="img-upload-list" v-for="item in rentCreatList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="店铺合同">
          <div class="img-upload-list" v-for="item in shopContractList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="授权合照">
          <div class="img-upload-list" v-for="item in authorizedPhotoList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="其他凭证">
          <div class="img-upload-list" v-for="item in otherProofList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Divider orientation="left" dashed>金额相关</Divider>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="月租金(元)" class="cellTit">
          <span>{{baseinfo.month_rent}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="押金(元)" class="cellTit">
          <span>{{baseinfo.deposit_fee}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="入场费(元)" class="cellTit">
          <span>{{baseinfo.entrance_fee}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="其他费用(元)" class="cellTit">
          <span>{{baseinfo.other_fee}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="增容费(元)" class="cellTit">
          <span>{{baseinfo.zr_fee}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="燃气费(元)" class="cellTit">
          <span>{{baseinfo.gas_fee}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="库房费用(元)" class="cellTit">
          <span>{{baseinfo.storage_fee}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="一次性费用(元)" class="cellTit">
          <span>{{baseinfo.one_fee}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="起租日期" class="cellTit">
          <span>{{baseinfo.start_date}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="免租期(天)" class="cellTit">
          <span>{{baseinfo.free_day}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="到期时间" class="cellTit">
          <span>{{baseinfo.end_date}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Divider orientation="left" dashed>退租相关</Divider>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="10">
        <FormItem label="申请日期" class="cellTit">
          <span>{{baseinfo.apply_date}}</span>
        </FormItem>
      </i-col>
      <i-col span="10" offset="2">
        <FormItem label="结算日期" class="cellTit">
          <span>{{baseinfo.settle_date}}</span>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="退租函">
          <div class="img-upload-list" v-for="item in endLetterList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col span="20">
        <FormItem label="退租其他">
          <div class="img-upload-list" v-for="item in otherEndProofList">
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
          </div>
        </FormItem>
      </i-col>
    </Row>
    <Divider orientation="left" dashed>表格数据</Divider>
    <Row type="flex" justify="start" align="middle" :gutter="20">
      <i-col  span="22">
        <FormItem >
          <Table :columns="tableColumns" :data="tableData">
            <div slot="footer" class="tableFooter">
              <h3>总计： {{ tableTotal }}</h3>
            </div>
          </Table>
        </FormItem>
      </i-col>
    </Row>
    <Divider orientation="left" dashed>意见沟通</Divider>
    <Row :gutter="20">
      <i-col span="22" offset="1" >
        <Card shadow v-for="item in remarkList" style="margin: 8px 0">
          <p slot="title">{{item.content}}</p>
          <p style="margin-top:5px;">{{item.nameStamp}}</p>
        </Card>
      </i-col>
    </Row>
    </Form>
  </Card>
</template>

<script>
import { getShopDetail } from '@/api/data'
export default {
  name: 'kichen-data-shop-detail',
  data () {
    return {
      // store_id
      store_id: '',
      // 表哥数据
      formItem: {
        store_name: '',
        shopkeeper: '',
        shopkeeper_phone: '',
        manage_id: '',
        manage_name: '',
        manage_lease_id: '',
        manage_lease: '',
        kitchen_id: '',
        store_no: ''
      },
      // 基本信息
      baseinfo: {
        month_rent: '',
        deposit: '',
        entrance: '',
        other_fee: '',
        entrance_date: '',
        start_date: '',
        end_date: '',
        free_day: '',
        opinion: '',
        opinion_type: '1'
      },
      // 表格头
      tableColumns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '收支',
          key: 'rent_type',
          render: (h, params) => {
            return h('strong', params.row.rent_type == '1' ? '收入' : '支出')
          }
        },
        {
          title: '数量',
          key: 'quantity'
        },
        {
          title: '金额',
          key: 'money'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
      // 表哥
      tableData: [],
      // 表哥踪迹
      tableTotal: '0.00',
      // 表哥弹窗
      showModal: false,
      // 图片
      imgUrl: '',
      visible: false,
      // 财务上传
      recordList: [],
      // 合同资料
      contractList: [],
      // 店主身份证
      shopkeeperIDcardList: [],
      // 起租函照片
      rentCreatList: [],
      // 店铺合同照片
      shopContractList: [],
      // 授权合照
      authorizedPhotoList: [],
      // 其他凭证
      otherProofList: [],
      // 退场函
      endLetterList: [],
      // 退场其他
      otherEndProofList: [],
      // 意见列表
      remarkList: []
    }
  },
  methods: {
    // 获取评论列表
    getRemarkList (log) {
      let that = this
      let list = []
      log.forEach(function (i, j) {
        let item = {}
        item.content = i.content
        item.nameStamp = i.creator_name + ' / ' + i.create_time
        list.push(item)
      })
      return list
    },
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 获取表格总计
    getTableSum () {
      if (this.tableData.length > 0) {
        let t = 0
        this.tableData.forEach(function (i, j) {
          if (i.rent_type == '1') {
            t += 1 * i.money * i.quantity
          } else {
            t -= 1 * i.money * i.quantity
          }
        })
        return t.toFixed(2)
      } else {
        return '0.00'
      }
    },
    // 清除空值
    trimNull (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == '' || typeof (array[i]) === 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array.length > 0 ? array : null
    },
    // Initialize
    initializeFn (dbody) {
      // 初始化数据
      this.formItem.store_name = dbody.store_name || '未完善'
      this.formItem.shopkeeper = dbody.shopkeeper || '未完善'
      this.formItem.shopkeeper_phone = dbody.shopkeeper_phone || '未完善'
      this.formItem.manage_name = dbody.manage_name || '未完善'
      this.formItem.manage_lease = dbody.manage_lease || '未完善'
      this.formItem.store_no = dbody.store_no || '未完善'
      this.formItem.kitchen_name = dbody.kitchen_name || '未完善'
      // 财务已经上传凭证
      if(!!dbody.pay){
        this.recordList = this.trimNull(dbody.pay.split(','))
      }
      // 合同资料
      if(!!dbody.contract){
        this.contractList = this.trimNull(dbody.contract.split(','))
      }
      // 店主身份证
      if(!!dbody.identity){
        this.shopkeeperIDcardList = this.trimNull(dbody.identity.split(','))
      }
      // 起租函照片
      if(!!dbody.start_letter){
        this.rentCreatList = this.trimNull(dbody.start_letter.split(','))
      }
      // 店铺合同照片
      if(!!dbody.store_contract){
        this.shopContractList = this.trimNull(dbody.store_contract.split(','))
      }
      // 授权合照
      if(!!dbody.figure){
        this.authorizedPhotoList = this.trimNull(dbody.figure.split(','))
      }
      // 凭证
      if(!!dbody.start_other){
        this.otherProofList = this.trimNull(dbody.start_other.split(','))
      }
      // 退场函
      if(!!dbody.end_letter){
        this.endLetterList = this.trimNull(dbody.end_letter.split(','))
      }
      // 退场其他
      if(!!dbody.end_other){
        this.otherEndProofList = this.trimNull(dbody.end_other.split(','))
      }
      // 基本资料
      this.baseinfo.month_rent = dbody.month_rent || '未完善'
      this.baseinfo.entrance_fee = dbody.entrance_fee || '未完善'
      this.baseinfo.deposit_fee = dbody.deposit_fee || '未完善'
      this.baseinfo.zr_fee = dbody.zr_fee || '未完善'
      this.baseinfo.gas_fee = dbody.gas_fee || '未完善'
      this.baseinfo.storage_fee = dbody.storage_fee || '未完善'
      this.baseinfo.one_fee = dbody.one_fee || '未完善'
      this.baseinfo.other_fee = dbody.other_fee || '未完善'
      
      this.baseinfo.start_date = dbody.start_date || '未填写'
      this.baseinfo.end_date = dbody.end_date || '未填写'
      this.baseinfo.free_day = dbody.free_day || '未填写'
      this.baseinfo.apply_date = dbody.apply_date || '未填写'
      this.baseinfo.settle_date = dbody.settle_date || '未填写'
      // 意见沟通
      this.remarkList = this.getRemarkList(dbody.log) || []
      // 表哥数据
      this.tableData = dbody.rent
      this.tableTotal = this.getTableSum()
    }
  },
  created: function () {
    let id = this.$route.query.id
    let that = this
    this.store_id = id
    getShopDetail({id: id, lease_type: 0}).then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        setTimeout(function (argument) {
          that.$router.go(-1)
        }, 1000)
        return
      }
      // 初始化函数
      this.initializeFn(dbody.data)
    })
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
</style>
