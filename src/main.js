import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import Login from './Login'
import Assistant from './Assistant'
import Search from './Search'
import Exam from './Exam'
import Grade from './Grade'
import Schedule from './Schedule'
import Register from './Register'
import BindJwc from './BindJwc'
import User from './User'

Vue.use(Router);
const router = new Router({
	transitionOnLoad: false,
	suppressTransitionError: true
});

router.map({
	'/': {
		component: Assistant
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
	'/user':{
		component:User
	}
});

router.start(App, '#app');