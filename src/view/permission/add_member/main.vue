<template>
  <div>
    <Card title="增加人员" shadow>
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
            <FormItem label="输入密码" prop="password1">
                <Input v-model="formItem.password1" placeholder="输入密码"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start" align="middle" :gutter="20">
          <i-col span="10">
            <FormItem label="确认密码" prop="password2">
                <Input v-model="formItem.password2" placeholder="输入密码"></Input>
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
            <FormItem label="备注" prop="textarea">
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
import { getEmployeeGroup, addMember } from '@/api/permission'
import { getKitchenList } from '@/api/kitchen'
export default {
  name: 'create_member',
  data () {
    return {
      // 表单验证
      formItem: {
        username: '',
        fullname: '',
        gender: '',
        group_id: '',
        kitchen_id: '',
        password1: '',
        password2: '',
        remark: ''
      },
      password: '',
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '用户名不能超过50个字', trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '标题不能超过16个字', trigger: 'blur' },
          { type: 'string', min: 6, message: '标题不能少于6个字', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', max: 16, message: '标题不能超过16个字', trigger: 'blur' },
          { type: 'string', min: 6, message: '标题不能少于6个字', trigger: 'blur' }
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
      kitchen_list: []
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
      if (!obj.password1 || !obj.password2) {
        this.$Notice.warning({
          title: '请输入密码！'
        })
        return false
      }
      if ((obj.password1 != obj.password2) || (obj.password1.length != obj.password2.length)) {
        this.$Notice.warning({
          title: '两次密码输入不一致！'
        })
        return false
      } else {
        this.password = obj.password1
      }
      return true
    },
    // 提交
    handleSubmit () {
      let obj = this.formItem
      this.formItem.kitchen_id = this.formItem.kitchen_id.sort(function (a, b) { return a * 1 - b * 1 })
      let that = this
      if (this.submitValidateField(obj)) {
        obj.password = this.password
        addMember(obj).then(res => {
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
    }
  },
  mounted: function () {
    getEmployeeGroup().then(res => {
      let dbody = res.data
      this.permission_group = dbody.data.list
    })
    getKitchenList().then(res => {
      let dbody = res.data
      this.kitchen_list = dbody.data.list
    })
    this.$refs.formItem.resetFields()
  }
}
</script>

<style lang="less">
</style>
