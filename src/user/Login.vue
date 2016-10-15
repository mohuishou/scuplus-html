<template>

  <div id="login">
    <group class="login-input">
      <x-input title="用户" :value.sync="user"  :show-clear=true @change="userCheck" placeholder="请输入手机号/邮箱"></x-input>
      <x-input title="密码" :value.sync="password" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
    <div class="attention">
        <a href="/#!/register" class="left">没有账号？立即注册！</a>
        <a href="/#!/forgot" class="right">忘记密码？</a>
    </div>

  </div>

</template>

<script>
    import XInput from 'vux/src/components/x-input'
    import Group from 'vux/src/components/group'
    import XButton from 'vux/src/components/x-button'
    import md5 from "md5"
    import storage from "../js/storage"
    import common from "../js/common"
    import {update_title} from '../vuex/actions'
    let param = {};

    export default {
        components: {
            XInput,
            Group,
            XButton,
        },
        vuex: {
            actions:{
                update_title
            }
        },
        data() {
            return {
                btnText: "登录",
                isDisabled: false,
                user: "",
                password: "",
                backUrl:""
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
            login: function() {
                let backUrl=this.backUrl;
                const _this = this;
                let loginType = 1;
                if (!(param.phone || param.email)) {
                    _this.$vux.toast.show({
                        type:"warn",
                        text:"请输入正确的手机号或邮箱地址！"
                    });
                    return false;
                }
                if (param.phone) {
                    loginType = 2;
                }

                let url = "http://api.scuplus.cn/login/" + loginType;
                param.password = md5(this.password);

                this.btnText = "登录中请稍候...";
                this.isDisabled = true;

                common.post("/login/"+ loginType,param,function(e,r){
                    _this.isDisabled = false;
                    _this.btnText = "登录";
                    if(e!=null){
                        _this.$vux.toast.show({
                            type:"warn",
                            text:e
                        });
                        return;
                    }
                    if(r.status==1){
                        storage.set("token",r.data.token);
                        //设置token产生时间
                        storage.set("token_start",new Date().getTime());
                        setTimeout(function() {
                            location.href = backUrl;
                        },1500);
                        _this.$vux.toast.show({
                            type:"success",
                            text:"登录成功！"
                        });
                    }
                });
            }
        },
        ready(){
            //设置标题
            this.update_title("登录");

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
    #login {
        margin-top: 30px;
    }

    .login-input {
        margin-bottom: 10px;
    }

    .attention{
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .attention a{
        color: #333244;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }

</style>
