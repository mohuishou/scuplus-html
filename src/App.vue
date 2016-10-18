<template>
  <div style="height: 100%;">
  <view-box v-ref:view-box>

    <!-- header -->
    <div class="header" slot="header">
      <x-header :left-options="test"  :title.sync="title"></x-header>
    </div>


    <!-- router -->
    <router-view></router-view>

    <!-- 底部 -->
      <tabbar v-if="tabbarShow"  id="tabbar" icon-class="vux-center"  slot="bottom">
      <!--use v-link-->
      <tabbar-item link="/">
        <span slot="label">
          <p class="iconfont icon-book"></p>
          选课助手</span>
      </tabbar-item>
      <!--use http link-->
      <tabbar-item link="/search">
        <span slot="label">
          <p class="iconfont icon-magnifier"></p>
          搜索
        </span>
      </tabbar-item>
      <!--use vue-router link-->
      <tabbar-item link="/evaluation">
        <span slot="label">
          <p class="iconfont icon-star"></p>
          课程评价
        </span>
      </tabbar-item>
      <!--use vue-router object link-->
      <tabbar-item link="/user">
        <span slot="label">
          <p class="iconfont icon-user"></p>
          个人中心
        </span>
      </tabbar-item>
    </tabbar>
  </view-box>
  </div>
</template>

<script>
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import XHeader from  'vux/src/components/x-header'
import ViewBox from 'vux/src/components/view-box'
import { Tabbar, TabbarItem } from 'vux/src/components/tabbar'
import common from "./js/common"
import storage from "./js/storage.js"
import store from './vuex/store'
import {title} from './vuex/getters'

/**
 * token检测，刷新
 */
function tokenCheck(){
  console.log("********token检测开启********");
  let token=storage.get("token");
  let token_start=storage.get("token_start");
  let token_refresh=common.storage.get("token_refresh");
  if(!token||!token_start){
    console.log("********token不存在********");
    return;
  }
  let now=new Date().getTime();
  if(((now-token_start)/(1000*60*60))>1.5&&!token_refresh){
    console.log("********token即将过期，刷新中********");
    common.storage.set("token_refresh",1);
    common.get("/token/refresh",null,function(e,r){
      if(e!=null){
          console.log(e);
          return;
        }
        storage.set("token",r.data.token);
        //设置token产生时间
        storage.set("token_start",new Date().getTime());
        common.storage.set("token_refresh",0);
        console.log("********token更新成功********");
      });
    }else{
      console.log("********token尚未失效********");
      common.storage.set("token_refresh",0);
    }
  }




/**
 * 标题
 * @type {Object}
 */
const titles={
  default:'scuplus',
  exam:'考表',
  search:'搜索',
  login:'登录',
  grade:"成绩",
  schedule:"课程表",
  "bind-jwc":"绑定教务处"
};

/**
 * 需要改变底部的tabbar的
 */
const needTabbar={
  grade:"成绩",
  schedule:"课程表"
}
export default {
  components: {
    Group,
    Cell,
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox
  },
  store: store,
  vuex: {
     getters: {
       title
     }
   },
  data (){
    return {
      test:{
        showBack:false,
        tabbarShow:true
      },
    }
  },
  computed: {
    tabbarShow(){
      tokenCheck();
      let path=(this.$route.path.split("/"))[1];
      if(path in needTabbar){
          return false;
        }else{
          return true;
        }
    }
  },
  ready(){
    // console.log('test');
    // let path=(this.$route.path.split("/"))[1];
    // let _this=this;
    // if(path in needTokens){
    //   common.isLogin(function(e,r) {
    //     if(e!=null){
    //       _this.$vux.toast.show({
    //         text:e,
    //         type:"warn"
    //       });
    //     }
    //   });
    // }
  }
}
</script>

<style>
@import '~vux/dist/vux.css';
@import './assets/css/discuss.css';
@import './assets/css/assistant.css';
@import './assets/css/iconfont.css';
#tabbar{

}
.weui_tab_bd {
  padding-top: 46px;
}
.header{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
}
.weui_tabbar_icon{
  display: none;
}
</style>
