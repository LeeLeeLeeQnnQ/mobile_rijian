import axios from '@/libs/api.request'

// 获取厨房信息列表
export const getKitchenList = () => {
  return axios.request({
    url: '/api/Index/getKitchenList',
    method: 'get'
  })
}

// 获取厨房信息列表
export const getDayInspectList = (obj) => {
  obj.lease_type = 6;
  return axios.request({
    url: '/api/StoreLease/queryList',
    params: obj,
    method: 'get'
  })
}

// 获得题目
/*
  type 1 日 普通 题目
*/
export const getWorkOptionList = (obj) => {
  return axios.request({
    url: '/api/work/getWorkOptionList',
    params: obj,
    method: 'get'
  })
}

// 获得列表
export const getItemDetail = (data) => {
  return axios.request({
    url: '/api/work/show',
    data,
    method: 'POST'
  })
}

// api/work/edit
export const submitWorkInfo = (data) => {
  return axios.request({
    url: '/api/work/edit',
    data,
    method: 'POST'
  })
}
