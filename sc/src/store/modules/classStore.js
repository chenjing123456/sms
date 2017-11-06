import Vue from 'vue'
import axios from 'axios'
Vue.use(axios);
export default {
	state:{
		classes:[]
	},
	getters:{
		classes:state=>state.classes
	},
	mutations:{
		alterClass(state,data){
			state.classes = data
		}
	},
	actions:{
		findAllClass(context){
			axios.get('http://47.94.232.208:3389/clazz/findAll').then(({data})=>{
				context.commit('alterClass',data);	
			})
		},
		saveClass(context,form){
			return new Promise(function(reslove,reject){
					axios.post('http://47.94.232.208:3389/clazz/save',form).then((result)=>{
						context.dispatch('findAllClass');
						reslove(result);
				}).catch(function(error){
					reject(error);
				});
			})
		},
		updateClass(context,form){
			return new Promise((reslove,reject)=>{
				axios.post('http://47.94.232.208:3389/clazz/update',form).then((result)=>{
					context.dispatch('findAllClass');
					reslove(result);
				}).catch(function(error){
					reject(error);
				})
			})
			
		},
		batchDeleteClass(context,id){
			axios.post('http://47.94.232.208:3389/clazz/batchDelete',{ids:JSON.stringify(id)}).then((result)=>{
				context.dispatch('findAllClass');
			})
		},
		queryClass(context,keys){
			axios.get('http://47.94.232.208:3389/clazz/query/'+keys).then(({data})=>{
				context.commit('alterClass',data);
			})
		}
	}
}