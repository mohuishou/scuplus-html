<template>
  <div id="schedule">
    {{{ schedule_html }}}
  </div>

</template>


<style lang="less">
  
  #schedule{
    background: #fff;
    padding: 10px;
    width: 100%;
  }

  #schedule{

    .id{
      min-width: 30px;
    }

    table {
      background: #fff;
      border: 1px solid #ccc;
      width:95%;
      margin:0;
      padding:0;
      border-collapse: collapse;
      border-spacing: 0;
      margin: 0 auto;
      font-size:12px;
      color: #333244;
    }
    table tr ,table caption{
      border: 1px solid #ddd;
      padding: 5px;
    }
    table th, table td {
      padding:5px 8px;
      text-align: center;
      border: 1px solid #ddd;
    }
    table th {
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 1px;
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
  }
  

  #schedule td{
    min-width:70px;
  }

  
</style>

<script>


export default {
  data () {
    return {
    }
  },
  computed:{
    schedule_html (){
      let schedule_data;
      if(!schedule_data){
        return null;
      }
      return schedule(schedule_data);
    }
  }
}

/**
 * 课程表数据格式化
 * @param  {[type]} d [description]
 * @return {[type]}   [description]
 */
function schedule(d) {
  let html='<table class=""><thead class=""><tr><th></th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th></tr></thead><tbody>';
  
  //统计是否存在课程，不存在用空td填充
  let flags=[],flag=false;
  for(let y=0;y<13;y++){
    flags[y]=[];
    for(let x=0;x<7;x++){
      flags[y][x]=false;
    }
  }

  // 一天13节课
  for (let i=0;i<13; i++) {
    html +="<tr><td class='id'>"+(i+1)+"</td>"
    // 一周7天
    for(let s=1 ; s<=7 ;s++){
      flag=false;
      for( let m=0 ; m<d.length ;m++){
        const course_data=d[m].course;
        const teacher_data=course_data.teacher;
        const session=course_data.session.split(",");
        if(flags[i][s-1]){
          flag=true;
        }else{
          if(course_data.day==s){
            if(session[0]==(i+1)){
              for(let m=0;m<session.length;m++){
                let y=session[m]-1;
                let x=s-1;
                flags[y][x]=true; 
              }
              flag=true;
              html += '<td rowspan="'+session.length+'">'+course_data.name+'@'+course_data.campus+course_data.building+course_data.classroom+'</td>';
            }
          }
        }
        
      }
      if(!flag){
        html += '<td></td>';
      }
    }
    
    html += '</tr>';
    // $("#schedule-data").append(html);
  }
  console.log(flags);
  html +='</tbody></table>';
  return html;
}
</script>