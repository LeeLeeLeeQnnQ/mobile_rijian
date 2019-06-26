import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 主页面 --- 单页面
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          keepAlive: true,
          icon: '_shouye'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 用户设置 -- 单页面
  {
    path: '/day_inspect',
    name: '_day_inspect',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/day_inspect_list',
        name: 'day_inspect_list',
        meta: {
          icon: '',
          title: '',
          notCache: true,
          keepAlive: true
        },
        component: () => import('@/view/day_inspect/day_inspect_list/main.vue')
      },
      {
        path: '/day_inspect_item',
        name: 'day_inspect_item',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 日检详情 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/day_inspect/day_inspect_item/main.vue')
      },
      {
        path: '/day_inspect_edit',
        name: 'day_inspect_edit',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 日检提交 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/day_inspect/day_inspect_edit/main.vue')
      }
    ]
  },
  {
    path: '/night_inspect',
    name: '_night_inspect',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/night_inspect_list',
        name: 'night_inspect_list',
        meta: {
          icon: '',
          title: '',
          notCache: true,
          keepAlive: true
        },
        component: () => import('@/view/night_inspect/night_inspect_list/main.vue')
      },
      {
        path: '/night_inspect_item',
        name: 'night_inspect_item',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 夜检详情 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/night_inspect/night_inspect_item/main.vue')
      },
      {
        path: '/night_inspect_edit',
        name: 'night_inspect_edit',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 夜检提交 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/night_inspect/night_inspect\_edit/main.vue')
      }
    ]
  },
  {
    path: '/week_inspect',
    name: '_week_inspect',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/week_inspect_list',
        name: 'week_inspect_list',
        meta: {
          icon: '',
          title: '',
          notCache: true,
          keepAlive: true
        },
        component: () => import('@/view/week_inspect/week_inspect_list/main.vue')
      },
      {
        path: '/week_inspect_item',
        name: 'week_inspect_item',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 周检详情 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/week_inspect/week_inspect_item/main.vue')
      },
      {
        path: '/week_inspect_edit',
        name: 'week_inspect_edit',
        meta: {
          icon: '_dianpu-xianxing',
          title: route => `{{ 周检提交 }}`,
          notCache: true,
          keepAlive: false
        },
        component: () => import('@/view/week_inspect/week_inspect_edit/main.vue')
      }
    ]
  },
  // 401
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  // 500
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  // 404
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
