<template>
	<div id="search">

		<tab>
			<tab-item :selected="searchType==1" @click="searchType = 1">按课程搜索</tab-item>
			<tab-item :selected="searchType==2" @click="searchType = 2">按教师搜索</tab-item>
		</tab>
		<group v-show="searchType==1" id="search-course" class="search-input">
			<x-input title="课程名" :show-clear=true placeholder="请输入课程名"></x-input>
			<x-input title="教　师" :show-clear=true placeholder="请输入教师姓名"></x-input>
			<cell title="星　期" :value="day"></cell>
			<checker :value.sync="day" class="checker" default-item-class="checker-item" selected-item-class="checker-item-selected">
				<checker-item v-for="i in [1,2,3,4,5,6,7]" :value="i">{{i}}</checker-item>

			</checker>
			<cell title="节　次(大节)" :value="session"></cell>
			<checker :value.sync="session" class="checker" default-item-class="checker-item" selected-item-class="checker-item-selected">
				<checker-item v-for="i in [1,2,3,4,5]" :value="i">{{i}}</checker-item>
			</checker>
			<cell title="排　序(倒序)" :value="order"></cell>
			<checker :value.sync="order" class="checker" default-item-class="order-item" selected-item-class="order-item-selected">
				<checker-item value="avg_grade">平均成绩</checker-item>
				<checker-item value="avg_star">平均得分</checker-item>
				<checker-item value="count_grade">上课人次</checker-item>
				<checker-item value="count_star">评教人次</checker-item>
				<checker-item value="pass_rate">挂科率</checker-item>
			</checker>
			<popup :show.sync="showPopup" class="checker-popup">
				<div style="padding:10px 10px 40px 10px;">
					<p style="padding: 5px 5px 5px 2px;color:#888;">Colors</p>
					<checker :value.sync="demo4" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled" @on-item-click="showPopup=false">
						<checker-item value="花跟叶">花跟叶</checker-item>
						<checker-item value="鸟与树">鸟与树</checker-item>
						<checker-item value="我和你">我和你</checker-item>
						<checker-item value="全套礼品装" disabled>全套礼品装</checker-item>
					</checker>
				</div>
			</popup>

			<div class="weui_cell">
				<x-button class="search-btn" :text="btnText" :disabled="isDisabled" @click="login" plain></x-button>
			</div>

			<div class="tips">
				<p>Tips:</p>
				<p>以上所有选项都不是必填项</p>
			</div>
		</group>

	</div>

</template>

<script>
	import XInput from 'vux/src/components/x-input'
	import Group from 'vux/src/components/group'
	import XButton from 'vux/src/components/x-button'
	import Cell from 'vux/src/components/cell'
	import Popup from 'vux/src/components/popup'
	import {Tab,TabItem} from 'vux/src/components/tab'
	import {Checker,CheckerIte } from 'vux/src/components/checker'
	export default {
		components: {
			XInput,
			Group,
			XButton,
			Checker,
			CheckerItem,
			Cell,
			Tab,
			TabItem,Popup
		},
		data() {
			return {
				btnText: "搜索",
				isDisabled: false,
				day: "请选择",
				session: "请选择",
				order: "请选择",
				searchType: 1,
				showPopup:0
			}
		},
		methods: {
			login: function() {
				const _this = this;
				this.btnText = "搜索中请稍候...";
				//  this.isDisabled=true;
			}
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