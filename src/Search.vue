<template>
	<div id="search">

		<tab>
			<tab-item :selected="searchType==1" @click="searchType = 1">按课程搜索</tab-item>
			<tab-item :selected="searchType==2" @click="searchType = 2">按教师搜索</tab-item>
		</tab>

		<!-- 按教师搜索 -->
		<group v-show="searchType==2" id="search-teacher" class="search-input">
			<x-input title="教　师" :show-clear=true placeholder="请输入教师姓名"></x-input>
			<selector placeholder="请选择学院" title="学院" :options="list" ></selector>
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
			<x-input title="课程名" :show-clear=true placeholder="请输入课程名"></x-input>
			<x-input title="教　师" :show-clear=true placeholder="请输入教师姓名"></x-input>

    		<selector placeholder="请选择学院" title="学院" :options="list" ></selector>


			<!-- 星期 -->
			<cell title="星　期" @click="dayPopup=true" :value="day"></cell>
			<popup :show.sync="dayPopup" class="checker-popup">
				<checker :value.sync="day" class="checker" default-item-class="checker-item" selected-item-class="checker-item-selected" @on-item-click="dayPopup=false">
					<checker-item v-for="i in [1,2,3,4,5,6,7]" :value="i">{{i}}</checker-item>
				</checker>
			</popup>

			<!-- 节次 -->
			<cell @click="sessionPopup=true" title="节　次(大节)" :value="session"></cell>
			<popup :show.sync="sessionPopup" class="checker-popup">
				<checker @on-item-click="sessionPopup=false" :value.sync="session" class="checker" default-item-class="checker-item" selected-item-class="checker-item-selected">
					<checker-item v-for="i in [1,2,3,4,5]" :value="i">{{i}}</checker-item>
				</checker>
			</popup>

			<!-- 排序 -->
			<cell @click="orderPopup=true" title="排　序(倒序)" :value="order"></cell>
			<popup  :show.sync="orderPopup" class="checker-popup">
				<checker @on-item-click="orderPopup=false" :value.sync="order" class="checker" default-item-class="order-item" selected-item-class="order-item-selected">
					<checker-item v-for="i in ['平均成绩','平均得分','评教人次','上课人次','挂科率']" :value="i">{{i}}</checker-item>
				</checker>
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

	const collegeLists=[
		'电子'
	];
	for (var i = 20; i >= 0; i--) {
		collegeLists[i]=i;
	}

	import XInput from 'vux/src/components/x-input'
	import Group from 'vux/src/components/group'
	import XButton from 'vux/src/components/x-button'
	import Popup from 'vux/src/components/popup'
	// import PopupPicker from 'vux/src/components/popup-picker'
	// import Picker from 'vux/src/components/picker'
	import Cell from 'vux/src/components/cell'
	import Selector from 'vux/src/components/selector'
	import { Tab,TabItem } from 'vux/src/components/tab'
	import { Checker,CheckerItem } from 'vux/src/components/checker'
	
	export default {
		components: {
			XInput,
			Group,
			XButton,
			Checker,
			CheckerItem,
			Cell,
			Tab,
			TabItem,
			Popup,
			Selector,
			// PopupPicker,
			// Picker
		},
		data () {
			return {
				btnText: "搜索",
				isDisabled: false,
				day: "请选择",
				session: "请选择",
				order: "请选择",
				searchType: 1,
				dayPopup:false,
				sessionPopup:false,
				orderPopup:false,
				list:collegeLists,
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