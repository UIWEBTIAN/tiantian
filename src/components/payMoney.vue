<template>
  <div>
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="javascript:;">支付中心</a>
        </div>
      </div>

      <div class="section">
        <div class="wrapper">
          <div class="bg-wrap">
            <div class="nav-tit pay">
              <a
                href="javascript:;"
                class="selected"
              >支付中心</a>
            </div>
            <div class="form-box payment">
              <div class="el-row">
                <div class="el-col el-col-18">
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>订 单 号：</dt>
                        <dd>{{ orderMessage.order_no }}</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>收货人姓名：</dt>
                        <dd>{{ orderMessage.accept_name }}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>送货地址：</dt>
                        <dd>{{ orderMessage.area + orderMessage.address }}
                        </dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>手机号码：</dt>
                        <dd>{{ orderMessage.mobile }}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付金额：</dt>
                        <dd>{{ orderMessage.order_amount }} 元</dd>
                      </dl>
                    </div>
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>支付方式：</dt>
                        <dd>在线支付</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="el-row">
                    <div class="el-col el-col-12">
                      <dl class="form-group">
                        <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                        <dd>{{ orderMessage.message }}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-6">
                  <div id="container2">
                    <qrcode
                      :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderid"
                      :options="{ size: 400 }"
                    ></qrcode>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 导入二维码
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  name: "payMoney",
  data: function() {
    return {
      // 订单id
      orderid: "",
      // 订单详情信息
      orderMessage: [],
      // 定时器ID
      timeID:0
    };
  },
  //   生命周期函数
  created() {
    // console.log(this.$route.params.orderid);
    // 订单id
    this.orderid = this.$route.params.orderid;
    // 发起请求
    this.$axios
      .get(`site/validate/order/getorder/${this.orderid}`)
      .then(result => {
        console.log(result);
        // 订单详情信息
        this.orderMessage = result.data.message[0];
        // console.log(this.orderMessage);
      });
    // 开启定时器,监听状态是否改变,改变了就代表支付成功,跳转页面
    this.timeID = setInterval(() => {
      // 发起请求
      this.$axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(result => {
          if (result.data.message[0].status === 2) {
            this.$Message.success("支付成功");
            // 跳转到成功页面
            this.$router.push("/paySuccess");
            // 关闭定时器
            // clearInterval(this.timeID);
          }
        });
    }, 2000);
  },
  // 生命周期函数,被销毁之后触发
  destroyed(){
    // 关闭定时器
    clearInterval(this.timeID);
  },
  // 局部注册
  components: {
    // js中对象的属性名 不能使用js语法编写 (早期的时候)
    // es6中支持动态生成属性名
    [VueQrcode.name]: VueQrcode
  }
};
</script>

<style>
</style>


