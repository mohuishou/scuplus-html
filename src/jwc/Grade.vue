<template>
  <div id="grade">
    <div v-for="grade in grades" >
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
            <tr v-for="g in grade.grades" type="{{ g.courseType=='必修' ? 1 : 0}}" @click="choose" >
              <td >{{g.name}}</td>

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

    <!-- 底部 -->
    <tabbar  id="tabbar" icon-class="vux-center"  slot="bottom">
      <!--use v-link-->
      <tabbar-item @click="chooseRequired">
        <img slot="icon" src="assets/img/required.png">
        <span slot="label">必修</span>
      </tabbar-item>

      <!--use http link-->
      <tabbar-item @click="calculation">
        <img slot="icon" src="assets/img/cal.png">
        <span slot="label">计算</span>
      </tabbar-item>

      <!--use vue-router link-->
      <tabbar-item @click="help">
        <img slot="icon" src="assets/img/help.png">
        <span slot="label">帮助</span>
      </tabbar-item>

      <!--use v-link-->
      <tabbar-item @click="update">
        <img slot="icon" src="assets/img/update.png">
        <span slot="label">更新</span>
      </tabbar-item>
      <!--use vue-router object link-->
      <tabbar-item link="/user">
        <img slot="icon" src="assets/img/user.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>

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
</template>

<script>
    import storage from "./js/storage"
    import {
        Tabbar,
        TabbarItem
    } from 'vux/src/components/tabbar'
    import Dialog from 'vux/src/components/dialog'
    import Alert from 'vux/src/components/alert'
    import Loading from 'vux/src/components/loading'
    //成绩计算
    function calGrade(data) {
        let termId = 1;
        let grade = [];

        for (let k = 1; k < 12; k++) {
            let sum = {
                all: {
                    grade: 0,
                    credit: 0,
                    gpa: 0
                },
                required: {
                    grade: 0,
                    credit: 0,
                    gpa: 0
                }

            };
            let avg = {
                all: {
                    grade: 0,
                    gpa: 0
                },
                required: {
                    grade: 0,
                    gpa: 0
                }

            };
            let t = [];
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (d.termId != k) {
                    continue;
                }
                d.gradeCal = lv2grade(d.grade);
                d.gpa = grade2gpa(d.gradeCal);
                d.credit = parseInt(d.credit);
                t.push(d);
                if (d.courseType == "必修") {
                    sum.required.grade += d.gradeCal * d.credit;
                    sum.required.credit += d.credit;
                    sum.required.gpa += d.gpa * d.credit;
                }
                sum.all.grade += d.gradeCal * d.credit;
                sum.all.credit += d.credit;
                sum.all.gpa += d.gpa * d.credit;
            }
            if (!t[0]) {
                return grade;
            }
            //计算平均分保留两位小数
            avg.all.gpa = (sum.all.gpa / sum.all.credit).toFixed(2);
            avg.all.grade = (sum.all.grade / sum.all.credit).toFixed(2);

            avg.required.gpa = (sum.required.gpa / sum.required.credit).toFixed(2);
            avg.required.grade = (sum.required.grade / sum.required.credit).toFixed(2);
            grade[k - 1] = {}
            grade[k - 1].avg = avg;
            grade[k - 1].sum = sum;
            grade[k - 1].grades = t;

        }
        console.log(grade);

        return grade;
    }

    //分数绩点转换
    function grade2gpa(grade) {
        var gpa = 0;
        if (grade >= 95) {
            gpa = 4.0;
        } else if (grade >= 90 && grade <= 94) {
            gpa = 3.8;
        } else if (grade >= 85 && grade <= 89) {
            gpa = 3.6;
        } else if (grade >= 80 && grade <= 84) {
            gpa = 3.2;
        } else if (grade >= 75 && grade <= 79) {
            gpa = 3.2;
        } else if (grade >= 70 && grade <= 74) {
            gpa = 2.7;
        } else if (grade >= 65 && grade <= 69) {
            gpa = 2.2;
        } else if (grade >= 60 && grade <= 64) {
            gpa = 1.7;
        } else if (grade < 60) {
            gpa = 1;
        }
        return gpa;
    }

    function trimStr(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    //绩点分数转换
    function lv2grade(g) {
        g = trimStr(g);
        if (!isNaN(g)) {
            return g;
        }
        switch (g) {
            case "优秀":
                g = 95;
                break;
            case "良好":
                g = 86;
                break;
            case "中等":
                g = 75;
                break;
            case "通过":
                g = 60;
                break;
            case "未通过":
                g = 0;
                break;
        }
        return g;
    }
    //获取成绩
    function getGrade(callback) {
        let url = "http://api.scuplus.cn/jwc/grade";
        $.ajax({
            url: url,
            async: false,
            data: {
                token: storage.get("token")
            },
            type: 'get',
            success: function(r) {
                console.log(r);
                if (r.status == 1) {
                    let grade = calGrade(r.data);
                    callback(grade);
                }

            },
            error: function(x, t, e) {
                console.log(x);
            }
        });
    }

    export default {
        components: {
            Tabbar,
            TabbarItem,
            Alert,
            Loading
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
                loadingShow: false
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
                console.log(table);
            },

            //选择所有必修
            chooseRequired: function() {
                $("tr").removeClass("choose");
                $("tr[type='1']").addClass('choose');
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
                    let credit = parseInt($(e).children('.credit').text());
                    sum.credit += parseInt($(e).children('.credit').text());
                    sum.gpa += parseInt($(e).children('.gpa').text()) * credit;
                    sum.grade += parseInt($(e).children('.grade').attr("grade")) * credit;
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
                let url = "http://api.scuplus.cn/jwc/grade";
                let _this = this;
                this.loadingShow = true;
                $.ajax({
                    url: url,
                    data: {
                        token: storage.get("token")
                    },
                    type: 'post',
                    success: function(r) {
                        console.log(r);
                        if (r.status == 1) {
                            let grade = calGrade(r.data);
                            storage.set("grade", JSON.stringify(grade));
                            _this.grade = grade;
                            _this.loadingShow = false;
                        }

                    },
                    error: function(x, t, e) {
                        console.log(x);
                    },
                    complete: function() {

                    }
                });
            }
        },
        computed: {
            grades: function() {
                let grade;
                //获取成绩并且保存到浏览器本地储存
                if (!storage.get("grade")) {
                    getGrade(function(g) {
                        grade = g
                        storage.set("grade", JSON.stringify(g));
                    });
                } else {
                    grade = JSON.parse(storage.get("grade"));
                }
                console.log(grade);
                return grade;
            }
        }
    }
</script>
<style lang="less">
    #grade {
        background: #fff;
        padding: 10px;
    }
    
    #grade {
        table {
            border: 1px solid #ccc;
            width: 95%;
            margin: 0;
            padding: 0;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0 auto;
            font-size: 14px;
            color: #333244;
        }
        table tr,
        table caption {
            border: 1px solid #ddd;
            padding: 5px;
        }
        table th,
        table td {
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
        table thead tr,
        table thead th {
            border: none;
        }
        .choose {
            background: #ececec !important;
        }
        .result,
        .help {
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