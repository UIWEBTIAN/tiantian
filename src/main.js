/* eslint-disable */

import Vue from "vue";
import App from "./App.vue";

// 导入 css 样式
import "./assets/site/css/style.css";

// 导入element-ui
import ElementUI from "element-ui";
// 导入 element-css
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 导入路由
// 如果实在模块化的开发环境下
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入 iView 组件库
import iView from "iview";
// 导入 iView CSS样式
import "iview/dist/styles/iview.css";
Vue.use(iView);

// 导入图片放大镜
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入 axios
// 类似于 vue-resources    this.$http
import axios from "axios";
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;
// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 设置带上cookie
axios.defaults.withCredentials = true; //让ajax携带cookie

// 注册全局过滤器  方便使用
// 导入 moment.js
import moment from "moment";
Vue.filter("shortTime", value => {
  // console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format('YYYY😘MM😘DD👍'));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY😘MM😘DD");
});
Vue.filter("detailTime", value => {
  // console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format('YYYY😘MM😘DD👍'));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY😘MM😘DD-h:mm:ss a");
});

// 导入 index 组件
import index from "./components/index.vue";
// 导入 detail 组件
import detail from "./components/detail.vue";
// 导入 buyCar 组件
import buyCar from "./components/buyCar.vue";
// 导入 order 组件
import order from "./components/order.vue";
// 导入 login 组件
import login from "./components/login.vue";
// 导入 payMony 组件
import payMoney from "./components/payMoney.vue";
// 导入 paySuccess 组件
import paySuccess from "./components/paySuccess.vue";
// 导入 vipCenter 组件
import vipCenter from "./components/vipCenter.vue";
// 导入 orderList 组件
import orderList from "./components/orderList.vue";
// 导入 orderDetail 组件
import orderDetail from "./components/orderDetail.vue";
// 导入 orderIndex 组件
import orderIndex from "./components/orderIndex.vue";

// 为 false 控制台没有任何打印
Vue.config.productionTip = false;

// 写路由规则
let routes = [
  { path: "/", redirect: "/index" },
  { path: "/index", component: index },
  { path: "/detail/:artId", component: detail },
  { path: "/buyCar", component: buyCar },
  { path: "/order/:selectedIds",component: order, meta: { requiresAuth: true }},
  { path: "/login", component: login },
  { path: "/payMoney/:orderid",component: payMoney,meta: { requiresAuth: true }},
  { path: "/paySuccess", component: paySuccess, meta: { requiresAuth: true } },
  {
    path: "/vipCenter",
    component: vipCenter,
    meta: { requiresAuth: true },
    // 嵌套路由
    children: [
      {
        path: "",
        redirect: "orderIndex"  ,//重定向
        meta: { requiresAuth: true }, 
      },
      {
        // /vipCenter/orderIndex
        path: "orderIndex",
        component: orderIndex,
        meta: { requiresAuth: true }, 
      },
      {
        // /vipCenter/orderList
        path: "orderList",
        component: orderList,
        meta: { requiresAuth: true,currentName:"交易订单" }, 
      },
      {
        // /vipCenter/orderDetail
        path: "orderDetail/:orderId",
        component: orderDetail,
        meta: { requiresAuth: true,currentNameTwo:"查看订单" }, 
      },
    ]
  }
];

// 实例化 路由 对象
let router = new VueRouter({
  routes
});

// 增加导航守卫,回调函数(每次路由改变的时候,触发)
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // if (to.path.indexOf('/order') != -1) {
  if (to.meta.requiresAuth == true) {
    // 正要去订单页
    // 必须先登录判断
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == "nologin") {
        Vue.prototype.$Message.warning("请先登录");
        router.push("/login");
      } else {
        next();
      }
    });
  }
  next();
});

// vuex的使用
// 导入 vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    cartData: JSON.parse(window.localStorage.getItem("tianTian")) || {},
    isLogin: false
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      // 通过 state 获取内部的数据
      // 计算并返回
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num += state.cartData[key];
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是 上面的 数据 state
    // 测试用方法
    // increment (state,obj) {
    //   console.log('触发了')
    //   console.log(state);
    //   console.log(obj);
    //   // state.count+=n
    //   // state.count+=m;
    // }

    // 往购物车添加数据的方法
    addToCart(state, obj) {
      // console.log(obj);
      // console.log(state);

      // console.log(state.cartData[obj.goodId])
      // console.log(state.cartData[obj.goodId]);

      // 商品已经存在{goodId:90,goodNum:6}
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum;
      } else {
        // 商品不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    },
    updateCartData(state, obj) {
      // console.log(obj);
      // 接收到数据直接赋值 因为 在03.shopCart.vue中 已经把数据处理好了
      state.cartData = obj;
    },

    // 删除数据
    deleteGoodsById(state, id) {
      // 参数1 对象 参数2 删除的属性
      // 必须使用Vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id);
    },
    // 修改登录状态
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});

// 浏览器关闭保存数据
window.onbeforeunload = function() {
  // window.localStorage.clear('tianTian')
  window.localStorage.setItem("tianTian", JSON.stringify(store.state.cartData));
};

// 创建 Vue 实例
new Vue({
  // 指定渲染的内容
  // 把 App.vue 渲染出来了
  // render: h => h(App),
  render: function(createElement) {
    return createElement(App);
  },
  router,
  store,
  created() {
    // console.log('噢噢噢');
    // 调用登录判断接口
    // 根据结果判断是否登录
    axios.get("site/account/islogin").then(result => {
      // console.log(result);
      if (result.data.code == "nologin") {
        // Vue.prototype.$Message.warning('请先登录');
        // router.push('/login')
      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
      }
    });
  }
}).$mount("#app"); // 挂载到 #app 这个dom元素上
