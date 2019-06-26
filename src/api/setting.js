import axios from '@/libs/api.request'

// 权限页面
export const getKitchenList = () => {
  return axios.request({
    url: '/api/Kitchen/index',
    method: 'get'
  })
}

export const addKitchen = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/Kitchen/add',
    data,
    method: 'post'
  })
}

export const editKitchen = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/Kitchen/edit',
    data,
    method: 'post'
  })
}

export const deleKitchen = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/Kitchen/delete',
    data,
    method: 'post'
  })
}

//工单配置列表
// WorkCategory/index
export const getWorkCategoryList = ( page ) => {
  return axios.request({
    url: '/api/WorkCategory/index',
    params: page,
    method: 'get'
  })
}

//增加工单配置列表
// WorkCategory/index
export const addWorkCategory = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/WorkCategory/add',
    data,
    method: 'post'
  })
}

//编辑工单配置列表
// WorkCategory/edit
export const editWorkCategory = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/WorkCategory/edit',
    data,
    method: 'post'
  })
}


//删除工单配置列表
// /WorkCategory/delete
export const deleWorkCategory = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/WorkCategory/delete',
    data,
    method: 'post'
  })
}

//工单配置列表
// KitchenStore/index 
export const getKitchenStoreList = ( obj ) => {
  return axios.request({
    url: '/api/KitchenStore/index',
    params: obj,
    method: 'get'
  })
}

//工单配置列表
// KitchenStore/index
export const addKitchenStore = ( obj ) => {
  const data = obj
  return axios.request({
    url: '/api/KitchenStore/add',
    data,
    method: 'post'
  })
}

//工单配置列表
// KitchenStore/edit
export const editKitchenStore = ( obj ) => {
  const data = obj
  return axios.request({
    url: '/api/KitchenStore/edit',
    data,
    method: 'post'
  })
}

//删除工单配置列表
// KitchenStore/edit
export const deleKitchenStore = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/KitchenStore/delete',
    data,
    method: 'post'
  })
}


// 厨房电表 水表
export const getKitchenMeterList = ( data ) => {
  return axios.request({
    url: '/api/KitchenMeter/queryList',
    data,
    method: 'post'
  })
}

// 增加厨房电表 水表 addKitchenMeter
export const addKitchenMeter = ( data ) => {
  return axios.request({
    url: '/api/KitchenMeter/add',
    data,
    method: 'post'
  })
}

// 增加厨房电表 水表 addKitchenMeter
export const deleteKitchenMeter = ( data ) => {
  return axios.request({
    url: '/api/KitchenMeter/delete',
    data,
    method: 'post'
  })
}









