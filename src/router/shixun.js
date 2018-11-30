
const _import = file => () => import('@/components/shixun/' + file + '.vue')

export const asyncRouterMap = [
  {
    path: '/02',
    redirect: '/shixun/train/teacher'
  },
  { path: '/shixun/train/exam', name: 'exam', component: _import('train/exam'), hidden: true },
  {
    path: '/shixun',
    component: () => import('@/components/layout/Layout'),
    name: 'shixunhome',
    meta: {openId: 84},
    children: [{
      path: 'home',
      component: _import('home/index'),
      meta: {title: '首页', icon: 'home', openId: 84}
    }]
  },
  {
    path: '/shixun/home',
    component: () => import('@/components/layout/Layout'),
    name: 'shixunhomemore',
    meta: {title: '首页'},
    hidden: true,
    children: [
      {path: 'morelist/:id', name: 'shixunhomemoreList', component: _import('home/moreList'), meta: {title: ''}},
      {path: 'moretext/:id', name: 'shixunhomemoreText', component: _import('home/moreText'), meta: {title: '正文'}}
    ]
  },
  {
    path: '/shixun',
    component: () => import('@/components/layout/Layout'),
    name: 'yj',
    meta: {role: ['schoolmaster'], openId: 60},
    children: [
      {
        path: 'yingjian',
        component: _import('yingjian/index'),
        meta: { title: '营建管理', icon: 'yingjian', role: ['schoolmaster', 'schoolmasterA'], openId: 60 }
      }
    ]
  },
  {
    path: '/shixun/yingjian',
    component: () => import('@/components/layout/Layout'),
    name: 'shixunyjmore',
    meta: {title: '营建管理'},
    hidden: true,
    children: [
      {path: 'content/:id', name: 'shixunyjmoreText', component: _import('yingjian/yjContent'), meta: {title: '详情'}}
    ]
  },
  {
    path: '/shixun/train',
    component: () => import('@/components/layout/Layout'),
    name: 'train',
    meta: { title: '培训管理', icon: 'train', openId: 79 },
    children: [
      {
        // path: '/shixun/train/teacher',
        path: 'teacher',
        name: 'teacher',
        component: _import('train/index'),
        // component: _import('subRouter'),
        meta: { title: '教师培训', role: ['schoolmaster', 'schoolmasterA', 'teacher', 'teacherJun', 'teacherMid', 'teacherSen'], openId: 23 },
        // props: {getDateId: 23}
        props: {getDateId: 116}
        // children: [
        //   {path: 'teacherJunior', name: 'teacherJunior', component: _import('train/index'), meta: { title: '初级教师', role: ['schoolmaster', 'schoolmasterA', 'teacherJun'], openId: 116 }, props: {getDateId: 116}},
        //   {path: 'teacherMiddle', name: 'teacherMiddle', component: _import('train/index'), meta: { title: '中级教师', role: ['schoolmaster', 'schoolmasterA', 'teacherMid'], openId: 117 }, props: {getDateId: 117}},
        //   {path: 'teacherSenior', name: 'teacherSenior', component: _import('train/index'), meta: { title: '高级教师', role: ['schoolmaster', 'schoolmasterA', 'teacherSen'], openId: 118 }, props: {getDateId: 118}}
        // ]
      },
      {path: 'teachingSupervisor', name: 'teachingSupervisor', component: _import('train/index'), meta: { title: '教学主管', role: ['schoolmasterA', 'teachingSuper'], openId: 115 }, props: {getDateId: 115}},
      {path: 'market', name: 'market', component: _import('train/index'), meta: { title: '市场培训', role: ['schoolmaster', 'schoolmasterA', 'market'], openId: 47 }, props: {getDateId: 47}},
      {path: 'adviser', name: 'adviser', component: _import('train/index'), meta: { title: '课程顾问培训', role: ['schoolmaster', 'schoolmasterA', 'adviser'], openId: 24 }, props: {getDateId: 24}},
      {path: 'personnel', name: 'personnel', component: _import('train/index'), meta: { title: '人事培训', role: ['schoolmaster', 'schoolmasterA', 'personnel'], openId: 49 }, props: {getDateId: 49}},
      {path: 'educate', name: 'educate', component: _import('train/index'), meta: { title: '教务培训', role: ['schoolmaster', 'schoolmasterA', 'educate'], openId: 48 }, props: {getDateId: 48}},
      {path: 'lesson', name: 'lesson', component: _import('train/lesson'), meta: { title: '课程列表' }, hidden: true},
      {path: 'lesson/lessonDetail/:id', name: 'lessonDetail', component: _import('train/lessonDetail'), meta: { title: '课程详情' }, hidden: true}
    ]
  },
  {
    path: '/shixun/resource',
    component: () => import('@/components/layout/Layout'),
    name: 'resource',
    meta: { title: '资料库', icon: 'resource', openId: 78 },
    children: [
      {
        path: '/shixun/resource/plane',
        name: 'plane',
        component: _import('subRouter'),
        meta: { title: '平面资料', openId: 62 },
        children: [
          {path: 'xuanchuan', name: 'xuanchuan', component: _import('resource/plane'), meta: { title: '宣传页', openId: 63 }, props: {getDateId: 63}},
          {path: 'haibao', name: 'haibao', component: _import('resource/plane'), meta: { title: '海报', openId: 64 }, props: {getDateId: 64}},
          {path: 'lilabao', name: 'lilabao', component: _import('resource/plane'), meta: { title: '易拉宝', openId: 65 }, props: {getDateId: 65}},
          {path: 'other', name: 'other', component: _import('resource/plane'), meta: { title: '其他', openId: 66 }, props: {getDateId: 66}}
        ]
      },
      {
        path: 'video',
        name: 'video',
        component: _import('resource/resource'),
        meta: { title: '视频资料', openId: 67 },
        props: {getDateId: 67}
      },
      {
        path: '/shixun/resource/material',
        name: 'material',
        component: _import('subRouter'),
        meta: { title: '校区物料', openId: 68 },
        children: [
          {path: 'zhuangshi', name: 'zhuangshi', component: _import('resource/resource'), meta: { title: '装饰', openId: 69 }, props: {getDateId: 69}},
          {path: 'gift', name: 'gift', component: _import('resource/resource'), meta: { title: '礼品', openId: 70 }, props: {getDateId: 70}},
          {path: 'other1', name: 'other1', component: _import('resource/plane'), meta: { title: '其他', openId: 71 }, props: {getDateId: 71}}
        ]
      },
      {
        path: '/shixun/resource/official',
        name: 'official',
        component: _import('subRouter'),
        meta: { title: '方案文案', openId: 72 },
        children: [
          {path: 'csyy', name: 'csyy', component: _import('resource/resource'), meta: { title: '市场运营', openId: 73 }, props: {getDateId: 73}},
          {path: 'xxgw', name: 'xxgw', component: _import('resource/resource'), meta: { title: '学习顾问', openId: 74 }, props: {getDateId: 74}},
          {path: 'rsgl', name: 'rsgl', component: _import('resource/resource'), meta: { title: '人事管理', openId: 75 }, props: {getDateId: 75}},
          {path: 'jwjx', name: 'jwjx', component: _import('resource/jwjx'), meta: { title: '教学教务', openId: 76 }, props: {getDateId: 76}},
          {path: 'other2', name: 'other2', component: _import('resource/resource'), meta: { title: '其他', openId: 77 }, props: {getDateId: 77}}
        ]
      }
    ]
  },
  {
    path: '/shixun',
    component: () => import('@/components/layout/Layout'),
    name: 'staff',
    meta: {role: ['schoolmaster', 'schoolmasterA'], openId: 96},
    children: [
      {
        path: 'staff',
        component: _import('staff/index'),
        meta: { title: '员工管理', icon: 'staff', role: ['schoolmaster', 'schoolmasterA'], openId: 96 }
      }
    ]
  }
]
