import Vue from 'vue'
import App from './App.vue'

// 导入 css 样式
import './assets/site/css/style.css'

// 导入路由
import VueRouter from 'vue-router';
// 如果实在模块化的开发环境下 
Vue.use(VueRouter);

// 导入 index 组件
import index from './components/index.vue'

// 为 false 控制台没有任何打印
Vue.config.productionTip = false

// 写路由规则
let routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},
]

// 实例化 VueRouter
let router = new VueRouter({
  routes
})

// 创建 Vue 实例
new Vue({
  // 指定渲染的内容
  // 把 App.vue 渲染出来了
  // render: h => h(App),
  render: function(createElement) {
    return createElement(App);
  },
  router
}).$mount('#app') // 挂载到 #app 这个dom元素上
