<template>
<div id="bind-library">
  <group class="bind-library-input">
    <x-input title="学号" :value.sync="param.library_id" :show-clear=true placeholder="请输入学号"></x-input>
    <x-input title="密码" type="password" :value.sync="param.library_password" :show-clear=true placeholder="请输入图书馆的密码"></x-input>
  </group>
  <x-button style="" class="xbtn" :text="btnText" :disabled="isDisabled" @click="bind" plain></x-button>


</div>
</template>

<script>
import XInput from 'vux/src/components/x-input'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import common from "../js/common"
import {
  update_title
} from '../vuex/actions'
export default {
  components: {
    XInput,
    Group,
    XButton
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      btnText: "提交",
      isDisabled: false,
      param: {}
    }
  },
  methods: {
    bind: function() {
      const _this = this;

      if (!this.param.library_id || !this.param.library_password) {
        this.$vux.toast.show({
          text: "请输入学号和密码",
          type: "warn"
        });
        return;
      }

      this.btnText = "绑定中请稍候...";
      this.isDisabled = true;

      common.post("/library/bind", this.param, function(e, r) {
        _this.btnText = "提交";
        _this.isDisabled = false;
        if (e != null) {
          _this.$vux.toast.show({
            text: e,
            type: "warn"
          });
          return;
        }
        if (r.status == 1) {
          _this.$vux.toast.show({
            text: r.msg,
            type: "success"
          });
          setTimeout(function() {
            location.href = "/#!/user";
          }, 1500);
        }
      });


    }
  },
  ready() {
    this.update_title("绑定图书馆");
  }
}
</script>
<style>
  .xbtn{
    width:99%;
    margin-top:20px;
  }
</style>
