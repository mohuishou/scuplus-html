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

      <div class="step1">
        <group v-show="step==0">
          <selector placeholder="请选择验证方式" :value.sync="verifyType" title="验证方式" :options="list" ></selector>
          <!-- 验证码 -->
          <x-input title="验证码" :value.sync="verifyCode" :show-clear=false type="number" placeholder="请输入验证码">
            <x-button slot="right"  v-show="countShow"  type="disabled">
              发送中
              <countdown :time="120" @on-finish="verifyFinish"></countdown>
            </x-button>
            <x-button  @click="sendVerify" slot="right" v-show="!countShow" type="primary">发送验证码</x-button>
          </x-input>
        </group>

      </div>
      <div class="step2">
        <group v-show="step==1">
        <selector placeholder="请选择验证方式" :value.sync="bindType" title="绑定方式" :options="list" ></selector>

        <!-- 验证码 -->
        <!-- <x-input title="验证码" :value.sync="verifyCode" :show-clear=false type="number" placeholder="请输入验证码">
          <x-button slot="right"  v-show="countShow"  type="disabled">
            发送中
            <countdown :time="120" @on-finish="verifyFinish"></countdown>
          </x-button>
          <x-button  @click="sendVerify" slot="right" v-show="!countShow" type="primary">发送验证码</x-button>
        </x-input> -->
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
  data () {
    return {
      step: 0,
      list:list,
      verifyCode:"",
      verifyType:"",
      bindType:""
    }
  },
  methods: {
    nextStep () {
      this.step ++
    },
    verifyFinish () {

    }
  }
}
</script>

<style>
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>
