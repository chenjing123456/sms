<template>
	<div class="studentInfo">
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
			      :data="students"
			      style="width: 100%">
			      <el-table-column
			        prop="name"
			        label="姓名"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="gender"
			        label="性别"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="birth"
			        :formatter="dateFormat"
			        label="出生年月">
			      </el-table-column>
			      <el-table-column
			        prop="class.name"
			        label="班级">
			      </el-table-column>
			      <el-table-column
			        prop="password"
			        label="密码">
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
	        <el-form-item label="姓名">
	          <el-input v-model="form.name"></el-input>
	        </el-form-item>
	        <el-form-item label="密码">
	          <el-input v-model="form.password"></el-input>
	        </el-form-item>
	        <el-form-item label="性别">
	          <el-radio v-model="form.gender" label="男">男</el-radio>
	          <el-radio v-model="form.gender" label="女">女</el-radio>
	        </el-form-item>
	        <el-form-item label="生日">
	          <el-date-picker
	            v-model="form.birth"
	            type="date"
	            placeholder="选择日期">
	          </el-date-picker>
	        </el-form-item>
	        <el-form-item label="班级">
	          <el-select v-model="form.class_id" placeholder="请选择">
			    <el-option
			      v-for="item in classes"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
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
	import moment from 'moment'
	import {mapGetters,mapActions} from 'vuex'

	export default {
		name:'studentInfo',
		data(){
			return {
				keywords:'',
				title:'',
				form:{},
				dialogFormVisible:false
			}
		},
		computed:{
			...mapGetters(['students','classes'])
		},
		created(){
			this.findAllStudent();
			this.findAllClass();
		},
		methods:{
			dateFormat:function(row,column){
				var date = row[column.property];
				if(date == undefined){
					return "";
				}
				return moment(date).format("YYYY-MM-DD");
			},
			submit(){
				console.log(this.keywords);
				this.queryStudent(this.keywords);
			},
			handleSingleSave(){
				this.title = '添加学生信息';
				this.dialogFormVisible = true;
				this.form = {};
			},
			handleEdit(index,row){
				this.title = '修改学生信息';
				this.dialogFormVisible = true;
				this.form = row;
			},
			handleSubmit(){
				this.dialogFormVisible = false;
				var vm = this;
				if(this.title =='添加学生信息'){
					this.saveStudent(this.form).then(function(){
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
				}else if(this.title=='修改学生信息'){
					this.updateStudent(this.form).then(function(){
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
			        	vm.batchDeleteStudent([row.id]);
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
				'findAllStudent',
				'findAllClass',
				'saveStudent',
				'updateStudent',
				'batchDeleteStudent',
				'queryStudent'
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
	.StudentInfo .header {
	    margin: 5px 0;
	}
</style>