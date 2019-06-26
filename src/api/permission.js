import axios from '@/libs/api.request'

// 人缘列表
export const getMemberList = (page) => {
  let obj = {}
  if(!!page){
    obj.page = page;
  }
  return axios.request({
    url: '/api/Employee/index',
    params: obj,
    method: 'get'
  })
}
// 增加人缘
export const addMember = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/Employee/add',
    data,
    method: 'post'
  })
}
/// api/employee/show人缘详情
export const getMemberDetail = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/Employee/show',
    data,
    method: 'post'
  })
}
/// api/employee编辑人员
export const editMember = (data) => {
  return axios.request({
    url: '/api/Employee/edit',
    data,
    method: 'post'
  })
}
/// api/employee编辑人员
export const deleMember = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/Employee/delete',
    data,
    method: 'post'
  })
}

// 获取权限组列表
export const getEmployeeGroup = (page) => {
  if (page) {
    return axios.request({
      url: '/api/EmployeeGroup/index?page=' + page,
      method: 'get'
    })
  } else {
    return axios.request({
      url: '/api/EmployeeGroup/index',
      method: 'get'
    })
  }
}
// 获取权限节点
// /api/EmployeeGroup/getModules
export const getEmployeeModules = () => {
  return axios.request({
    url: '/api/EmployeeGroup/getModules',
    method: 'get'
  })
}
// 增加权限组
export const addEmployeeGroup = (data) => {
  return axios.request({
    url: '/api/EmployeeGroup/add',
    data,
    method: 'post'
  })
}
// 权限组 详情
// /api/EmployeeGroup/show
export const getEmployeeGroupDetail = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/EmployeeGroup/show',
    data,
    method: 'post'
  })
}

// 删除权限
export const deleEmployeeGroup = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/EmployeeGroup/delete',
    data,
    method: 'post'
  })
}
// 编辑权限组
export const editEmployeeGroup = (data) => {
  return axios.request({
    url: '/api/EmployeeGroup/edit',
    data,
    method: 'post'
  })
}
