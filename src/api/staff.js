import axios from '@/libs/api.request'



// 确认工资
export const solidEmployeeWageList = ( month  ) => {
  let obj = { month : month }
  return axios.request({
    url: '/api/EmployeeWage/confirm',
    obj,
    method: 'post'
  })
}

// list
export const getEmployeeWageList = (obj) => {
  return axios.request({
    url: '/api/EmployeeWage/index',
    params: obj,
    method: 'get'
  })
}
/// api/EmployeeWage/add
export const addEmployeeWage = (data) => {
  return axios.request({
    url: '/api/EmployeeWage/add',
    data,
    method: 'post'
  })
}
/// api/EmployeeWage/edit 修改员工工资条
export const editEmployeeWage = (data) => {
  return axios.request({
    url: '/api/EmployeeWage/edit',
    data,
    method: 'post'
  })
}
// 删除/api/EmployeeWage/delete
export const deleteEmployeeWage = (id) => {
  let data = { id: id }
  return axios.request({
    url: '/api/EmployeeWage/delete',
    data,
    method: 'post'
  })
}

// 设置值班表
export const setCalendar = (data) => {
  return axios.request({
    url: '/api/Work/rule',
    data,
    method: 'post'
  })
}
// getCalendar
// 获取班表
export const getCalendar = (kitchen_id) => {
  let data = { kitchen_id: kitchen_id }
  return axios.request({
    url: 'api/Work/getRule',
    data,
    method: 'post'
  })
}
