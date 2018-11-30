import request from '../qxapprequest'
import scorerequest from '../qxappScorerequest'
import store from '../../store'
import Qs from 'qs'

// 获取班级列表
export function GetClass (name, type, stime, etime, page) {
  let uid = store.getters.userId
  return request({
    url: '/Class/classlist',
    method: 'post',
    params: {uid, name, type, start_time: stime, end_time: etime, page}
  })
}
// 获取班级详情
export function GetClassMore (cid) {
  let uid = store.getters.userId
  return request({
    url: '/Class/classdetails',
    method: 'get',
    params: {uid, c_id: cid}
  })
}

// 获取教师列表
export function GetTeachers () {
  let uid = store.getters.userId
  return request({
    url: 'TeacherUser/teacheruserlist',
    method: 'get',
    params: {uid}
  })
}
// 获取教师授课班级
export function GetTeacherClass (id) {
  let uid = store.getters.userId
  return request({
    url: '/TeacherUser/teacheruserinclass',
    method: 'get',
    params: {uid, t_id: id}
  })
}

// 获取学生列表
export function GetStudents (name, page) {
  let uid = store.getters.userId
  return request({
    url: '/StudentUser/studentuserlist',
    method: 'get',
    params: {uid, name, page}
  })
}
// 获取学生所在班级
export function GetStudentClass (id) {
  let uid = store.getters.userId
  return request({
    url: 'StudentUser/studentuserinclass',
    method: 'get',
    params: {uid, s_id: id}
  })
}
// -------------------------成绩接口-------------------------
// 获取作业列表
export function GetHomework (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = 1005
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getClassHomeworkList',
    method: 'post',
    data: param
  })
}
// 获取课程列表
export function GetLesson (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = 1005
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getLessonList',
    method: 'post',
    data: param
  })
}
// 获取班级平时成绩
export function GetCourseScore (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = 1005
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getCourseScoreInfo',
    method: 'post',
    data: param
  })
}
// 获取班级作业成绩
export function GetClassCourseScore (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = 1005
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getClassCourseScoreInfo',
    method: 'post',
    data: param
  })
}
// 获取学生平时成绩
export function GetStuCourseScore (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = '1005'
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getUserCourseScoreInfo',
    method: 'post',
    data: param
  })
}
// 获取学生作业成绩
export function GetStuClassCourseScore (param) {
  param['sid'] = 'ea4554ec574b4a339ced38a7d3303039'
  param['appid'] = '1005'
  param = Qs.stringify(param)
  return scorerequest({
    url: '/quxue/getClassUserCourseScoreInfo',
    method: 'post',
    data: param
  })
}
