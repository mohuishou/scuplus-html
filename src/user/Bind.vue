<!-- 手机号/邮箱绑定 -->
<template>
<div id="bind" style="margin: 0 auto;">
  <br />
  <div>
    <div style="width:95%;margin: 0 auto;">
      <step :current.sync="step" background-color='#fbf9fe' gutter="20px">
        <step-item title="验证"></step-item>
        <step-item title="绑定"></step-item>
        <step-item title="完成"></step-item>
      </step>
    </div>
    <!-- 第一步验证账号所有权 -->
    <div class="step1">
      <group v-show="step==0">
        <selector placeholder="请选择验证方式" :value.sync="verifyType" title="验证方式" :options="list"></selector>
        <!-- 验证码 -->
        <x-input title="验证码" :value.sync="verify.code" :show-clear=false type="number" placeholder="请输入验证码">
          <x-button slot="right" v-show="verify.countShow" type="disabled">
            发送中
            <countdown :time="120" @on-finish="verifyFinish(1)"></countdown>
          </x-button>
          <x-button @click="sendVerify(1)" slot="right" v-show="!verify.countShow" type="primary">发送验证码</x-button>
        </x-input>
      </group>
      <br />
      <x-button v-show="step==0" type="primary" @click="bindCheck">提交</x-button>

    </div>
    <!-- 第二部提交账号绑定 -->
    <div class="step2">
      <group v-show="step==1">
        <selector placeholder="请选择绑定方式" :value.sync="verifyType" title="绑定方式" :options="list"></selector>
        <x-input title="手机号" v-show="verifyType==2" @change="changePhone" is-type="china-mobile" :show-clear=true v-ref:phone placeholder="请输入手机号"></x-input>
        <x-input title="邮　箱" v-show="verifyType==1" @change="changeEmail" is-type="email" :show-clear=true v-ref:email placeholder="请输入邮箱"></x-input>

        <!-- 验证码 -->
        <x-input title="验证码" :value.sync="bindVerify.code" :show-clear=false type="number" placeholder="请输入验证码">
          <x-button slot="right" v-show="bindVerify.countShow" type="disabled">
            发送中
            <countdown :time="120" @on-finish="verifyFinish(2)"></countdown>
          </x-button>
          <x-button @click="sendVerify(2)" slot="right" v-show="!bindVerify.countShow" type="primary">发送验证码</x-button>
        </x-input>
      </group>
      <br />
      <x-button v-show="step==1" type="primary" @click="bind">提交</x-button>
    </div>
  </div>
</div>
</template>

<script>
import {
  Step,
  StepItem
} from 'vux/src/components/step'
import Countdown from 'vux/src/components/countdown'
import XInput from 'vux/src/components/x-input'
import XButton from 'vux/src/components/x-button'
import Divider from 'vux/src/components/divider'
import Group from 'vux/src/components/group'
import Selector from 'vux/src/components/selector'
import {
  update_title
} from '../vuex/actions'
import common from "../js/common"
import init from "../js/init"
let list = [{
  key: '1',
  value: "邮箱"
}, {
  key: '2',
  value: "手机"
}];
let param = {};
export default {
  components: {
    Step,
    StepItem,
    XButton,
    Divider,
    XInput,
    Countdown,
    Group,
    Selector
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      step: 0,
      list: list,
      verify: {
        code: "",
        countShow: false
      },
      bindVerify: {
        code: "",
        countShow: false
      },
      verifyType: "1",
      bindType: "",
      user: {}
    }
  },
  methods: {
    verifyFinish(type) {
      if (type == 1) {
        this.verify.countShow = false;
      } else {
        this.bindVerify.countShow = false;
      }
    },
    sendVerify(type) {
      let data = {};
      let countShow;
      if (type == 1) {
        data.email = this.user.email;
        data.phone = this.user.phone;
        data.check = 1;
      } else {
        data = param;
      }
      if (this.verifyType == 2) {
        if (!data.phone) {
          this.$vux.toast.show({
            "type": "warn",
            "text": "该用户尚未绑定手机号，请更换验证方式"
          });
          return;
        }
      } else {
        if (!data.email) {
          this.$vux.toast.show({
            "type": "warn",
            "text": "该用户尚未绑定邮箱，请更换验证方式"
          });
          return;
        }
      }
      let _this = this;
      common.post("/verify/send/" + this.verifyType, data, function(e, r) {
        if (e != null) {
          _this.$vux.toast.show({
            "type": "warn",
            text: e
          });
          return;
        };
        if (type == 1) {
          _this.verify.countShow = true;
        } else {
          _this.bindVerify.countShow = true;
        }
      });
    },
    bindCheck: function() {
      let data = {};
      let _this = this;
      if (!this.verify.code) {
        this.$vux.toast.show({
          type: "warn",
          text: "验证码不能为空！"
        });
        return;
      }
      data.verifyCode = this.verify.code;
      common.post("/user/bind/check", data, function(e, r) {
        if (e != null) {
          _this.$vux.toast.show({
            "type": "warn",
            text: e
          });
          return;
        }
        _this.step++;
      });
    },
    bind: function() {
      let data = {};
      data = param;
      let _this = this;
      if (!this.bindVerify.code) {
        this.$vux.toast.show({
          type: "warn",
          text: "验证码不能为空！"
        });
        return;
      }
      data.verifyCode = this.bindVerify.code;
      common.post("/user/bind/" + this.verifyType, data, function(e, r) {
        if (e != null) {
          _this.$vux.toast.show({
            "type": "warn",
            text: e
          });
          if (r.status == 24085) {
            _this.step = 0;
          }
          return;
        }
        if (r.status == 1) {
          _this.$vux.toast.show({
            "type": "success",
            text: r.msg
          });
          //更新缓存信息
          init.userInfo(function(e, r) {
            if (e != null) {
              console.log(e);
              return;
            }
          }, true);
          //跳转到个人中心
          setTimeout(function() {
            location.href = "/#!/user";
          }, 1500);
          _this.step++;
        }
      });
    },
    //检测手机号
    changePhone: function(v) {
      if (!this.$refs.phone.valid) {
        this.$vux.toast.show({
          type: "warn",
          text: "请输入正确的手机号"
        });
        return;
      }
      let _this = this;
      let phone = v.path[0].value;

      $.post('http://api.scuplus.cn/user/check', {
        'param': 'phone',
        'value': phone
      }, function(r) {
        if (r.status == 1) {
          if (r.data.user == 1) {
            _this.$vux.toast.show({
              type: "warn",
              text: "手机号已被注册！"
            });
          } else {
            param.phone = phone;
          }
        }
      });
    },

    //检测邮箱地址是否符合
    changeEmail: function(v) {
      if (!this.$refs.email.valid) {
        this.$vux.toast.show({
          type: "warn",
          text: "请输入正确的邮箱"
        });
        return;
      }
      let _this = this;
      let email = v.path[0].value;

      $.post('http://api.scuplus.cn/user/check', {
        'param': 'email',
        'value': email
      }, function(r) {
        if (r.status == 1) {
          if (r.data.user == 1) {
            _this.$vux.toast.show({
              type: "warn",
              text: "邮箱已被注册！"
            });
          } else {
            param.email = email;
          }
        }
      });
    }
  },
  ready() {
    this.update_title("绑定");
    let _this = this;
    //获取用户信息
    init.userInfo(function(e, r) {
      if (e != null) {
        console.log(e);
        return;
      }
      _this.user = r;
    });
  }
}
</script>

<style>
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>
