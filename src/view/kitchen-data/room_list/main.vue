<template>
  <div>
    <Card shadow style="margin-bottom: 10px" shadow>
        <Input v-model="item.kitchen_name" readonly style="width: 200px"></Input>
    </Card>
    <Card>
      <p slot="title">
          档口情况列表
      </p>
      <a href="#" slot="extra" @click.prevent="showAddModalFn">
          新建档口情况
      </a>
      <tables ref="tables" v-model="kitchenStoreList" :columns="columns" @data-edit="handleEdit" @data-dele="handleDele"/>
      <Page :total="page.total" :page-size="page.list_rows" style="margin-top:10px;" @on-change="getNewPage"/>
    </Card>
    <Modal v-model="showAddModal" title="添加店铺数据" @on-ok="saveAddModalInfo">
        <Form :model="item" :label-width="80">
          <FormItem label="店铺">
            <Input v-model="item.kitchen_name" readonly style="width: 200px"></Input>
          </FormItem>
          <FormItem label="档口名称">
            <Input v-model="item.store_no" placeholder="输入档口名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺面积">
            <Input v-model="item.area" placeholder="输入店铺面积" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="原价入场费">
            <Input v-model="item.entrance_fee" placeholder="输入原价入场费" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="实际入场费">
            <Input v-model="item.entrance_sell" placeholder="输入实际入场费" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="原价租金">
            <Input v-model="item.rent_fee" placeholder="输入原价租金" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="实际租金">
            <Input v-model="item.rent_sell" placeholder="输入实际租金" style="width: 200px"></Input>
          </FormItem>
        </Form>
    </Modal>
    <Modal v-model="showEditModal" title="修改店铺数据" @on-ok="saveEditModalInfo">
        <Form :model="item" :label-width="80">
          <FormItem label="店铺">
            <Input v-model="item.kitchen_name" readonly style="width: 200px"></Input>
          </FormItem>
          <FormItem label="档口名称">
            <Input v-model="item.store_no" placeholder="输入档口名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺面积">
            <Input v-model="item.area" placeholder="输入店铺面积" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="原价入场费">
            <Input v-model="item.entrance_fee" placeholder="输入原价入场费" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="实际入场费">
            <Input v-model="item.entrance_sell" placeholder="输入实际入场费" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="原价租金">
            <Input v-model="item.rent_fee" placeholder="输入原价租金" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="实际租金">
            <Input v-model="item.rent_sell" placeholder="输入实际租金" style="width: 200px"></Input>
          </FormItem>
        </Form>
    </Modal>
    <Modal
        title="删除操作"
        v-model="showDeleModal"
        @on-ok="saveDeleModalInfo"
        :style="{top: '20px'}">
        <p>确认删除档口吗？</p>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getKitchenStoreList, addKitchenStore, editKitchenStore, deleKitchenStore} from '@/api/setting'
import { getKitchenList} from '@/api/data'
export default {
  name: 's-storeNo-list',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: '档口号', key: 'store_no'},
        {title: '档口面积', key: 'area'},
        // {title: '现在商户', key: 'store_name'},
        {title: '原价入场费', key: 'entrance_fee'},
        { title: '入场费折扣',
          render: (h, params) => {
            let t = params.row.entrance_fee*1;
            let b = params.row.entrance_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际入场费', key: 'entrance_sell'},
        {title: '原价租金', key: 'rent_fee'},
        { title: '租金折扣',
          render: (h, params) => {
            let t = params.row.rent_fee*1;
            let b = params.row.rent_sell*1;
            if(t > 0 && b > 0){
              let r = (1-((t-b)/t)).toFixed(2);
              return h('span', r );
            }else{
              return h('span', 0 );
            }
          }
        },
        {title: '实际租金', key: 'rent_sell'},
        {
          title: '操作',
          key: 'handle',
          width : 160,
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                'click': () => {
                  vm.$emit('data-edit', params)
                }
              }},
              '修改')
            },
            (h, params, vm) => {
              return h('Button', {
                style: {margin: '0 0 0 0.5em'},
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    vm.$emit('data-dele', params)
                  }
                }},
              '删除')
            }
          ]
        }
      ],
      kitchenStoreList: [],
      kitchenList:[],
      showAddModal: false,
      showEditModal: false,
      showDeleModal: false,
      item: {},
      select_kitchen_id:'',
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      store_id:'',
    }
  },
  methods: {
    showAddModalFn(){
      this.resetObj();
      this.showAddModal = true;
    },
    getNewPage( page ){
      let data = { 
        kitchen_id : this.select_kitchen_id ,
        page : page ,
      }
      this.setKitchenStoreList( data );
    },
    // 显示编辑
    handleEdit (params) {
      this.resetObj();
      this.store_id  =  params.row.id ;
      this.item.store_no = params.row.store_no;
      this.item.area = params.row.area;
      this.item.entrance_fee = params.row.entrance_fee;
      this.item.entrance_sell = params.row.entrance_sell;
      this.item.rent_fee = params.row.rent_fee;
      this.item.rent_sell = params.row.rent_sell;
      this.showEditModal = true;
    },
    // 显示删除
    handleDele (params) {
      this.store_id = params.row.id;
      this.showDeleModal = true
    },
    //重制对象
    resetObj(){
      this.item.store_no = '';
      this.item.area = '';
      this.item.entrance_fee = '';
      this.item.entrance_sell = '';
      this.item.rent_fee = '';
      this.item.rent_sell = '';
      this.item.kitchen_id = '';
    },
    //验证发送对象
    verifyObj( obj ){
      if( !obj.kitchen_name ){
        this.$Notice.warning({
          title: '请选择厨房！'
        })
        return false
      }
      if( !obj.store_no ){
        this.$Notice.warning({
          title: '请输入档口名！'
        })
        return false
      }
      if(isNaN(obj.area*1) || obj.area*1 <= 0){
        this.$Notice.warning({
          title: '请输入正确面积！'
        })
        return false
      }
      if(isNaN(obj.entrance_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.entrance_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_fee*1)){
        this.$Notice.warning({
          title: '请输入原价入场费！'
        })
        return false
      }
      if(isNaN(obj.rent_sell*1)){
        this.$Notice.warning({
          title: '请输入实际入场费！'
        })
        return false
      }
      return true;
    },
    // 新增
    saveAddModalInfo () {
      if( this.verifyObj( this.item ) ){
        let obj = this.item;
        obj.kitchen_id = this.select_kitchen_id;
        addKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.setKitchenStoreList({ kitchen_id : this.select_kitchen_id});
        })
      }
    },
    // 修改
    saveEditModalInfo () {
      if( this.verifyObj( this.item ) ){
        let obj = this.item;
        obj.kitchen_id = this.select_kitchen_id;
        obj.id = this.store_id;
        editKitchenStore( obj ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.setKitchenStoreList({ kitchen_id : this.select_kitchen_id});
        })
      }
    },
    // 删除
    saveDeleModalInfo () {
      deleKitchenStore({ id: this.store_id }).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        // 处理成功逻辑
        this.setKitchenStoreList({ kitchen_id : this.select_kitchen_id});
      })
    },
    setKitchenStoreList( obj ){
      getKitchenStoreList( obj ).then(res => {
        const dbody = res.data;
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        if( !dbody.data.list || dbody.data.list.length <= 0){
          this.kitchenStoreList = [];
          return;
        }
        this.kitchenStoreList = dbody.data.list
        this.page = dbody.data.page
      })
    },
  },
  mounted () {
    let that = this;
    let kitchen_id = this.$route.query.kitchen_id
    getKitchenList( ).then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      this.kitchenList = dbody.data;
      if(!this.kitchenList || this.kitchenList.length <= 0){
        return
      }
      this.kitchenList.forEach( function(element, index) {
        if( element.id  == kitchen_id ){
          that.select_kitchen_id = kitchen_id
          that.item.kitchen_name = element.kitchen_name
        }
      });
      // 处理成功逻辑
      this.setKitchenStoreList({ kitchen_id : this.select_kitchen_id}); 
    })
  }
}
</script>

<style>

</style>
