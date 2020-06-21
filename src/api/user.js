import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/login',
    method: 'post',
    data
  })
}

export function getCode() {
  return request({
    url: 'admin/getcode',
    method: 'post',
    data: {
      version: 1
    }
  })
}
// 获取/设置用户信息
export function setgetuserInfo(data) {
  return request({
    url: 'admin/userinfo',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'user/info',
    method: 'post',
    data: {
      flag: 0
    }
  })
}

export function logout() {
  return request({
    url: 'admin/logout',
    method: 'post'
  })
}
