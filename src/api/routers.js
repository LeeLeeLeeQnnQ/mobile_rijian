import axios from '@/libs/api.request'

export const getRouterReq = () => {
  return axios.request({
    url: 'get_router',
    params: {
    },
    method: 'get'
  })
}
