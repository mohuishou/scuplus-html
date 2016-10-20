<template>
<div id="evaluation">
    <div id="course-box">
      <div v-for="item in items">
        <card >
          <div class="weui_panel_hd panel-title" slot="header">
            <h3>
                {{item.name}}<span class="star-num"> / {{item.avg_star}}</span>
                <rater :font-size="13" :value="item.avg_star" class="rater" disabled="">
                </rater>
            </h3>
          </div>
          <div class="card-padding" slot="content">
            <div class="assistant-badge">
              <span class="badge">
                <span style="background: #35495e;">
                    平均分
                </span>
              <span style="background: #FF9933">
                    {{item.avg_grade}}
                </span>
              </span>
              <span class="badge">
                <span style="background: #666666;">
                    上课人次
                </span>
              <span style="background: #99CC66;">
                    {{item.count_grade}}
                </span>
              </span>
              <span class="badge">
                <span style="background: #35495e;">
                    评教人次
                </span>
              <span style="background: #FF9933;">
                    {{item.count_star}}
                </span>
              </span>
              <span class="badge">
                  <span style="background: #666666;">
                      挂科率
                  </span>
              <span style="background: #99CC66;">
                      {{item.pass_rate? (1-item.pass_rate)*100 : "无"}}%
                  </span>
              </span>
            </div>
            <div class="assistant-content">
              <p>
                <span class="assistant-content-title">
                    教师：
                </span>
                <x-button class="assistant-content-teacher" mini="" v-link="t.tlink" plain="" v-for="t in item.teacher">
                  {{t.name}} | {{t.evaluate_count}}
                </x-button>
              </p>

            </div>
          </div>

          <div class="" slot="footer" >
            <div class="weui_panel_ft" @click="showMore">
              <span >查看更多</span>
              <span class="none">收起</span>
            </div>
            <div class="card-padding show-more none">
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
              <p v-show="!item.evaluate_count">你还没有进行过评教诶，赶快点击上方教师名，做出你的评价吧！</p>
            </div>
          </div>
        </card>
      </div>
    </div>
</div>
</template>
<script>
import Card from 'vux/src/components/card'
import Rater from 'vux/src/components/rater'
import XButton from 'vux/src/components/x-button'
import common from "../js/common"
import init from "../js/init"
import {
  update_title
} from '../vuex/actions'

function scheduleItems(data){
  let course=[];
  for (let i = 0; i < data.length; i++) {
    let c=data[i].course;

    //去除重复课程
    if(i>0){
      if(data[i].course.courseId==data[i-1].course.courseId&&data[i].course.sessionId==data[i-1].course.sessionId){
        if(data[i].course.id>data[i-1].course.id){
          data.splice(i,1);
        }else {
          data.splice(i,1-1);
        }
        continue;
      }
    }

    c.evaluate_count=0;
    for (let j = 0; j < c.teacher.length; j++) {
      let eva=c.teacher[j].evaluate_info;
      c.teacher[j].evaluate_count=eva.length;
      c.evaluate_count+=eva.length;
      for (let k= 0; k <eva.length; k++) {
        eva[k].name = "To " + eva[k].teacher.name + "老师";
        eva[k].time = common.getLocalTime(eva[k].updated_at);
        eva[k].content = eva[k].message;
        eva[k].star = eva[k].stars;
      }
      c.teacher[j].evaluate_info=eva;

      c.teacher[j].tlink="/evaluate?cid="+c.id+"&tid="+c.teacher[j].id+"&to=To:"+c.teacher[j].name+"（"+c.name+"）";
    }
    course.push(c);
  }
  return course;
}


export default {
  components: {
    Card,
    Rater,
    XButton
  },
  vuex: {
    actions: {
      update_title
    }
  },
  methods: {
    showMore:function(v){
      $(v.path[0]).children("span").toggleClass("none");
      $(v.path[1]).children(".show-more").toggleClass("none");
    }

  },
  data() {
    return {
      items: [{}],
      isShowMore:true

    }
  },
  //数据初始化
  ready() {
    this.update_title("课程评价");
    let _this=this;
    init.schedule(function (e,r) {
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.items=scheduleItems(r);
    });

  }
}
</script>
<style lang="less">
#evaluation{
  .show-more{
    font-size: 13px;
    border-top: 1px solid #E5E5E5;
    color: #888;
  }
  .none{
    display: none;
  }
}

</style>
