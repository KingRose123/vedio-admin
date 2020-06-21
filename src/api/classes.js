import request from '@/utils/request'

export function getless(data) {
  return request({
    url: 'admin/login',
    method: 'post',
    data
  })
}
