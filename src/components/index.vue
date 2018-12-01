<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item) in categoryList" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <span v-for="(it) in item.subcates" :key="it.id">
                                                {{ it.title }}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box" v-for="(it) in categoryList" :key="it.id">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ it.title }}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="(it) in item.subcates" :key="it.id">{{ it.title }}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel indicator-position="outside">
                                <el-carousel-item v-for="item in sliderList" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in topList" :key="item.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{ item.title }}</a>
                                    <span>{{ item.add_time | shortTime }}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item) in footList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{ item.catetitle }}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(it) in item.level2catelist" :key="it.subcateid">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(it) in item.datas" :key="it.level1cateid">
                            <router-link :to="'/detail/'+ it.artID" >
                                <div class="img-box">
                                    <img :src="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{ it.artTitle }}</h3>
                                    <p class="price">
                                        <b>{{ it.sell_price }}</b>元</p>
                                    <p>
                                        <strong>库存 {{ it.stock_quantity }}</strong>
                                        <span>市场价：
                                            <s>{{ it.market_price }}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>




<script>
    
    // 暴露出去
    export default {
        name:"index",
        data:function(){
            return {
                // 分类数据数组
                categoryList:[],
                //  轮播图数组
                sliderList:[],
                // 置顶推荐数组
                topList:[],
                // 底部数据
                footList:[]
            }
           
            

        },
        // 生命周期函数
        created() {
            // 顶部数据
            this.$axios.get("site/goods/gettopdata/goods").then(data=>{
                // console.log(data);         
                this.topList = data.data.message.toplist;
                this.categoryList = data.data.message.catelist;
                this.sliderList = data.data.message.sliderlist;
            });

            // 底部数据
            this.$axios.get("site/goods/getgoodsgroup").then(data => {
                // console.log(data);
                
                this.footList = data.data.message
            })
        },
    };
</script>

<style>
    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
    .el-carousel {
        height: 341px;
        overflow: hidden;
    }
    .el-carousel__container {
        height: 341px;
        
    }
</style>

