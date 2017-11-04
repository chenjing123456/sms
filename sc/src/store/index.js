import Vue from 'vue'
import Vuex from 'vuex'
import studentStore from './modules/studentStore'
import courseStore from './modules/courseStore'
import classStore from './modules/classStore'
import studentcourseStore from './modules/studentcourseStore'
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		studentStore,
		courseStore,
		classStore,
		studentcourseStore
	}
})