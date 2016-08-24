import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import Login from './Login'
import Assistant from './Assistant'
import Search from './Search'

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
	}
});

router.start(App, '#app');