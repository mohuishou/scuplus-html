<template>
<div id="grade">
  <div v-for="grade in grades">
    <table class="table table-resposive table-bordered">
      <caption> <b>{{grade.grades[0].term}}</b>
      </caption>
      <thead @click="chooseTable">
        <tr class="score">
          <td class="all_gpa" colspan="1">全部绩点: {{grade.avg.all.gpa}}</td>
          <td class="all_ave" colspan="4">全部平均分: {{grade.avg.all.grade}}</td>
        </tr>
        <tr>
          <td class="required_gpa" colspan="1">必修绩点: {{grade.avg.required.gpa}}</td>
          <td class="required_ave" colspan="4">必修平均分: {{grade.avg.required.grade}}</td>
        </tr>
        <tr class="title">
          <th>课程名</th>
          <th>分数</th>
          <th>绩点</th>
          <th>学分</th>
          <th>属性</th>
        </tr>
        <tbody>
          <tr v-for="g in grade.grades" type="{{ g.courseType=='必修' ? 1 : 0}}" @click="choose">
            <td>{{g.name}}</td>

            <td class="grade" grade="{{ g.gradeCal }}">{{g.grade}}</td>

            <td class="gpa">{{ g.gpa }}</td>

            <td class="credit">{{ g.credit }}</td>

            <td class="courseType">{{ g.courseType }}</td>
          </tr>

        </tbody>

      </thead>
    </table>
  </div>
  <br />



  <!--帮助-->
  <div>
    <alert alert :show.sync="helpShow" title="帮助" button-text="我已阅读">
      <div class="help">
        <div> <strong>计算方法：</strong>
          <p>加权平均分 = ∑(成绩 * 课程学分) / ∑课程学分</p>
          <p>绩点 = ∑(绩点 * 课程学分) / ∑课程学分</p>

        </div>
        <div> <strong>操作说明：</strong>
          <p>点击每行选中需要计算的数据，点击下方计算按钮计算</p>
          <p>点击每一学期的平均分/绩点 显示栏，该学期课程全选/全不选</p>
        </div>
        <div> <strong>更新说明：</strong>
          <p>点击底部更新按钮，服务器将会从教务处自动抓取最新成绩信息，可能由于教务链接问题更新速度可能稍慢</p>
        </div>

      </div>
    </alert>
  </div>
  <!--帮助 end-->

  <div>
    <alert alert :show.sync="resultShow" title="计算结果" button-text="我已阅读">
      <div class="result">
        <p>您选择了{{sum.classNum}} 门课程，总共{{sum.credit}} 学分：</p>
        <p>平均绩点为：{{avg.gpa}}</p>
        <p>平均成绩为：{{avg.grade}}</p>
      </div>
    </alert>
  </div>
  <loading :show="loadingShow" :text="loading"></loading>
</div>
  <!-- 底部 -->
  <tabbar id="tabbar" icon-class="vux-center" slot="bottom">
    <!--use v-link-->
    <tabbar-item @click="chooseRequired">
      <span slot="label"><p class="iconfont icon-pencil"></p>必修</span>
    </tabbar-item>

    <!--use http link-->
    <tabbar-item @click="calculation">
      <span slot="label"><p class="iconfont icon-jisuan"></p>计算</span>
    </tabbar-item>

    <!--use vue-router link-->
    <tabbar-item @click="help">
      <span slot="label"><p class="iconfont icon-help"></p>帮助</span>
    </tabbar-item>

    <!--use v-link-->
    <tabbar-item @click="update">
      <span slot="label"><p class="iconfont icon-refresh"></p>更新</span>
    </tabbar-item>
    <!--use vue-router object link-->
    <tabbar-item link="/user">
      <span slot="label"><p class="iconfont icon-user"></p>个人中心</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import {
  Tabbar,
  TabbarItem
} from 'vux/src/components/tabbar'
import Dialog from 'vux/src/components/dialog'
import Alert from 'vux/src/components/alert'
import Loading from 'vux/src/components/loading'
import init from '../js/init'
import common from '../js/common'
import g from '../js/grade'
import {
  update_title
} from '../vuex/actions'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Alert,
    Loading
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      grades: {},
      resultShow: false,
      helpShow: true,
      sum: {
        gpa: 0,
        grade: 0,
        credit: 0,
        classNum: 0
      },
      avg: {
        gpa: 0,
        grade: 0
      },
      loading: "获取中，请稍候",
      loadingShow: false,
      toggleRequired:true
    }
  },
  methods: {
    //点击选择
    choose: function(t) {
      let tr = t.path[1];
      $(tr).toggleClass('choose');
    },

    //选择一学期
    chooseTable: function(t) {
      let table = t.path[3];
      let i = 0;
      $(table).find('tbody tr').each(function(index, el) {
        if ($(el).hasClass('choose')) {
          $(el).removeClass('choose');
          i++;
        }
      });
      if (i == 0) {
        $(table).find('tbody tr').each(function(index, el) {
          $(el).addClass('choose');
        });
      }
    },

    //选择所有必修
    chooseRequired: function() {
      if(this.toggleRequired){
        $("tr").removeClass("choose");
        $("tr[type='1']").addClass('choose');
      }else {
        $(".choose").removeClass("choose");
      }
      this.toggleRequired=!this.toggleRequired;

    },

    //计算已选择的成绩
    calculation: function() {
      let sum = {
        gpa: 0,
        grade: 0,
        credit: 0,
        classNum: 0
      };
      let avg = {
        gpa: 0,
        grade: 0
      }
      $("tr[class='choose']").each(function(i, e) {
        let credit = parseFloat($(e).children('.credit').text());
        sum.credit += parseFloat($(e).children('.credit').text());
        sum.gpa += parseFloat($(e).children('.gpa').text()) * credit;
        sum.grade += parseFloat($(e).children('.grade').attr("grade")) * credit;
        sum.classNum++;
      });
      avg.gpa = (sum.gpa / sum.credit).toFixed(2);
      avg.grade = (sum.grade / sum.credit).toFixed(2);
      this.sum = sum;
      this.avg = avg;
      this.resultShow = true;
    },

    //帮助
    help: function() {
      this.helpShow = true;
    },

    //更新成绩
    update: function() {
      let _this = this;
      this.loadingShow=true;
      common.post("/jwc/grade",null,function (e,r) {
        _this.loadingShow=false;

        if (e!=null) {
          _this.$vux.toast.show({
            type: "warn",
            text: e
          });
          return;
        }
        if(r.status==1){
          _this.$vux.toast.show({
            type: "success",
            text: r.msg
          });
          let grade=g.cal(r.data);
          _this.grades=grade;
          common.storage.set("grade",grade);
        }
      });


    }
  },
  ready() {

    this.update_title("成绩/绩点");

    let _this = this;

    init.grade(function(e, r) {
      if (e != null) {
        this.$vux.toast.show({
          type: "warn",
          text: e
        });
      }
      _this.grades = r;
    });
  }
}
</script>
<style lang="less">
#grade {
    background: #fefefe;
    padding: 10px;
}

#grade {
    table {
        border: 1px solid #ccc;
        width: 95%;
        margin: 20px auto !important;
        padding: 0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
        font-size: 14px;
        color: #333244;
    }
    table caption,
    table tr {
        border: 1px solid #ddd;
        padding: 5px;
    }
    table td,
    table th {
        padding: 5px 8px;
        text-align: center;
    }
    table th {
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
    }
    tbody tr:nth-child(even) {
        background: #fbf9fe;
        /*color: #ececec;*/
    }
    table caption {
        background: #495c70;
        color: #fff;
        border-bottom: none;
        font-size: 16px;
    }
    table .title {
        border: 1px solid #ddd;
    }
    table thead th,
    table thead tr {
        border: none;
    }
    .choose {
        background: #ececec !important;
    }
    .help,
    .result {
        color: #333244;
    }
    .help {
        text-align: left;
    }
    .help div {
        background: #eee;
        border: 1px solid #ccc;
        margin-top: 5px;
        padding: 10px;
    }
}
</style>
