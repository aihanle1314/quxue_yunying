import request from '../shixunRequest'
import store from '../../store'

/* -------------获取用户信息api------------- */
// 获取用户成绩
export function getScore () {
  let uid = store.getters.userId
  return request({
    url: '/teacher/api/user/getUserInfo',
    method: 'post',
    params: {uid: uid}
  })
}
// 更新用户成绩
export function updateScore (param) {
  param['uid'] = store.getters.userId
  return request({
    url: '/teacher/api/score/updateSocre',
    method: 'post',
    data: param
  })
}
// 更新用户解锁信息
export function updateTrainUnlock (param) {
  param['uid'] = store.getters.userId
  return request({
    url: '/teacher/api/user/updateInfo',
    method: 'post',
    data: param
  })
}
// 更新用户学习信息
export function updateLearn (param) {
  param['uid'] = store.getters.userId
  return request({
    url: '/teacher/api/train/updateLearn',
    method: 'post',
    data: param
  })
}
// 用户列表
export function getStaff () {
  let uid = store.getters.userId
  return request({
    url: '/teacher/api/user/getUserStudy',
    method: 'post',
    data: {uid}
  })
}

/* -------------获取内容api--------------- */
export function getHomeInfo () {
  return request({
    url: '/teacher/api/home/getHomeList',
    method: 'get',
    param: {}
  })
}
export function getHomeMoreList (cid) {
  return request({
    url: '/teacher/api/home/getNewsList/cid/' + cid,
    method: 'get',
    param: {}
  })
}
export function getHomeMoreText (id) {
  return request({
    url: '/teacher/api/home/getDetail/id/' + id,
    method: 'get',
    param: {}
  })
}
export function getYingjian () {
  return request({
    url: '/teacher/api/build/getBuildList',
    method: 'get',
    param: {}
  })
}
export function getYingjianMore (id) {
  return request({
    url: '/teacher/api/build/getDetail/id/' + id,
    method: 'get',
    param: {}
  })
}
export function getTrain (pid) {
  return request({
    url: '/teacher/api/category/getCateList/pid/' + pid,
    method: 'get',
    param: {}
  })
}
export function getLession (cid) {
  return request({
    url: '/teacher/api/train/getTrainList/cid/' + cid,
    method: 'get',
    param: {}
  })
}
export function getLessDetail (id) {
  return request({
    url: '/teacher/api/train/getDetail/id/' + id,
    method: 'get',
    param: {}
  })
}
export function getExam (id) {
  return request({
    url: '/teacher/api/exam/getExamList/sid/' + id,
    method: 'get',
    param: {}
  })
}
export function getResource (id, type, page) {
  return request({
    url: '/teacher/api/databank/getDatabankList/?id=' + id + '&type=' + type + '&page=' + page,
    method: 'get',
    param: {}
  })
}
export function getJwjx (id) {
  return request({
    url: '/teacher/api/databank/getCateList/id/' + id,
    method: 'get',
    param: {}
  })
}
export function getJwjxPage (subid, page) {
  return request({
    url: '/teacher/api/databank/getDataList/subid/' + subid + '/page/' + page,
    method: 'get',
    param: {}
  })
}
export function getNavOpen () {
  return request({
    url: '/teacher/api/category/getMenuList/',
    method: 'get',
    param: {}
  })
}
