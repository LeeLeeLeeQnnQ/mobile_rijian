import axios from '@/libs/api.request'

/// 获取日检列表-员工
export const getInspectList = (str) => {
  return axios.request({
    url: '/api/Work/employee' + str,
    method: 'get'
  })
}

/// 获取日检列表-店长
export const getTotalInspectList = (str) => {
  return axios.request({
    url: '/api/Work/index' + str,
    method: 'get'
  })
}

// 获取题目列表
export const getWorkOptionList = () => {
  return axios.request({
    url: '/api/Work/getWorkOptionList',
    method: 'get'
  })
}
// /api/work/show 获取日检详情
export const getWorkOptionDetail = (id) => {
  return axios.request({
    url: '/api/Work/show?id=' + id,
    method: 'get'
  })
}
