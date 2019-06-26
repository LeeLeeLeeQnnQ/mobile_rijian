<template>
    <Card shadow>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <p slot="title">
        {{kitchen_name}}  {{store_no}}  {{store_name}}
      </p>
      <Tabs :animated="false" style="margin-top: 5px;" class="h100">
        <TabPane label="店铺租约">
          <Form :label-width="120">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="月租金">
                  <Input v-model="leaseinfo.month_rent" placeholder="输入月租金"></Input>
                </FormItem>
              </i-col>
               <i-col span="10" offset="2">
                <FormItem label="押金">
                  <Input v-model="leaseinfo.deposit_fee" placeholder="输入押金"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="其他费用">
                  <Input v-model="leaseinfo.other_fee" placeholder="输入其他费用"></Input>
                </FormItem>
              </i-col>
               <i-col span="10" offset="2">
                <FormItem label="增容费">
                  <Input v-model="leaseinfo.zr_fee" placeholder="输入增容费"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="燃气费">
                  <Input v-model="leaseinfo.gas_fee" placeholder="输入燃气费"></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="一次性费用">
                  <Input v-model="leaseinfo.one_fee" placeholder="输入一次性费用"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="上线日期">
                  <DatePicker type="date" placeholder="选择上线日期" :value="leaseinfo.online_date" @on-change="getOnlineDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
               <i-col span="10" offset="2">
                <FormItem label="免租期">
                  <Input v-model="leaseinfo.free_day" placeholder="输入免租期"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="到期时间">
                  <DatePicker type="date" placeholder="选择到期时间" :value="leaseinfo.end_date" @on-change="getEndDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20" style="margin-bottom: 300px;">
              <i-col span="10">
                <FormItem>
                  <Button @click="leaseinfoSubmit" type="warning">保存</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="合同凭证">
          <Form :label-width="100">
            <FormItem label="合同资料">
              <div class="img-upload-list" v-for="item in contract">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveContractImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="contractImg"
                :show-upload-list="false"
                :on-success="handleSuccessContractImg"
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
            <FormItem label="店主身份证">
              <div class="img-upload-list" v-for="item in identity">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveIdentityImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="identityImg"
                :show-upload-list="false"
                :on-success="handleSuccessIdentityImg"
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
            <FormItem label="店铺合同">
              <div class="img-upload-list" v-for="item in store_contract">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveStoreContractImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="storeContractImg"
                :show-upload-list="false"
                :on-success="handleSuccessStoreContractImg"
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
            <FormItem label="授权合照">
              <div class="img-upload-list" v-for="item in figure">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveFigureImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="storeFigureImg"
                :show-upload-list="false"
                :on-success="handleSuccessFigureImg"
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
            <FormItem label="起租其他凭证">
              <div class="img-upload-list" v-for="item in start_other">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveStartOtherImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="startOtherImg"
                :show-upload-list="false"
                :on-success="handleSuccessStartOtherImg"
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
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem>
                  <Button @click="leaseinfoImgSubmit" type="warning">保存</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>

      </Tabs>
    </Card>
</template>

<script>
import Tables from '_c/tables'
import { uploadImg, getShopDetail , setStartShopEdit } from '@/api/data'
export default {
  name: 'canvass_shop_edit',
  components: {
    Tables
  },
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
      // 租期租约
      leaseinfo:{},
      // 图片
      imgUrl: '',
      visible: false,

      // 凭证
      contract:[],
      identity:[],
      store_contract:[],
      figure:[],
      start_other:[],
    }
  },
  methods: {
    //公用函数
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


    // 租期租约卡片
    // 设置上限日期
    getOnlineDatePicker (date) {
      this.leaseinfo.online_date = date
    },
    // 设置公摊起始日期
    getEndDatePicker(date){
      this.leaseinfo.end_date = date
    },
    //租期租约卡片
    initLeaseinfo( data ){
      // 月租金
      this.leaseinfo.month_rent = data.month_rent || '';
      // 押金
      this.leaseinfo.deposit_fee = data.deposit_fee || '';
      // 入场费
      this.leaseinfo.entrance_fee = data.entrance_fee || '';
      // 其他费用
      this.leaseinfo.other_fee = data.other_fee || '';
      // 增容费
      this.leaseinfo.zr_fee = data.zr_fee || '';
      // 燃气费
      this.leaseinfo.gas_fee = data.gas_fee || '';
      // 库房费用
      this.leaseinfo.storage_fee = data.storage_fee || '';
      // 一次性费用(
      this.leaseinfo.one_fee = data.one_fee || '';
      // 上线日期
      this.leaseinfo.online_date = data.online_date || '';
      // 免租期
      this.leaseinfo.free_day = data.free_day || '';
      // 到期时间
      this.leaseinfo.end_date = data.end_date || '';
      // 合同资料
      this.contract = this.trimNull(data.contract.split(','))
      // 店主身份证
      this.identity = this.trimNull(data.identity.split(','))
      // 店铺合同
      this.store_contract = this.trimNull(data.store_contract.split(','))
      // 授权合照
      this.figure = this.trimNull(data.figure.split(','))
      // 起租其他凭证
      this.start_other = this.trimNull(data.start_other.split(','))
    },
    // 保存按钮
    leaseinfoSubmit( ){
      this.leaseinfo.kitchen_id = this.kitchen_id;
      this.leaseinfo.store_id = this.store_id;
      setStartShopEdit(this.leaseinfo).then(res => {
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


    //凭证卡片
    leaseinfoImgSubmit(){
      let obj = {};
      obj.contract = '';
      if(this.contract.length > 0){
        obj.contract = this.contract.join(',');
      }
      obj.identity = '';
      if(this.identity.length > 0){
        obj.identity = this.identity.join(',');
      }
      obj.store_contract = '';
      if(this.store_contract.length > 0){
        obj.store_contract = this.store_contract.join(',');
      }
      obj.figure = '';
      if(this.figure.length > 0){
        obj.figure = this.figure.join(',');
      }
      obj.start_other = '';
      if(this.start_other.length > 0){
        obj.start_other = this.start_other.join(',');
      }
      obj.kitchen_id = this.kitchen_id;
      obj.store_id = this.store_id;
      setStartShopEdit(obj).then(res => {
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

    // 删除合同资料
    handleRemoveContractImg(file) {
      this.contract.splice(this.contract.indexOf(file), 1)
    },
    // 获取起租凭证图片
    handleSuccessContractImg (res, file) {
      if (res.code == 0) {
        if(!this.contract){
          this.contract = [];
        }
        this.contract.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },

    // 删除证件图片
    handleRemoveIdentityImg(file) {
      this.identity.splice(this.identity.indexOf(file), 1)
    },
    // 获取证件图片
    handleSuccessIdentityImg (res, file) {
      if (res.code == 0) {
        if(!this.identity){
          this.identity = [];
        }
        this.identity.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },

    // 删除店铺合同图片
    handleRemoveStoreContractImg(file) {
      this.store_contract.splice(this.store_contract.indexOf(file), 1)
    },
    // 获取店铺合同图片
    handleSuccessStoreContractImg (res, file) {
      if (res.code == 0) {
        if(!this.store_contract){
          this.store_contract = [];
        }
        this.store_contract.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },

    // 删除授权合照图片
    handleRemoveFigureImg(file) {
      this.figure.splice(this.figure.indexOf(file), 1)
    },
    // 获取授权合照图片
    handleSuccessFigureImg (res, file) {
      if (res.code == 0) {
        if(!this.figure){
          this.figure = [];
        }
        this.figure.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },


    // 删除起租其他图片
    handleRemoveStartOtherImg(file) {
      this.start_other.splice(this.start_other.indexOf(file), 1)
    },
    // 获取授权合照图片
    handleSuccessStartOtherImg (res, file) {
      if (res.code == 0) {
        if(!this.start_other){
          this.start_other = [];
        }
        this.start_other.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },


    //初始化数据
    initData ( data ) {
      //厨房  商户名 档口号
      this.kitchen_name = data.kitchen_name;
      this.store_name = data.store_name;
      this.store_no = data.store_no;
      this.initLeaseinfo( data );
    }
  },
  computed: {
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
