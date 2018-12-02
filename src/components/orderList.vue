<template>
  <div class="right-auto orderList">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr
              v-for="(item) in orderMessage"
              :key="item.id"
            >
              <td>{{ item.order_no }}</td>
              <td align="left">{{ item.accept_name }}</td>
              <td align="left">
                <strong style="color: red;">￥{{ item.order_amount }}</strong>
                <br> 在线支付
              </td>
              <td align="left">{{ item.add_time | shortTime }} </td>
              <td align="left">
                {{item.statusName}}
              </td>
              <td align="left">
                <router-link :to="'/vipCenter/orderDetail/' + item.id">
                  查看订单
                </router-link>

                <router-link
                  v-show="item.status == 1"
                  :to="'/payMoney/'+item.id"
                >
                  |去付款
                </router-link>

                <a href="javascript:void(0)">|取消</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageIndexChange"
            :current-page="pageIndex"
            :page-sizes="[10,15,20,30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data: function() {
    return {
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      //   订单信息
      orderMessage: [],
      // 订单信息总条数
      totalCount: 0
    };
  },
  methods: {
    //   初始化数据
    initData() {
      // 发起请求
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(result => {
          //   console.log(result);
          // 订单信息
          this.orderMessage = result.data.message;
          // 订单信息总条数
          this.totalCount = result.data.totalcount;
          //    console.log(this.totalCount);
        });
    },
    //   每页条数
    pageSizeChange(value) {
    //   console.log(value);
    //   保存数据
    this.pageSize = value
    // 充值到第一页,方便用户查看
    this.pageIndex = 1;
    //  调用接口
    this.initData()
    },
    //   当前页
    pageIndexChange(value) {
    //   console.log(value);
    // 保存数据
    this.pageIndex = value;
    // 调用接口
    this.initData()
    }
  },
  created() {
    //   初始化数据
      this.initData()
  }
};
</script>

<style>
td a {
  display: block;
}
td:nth-child(2) {
    height: 85px;
}
/* td:nth-child(2) {
    line-height: 60px;
} */
</style>


