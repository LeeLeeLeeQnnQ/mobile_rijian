<template>
  <div class="week_inspect_item-warp">
    <div class="week_inspect_item-header">
      <h3>{{store_no}}</h3>
      <h3>{{store_name}}</h3>
    </div>
    <div class="add_btn">
      <span @click="handleEdit">增加一个检查</span>
    </div>
    <div>
      <Collapse accordion>
        <Panel v-for="(item,index) in paperObj">
        第{{index*1+1}}次检查 / {{item.create_time}} / {{item.creator_name}}
            <div slot="content" class="paper-box">
              <Card class="paper-item">
                <div v-for="(i,idx) in item.paperList" class="paper-p-item">
                  <h3>
                    <span>{{idx*1+1}}.</span>
                    {{i.title}}
                  </h3>
                  <Checkbox v-model="i.checked" disabled></Checkbox>
                </div>
              </Card>
              <div class="paper-item paper-img-box">
                <div class="img-upload-list" v-for="item in item.pictures">
                <img :src="item">
                    <div class="img-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    </div>
                </div>
              </div>
              <Card class="paper-item paper-text-box">
                <h3>{{item.remark}}</h3>
              </Card>
            </div>
        </Panel>
      </Collapse>
      <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
    </div>
  </div>
</template>

<script>
import { getWorkOptionList , getItemDetail } from '@/api/data'
export default {
  name: 'week_inspect_item',
  components: {

  },
  data () {
    return {
      query:{},
      paper:[],
      data:{},
      list:[],
      paperObj:[],
      visible: false,
      imgUrl: ''
    }
  },
  methods: {
    // handleEdit
    handleEdit(){
      const route = {
        name: 'week_inspect_edit',
        query: this.query
      }
      this.$router.push(route)
    },
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    initData(){
      getItemDetail(this.query).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning(data.msg)
          return
        }
        this.data = data.data;
        this.list = data.data.detail || [];
        this.paperObj = this.getPaperList();
      })
    },
    initPaper(){
      getWorkOptionList({type:this.query.ptype}).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning(data.msg)
          return
        }
        this.paper = data.data;
        this.initData();
      })
    },
    getPaperList(){
      let paperObj = [];
      this.list.forEach( (item, index) => {
        let work_option = !!item.work_option ? JSON.parse(item.work_option) : [];
        item.paperList = [];
        item.pictures = !!item.images ? item.images.split(',') : []
        work_option.forEach( (o, i) => {
          let obj = {};
          if(!!this.paper[i]){
            obj.title = this.paper[i].title || 1;
            obj.checked = (o == 1) ? true : false ;
            item.paperList.push(obj)
          }
        });
        paperObj.push(item)
      });
      return paperObj;
    }
  },
  created () {
    this.query = this.$route.query || {}
    this.query.work_type = 3;
    this.$nextTick(()=>{ 
      this.initPaper()
    })
  },
  computed:{
    store_name() {
      return this.$store.state.user.storeInfo.store_name || this.data.store_name;
    },
    store_no() {
      return this.$store.state.user.storeInfo.store_no || this.data.store_no;
    },
  },
}
</script>
<style scoped lang="less">
  .week_inspect_item-warp{
    overflow-y: auto;
    height:100%;
    padding-bottom: 3rem;
  }
  .week_inspect_item-header{
    width: 70%;
    border-radius: 1em;
    margin: 1rem auto;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffaf01;
    color: #fff;
    text-align: center;
  }
  .add_btn{
    display: flex;
    padding: 1rem 0;
    justify-content: center;
    align-items: center;
    span{
      color: #fff;
      background-color: #f7ba2a;
      border-color: #f7ba2a;
      padding: 0.5rem 1rem;
      border-radius: 0.6rem;
    }
  }
  .paper-item{
    margin-bottom: 0.3rem;
  }
  .paper-p-item{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    height: 2rem;
    padding: 0.3rem;
    margin: 0.1rem;
  }
  .paper-p-item:nth-of-type(odd){ background:#eee;}
  .paper-box{
    padding-bottom: 1rem;
  }
  .paper-img-box{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .ivu-card-body{
      display: flex;
    }
  }
  .img-upload-list{
      display: inline-block;
      margin: 0.5rem 0;
      width: 7em;
      min-height:  7em;
      height:  7em;
      text-align: center;
      line-height:  7em;
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
  .img-upload-list  .img-upload-list-cover{
      display: block;
  }
  .img-upload-list-cover i{
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      margin: 0 2px;
  }
</style>


