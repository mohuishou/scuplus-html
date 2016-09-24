<template>
  <div class="exam">
    <timeline>
      <timeline-item>
        <h4>考试科目1</h4>
        <p>时间：2016-04-17（19周周六） 10:30~12:30</p>
        <p>地点：江安校区 一教A座A222</p>
        <p>座位号：29</p>
      </timeline-item>
       <timeline-item>
        <h4>考试科目2</h4>
        <p>时间：2016-04-17（19周周六） 10:30~12:30</p>
        <p>地点：江安校区 一教A座A222</p>
        <p>座位号：29</p>
      </timeline-item>
      <timeline-item>
        <h4>考试科目3</h4>
        <p>时间：2016-04-17（19周周六） 10:30~12:30</p>
        <p>地点：江安校区 一教A座A222</p>
        <p>座位号：29</p>
      </timeline-item>
    </timeline>
</div>

</template>

<script>
import {Timeline,TimelineItem }from 'vux/src/components/timeline'


export default {
  components: {
    Timeline,TimelineItem
  },
  data (){
    
  },
  
}
</script>
<style>
  .exam{

  }
  .exam p{
    font-size: 13px;
    color: #666;
  }
</style>
