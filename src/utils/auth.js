import Cookies from 'js-cookie'

const TokenKey = 'yue_admin_token'
const UidKey = 'yue_admin_uid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUID() {
  return Cookies.get(UidKey)
}

export function setUID(uid) {
  return Cookies.set(UidKey, uid)
}

export function removeUID() {
  return Cookies.remove(UidKey)
}
