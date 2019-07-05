<template>
  <div class="week_inspect_edit-warp">
    <Modal title="预览图" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <h3>周检任务</h3>
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
            <div>
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </div>
        </div>
      </div>
      <div>
        <a  class="file">
            <input  ref="file"  type="file" id="upload" accept="image" @change="upload">
            <Icon type="ios-camera" size="20"></Icon>
        </a>
      </div>
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
import { getWorkOptionList , submitWorkInfo , uploadImg } from '@/api/data'
import Exif from 'exif-js'
export default {
  name: 'week_inspect_edit',
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
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    handleRemove (file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1)
    },
    upload (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let picValue = files[0];
      this.imgPreview(picValue);
    },
    imgPreview (file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            img.onload = function () {
              let data = self.compress(img,Orientation);
              let cfile = self.dataURLtoFile(data,file.name);
              cfile.then((file)=>{
                self.postImg(file);
              })
            }
          } 
        }
    },
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let file = new File([u8arr], filename, {type:mime});
        let formdata = new FormData();
        formdata.append("file", file);
        let p = new Promise((resolve)=>{
            resolve(formdata);
        });
        return p;
    },
    postImg (obj) {
      uploadImg(obj).then(res => {
        this.$refs.file.value = ''
        let data = res.data;
        if(data.code != 0){
          this.$Message.warning(data.msg)
          return
        }
        this.uploadList.push(data.data)
      })
    },
    rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向    
        const min_step = 0;    
        const max_step = 3;      
        if (img == null)return;    
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
        let height = img.height;    
        let width = img.width;      
        let step = 2;    
        if (step == null) {    
            step = min_step;    
        }    
        if (direction == 'right') {    
            step++;    
            //旋转到原位置，即超过最大值    
            step > max_step && (step = min_step);    
        } else {    
            step--;    
            step < min_step && (step = max_step);    
        }     
        //旋转角度以弧度值为参数    
        let degree = step * 90 * Math.PI / 180;    
        let ctx = canvas.getContext('2d');    
        switch (step) {    
          case 0:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.drawImage(img, 0, 0);    
              break;    
          case 1:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, 0, -height);    
              break;    
          case 2:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, -height);    
              break;    
          case 3:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, 0);    
              break;
        }    
    },
    compress(img,Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
        //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
          case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
          case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },

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
          arr_img.push(img_e)
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
  .file {
      position: relative;
      display: inline-block;
      border:2px dashed #666;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      width: 60px;
      height:60px;
      line-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .file:hover{
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
  }
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
  .week_inspect_edit-warp{
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


