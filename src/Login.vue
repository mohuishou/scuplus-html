<template>

  <div id="login">
    <group class="login-input">
      <x-input title="用户" :value.sync="user"  :show-clear=true @change="userCheck" placeholder="请输入手机号/邮箱"></x-input>
      <x-input title="密码" :value.sync="password" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
    <a class="forgot">忘记密码？</a>
  </div>
<toast :time="1500" :show.sync="toastShow" :type="toastType">{{ toast }}</toast>

</template>

<script>
    import XInput from 'vux/src/components/x-input'
    import Group from 'vux/src/components/group'
    import XButton from 'vux/src/components/x-button'
    import Toast from 'vux/src/components/toast'
    import md5 from "md5"
    let param={};

    /**
     * 刷新token
     * @return {[type]} [description]
     */
    function refreshToken(){
      let token=$.fn.cookie("token");
      if(!token){
        console.warn("没有获取到token，请重新登录！");
        return false;
      }
      let url="http://api.scuplus.cn/token/refresh";
      $.ajax({
        url: url,
        type: 'POST',
        data: {token:token},
        success:function(r){
          console.log(r);
          if(r.status==1){
              _this.toastType="success";
              $.fn.cookie('tooken',r.data.token);
          }
        },
        error:function(x,t,e) {
          console.warn(x);
        }
      });

    }


    export default {
        components: {
            XInput,
            Group,
            XButton,
            Toast
        },
        data() {
            return {
                btnText: "登录",
                isDisabled: false,
                user: "",
                toast:'toast',
                toastShow:false,
                password:"",
                toastType:"warn"
            }
        },
        methods: {
            userCheck: function() {
              const reg_email=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
              const reg_phone=/0?(13|14|15|17|18)[0-9]{9}/;
              let user = this.user;
              let is_email=reg_email.test(user);

              if(is_email){
                param.email=user;
              }else{
                let is_phone=reg_phone.test(user);
                if(is_phone){
                  param.phone=user;
                }else{
                  this.toast="请输入正确的手机号或邮箱地址！";
                  this.toastShow=true;
                }
              }
            },
            login: function() {

                const _this = this;
                let loginType=1;
                if(!(param.phone || param.email)){
                  this.toast="请输入正确的手机号或邮箱地址！";
                  this.toastShow=true;
                  return false;
                }
                if(param.phone){
                  loginType=2;
                }

                let url="http://api.scuplus.cn/login/"+loginType;
                param.password= md5(this.password);

                this.btnText = "登录中请稍候...";
                this.isDisabled=true;
                $.ajax({
                  url: url,
                  type: 'POST',
                  data: param,
                  success:function(r){
                    console.log(r);
                    if(r.status==1){
                        _this.toastType="success";
                        $.fn.cookie('tooken',r.data.token);
                        setInterval(refreshToken,65*1000*60*2);//不到两小时刷新一次
                    }
                    _this.toast=r.msg;
                    _this.toastShow=true;
                  },
                  error:function(x,t,e) {
                    _this.toast="服务器错误！";
                    if(x.status==422){
                      _this.toast="参数错误！";
                    }
                    _this.toastShow=true;
                  },
                  complete:function(){
                    _this.isDisabled=false;
                    _this.btnText= "登录";
                  }
                });
                              
            }
        }
    }
</script>
<style>
    #login {
        margin-top: 30px;
    }
    
    .login-input {
        margin-bottom: 10px;
    }
    
    .forgot {
        display: block;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: right;
    }
</style>