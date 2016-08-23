<template>
    <div id="assistant">
    <div v-for="item in items">
        <card :footer="{title:'查看更多',link:'/component/panel'}">
            <div slot="header" class="weui_panel_hd panel-title">
                <h3>软件工程
                    <rater class="rater" :value=4 :font-size=13 disabled></rater>
                </h3>
            </div>
            <div slot="content" class="card-padding">
                <div class="assistant-badge">
                    <span class="badge">
                        <span style="background: #35495e;">平均分</span><span style="background: #FF9933" >80.5</span>
                    </span>
                    <span class="badge">
                       <span style="background: #666666;">上课人次</span><span style="background: #99CC66;">35</span>
                    </span>
                    <span class="badge">
                       <span  style="background: #35495e;">评教人次</span><span  style="background: #FF9933;">28</span>
                    </span>
                    <span class="badge">
                          <span  style="background: #666666;">挂科率</span><span style="background: #99CC66;">6.5%</span>
                    </span>
                </div>
                <div class="assistant-content">
                    <flexbox>
                        <flexbox-item>
                            <p><span class="assistant-content-title">周次：</span>1-17周</p>
                        </flexbox-item>
                        <flexbox-item>
                            <p><span class="assistant-content-title">星期：</span>5</p>
                        </flexbox-item>
                    </flexbox>
                    <flexbox>
                        <flexbox-item>
                            <p><span class="assistant-content-title">节次：</span>第一大节</p>
                        </flexbox-item>
                        <flexbox-item>
                            <p><span class="assistant-content-title">校区：</span>江安</p>
                        </flexbox-item>
                    </flexbox>
                    <p><span class="assistant-content-title">学院：</span>电子信息学院</p>
                    <p>
                        <span class="assistant-content-title">教师：</span>
                        <x-button mini plain class="assistant-content-teacher">啦啦</x-button>
                        <x-button mini plain class="assistant-content-teacher">啦啦</x-button>
                        <x-button mini plain class="assistant-content-teacher">啦啦</x-button>
                        <x-button mini plain class="assistant-content-teacher">啦啦</x-button>
                    </p>
                </div>

                
            </div>
        </card>
    </div>
        
    </div>
</template>

<script>
    import Card from 'vux/src/components/card'
    import Rater from 'vux/src/components/rater'
    import XButton from 'vux/src/components/x-button'
    import {Flexbox, FlexboxItem} from 'vux/src/components/flexbox'
    export default {
      components: {
        Card,Rater,XButton,Flexbox,FlexboxItem
      },
      data (){
        return {
            items:[
                {
                    name:"软件工程",
                    avg_grade:95.6,
                    avg_satr:4.5,
                    count_grade:35,
                    count_star:20,
                    fail_rate:6.5
                },
                {
                    name:"软件工程",
                    avg_grade:95.6,
                    avg_satr:4.5,
                    count_grade:35,
                    count_star:20,
                    fail_rate:6.5
                }
                ,
                {
                    name:"软件工程",
                    avg_grade:95.6,
                    avg_satr:4.5,
                    count_grade:35,
                    count_star:20,
                    fail_rate:6.5
                }
                ,
                {
                    name:"软件工程",
                    avg_grade:95.6,
                    avg_satr:4.5,
                    count_grade:35,
                    count_star:20,
                    fail_rate:6.5
                }
                ,
                {
                    name:"软件工程",
                    avg_grade:95.6,
                    avg_satr:4.5,
                    count_grade:35,
                    count_star:20,
                    fail_rate:6.5
                }
            ]
        }
      }    }
</script>

<style>
    #assistant .panel-title .rater{
        float:right;
    }
    #assistant .card-padding{
        padding:10px 15px;
    }
    #assistant .badge{
        display: inline-block;
    }
    #assistant .badge span{
        font-size: 13px;
        padding:3px;
        color: #eee;
    }
    #assistant .assistant-content{
        margin-top: 10px;
        font-size: 14px;
        color: #888888;
    }
    #assistant .assistant-content p{
        margin-top: 4px;
        margin-bottom: 4px;
    }
    .assistant-content-teacher{
        font-size: 12px !important;
    }
</style>