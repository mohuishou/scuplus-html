<template>
<div id="assistant-details">
  <scroller id="course-scroller" :pullup-config="pullupConfig" @pullup:loading="load" style="height:100%;" lock-x scrollbar-y use-pullup>
    <div id="course-box">
      <card>
        <div class="weui_panel_hd panel-title" slot="header">
          <h3>
              {{c.name}} <span class="star-num"> / {{c.avg_star}}</span>
              <rater :font-size="13" :value="c.avg_star" class="rater" disabled="">
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
                  {{c.avg_grade}}
              </span>
            </span>
            <span class="badge">
              <span style="background: #666666;">
                  上课人次
              </span>
              <span style="background: #99CC66;">
                  {{c.count_grade}}
              </span>
            </span>
            <span class="badge">
              <span style="background: #35495e;">
                  评教人次
              </span>
              <span style="background: #FF9933;">
                  {{c.count_star}}
              </span>
            </span>
            <span class="badge">
              <span style="background: #666666;">
                  挂科率
              </span>
              <span style="background: #99CC66;">
                  {{c.pass_rate? (1-c.pass_rate)*100 : "无"}}%
              </span>
            </span>
          </div>
          <div class="assistant-content">
            <flexbox>
              <flexbox-item>
                <p>
                  <span class="assistant-content-title">
                      周次：
                  </span> {{c.allWeek}}
                </p>
              </flexbox-item>
              <flexbox-item>
                <p>
                  <span class="assistant-content-title">
                      星期：
                  </span> {{c.day}}
                </p>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                <p>
                  <span class="assistant-content-title">
                      节次：
                  </span> {{c.session}}
                </p>
              </flexbox-item>
              <flexbox-item>
                <p>
                  <span class="assistant-content-title">
                      校区：
                  </span> {{c.campus}}
                </p>
              </flexbox-item>
            </flexbox>
            <p>
              <span class="assistant-content-title">
              学院：
          </span> {{c.college}}
            </p>
            <p>
              <span class="assistant-content-title">
              教师：
          </span>
              <x-button class="assistant-content-teacher" mini="" v-link="t.tlink" plain="" v-for="t in c.teacher">
                {{t.name}}
              </x-button>
            </p>
          </div>
        </div>
      </card>
      <ul class="discuss_list">
        <li class="discuss_item" v-for="comment in list">
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
    </div>
  </scroller>
</div>
</template>
<script>
import Card from 'vux/src/components/card'
import Rater from 'vux/src/components/rater'
import XButton from 'vux/src/components/x-button'
import {
  Flexbox,
  FlexboxItem
} from 'vux/src/components/flexbox'
import Scroller from 'vux/src/components/scroller'
import common from "../js/common"
import {
  update_title
} from '../vuex/actions'

function course(data) {
  let str, spstr;
  //周次转换
  str = data.allWeek;
  spstr = str.split(",");
  data.allWeek = spstr[0] + "-" + spstr[spstr.length - 1] + "周";
  //课程详情链接
  data.clink = "/assistant?cid=" + data.id;
  if (!(data.teacher instanceof Array)) {
    data.teacher = [data.teacher];
  }
  //课程教师链接
  for (let j = 0; j < data.teacher.length; j++) {
    data.teacher[j].tlink = "/assistant?cid=" + data.id + "&tid=" + data.teacher[j].id;
  }
  return data;
}

function evaluate(datas) {
  let lists = [];
  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    let list = lists[i] = {};
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
    Flexbox,
    FlexboxItem,
    Scroller
  },
  vuex: {
    actions: {
      update_title
    }
  },
  methods: {
    load(uuid) {

      let _this = this;

      //评教详情获取
      common.get("/jwc/evaluate/all?page=" + this.page, this.params, function(e, r) {
        if (e != null) {
          _this.$vux.toast.show({
            text: e,
            type: "warn"
          });
        } else {
          if (r.data.current_page >= r.data.last_page) {
            _this.$vux.toast.show({
              text: "没有数据了"
            });
            _this.$broadcast('pullup:done', uuid);
            return;
          }
          let d = evaluate(r.data.data);
          for (let i = 0; i < d.length; i++) {
            _this.list.push(d[i]);
          }
          _this.$broadcast('pullup:reset', uuid);
          _this.page += 1;
        }
        console.log(r);
      });


    }
  },
  data() {
    return {
      items: [{}],
      c: {},
      list: "",
      page: 1,
      params: '',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      }
    }
  },
  //数据初始化
  ready() {
    this.params = this.$route.query;
    let _this = this;

    //单课程详情获取
    common.post("/jwc/course/one", this.params, function(e, r) {
      if (e != null) {
        _this.$vux.toast.show({
          text: e,
          type: "warn"
        });
      } else {
        let d = course(r.data);
        let t = d.name;
        if (d.name.length > 6) {
          t = d.name.substring(0, 4);
        }
        if (d.teacher.length == 1) {
          t = t + "-" + d.teacher[0].name;
        }
        _this.update_title(t);
        _this.$set("c", d);
      }
    });

    //评教详情获取
    common.get("/jwc/evaluate/all?page=" + this.page, this.params, function(e, r) {
      if (e != null) {
        _this.$vux.toast.show({
          text: e,
          type: "warn"
        });
      } else {
        _this.$set("list", evaluate(r.data.data));
        console.log(r.data);
      }
      console.log(r);
    });
  }
}
</script>
<style>
#assistant-details {
  height: 100%;
  overflow: hidden;
}
</style>
