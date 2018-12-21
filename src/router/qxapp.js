
import Class from '@/components/qxapp/class/index'
import ClassMore from '@/components/qxapp/class/moreInfo'
import ClassScore from '@/components/qxapp/class/score'
import ClassStdScore from '@/components/qxapp/class/stdScore'
import ClassTestScore from '@/components/qxapp/class/testScore'
import Teacher from '@/components/qxapp/teacher/index'
import Student from '@/components/qxapp/Student/index'

export const qxappRouterMap = [
  {
    path: '/01',
    redirect: 'qxapp/class'
  },
  {
    path: '/qxapp',
    component: () => import('@/components/layout/Layout'),
    name: 'qxappcla',
    meta: {openId: 79},
    children: [
      {
        path: 'class',
        name: 'qxappclass',
        component: Class,
        meta: {title: '班级', icon: 'banji', openId: 79}
      }
    ]
  },
  {
    path: '/qxapp/class',
    component: () => import('@/components/layout/Layout'),
    name: 'qxappclassm',
    meta: {title: '班级'},
    hidden: true,
    children: [
      {path: 'classmore', name: 'qxappclassmore', component: ClassMore, meta: {title: '班级详情'}},
      {path: 'classmorescore', name: 'qxappclassmorescore', component: ClassScore, meta: {title: '班级成绩报告'}},
      {path: 'classmorestdscore', name: 'qxappclassmorestdscore', component: ClassStdScore, meta: {title: '学生成绩报告'}},
      {path: 'classmoretestscore', name: 'qxappclassmoretestscore', component: ClassTestScore, meta: {title: '学生测试报告'}}
    ]
  },
  {
    path: '/qxapp',
    component: () => import('@/components/layout/Layout'),
    meta: {openId: 79},
    children: [{
      path: 'teacher',
      name: 'qxappteacher',
      component: Teacher,
      meta: {title: '教师', icon: 'teacher', openId: 79}
    }]
  },
  {
    path: '/qxapp',
    component: () => import('@/components/layout/Layout'),
    meta: {openId: 79},
    children: [{
      path: 'student',
      name: 'qxappstudent',
      component: Student,
      meta: {title: '学生', icon: 'student', openId: 79}
    }]
  }
]
