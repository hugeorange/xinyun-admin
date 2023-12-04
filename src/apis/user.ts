import request from '@/utils/request'

// 登录API
export function loginApi(data: { username: string; password: string }) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: data,
  })
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/api/user/logout',
    method: 'post',
  })
}

type Treset = {
  username: string
  old_password: string
  new_password: string
  password_confirm: string
}
export function resetApi(data: Treset) {
  return request({
    url: '/api/user/reset',
    method: 'post',
    data: data,
  })
}

export function userListApi(data) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data: data,
  })
}

export function registerApi(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: data,
  })
}

// 获取登录用户详情
export function getUserInfoApi() {
  return request({
    url: '/api/user/me',
    method: 'post',
  })
}

type TaddRole = {
  role: String
  resource: String
}
// 增加权限
export function addRoleApi(data: TaddRole) {
  return request({
    url: '/api/role-permission/add',
    method: 'post',
    data: data,
  })
}
