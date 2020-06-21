import { login, getCode, getInfo, setgetuserInfo } from '@/api/user'
import { getList } from '@/api/table'
import {
  getToken,
  setToken,
  removeToken,
  getUID,
  setUID,
  removeUID } from '@/utils/auth'
import { resetRouter } from '@/router'
import { MD5 } from '@/utils/md5'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    uid: getUID()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  setgetuserInfo({ commit },getdata) {
    return new Promise((resolve, reject) => {
      setgetuserInfo(getdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err =>{
        reject(err)
      })
    })
  },
  getList({ commit },data) {
    return new Promise((resolve, reject) => {
      getList(data).then(response => {
        resolve(response)
      }).catch(err =>{
        reject(err)
      })
    })
  },
  // get yanzhenma
  getCode({ commit }) {
    return new Promise((resolve, reject) => {
      getCode().then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password, idycode, vercode, type } = userInfo
    return new Promise((resolve, reject) => {
      login({ userid: username.trim(), signature: MD5(MD5(password)+idycode), idycode, vercode, type}).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_UID', data.uid)
        setToken(data.token)
        setUID(data.uid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username, icon } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', icon)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeUID() // must remove  uid  second
        resetRouter()
        commit('RESET_STATE')
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

