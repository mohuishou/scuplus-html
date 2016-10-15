<template>
  <div id="user">
    <card >
      <div class="weui_panel_hd panel-title" slot="header">
          <h3>
              用户名<span class="small">，你好！<span>
          </h3>
      </div>
      <div slot="content" class="card-flex card-content01">
        <div class="vux-1px-l vux-1px-r">
          <span>14</span>
          <br/>
          课程
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          考试
        </div>
        <div class="vux-1px-r">
          <span>77.5/2.35</span>
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
      <cell title="成绩/绩点" value="Protected" link="/grade"></cell>
      <cell title="课程表" value="Protected" link="/schedule"></cell>
      <cell title="考试" value="Protected" link="/exam"></cell>
    </group>
    <group title="图书">
      <cell title="当前借阅" value="Protected" link="/component/radio"></cell>
      <cell title="历史借阅" value="Protected" link="/component/radio"></cell>
    </group>
    <group title="个人设置">
      <cell title="手机绑定" value="已绑定" link="/bind-phone"></cell>
      <cell title="邮箱绑定" value="尚未绑定" link="/bind-email"></cell>
      <cell title="教务处绑定" value="已绑定" link="/bind-jwc"></cell>
      <cell title="密码修改" value="" link="/forgot"></cell>
    </group>
    <group>
      <x-button type="warn">退出登录</x-button>
    </group>
  </div>

</template>

<script>
import Group from 'vux/src/components/group'
import Card from 'vux/src/components/card'
import Cell from 'vux/src/components/cell'
import XButton from 'vux/src/components/x-button'
import common from "../js/common"
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
      isDisabled:false
    }
  },
  methods :{
    login:function(){
       const _this = this;
       this.btnText="绑定中请稍候...";
      //  this.isDisabled=true;
    }
  },
  ready(){
    //设置标题
    this.update_title("个人中心");
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
