import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'admin/userlist',
    method: 'post',
    data
  })
}
