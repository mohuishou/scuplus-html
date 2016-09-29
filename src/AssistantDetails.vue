<template>
    <div id="assistant-details">
        <scroller id="course-scroller" :pullup-config="pullupConfig" @pullup:loading="load" style="height:100%;"  lock-x scrollbar-y use-pullup>
            <div id="course-box">
                <div v-for="item in items">
                    <card :footer="{title:'查看更多',link:item.clink}">
                        <div class="weui_panel_hd panel-title" slot="header">
                            <h3>
                                {{item.name}}
                                <rater :font-size="13" :value="item.avg_star" class="rater" disabled="">
                                </rater>
                            </h3>
                        </div>
                        <div class="card-padding" slot="content">
                            <div class="assistant-badge">
                                <span class="badge">
                                    <span style="background: #35495e;">
                                        平均分
                                    </span>
                                    <span style="background: #FF9933">
                                        {{item.avg_grade}}
                                    </span>
                                </span>
                                <span class="badge">
                                    <span style="background: #666666;">
                                        上课人次
                                    </span>
                                    <span style="background: #99CC66;">
                                        {{item.count_grade}}
                                    </span>
                                </span>
                                <span class="badge">
                                    <span style="background: #35495e;">
                                        评教人次
                                    </span>
                                    <span style="background: #FF9933;">
                                        {{item.count_star}}
                                    </span>
                                </span>
                                <span class="badge">
                                    <span style="background: #666666;">
                                        挂科率
                                    </span>
                                    <span style="background: #99CC66;">
                                        {{item.pass_rate? (1-item.pass_rate)*100 : "无"}}%
                                    </span>
                                </span>
                            </div>
                            <div class="assistant-content">
                                <flexbox>
                                    <flexbox-item>
                                        <p>
                                            <span class="assistant-content-title">
                                                周次：
                                            </span>
                                            {{item.allWeek}}
                                        </p>
                                    </flexbox-item>
                                    <flexbox-item>
                                        <p>
                                            <span class="assistant-content-title">
                                                星期：
                                            </span>
                                            {{item.day}}
                                        </p>
                                    </flexbox-item>
                                </flexbox>
                                <flexbox>
                                    <flexbox-item>
                                        <p>
                                            <span class="assistant-content-title">
                                                节次：
                                            </span>
                                            {{item.session}}
                                        </p>
                                    </flexbox-item>
                                    <flexbox-item>
                                        <p>
                                            <span class="assistant-content-title">
                                                校区：
                                            </span>
                                            {{item.campus}}
                                        </p>
                                    </flexbox-item>
                                </flexbox>
                                <p>
                                    <span class="assistant-content-title">
                                        学院：
                                    </span>
                                    {{item.college}}
                                </p>
                                <p>
                                    <span class="assistant-content-title">
                                        教师：
                                    </span>
                                    <x-button class="assistant-content-teacher" mini="" v-link="t.tlink" plain="" v-for="t in item.teacher">
                                        {{t.name}}
                                    </x-button>
                                </p>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
    import Card from 'vux/src/components/card'
    import Rater from 'vux/src/components/rater'
    import XButton from 'vux/src/components/x-button'
    import {Flexbox, FlexboxItem} from 'vux/src/components/flexbox'
    import Scroller from 'vux/src/components/scroller'
    import common from "./js/common"

    function course(data){
        let str,spstr;
        for (let i = 0; i < data.length; i++) {
            //周次转换
            str=data[i].allWeek;
            spstr = str.split(",");
            data[i].allWeek=spstr[0]+"-"+spstr[spstr.length-1]+"周";
            //课程详情链接
            data[i].clink="/assistant?cid="+data[i].id;
            //课程教师链接
            for(let j=0;j<data[i].teacher.length;j++){
              data[i].teacher[j].tlink="/assistant?cid="+data[i].id+"&tid="+data[i].teacher[j].id;
            }
        }
        return data;
    }
    export default {
      components: {
        Card,Rater,XButton,Flexbox,FlexboxItem,Scroller
      },
      methods: {
         load (uuid) {
            
         }
              
        },
      data (){
        return {
            items:[{}],
            page:1,
            params:'',            
            pullupConfig: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            }
        }
      },
      //数据初始化
      ready(){
        this.params=this.$route.query;
        let courseUrl="http://api.scuplus.cn/jwc/evaluate";
        let _this=this;
        console.log(this.params);
        common.get(courseUrl,this.params,function(e,r){
           if(e!=null){
            _this.$vux.toast.show({
                text:e,
                type:"warn"
            });
           }else{
                _this.$set("items",r.data.data);
                console.log(r.data);
           }
            console.log(r);
        });
      },
      computed: {
    }  
  }
</script>
<style>
    #assistant{
/*      height: -moz-calc(100% - 40px);
      height: -webkit-calc(100% - 90px);*/
      height: 100%;
      overflow: hidden;
    }
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