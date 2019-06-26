<template>
  <div>
    <Card shadow>
      <p slot="title">
        {{hTitle}}
      </p>
      <Collapse simple>
        <Panel v-for="item in paperList">
          {{ item.title }}
          <div slot="content">
            <Paper :subjects=item.subjects :number=item.number :opinion=item.opinion :pictures=item.pictures></Paper>
          </div>
        </Panel>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import { getWorkOptionList, getWorkOptionDetail } from '@/api/standard'
import Paper from '_c/paper'
export default {
  name: 'kitchen-report',
  components: {
    Paper
  },
  data () {
    return {
      paperList: [],
      paper: [],
      hTitle: ''
    }
  },
  methods: {
    // 清除空值
    trimNull (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == '' || typeof (array[i]) === 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array.length > 0 ? array : null
    },
    // 获取paper
    getOnePaper (item, number) {
      let newObj = JSON.parse(JSON.stringify(this.paper))
      let num = number
      for (let i = 0, length = newObj.length; i < length; i++) {
        let option = JSON.parse(item.work_option)
        newObj[i].judge = option[i]
        newObj[i].content = newObj[i].title
        if (option[i] == 1) {
          num += newObj[i].score*1
        }
      }
      return { newObj, num }
    }
  },
  created () {
    // 获取id
    let id = this.$route.query.id
    // 获取厨房列表
    getWorkOptionList().then(res => {
      const dbody = res.data
      this.paper = dbody.data
      getWorkOptionDetail(id).then(res => {
        const info = res.data
        let that = this
        if (info.code != 0) {
          this.$Message.warning(dbody.msg)
          return
        }
        this.hTitle = info.data.work_date + ' / ' + info.data.store_no + ' / ' + info.data.store_name + ' / ' + info.data.employee_name
        let list = info.data.detail || []
        list.forEach(function (item, index) {
          let it = {}
          it.title = '第' + (index + 1) + '次检查 / ' + item.create_time
          it.pictures = that.trimNull(item.images.split(','))
          let obj = that.getOnePaper(item, 0)
          it.subjects = obj.newObj
          it.number = obj.num + '分'
          it.opinion = item.remark
          that.paperList.push(it)
        })
      })
    })
  }
}
</script>

<style lang="less">

</style>
