<template>
    <Card shadow>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <p slot="title">
        {{kitchen_name}}  {{store_no}}  {{store_name}}
      </p>
      <Tabs :animated="false" style="margin-top: 5px;" class="h100">
        <TabPane label="起租相关">
          <Form :label-width="120">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="起租日期">
                  <DatePicker type="date" placeholder="选择结算日期" :value="leaseinfo.start_date" @on-change="getStartDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="接驳时间">
                  <DatePicker type="date" placeholder="选择结算日期" :value="leaseinfo.connect_date" @on-change="getConnectDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺电表起始">
                  <Input v-model="leaseinfo.start_energy" placeholder="输入店铺电表起始" style="width: 200px"></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺水表起始">
                  <Input v-model="leaseinfo.start_water" placeholder="输入店铺水表起始" style="width: 200px"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="公摊起始日期">
                  <DatePicker type="date" placeholder="选择结算日期" :value="leaseinfo.entrance_date" @on-change="getEntranceDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="库房费用">
                  <Input v-model="leaseinfo.storage_fee" placeholder="输入库房费用" style="width: 200px"></Input>
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
        <TabPane label="退租相关">
          <Modal v-model="end_showModal" title="起租表格编辑" @on-ok="saveEndModalInfo">
            <Form :model="end_modalItem" :label-width="80">
              <FormItem label="项目名称">
                <Select v-model="end_modalItem.category_id" @on-change="setEndModalTitle">
                    <Option v-for="item in end_workCategoryList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                </Select>
              </FormItem>
              <FormItem label="收支类型">
                <RadioGroup v-model="end_modalItem.rent_type">
                    <Radio label="1">应收</Radio>
                    <Radio label="2">减免</Radio>
                </RadioGroup>
              </FormItem>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="12">
                  <FormItem label="项目金额">
                    <Input v-model="end_modalItem.money" placeholder="输入金额"></Input>
                  </FormItem>
                </i-col>
                <i-col span="12">
                  <FormItem label="项目数量">
                    <Input v-model="end_modalItem.quantity" placeholder="输入数量"></Input>
                  </FormItem>
                </i-col>
              </Row>
              <FormItem label="项目备注">
                  <Input v-model="end_modalItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Form :label-width="100">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="申请退场时间">
                  <DatePicker type="date" placeholder="选择结算日期" :value="leaseinfo.apply_date" @on-change="getApplyDatePicker"  format="yyyy-MM-dd" style="width: 200px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="结算日期">
                  <DatePicker type="date" placeholder="选择退租日期" style="width: 200px" :value="leaseinfo.settle_date" @on-change="getSettleDatePicker"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="公摊结束日期" prop="quit_date">
                  <DatePicker type="date" placeholder="选择退租日期" style="width: 200px" :value="leaseinfo.exit_date" @on-change="getExitDatePicker"></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺电表结束">
                  <Input v-model="leaseinfo.end_energy_fee" placeholder="输入店铺电表起始" style="width: 200px"></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺水表结束">
                  <Input v-model="leaseinfo.end_water_fee" placeholder="输入店铺水表起始" style="width: 200px"></Input>
                </FormItem>
              </i-col>
            </Row>
            <FormItem label="退场函">
              <div class="img-upload-list" v-for="item in end_letter">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveEndLetterImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="voucherinfoEndLetterImg"
                :show-upload-list="false"
                :on-success="handleSuccessEndLetterImg"
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
            <FormItem label="退场其他">
              <div class="img-upload-list" v-for="item in end_other">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveEndOtherImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="voucherinfoEndOtherImg"
                :show-upload-list="false"
                :on-success="handleSuccessEndOtherImg"
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
                <i-col span="24">
                  <FormItem>
                    <Button type="primary" @click="addEndTableData">增加一条</Button>
                  </FormItem>
                </i-col>
                <i-col span="22" style="margin-top:8px;">
                  <Table :columns="end_tableColumns" :data="end_tableData">
                    <div slot="footer" class="tableFooter">
                      <h3>总计： {{ endTableTotal }}</h3>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="10">
                  <FormItem>
                    <Button @click="endInfoSubmit" type="warning">保存</Button>
                  </FormItem>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="人员列表">
          <Modal v-model="showModal" title="登记人员" @on-ok="saveModalInfo">
              <Form :model="modalItem" :label-width="80">
                <FormItem label="姓名">
                  <Input v-model="modalItem.fullname" placeholder="输入姓名" style="width: 200px"></Input>
                </FormItem>
                <FormItem label="性别">
                  <RadioGroup v-model="modalItem.gender">
                      <Radio label="1">男</Radio>
                      <Radio label="2">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="身份证">
                  <Input v-model="modalItem.id_card" placeholder="输入身份证" style="width: 200px"></Input>
                </FormItem>
                <FormItem label="联系方式">
                  <Input v-model="modalItem.contact" placeholder="输入联系方式" style="width: 200px"></Input>
                </FormItem>
                <FormItem label="健康证日期">
                  <DatePicker v-model="modalItem.card_date" format="yyyy-MM-dd" type="datetime" placeholder="健康证日期" style="width: 200px" @on-change="selectDate"></DatePicker>
                </FormItem>
                <FormItem label="职位">
                  <Select v-model="modalItem.post" style="width: 200px">
                      <Option value="店长">店长</Option>
                      <Option value="店员">店员</Option>
                  </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="modalItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
              </Form>
          </Modal>
          <Card style="padding-top: 2em;">
            <a href="#" slot="extra" @click.prevent="addMember">
                  <Icon type="ios-loop-strong"></Icon>
                  登记人员
            </a>
            <tables ref="tables" v-model="memberList" :columns="memberListColumns" @data-dele="handleDataDele" @data-edit="handleDataEdit"/>
          </Card>
        </TabPane>
        <TabPane label="设备清单">
          <Modal v-model="c_showModal" title="增加设备" @on-ok="savec_ModalInfo">
            <Form :model="c_modalItem" :label-width="80">
              <FormItem label="设备名称">
                <Input v-model="c_modalItem.title" placeholder="输入设备名称" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="设备数量">
                <Input v-model="c_modalItem.quantity" placeholder="输入数量" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="电压V/每个设备">
                <Input v-model="c_modalItem.voltage" placeholder="输入电压V/每个设备" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="功率KW/每个设备">
                <Input v-model="c_modalItem.kw" placeholder="输入功率KW/每个设备" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="燃气量 m³">
                <Input v-model="c_modalItem.gas" placeholder="输入燃气量 m³" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="备注">
                  <Input v-model="c_modalItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Form :label-width="100">
            <FormItem label="设备清单">
              <div class="img-upload-list" v-for="item in connectImgList">
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemoveConnectImg(item)"></Icon>
                </div>
              </div>
              <Upload
                ref="connectImg"
                :show-upload-list="false"
                :on-success="handleSuccessConnectImg"
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
                    <Button type="primary" @click="addConnectTableDataItem">增加一条</Button>
                  </FormItem>
                </i-col>
                <i-col span="22" style="margin-top:8px;">
                  <Table :columns="connectTableColumns" :data="connectTable">
                    <div slot="footer" class="tableFooter">
                      <span>电器设备功率合计：  {{tableKWTotal}}</span>
                      <span style="margin-left: 1em;">燃气设备气量合计：  {{tableGASTotal}}</span>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="10">
                  <FormItem>
                    <Button @click="connectInfoSubmit" type="warning">保存</Button>
                  </FormItem>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
</template>

<script>
import Tables from '_c/tables'
import { uploadImg, getShopDetail , setStartShopEdit , getWorkCategoryList } from '@/api/data'
import { getStoreEmployeeList , addStoreEmployee , editStoreEmployee , deleteStoreEmployee } from '@/api/kitchen'
import { showStoreDevice , editStoreDevice , quitKitchen} from '@/api/kitchen'
export default {
  name: 'kitchen_shop_edit2',
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
      //人员列表
      memberListColumns: [
        {title: '姓名', key: 'fullname'},
        { title: '性别',
          render: (h, params) => {
            let status = params.row.gender*1
            if (status == 1) { return h('span', '男') };
            if (status == 2) { return h('span', '女') };
          }
        },
        {title: '档口名称', key: 'store_name'},
        {title: '职位', key: 'post'},
        {title: '身份证', key: 'id_card'},
        {title: '健康证日期', key: 'card_date'},
        {title: '联系方式', key: 'contact'},
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('a', {
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
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
                h('a', {style: {marginLeft: '8px'}}, '删除')
              ])
            }
          ]
        }
      ],
      memberList: [],
      modalItem:{},
      showModal:false,


      // 退租相关
      end_letter:[],
      end_other:[],
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
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      end_modalItem:{},
      end_showModal:false,
      end_workCategoryList:[],




      // 设备列表
      connectImgList:[],
      c_showModal:false,
      c_modalItem:{},
      connectTableColumns: [
        {
          title: '设备名称',
          key: 'title'
        },
        {
          title: '设备数量',
          key: 'quantity',
        },
        {
          title: '电压V/每个设备',
          key: 'voltage'
        },
        {
          title: '功率KW/每个设备',
          key: 'kw'
        },
        {
          title: '燃气量 m³',
          key: 'gas'
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
                    this.getTableSum()
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      connectTable:[],
    }
  },
  methods: {
    // 租期租约卡片
    // 设置起租日期
    getStartDatePicker (date) {
      this.leaseinfo.start_date = date
    },
    // 设置接驳日期
    getConnectDatePicker(date){
      this.leaseinfo.connect_date = date
    },
    // 设置公摊起始日期
    getEntranceDatePicker(date){
      this.leaseinfo.entrance_date = date
    },
    // 设置申请退场时间日期
    getApplyDatePicker(date){
      this.leaseinfo.apply_date = date
    },
    // 设置申请退场时间日期
    getApplyDatePicker(date){
      this.leaseinfo.apply_date = date
    },
    // 获取退租时间
    getSettleDatePicker (date) {
      this.leaseinfo.settle_date = date
    },
    // 获取退租时间
    getExitDatePicker (date) {
      this.leaseinfo.exit_date = date
    },
    //租期租约卡片
    initLeaseinfo( data ){
      // 起租日期
      this.leaseinfo.start_date = data.start_date || '';
      // 接驳时间
      this.leaseinfo.connect_date = data.connect_date || '';
      // 公摊起始日期
      this.leaseinfo.entrance_date = data.entrance_date || '';
      // 电表开始
      this.leaseinfo.start_energy = data.start_energy || '';
      // 水表开始
      this.leaseinfo.start_water = data.start_water || '';
      // 库房费
      this.leaseinfo.storage_fee = data.storage_fee || '';
      // 申请退场时间
      this.leaseinfo.apply_date = data.apply_date || '';
      // 结算日期时间
      this.leaseinfo.settle_date = data.settle_date || '';
      // 电表结束
      this.leaseinfo.end_energy_fee = data.end_energy_fee || '';
      // 水表结束
      this.leaseinfo.end_water_fee = data.end_water_fee || '';
      // 公摊结束日期
      this.leaseinfo.exit_date = data.exit_date || '';
      // 退场函
      this.end_letter = this.trimNull(data.end_letter.split(',')) || [];
      // 退场其他
      this.end_other = this.trimNull(data.end_other.split(',')) || [];
    },
    // 保存按钮
    leaseinfoSubmit( ){
      if(!this.leaseinfo.start_date){
        this.$Notice.warning({
          title: "起租日期必须填写！"
        })
        return
      }
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


    //退租部分
    // 删除退租函 退租其他
    handleRemoveEndLetterImg (file) {
      this.end_letter.splice(this.end_letter.indexOf(file), 1)
    },
    handleRemoveEndOtherImg (file) {
      this.end_other.splice(this.end_other.indexOf(file), 1)
    },
    // 获取起租凭证图片
    handleSuccessEndLetterImg (res, file) {
      if (res.code == 0) {
        if(!this.end_letter){
          this.end_letter = [];
        }
        this.end_letter.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },
    // 获取起租凭证图片
    handleSuccessEndOtherImg (res, file) {
      if (res.code == 0) {
        if(!this.end_other){
          this.end_other = [];
        }
        this.end_other.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
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
    //退租表格编辑
    addEndTableData(){
      this.end_modalItem = {
        category_id:'',
        title: '',
        rent_type: 1,
        money: '',
        remark: '',
        quantity: 1
      };
      this.end_showModal = true;
    },
    // 保存起租表格信息
    saveEndModalInfo(){
      if (this.formModalInfo(this.end_modalItem)) {
        return
      }
      this.end_tableData.push(this.end_modalItem)
    },
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
    // 弹窗下啦事件
    setEndModalTitle(){
      let that = this;
      let id = this.end_modalItem.category_id;
      this.end_workCategoryList.forEach( function( item ) {
        if( item.id ==  id ){
          that.end_modalItem.title = item.title;
          return;
        }
      });
    },
    // 提交工单按钮
    endInfoSubmit () {
      let obj = {};
      obj.leaseinfo = this.leaseinfo.apply_date;
      obj.settle_date = this.leaseinfo.settle_date;
      obj.exit_date = this.leaseinfo.exit_date;
      obj.end_energy_fee = this.leaseinfo.end_energy_fee;
      obj.end_water_fee = this.leaseinfo.end_water_fee;
      obj.end_letter = this.end_letter.length > 0 ? this.end_letter.join(",") : '';
      obj.end_other = this.end_other.length > 0 ? this.end_letter.join(",") : '';
      obj.rent = this.end_tableData;
      obj.store_id = this.store_id;
      obj.kitchen_id = this.kitchen_id;
      obj.lease_type = 2
      quitKitchen(obj).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '信息提交成功！'
          })
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },






    //人员列表
    initMemberList(){
      getStoreEmployeeList(this.store_id).then(res => {
      const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.memberList = dbody.data.list || []
      })
    },
    selectDate(date){
      this.modalItem.card_date = date;
    },
    isCardNo(card){  
       var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
       if(reg.test(card) === false)  
       {  
           alert("身份证输入不合法");  
           return  false;  
       }  
    },
    verificatInfo(info){
      if(!info.fullname){
        this.$Notice.warning({
          title: "请输入姓名！"
        })
        return false
      }
      info.fullname = info.fullname.trim();
      if(!info.contact){
        this.$Notice.warning({
          title: "请输入联系方式！"
        })
        return false
      }
      let regId_card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!!info.id_card && (regId_card.test(info.id_card) === false)){
        this.$Notice.warning({
          title: "请输入正确身份证！"
        })
        return false
      }
      return true
    },
    saveModalInfo(){
      if(!this.verificatInfo(this.modalItem)){
        return 
      }
      this.modalItem.kitchen_id = this.kitchen_id
      this.modalItem.store_id = this.store_id
      if(this.modalItem.type == "add"){
        //添加
        addStoreEmployee(this.modalItem).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "提交成功！"
          })
          this.updateTable();
          return
        })
      }
      if(this.modalItem.type == "edit"){
        //修改
        editStoreEmployee(this.modalItem).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "更新成功！"
          })
          this.updateTable();
          return
        })
      }
    },
    addMember(){
      this.modalItem = {};
      this.modalItem.type = "add";
      this.showModal = true;
    },
    // 编辑
    handleDataEdit (params) {
      this.modalItem = {};
      this.modalItem.id = params.row.id;
      this.modalItem.fullname = params.row.fullname;
      this.modalItem.contact = params.row.contact;
      this.modalItem.gender = params.row.gender;
      this.modalItem.post = params.row.post;
      this.modalItem.card_date = params.row.card_date;
      this.modalItem.id_card = params.row.id_card;
      this.modalItem.remark = params.row.remark;
      this.modalItem.type = "edit";
      this.showModal = true;
    },
    // 删除
    handleDataDele (params) {
      let id = params.row.id
      deleteStoreEmployee( id ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
        } else {
          this.$Notice.warning({
            title: '删除成功！'
          })
          this.updateTable();
        }
      })
    },
    //更新
    updateTable(){
      getStoreEmployeeList(this.store_id).then(res => {
      const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.memberList = dbody.data.list || []
      })
    },


    //设备清单
    initConnectInfo(){
      showStoreDevice( this.store_id ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        let data = dbody.data;
        this.connectImgList = this.trimNull(data.connect.split(','))
        this.connectTable = data.device;
      })
    },
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
    // 删除起租凭证图片
    handleRemoveConnectImg (file) {
      this.connectImgList.splice(this.connectImgList.indexOf(file), 1)
    },
    // 获取起租凭证图片
    handleSuccessConnectImg (res, file) {
      if (res.code == 0) {
        if(!this.connectImgList){
          this.connectImgList = [];
        }
        this.connectImgList.push(res.data)
      }else{
        this.$Notice.warning({
          title: '图片上传失败',
        })
      }
    },
    //起租表格编辑
    addConnectTableDataItem(){
      this.c_modalItem = {};
      this.c_showModal = true;
    },
    // regModalInfo
    regModalInfo( data ){
      if(!data.title){
        this.$Notice.warning({
          title: "请输入设备名称！"
        })
        return false
      }
      if(!data.quantity || data.quantity*1 <= 0){
        this.$Notice.warning({
          title: "请输入设备数量！"
        })
        return false
      }
      if(!!data.voltage && data.voltage*1 < 0){
        this.$Notice.warning({
          title: "请输入设备电压！"
        })
        return false
      }
      if(!!data.kw && data.kw*1 < 0){
        this.$Notice.warning({
          title: "请输入设备功率！"
        })
        return false
      }
      if(!!data.gas && data.gas*1 < 0){
        this.$Notice.warning({
          title: "请输入设备燃气量！"
        })
        return false
      }
      return true
    },
    // 增加一条
    savec_ModalInfo(){
      if(!this.regModalInfo(this.c_modalItem)){
        return
      }
      if(!!this.modalItem.remark){
        this.c_modalItem.remark = this.c_modalItem.remark.trim();
      }else{
        this.c_modalItem.remark = '';
      }
      this.c_modalItem.store_id = this.store_id;
      this.connectTable.push(this.c_modalItem);
      this.c_modalItem = {};
    },
    // 提交设备清单
    connectInfoSubmit(){
      let obj = {};
      obj.connect = this.connectImgList.length > 0 ? this.connectImgList.join(',') : '';
      obj.device = this.connectTable;
      obj.store_id = this.store_id;
      obj.kitchen_id = this.kitchen_id;
      editStoreDevice( obj ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "提交成功！"
        })
      })
    },


    //初始化数据
    initData ( data ) {
      //厨房  商户名 档口号
      this.kitchen_name = data.kitchen_name;
      this.store_name = data.store_name;
      this.store_no = data.store_no;
      this.initLeaseinfo( data );
      this.initMemberList( );
      this.initConnectInfo( );
    }
  },
  computed: {
    tableKWTotal:function() {
      if (this.connectTable.length <= 0) {
        return '0.00'
      }
      let kw = 0
      this.connectTable.forEach(function (i, j) {
        if(!!i.kw && i.kw*1 > 0){kw += i.kw*1*i.quantity*1 }
      })
      return (kw*1).toFixed(2);
    },
    tableGASTotal:function() {
      if (this.connectTable.length <= 0) {
        return '0.00'
      }
      let gas = 0
      this.connectTable.forEach(function (i, j) {
        if(!!i.gas && i.gas*1 > 0){gas += i.gas*1*i.quantity*1 }
      })
      return (gas*1).toFixed(2);
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
    })
    // 获取起租表格选项
    getWorkCategoryList( "8" ).then(res => {
      const dbody = res.data
      this.end_workCategoryList = dbody.data || [];
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
