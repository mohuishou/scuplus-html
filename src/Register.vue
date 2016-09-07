<template>
  <div id="register">

    <tab>
        <tab-item :selected="registerType==2" @click="registerType = 2">手机号注册</tab-item>
        <tab-item :selected="registerType==1" @click="registerType = 1">邮箱注册</tab-item>
    </tab>

    <group class="register-input">
      <x-input @change="changeUsername" title="用户名" type="username" placeholder="请输入用户名" >
      </x-input>
      <x-input title="密　码" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
      <x-input title="手机号" v-show="registerType==2" @change="changePhone" is-type="china-mobile" :show-clear=true v-ref:phone placeholder="请输入手机号"></x-input>
      <x-input title="邮　箱" v-show="registerType==1" @change="changeEmail"  is-type="email" :show-clear=true v-ref:email placeholder="请输入邮箱"></x-input>
      <x-input title="验证码" type="number" placeholder="请输入验证码">
        <x-button slot="right" type="primary">发送验证码</x-button>
      </x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled"  plain></x-button>
  </div>
  <toast :time="1500" :show.sync="toastShow" type="cancel">{{ toast }}</toast>

</template>

<script>
import XInput from 'vux/src/components/x-input'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
import { Tab,TabItem } from 'vux/src/components/tab'

let param={};

export default {
  components: {
    XInput,
    Group,
    XButton,
    Tab,
    TabItem,Toast
  },
  data (){
    return {
      btnText:"注册",
      isDisabled:false,
      registerType:2,
      toast:'toast',
      toastShow:false
    }
  },
  methods :{
    changeUsername : function (v) {
        let _this=this;
        let username=v.path[0].value;
        $.post('http://api.scuplus.cn/user/check', { 
            'param':'username' ,
            'value':username
        }, function(r){
          if(r.status==1){
            if(r.data.user==1){
                _this.toast="用户名已存在"
                _this.toastShow=true;
            }else{
                param.username=username;
            }
          }
        });
    },
    changePhone:function (v){
        if(!this.$refs.phone.valid){
            this.toast="请输入正确的手机号"
            this.toastShow=true;
            return ;
        }
        let _this=this;
        let phone=v.path[0].value;
        
        $.post('http://api.scuplus.cn/user/check', { 
            'param':'phone' ,
            'value':phone
        }, function(r){
          if(r.status==1){
            if(r.data.user==1){
                _this.toast="手机号已被注册"
                _this.toastShow=true;
            }else{
                param.phone=phone;
            }
          }
        });
    },
    changeEmail:function (v){
        if(!this.$refs.email.valid){
            this.toast="请输入正确的邮箱"
            this.toastShow=true;
            return ;
        }
        let _this=this;
        let email=v.path[0].value;
        
        $.post('http://api.scuplus.cn/user/check', { 
            'param':'email' ,
            'value':email
        }, function(r){
          if(r.status==1){
            if(r.data.user==1){
                _this.toast="邮箱已被注册"
                _this.toastShow=true;
            }else{
                param.email=email;
            }
          }
        });
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
