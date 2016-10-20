<template>
<div id="evaluate">
  <group class="form">
    <x-input :placeholder="to" :readonly="true"></x-input>
    <x-textarea :value.sync="param.message" :height="150" :max="200" name="description" placeholder="
    人人为我，我为人人！
    您的评价将成为课程助手当中的重要参考依据，同时在期末评教的时候您可以开启一键评教，将您的评教信息，一键转存到学校的教务处^^"></x-textarea>
    <div class="rater">
      评分：
      <rater :font-size="16" :value.sync="param.stars"></rater><span class="star-num"> / {{param.stars}}</span>
    </div>
    <div class="card-padding">
      <x-button @click="evaluateStore" plain type="primary">提交</x-button>
    </div>
  </group>
  <group title="评教历史">
    <div class="card-padding">
      <ul class="discuss_list" v-show="evaluateInfo.count">
        <li class="discuss_item" v-for="comment in evaluateInfo">
          <div class="user_info">
            <strong class="nickname">{{comment.name}} <span class="star-num"> / {{comment.star}}</span>
              <div class="discuss_rater">
                  <rater :font-size="13" :value="comment.star"  disabled=""></rater>
              </div>
              </strong>
          </div>
          <div class="discuss_message">
            <span class="discuss_status">{{comment.status}}</span>
            <div class="discuss_message_content">{{comment.content}}</div>
          </div>
          <p class="discuss_extra_info">{{comment.time}} by 匿名用户
            <a v-if="comment.is_from_me" class="discuss_del js_del" href="javascript:;" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>
          </p>
        </li>
      </ul>
      <p v-show="!evaluateInfo.count">你还没有进行过评教诶!</p>
    </div>
  </group>
</div>
</template>
<script>
import Card from 'vux/src/components/card'
import Rater from 'vux/src/components/rater'
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import XInput from 'vux/src/components/x-input'
import XTextarea from 'vux/src/components/x-textarea'
import common from "../js/common"
import init from "../js/init"
import {
  update_title
} from '../vuex/actions'

function evaluate(datas) {
  let lists = [];
  console.log(datas);
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    let list = lists[i] = {};
    lists.count= data.evaluate_info.length;
    for (let j = 0; j < data.evaluate_info.length; j++) {
      let e = data.evaluate_info[j];
      list.name = "To " + data.teacher.name + "老师";
      list.time = common.getLocalTime(e.updated_at);
      list.content = e.message;
      list.star = e.stars;
    }

  }
  return lists;
}


export default {
  components: {
    Card,
    Rater,
    XButton,
    XInput,
    XTextarea,
    Group
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      isShowMore:true,
      evaluateInfo:[{}],
      param:{
        stars:0,
        cid:"",
        tid:"",
        message:""
      },
      to:""

    }
  },
  methods: {
    init:function () {
      let q=this.$route.query;
      let _this=this;
      let data=q;
      delete data.to;
      common.get("/jwc/evaluate",q,function (e,r) {
        if(e!=null){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
          return;
        }
        _this.evaluateInfo=evaluate(r.data.data);
        console.log(_this.evaluateInfo);
      });
    },
    evaluateStore:function(){
      //参数检查
      for (let x in this.param) {
        if (!this.param[x]) {
          console.log(x);
          this.$vux.toast.show({
            text:"请评价并评分之后，再次提交！",
            type:"warn"
          });
          return;
        }
      }

      if(this.param.message.length<6){
        this.$vux.toast.show({
          text:"评教内容至少需要6个字符！",
          type:"warn"
        });
        return;
      }
      let _this=this;
      //提交
      common.post("/jwc/evaluate/store",this.param,function(e,r){
        if(e!=null){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
          return;
        }
        if(r.status==1){
          _this.$vux.toast.show({
            text:r.msg,
            type:"success"
          });
          _this.init();
        }
      });
    }
  },

  //数据初始化
  ready() {
    this.update_title("课程评价");
    let q=this.$route.query;
    this.param.cid=q.cid;
    this.param.tid=q.tid;
    this.to=q.to;
    this.init();
  }
}
</script>
<style lang="less">
#evaluate{
  .rater{
    padding-top:10px;
    border-top: 1px solid #D9D9D9;
    color:#888;
    margin-left: 15px;
  }
  .form .weui_cells{
    margin-top: 0 !important;
  }

}

</style>
