<template>
  <div id="grade">

    <table class="table table-resposive table-bordered">

    <caption>

      <b>2015-2016学年春(两学期)</b>

    </caption>

    <thead>

      <tr class="score">
        <td class="all_gpa" colspan="1">全部绩点: 2.257</td>
        <td class="all_ave" colspan="4">全部平均分: 72.977</td>
      </tr>
      <tr>
        <td class="required_gpa" colspan="1">必修绩点: 1.766</td><td class="required_ave" colspan="4">必修平均分: 67.281</td>
      </tr>
      <tr class="title">
        <th>课程名</th><th>分数</th><th>绩点</th><th>学分</th><th>属性</th>
      </tr>

    </thead>

   

    <tbody>

    <tr class="even">

        <td >新媒体概念及新媒体艺术实践</td>

        <td class="score">84.0</td> 

        <td class="gradepoint">3.2</td>

        <td class="credit">2</td> 

        <td class="properties">任选</td>

      </tr><tr class="odd">

        <td>大学英语（创意阅读）-4</td>

        <td class="score">60.0</td> 

        <td class="gradepoint">1</td>

        <td class="credit">2</td> 

        <td class="properties">必修</td>

      </tr><tr class="even">

        <td>学科竞赛培训</td>

        <td class="score">优秀</td> 

        <td class="gradepoint">4</td>

        <td class="credit">1</td> 

        <td class="properties">选修</td>

      </tr><tr class="odd">

        <td>学术前沿/创新创业讲座</td>

        <td class="score">90.0</td> 

        <td class="gradepoint">3.8</td>

        <td class="credit">1</td> 

        <td class="properties">选修</td>

      </tr><tr class="even">

        <td>信号与系统</td>

        <td class="score">66.0</td> 

        <td class="gradepoint">1.7</td>

        <td class="credit">4</td> 

        <td class="properties">必修</td>

      </tr><tr class="odd">

        <td>模拟电子技术</td>

        <td class="score">65.0</td> 

        <td class="gradepoint">1.7</td>

        <td class="credit">3.5</td> 

        <td class="properties">必修</td>

      </tr><tr class="even">

        <td>微机原理与接口技术</td>

        <td class="score">62.0</td> 

        <td class="gradepoint">1</td>

        <td class="credit">3.5</td> 

        <td class="properties">必修</td>

      </tr><tr class="odd">

        <td>体育-4</td>

        <td class="score">88.0</td> 

        <td class="gradepoint">3.6</td>

        <td class="credit">1</td> 

        <td class="properties">必修</td>

      </tr><tr class="even">

        <td>网页设计与制作</td>

        <td class="score">88.0</td> 

        <td class="gradepoint">3.6</td>

        <td class="credit">2</td> 

        <td class="properties">任选</td>

      </tr><tr class="odd">

        <td>模拟电子技术基础实验（Ⅰ）</td>

        <td class="score">80.0</td> 

        <td class="gradepoint">3.2</td>

        <td class="credit">2</td> 

        <td class="properties">必修</td>

      </tr><tr class="even">

        <td>形势与政策-4</td>

        <td class="score">86.0</td> 

        <td class="gradepoint">3.6</td>

        <td class="credit">0</td> 

        <td class="properties">必修</td>

      </tr>
    </tbody>

</table>
  </div>

</template>

<script>
function getGrade(){
  let url="http://api.scuplus.cn/jwc/grade";
  $.ajax({
    url: url,
    data:{token:$.fn.cookie("token")},
    type: 'get',
    success:function(r){
      console.log(r);
      if(r.status==1){
          
      }
      
    },
    error:function(x,t,e) {
     
    },
    complete:function(){
      
    }
  });
}
export default {
  data (){
    getGrade();
    return {

    }
  }
}
</script>
<style lang="less">
  
  #grade{
    background: #fff;
    padding: 10px;
  }
  #grade{
      table {
    border: 1px solid #ccc;
    width:95%;
    margin:0;
    padding:0;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
    font-size: 14px;
    color: #333244;
  }
  table tr ,table caption{
    border: 1px solid #ddd;
    padding: 5px;
  }
  table th, table td {
    padding:5px 8px;
    text-align: center;
  }
  table th {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
  }
  tbody tr:nth-child(even){
    background:#fbf9fe;
    /*color: #ececec;*/
  }

  table caption{
    background: #495c70;
    color: #fff;
    border-bottom: none;
    font-size: 16px;
  }
  
  table .title{
    border: 1px solid #ddd;
  }

  table thead tr,table thead th{
    border:none;
  }

  }

  
</style>
