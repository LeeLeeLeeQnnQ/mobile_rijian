<template>
  <div>
    <div>
      <Card shadow>
        <Row :gutter="20">
          <i-col :xs="4" :md="4" :lg="4">
            <Select v-model="sreach_kitchen_id" @on-change="selectKitchen">
              <Option v-for="item in kitchenList" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
            </Select>
          </i-col>
        </Row>
      </Card>
    </div>
    <Tabs :animated="false" style="margin-top: 5px;">
        <Button @click="buildStore" size="small" slot="extra">店铺建档</Button>
        <TabPane label="起租中">
          <tables ref="start_shops_tables"  v-model="start_shops_list" :columns="start_shops_columns" @data-view="showShopCard" @data-edit="editStartCard" @data-handle="handleStartCard"/>
          <Page :total="start_shops_page.total" :page-size="start_shops_page.list_rows" style="margin-top:10px;" @on-change="getStartShopsNewPage"/>
        </TabPane>
        <TabPane label="租赁中">
          <tables ref="normal_shops_tables"  v-model="normal_shops_list" :columns="normal_shops_columns" @data-view="showShopCard" @data-edit="editStartCard"/>
          <Page :total="normal_shops_page.total" :page-size="normal_shops_page.list_rows" style="margin-top:10px;" @on-change="getNormalShopsNewPage"/>
        </TabPane>
        <TabPane label="退租中">
          <tables ref="end_shops_tables"  v-model="end_shops_list" :columns="end_shops_columns" @data-view="showShopCard" @data-edit="editStartCard2" @data-handle="handleStartCard2"/>
          <Page :total="end_shops_page.total" :page-size="end_shops_page.list_rows" style="margin-top:10px;" @on-change="getEndShopsNewPage"/>
        </TabPane>
        <TabPane label="已归档">
          <tables ref="eliminate_shops_tables"  v-model="eliminate_shops_list" :columns="eliminate_shops_columns" @data-view="showShopCard" @data-edit="editStartCard2"/>
          <Page :total="eliminate_shops_page.total" :page-size="eliminate_shops_page.list_rows" style="margin-top:10px;" @on-change="getEliminateShopsNewPage"/>
        </TabPane>
        <TabPane label="全部商户">
          <tables ref="all_shops_tables"  v-model="all_shops_list" :columns="all_shops_columns" @data-view="showShopCard"/>
          <Page :total="all_shops_page.total" :page-size="all_shops_page.list_rows" style="margin-top:10px;" @on-change="getAllShopsNewPage"/>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Tables from '_c/tables'
// 获取权限厨房
import { getKitchenList } from '@/api/kitchen'
import { getAllShopList } from '@/api/data'
export default {
  name: 'kitchen-data-store-list',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索部分
      kitchenList:[],
      sreach_kitchen_id:'',
      // 全部商户
      all_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺', key: 'store_no'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        }
      ],
      all_shops_list: [],
      all_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      //起租中
      start_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺', key: 'store_no'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {title: '操作状态',
          render: (h, params) => {
            let confirm_time = params.row.confirm_time*1
            if( confirm_time > 0 ){
              return h('span', { style: {color: '#ff9900'}}, '财务已确认')
            }else{
              return h('span', { style: {color: '#19be6b'}}, '财务已建档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              let confirm_time = params.row.confirm_time*1
              if( confirm_time > 0 ){
                return ''
              }
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-handle', params)
                  }
                }},
              '操作')
            },
          ]
        }
      ],
      start_shops_list: [],
      start_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      //租赁中
      normal_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺', key: 'store_no'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        }
      ],
      normal_shops_list: [],
      normal_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      //退租中
      end_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺', key: 'store_no'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease'},
        {title: '店长', key: 'manage_name'},
        {title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        },
        {
          title: '操作',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              let settle = params.row.settle;
              if(!settle){
                return h('span', {style: {margin: '#ff9900'},},'结算表格未出')
              }
              return h('Button', {
                style: {margin: '0'},
                props: {
                    type: 'error',
                    size: 'small'
                  },
                on: {
                  'click': () => {
                    vm.$emit('data-handle', params)
                  }
                }},
              '归档')
            },
          ]
        }
      ],
      end_shops_list: [],
      end_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 已归档 eliminate
      eliminate_shops_columns: [
        {title: 'ID', key: 'id', width: 80},
        {title: '厨房', key: 'kitchen_name'},
        {title: '商铺', key: 'store_no'},
        {title: '商铺名', key: 'store_name'},
        {title: '提交人', key: 'employee_name'},
        {title: '招商人', key: 'manage_lease'},
        {title: '店长', key: 'manage_name'},
        { title: '店铺状态',
          render: (h, params) => {
            let lease_type = params.row.lease_type*1
            if(lease_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '起租中')
            }else if (lease_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '租赁中')
            }else if (lease_type == 3) {
              return h('span', { style: {color: '#ff9900'}}, '退租中')
            }else if (lease_type == 4) {
              return h('span', '已归档')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                    type: 'info',
                    size: 'small'
                  },
                on: {
                  'click': () => {
                    vm.$emit('data-view', params)
                  }
                }},
              '资料')
            },
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          button: [
            // 不带气泡 一层嵌套
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0'},
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-edit', params)
                  }
                }},
              '编辑')
            },
          ]
        }
      ],
      eliminate_shops_list: [],
      eliminate_shops_page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 查看操作
    }
  },
  methods: {
    // 财务建档案
    buildStore(){
      const route = {
        name: 'finance_build'
      }
      this.$router.push(route)
    },
    // 起租 租赁中编辑
    editStartCard(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShopEdit',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 财务润恤起租
    handleStartCard(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShophandle',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    handleStartCard2(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShophandle2',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 退租 归档编辑
    editStartCard2(params){
      let id = params.row.store_id
      const route = {
        name: 'financeShopEdit2',
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 重新选择厨房
    selectKitchen(){
      this.initData(this.sreach_kitchen_id);
    },
    // 获取全部店铺列表函数
    getAllShops( kitchen_id , page ){
      let info = { kitchen_id : kitchen_id }
      if(!!page) {
        info.page = page;
      }
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.all_shops_list = dbody.data.list || [];
        this.all_shops_page = dbody.data.page;
      })
    },
    getAllShopsNewPage(page){
      // 获取新页-全部店铺
      this.getAllShops( this.sreach_kitchen_id , page );
    },
    // 获取起租中
    getStartShops( kitchen_id , page ){
      let info = { kitchen_id : kitchen_id }
      if(!!page) {
        info.page = page;
      }
      info.lease_type = 1;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.start_shops_list = dbody.data.list || [];
        this.start_shops_page = dbody.data.page;
      })
    },
    getStartShopsNewPage(page){
      // 获取新页-全部店铺
      this.getStartShops( this.sreach_kitchen_id , page );
    },
    // 获取租赁中
    getNormalShops( kitchen_id , page ){
      let info = { kitchen_id : kitchen_id }
      if(!!page) {
        info.page = page;
      }
      info.lease_type = 2;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.normal_shops_list = dbody.data.list || [];
        this.normal_shops_page = dbody.data.page;
      })
    },
    getNormalShopsNewPage(page){
      // 获取新页-全部店铺
      this.getNormalShops( this.sreach_kitchen_id , page );
    },
    // 获取退租中
    getEndShops( kitchen_id , page ){
      let info = { kitchen_id : kitchen_id }
      if(!!page) {
        info.page = page;
      }
      info.lease_type = 3;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.end_shops_list = dbody.data.list || [];
        this.end_shops_page = dbody.data.page;
      })
    },
    getEndShopsNewPage(page){
      // 获取新页-全部店铺
      this.getEndShops( this.sreach_kitchen_id , page );
    },
    // 获取归档
    getEliminateShops( kitchen_id , page ){
      let info = { kitchen_id : kitchen_id }
      if(!!page) {
        info.page = page;
      }
      info.lease_type = 4;
      getAllShopList( info ).then(res => {
        const dbody = res.data
        this.eliminate_shops_list = dbody.data.list || [];
        this.eliminate_shops_page = dbody.data.page;
      })
    },
    getEliminateShopsNewPage(page){
      // 获取新页-全部店铺
      this.getEliminateShops( this.sreach_kitchen_id , page );
    },
    // 表格查看栏
    showShopCard(params){
      let id = params.row.store_id
      let kitchen_id = params.row.kitchen_id
      const route = {
        name: 'kitchenDataShopDetail',
        query: {
          id,
          kitchen_id
        }
      }
      this.$router.push(route)
    },
    // 初始化函数
    initData( kitchen_id ){
      // 全部列表
      this.getAllShops( kitchen_id );
      // 起租中
      this.getStartShops( kitchen_id );
      // 租赁中
      this.getNormalShops( kitchen_id );
      // 退租中
      this.getEndShops( kitchen_id );
      // 归档
      this.getEliminateShops( kitchen_id );
    },
  },
  mounted () {
    getKitchenList().then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      // 初始化函数
      this.kitchenList = dbody.data.list || [];
      if(this.kitchenList.length > 0){
        this.sreach_kitchen_id = this.kitchenList[this.kitchenList.length - 1].id;
        this.initData(this.sreach_kitchen_id);
      }
    })   
  }
}
</script>

<style>

</style>
