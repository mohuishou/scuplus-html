<template>
<div id="grade">
    <table class="table table-resposive table-bordered">
      <caption> <b>当前图书借阅信息</b>
      </caption>
      <thead @click="chooseTable">
        <tr class="title">
          <th>书名</th>
          <th>作者</th>
          <th>到期时间</th>
          <th>续借</th>
        </tr>
        <tbody>
          <tr v-for="g in grade.grades" type="{{ g.courseType=='必修' ? 1 : 0}}" @click="choose">
            <td>{{g.name}}</td>

            <td class="grade" grade="{{ g.gradeCal }}">{{g.grade}}</td>

            <td class="gpa">{{ g.gpa }}</td>

            <td class="credit">{{ g.credit }}</td>

            <td class="courseType"><x-button text="续借" :disabled="isDisabled" @click="bind" plain></x-button></td>
          </tr>

        </tbody>

      </thead>
    </table>

  <loading :show="loadingShow" :text="loading"></loading>
</div>

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
import XButton from 'vux/src/components/x-button'
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

    this.update_title("当前借阅");

    let _this = this;


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
