<template>
  <div>
    <Modal v-model="showModal" title="编辑表格" @on-ok="saveModalInfo">
        <Form :model="modalItem" :label-width="80">
          <FormItem label="项目名称">
            <Select v-model="modalItem.category_id" @on-change="setModalTitle">
                <Option v-for="item in workCategoryList" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="收支类型">
            <RadioGroup v-model="modalItem.pay_type">
                <Radio label="1">收入</Radio>
                <Radio label="2">支出</Radio>
            </RadioGroup>
          </FormItem>
          <Row type="flex" justify="start" align="middle" :gutter="20">
            <i-col span="12">
              <FormItem label="项目金额">
                <Input v-model="modalItem.money" placeholder="输入金额"></Input>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="项目数量">
                <Input v-model="modalItem.quantity" placeholder="输入数量"></Input>
              </FormItem>
            </i-col>
          </Row>
          <FormItem label="项目备注">
              <Input v-model="modalItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
          </FormItem>
        </Form>
    </Modal>
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <Card title="缴费工单提交" shadow>
      <Form ref="formItem" :model="formItem" :label-width="80">
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="12">
            <FormItem label="工单标题" prop="title">
                <Input v-model="formItem.title" readonly placeholder="输入标题" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="工单标签" prop="tagSelect">
              <Select v-model="formItem.tagSelect">
                  <Option v-for="item in orderTag" :value="item.key" :key="item.key">{{ item.title }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="厨房" prop="kitchenSelect">
              <Input v-model="formItem.kitchen_name" readonly></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10" >
            <FormItem label="商户名称">
              <Input v-model="formItem.store_name" readonly></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="档口号">
              <Input v-model="formItem.store_no" readonly></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="20">
            <FormItem label="图片上传">
              <div class="img-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                  </template>
                  <template v-else>
                      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                  </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
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
              <Modal title="预览图" v-model="visible">
                  <img :src="imgUrl" v-if="visible" style="width: 100%">
              </Modal>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="24">
            <FormItem label="租金表格">
              <Button type="primary" @click="showModal = true">增加一条</Button>
            </FormItem>
          </i-col>
          <i-col span="22">
            <FormItem>
              <Table :columns="tableColumns" :data="tableData">
                <div slot="footer" class="tableFooter">
                  <h3>总计： {{ tableTotal }}</h3>
                </div>
              </Table>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="工单意见" prop="textarea">
              <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入意见"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <FormItem>
            <Button @click="handleSubmit('formItem')" type="primary">提交</Button>
          </FormItem>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
import { uploadImg, getKitchenList, getStoreList , getWorkCategoryList } from '@/api/data'
import { setIncomeOrder } from '@/api/order'
import { changeStoreWork } from '@/api/kitchen'
export default {
  name: 'computer-income-order',
  data () {
    return {
      // 表格
      tableColumns: [
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '收支',
          key: 'pay_type',
          render: (h, params) => {
            return h('strong', params.row.pay_type*1 == 1 ? '收入' : '支出')
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
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeItem(params.index)
                    this.tableTotal = this.getTableSum()
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // select选项
      // 厨房选择列表
      orderTag: [
        {title: '普通', key: '1'},
        {title: '紧急', key: '2'}
      ],
      // 列表提交项
      formItem: {
        title: '',
        kitchenSelect: '',
        shopSelect: '',
        tagSelect: '',
        textarea: ''
      },
      // 发送短信
      isSms: false,
      // 启用表哥
      isPay: true,
      // 表哥数据
      tableData: [],
      // 表哥计算total
      tableTotal: '0.00',
      // 表哥弹窗
      showModal: false,
      // 表哥单元存储
      modalItem: {
        category_id:'',
        title: '',
        pay_type: 1,
        money: '',
        remark: '',
        quantity: 1
      },
      // 图片
      imgUrl: '',
      visible: false,
      // 图片上传列表
      uploadList: [],
      workCategoryList:[],
      work_id:'',
    }
  },
  methods: {
    setModalTitle(){
      let that = this;
      let id = this.modalItem.category_id;
      this.workCategoryList.forEach( function( item ) {
        if( item.id ==  id ){
          that.modalItem.title = item.title;
          return;
        }
      });
    },
    // 保存表格信息
    saveModalInfo: function () {
      if (this.formModalInfo(this.modalItem)) {
        return
      }
      this.tableData.push(this.modalItem)
      this.tableTotal = this.getTableSum()
      this.modalItem = {
        category_id:'',
        title: '',
        pay_type: 1,
        money: '',
        remark: '',
        quantity: 1
      }
    },
    // 验证表格信息
    formModalInfo: function (obj) {
      obj.money = (obj.money * 1).toFixed(2)
      let priceReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      if (!obj.title) {
        this.$Notice.warning({
          title: '请输入正确名称！'
        })
        return true
      }
      if (!obj.pay_type) {
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
    // 提交验证器
    submitValidateField: function (obj) {
      if (!obj.title) {
        this.$Notice.warning({
          title: '请输入正确标题！'
        })
        return false
      }
      obj.title = obj.title.trim();
      if (!obj.kitchenSelect) {
        this.$Notice.warning({
          title: '请选择厨房！'
        })
        return false
      }
      if (!obj.shopSelect) {
        this.$Notice.warning({
          title: '请选择商铺！'
        })
        return false
      }
      if (!obj.tagSelect) {
        this.$Notice.warning({
          title: '请选择标签！'
        })
        return false
      }
      if (!obj.textarea) {
        this.$Notice.warning({
          title: '请输入工单意见！'
        })
        return false
      }
      obj.textarea = obj.textarea.trim();
      if (obj.textarea.length < 2) {
        this.$Notice.warning({
          title: '工单意见过短！'
        })
        return false
      }
      if (this.isSms) {
        let phoneReg = /^1\d{10}$/
        if (!obj.phone || !phoneReg.test(obj.phone)) {
          this.$Notice.warning({
            title: '请输入正确短信手机号！'
          })
          return false
        }
        obj.smscontent = obj.smscontent.trim()
        if (!obj.smscontent) {
          this.$Notice.warning({
            title: '请输入短信内容！'
          })
          return false
        }
      }
      if (obj.isPay) {
        if (obj.tableData.length <= 0) {
          this.$Notice.warning({
            title: '请填写表格内容！'
          })
          return false
        }
      }
      return true
    },
    // 删除表格信息
    removeItem (index) {
      this.tableData.splice(index, 1)
    },
    // 获取表格总计
    getTableSum () {
      if (this.tableData.length > 0) {
        let t = 0
        this.tableData.forEach(function (i, j) {
          if (i.pay_type == '1') {
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
    // 提交工单按钮
    handleSubmit (name) {
      if (this.isSms) {
        this.formItem.isSms = this.isSms
        this.formItem.phone = this.phone
        this.formItem.smscontent = this.smscontent
      }
      if (this.isPay) {
        this.formItem.isPay = this.isPay
        this.formItem.tableData = this.tableData
      }
      if (this.submitValidateField(this.formItem)) {
        this.setOrderInfo(this.formItem)
      }
    },
    // 发送数据
    setOrderInfo (info) {
      let data = {}
      let that = this
      data.title = info.title
      data.kitchen_id = info.kitchenSelect
      data.store_id = info.shopSelect
      data.tag_id = info.tagSelect
      data.remark = info.textarea
      data.pay = info.tableData || {}
      data.is_sms = 0
      data.work_id = "0"
      let imagesArr = []
      this.uploadList.forEach(function (item) {
        imagesArr.push(item.url)
      })
      data.images = imagesArr.join(',')
      setIncomeOrder(data).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '缴费工单提交完成！'
          })
          changeStoreWork( { id:this.work_id } ).then(res => {})
          setTimeout(function () {
            that.$router.go(-1)
          }, 1500)
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 删除图片
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.uploadList.splice(fileList.indexOf(file), 1)
    },
    // 获取图片
    handleSuccess (res, file) {
      if (res.code == 0) {
        let obj = {}
        obj.url = res.data
        obj.status = 'finished'
        obj.showProgress = false
        this.uploadList.push(obj)
      }
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
        desc: '文件  ' + file.name + ' 过大, 不能超过 4M.'
      })
    },
    // 发送触发
    handleBeforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
      }
    },
  },
  computed: {

  },
  watch: {
  },
  created: function () {
    let id = this.$route.query.id
    this.work_id = this.$route.query.work_id
    this.$nextTick(function () {
      getWorkCategoryList( "4" ).then(res => {
        const dbody = res.data
        this.workCategoryList = dbody.data || [];
      })
      let data = this.$store.state.app.incomeOrder;
      if(id != data.shopSelect){
        this.$Notice.warning({
          title: "无此数据！"
        })
        this.$router.go(-1)
        return
      }
      this.formItem = data;
      this.uploadList = data.uploadList;
      this.tableData = data.tableData;
      this.tableTotal = this.getTableSum();
    })
  }
}
</script>

<style lang="less">
  .tableFooter{
    margin-left: 20px;
  }
  .img-upload-list{
      display: inline-block;
      width: 60px;
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
