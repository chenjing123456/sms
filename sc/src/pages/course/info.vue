<template>
	<div class="courseInfo">
		<el-row class="header">

			<el-col :span='6'>
				<el-input v-model="keywords" placeholder="请输入关键字" suffix-icon="el-icon-date" v-on:change="submit">	
    			</el-input>

			</el-col>
			<el-col :span='18' class="saveOptions">
		        <el-button plain @click="handleSingleSave">单个录入</el-button>
		        <el-button plain>批量导入</el-button>
		    </el-col>
		</el-row>
		<el-row	>
			<el-col class="content">
				<el-table 
			      :data="courses"
			      style="width: 100%">
			      
			      <el-table-column
			        prop="name"
			        label="课程"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="credit"
			        label="学分"
			        >
			      </el-table-column>
			      <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			    </el-table>
			</el-col>
		</el-row>	

		<el-dialog :title="title" :visible.sync="dialogFormVisible">
	      <el-form :model="form">
	        
	        <el-form-item label="课程">
	          
			  <el-input v-model="form.name"></el-input>
	        </el-form-item>
	        <el-form-item label="学分">
	          
			  <el-input v-model="form.credit"></el-input>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisible = false">取 消</el-button>
	        <el-button type="primary" @click="handleSubmit">确 定</el-button>
	      </div>
	    </el-dialog>

	</div>
</template>
<script type="text/javascript">
	import {mapGetters,mapActions} from 'vuex'

	export default {
		name:'courseInfo',
		data(){
			return {
				keywords:'',
				title:'',
				form:{},
				dialogFormVisible:false
			}
		},
		computed:{
			...mapGetters(['courses'])
		},
		created(){
			this.findAllCourse();
		},
		methods:{
			submit(){
				this.queryCourse(this.keywords);
			},
			handleSingleSave(){
				this.title = '添加课程信息';
				this.dialogFormVisible = true;
				this.form = {};
			},
			handleEdit(index,row){
				this.title = '修改课程信息';
				this.dialogFormVisible = true;
				this.form = row;
			},
			handleSubmit(){
				this.dialogFormVisible = false;
				var vm = this;
				if(this.title =='添加课程信息'){
					this.saveCourse(this.form).then(function(){
						vm.$message({
				            type: 'success',
				            message: '操作成功!'
				        });
					}).catch(function(){
						vm.$message({
			            type: 'error',
			            message: '操作失败!'
			          });
					})
				}else if(this.title=='修改课程信息'){
					this.updateCourse(this.form).then(function(){
						vm.$message({
				            type: 'success',
				            message: '操作成功!'
				        });
					}).catch(function(){
						vm.$message({
			            type: 'error',
			            message: '操作失败!'
			          });
					})
				}
				
			},
			handleDelete(index,row){
				var vm = this;
				 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          center: true
			        }).then(() => {
			        	vm.batchDeleteCourse([row.id]);
			          vm.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
			        }).catch(() => {
			          vm.$message({
			            type: 'info',
			            message: '已取消删除'
			          });
			        });
				
			},
			...mapActions([
				'findAllCourse',
				'saveCourse',
				'updateCourse',
				'batchDeleteCourse',
				'queryCourse'
			])
		}
	}
</script>

<style scoped>
	.header,.content{
		margin:10px;
	}
  	.saveOptions{
	    text-align: right;
	}
	.courseInfo .header {
	    margin: 5px 0;
	}
</style>