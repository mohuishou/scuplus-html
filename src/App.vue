<template>
  <div style="height: 100%;">
  <view-box v-ref:view-box>

    <!-- header -->
    <div class="header" slot="header">
      <x-header :left-options="test"  :title="title"></x-header>
    </div>


    <!-- router -->
    <router-view ></router-view>

    <!-- 底部 -->
      <tabbar v-if="tabbarShow"  id="tabbar" icon-class="vux-center"  slot="bottom">
      <!--use v-link-->
      <tabbar-item selected link="/">
        <img slot="icon" src="assets/img/class-selected.png">
        <span slot="label">选课助手</span>
      </tabbar-item>
      <!--use http link-->
      <tabbar-item link="/search">
        <img slot="icon" src="assets/img/search.png">
        <span slot="label">搜索</span>
      </tabbar-item>
      <!--use vue-router link-->
      <tabbar-item link="/evaluate">
        <img slot="icon" src="assets/img/eva.png">
        <span slot="label">课程评价</span>
      </tabbar-item>
      <!--use vue-router object link-->
      <tabbar-item link="/user">
        <img slot="icon" src="assets/img/user.png">
        <span slot="label">个人中心</span>
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
 * 需要登陆之后的token才能使用的
 */
const needTokens={
  exam:'考表',
  search:'搜索',
  grade:"成绩",
  schedule:"课程表",
  "bind-jwc":"绑定教务处",
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
  data (){
    return {
      test:{
        showBack:false,
        tabbarShow:true
      },
      title:'scuplus'
    }
  },
  computed: {
    tabbarShow(){
      let path=(this.$route.path.split("/"))[1];
      if(path in needTabbar){
          return false;
        }else{
          return true;
        }
    },
    title () {
        let path=(this.$route.path.split("/"))[1];

        if(path in needTokens){
          let token=storage.get("token");
          common.isLogin(token,true);
        }
        

        if(path in titles){
          return titles[path];
        }
        return titles.default;
    }
  }
}
</script>

<style>
@import '~vux/dist/vux.css';
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
</style>