export const schooladminRouterMap = [
  {
    path: '/schooladmin',
    component: () => import('@/components/layout/Layout'),
    name: 'account',
    meta: {role: ['schoolmaster', 'schoolmasterA'], openId: 97},
    children: [{
      path: 'account',
      component: () => import('@/components/schooladmin/account/index'),
      meta: {title: '账户管理', icon: 'account'}
    }]
  }
]
