<template>

  <div id="forgot">
    <group >
      <x-input title="用户" :value.sync="user"  :show-clear=true @change="userCheck" placeholder="请输入手机号/邮箱"></x-input>
      <!-- 验证码 -->
      <x-input title="验证码" :value.sync="verifyCode" :show-clear=false type="number" placeholder="请输入验证码">
        <x-button slot="right"  v-show="countShow"  type="disabled">
          发送中
          <countdown :time="120" @on-finish="verifyFinish"></countdown>
        </x-button>
        <x-button  @click="sendVerify" slot="right" v-show="!countShow" type="primary">发送验证码</x-button>
      </x-input>
      <x-input title="新密码" :value.sync="password" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="updatePassword" plain></x-button>
    <div class="attention">
        <a href="/#!/register" class="left">没有账号？立即注册！</a>
        <a href="/#!/login" class="right">登录</a>
    </div>
    
  </div>

</template>

<script>
    import XInput from 'vux/src/components/x-input'
    import Group from 'vux/src/components/group'
    import XButton from 'vux/src/components/x-button'
    import Countdown from 'vux/src/components/countdown'
    import md5 from "md5"
    import storage from "./js/storage"
    import common from "./js/common"
    import {update_title} from './vuex/actions'
    let param = {};

    export default {
        components: {
            XInput,
            Group,
            XButton,Countdown
        },
        vuex: {
            actions:{
                update_title
            }
        },
        data() {
            return {
                btnText: "重置密码",
                isDisabled: false,
                user: "",
                password: "",
                backUrl:"",
                countShow:false,
                verifyCode:""
            }
        },
        methods: {
            //用户检测
            userCheck: function() {
                //清空
                param.email = "";
                param.phone = "";
                const reg_email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                const reg_phone = /0?(13|14|15|17|18)[0-9]{9}/;
                let user = this.user;
                let is_email = reg_email.test(user);
                if (is_email) {
                    param.email = user;
                } else {
                    let is_phone = reg_phone.test(user);
                    if (is_phone) {
                        param.phone = user;
                    } else {
                        _this.$vux.toast.show({
                            type:"warn",
                            text:"请输入正确的手机号或邮箱地址！"
                        });
                    }
                }
            },
            //验证码发送倒计时
            verifyFinish:function(){
              this.countShow=false;
            },
            //发送验证码
            sendVerify:function(){
              //检测邮箱或者手机号状态
              let type=1;
              if(param.phone){
                type=2;
              }else if(param.email){
                type=1;
              }else{
                this.$vux.toast.show({
                    text:"请输入正确的手机号或邮箱地址",
                    type:"warn"
                });
                return;
              }
              param.check=1;

              let _this=this;
              let url="http://api.scuplus.cn/verify/send/"+type;

              $.post(url,param,function(r){
                console.log(r);
                if(r.status!=1){
                    _this.$vux.toast.show({
                        text:r.data.msg,
                        type:"warn"
                    });
                    
                  }
              });
              //开启倒计时
              this.countShow=!this.countShow;
            },
            updatePassword: function() {
                const _this = this;
                if (!(param.phone || param.email)) {
                    _this.$vux.toast.show({
                        type:"warn",
                        text:"请输入正确的手机号或邮箱地址！"
                    });
                    return false;
                }
                if(!this.verifyCode){
                    _this.$vux.toast.show({
                        type:"warn",
                        text:"请输入验证码！"
                    });
                    return false;
                }

                param.verifyCode=this.verifyCode;
                param.password = md5(this.password);

                this.btnText = "请稍候...";
                this.isDisabled = true;

                common.post("/user/password",param,function(e,r){
                    _this.isDisabled = false;
                    _this.btnText = "重置密码";
                    if(e!=null){
                        _this.$vux.toast.show({
                            type:"warn",
                            text:e
                        });
                        return;
                    }
                    if(r.status==1){
                        storage.set("token","");
                        //设置token产生时间
                        storage.set("token_start","");
                        setTimeout(function() {
                            location.href = "/#!/login";
                        },1500);
                        _this.$vux.toast.show({
                            type:"success",
                            text:"重置成功！请登录"
                        });
                    }
                });
            }
        },
        ready(){
            //设置标题
            this.update_title("重置密码");
        }

    }
</script>
<style>

    
</style>