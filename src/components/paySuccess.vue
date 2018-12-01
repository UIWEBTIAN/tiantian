<template>

  <div>
    <div class="center">
      <div class="el-row">
        <div class="el-col el-col-24">
          <div class="comp">
            <div class="goodsinfo routeanimate">
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
                    <div class="msg-tips">
                      <div class="icon">
                        <i class="iconfont icon-check"></i>
                      </div>
                      <div class="info">
                        <strong>订单已支付成功！</strong>
                        <p>您还有<span class="text">{{ msg }}</span>秒进入
                          <router-link to="/vipCenter">会员中心</router-link>查看订单状态！</p>
                        <p>如有其它问题，请立即与我们客服人员联系。</p>
                      </div>
                    </div>
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
export default {
  name: "paySuccess",
  data: function() {
    return {
        msg:6,
        // 定时器ID
        timeID:0
    };
  },
  created(){
     this.timeID = setInterval(()=> {
          this.msg--;
          if(this.msg == 0){
            //   关闭定时器
            clearInterval(this.timeID);
            // 跳转到会员中心
            this.$router.push('/vipCenter');
          }
      },1000)
  }
};
</script>

<style>
.text {
    font-size: 30px;
    color: red;
}
</style>


