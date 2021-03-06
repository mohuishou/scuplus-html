
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

//教务处相关
import Assistant from './jwc/Assistant'
import AssistantDetails from './jwc/AssistantDetails'
import Search from './jwc/Search'
import Exam from './jwc/Exam'
import Grade from './jwc/Grade'
import Schedule from './jwc/Schedule'
import Evaluation from './jwc/Evaluation'
import Evaluate from './jwc/Evaluate'

//用户相关
import Login from './user/Login'
import Register from './user/Register'
import BindJwc from './user/BindJwc'
import BindLibrary from './user/BindLibrary'
import User from './user/User'
import Forgot from './user/Forgot'
import Bind from './user/Bind'

//图书馆相关
import LibraryNow from './library/Now'
import LibraryHistory from './library/History'

import ToastPlugin from 'vux/src/plugins/toast'
Vue.use(Router);
Vue.use(ToastPlugin)
const router = new Router({
	transitionOnLoad: false,
	suppressTransitionError: true
});

router.map({
	'/': {
		component: Assistant
	},
	'/assistant':{
		component: AssistantDetails
	},
	'/login': {
		component: Login
	},
	'/search':{
		component: Search
	},
	'/exam':{
		component: Exam
	},
	'/grade':{
		component: Grade
	},
	'/schedule':{
		component: Schedule
	},
	'/register':{
		component:Register
	},
	'/bind-jwc':{
		component:BindJwc
	},
	'forgot':{
		component:Forgot
	},
	'/user':{
		component:User
	},
	'/bind':{
		component:Bind
	},
	'/bind-library':{
		component:BindLibrary
	},
	'/evaluation':{
		component:Evaluation
	},
	'/evaluate':{
		component:Evaluate
	},
	'/library/now':{
		component:LibraryNow
	},
	'/library/history':{
		component:LibraryHistory
	}
});

router.start(App, '#app');
