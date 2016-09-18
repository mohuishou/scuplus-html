<template>
  <div id="grade">
    <div v-for="grade in grades" >
      <table class="table table-resposive table-bordered">
      <caption><b>{{grade.grades[0].term}}</b></caption>
      <thead>
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

          <tr v-for="g in grade.grades">
            <td >{{g.name}}</td>

            <td class="score">{{g.grade}}</td>

            <td class="gradepoint">{{g.gpa}}</td>

            <td class="credit">{{g.credit}}</td>

            <td class="properties">{{g.courseType}}</td>
          </tr>
          
        </tbody>
        
      </thead>
    </table>
    </div>
    <br />
  </div>

</template>

<script>

    //成绩计算
    function calGrade(data) {
        let termId = 1;
        let grade = {};
        
        for (let k = 1; k < 12; k++) {
            let sum = {
              all:{
                grade: 0,
                credit: 0,
                gpa: 0
              },
              required:{
                grade: 0,
                credit: 0,
                gpa: 0
              }
                
            };
            let avg={
              all:{
                grade: 0,
                gpa: 0
              },
              required:{
                grade: 0,
                gpa: 0
              }
              
            };
            let t=[];
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                if (d.termId != k) {
                    continue;
                }
                d.gradeCal=lv2grade(d.grade);
                d.gpa=grade2gpa(d.gradeCal);
                d.credit=parseInt(d.credit);
                t.push(d);
                if(d.courseType=="必修"){
                  sum.required.grade += d.gradeCal*d.credit;
                  sum.required.credit += d.credit;
                  sum.required.gpa += d.gpa*d.credit;
                }
                sum.all.grade += d.gradeCal*d.credit;
                sum.all.credit += d.credit;
                sum.all.gpa += d.gpa*d.credit;
            }
            if(!t[0]){
              return grade;
            }
            avg.all.gpa=(sum.all.gpa/sum.all.credit).toFixed(2);
            avg.all.grade=(sum.all.grade/sum.all.credit).toFixed(2);

            avg.required.gpa=(sum.required.gpa/sum.required.credit).toFixed(2);
            avg.required.grade=(sum.required.grade/sum.required.credit).toFixed(2);
            grade[k]=[]
            grade[k]['avg']=avg;
            grade[k]['sum']=sum;
            grade[k]['grades']=t;

        }

        return grade;
    }



    //分数绩点转换
    function grade2gpa(grade) {
      var gpa = 0;
      if(grade >= 95){
          gpa = 4.0;
        }else if(grade >= 90 && grade <= 94){
          gpa = 3.8;
        }else if(grade >= 85 && grade <= 89){
          gpa = 3.6;
        }else if(grade >= 80 && grade <= 84){
          gpa = 3.2;
        }else if(grade >= 75 && grade <= 79){
          gpa = 3.2;
        }else if(grade >= 70 && grade <= 74){
          gpa = 2.7;
        }else if(grade >= 65 && grade <= 69){
          gpa = 2.2;
        }else if(grade >= 60 && grade <= 64){
          gpa = 1.7;
        }else if(grade <60){
          gpa = 1;
        }
      return gpa;
    }

    //绩点分数转换
    function lv2grade(g) {
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

    function getGrade(callback) {
        let url = "http://api.scuplus.cn/jwc/grade";
        $.ajax({
            url: url,
            async:false,
            data: {
                token: $.fn.cookie("token")
            },
            type: 'get',
            success: function(r) {
                console.log(r);
                if (r.status == 1) {
                  let grade=calGrade(r.data);
                  callback(grade);
                }

            },
            error: function(x, t, e) {

            },
            complete: function() {

            }
        });
    }
    export default {
        data() {
            
            return {
              grades:123
            }
        },
        methods:{
          getGrade:function(grades){

          }
        },
        computed:{
          grades:function(){
             
            let grade;
            getGrade(function(g){
              grade=g
            });
            // console.log(grade);

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
    }
</style>