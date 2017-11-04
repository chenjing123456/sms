<template>
	<div class="courseInfo">
		<el-row class="header">

			<el-col :span='6'>
				<el-input v-model="keywords" placeholder="请输入关键字" suffix-icon="el-icon-date" v-on:change="submit">	
    			</el-input>

			</el-col>
			<!-- <el-col :span='18' class="saveOptions">
		        <el-button plain @click="handleSingleSave">单个录入</el-button>
		        <el-button plain>批量导入</el-button>
		    </el-col> -->
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
			          @click="handleEdit(scope.$index, scope.row)">选课</el-button>
			        
			      </template>
			    </el-table-column>
			    </el-table>
			</el-col>
		</el-row>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
	      <el-form :model="form">
	        <el-form-item label="课程">
	          <el-select v-model="form.course_id" placeholder="请选择">
			    <el-option
			      v-for="item in courses"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
	        </el-form-item>
	        
	        <el-form-item label="学生">
	          <el-select v-model="form.student_id" placeholder="请选择">
			    <el-option
			      v-for="item in students"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
	        </el-form-item>
			{{form}}
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
			...mapGetters(['studentcourses','courses','students'])
		},
		created(){
			this.findAllCourse();
			this.findAllStudent();
			this.findAllStudentCourse();
		},
		methods:{
			submit(){
				this.queryCourse(this.keywords);
			},
			handleSubmit(){
				console.log(this.form)
				this.dialogFormVisible = false;
				this.selectCourse({studentId:form.student_id,courseId:form.course_id})
			},
			handleEdit(index,row){
				this.dialogFormVisible = true;
			},
			
			...mapActions([
				'findAllStudentCourse',
				'findAllCourse',
				'findAllStudent',
				'queryCourse',
				'selectCourse'
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