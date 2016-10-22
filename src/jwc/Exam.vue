<template>
  <div class="exam">
    <timeline v-show="examNum">
      <timeline-item v-for="e in exam">
        <h4>{{e.class_name}}</h4>
        <p>时间：{{e.date}}（{{e.week}}周周{{e.day}}） {{e.time}}</p>
        <p>地点：{{e.campus}}-{{e.building}}-{{e.classroom}}  一教A座A222</p>
        <p>座位号：{{e.seat}}</p>
      </timeline-item>
    </timeline>
    <div class="no-exam">
      <p v-show="!examNum">可以好好睡觉了，暂时没有考试信息！</p>
    </div>
</div>

</template>

<script>
import {Timeline,TimelineItem }from 'vux/src/components/timeline'
import common from "../js/common"
import init from "../js/init"
import {
  update_title
} from '../vuex/actions'

export default {
  components: {
    Timeline,TimelineItem
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data (){
    return {
      exam:{},
      examNum:""
    }
  },
  ready(){
    //考试信息获取
    init.exam(function (e,r) {
      if(e!=null){
        _this.$vux.toast.show({
          text:e,
          type:"warn"
        });
        return;
      }
      _this.exam=r;
      _this.examNum=r.length;
    });
  }

}
</script>
<style>
  .exam p{
    font-size: 13px;
    color: #666;
  }
  .no-exam{
    text-align: center;
    margin-top: 50px;
  }
  .no-exam p{
    font-size: 23px;
    padding: 0 20px;
  }
</style>
