<template>
    <Card shadow>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <p slot="title">
        {{kitchen_name}}  {{store_no}}  {{store_name}}
      </p>
      <Tabs :animated="false" style="margin-top: 5px;">
        <TabPane label="基本资料">
          <Form :label-width="100">
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺名称" class="cellTit">
                    <span v-show="!!baseinfo.store_name">{{baseinfo.store_name}}</span>
                    <span v-show="!baseinfo.store_name" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店主姓名" class="cellTit">
                    <span v-show="!!baseinfo.shopkeeper">{{baseinfo.shopkeeper}}</span>
                    <span v-show="!baseinfo.shopkeeper" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺电话" class="cellTit">
                    <span v-show="!!baseinfo.shopkeeper_phone">{{baseinfo.shopkeeper_phone}}</span>
                    <span v-show="!baseinfo.shopkeeper_phone" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="负责店长" class="cellTit">
                    <span v-show="!!baseinfo.manage_name">{{baseinfo.manage_name}}</span>
                    <span v-show="!baseinfo.manage_name" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="招商经理" class="cellTit">
                    <span v-show="!!baseinfo.manage_lease">{{baseinfo.manage_lease}}</span>
                    <span v-show="!baseinfo.manage_lease" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="所属厨房" class="cellTit">
                    <span v-show="!!baseinfo.kitchen_name">{{baseinfo.kitchen_name}}</span>
                    <span v-show="!baseinfo.kitchen_name" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="档口选择" class="cellTit">
                    <span v-show="!!baseinfo.store_no">{{baseinfo.store_no}}</span>
                    <span v-show="!baseinfo.store_no" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="租期租约">
          <Form :label-width="100">
            <Divider orientation="left" dashed>起租基本资料</Divider>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="月租金(元)" class="cellTit">
                  <span v-show="!!leaseinfo.month_rent">{{leaseinfo.month_rent}}</span>
                  <span v-show="!leaseinfo.month_rent" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="押金(元)" class="cellTit">
                  <span v-show="!!leaseinfo.deposit_fee">{{leaseinfo.deposit_fee}}</span>
                  <span v-show="!leaseinfo.deposit_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="入场费(元)" class="cellTit">
                  <span v-show="!!leaseinfo.entrance_fee">{{leaseinfo.entrance_fee}}</span>
                  <span v-show="!leaseinfo.entrance_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="其他费用(元)" class="cellTit">
                  <span v-show="!!leaseinfo.other_fee">{{leaseinfo.other_fee}}</span>
                  <span v-show="!leaseinfo.other_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="增容费(元)" class="cellTit">
                  <span v-show="!!leaseinfo.zr_fee">{{leaseinfo.zr_fee}}</span>
                  <span v-show="!leaseinfo.zr_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="燃气费(元)" class="cellTit">
                  <span v-show="!!leaseinfo.gas_fee">{{leaseinfo.gas_fee}}</span>
                  <span v-show="!leaseinfo.gas_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="库房费用(元)" class="cellTit">
                  <span v-show="!!leaseinfo.storage_fee">{{leaseinfo.storage_fee}}</span>
                  <span v-show="!leaseinfo.storage_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="一次性费用(元)" class="cellTit">
                  <span v-show="!!leaseinfo.one_fee">{{leaseinfo.one_fee}}</span>
                  <span v-show="!leaseinfo.one_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="上线日期" class="cellTit">
                  <span v-show="!!leaseinfo.online_date">{{leaseinfo.online_date}}</span>
                  <span v-show="!leaseinfo.online_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="免租期(天)" class="cellTit">
                  <span v-show="leaseinfo.free_day*1 >= 0">{{leaseinfo.free_day}}</span>
                  <span v-show="leaseinfo.free_day*1 < 0" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="到期时间" class="cellTit">
                  <span v-show="!!leaseinfo.end_date">{{leaseinfo.end_date}}</span>
                  <span v-show="!leaseinfo.end_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Divider orientation="left" dashed>租期基本资料</Divider>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="接驳时间"  class="cellTit">
                  <span v-show="!!leaseinfo.connect_date">{{leaseinfo.connect_date}}</span>
                  <span v-show="!leaseinfo.connect_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10">
                <FormItem label="接驳工单ID" v-if="!!leaseinfo.work_id">
                  <Input v-model="leaseinfo.work_id" placeholder="" style="width: 50px;margin-right:5px;" readonly></Input>
                  <Button type="primary" @click="showConnectOrder">查看工单</Button>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="公摊开始日期" class="cellTit">
                  <span v-show="!!leaseinfo.entrance_date">{{leaseinfo.entrance_date}}</span>
                  <span v-show="!leaseinfo.entrance_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="起租日期" class="cellTit">
                  <span v-show="!!leaseinfo.start_date">{{leaseinfo.start_date}}</span>
                  <span v-show="!leaseinfo.start_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺电表起始" class="cellTit">
                  <span v-show="!!leaseinfo.start_energy">{{leaseinfo.start_energy}}</span>
                  <span v-show="!leaseinfo.start_energy" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺水表起始" class="cellTit">
                  <span v-show="!!leaseinfo.start_water">{{leaseinfo.start_water}}</span>
                  <span v-show="!leaseinfo.start_water" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="公摊结束日期" class="cellTit">
                  <span v-show="!!leaseinfo.exit_date">{{leaseinfo.exit_date}}</span>
                  <span v-show="!leaseinfo.exit_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Divider orientation="left" dashed>退租基本资料</Divider>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="退租申请日期" class="cellTit">
                  <span v-show="!!leaseinfo.apply_date">{{leaseinfo.apply_date}}</span>
                  <span v-show="!leaseinfo.apply_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">
              <i-col span="10">
                <FormItem label="店铺电表结束" class="cellTit">
                  <span v-show="!!leaseinfo.end_energy_fee">{{leaseinfo.end_energy_fee}}</span>
                  <span v-show="!leaseinfo.end_energy_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
              <i-col span="10" offset="2">
                <FormItem label="店铺水表结束" class="cellTit">
                  <span v-show="!!leaseinfo.end_water_fee">{{leaseinfo.end_water_fee}}</span>
                  <span v-show="!leaseinfo.end_water_fee" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
            <Row type="flex" justify="start" align="middle" :gutter="20">  
              <i-col span="10">
                <FormItem label="结算日期" class="cellTit">
                  <span v-show="!!leaseinfo.settle_date">{{leaseinfo.settle_date}}</span>
                  <span v-show="!leaseinfo.settle_date" class="noData">未填写</span>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="签约凭证">
          <Form :label-width="100">
            <Divider orientation="left" dashed>起租凭证</Divider>
            <FormItem label="起租凭证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.pay">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="起租表格">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <Table :columns="tableColumns" :data="v_start_tableData">
                    <div slot="footer" class="tableFooter">
                      <h3>总计： {{ startTableTotal }}</h3>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
            <Divider orientation="left" dashed>租约凭证</Divider>
            <FormItem label="合同资料">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.contract">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="店主身份证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.identity">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="起租函">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.start_letter">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="店铺合同">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.store_contract">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="授权合照">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.figure">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="起租其他凭证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.start_other">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <Divider orientation="left" dashed>退租凭证</Divider>
            <FormItem label="退租凭证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.end_letter">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="退租其他">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.end_other">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="财务打款凭证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in voucherinfo.archive">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <FormItem label="退租表格">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <Table :columns="tableColumns" :data="v_end_tableData">
                    <div slot="footer" class="tableFooter">
                      <h3>总计： {{ endTableTotal }}</h3>
                    </div>
                  </Table>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="人员列表">
          <Table ref="tables" :data="memberList" :columns="memberColumns"/></Table>
        </TabPane>
        <TabPane label="设备清单">
          <Form :label-width="100">
            <FormItem label="设备凭证">
              <Row type="flex" justify="start" align="middle" :gutter="20">
                <i-col span="22">
                  <div class="img-upload-list" v-for="item in equipmentinfo.connect">
                      <img :src="item">
                      <div class="img-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                      </div>
                  </div>
                </i-col>
              </Row>
            </FormItem>
            <Table ref="tables" :data="equipmentTableData" :columns="equipmentColumns"/>
              <div slot="footer" class="tableFooter">
                <h3>
                    <span>电器设备功率合计：  {{tableKWTotal}}</span>
                    <span style="margin-left: 1em;">燃气设备气量合计：  {{tableGASTotal}}</span>
                  </h3>
              </div>
            </Table>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
</template>

<script>
import Tables from '_c/tables'
import { getShopDetail } from '@/api/data'
import { getStoreEmployeeList , showStoreDevice  } from '@/api/kitchen'
import { queryWorkOrderList } from '@/api/sreach'
export default {
  name: 'kitchen_shop_detail',
  components: {
    Tables
  },
  data () {
    return {
      currentName:'',
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
      // 租期租约
      leaseinfo:{},
      // 凭证资料
      voucherinfo:{},
      v_start_tableData:[],
      v_end_tableData:[],
      // 凭证资料表格头
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
      // 人员列表卡片
      memberColumns: [
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
      ],
      memberList: [],
      // 设备清单
      equipmentColumns:[
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
      ],
      equipmentinfo:{},
      equipmentTableData:[],

      // 工单列表
      orderColumns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '档口号', key: 'store_no', width: 100},
        {title: '商铺名', key: 'store_name'},
        {title: '工单名称', key: 'title'},
        { title: '工单种类',
          render: (h, params) => {
            let status = params.row.work_type*1
            switch (status) {
              case 1:
                return h('span', '奖惩工单')
                break
              case 2:
                return h('span', '维修工单')
                break
              case 3:
                return h('span', '接驳工单')
                break
              case 4:
                return h('span', '缴费工单')
                break
              case 5:
                return h('span', '厨房费用工单')
                break
              case 6:
                return h('span', '租金工单')
                break
            }
          }
        },
        {title: '提交人', key: 'creator_name'},
        { title: '修改时间',
          render: (h, params) => {
            let time = params.row.update_time*1
            let ft = new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
            return h('span', ft)
          }
        },
        { title: '状态',key: 'work_status'},
        { title: '标签',
          render: (h, params) => {
            let status = params.row.tag_id*1
            switch (status) {
              case 1:
                return h('span', '普通')
                break
              case 2:
                return h('span', { style: {color: '#ed4014'}}, '紧急')
                break
            }
          }
        },
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'handle',
          button: [
            (h, params, vm) => {
              return h('a', {style: {margin: '10px 0', display: 'block'},
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '查看')
            }
          ]
        }
      ],
      orderList: [],
      order_type: '0',
      sreachInfo: {
        work_type: '0',
        work_status:'0',
        keyword:'',
        kitchen_id: '',
        store_id: '',
        tag_id:'0',
        date_range:'',
      },
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },

      // 图片
      imgUrl: '',
      visible: false,
    }
  },
  methods: {
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
    },
    //租期租约卡片
    initLeaseinfo( data ){
      this.leaseinfo.month_rent = data.month_rent || '';
      this.leaseinfo.deposit_fee = data.deposit_fee || '';
      this.leaseinfo.entrance_fee = data.entrance_fee || '';
      this.leaseinfo.other_fee = data.other_fee || '';
      this.leaseinfo.zr_fee = data.zr_fee || '';
      this.leaseinfo.gas_fee = data.gas_fee || '';
      this.leaseinfo.storage_fee = data.storage_fee || '';
      this.leaseinfo.one_fee = data.one_fee || '';
      this.leaseinfo.start_date = data.start_date || '';
      this.leaseinfo.free_day = data.free_day;
      this.leaseinfo.end_date = data.end_date || '';
      this.leaseinfo.apply_date = data.apply_date || '';
      this.leaseinfo.settle_date = data.settle_date || '';
      this.leaseinfo.end_date = data.end_date || '';
      this.leaseinfo.exit_date = data.exit_date || '';
      this.leaseinfo.online_date = data.online_date || '';
      this.leaseinfo.connect_date = data.connect_date || '';
      this.leaseinfo.work_id = data.work_id || '';
      this.leaseinfo.start_water = data.start_water || '';
      this.leaseinfo.end_water_fee = data.end_water_fee || '';
      this.leaseinfo.start_energy = data.start_energy || '';
      this.leaseinfo.end_energy_fee = data.end_energy_fee || '';
    },
    // 查看接驳工单
    showConnectOrder(){
      let id = this.leaseinfo.work_id
      const route = {
        name: 'vieworder',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 签约凭证卡片
    initVoucherinfo( data ){
      // 起租表格
      this.getStartTable( );
      // 退租表格
      this.getEndTable( );
      // 起租财务上传凭证
      this.voucherinfo.pay = this.trimNull(data.pay.split(',')) || [];
      // 合同资料
      this.voucherinfo.contract = this.trimNull(data.contract.split(',')) || [];
      // 店主身份证
      this.voucherinfo.identity = this.trimNull(data.identity.split(',')) || [];
      // 起租函照片
      this.voucherinfo.start_letter = this.trimNull(data.start_letter.split(',')) || [];
      // 店铺合同照片
      this.voucherinfo.store_contract = this.trimNull(data.store_contract.split(',')) || [];
      // 授权合照
      this.voucherinfo.figure = this.trimNull(data.figure.split(',')) || [];
      // 起租其他凭证
      this.voucherinfo.start_other = this.trimNull(data.start_other.split(',')) || [];
      // 起租其他凭证
      this.voucherinfo.end_letter = this.trimNull(data.end_letter.split(',')) || [];
      // 起租其他凭证
      this.voucherinfo.end_other = this.trimNull(data.end_other.split(',')) || [];
      // 退租财务打款凭证
      this.voucherinfo.archive = this.trimNull(data.archive.split(',')) || [];
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
    // 获取退租表格
    getEndTable( ){
      getShopDetail({id: this.store_id, lease_type: 2}).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: "退租表格数据获取失败！"
          })
        }
        this.v_end_tableData =  dbody.data.rent || [];
      })
    },
    // 初始化人员卡片
    initMemberinfo(){
      getStoreEmployeeList(this.store_id).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: "人员列表获取失败！"
          })
          return
        }
        this.memberList = dbody.data.list || []
      })
    },
    // 搜索操作
    handleSearch () {
      queryWorkOrderList(this.sreachInfo).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if (!dbody.data.list) {
          this.orderList = [];
          this.page ={
            current_page: 1,
            last_page: '',
            list_rows: 0,
            total: 0
          };
          return
        }
        this.orderList = dbody.data.list
        this.page = dbody.data.page
      })
    },
    // 跳转到查看页面
    goOrderPage (params) {
      let id = params.row.id
      let work_type = params.row.work_type
      const route = {
        name: 'searchorderreply',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    //新页面
    getNewPage (page) {
      let data = this.sreachInfo;
      data.page = page;
      queryWorkOrderList(data).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if (!dbody.data.list) {
          this.orderList = [];
          this.page ={
            current_page: 1,
            last_page: '',
            list_rows: 0,
            total: 0
          };
          return
        }
        this.orderList = dbody.data.list
        this.page = dbody.data.page
      })
    },
    // 设备清单
    initEquipmentinfo(){
      showStoreDevice( this.store_id ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: "设备清单获取失败！"
          })
          return
        }
        let data = dbody.data;
        this.equipmentinfo.connect = this.trimNull(data.connect.split(','))
        this.equipmentTableData = data.device;
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
      this.initMemberinfo();
      this.initEquipmentinfo();
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
      if (this.v_end_tableData.length > 0) {
        let t = 0
        this.v_end_tableData.forEach(function (i, j) {
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
    tableKWTotal:function() {
      if (this.equipmentTableData.length <= 0) {
        return '0.00'
      }
      let kw = 0
      this.equipmentTableData.forEach(function (i, j) {
        if(!!i.kw && i.kw*1 > 0){kw += i.kw*1*i.quantity*1 }
      })
      return (kw*1).toFixed(2);
    },
    tableGASTotal:function() {
      if (this.equipmentTableData.length <= 0) {
        return '0.00'
      }
      let gas = 0
      this.equipmentTableData.forEach(function (i, j) {
        if(!!i.gas && i.gas*1 > 0){gas += i.gas*1*i.quantity*1 }
      })
      return (gas*1).toFixed(2);
    }
  },
  created: function () {
    let id = this.$route.query.id
    let kitchen_id = this.$route.query.kitchen_id
    this.sreachInfo.kitchen_id = this.$route.query.kitchen_id
    this.sreachInfo.store_id = this.$route.query.id
    this.currentName = this.$route.query.name
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
  },
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
