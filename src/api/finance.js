import axios from '@/libs/api.request'

// 新家店铺
export const setKitchen = (data) => {
  data.opinion_type = '1'
  return axios.request({
    url: '/api/StoreLease/add',
    data,
    method: 'post'
  })
}
// 起租完成
export const setStartStore = (id) => {
  const data = { store_id: id }
  return axios.request({
    url: '/api/StoreLease/start',
    data,
    method: 'post'
  })
}

// 归档 /api/StoreLease/archive
export const setFileStore = (id) => {
  const data = { store_id: id }
  return axios.request({
    url: '/api/StoreLease/archive',
    data,
    method: 'post'
  })
}


// 获取厨房支出
export const getKitchenExpendList = ( obj ) => {
  return axios.request({
    url: '/api/KitchenExpend/index',
    params: obj,
    method: 'get'
  })
}

// 编辑厨房每月支出
export const addKitchenExpend = ( data ) => {
  return axios.request({
    url: '/api/KitchenExpend/add',
    data,
    method: 'post'
  })
}


// 编辑厨房每月支出
export const editKitchenExpend = ( data ) => {
  return axios.request({
    url: '/api/KitchenExpend/edit',
    data,
    method: 'post'
  })
}

// Expend/show
export const showKitchenExpend = ( id ) => {
  const data = { id: id }
  return axios.request({
    url: '/api/KitchenExpend/show',
    data,
    method: 'post'
  })
}

// /api/KitchenRent/delete
export const deleteKitchenExpend = ( id ) => {
  const data = { id: id }
  return axios.request({
    url: '/api/KitchenExpend/delete',
    data,
    method: 'post'
  })
}

//财务允许起租
export const confirmShopStart = ( id ) => {
  const data = { store_id : id }
  return axios.request({
    url: '/api/StoreLease/confirm',
    data,
    method: 'post'
  })
}

//厨房确认起租
export const startShopStart = ( id ) => {
  const data = { store_id : id }
  return axios.request({
    url: '/api/StoreLease/start',
    data,
    method: 'post'
  })
}



