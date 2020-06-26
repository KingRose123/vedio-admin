import request from '@/utils/request'
import Qs from 'qs'
export function getsubjlist(data) {
  return request({
    url: 'admin/subjlist',
    method: 'post',
    data
  })
}

export function getsetsubjinfo(data) {
  return request({
    url: 'admin/subjinfo',
    method: 'post',
    data
  })
}

export function getsetstypeinfo(data) {
  return request({
    url: 'admin/stypeinfo',
    method: 'post',
    data
  })
}

export function addsubj(data) {
  return request({
    url: 'admin/addsubj',
    method: 'post',
    data
  })
}

export function addtype(data) {
  return request({
    url: 'admin/addtype',
    method: 'post',
    data
  })
}

export function addsec(data) {
  return request({
    url: 'admin/addsec',
    method: 'post',
    data
  })
}

export function stypelist(data) {
  return request({
    url: 'admin/stypelist',
    method: 'post',
    data
  })
}

export function upload(data) {
  const { flag, type, path, base64 } = data
  return request({
    url: 'admin/upload',
    method: 'post',
    headers:{
      flag,
      type,
      path
    },
    data: {data:base64}
  })
}