<template>
	<div class="studentcourse">
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
			      :data="studentcourses"
			      style="width: 100%">
			      
			      <el-table-column
			        prop="s.name"
			        label="姓名"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="c.name"
			        label="课程名"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="sc.grade"
			        label="成绩"
			        >
			      </el-table-column>
			      <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">打分</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">取消选课</el-button>
			      </template>
			    </el-table-column>
			    </el-table>
			</el-col>
		</el-row>	

		<el-dialog :title="title" :visible.sync="dialogFormVisible">
	      <el-form :model="form">
	        
	        <el-form-item label="学分">
	          
			  <el-input v-model="form.grade"></el-input>
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
		name:'studentcourse',
		data(){
			return {
				keywords:'',
				title:'',
				form:{},
				dialogFormVisible:false
			}
		},
		computed:{
			...mapGetters(['studentcourses'])
		},
		created(){
			this.findAllStudentCourse();
		},
		methods:{
			submit(){
				this.queryStudentCourse(this.keywords);
			},
			handleSingleSave(){
				this.title = '添加选课信息';
				this.dialogFormVisible = true;
				this.form = {};
			},
			handleEdit(index,row){
				this.title = '修改选课信息';
				this.dialogFormVisible = true;
				this.form = row.sc;

				console.log(row.sc)
				// this.form.grade = row.sc.grade;
			},
			handleSubmit(){
				this.dialogFormVisible = false;
				var vm = this;
				var id = vm.form.student_id;
				var grade = vm.form.grade;
				console.log(id,grade);
				if(this.title =='添加选课信息'){
					this.saveStudentCourse(this.form).then(function(){
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
				}else if(this.title=='修改选课信息'){
					this.updateStudentCourse({id:id,grade:grade}).then(function(){
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
				var sid = row.s.id;
				var cid = row.c.id;
				// console.log(row.c.id)
				 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          center: true
			        }).then(() => {
			        	vm.batchDeleteStudentCourse({sid:sid,cid:cid});
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
				'findAllStudentCourse',
				'saveStudentCourse',
				'updateStudentCourse',
				'batchDeleteStudentCourse',
				'queryStudentCourse'
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
	.studentcourse .header {
	    margin: 5px 0;
	}
</style>