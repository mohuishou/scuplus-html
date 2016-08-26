<template>
  <div id="register">

    <tab>
        <tab-item :selected="registerType==2" @click="registerType = 2">手机号注册</tab-item>
        <tab-item :selected="registerType==1" @click="registerType = 1">邮箱注册</tab-item>
    </tab>

    <group class="login-input">
      <x-input title="用户名" type="username"  :show-clear=true placeholder="请输入用户名"></x-input>
      <x-input title="密　码" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
      <x-input title="手机号" v-show="registerType==2" :max="11" :min="11" is-type="china-mobile" :show-clear=true
      v-ref:phone placeholder="请输入手机号"></x-input>
      <x-input title="邮　箱" v-show="registerType==1"  is-type="email" :show-clear=true v-ref:phone placeholder="请输入邮箱"></x-input>
      <x-input title="验证码" type="password"  :show-clear=true placeholder="请输入密码">
        <x-button slot="right" type="primary">发送验证码</x-button>
      </x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
  </div>

</template>

<script>
import XInput from 'vux/src/components/x-input'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import { Tab,TabItem } from 'vux/src/components/tab'

export default {
  components: {
    XInput,
    Group,
    XButton,
    Tab,
            TabItem,
  },
  data (){
    return {
      btnText:"注册",
      isDisabled:false,
      registerType:2
    }
  },
  methods :{
    login:function(){
       const _this = this;
       this.btnText="登录中请稍候...";
      //  this.isDisabled=true;
    }
  }
}
</script>
<style>
  #login{
    /*margin-top:30px;*/
  }
  .login-input{
    margin-bottom: 10px;
  }
  .forgot{
    display:block;
    font-size:14px;
    margin-top:5px;
    margin-bottom:5px;
    text-align:right;
  }
</style>
