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
				<x-button class="search-btn" :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
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
				<x-button class="search-btn" :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
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
		        <div v-for="item in items">
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
		    </div>
		</scroller>
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
				params:{}
			}
		},
		methods: {
			login: function() {
				const _this = this;
				console.log(this.params);
				let url="/jwc/course";
				// this.btnText = "搜索中请稍候...";
				// this.isDisabled=true;
				if(this.searchType==2){
					url="/jwc/teacher";
				}
				common.post(url,this.params,function(e,r){
					if(e!=null){
			      _this.$vux.toast.show({
			        text:e,
			        type:"warn"
			      });
			      return ;
			    }


				});
				
			}
		},
		ready(){
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