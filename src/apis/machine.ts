import request from '@/utils/request'

// 获取机台列表
type TgetList = {
  page_index?: number
  page_size?: number
  machine_id?: number
  name?: string
  start_time?: string
  end_time?: string
}
export function getMachineListApi(data?: TgetList) {
  return request({
    url: '/api/machine/list',
    method: 'post',
    data: data,
  })
}

// 新增机台
type TMachine = {
  machine_id?: number
  status: string
  name: string
  remark?: string
}
export function addMachineApi(data: TMachine) {
  return request({
    url: '/api/machine/add',
    method: 'post',
    data: data,
  })
}

export function updateMachineApi(data: TMachine) {
  return request({
    url: '/api/machine/update',
    method: 'post',
    data: data,
  })
}

export function deleteMachineApi(data) {
  return request({
    url: '/api/machine/delete',
    method: 'post',
    data: data,
  })
}
