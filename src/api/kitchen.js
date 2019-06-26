import axios from '@/libs/api.request'

// 权限页面
export const getKitchenList = () => {
  return axios.request({
    url: '/api/Kitchen/index',
    method: 'get'
  })
}
/// api/kitchen/show
export const getKitchenDetail = (id) => {
  return axios.request({
    url: '/api/Kitchen/show?id=' + id,
    method: 'get'
  })
}

/// api/kitchen/getStoreNo 厨房档口列表
export const getKitchenStoreNo = (id) => {
  const obj = { kitchen_id : id }
  return axios.request({
    url: '/api/Kitchen/getStoreNo',
    params: obj,
    method: 'get'
  })
}

// 获取厨房营收数据 /api/kitchen/getKitchenAccount
export const getKitchenAccountData = (data) => {
  return axios.request({
    url: '/api/Kitchen/getKitchenAccount',
    params: data,
    method: 'get'
  })
}
// 发起退租/api/StoreLease/edit
export const quitKitchen = (data) => {
  data.opinion_type = '2'
  return axios.request({
    url: '/api/StoreLease/edit',
    data,
    method: 'post'
  })
}

// 发起退租api/StoreEmployee/index
export const getStoreEmployeeList = ( store_id ) => {
  const data = { store_id : store_id }
  return axios.request({
    url: '/api/StoreEmployee/index',
    params: data,
    method: 'get'
  })
}

// 发起退租api/StoreEmployee/add
export const addStoreEmployee = ( data ) => {
  return axios.request({
    url: '/api/StoreEmployee/add',
    data,
    method: 'post'
  })
}


// 发起退租api/StoreEmployee/add
export const editStoreEmployee = ( data ) => {
  return axios.request({
    url: '/api/StoreEmployee/edit',
    data,
    method: 'post'
  })
}

// StoreEmployee/delete
export const deleteStoreEmployee = ( id ) => {
  const data = { id : id }
  return axios.request({
    url: '/api/StoreEmployee/delete',
    data,
    method: 'post'
  })
}

// api//api/StoreDevice/show
export const showStoreDevice = ( id ) => {
  const data = { store_id : id }
  return axios.request({
    url: '/api/StoreDevice/show',
    data,
    method: 'post'
  })
}

// /api/StoreDevice/edit
export const editStoreDevice = ( data ) => {
  return axios.request({
    url: '/api/StoreDevice/edit',
    data,
    method: 'post'
  })
}

// 获取厨房每月费用地址 /api/Kitchen/getKitchenCharge
export const getKitchenChargeList = ( data ) => {
  return axios.request({
    url: '/api/Kitchen/getKitchenCharge',
    params: data,
    method: 'get'
  })
}

// 更新厨房每月缴费详情地址 /api/Kitchen/editKitchenCharge
export const editKitchenCharge = ( data ) => {
  return axios.request({
    url: '/api/Kitchen/editKitchenCharge',
    data,
    method: 'post'
  })
}

// 添加一个商户缴费单 /api/StoreCharge/add
export const addStoreCharge = ( data ) => {
  return axios.request({
    url: '/api/StoreCharge/add',
    data,
    method: 'post'
  })
}

//获取列表 /api/StoreCharge/index
export const getStoreChargeList = ( data ) => {
  return axios.request({
    url: '/api/StoreCharge/index',
    params: data,
    method: 'get'
  })
}

// /api/StoreCharge/delete  删除一个缴费单
export const deleteStoreCharge = ( data ) => {
  return axios.request({
    url: '/api/StoreCharge/delete',
    data,
    method: 'post'
  })
}

// /api/StoreCharge/work
export const changeStoreWork = ( data ) => {
  return axios.request({
    url: '/api/StoreCharge/work',
    data,
    method: 'post'
  })
}

// 厨房固定账单
export const settleShop = ( id ) => {
  const data = { store_id : id }
  return axios.request({
    url: '/api/StoreLease/settle',
    data,
    method: 'post'
  })
}

// 罚款列表
export const getStoreFineList = ( data ) => {
  return axios.request({
    url: '/api/StoreFine/index',
    data,
    method: 'get'
  })
}

// 增加一项罚款/api/StoreFine/add
export const addStoreFine = ( data ) => {
  return axios.request({
    url: '/api/StoreFine/add',
    data,
    method: 'post'
  })
}

// 获取罚款详情。api/StoreFine/show
export const showStoreFine = ( id ) => {
  const data = { id : id }
  return axios.request({
    url: 'api/StoreFine/show',
    data,
    method: 'post'
  })
}

// 删除一条罚款  /api/StoreFine/delete
export const deleteStoreFine = ( id ) => {
  const data = { id : id }
  return axios.request({
    url: '/api/StoreFine/delete',
    data,
    method: 'post'
  })
}


// 获取抄表列表
export const queryMeterList = ( data ) => {
  return axios.request({
    url: '/api/Meter/queryList',
    params: data,
    method: 'get'
  })
}

// /api/Meter/edit 修改抄表信息
export const editMeter = ( data ) => {
  return axios.request({
    url: '/api/Meter/edit',
    data,
    method: 'post'
  })
}






