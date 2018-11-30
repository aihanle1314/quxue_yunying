
import Home from '@/components/org/home'
import Class from '@/components/org/class'
import Creat from '@/components/org/creat'
import Schedule from '@/components/org/schedule'
import ScheduleInfo from '@/components/org/scheduleInfo'
import Student from '@/components/org/student'

export const waijiaoRouterMap = [
  {
    path: '/01',
    redirect: '/waijiao/home'
  },
  {
    path: '/waijiao',
    component: () => import('@/components/layout/Layout'),
    name: 'wjhome',
    meta: {openId: 79},
    children: [{
      path: 'home',
      component: Home,
      meta: {title: '首页', icon: 'home', openId: 79}
    }]
  },
  {
    path: '/waijiao',
    component: () => import('@/components/layout/Layout'),
    name: 'wjclass',
    meta: {openId: 79},
    children: [{
      path: 'class',
      component: Class,
      meta: {title: '班级', icon: 'banji', openId: 79}
    }]
  },
  {
    path: '/waijiao',
    component: () => import('@/components/layout/Layout'),
    name: 'wjshcedule',
    meta: {openId: 79},
    children: [{
      path: 'schedule',
      component: Schedule,
      meta: {title: '课表', icon: 'kebiao', openId: 79}
    }]
  },
  {
    path: '/waijiao',
    component: () => import('@/components/layout/Layout'),
    name: 'wjmore',
    hidden: true,
    children: [
      {path: 'scheduleInfo', component: ScheduleInfo, hidden: true},
      {path: 'create', component: Creat, hidden: true}
    ]
  },
  {
    path: '/waijiao',
    component: () => import('@/components/layout/Layout'),
    name: 'wjstudent',
    children: [{
      path: 'student',
      component: Student,
      meta: {title: '学生', icon: 'student'}
    }]
  }
]
