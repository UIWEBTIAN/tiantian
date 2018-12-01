<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div
              id="orderForm"
              name="orderForm"
              url=""
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item
                  label="收货人姓名"
                  prop="accept_name"
                >
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>

                <el-form-item
                  label="所属地区"
                  prop="area"
                >
                  <VDistpicker
                    @selected="selectedArea"
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></VDistpicker>
                </el-form-item>
                <el-form-item
                  label="详细地址"
                  prop="address"
                >
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item
                  label="收货人手机号"
                  prop="mobile"
                >
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮箱地址"
                  prop="email"
                >
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮编"
                  prop="post_code"
                >
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio
                        v-model="ruleForm.payment_id"
                        label="1"
                      >在线支付</el-radio>
                      <em>手续费：0.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      &nbsp;&nbsp;<el-radio
                        @change="ruleForm.expressMoment=20"
                        v-model="ruleForm.express_id"
                        label="1"
                      >顺丰快递</el-radio>&nbsp;&nbsp;
                      <em>费用：20.00元</em>
                      &nbsp;&nbsp;<el-radio
                        @change="ruleForm.expressMoment=10"
                        v-model="ruleForm.express_id"
                        label="2"
                      >韵达快递</el-radio>&nbsp;&nbsp;
                      <em>费用：10.00元</em>
                      &nbsp;&nbsp;<el-radio
                        @change="ruleForm.expressMoment=8"
                        v-model="ruleForm.express_id"
                        label="3"
                      >中通快递</el-radio>&nbsp;&nbsp;
                      <em>费用：8.00元</em>
                      <span class="Validform_checktip"></span>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th
                        colspan="2"
                        align="left"
                      >商品信息</th>
                      <th
                        width="84"
                        align="left"
                      >单价</th>
                      <th
                        width="84"
                        align="center"
                      >购买数量</th>
                      <th
                        width="104"
                        align="left"
                      >金额(元)</th>
                    </tr>
                    <tr
                      v-for="(item) in goodsList"
                      :key="item.id"
                    >
                      <td width="68">
                        <router-link :to="'/detail/'+item.id">
                          <img
                            :src="item.img_url"
                            class="img"
                          >
                        </router-link>
                      </td>
                      <td>
                        <a
                          target="_blank"
                          href="/goods/show-89.html"
                        >{{ item.title }}</a>
                      </td>
                      <td>
                        <span class="red">
                          ￥{{ item.sell_price }}
                        </span>
                      </td>
                      <td align="center">{{ item.buycount }}</td>
                      <td>
                        <span class="red">
                          ￥{{ item.buycount * item.sell_price }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea
                          v-model="ruleForm.message"
                          name="message"
                          class="input"
                          style="height:35px;"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{ buyCount }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{buyPrice }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label
                        id="expressFee"
                        class="price"
                      >{{ ruleForm.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label
                        id="totalAmount"
                        class="price"
                      >{{buyPrice + ruleForm.expressMoment }}</label>
                    </p>
                    <p class="btn-box">
                      <router-link
                        to="/buyCar"
                        class="btn button"
                      >返回购物车</router-link>
                      <a
                        @click="submit('ruleForm')"
                        id="btnSubmit"
                        class="btn submit"
                      >确认提交</a>
                    </p>
                  </div>
                </div>

              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 导入省市联动
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  data: function() {
    // 自定义校验规则 函数 会被element-ui内部调用
    var validateMobile = (rule, value, callback) => {
      console.log(rule);

      //    console.log(value)
      // 空值判断
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 用正则判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的手机号！"));
        }
      }
    };
    // 自定义校验规则 函数 会被element-ui内部调用
    var validateEmail = (rule, value, callback) => {
      //  console.log(value)
      // 空值判断
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 用正则判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮箱地址！"));
        }
      }
    };
    // 自定义校验规则 函数 会被element-ui内部调用
    var validatePostCode = (rule, value, callback) => {
      //  console.log(value)
      // 空值判断
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        // 用正则判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮编！"));
        }
      }
    };
    return {
      ids: "",
      // 商品内容
      goodsList: [],

      // 购买数量
      buyCount: 0,

      // 购买总额
      buyPrice: 0,

      // element-ui的数据
      ruleForm: {
        //   收货人姓名
        accept_name: "一颗牙疼",
        // 地址
        address: "广东省东莞市黄江镇松山湖",
        // 收货人手机号
        mobile: "15625568840",
        // 邮箱地址
        email: "840047144@qq.com",
        // 邮编
        post_code: "523766",
        // 所属地区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        // 支付方式
        payment_id: "1",
        // 运送方式
        express_id: "2",
        // 快递费
        expressMoment: 20,
        // 订单备注信息
        message: ""
      },

      // 验证规则
      rules: {
        //   收货人姓名
        accept_name: [
          // required 必须  message 提示信息  trigger 触发时机
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          // min 最短  max 最长   message 提示信息   trigger 触发时机
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "change"
          }
        ],
        //   地址
        address: [
          // required 必须  message 提示信息  trigger 触发时机
          { required: true, message: "请输入收货人地址", trigger: "change" },
          // min 最短  max 最长   message 提示信息   trigger 触发时机
          {
            min: 2,
            message: "你地址只有这么短",
            trigger: "change"
          }
        ],
        // 手机号的验证规则
        mobile: [{ validator: validateMobile, trigger: "change" }],
        // 邮箱的验证规则
        email: [{ validator: validateEmail, trigger: "change" }],
        // 邮箱的验证规则
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    // 省市联动
    selectedArea(newArea) {
      console.log(newArea);
      this.ruleForm.area = newArea;
    },
    // 提交订单
    submit(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
                  // 商品id
      this.ruleForm.goodsids = this.ids;
      // 商品总额
      this.ruleForm.goodsAmount = this.buyPrice;
      // {id:个数,id2:个数}
      let obj = {};
      this.goodsList.forEach(value => {
        // console.log(value);
        obj[value.id] = value.buycount
      })
      // 商品对象
      this.ruleForm.cargoodsobj = obj;
      // console.log(this.ruleForm);
      

      // 提交订单
      this.$axios.post('site/validate/order/setorder',this.ruleForm).then(result => {
        console.log(result);
        if(result.data.status == 0){
          this.$Message.success('订单提交成功');
          // 跳转到支付页面
          this.$router.push('/payMoney/'+result.data.message.orderid);
          // 删除购物车里面的商品
          this.goodsList.forEach(value => {
            // console.log(value.id);
            
            this.$store.commit('deleteGoodsById',value.id)
          })
        }else {

          this.$Message.warning("数据不完整,请检查");
          return false;
        }
        
      })
          } else {
            this.$Message.warning("数据不完整,请填写完整")
            return false;
          }
        });

    }
  },

  created() {
    
    
    // console.log(this.ruleForm.expressMoment);

    //   console.log(this.$route);
    this.ids = this.$route.params.selectedIds;
    //   console.log(this.ids);
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(result => {
        // console.log(result);
        // 商品内容
        this.goodsList = result.data.message;

        result.data.message.forEach(value => {
          // 商品数量
          value.buycount = this.$store.state.cartData[value.id];

          // 累加总个数
          this.buyCount += value.buycount;
          console.log(this.buyCount);

          // 总额
          this.buyPrice += value.buycount * value.sell_price;
        });
        console.log(this.goodsList);
      });
  },
  // 注册组件
  components: { VDistpicker }
};
</script>

<style>
</style>

