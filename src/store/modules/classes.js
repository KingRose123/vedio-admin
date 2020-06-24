import {
  getsubjlist,
  getsetsubjinfo,
  getsetstypeinfo,
  addsubj,
  addtype,
  addsec,
  stypelist,
  upload
} from '@/api/classes'

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
  upload({ commit },gdata) {
    return new Promise((resolve, reject) => {
      upload(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  addsec({ commit },gdata) {
    return new Promise((resolve, reject) => {
      addsec(gdata).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  addtype({ commit },gdata) {
    return new Promise((resolve, reject) => {
      addtype(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  stypelist({ commit },gdata) {
    return new Promise((resolve, reject) => {
      stypelist(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  addsubj({ commit },gdata) {
    return new Promise((resolve, reject) => {
      addsubj(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  // get yanzhenma
  getsubjlist({ commit },gdata) {
    return new Promise((resolve, reject) => {
      getsubjlist(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  getsetstypeinfo({ commit },gdata) {
    return new Promise((resolve, reject) => {
      getsetstypeinfo(gdata).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      }) // must remove  token  first
    })
  },
  getsetsubjinfo({ commit },gdata) {
    return new Promise((resolve, reject) => {
      getsetsubjinfo(gdata).then(response => {
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
