<template>
<div id="evaluation">
    <div id="course-box">
      <div v-for="item in items">
        <card :footer="{title:'查看更多'}">
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

      c.teacher[j].evaluate_count=c.teacher[j].evaluate_info.length;
      c.evaluate_count+=c.teacher[j].evaluate_info.length;
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


  },
  data() {
    return {
      items: [{}],

    }
  },
  //数据初始化
  ready() {
    this.update_title("课程评价");
    let _this=this;
    init.schedule(function (e,r) {
      console.log(r);
      _this.items=scheduleItems(r);
    });

  }
}
</script>
<style>
#assistant {
  height: 100%;
  overflow: hidden;
}
</style>
