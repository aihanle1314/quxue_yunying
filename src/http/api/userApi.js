import request from '../request'
import store from '../../store'
import Qs from 'qs'

// 用户登录
export function login (param) {
  param = Qs.stringify(param)
  return request({
    url: '/Account/login',
    method: 'post',
    data: param
  })
}
// 用户权限
export function getRoles () {
  let uid = store.getters.userId
  return request({
    url: '/Account/accountinfo',
    method: 'get',
    params: {uid}
  })
}
// 修改密码
export function changePass (param) {
  param['uid'] = store.getters.userId
  param = Qs.stringify(param)
  return request({
    url: '/Account/modifyaccountpwd',
    method: 'post',
    data: param
  })
}
// 账户列表
export function getAccount () {
  let uid = store.getters.userId
  return request({
    url: '/Account/accountlist',
    method: 'get',
    params: {uid}
  })
}
// 添加/修改账户
export function updateAccount (account) {
  account['uid'] = store.getters.userId
  var pid = ''
  var temp = account['project']
  for (var i = 0; i < temp.length; i++) {
    if (i === temp.length - 1) {
      pid += temp[i]
    } else {
      pid += temp[i] + ','
    }
  }
  account['project'] = pid
  account = Qs.stringify(account)
  return request({
    url: '/Account/addaccount',
    method: 'post',
    data: account
  })
}
// 删除账户
export function delAccount (id) {
  let uid = store.getters.userId
  return request({
    url: '/Account/delaccount',
    method: 'get',
    params: {uid, id}
  })
}
