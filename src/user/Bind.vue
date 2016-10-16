<!-- 手机号/邮箱绑定 -->
<template>
  <div id="bind" style="margin: 0 auto;">
    <br />
    <div>
      <div style="width:95%;margin: 0 auto;" >
        <step :current.sync="step" background-color='#fbf9fe' gutter="20px">
          <step-item title="验证"></step-item>
          <step-item title="绑定"></step-item>
          <step-item title="完成"></step-item>
        </step>
      </div>
      <!-- 第一步验证账号所有权 -->
      <div class="step1">
        <group v-show="step==0">
          <selector placeholder="请选择验证方式" :value.sync="verifyType" title="验证方式" :options="list" ></selector>
          <!-- 验证码 -->
          <x-input title="验证码" :value.sync="verify.code" :show-clear=false type="number" placeholder="请输入验证码">
            <x-button slot="right"  v-show="verify.countShow"  type="disabled">
              发送中
              <countdown :time="120" @on-finish="verifyFinish(1)"></countdown>
            </x-button>
            <x-button  @click="sendVerify(1)" slot="right" v-show="!verify.countShow" type="primary">发送验证码</x-button>
          </x-input>
        </group>
      </div>
      <!-- 第二部提交账号绑定 -->
      <div class="step2">
        <group v-show="step==1">
        <selector placeholder="请选择验证方式" :value.sync="bindType" title="绑定方式" :options="list" ></selector>

        <!-- 验证码 -->
        <x-input title="验证码" :value.sync="bindVerify.code" :show-clear=false type="number" placeholder="请输入验证码">
          <x-button slot="right"  v-show="bindVerify.countShow"  type="disabled">
            发送中
            <countdown :time="120" @on-finish="verifyFinish(2)"></countdown>
          </x-button>
          <x-button  @click="sendVerify(2)" slot="right" v-show="!bindVerify.countShow" type="primary">发送验证码</x-button>
        </x-input>
      </group>
      </div>

      <div class="btn_wrap">
        <x-button type="primary" @click="nextStep">下一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Step,StepItem }from 'vux/src/components/step'
import Countdown from 'vux/src/components/countdown'
import XInput from 'vux/src/components/x-input'
import XButton from 'vux/src/components/x-button'
import Divider from 'vux/src/components/divider'
import Group from 'vux/src/components/group'
import Selector from 'vux/src/components/selector'
import {update_title} from '../vuex/actions'
import common from "../js/common"
import init from "../js/init"
let list=[{key:'1',value:"邮箱"},{key:'2',value:"手机"}];

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
      actions:{
          update_title
      }
  },
  data () {
    return {
      step: 0,
      list:list,
      verify:{
        code:"",
        countShow:false
      },
      bindVerify:{
        code:"",
        countShow:false
      },
      verifyType:"",
      bindType:"",
      user:{}
    }
  },
  methods: {
    nextStep () {
      this.step ++
    },
    verifyFinish (type) {
      if(type==1){
        this.verify.countShow=false;
      }else {
        this.bindVerify.countShow=false;
      }
    },
    sendVerify (type){
      if(type==1){
        let param={};
        param.email=user.email;
        param.phone=user.phone;
      }

    }
  },
  ready (){
    this.update_title("绑定");
    let _this=this;
    //获取用户信息
    init.userInfo(function(e,r){
      if(e!=null){
        console.log(e);
        return;
      }
      _this.user=r;
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
