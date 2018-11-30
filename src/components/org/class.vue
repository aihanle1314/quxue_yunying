<template>
	<div id="wrapper" style="background-color: #f5f6f9;">
		<!-- <nav class="navbar navbar-default navbar-cls-top" role="navigation" style="margin-bottom: 0; background-color:#FFFFFF;">
			<div class="navbar-header" style="margin-left: -1px; margin-top: -1px;">
			    <a class="navbar-brand">
					<img class="img-responsive" style="margin-left: 30px; max-height:55px; margin-top: 10px;" src="../../../static/img/org/home/logo.png">
				</a>
				<p style="position: absolute; margin-left: 240px; margin-top: 20px; font-size: 20px; color: #333333">趣学外教</p>
			</div>	
				
			<div class="header-right">
				<ul class="nav navbar-nav navbar-right" style="float: left;">
					<li >
						<a style="cursor:pointer;" @click="exit">退出</a>
					</li>	
				</ul>
			</div>	
		</nav>	 -->

		<!-- /. NAV TOP 
        <nav class="navbar-default navbar-side" style="margin-top: 15px; " role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">
					<li style="cursor:pointer;">
                        <a style="font-size: 16px; font-weight: 800;"  @click="navigatorFun('/Home')">
							<img style="float: left; width: 22px; height: 20px; margin-left: 40px;" :src="navImg_1">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">首页</a>
						</a>
                    </li>
                    <li style="cursor:pointer;">
						<a style="font-size: 16px; font-weight: 800;" class="active-menu" @click="navigatorFun('/Class')">
							<img style="float: left; width: 4px; height: 40px; margin-left: -20px; margin-top: -10px;" src="../../../static/img/org/nav/nav_bar.png">
							<img style="float: left; width: 20px; height: 20px; margin-left: 40px;" :src="navImg_2">
							<a style="margin-left: 15px; color: #FFFFFF; text-decoration:none;">班级</a>
						</a>                    
					</li>
					<li style="cursor:pointer;">
                        <a style="font-size: 16px; font-weight: 800;" @click="navigatorFun('/Schedule')">
							<img style="float: left; width: 20px; height: 20px; margin-left: 40px;" :src="navImg_3">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">课表</a>
						</a>
                    </li>
                </ul>
            </div>
        </nav> -->

		<!-- /. NAV SIDE  -->
        <!-- <div id="page-wrapper"> -->
			<!-- title 创建班级 -->
			<div class="container-fluid" v-show="isExitClass1">
				<div style="width:96%; height: 40px; background-color: #FEF9EB; margin-top: 20px; margin-left: 2%; cursor:pointer;" v-on:click="creatClass">
					<p style="position: absolute; margin-left: 2%; margin-top: 10px; font-size: 12px; color: #F85415">
						您还没有班级数据哦，快去创建班级吧！
					</p>
					<p style="position: absolute; margin-left: 70%; margin-top: 10px; font-size: 12px; color: #F85415">
						创建班级 >
					</p>
				</div>
			</div>

			<!-- content 创建班级 -->
			<div class="container-fluid" v-show="isExitClass1">
				<div style="width:96%; height: 520px; background-color: #FFFFFF; margin-top: 20px; margin-left: 2%;">
					<div style="position: absolute; width: 70px; height: 80px; margin-left: 35%; margin-top: 20%; cursor:pointer;"  v-on:click="creatClass">
						<img style="position: absolute; width: 36px; height: 50px; margin-left: 15px;" src="../../../static/img/org/home/creatClass.png">
						<p style="position: absolute; width: 70px; height: 50px; margin-left: 5px; margin-top: 60px;">创建班级</p>
					</div>
				</div>
			</div>

			<!-- 搜索 -->
			<div class="container-fluid" v-show="isExitClass2">
				<div style="width:96%; height: 40px; margin-top: 20px; margin-left: 2%;">
					<div style="position: absolute; margin-left: 0px; margin-top: 6px;">
						<input id='search_input_1' class="search-input" type="text" placeholder="输入班级名称" v-model="key_word_1"> 
						<input id='search_input_2' class="search-input" style="margin-left: 20px;" type="text" placeholder="输入中教/外教姓名" v-model="key_word_2"> 
						
						<select id="classType_1" class="form-control" style="margin-left: 20px;  width: 90px; float: left;">
  							<option :value="''">全部</option>
  							<option :value="1">双师班</option>
  							<option :value="2">小班</option>
						</select>

						<select id="classType_2" class="form-control" style="margin-left: 20px;  width: 90px; float: left;">
  							<option :value="''">全部</option>
  							<option :value="0">正式课</option>
  							<option :value="1">体验课</option>
						</select>

						<select id="classType_3" class="form-control" style="margin-left: 20px;  width: 90px; float: left;">
							<option value=''>全部</option>
  							<option value='学前'>学前</option>
  							<option value='1年级'>1年级</option>
  							<option value='2年级'>2年级</option>
  							<option value='3年级'>3年级</option>
  							<option value='4年级'>4年级</option>
  							<option value='5年级'>5年级</option>
  							<option value='6年级'>6年级</option>
						</select>

						<select id="classType_4" class="form-control" style="margin-left: 20px; width: 90px; float: left;">
  							<option :value="''">全部</option>
  							<option :value="0">审核中</option>
  							<option :value="1">已排课</option>
  							<option :value="2">未通过</option>
							<option :value="4">已结课</option>
						</select>
						
						<button class="button" v-on:click="searchCall">查询</button>
						<button class="button" style='margin-left: 10px;' v-on:click="creatClass()">创建班级</button>
						<button class="button" style='margin-left: 10px;' v-on:click="exportExcel">导出Excel</button>
					</div>
				</div>
			</div>
			
			<!-- 今日课程 -->
			<div class="container-fluid" v-show="isExitClass2">
				<div style="width:96%; height: 520px; background-color: #FFFFFF; margin-top: 10px; margin-left: 2%;">
					<div style="height: 2px;"></div>
					<!-- table  -->
					<div style="height: 10px;">
					<table id='classTable' class="table table-striped table-condensed" style="width: 96%; margin-top: 20px; margin-left: 2%; z-index: 0;">
    					<thead style="background-color: #FFE62F;">
    					<tr style="display: block;"> 
        					<th style="width: 200px; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级名称</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程级别</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级类型</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程类型</a> 
							</th>
							<th style="width: 7%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">年级</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">中教老师</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">外教老师</a> 
							</th>
							<th style="width: 7%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">学生名单</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程进度</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">首课时间</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">结束日期</a> 
							</th>
							<th style="width: 8%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级状态</a> 
							</th>
							<th style="width: 9%;text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">操作</a> 
							</th>
    					</tr>
   						</thead>

						<tbody style="display: block; height: 460px; overflow: auto;">
							<loading v-if="loadingRouteData"></loading>
							<tr v-if="!loadingRouteData" style="line-height:100%; height: 10px;" v-for="item in classInfoArray" v-bind:key="item.id">
								<td style="width: 200px; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;word-wrap:break-word;word-break:break-all;">
									{{item.class_name}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.level}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.class_format}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.class_type}}
								</td>
								<td style="width: 7%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.grade}}
								</td>
								<td @click="checkPhone(item.mobile)" style="color: #F85415; cursor:pointer; width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.teacher_name_show}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.en_teacher_name}}
								</td>
								<td style=" color: #F85415; cursor:pointer; width: 7%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='checkStudent(item)'>查看</p> 
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.progress}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.frist_time}}
								</td>
								<td style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.end_time}}
								</td>
								<td v-if="item.status=='未通过'" @click="checkPhone(item.not_pass_reason)" style="color: #F85415; cursor:pointer; width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.status}}
								</td>
								<td v-if="item.status!='未通过'" style="width: 8%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									{{item.status}}
								</td>
								<td style="width: 9%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<!-- 0:审核中； 1:已排课（修改） 2:未通过（修改、删除） -->
									<p v-if='item.done==1 || item.done==2' @click="fixClassCall(item)" style="color: #F85415; cursor:pointer; font-size: 14px; text-decoration:none; margin-left: 20px; margin-top: 5px; float: left;">修改</p> 
									<p v-if='!(item.done==1 || item.done==2)' style="color: #666666; font-size: 14px; text-decoration:none; margin-left: 20px;  margin-top: 5px; float: left;">修改</p> 
									<p v-if='item.done==2' @click="delClassCall(item.class_name, item.id)" style="color: #F85415; cursor:pointer; font-size: 14px; text-decoration:none;  margin-top: 5px;">删除</p> 
									<p v-if='item.done!=2' style="color: #666666; font-size: 14px; text-decoration:none;  margin-top: 5px;">删除</p> 
								</td>
							</tr>
            		
						</tbody>

					</table>
					</div>
				</div>
			</div>

			
	
        <!-- </div> -->

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_student" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" style="width: 400px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 style=" margin: 0 auto;  text-align: center; margin-top: 10px; ">
							学生名单
						</h4>
					</div>
					<div class="modal-body" style="height: 360px; text-align: center; margin-left: -40px; margin-top: 10px; overflow-y:scroll; overflow-x: hidden;">
						<ul  v-for="(item, index) in studentArray" v-bind:key="index">
							<a style="color: #333333; font-size: 18px; text-decoration:none;">{{item}}</a>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" style="width: 400px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 style=" margin: auto; text-align: center; margin-top: 10px; ">
							中教老师手机号
						</h4>
					</div>
					<div class="modal-body" style="height: 160px; text-align: center; margin-top: 10px; overflow-y:scroll; overflow-x: hidden;">
						<a style="color: #333333; font-size: 18px; text-decoration:none;">{{teacherPhone}}</a>
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
						<p style="color: #666666; font-size: 14px;">您确定删除{{selclassName}}吗？</p> 
						
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod1" @click="cancelDel">
							取消
						</button>
						<button class="buttonMod2" @click="delClass">
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
import vnav from './vnav.vue'
import loading from './loading.vue'
import { setCookie, getCookie, delCookie, delCookieOne} from '../../assets/js/cookie.js'
export default {
  name: 'Class',
  data () {
    return {
	  loadingRouteData: true,
	  navImg_1: '../../../static/img/org/nav/nav_home1.png',
	  navImg_2: '../../../static/img/org/nav/nav_class2.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch1.png',
	  phone: '',
	  teacherID: '',

	  classInfoArray: [],

	  isExitClass1: false,
	  isExitClass2: false,

	  key_word_1: '',
	  key_word_2: '',

	  studentArray: [],
	  teacherPhone: '',

	  selclassName: '',
	  selclassID: ''
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
	this.get_classList()
  },
  methods: {
	get_classList () {
	  var selClass =  $('#classType_1').val()
	  var selCourse =  $('#classType_2').val()
	  var selGrade =  $('#classType_3').val()
	  var selStatus = $('#classType_4').val()

	//   console.log("------ ", selClass, selStatus)

	  var that = this
	  that.loadingRouteData = true
	//   this.$http.get('http://101.201.152.181:9010/Schedule/classInfoList?uid=' + this.teacherID + '&key_word='+key_word, {
	// 	emulateJSON: true
	//   })
	   axios({
		baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Schedule/classInfoList?uid=' + this.teacherID + '&key_word='+that.key_word_2+'&class_name='+that.key_word_1+'&status='+selStatus+'&class_format='+selClass+'&class_type='+selCourse+'&grade='+selGrade,
        method: 'get'
	  })
	  .then(function (response) {
	    that.loadingRouteData = false
		if(response.data.code === 1) {
		  that.classInfoArray = []
		  that.classInfoArray = response.data.data

		  for (var i = 0; i < that.classInfoArray.length; i++) {
			if (that.classInfoArray[i].class_format === '1') {
				that.classInfoArray[i].class_format = '双师班'
			}
			else if (that.classInfoArray[i].class_format === '2') {
				that.classInfoArray[i].class_format = '小班'
			}

			if (that.classInfoArray[i].class_type === '0') {
				that.classInfoArray[i].class_type = '正式课'
			}
			else if (that.classInfoArray[i].class_type === '1') {
				that.classInfoArray[i].class_type = '体验课'
			}

			if (that.classInfoArray[i].status === '0') {
				that.classInfoArray[i].status = '审核中'
				that.classInfoArray[i].done = 0
			}
			else if (that.classInfoArray[i].status === '1') {
				that.classInfoArray[i].status = '已排课'
				that.classInfoArray[i].done = 1
			}
			else if (that.classInfoArray[i].status === '2'){
				that.classInfoArray[i].status = '未通过'
				that.classInfoArray[i].done = 2
			}
			else if (that.classInfoArray[i].status === '4'){
				that.classInfoArray[i].status = '已结课'
				that.classInfoArray[i].done = 4
			}

			//教师英文名
			if(that.classInfoArray[i].teacher_name.length > 10) {
				var str1 = that.classInfoArray[i].teacher_name.substring(0, 10)
				var str2 = that.classInfoArray[i].teacher_name.substring(10, that.classInfoArray[i].teacher_name.length)
				that.classInfoArray[i].teacher_name_show = str1 + " " + str2
			}
			else {
				that.classInfoArray[i].teacher_name_show = that.classInfoArray[i].teacher_name
			}
			if(that.classInfoArray[i].en_teacher_name.length > 10) {
				var str1 = that.classInfoArray[i].en_teacher_name.substring(0, 10)
				var str2 = that.classInfoArray[i].en_teacher_name.substring(10, that.classInfoArray[i].en_teacher_name.length)
				that.classInfoArray[i].en_teacher_name = str1 + " " + str2
			}
		  }
		  if(that.key_word_1 == '' && that.key_word_2 == '' && selCourse != '' && selStatus != '') {
			that.isExitClass1 = that.classInfoArray.length==0 ? true : false
		  	that.isExitClass2 = that.classInfoArray.length>0 ? true : false
		  }
		  else {
			  that.isExitClass1 = false;
			  that.isExitClass2 = true;
		  }
		  

		}
		else {
		  that.classInfoArray = []
		}	
	  })
    },

    searchCall () {
	  this.get_classList()
	},

	delClassCall (className, classID) {
		this.selclassName = className
		this.selclassID = classID
		
		$('#myModal_warn').modal('show')

	},

	cancelDel () {
		$('#myModal_warn').modal('hide')
	},

	delClass () {
		var that = this
		axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    	url: '/Statistics/delclass?uid=' + this.teacherID + '&c_id='+this.selclassID,
      		method: 'get'
	  	})
	  	.then(function (response) {
			if (response.data.code === 1) {
				that.get_classList()
			}
			else {
				alert(response.data.msg)
			}
	  	})
	},
	
	fixClassCall (classInfo) {
		setCookie('classInfo',  JSON.stringify(classInfo), 1000 * 60)
		setCookie('isFix', true, 1000 * 60)
		this.navigatorFun('/waijiao/create')
	},

	creatClass () {
	  console.log('creatClass...')
	  setCookie('isFix', false, 1000 * 60)
	  this.navigatorFun('/waijiao/create')
	},

	checkStudent(item) {
		if (item.class_format === '双师班') {
          this.studentArray = item.s_list.split(',')
		} else {
		   this.studentArray = []
           item.students.forEach(item => {
              this.studentArray.push(item.name + '-' + item.en_name + '-' + item.mobile)
          })
		}
		
		$('#myModal_student').modal('show')
	},

	checkPhone(phone) {
		this.teacherPhone = phone
		$('#myModal_phone').modal('show')
	},

	// 导出
    exportExcel() {
        $('#classTable').tableExport({
            type: 'excel',
            mso: {
                fileFormat: 'xlsx'
            },
            fileName: '班级详细信息'
        });
    },

	navigatorFun (path) {
	  this.$router.push(path)
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
