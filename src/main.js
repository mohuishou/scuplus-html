import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import Login from './Login'
import Assistant from './Assistant'

Vue.use(Router);



const router = new Router({
  transitionOnLoad: false,
  suppressTransitionError: true
});

router.map({
  '/': {
    component:Assistant
  },
  '/login': {
    component:Login
  }
});

router.start(App, '#app');