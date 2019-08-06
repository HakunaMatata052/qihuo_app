import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
          path: "",
          name: "home",
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "期货首页",
            isMember: false,
            isLogin: false
          }
        },
        {
          path: "/news",
          name: "news",
          component: () => import("@/views/index/subviews/news.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "资讯",
            isMember: false,
            isLogin: false
          }
        },
        {
          path: "/tradeIcon",
          name: "tradeIcon",
          component: () => import("@/views/index/subviews/tradeIcon.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "持仓",
            isMember: false,
            isLogin: false
          }
        },
        {
          path: "/find",
          name: "find",
          component: () => import("@/views/index/subviews/find.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "发现",
            isMember: false,
            isLogin: false
          }
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "我的",
            isMember: false,
            isLogin: true
          }
        }
      ]
    },
    // 注册登录
    {
      path: "/login/:name?",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "登录",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "注册",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("@/views/login/resetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改密码",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/rechargeRecord",
      name: "rechargeRecord",
      component: () => import("@/views/mine/rechargeRecord.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "充值记录",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/discountRecord",
      name: "discountRecord",
      component: () => import("@/views/mine/discountRecord.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "提现记录",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/amountgive",
      name: "amountgive",
      component: () => import("@/views/mine/amountgive.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "红包记录",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/quotationDetail/:id",
      name: "quotationDetail",
      component: () => import("@/views/quotation/quotationDetail.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "行情详情",
        isMember: false,
        isLogin: false
      }
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/mine/setting/index.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "个人信息",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/setting/bankup",
      name: "bankup",
      component: () => import("@/views/mine/setting/bankup.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "绑定银行卡",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/setting/drawingPassword",
      name: "drawingPassword",
      component: () => import("@/views/mine/setting/drawingPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "修改提款密码",
        isMember: false,
        isLogin: true
      }
    },
    {
      path: "/activities",
      name: "activities",
      component: () => import("@/views/find/activities.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "精彩活动",
        isMember: false,
        isLogin: false
      }
    },

    
    
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      if (from.name == "login") {
        router.push('/')
      } else {
        router.push('/login/' + from.name)
      }
    } else {
      next()
    }
    if (to.meta.isMember) {
      if (!window.localStorage.getItem('token')) {
        router.push('/login/' + from.name)
      } else {
        if (store.state.isMember) {
          next()
        } else {
          router.push('/buymember')
        }
      }
    }
  } else {
    next()
  }
})

router.afterEach(route => {

  // console.log(route)
  // console.log("跳转")
})

export default router;