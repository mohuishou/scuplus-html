<template>
	<div id="search" v-show="!searchResult">

		<tab>
			<tab-item :selected="searchType==1" @click="searchType = 1">按课程搜索</tab-item>
			<tab-item :selected="searchType==2" @click="searchType = 2">按教师搜索</tab-item>
		</tab>

		<!-- 按教师搜索 -->
		<group v-show="searchType==2" id="search-teacher" class="search-input">
			<x-input title="教　师"  :value.sync="params.name" :show-clear=true placeholder="请输入教师姓名"></x-input>
			<selector placeholder="请选择学院" title="学院" :value.sync="params.college" :options="list" ></selector>
			<div class="weui_cell">
				<x-button class="search-btn" :text="btnText" :disabled="isDisabled" @click="search" plain></x-button>
			</div>

			<div class="tips">
				<p>Tips:</p>
				<p>以上所有选项都不是必填项</p>
			</div>
		</group>

		<!-- 按学院搜索 -->
		<group v-show="searchType==1" id="search-course" class="search-input">
			<x-input title="课程名" :value.sync="params.name" :show-clear=true placeholder="请输入课程名"></x-input>
			<x-input title="教　师" :value.sync="params.teacher_name" :show-clear=true placeholder="请输入教师姓名"></x-input>

    	<selector placeholder="请选择学院" :value.sync="params.college" title="学院" :options="list" ></selector>

    	<selector placeholder="请选上课星期" :value.sync="params.day" title="星期" :options="dayList" ></selector>

    	<selector placeholder="请选上课节次" :value.sync="params.session" title="节次" :options="sessionList" ></selector>
	
    	<selector placeholder="请选排序方式(逆序)" :value.sync="params.order" title="排序" :options="orderList" ></selector>
			
			
			<div class="weui_cell">
				<x-button class="search-btn" :text="btnText" :disabled="isDisabled" @click="search" plain></x-button>
			</div>

			<div class="tips">
				<p>Tips:</p>
				<p>以上所有选项都不是必填项</p>
			</div>
		</group>
	</div>

	<div id="search-result" v-if="searchResult">
		<scroller id="course-scroller" :pullup-config="pullupConfig" @pullup:loading="load" style="height:100%;"  lock-x scrollbar-y use-pullup>
		    <div id="course-box">
		        <div v-if="!isTeacher" v-for="item in items">
		            <card :footer="{title:'查看更多',link:item.clink}">
		                <div class="weui_panel_hd panel-title" slot="header">
		                    <h3>
		                        {{item.name}}<span class="star-num"> / {{item.avg_star}}</span>
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

		        <div v-if="isTeacher" v-for="teacher in teacherItems">
		        	<card>
		        	    <div class="weui_panel_hd panel-title" slot="header">
		        	        <h3>
		        	            {{teacher.name}}<span class="star-num"> / {{teacher.avg_star}}</span>
		        	            <rater :font-size="13" :value="teacher.avg_star" class="rater" disabled="">
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
		        	                    {{teacher.avg_grade}}
		        	                </span>
		        	            </span>
		        	            <span class="badge">
		        	                <span style="background: #666666;">
		        	                    上课人次
		        	                </span>
		        	                <span style="background: #99CC66;">
		        	                    {{teacher.count_grade}}
		        	                </span>
		        	            </span>
		        	            <span class="badge">
		        	                <span style="background: #35495e;">
		        	                    评教人次
		        	                </span>
		        	                <span style="background: #FF9933;">
		        	                    {{teacher.count_star}}
		        	                </span>
		        	            </span>
		        	            <span class="badge">
		        	                <span style="background: #666666;">
		        	                    挂科率
		        	                </span>
		        	                <span style="background: #99CC66;">
		        	                    {{teacher.pass_rate? (1-teacher.pass_rate)*100 : "无"}}%
		        	                </span>
		        	            </span>
		        	        </div>
		        	        <div class="assistant-content">
		        	            <p>
		        	                <span class="assistant-content-title">
		        	                    学院：
		        	                </span>
		        	                {{teacher.college}}
		        	            </p>
		        	            <p>
		        	                <span class="assistant-content-title">
		        	                   课程：
		        	                </span>
		        	                <x-button class="assistant-content-teacher" mini="" v-link="c.link" plain="" v-for="c in teacher.course">
		        	                    {{c.name}}
		        	                </x-button>
		        	            </p>
		        	        </div>
		        	    </div>
		        	</card>
		        </div>
		    </div>
		</scroller>
	</div>

	<div v-show="isResult" id="search-switch">
		<div class="icon" @click="searchSwitch">
			<img src="./assets/img/switch.png">
		</div>
	</div>

</template>

<script>
	import XInput from 'vux/src/components/x-input'
	import Group from 'vux/src/components/group'
	import XButton from 'vux/src/components/x-button'
	import Selector from 'vux/src/components/selector'
	import { Tab,TabItem } from 'vux/src/components/tab'
	import Card from 'vux/src/components/card'
  import Rater from 'vux/src/components/rater'
  import {Flexbox, FlexboxItem} from 'vux/src/components/flexbox'
  import Scroller from 'vux/src/components/scroller'
	import common from "./js/common"
	import college from "./js/college"
	

	const dayList=[
		{
			key:"1",
			value:"星期一"
		},
		{
			key:"2",
			value:"星期二"
		},
		{
			key:"3",
			value:"星期三"
		},
		{
			key:"4",
			value:"星期四"
		},
		{
			key:"5",
			value:"星期五"
		},
		{
			key:"6",
			value:"星期六"
		},
		{
			key:"7",
			value:"星期天"
		}
	];

	const sessionList=[
		{
			key:"1",
			value:"第一大节(上午)"
		},
		{
			key:"2",
			value:"第二大节(上午)"
		},
		{
			key:"3",
			value:"第三大节(下午)"
		},
		{
			key:"4",
			value:"第四大节(下午)"
		},
		{
			key:"5",
			value:"第五大节(晚上)"
		},
	];

	const orderList=[
		{
			key:"avg_star",
			value:"平均得分"
		},
		{
			key:"avg_grade",
			value:"平均成绩"
		},
		{
			key:"count_grade",
			value:"上课人数"
		},
		{
			key:"pass_rate",
			value:"挂科率(顺序)"
		}
	];

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

	function teacher(data){
		let str,spstr;
	    for (let i = 0; i < data.length; i++) {
	        //课程详情链接
	        //课程教师链接
	        for(let j=0;j<data[i].course.length;j++){
	          data[i].course[j].link="/assistant?tid="+data[i].id+"&cid="+data[i].course[j].id;
	        }
	    }
	    return data;
	}
	export default {
		components: {
			XInput,
			Group,
			XButton,
			Tab,
			TabItem,
			Selector,Card,Rater,Flexbox,FlexboxItem,Scroller
		},
		data () {
			return {
				btnText: "搜索",
				isDisabled: false,
				searchType: 1,
				searchResult:false,
				dayList:dayList,
				sessionList:sessionList,
				orderList:orderList,
				list:college.main,
				params:{},
				items:[{}],
				teacherItems:[{}],
				page:1,
				pullupConfig: {
				    content: '上拉加载更多',
				    downContent: '松开进行加载',
				    upContent: '上拉加载更多',
				    loadingContent: '加载中...'
				},
				isResult:false,
				isTeacher:false
			}
		},
		methods: {
			search: function() {
				const _this = this;
				this.page=1;
				this.isTeacher=false;
				this.isResult=true;
				let url="/jwc/course";
				this.btnText = "搜索中请稍候...";
				this.isDisabled=true;
				if(this.searchType==2){
					url="/jwc/teacher";
				}
				common.post(url,this.params,function(e,r){
					setTimeout(function() {
						_this.btnText = "搜索";
						_this.isDisabled=false;
					},700);
					if(e!=null){
			      _this.$vux.toast.show({
			        text:e,
			        type:"warn"
			      });
			      return ;
			    }
			    let d=r.data.data;
			    if (!d[0].allWeek) {
			    	_this.teacherItems=teacher(d);
			    	_this.isTeacher=true;
			    }else{
			    	_this.items=course(d);
			    }
			    
			    _this.searchResult=true;
				});
			},
			load (uuid) {
						if(this.page==1){
							this.page=2;
						}
            let url="/jwc/course?page="+this.page;
            if(this.searchType==2){
							url="/jwc/teacher?page="+this.page;
						}
            let _this=this;
            common.post(url,this.params,function(e,r){
            	if(r.data.current_page>=r.data.last_page){
            	    _this.$vux.toast.show({
            	        text:"没有数据了",
            	        type:"success"
            	    });
            	    _this.$broadcast('pullup:done',uuid);
            	    return ;
            	}
               if(e!=null){
                _this.$vux.toast.show({
                    text:e,
                    type:"warn"
                });
               }else{
               			let d=r.data.data;
               			if (!d[0].allWeek) {
               				d=teacher(d);
               				_this.isTeacher=true;
               				for(let i=0;i<d.length;i++){
               				  _this.teacherItems.push(d[i]);
               				}

               			}else{
               				d=course(d);
               				for(let i=0;i<d.length;i++){
               				  _this.items.push(d[i]);
               				}
               			}
                    
                    _this.$broadcast('pullup:reset',uuid);
                    _this.page+=1;

               }
                console.log(r);
            });
      },
      searchSwitch:function(){
      	this.searchResult=!this.searchResult;
      }
		},
		ready(){
			//登录检测
			let _this=this;
			common.isLogin(function(e,r) {
			 	if(e!=null){
			      _this.$vux.toast.show({
			        text:e,
			        type:"warn"
			      });
			    }
			  });
		}
	}
</script>
<style>
	#search-switch{
		position: absolute;
		right:10px;
		bottom:70px;
	}
	.icon{
		width: 50px;
		height: 50px;
		border-radius:25px;
		background:rgba(53,73,94,0.7);
		text-align: center;
	}
	.icon img{
		margin-top:12.5px; 
		text-align: center;
		width:25px;
	}
	#search-result{
	  height: 100%;
	  overflow: hidden;
	}
	.search-input> div {
		margin-top: 0px;
		padding-top: 5px;
	}
	
	.tips {
		padding: 10px 15px;
		font-size: 13px;
		color: #999;
	}

	.checker-popup{
		background: #fff;
	}
	
	.checker {
		margin-left: 15px;
		padding-right: 15px;
		padding-top: 10px;
		padding-bottom: 10px;
		border-top: 1px solid #ececec;
	}
	
	.checker-item {
		display: inline-block;
		border: 1px solid #ececec;
		padding: 5px 15px;
		background-color: #fff;
	}
	
	.checker-item-selected {
		border: 1px solid green;
	}
	
	.order-item {
		display: inline-block;
		width: 90px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		border-radius: 2px;
		border: 1px solid #ccc;
		background-color: #fff;
		margin-right: 6px;
		font-size: 14px;
		margin-top: 5px;
	}
	
	.order-item-selected {
		border: 1px solid green;
	}
</style>