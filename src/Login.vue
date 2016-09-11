<template>

  <div id="login">
    <group class="login-input">
      <x-input title="用户" :max="11" :min="11" is-type="china-mobile" :show-clear=true
      v-ref:phone placeholder="请输入手机号/邮箱"></x-input>
      <x-input title="密码" type="password"  :show-clear=true placeholder="请输入密码"></x-input>
    </group>
    <x-button :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
    <a class="forgot">忘记密码？</a>
  </div>

</template>

<script>
    import XInput from 'vux/src/components/x-input'
    import Group from 'vux/src/components/group'
    import XButton from 'vux/src/components/x-button'

    export default {
        components: {
            XInput,
            Group,
            XButton
        },
        data() {
            return {
                btnText: "登录",
                isDisabled: false
            }
        },
        methods: {
            login: function() {
                const _this = this;
                this.btnText = "登录中请稍候...";
                //  this.isDisabled=true;
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