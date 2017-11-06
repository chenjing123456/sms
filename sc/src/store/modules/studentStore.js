import Vue from 'vue'
import axios from 'axios'

Vue.use(axios);

//export studentStore to index.js as studentStore
export default {
	state:{
		students:[]
	},
	getters:{
		/*
		students(state){
			return state.students;
		}*/
		students:(state)=>state.students
	},
	//不能执行异步
	mutations:{
		alterStudent(state,data){
			state.students = data;
		}
	},
	actions:{
		findAllStudent(context){
			axios.get('http://47.94.232.208:3389/student/findAll').then(({data})=>{
				context.commit('alterStudent',data);
			})
		},
		saveStudent(context,form){
			return new Promise(function(reslove,reject){
					axios.post('http://47.94.232.208:3389/student/save',form).then((result)=>{
						context.dispatch('findAllStudent');
						reslove(result);
				}).catch(function(error){
					reject(error);
				});
			})
		},
		updateStudent(context,form){
			return new Promise((reslove,reject)=>{
				axios.post('http://47.94.232.208:3389/student/update',form).then((result)=>{
					context.dispatch('findAllStudent');
					reslove(result);
				}).catch(function(error){
					reject(error);
				})
			})
			
		},
		batchDeleteStudent(context,id){
			axios.post('http://47.94.232.208:3389/student/batchDelete',{ids:JSON.stringify(id)}).then((result)=>{
				context.dispatch('findAllStudent');
			})
		},
		queryStudent(context,keys){
			axios.get('http://47.94.232.208:3389/student/query/'+keys).then(({data})=>{
				context.commit('alterStudent',data);
			})
		}
	}
}