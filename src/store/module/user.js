import {
  login,
  logout,
  getUserInfo
} from '@/api/user'
import { setToken, getToken, setUsername, setSessionAccess } from '@/libs/util'

export default {
  state: {
    userName: '',
    fullName: '',
    userId: '',
    token: '',
    access: [],
    hasGetInfo: false,
    storeInfo:{}
    // expend_params: ''
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      setUsername(username)
    },
    setUserId (state, id) {
      state.userId = id
    },
    setStoreInfo (state, storeInfo) {
      state.storeInfo = storeInfo
    },
    setKitchenId (state, kitchen_id) {
      state.kitchenId = kitchen_id
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    sethasGetInfo (state, isGetInfo) {
      state.hasGetInfo = isGetInfo
    },
    // setExpendParams (state, expend_params) {
    //   state.expend_params = '';
    //   state.expend_params = expend_params ;
    // },
  },
  getters: {
    
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password, captcha}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          captcha
        }).then(res => {
          const dbody = res.data
          if (dbody.code == 0) {
            const data = dbody.data
            const info = data.info
            // 存储用户token
            commit('setToken', data.token)
            // 存储用户厨房ID
            commit('setKitchenId', info.kitchen_id)
            // 存储信息成功开关
            commit('sethasGetInfo', true)
            // 存储用户名字
            commit('setUsername', info.fullname)
            // 存储用户ID
            commit('setUserId', info.id)
          }
          resolve(dbody)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    setUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          let token = getToken() || state.token
          if (token) {
            getUserInfo(token).then(res => {
              const dbody = res.data
              const data = dbody.data
              if (dbody.code != 0) {
                commit('setUsername', '')
                commit('setToken', '')
                commit('setAccess', [])
                commit('sethasGetInfo', false)
                resolve(data)
                return
              }
              let arr = []
              data.access.forEach(function (element, index) {
                arr.push(element.id*1)
              })
              commit('setAccess', arr)
              commit('sethasGetInfo', true)
              resolve(dbody)
            }).catch(err => {
              reject(err)
            })
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setUsername', '')
          commit('setToken', '')
          commit('setAccess', [])
          commit('sethasGetInfo', false)
          resolve()
        }).catch(err => {
          reject(err)
        })
        resolve()
      })
    }
  }
}
