import Vue from 'vue'
import axios from 'axios'
Vue.use(axios);
export default {
	state:{
		studentcourses:[]
	},
	getters:{
		studentcourses:state=>state.studentcourses
	},
	mutations:{
		alterstudentCourse(state,data){
			state.studentcourses = data
		}
	},
	actions:{
		findAllStudentCourse(context){
			axios.get('http://47.94.232.208:3389/sc/findSelectedCourse').then(({data})=>{
				context.commit('alterstudentCourse',data);	
			})
		},
		saveStudentCourse(context,form){
			return new Promise(function(reslove,reject){
					axios.post('http://47.94.232.208:3389/sc/save',form).then((result)=>{
						context.dispatch('findAllStudentCourse');
						reslove(result);
				}).catch(function(error){
					reject(error);
				});
			})
		},
		updateStudentCourse(context,form){
			return new Promise((reslove,reject)=>{
				axios.get('http://47.94.232.208:3389/sc/mark?id='+form.id+'&grade='+form.grade+'').then((result)=>{
					context.dispatch('findAllStudentCourse');
					reslove(result);
				}).catch(function(error){
					reject(error);
				})
			})
			
		},
		batchDeleteStudentCourse(context,id){
			axios.get('http://47.94.232.208:3389/sc/cancelCourse?studentId='+id.sid+'&courseId='+id.cid+'').then((result)=>{
				context.dispatch('findAllStudentCourse');
			})
		},
		queryStudentCourse(context,keys){
			axios.get('http://47.94.232.208:3389/sc/query/'+keys).then(({data})=>{
				context.commit('alterstudentCourse',data);
			})
		},
		selectCourse(context,form){
			axios.get('http://47.94.232.208:3389/sc/selectCourse?studentId='+form.studentId+'&courseId='+form.courseId+'').then((result)=>{
				context.dispatch('findAllCourse');
			})
		}
	}
}