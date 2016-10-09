
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import Login from './Login'
import Assistant from './Assistant'
import AssistantDetails from './AssistantDetails'
import Search from './Search'
import Exam from './Exam'
import Grade from './Grade'
import Schedule from './Schedule'
import Register from './Register'
import BindJwc from './BindJwc'
import User from './User'
import Forgot from './Forgot'


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
	}
});

router.start(App, '#app');