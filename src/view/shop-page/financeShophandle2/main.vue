<template>
    <Card shadow>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <p slot="title">
        {{kitchen_name}}  {{store_no}}  {{store_name}}
      </p>
      <Tabs :animated="false" style="margin-top: 5px;" class="h100">
        <TabPane label="租期租约">
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
                  <Button @click="fileStoreModal = true" type="warning">确认归档</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
      <Modal v-model="fileStoreModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确认归档么？</span>
        </p>
        <div style="text-align:center">
            <p>归档后退租信息将不能被操作！</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="leaseinfoSubmit">确认</Button>
        </div>
      </Modal>
    </Card>
</template>

<script>
import { uploadImg, getShopDetail , setEndShopEdit } from '@/api/data'
import { setFileStore } from '@/api/finance'
export default {
  name: 'finance-store-handle2',
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
      // 图片
      imgUrl: '',
      visible: false,
      // 租期租约
      leaseinfo:{},
      fileStoreModal:false,
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
      if(this.archive.length <= 0){
        this.$Notice.warning({
          title: '结算财务打款凭证必须填写！'
        })
        return;
      }
      let obj = { store_id : this.store_id };
      obj.archive = this.archive.join(",");
      setEndShopEdit(obj).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.fileStoreInfo();
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    fileStoreInfo () {
      let that = this
      setFileStore(this.store_id).then(res => {
        const dbody = res.data
        if (dbody.code == 0) {
          this.$Notice.warning({
            title: '归档完成！'
          })
          this.$router.go(-1)
        } else {
          this.$Notice.warning({
            title: dbody.msg
          })
        }
      })
    },
    // 工具函数
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
    //初始化数据
    initData ( data ) {
      //厨房  商户名 档口号
      this.kitchen_name = data.kitchen_name;
      this.store_name = data.store_name;
      this.store_no = data.store_no;
      this.initLeaseinfo(data);
    }
  },
  computed: {
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
