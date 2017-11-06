import Vue from 'vue'
import axios from 'axios'
Vue.use(axios);
export default {
	state:{
		courses:[]
	},
	getters:{
		courses:state=>state.courses
	},
	mutations:{
		alterCourse(state,data){
			state.courses = data
		}
	},
	actions:{
		findAllCourse(context){
			axios.get('http://47.94.232.208:3389/course/findAll').then(({data})=>{
				context.commit('alterCourse',data);	
			})
		},
		saveCourse(context,form){
			return new Promise(function(reslove,reject){
					axios.post('http://47.94.232.208:3389/course/save',form).then((result)=>{
						context.dispatch('findAllCourse');
						reslove(result);
				}).catch(function(error){
					reject(error);
				});
			})
		},
		updateCourse(context,form){
			return new Promise((reslove,reject)=>{
				axios.post('http://47.94.232.208:3389/course/update',form).then((result)=>{
					context.dispatch('findAllCourse');
					reslove(result);
				}).catch(function(error){
					reject(error);
				})
			})
			
		},
		batchDeleteCourse(context,id){
			axios.post('http://47.94.232.208:3389/course/batchDelete',{ids:JSON.stringify(id)}).then((result)=>{
				context.dispatch('findAllCourse');
			})
		},
		queryCourse(context,keys){
			axios.get('http://47.94.232.208:3389/course/query/'+keys).then(({data})=>{
				context.commit('alterCourse',data);
			})
		}
	}
}