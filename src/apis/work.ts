import request from '@/utils/request'

// 获取机台列表
// {
// 	"page_index":1,
// 	"page_size":10,
// 	"remark":"第二申请",
// 	"start_time":"2023-11-19 21:31:17",
// 	"end_time": "2023-11-19 21:31:17",
// 	"reservation_group_id":1
// }

export function getWorkOrdersApi(data) {
  return request({
    url: '/api/work-order/list',
    method: 'post',
    params: data,
  })
}

export function getWorkStartApi(data) {
  return request({
    url: '/api/work-order/start',
    method: 'post',
    params: data,
  })
}

export function getWorkSuspendApi(data) {
  return request({
    url: '/api/work-order/suspend',
    method: 'post',
    params: data,
  })
}
