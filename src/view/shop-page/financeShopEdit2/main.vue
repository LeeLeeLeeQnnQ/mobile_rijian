<template>
    <Card shadow>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <Modal v-model="vStartshowModal" title="起租表格编辑" @on-ok="saveVStartModalInfo">
        <Form :model="v_start_modalItem" :label-width="80">
          <FormItem label="项目名称">
            <Select v-model="v_start_modalItem.category_id" @on-change="setVStartModalTitle">
                <Option v-for="item in v_start_workCategoryList" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="收支类型">
            <RadioGroup v-model="v_start_modalItem.rent_type">
                <Radio label="1">应收</Radio>
                <Radio label="2">减免</Radio>
            </RadioGroup>
          </FormItem>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="项目金额">
                <Input v-model="v_start_modalItem.money" placeholder="输入金额"></Input>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="项目数量">
                <Input v-model="v_start_modalItem.quantity" placeholder="输入数量"></Input>
              </FormItem>
            </i-col>
          </Row>
          <FormItem label="项目备注">
              <Input v-model="v_start_modalItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
          </FormItem>
        </Form>
      </Modal>
      <p slot="title">
        {{kitchen_name}}  {{store_no}}  {{store_name}}
      </p>
      <Tabs :animated="false" style="margin-top: 5px;" class="h100">
        <TabPane label="基本资料">
          <Form :label-width="100" class="h100">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺名称">
                  <Input v-model="baseinfo.store_name" placeholder="输入店铺名称"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店主姓名">
                  <Input v-model="baseinfo.shopkeeper" placeholder="输入店主姓名"></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺电话" prop="shopkeeper_phone">
                    <Input v-model="baseinfo.shopkeeper_phone" placeholder="输入店铺联系电话"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="负责店长" prop="manage_id">
                    <Select v-model="baseinfo.manage_id" @on-change="selectmanageName">
                      <Option v-for="item in manageList" :value="item.id" :key="item.id">{{ item.fullname }}</Option>
                    </Select>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="招商经理" prop="manage_lease_id">
                    <Select v-model="baseinfo.manage_lease_id" @on-change="selectmanageLease">
                      <Option v-for="item in leasingList" :value="item.id" :key="item.id">{{ item.fullname }}</Option>
                    </Select>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="所属厨房" prop="kitchen_id">
                  <Select v-model="baseinfo.kitchen_id" @on-change="selectKitchen">
                      <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="档口选择" prop="store_no">
                  <Select v-model="baseinfo.store_no">
                      <Option v-for="item in shopList" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem>
                  <Button @click="baseinfoSubmit" type="warning">保存</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="起租凭证">
          <Form :label-width="100">
            <FormItem label="起租凭证">
              <div class="img-upload-list" v-for="item in voucherinfo_pay">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemovePayImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="voucherinfoPayImg"
                :show-upload-list="false"
                :on-success="handleSuccessPayImg"
                :before-upload="handleBeforeUpload"
                :format="['jpg','jpeg','png']"
                :max-size="2000"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="起租表格">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="24">
                  <FormItem>
                    <Button type="primary" @click="addVStartTableDataItem">增加一条</Button>
                  </FormItem>
                </i-col>
                <i-col span="22" style="margin-top:8px;">
                  <Table :columns="v_start_tableColumns" :data="v_start_tableData">
                    <div slot="footer" class="tableFooter">
                      <h3>总计： {{ startTableTotal }}</h3>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="10">
                  <FormItem>
                    <Button @click="vStartInfoSubmit" type="warning">保存</Button>
                  </FormItem>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="退租凭证">
          <Form :label-width="100" class="h100">
            <FormItem label="财务打款凭证">
              <div class="img-upload-list" v-for="item in archive">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveArchiveImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="archiveImg"
                :show-upload-list="false"
                :on-success="handleSuccessArchiveImg"
                :before-upload="handleBeforeUpload"
                :format="['jpg','jpeg','png']"
                :max-size="2000"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </FormItem>
            <FormItem label="退租表格">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22" style="margin-top:8px;">
                  <Table :columns="end_tableColumns" :data="end_tableData">
                    <div slot="footer" class="tableFooter">
                      <h3>总计： {{ endTableTotal }}</h3>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem>
                  <Button @click="leaseinfoSubmit" type="warning">确定</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
</template>

<script>
import { getStoreEmployeeList , showStoreDevice } from '@/api/kitchen'
import { uploadImg, getManageList , getLeasingList , getShopDetail , getKitchenList , getStoreNoList , setStartShopEdit , setEndShopEdit , getWorkCategoryList } from '@/api/data'
export default {
  name: 'finance-store-edit2',
  data () {
    return {
      // kitchen_id
      kitchen_id:'',
      // store_id
      store_id: '',
      // 名称显示
      kitchen_name:'',
      store_name: '',
      store_no: '',
      // 基本资料
      baseinfo:{},
      // 店长列表
      manageList: [],
      // 招商列表
      leasingList:[],
      // 厨房列表
      kitchenList:[],
      // 商户列表
      shopList:[],
      // 租期租约
      leaseinfo:{},
      // 凭证资料
      voucherinfo:{},
      // 财务凭证
      voucherinfo_pay:[],
      vStartshowModal:false,
      v_start_tableData:[],
      // 获取起租表格下拉选项
      v_start_workCategoryList:[],
      v_start_modalItem:{},
      // 凭证资料表格头
      v_start_tableColumns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '收支',
          key: 'rent_type',
          render: (h, params) => {
            return h('strong', params.row.rent_type == '1' ? '应收' : '减免')
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
        },
        {
          title: '操作',
          key: 'handle',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                attrs:{
                  style:"",
                },
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeVEndTableDataItem(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 图片
      imgUrl: '',
      visible: false,
      // 财务上传退租凭证
      archive:[],
      // 表格
      end_tableData:[],
      end_tableColumns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '收支',
          key: 'rent_type',
          render: (h, params) => {
            return h('strong', params.row.rent_type*1 == 1 ? '收入' : '支出')
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
        },
        // {
        //   title: '操作',
        //   key: 'handle',
        //   width: 150,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'error',
        //           size: 'small'
        //         },
        //         on: {
        //           click: () => {
        //             this.removeItem(params.index)
        //           }
        //         }
        //       }, '删除')
        //     ])
        //   }
        // }
      ],
    }
  },
  methods: {
    // 基本资料卡片
    // 依据店长ID获取店长姓名
    selectmanageName () {
      let key = this.baseinfo.manage_id
      let that = this
      this.manageList.forEach(function (item) {
        if (item.id == key) {
          that.baseinfo.manage_name = item.fullname
        }
      })
    },
    // 依据招商ID获取店长姓名
    selectmanageLease () {
      let key = this.baseinfo.manage_lease_id
      let that = this
      this.leasingList.forEach(function (item) {
        if (item.id == key) {
          that.baseinfo.manage_lease = item.fullname
        }
      })
    },
    selectKitchen () {
      const id = this.baseinfo.kitchen_id;
      let that = this;
      this.baseinfo.store_no = '';
      getStoreNoList({ kitchen_id:id }).then(res => {
        const dbody = res.data
        this.shopList = dbody.data || [];
      })
    },
    // 提交基本卡片
    baseinfoSubmit(){
      if (this.baseinfoSubmitValidateField(this.baseinfo)) {
        this.baseinfo.store_id = this.store_id;
        setStartShopEdit(this.baseinfo).then(res => {
          const dbody = res.data
          if (dbody.code == 0) {
            this.$Notice.warning({
              title: '信息提交完成！'
            })
          } else {
            this.$Notice.warning({
              title: dbody.msg
            })
          }
        })
      }
    },
    // 提交验证器
    baseinfoSubmitValidateField(obj) {
      obj.store_name = obj.store_name.trim()
      if (!obj.store_name) {
        this.$Notice.warning({
          title: '请输入正确标题！'
        })
        return false
      }
      if (!obj.shopkeeper) {
        this.$Notice.warning({
          title: '请输入正确店主信息！'
        })
        return false
      }
      let phoneReg = /^1\d{10}$/
      if (!obj.shopkeeper_phone || !phoneReg.test(obj.shopkeeper_phone)) {
        this.$Notice.warning({
          title: '请输入正确店主手机号！'
        })
        return false
      }
      if (!obj.manage_id || !obj.manage_name) {
        this.$Notice.warning({
          title: '请选择店长！'
        })
        return false
      }
      if (!obj.manage_lease_id || !obj.manage_lease) {
        this.$Notice.warning({
          title: '请选择招商经理！'
        })
        return false
      }
      if (!obj.kitchen_id) {
        this.$Notice.warning({
          title: '请选择厨房！'
        })
        return false
      }
      if (!obj.store_no) {
        this.$Notice.warning({
          title: '请选择档口号！'
        })
        return false
      }
      return true
    },
    // 提交签约凭证
     // 验证表格信息
    formModalInfo: function (obj) {
      obj.title = obj.title.trim()
      obj.money = (obj.money * 1).toFixed(2)
      let priceReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!obj.title) {
        this.$Notice.warning({
          title: '请输入正确名称！'
        })
        return true
      }
      if (!obj.rent_type) {
        this.$Notice.warning({
          title: '请选择正确收支选项！'
        })
        return true
      }
      if (!obj.quantity || (obj.quantity <= 0)) {
        this.$Notice.warning({
          title: '请正确输入数量！'
        })
        return true
      }
      if (!obj.money || obj.money * 1 <= 0 || !priceReg.test(obj.money)) {
        this.$Notice.warning({
          title: '请输入正确金额！'
        })
        return true
      };
      return false
    },
    // 发送触发
    handleBeforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
      }
    },
    // 图片错误提示
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传jpg／jpeg／png格式.'
      })
    },
    // 图片超大提示
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过最大限制',
        desc: '文件  ' + file.name + ' 过大, 不能超过 2M.'
      })
    },
    // 删除起租凭证图片
    handleRemovePayImg (file) {
      this.voucherinfo_pay.splice(this.voucherinfo_pay.indexOf(file), 1)
    },
    // 获取起租凭证图片
    handleSuccessPayImg (res, file) {
      if (res.code == 0) {
        if(!this.voucherinfo_pay){
          this.voucherinfo_pay = [];
        }
        this.voucherinfo_pay.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },
    //起租表格编辑
    addVStartTableDataItem(){
      this.v_start_modalItem = {
        category_id:'',
        title: '',
        rent_type: 1,
        money: '',
        remark: '',
        quantity: 1
      };
      this.vStartshowModal = true;
    },
    //删除表格信息 
    removeVEndTableDataItem(index){
      this.v_start_tableData.splice(index, 1)
    },
    // 起租弹窗下啦事件
    setVStartModalTitle(){
      let that = this;
      let id = this.v_start_modalItem.category_id;
      this.v_start_workCategoryList.forEach( function( item ) {
        if( item.id ==  id ){
          that.v_start_modalItem.title = item.title;
          return;
        }
      });
    },
    // 保存起租表格信息
    saveVStartModalInfo(){
      if (this.formModalInfo(this.v_start_modalItem)) {
        return
      }
      this.v_start_tableData.push(this.v_start_modalItem)
    },
    // 保存签约凭证起租信息
    vStartInfoSubmit(){
      let info = {
        kitchen_id:this.kitchen_id,
        store_id:this.store_id,
      }
      info.rent = this.v_start_tableData;
      info.pay = this.voucherinfo_pay.length > 0 ? this.voucherinfo_pay.join(",") : '';
      setStartShopEdit( info ).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '信息提交完成！'
          })
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },

    // 删除财务凭证
    handleRemoveArchiveImg (file) {
      this.archive.splice(this.archive.indexOf(file), 1)
    },
    // 获取起租凭证图片
    handleSuccessArchiveImg (res, file) {
      if (res.code == 0) {
        if(!this.archive){
          this.archive = [];
        }
        this.archive.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },
    // 租期租约提交
    leaseinfoSubmit(){
      let obj = { store_id : this.store_id };
      obj.archive = this.archive.length > 0 ? this.archive.join(",") : '';
      setEndShopEdit(obj).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: "提交完成！"
          })
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },






    // 工具函数
    // 清除空值
    trimNull (array) {
      if(array.length <= 0){
        return null;
      }
      for (var i = 0; i < array.length; i++) {
        if (array[i] == '' || typeof (array[i]) === 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array;
    },
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    //基本资料卡片
    initBaseinfo( data ){
      this.baseinfo.store_name = data.store_name || '';
      this.baseinfo.shopkeeper = data.shopkeeper || '';
      this.baseinfo.shopkeeper_phone = data.shopkeeper_phone || '';
      this.baseinfo.manage_name = data.manage_name || '';
      this.baseinfo.store_no = data.store_no || '';
      this.baseinfo.manage_lease = data.manage_lease || '';
      this.baseinfo.kitchen_name = data.kitchen_name || '';
      this.baseinfo.kitchen_id = data.kitchen_id || '';
      this.baseinfo.manage_id = data.manage_id || '';
      this.baseinfo.manage_lease_id = data.manage_lease_id || '';
      this.baseinfo.store_no = data.store_no || '';
      getManageList().then(res => {
        const dbody = res.data
        let that = this
        this.manageList = dbody.data || []
      })
      getLeasingList().then(res => {
        const dbody = res.data
        let that = this
        this.leasingList = dbody.data || []
      })
      getKitchenList().then(res => {
        let that = this
        const dbody = res.data
        this.kitchenList = dbody.data || []
        this.kitchenList.forEach(function (item) {
          if (item.id == that.baseinfo.kitchen_id) {
            // 获取店铺
            getStoreNoList({kitchen_id:item.id}).then(res => {
              const body = res.data
              that.shopList = body.data || []
            })
          }
        })
      })
    },
    // 获取退租表格
    getEndTable( ){
      getShopDetail({id: this.store_id, lease_type: 2}).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: "退租表格数据获取失败！"
          })
        }
        this.end_tableData =  dbody.data.rent || [];
      })
    },
    //租期租约卡片
    initLeaseinfo( data ){
      // 获取凭证图片 
      this.archive = data.archive.length > 0 ? data.archive.split(",") : '';
      // 获取退租表格
      this.getEndTable();
    },
    // 签约凭证卡片
    initVoucherinfo( data ){
      // 起租表格
      this.getStartTable( );
      // 起租财务上传凭证
      this.voucherinfo_pay = this.trimNull(data.pay.split(',')) || [];
    },
    // 获取起租表格
    getStartTable( ){
      getShopDetail({id: this.store_id, lease_type: 1}).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: "起租表格数据获取失败！"
          })
        }
        this.v_start_tableData =  dbody.data.rent || [];
      })
    },
    //初始化数据
    initData ( data ) {
      //厨房  商户名 档口号
      this.kitchen_name = data.kitchen_name;
      this.store_name = data.store_name;
      this.store_no = data.store_no;
      this.initBaseinfo(data);
      this.initLeaseinfo(data);
      this.initVoucherinfo(data);
    }
  },
  computed: {
    startTableTotal:function() {
      if (this.v_start_tableData.length > 0) {
        let t = 0
        this.v_start_tableData.forEach(function (i, j) {
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
    endTableTotal:function() {
      if (this.end_tableData.length > 0) {
        let t = 0
        this.end_tableData.forEach(function (i, j) {
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
  },
  created: function () {
    let id = this.$route.query.id
    let kitchen_id = this.$route.query.kitchen_id
    let that = this
    this.store_id = id
    this.kitchen_id = kitchen_id
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
      this.initData(dbody.data)
      // 获取起租表格选项
      getWorkCategoryList( "7" ).then(res => {
        const dbody = res.data
        this.v_start_workCategoryList = dbody.data || [];
      })
    })
  }
}
</script>

<style lang="less" scoped>
  .tableFooter{
    margin-left: 20px;
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
