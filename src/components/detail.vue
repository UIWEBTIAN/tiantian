<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length !=0" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goodsInfoList.title }}</h1>
                                <p class="subtitle">{{ goodsInfoList.sub_title }}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goodsInfoList.goods_no }}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goodsInfoList.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goodsInfoList.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsInfoList.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{ goodsInfoList.stock_quantity }}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">

                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="{selected:commodityIndex==0}" @click="commodityIndex=0">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="{selected:commodityIndex==1}" @click="commodityIndex=1">商品评论</a>
                                        </li>
                                    </ul>

                                </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsInfoList.content" v-show="commodityIndex==0">

                            </div>
                            <div class="tab-content" v-show="commodityIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="content" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitContent" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{ item.user_name }}</span>
                                                    <span>{{ item.add_time }}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalcount" @on-change="pageChange" :current.sync="current"></Page>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotgoodList" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+ item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+ item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>

<script>
/* eslint-disable */


// 导入 moment.js
import moment from "moment";

// 暴露出去
export default {
  name: "detail",
  data: function() {
    return {
      // 商品Id
      artID: "",
      // 热销产品
      hotgoodList: [],
      // 详情信息
      goodsInfoList: {},
      // 图片
      imgList: [],
      //   购买数量
      buyCount: 1,
      // 商品索引
      commodityIndex: 0,
      //   页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 评论内容
      comments: [],
      // 总评论数
      totalcount: 0,
      //   评论内容
      content: "",
      // 高亮页码
      current: 1,
      images: {
        // required
        normal_size: [],
      },
      // 放大镜的设置
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    //   初始化数据
    initData() {
      this.artID = this.$route.params.artId;
      this.$axios
        .get(
          `site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          //   console.log(result);
          //   热卖商品
          this.hotgoodList = result.data.message.hotgoodslist;
          //   商品详情
          this.goodsInfoList = result.data.message.goodsinfo;
          //   图片列表
          this.imgList = result.data.message.imglist;
        //   设置给放大镜的数据即可
        this.images.normal_size = [];
        // 循环添加数据
        this.imgList.forEach(value =>{
            this.images.normal_size.push({
                id:value.id,
                url:value.original_path
            })
        })
        });
      // 获取评论数据的方法
      this.getComents();
    },
    // 获取评论信息
    getComents() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          console.log(result);
          //   评论内容
          this.comments = result.data.message;
          //   总个数
          this.totalcount = result.data.totalcount;
        });
    },
    // 页码改变
    pageChange(pageIndex) {
      // console.log(pageIndex);
      //   值改变的页码
      this.pageIndex = pageIndex;
      //   重新获取评论
      this.getComents();
    },
    // 提交评论
    submitContent() {
      if (this.content == "") {
        this.$Message.warning("内容不能为空");
      } else {
        this.$axios
          .post(
            `site/validate/comment/post/goods/${
              this.artID
            }`,
            {
              commenttxt: this.content
            }
          )
          .then(result => {
            // console.log(result);
            if (result.data.status == 0) {
              // 成功提示
              this.$Message.success(result.data.message);
              // 清空评论
              this.content = "";
              // 页码
              this.pageIndex = 1;
              this.current = 1;
              // 重新获取评论
              this.getComents();
            }
          });
      }
    },
    // 加入购物车
    addToCar(){
        
        // 提交载荷
        this.$store.commit('addToCart',{
            // 获取商品id
            goodId:this.artID,
            // 获取购买数量
            goodNum:this.buyCount
        })

        // 提示用户
        this.$notify({
          title: '成功',
          message: '商品加入成功',
          type: 'success',
          duration:1000
        });

    }
  },
  // 生命周期函数
  created() {
    // console.log(this.$route.params);
    this.initData();
  },
  // 侦听器
  watch: {
    $route(newVal, oldVal) {
      // console.log('数据变了');
    //   this.buyCount = 1;
      //   高亮页码
      this.current = 1;
      //   页码内容
      this.pageIndex = 1;

    // 设置 图片数组为空 让放大镜组件 重新生成
      this.images.normal_size = [];

      

      // 重新获取数据即可
      // 初始化数据
      this.initData();
      this.buyCount = 1;

    }
  },
};
</script>

<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
.ivu-back-top span {
  font-size: 100px;
  display: block;
  transform: rotateZ(-45deg);
}
.inline-zoomer-zoomer-box{
    width: 395px;
    /* height: 320px; */
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
</style>

