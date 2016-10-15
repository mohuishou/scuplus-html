<template>
  <div id="bind-jwc">
    <group class="bind-jwc-input">
      <x-input title="学号" :value.sync="param.sid"  :show-clear=true  placeholder="请输入学号"></x-input>
      <x-input title="密码" type="password" :value.sync="param.spassword"  :show-clear=true placeholder="请输入密码"></x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="bind" plain></x-button>

  </div>

</template>

<script>
import XInput from 'vux/src/components/x-input'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import common from "../js/common"
import {update_title} from '../vuex/actions'
export default {
  components: {
    XInput,
    Group,
    XButton
  },
  vuex: {
      actions:{
          update_title
      }
  },
  data (){
    return {
      btnText:"提交",
      isDisabled:false,
      param:{}
    }
  },
  methods :{
    bind:function(){
       const _this = this;

      if(!this.param.sid||!this.param.spassword){
        this.$vux.toast.show({
          text:"请输入学号和密码",
          type:"warn"
        });
        return;
      }

      this.btnText="绑定中请稍候...";
      this.isDisabled=true;

      common.post("/jwc/bind",this.param,function(e,r){
        this.btnText="提交";
        this.isDisabled=false;
        if(e!=null){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
          return;
        }
        if(r.status==1){
          _this.$vux.toast.show({
            text:r.msg,
            type:"success"
          });
          setTimeout(function() {
              location.href ="/#!/user";
          },1500);
        }
      });


    }
  },
  ready(){
    this.update_title("绑定教务处");
    //登录检测
    let _this=this;
    common.isLogin(function(e,r) {
      if(e!=null){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
        }
    });
  }
}
</script>
<style>

</style>
