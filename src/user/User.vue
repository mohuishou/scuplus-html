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
          <span>{{exam}}</span>
          <br/>
          考试
        </div>
        <div class="vux-1px-r">
          <span>{{grade}}</span>
          <br/>
          成绩/绩点
        </div>
        <div>
          <span>{{library.now}}</span>
          <br/>
          图书
        </div>
      </div>
    </card>
    <group title="教务">
      <cell title="成绩/绩点" :value="grade" link="/grade"></cell>
      <cell title="课程表" :value="schedule" link="/schedule"></cell>
      <cell title="考试" :value="exam" link="/exam"></cell>
    </group>
    <group title="图书">
      <cell title="当前借阅" link="/library/now"  :value="library.now " ></cell>
      <cell title="历史借阅" link="/library/history"  value="Protected" ></cell>
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

    <!-- 退出登录确认对话框 -->
    <confirm :show.sync="logoutShow" title="退出登录"  @on-confirm="logoutConfirm" >
      <p  style="text-align:center;">您确认要退出登录么？</p>
    </confirm>
  </div>

</template>

<script>
import Group from 'vux/src/components/group'
import Card from 'vux/src/components/card'
import Cell from 'vux/src/components/cell'
import XButton from 'vux/src/components/x-button'
import Confirm from 'vux/src/components/confirm'
import common from "../js/common"
import init from "../js/init"
import {
  update_title
} from '../vuex/actions'
export default {
  components: {
    Card,Cell,Group,XButton,Confirm
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
      schedule:"",
      logoutShow:false,
      exam:"",
      library:{
        now:"",
        history:""
      }
    }
  },
  methods :{
    login:function(){
       const _this = this;
       this.btnText="绑定中请稍候...";
      //  this.isDisabled=true;
    },
    logout:function(){
      this.logoutShow=true;
    },
    logoutConfirm:function () {
      common.storage.clear();
      this.$vux.toast.show({
        text:"退出登录成功！",
        type:"success"
      });
      setTimeout(function () {
        location.href="/#!/";
      },1500);
    }
  },
  ready(){
    //设置标题
    this.update_title("个人中心");
    let _this=this;

    //获取用户课程表
    init.schedule(function (e,r) {
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.schedule=r.length;
    });

    //获取用户成绩，并计算用户总成绩
    init.grade(function(e,r){
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      let all={
        gpa:0,
        grade:0,
        credit:0
      };

      for (let i = 0; i < r.length; i++) {
        let credit=parseFloat(r[i].sum.all.credit);
        all.credit+=credit;
        all.gpa+=parseFloat(r[i].avg.all.gpa)*credit;
        all.grade+=parseFloat(r[i].avg.all.grade)*credit;
      }
      console.log(all);
      _this.grade=(all.gpa/all.credit).toFixed(2)+"/"+(all.grade/all.credit).toFixed(2);
    });

    //获取用户信息
    init.userInfo(function(e,r){
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.user=r;
    });

    //考试信息获取
    init.exam(function (e,r) {
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.exam=r.length;
    });

    init.libraryNow(function (e,r) {
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.library.now=r.length;
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
