<template>
  <div id="schedule">
    {{{ schedule_html }}}


    
    <!-- 底部 -->
    <tabbar  id="tabbar" icon-class="vux-center"  slot="bottom">
  
      <!--use http link-->
      <tabbar-item @click="icalExport" >
        <img slot="icon" src="assets/img/cal.png">
        <span slot="label">导出</span>
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
          <div> <strong>导出说明：</strong>
            <p>点击底部导出按钮，服务器将自动生成ical文件链接</p>
            <p>详细的使用教程点击查看</p>
          </div>
          <div> <strong>更新说明：</strong>
            <p>点击底部更新按钮，服务器将会从教务处自动抓取最新课程表信息，可能由于教务链接问题更新速度可能稍慢</p>
          </div>

        </div>
      </alert>
    </div>
    <!--帮助 end-->
    <!--导出 ical-->
    <div>
      <alert alert :show.sync="icalShow" title="导出结果" button-text="我已阅读">
        <div class="help">
          <div> <strong>导出成功：</strong>
            <a href="{{icalLink}}">{{icalLink}}</a>
            <p>详细的使用教程点击查看</p>
          </div>
          <div>
        </div>
      </alert>
    </div>
    <!--export ical end-->
    <loading :show="loadingShow" :text="loading"></loading>
  </div>


    

</template>



<script>
  import { Tabbar, TabbarItem } from 'vux/src/components/tabbar'
  import storage from "./js/storage"
  import Dialog from 'vux/src/components/dialog'
  import Alert from 'vux/src/components/alert'
  import common from './js/common'
  import Loading from 'vux/src/components/loading'
  let icalurl="/jwc/schedule/ics";
  function getIcalUrl() {
    // body...
  }
  function getSchedule() {
      let url = "http://api.scuplus.cn/jwc/schedule";
      let data;
      common.get(url,null,false,function(e,r){
        if(e!=null){

        }else{
          data=r.data;
        }
      });
      return data;
      
  }

export default {
  components: {
        Tabbar,
        TabbarItem,
        Alert,
        Dialog,
        Loading
    },
  data () {
    return {
      helpShow:false,
      icalShow:false,
      icalLink:"",
      loadingShow:true,
      loading:"请稍后",
      schedule_html:""
    }
  },
  methods:{
     //帮助
    help:function(){
       this.helpShow=true;
    },
    icalExport:function(){
      this.icalShow=true;
    },
    //更新成绩
    update:function(){
      let url = "http://api.scuplus.cn/jwc/schedule";
      let _this=this;
      this.loadingShow=true;
      common.post(url,null,true,function(e,r){
        console.log(r);
        _this.loadingShow=false;
        if(e){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
        }else{
           _this.$vux.toast.show({
            text:"更新成功！",
          });
          _this.schedule_html=r.data;
        }

      });
    
    }
  },
  //数据初始化
  ready (){
    let url = "http://api.scuplus.cn/jwc/schedule";
      let data;
      let _this=this;
      common.get(url,null,function(e,r){
        _this.$set("loadingShow",false);
        if(e!=null){
          _this.$vux.toast.show({
            text:e,
            type:"warn"
          });
          console.log(e);
        }else{
          data=r.data;
          _this.$set("schedule_html",schedule(data));
          _this.$set("helpShow",true);
        }
      });
  },
  computed:{

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


<style lang="less">
  
  #schedule{
    background: #fff;
    padding: 10px;
    width: 100%;
  }

  #schedule{
    .help{
      text-align:left;
    }
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