<template>
	<div id="wrapper" style="background-color: #f5f6f9;">
		<!-- /. NAV SIDE  -->
			<!-- 搜索 -->
			<div class="container-fluid" >
				<div style="width:96%; height: 40px; margin-top: 20px; margin-left: 2%;">
					<div style="position: absolute; margin-left: 0px; margin-top: 6px;">
						<input id='search_input_1' class="search-input" type="text" placeholder="输入班级名称" v-model="key_word_c"> 
						<input id='search_input_2' class="search-input" style="margin-left: 20px;" type="text" placeholder="输入学生姓名" v-model="key_word_s"> 
						<input id='search_input_3' class="search-input" style="margin-left: 20px;" type="text" placeholder="输入手机号" v-model="key_word_m">  

						<select id="search_input_grade" class="form-control" style="margin-left: 20px;  width: 90px; float: left;">
							<option value=''>全部</option>
  							<option value='学前'>学前</option>
  							<option value='1年级'>1年级</option>
  							<option value='2年级'>2年级</option>
  							<option value='3年级'>3年级</option>
  							<option value='4年级'>4年级</option>
  							<option value='5年级'>5年级</option>
  							<option value='6年级'>6年级</option>
						</select>
						
						<button class="button" v-on:click="searchCall">查询</button>
						<button class="button" style='margin-left: 10px;' v-on:click="creatStudent()">添加学生</button>
						<button class="button" style='margin-left: 10px;' v-on:click="exportExcel">导出Excel</button>
					</div>
				</div>
			</div>
			
			<div class="container-fluid">
				<div style="width:96%; height: 520px; background-color: #FFFFFF; margin-top: 10px; margin-left: 2%;">
					<div style="height: 2px;"></div>
					<!-- table  -->
					<div style="height: 10px;">
					<table id='studentTable' class="table table-striped table-condensed" style="width: 96%; margin-top: 20px; margin-left: 2%; z-index: 0;">
    					<thead style="background-color: #FFE62F;">
    					<tr style="display: block;"> 
        					<th style="width: 250px; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">学生</a> 
							</th>
							<th style="width: 13%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">英文名</a> 
							</th>
							<th style="width: 14%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">手机号</a> 
							</th>
							<th style="width: 16%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级名称</a> 
							</th>
							<th style="width: 13%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">年级</a> 
							</th>
							<th style="width: 14%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程进度</a> 
							</th>
							<th style="width: 14%;text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">操作</a> 
							</th>
    					</tr>
   						</thead>

						<tbody style="display: block; height: 460px; overflow: auto;">
							<loading v-if="loadingRouteData"></loading>
							<tr v-if="!loadingRouteData" style="line-height:100%; height: 10px;" v-for="(item, index) in studentInfoArray" v-bind:key="index">
								<td style="width: 250px; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.name}}
								</td>
								<td style="width: 13%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.en_name}}
								</td>
								<td style="width: 14%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.mobile}}
								</td>
								<td style="width: 16%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.class_name}}
								</td>
								<td style="width: 13%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.grade}}
								</td>
                                <td style="width: 14%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<span v-if="item.class_hour_nums">{{item.progress}}/{{item.class_hour_nums}}</span>
								</td>
								<td style="width: 14%;text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<p @click="fixStudentCall(item)" style="color: #666666; cursor:pointer; font-size: 14px; text-decoration:none; margin-left: 20px; margin-top: 5px; float: left;">修改</p> 
									<p @click="delStudentCall(item)" style="color: #F85415; cursor:pointer; font-size: 14px; text-decoration:none;  margin-top: 5px;">删除</p> 
								</td>
							</tr>
            		
						</tbody>

					</table>
					</div>
				</div>
			</div>
        <!-- </div> -->
        
        <!-- 模态框（Modal） 添加修改学生-->
        <div class="modal fade" id="myModal_student" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 460px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 style="float: left; margin: auto; margin-left: 20px; margin-top: 10px; ">
							{{formTitle}}
						</h4>
					</div>
					<div class="modal-body" style="height: 260px; margin-top: 20px; text-align: center;">
						<div class="container-fluid">
							<p v-show="showTishi" style="position: absolute; margin-top: -20px; margin-left: 30%; font-size: 14px; font-weight: bold; color: #F85415;">{{tishi}}</p>
                    
                            <div style="width:60%; height: 40px; margin-top: 10px; margin-left: 5%;">
							  <p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							  <p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">姓名</p>
							  <div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="请输入学生姓名" v-model="form.s_name">
							  </div>
						    </div>

                            <div style="width:60%; height: 40px; margin-top: 10px; margin-left: 5%;">
							  <p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							  <p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">英文名</p>
							  <div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="请输入学生英文名" v-model="form.en_name">
							  </div>
						    </div>

							<div style="width:60%; height: 40px; margin-top: 10px; margin-left: 5%;">
							  <p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							  <p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">手机号</p>
							  <div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="手机号" v-model="form.phone">
							  </div>
						    </div>

						    <div style="width:60%; height: 40px; margin-top: 20px; margin-left: 5%;">
							  <p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							  <p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">年级</p>
							  <div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<select id='gradeSel' v-model="form.grade" class="form-control" style="width: 200px; margin-left: 20px; background-color: #E3E5E8;">
  								   <option value='学前'>学前</option>
  							       <option value='1年级'>1年级</option>
  							       <option value='2年级'>2年级</option>
  							       <option value='3年级'>3年级</option>
  							       <option value='4年级'>4年级</option>
  							       <option value='5年级'>5年级</option>
  							       <option value='6年级'>6年级</option>
								</select>
							  </div>
						   </div>
						</div>
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod1" @click="cancelAdd">
							取消
						</button>
						<button class="buttonMod2" @click="onSubmitAdd">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>

			<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_warn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 460px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 style="float: left; margin: auto; margin-left: 20px; margin-top: 10px; ">
							系统提示
						</h4>
					</div>
					<div class="modal-body" style="height: 160px; margin-top: 20px; text-align: center;">
						<p style="color: #666666; font-size: 14px;">您确定删除该学生吗？</p> 
						
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod1" @click="cancelDel">
							取消
						</button>
						<button class="buttonMod2" @click="delStudent">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>

	</div>

	
	

</template>

<script>
import axios from 'axios'
import loading from './loading.vue'
import { setCookie, getCookie, delCookie, delCookieOne} from '../../assets/js/cookie.js'
export default {
  name: 'Student',
  data () {
    return {
	  loadingRouteData: true,
	  navImg_1: '../../../static/img/org/nav/nav_home1.png',
	  navImg_2: '../../../static/img/org/nav/nav_class2.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch1.png',
	  phone: '',
	  teacherID: '',

	  showTishi: false,
	  tishi: '',

	  studentInfoArray: [],

	  key_word_c: '',
      key_word_s: '',
      key_word_m: '',

      formTitle: '',
      form: {
        s_name: '',
        en_name: '',
        phone: '',
        grade: ''
	  },
	  
	  selStudentID: ''
	}
  },
  components: {
	loading
  },
  mounted () {
	/*页面挂载获取保存的cookie值，渲染到页面上*/
	this.phone = getCookie('phone')
	this.teacherID = getCookie('teacherID')

	var that = this
	$('input').keydown(function (e) {
		if(e.keyCode != 13) return
		that.searchCall()
	})

	// remain_judge
	this.get_studentList()
  },
  methods: {
	get_studentList () {
	  var selgrade =  $('#search_input_grade').val()
	//   console.log("------ ", selClass, selStatus)

	  var that = this
	  that.loadingRouteData = true
	//   this.$http.get('http://101.201.152.181:9010/Schedule/classInfoList?uid=' + this.teacherID + '&key_word='+key_word, {
	// 	emulateJSON: true
	//   })
	   axios({
		baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Student/studentlist?uid='+this.teacherID+'&c_name='+that.key_word_c+'&s_name='+that.key_word_s+'&phone='+that.key_word_m+'&grade='+selgrade,
        method: 'get'
	  })
	  .then(function (response) {
	    that.loadingRouteData = false
		if (response.data.code === 1000) {
		  that.studentInfoArray = []
		  that.studentInfoArray = response.data.data
		}
		else {
		  that.studentInfoArray = []
		}	
	  })
    },

    searchCall () {
	  this.get_studentList()
    },

    creatStudent () {
	  this.formTitle = '添加学生'
	  this.showTishi = false
	  this.tishi = ''
	  this.form = {
        s_name: '',
        en_name: '',
        phone: '',
        grade: ''
	  }
	  $('#myModal_student').modal('show')
    },
    
    fixStudentCall (studentInfo) {
		this.formTitle = '修改学生信息'
		this.form.id = studentInfo.id
        this.form.s_name = studentInfo.name
        this.form.en_name = studentInfo.en_name
        this.form.phone = studentInfo.mobile
		this.form.grade = studentInfo.grade
		this.showTishi = false
		this.tishi = ''
		$('#myModal_student').modal('show')
	},

	onSubmitAdd () {
	  if (this.form.s_name === '') {
		this.showTishi = true
		this.tishi = '学生姓名不能为空！'
		return
	  } else if (this.form.en_name === '') {
        this.showTishi = true
		this.tishi = '学生英文名不能为空！'
		return
	  } else if (this.form.phone === '' || !this.checkNumber(this.form.phone) || this.form.phone.length !== 11 || !this.checkPhone(parseInt(this.form.phone))) {
		this.showTishi = true
		this.tishi = '请输入正确的手机号！'
		return
	  } else if (this.form.grade === '') {
        this.showTishi = true
		this.tishi = '学生年级不能为空！'
		return
	  } else {
	    this.form['uid'] = this.teacherID
	    let self = this
	    $.ajax({
		  url: this.$store.getters.wjBaseAPI + "/Student/editstudent",
		  method: "post",
		  data: this.form,
		  dataType: 'json',
		  crossDomain: true === !(document.all),
		  success: function (response) {
			if (response.code === 1000) {
				$('#myModal_student').modal('hide')
				self.get_studentList()
			} 
			else {
				// that.showTishi = true
				// that.tishi = response.msg
				alert(response.msg)
			} 	
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.error(textStatus, "error");
			console.error(errorThrown, "error");
		  }
	    })
	  }
	},

	cancelAdd () {
		$('#myModal_student').modal('hide')
	},

	delStudentCall (studentInfo) {
		this.selStudentID = studentInfo.id
		$('#myModal_warn').modal('show')
	},

	cancelDel () {
		$('#myModal_warn').modal('hide')
	},

	delStudent () {
		var that = this
		axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    	url: '/Student/delstudent?uid=' + this.teacherID + '&id='+this.selStudentID,
      		method: 'get'
	  	})
	  	.then(function (response) {
			if (response.data.code === 1000) {
				$('#myModal_warn').modal('hide')
				that.get_studentList()
			}
			else {
				alert(response.data.msg)
			}
	  	})
	},

	//验证字符串是否是数字
	checkNumber (theObj) {
	  var reg = /^[0-9]+.?[0-9]*$/
	  if (reg.test(theObj)) {
		return true
	  }
	  return false
	},

	checkPhone: function (mobile) {
	  var reg = /^[1][3,4,5,7,8][0-9]{9}$/
	  return reg.test(mobile)
	},

	// 导出
    exportExcel() {
        $('#studentTable').tableExport({
            type: 'excel',
            mso: {
                fileFormat: 'xlsx'
            },
            fileName: '学生详细信息'
        });
    },

	exit: function () {
	  if (getCookie('remeber') === 'on') {

	  } else {
		delCookie()
	  }
	  this.$router.push('/')
	}
  }
}
</script>

<style scoped>
.navbar {
	margin: 0;
	padding: 0;
	height: 65px;
	
}

.nav {
	margin: 0;
	padding: 0;
}

.creat-input {
	width: 200px;
	height: 40px;
	margin-left: 20px;
	line-height: 16px;
	margin-top: -6px;
	padding-left: 10px;
	outline: none;
	border: 0px solid #E3E3E3;
	font-size: 14px;
	box-sizing: border-box;
	background-color: #E3E5E8;
	-webkit-box-shadow: 0 0 0px 1000px #E3E5E8 inset;
	box-shadow: 0 0 0px 1000px #E3E5E8 inset;
}

.search-input {
	width: 180px;
	height: 40px;
	float: left;
	margin-left: 0px;
	line-height: 16px;
	margin-top: -6px;
	padding-left: 10px;
	outline: none;
	border: 0px solid #ffffff;
	font-size: 14px;
	box-sizing: border-box;
	background-color: #ffffff;
	-webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
	box-shadow: 0 0 0px 1000px #ffffff inset;
}

.button {
	width: 80px;
	height: 30px;
	margin-left: 20px;
	margin-top: 0px;
	background-color: #F85415;
	border: none;
	color: #fff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}
</style>
