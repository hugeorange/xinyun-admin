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

// 获取预订列表
export function getBookListApi(data) {
  return request({
    url: '/api/reservation/list',
    method: 'post',
    data: data,
  })
}

// 获取指定预订详情
export function getBookDetailApi(id: string) {
  return request({
    url: '/api/reservation/detail',
    method: 'post',
    data: { reservation_group_id: id },
  })
}
