import axios from '@/libs/api.request'

//获取带看列表
export const getClueList = ( obj ) => {
  return axios.request({
    url: '/api/Clue/index',
    params: obj,
    method: 'get'
  })
}
// /api/Clue/queryCustomer 查询客户信息地址
export const queryCustomer = ( data ) => {
  return axios.request({
    url: '/api/Clue/queryCustomer',
    data,
    method: 'post'
  })
}

// /api/Clue/add 增加一条
export const addNewClue = ( data ) => {
  return axios.request({
    url: '/api/Clue/add',
    data,
    method: 'post'
  })
}

// /api/Clue/edit 编辑一条带看
export const editOldClue = ( data ) => {
  return axios.request({
    url: '/api/Clue/edit',
    data,
    method: 'post'
  })
}