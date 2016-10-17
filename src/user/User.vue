<template>
  <div id="user">
    <card >
      <div class="weui_panel_hd panel-title" slot="header">
          <h3>
              {{user.username}}<span class="small">，你好！<span>
          </h3>
      </div>
      <div slot="content" class="card-flex card-content01">
        <div class="vux-1px-l vux-1px-r">
          <span>{{schedule}}</span>
          <br/>
          课程
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          考试
        </div>
        <div class="vux-1px-r">
          <span>{{grade}}</span>
          <br/>
          成绩/绩点
        </div>
        <div>
          <span>5</span>
          <br/>
          图书
        </div>
      </div>
    </card>
    <group title="教务">
      <cell title="成绩/绩点" :value="grade" link="/grade"></cell>
      <cell title="课程表" :value="schedule" link="/schedule"></cell>
      <cell title="考试" value="Protected" link="/exam"></cell>
    </group>
    <group title="图书">
      <cell title="当前借阅" value="Protected" link="/component/radio"></cell>
      <cell title="历史借阅" value="Protected" link="/component/radio"></cell>
    </group>
    <group title="个人设置">
      <cell title="手机绑定" :value="user.phone ? user.phone:'未绑定'" link="/bind"></cell>
      <cell title="邮箱绑定" :value="user.email ? user.email:'未绑定'" link="/bind"></cell>
      <cell title="教务处绑定" :value="user.sid ? user.sid:'未绑定'" link="/bind-jwc"></cell>
      <cell title="密码修改" value="" link="/forgot"></cell>
    </group>
    <group>
      <x-button @click="logout" type="warn">退出登录</x-button>
    </group>
  </div>

</template>

<script>
import Group from 'vux/src/components/group'
import Card from 'vux/src/components/card'
import Cell from 'vux/src/components/cell'
import XButton from 'vux/src/components/x-button'
import common from "../js/common"
import init from "../js/init"
import {
  update_title
} from '../vuex/actions'
export default {
  components: {
    Card,Cell,Group,XButton
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data (){
    return {
      btnText:"提交",
      isDisabled:false,
      user:{},
      grade:"",
      schedule:""
    }
  },
  methods :{
    login:function(){
       const _this = this;
       this.btnText="绑定中请稍候...";
      //  this.isDisabled=true;
    },
    logout:function(){

    }
  },
  ready(){
    //设置标题
    this.update_title("个人中心");
    let _this=this;

    //获取用户课程表
    init.schedule(function (e,r) {
      if(e!=null){
        console.log(e);
        return;
      }
      _this.schedule=r.length;
    });

    //获取用户成绩，并计算用户总成绩
    init.grade(function(e,r){
      if(e!=null){
        console.log(e);
        return;
      }
      let all={
        gpa:0,
        grade:0
      };
      for (let i = 0; i < r.length; i++) {
        all.gpa+=parseFloat(r[i].avg.all.gpa);
        all.grade+=parseFloat(r[i].avg.all.grade);
      }
      console.log(all);
      _this.grade=(all.gpa/r.length).toFixed(2)+"/"+(all.grade/r.length).toFixed(2);
      console.log(r);
    });

    //获取用户信息
    init.userInfo(function(e,r){
      if(e!=null){
        console.log(e);
        return;
      }
      _this.user=r;
    });
  }
}
</script>
<style scoped lang="less">
  @import '../assets/css/1px.less';
  #user{
    .small{
      font-size: 13px;
      color: #555555;
      font-weight: normal;
    }
    .card-flex {
      display: flex;
    }
    .card-content01 {
      padding: 10px 0;
    }
    .card-padding {
      padding: 15px;
    }
    .panel-title{
      color:#333224;
    }
    .card-flex > div {
      flex: 1;
      text-align: center;
      font-size: 14px;
    }
    .card-flex span {
      color: #f74c31;
    }
    .weui_cells p{
      font-size: 14px;
    }
  }


</style>
