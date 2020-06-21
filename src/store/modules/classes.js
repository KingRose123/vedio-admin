import { getless } from '@/api/classes'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    uid: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {

  // get yanzhenma
  getless({ commit }) {
    return new Promise((resolve, reject) => {
      getless().then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
