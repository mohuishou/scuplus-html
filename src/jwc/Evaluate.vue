<template>
<div id="evaluate">
  <group >
    <x-input placeholder="To:教师名(课程名称)" :readonly="true"></x-input>
    <x-textarea :height="150" :max="200" name="description" placeholder="
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
      <ul class="discuss_list" v-show="item.evaluate_count">
        <li class="discuss_item" v-for="comment in item.teacher.evaluate_info">
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
      <p >你还没有进行过评教诶!</p>
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

function evaluate(data){

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
  methods: {
    evaluateStore:function(){
      //参数检查
      //
      //提交
    }
  },
  data() {
    return {
      items: [{}],
      isShowMore:true,
      param:{
        stars:0,
        cid:"",
        tid:"",
        message:""
      }

    }
  },
  //数据初始化
  ready() {
    this.update_title("课程评价");
    // let _this=this;
    // init.schedule(function (e,r) {
    //   console.log(r);
    //   _this.items=scheduleItems(r);
    // });

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

}

</style>
