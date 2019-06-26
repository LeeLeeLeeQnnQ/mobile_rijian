<template>
  <div class="day_inspect_edit-warp">
    <Modal title="预览图" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <h3>店铺日检</h3>
    <Card class="paper-item">
      <p slot="title">
          检查事项
      </p>
      <div v-for="(i,idx) in paper" class="paper-p-item">
        <h3>
          <span>{{idx*1+1}}.</span>
          {{i.title}}
        </h3>
        <Checkbox v-model="i.checked"></Checkbox>
      </div>
    </Card>
    <Card class="paper-item">
      <div class="img-upload-list-box">
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
        action="/api/index/upload"
        style="display: inline-block;width:60px;">
        <div style="width: 60px;height:60px;line-height: 60px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
    </Card>
    <Card class="paper-item">
      <Input v-model="remark" type="textarea" :rows="4" placeholder="不少于2字" />
    </Card>
    <div class="paper-item submit-btn-box">
      <Button class="submit-btn" @click="submitInfo">提交报告</Button>
    </div>
  </div>
</template>

<script>
import { getWorkOptionList , submitWorkInfo } from '@/api/data'
export default {
  name: 'day_inspect_edit',
  components: {

  },
  data () {
    return {
      query:{},
      paper:[],
      visible: false,
      imgUrl: '',
      uploadList:[],
      remark:'',
    }
  },
  methods: {
    // 提交
    submitInfo(){
      let obj = Object.assign({},this.query);
      if(!this.remark || this.remark.length<2){
        this.$Message.warning('请输入意见！')
        return
      }
      obj.remark = this.remark;
      if(this.uploadList.length > 0){
        let arr_img = [];
        this.uploadList.forEach((img_e,img_i)=>{
          arr_img.push(img_e.url)
        });
        obj.images = arr_img.join(',');
      }else{
        obj.images = '';
      }
      let score = 0;
      let work_option = [];
      this.paper.forEach((paper_e,paper_i)=>{
          if(!!paper_e.checked){
            score = score*1 +1;
            work_option.push(1)
          }else{
            work_option.push(2)
          }
      });
      obj.score = score;
      obj.work_option = '['+ work_option.toString()+']';
      obj.work_type = this.query.work_type;
      submitWorkInfo(obj).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning(data.msg)
          return
        }
        this.$Message.warning('提交成功！')
        this.$router.go(-1);
      })
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
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    initPaper(){
      getWorkOptionList({type:this.query.ptype}).then(res => {
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning(data.msg)
          return
        }
        let paper = data.data || [];
        paper.forEach( (item, index)=>{
          item.checked = true;
        });
        this.paper = paper;
      })
    },
  },
  created () {
    this.query = this.$route.query || {}
    this.$nextTick(()=>{ 
      this.initPaper()
    })
  },
  computed:{
    // store_name() {
    //   return this.$store.state.user.storeInfo.store_name;
    // },
    // store_no() {
    //   return this.$store.state.user.storeInfo.store_no;
    // },
  },
}
</script>
<style type="text/css">
  .ivu-checkbox-inner{
    width: 1.2rem;
    height: 1.2rem;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner:after{
    width:0.5rem;
    height: 1rem;
    top:0;
    left: 4px;
  }
</style>
<style scoped lang="less">
  .submit-btn-box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .submit-btn{
    color: #fff;
    background-color: #f7ba2a;
    border-color: #f7ba2a;
  }
  .day_inspect_edit-warp{
    overflow-y: auto;
    height:100%;
    box-sizing: border-box;
    padding: 0 0.3rem 3rem 0.3rem;
    >h3{
      font-size: 1.2rem;
      text-align: center;
      padding: 1rem 0;
    }
  }
  .paper-p-item{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: 0.3rem;
    margin: 0.1rem;
  }
  .paper-p-item:nth-of-type(odd){ background:#eee;}
  .img-upload-list-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .img-upload-list{
      display: inline-block;
      margin: 0.5rem 0;
      width: 6em;
      min-height:  6em;
      height:  6em;
      text-align: center;
      line-height:  6em;
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
  .img-upload-list .img-upload-list-cover{
      display: block;
  }
  .img-upload-list-cover i{
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      margin: 0 2px;
  }
  .paper-item{
    margin-bottom: 0.5rem;
  }
</style>


