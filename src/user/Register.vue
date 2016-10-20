<template>
  <div id="register">

    <tab>
      <tab-item :selected="registerType==2" @click="registerType = 2">手机号注册</tab-item>
      <tab-item :selected="registerType==1" @click="registerType = 1">邮箱注册</tab-item>
    </tab>

    <group class="register-input">
      <x-input @change="changeUsername" title="用户名" type="username" placeholder="请输入用户名" ></x-input>
      <x-input title="密　码" type="password" :value.sync="password" :show-clear=true placeholder="请输入密码"></x-input>
      <x-input title="手机号" v-show="registerType==2" @change="changePhone" is-type="china-mobile" :show-clear=true v-ref:phone placeholder="请输入手机号"></x-input>

      <x-input title="邮　箱" v-show="registerType==1" @change="changeEmail"  is-type="email" :show-clear=true v-ref:email placeholder="请输入邮箱"></x-input>

      <!-- 验证码 -->
      <x-input title="验证码" :value.sync="verifyCode" :show-clear=false type="number" placeholder="请输入验证码">
        <x-button slot="right"  v-show="countShow"  type="disabled">
          发送中
          <countdown :time="time" @on-finish="verifyFinish"></countdown>
        </x-button>
        <x-button  @click="sendVerify" slot="right" v-show="!countShow" type="primary">发送验证码</x-button>
      </x-input>

    </group>
    <x-button :text="btnText" @click="register" :disabled="isDisabled"  plain></x-button>
    <div class="attention">
        <a href="/#!/login" class="left">已有账号？立即登录！</a>
        <a href="/#!/forgot" class="right">忘记密码？</a>
    </div>
  </div>
  <toast :time="1500" :show.sync="toastShow" type="warn">{{ toast }}</toast>

</template>

<script>
import XInput from 'vux/src/components/x-input'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import Toast from 'vux/src/components/toast'
import Countdown from 'vux/src/components/countdown'
import { Tab,TabItem } from 'vux/src/components/tab'
import {update_title} from '../vuex/actions'
import common from "../js/common"
let param={};

export default {
  components: {
    XInput,
    Group,
    XButton,
    Tab,
    TabItem,Toast,Countdown
  },
  vuex: {
      actions:{
          update_title
      }
  },
  data (){
    return {
      btnText:"注册",
      isDisabled:false,
      registerType:2,
      toast:'toast',
      toastShow:false,
      countShow:false,
      password:'',
      verifyCode:'',
      time
    }
  },
  methods :{
    //注册
    register:function(){
      let _this=this;

      param.verifyCode=this.verifyCode;
      param.password=this.password;
      let a=["username","password","verifyCode"];

      for(let i =0;i<a.length;i++){
        if(!(a[i] in param)){
          _this.toast="参数错误！";
          _this.toastShow=true;
          return;
        }
      }

      let url="http://api.scuplus.cn/register/"+this.registerType;

      $.post(url,param,function(r,e){

        if(e){
          _this.toast="注册失败";
          _this.toastShow=true;
          return;
        }

        if(r.status==1){
          _this.toast="注册成功";
          _this.toastShow=true;
          setTimeout(function() {
            location.href="/#!/bind-jwc";
          },1500);
        }

      });
    },
    //验证码发送倒计时
    verifyFinish:function(){
      this.countShow=false;
      this.time=120;
    },
    //发送验证码
    sendVerify:function(){
      //检测邮箱或者手机号状态
      if(!param.phone&&!param.email){
        this.toast="请输入正确的手机号或邮箱地址"
        this.toastShow=true;
        return;
      }
      let _this=this;
      let url="http://api.scuplus.cn/verify/send/"+this.registerType;

      $.post(url,param,function(r){
        console.log(r);
        if(r.status!=1){
              _this.toast=r.data.msg
              _this.toastShow=true;
          }
      });
      //开启倒计时
      this.countShow=!this.countShow;
    },

    //检测用户名
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

    //检测手机号
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

    //检测邮箱地址是否符合
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
  },
  ready(){
    //设置标题
    this.update_title("注册");

    let _this=this;

    //提取来源地址
    let reg=`/#!/.+`;
    let path=this.$route.path;
    let backUrl=path.match(reg);
    if(backUrl!=null){
        backUrl=backUrl[0];
    }else{
        backUrl="/#!/"
    }
    this.backUrl=backUrl;

    //登录检测，若已登录跳转回源地址
    common.isLoginNoJump(function(e,r){
        if(e==null){
            _this.$vux.toast.show({
                "type":"success",
                text:r
            });
            setTimeout(function() {
              location.href=backUrl;
            },1500);
        }
    });

  }
}
</script>

<style>
  #register{
    /*margin-top:30px;*/
  }
  .register-input{
    margin-bottom: 10px;
  }

</style>
