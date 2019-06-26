<template>
  <div>
    <Card title="修改人员" shadow>
      <Form ref="formItem" :model="formItem" :label-width="80"  :rules="ruleValidate">
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="用户名" prop="username">
                <Input v-model="formItem.username" placeholder="输入姓名"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="姓名" prop="fullname">
                <Input v-model="formItem.fullname" placeholder="输入姓名"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="性别" prop="gender">
                <RadioGroup v-model="formItem.gender">
                  <Radio label="1">男</Radio>
                  <Radio label="2">女</Radio>
                </RadioGroup>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="密码">
                <Input v-model="formItem.password" placeholder="输入密码"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="确认密码">
                <Input v-model="formItem.confirm_password" placeholder="输入密码"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="所属厨房" prop="kitchen_id">
                <Select v-model="formItem.kitchen_id" multiple>
                  <Option v-for="item in kitchen_list" :value="item.id" :key="item.id">{{ item.kitchen_name }}</Option>
                </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="权限组" prop="group_id">
                <Select v-model="formItem.group_id">
                  <Option v-for="item in permission_group" :value="item.id" :key="item.id">{{ item.group_name }}</Option>
                </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="22">
            <FormItem label="备注">
              <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入意见"></Input>
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
import { getEmployeeGroup, getMemberDetail, editMember } from '@/api/permission'
import { getKitchenList } from '@/api/kitchen'
export default {
  name: 'edit_Member',
  data () {
    return {
      member_id: '',
      // 表单验证
      formItem: {
        username: '',
        fullname: '',
        gender: '',
        group_id: '',
        kitchen_id: '',
        password: '',
        confirm_password: ''
      },
      password: '',
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '用户名不能超过50个字', trigger: 'blur' }
        ],
        fullname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '姓名不能超过50个字', trigger: 'blur' }
        ],
        gender: [
          { required: true}
        ],
        group_id: [
          { required: true}
        ],
        kitchen_id: [
          { required: true}
        ]
      },
      permission_group: [],
      kitchen_list: [],
      kitchen_list_ok: false,
      permission_group_ok: false
    }
  },
  methods: {
    // 提交验证器
    submitValidateField: function (obj) {
      obj.username = obj.username.trim()
      if (!obj.username) {
        this.$Notice.warning({
          title: '用户名不能为空！'
        })
        return false
      }
      obj.fullname = obj.fullname.trim()
      if (!obj.fullname) {
        this.$Notice.warning({
          title: '姓名不能为空！'
        })
        return false
      }
      if (!!obj.password || !!obj.confirm_password) {
        if ((obj.password != obj.confirm_password) || (obj.password.length != obj.confirm_password.length)) {
          this.$Notice.warning({
            title: '两次密码输入不一致！'
          })
          return false
        } else {
          this.password = obj.password
        }
      }
      if (!obj.group_id) {
        this.$Notice.warning({
          title: '姓名不能为空！'
        })
        return false
      }
      if (!obj.kitchen_id) {
        this.$Notice.warning({
          title: '厨房不能为空！'
        })
        return false
      }
      return true
    },
    // 提交
    handleSubmit () {
      let obj = this.formItem
      obj.id = this.member_id
      let that = this
      if (this.submitValidateField(obj)) {
        obj.password = this.password
        editMember(obj).then(res => {
          const dbody = res.data
          if (dbody.code == 0) {
            this.$Notice.warning({
              title: '信息提交完成！'
            })
            setTimeout(function () {
              const route = {
                name: 'memberList'
              }
              that.$router.push(route)
            }, 1500)
          } else {
            this.$Notice.warning({
              title: dbody.msg
            })
          }
        })
      }
    },
    // isOkToGetData
    isOkToGetData () {
      if (this.kitchen_list_ok && this.permission_group_ok) {
        getMemberDetail(this.member_id).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.kitchen_list_ok = false
          this.permission_group_ok = false
          let arr = dbody.data.kitchen_id.split(',')
          let arr2 = []
          arr.forEach(function (item) {
            arr2.push(item * 1)
          })
          dbody.data.kitchen_id = arr2
          this.formItem.username = dbody.data.username
          this.formItem.fullname = dbody.data.fullname
          this.formItem.gender = dbody.data.gender + ''
          this.formItem.group_id = dbody.data.group_id
          this.formItem.kitchen_id = dbody.data.kitchen_id
        })
      }
    }
  },
  computed: {
  },
  mounted: function () {
    this.member_id = this.$route.query.id
    this.$refs.formItem.resetFields()
    getEmployeeGroup().then(res => {
      const dbody = res.data
      this.permission_group = dbody.data.list || []
      this.permission_group_ok = true
      this.isOkToGetData()
    })
    getKitchenList().then(res => {
      let dbody = res.data
      this.kitchen_list = dbody.data.list || []
      this.kitchen_list_ok = true
      this.isOkToGetData()
    })
    this.isOkToGetData()
  }
}
</script>

<style lang="less">
</style>
