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

		<!-- /. NAV TOP  -->
        <!-- <nav class="navbar-default navbar-side" style="margin-top: 15px; " role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">
					<li style="cursor:pointer;">
                        <a style="font-size: 16px; font-weight: 800;" class="active-menu" @click="navigatorFun('/Home')">
							<img style="float: left; width: 4px; height: 40px; margin-left: -20px; margin-top: -10px;" src="../../../static/img/org/nav/nav_bar.png">
							<img style="float: left; width: 22px; height: 20px; margin-left: 40px;" :src="navImg_1">
							<a style="margin-left: 15px; color: #FFFFFF; text-decoration:none;">首页</a>
						</a>
                    </li>
                    <li style="cursor:pointer;">
						<a style="font-size: 16px; font-weight: 800;" @click="navigatorFun('/Class')">
							<img style="float: left; width: 20px; height: 20px; margin-left: 40px;" :src="navImg_2">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">班级</a>
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
			<loading v-if="loadingRouteData"></loading>
			<!-- 无数据 -->
			<div v-show="!isExitCourse&&!loadingRouteData" class="container-fluid" style="positon:relative;">
				<div style="position: absolute; width: 70px; height: 80px; margin-left: 35%; margin-top: 20%; cursor:pointer;"  v-on:click="creatClass">
					<img style="position: absolute; width: 36px; height: 50px; margin-left: 15px;" src="../../../static/img/org/home/creatClass.png">
					<p style="position: absolute; width: 70px; height: 50px; margin-left: 5px; margin-top: 60px;">创建班级</p>
				</div>
			</div>

			<!-- 整体数据 -->
			<div  v-show="isExitCourse" class="container-fluid">
				<div style="width:96%; height: 200px; background-color: #FFFFFF; margin-top: 20px; margin-left: 2%;">
					<p style="position: absolute; margin-left: 2%; margin-top: 10px; font-size: 16px; font-weight: 600px;">整体数据</p>
					<div style="width: 400px; height: 200px; margin-left: 5%;">
						<img style="width: 160px; margin-left: 60px; margin-top: 20px;" src="../../../static/img/org/home/itemBg.png">
						<p style="position: absolute; margin-left: 110px; margin-top: -110px; font-size: 16px;">班级总数</p>
						<p v-if="num1==1" style="position: absolute; margin-left: 130px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{allClassNum}}</p>
						<p v-if="num1==2" style="position: absolute; margin-left: 120px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{allClassNum}}</p>
						<p v-if="num1==3" style="position: absolute; margin-left: 110px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{allClassNum}}</p>
						<p v-if="num1>=4" style="position: absolute; margin-left: 100px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{allClassNum}}</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -110px; font-size: 14px; color: #747C8D">学生人数：{{studentNum}}名</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -85px; font-size: 14px; color: #747C8D">固定班级：{{classNum_1}}个</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -60px; font-size: 14px; color: #747C8D">体验班级：{{classNum_2}}个</p>
					</div>

					<div style="width: 400px; height: 200px; margin-left: 50%; margin-top: -200px;">
						<img style="width: 160px; margin-left: 60px; margin-top: 20px;" src="../../../static/img/org/home/itemBg.png">
						<p style="position: absolute; margin-left: 110px; margin-top: -110px; font-size: 16px;">剩余课时</p>
						<p v-if="num2==1" style="position: absolute; margin-left: 130px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{leftCourseNum}}</p>
						<p v-if="num2==2" style="position: absolute; margin-left: 120px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{leftCourseNum}}</p>
						<p v-if="num2==3" style="position: absolute; margin-left: 110px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{leftCourseNum}}</p>
						<p v-if="num2>=4" style="position: absolute; margin-left: 100px; margin-top: -90px; font-size: 36px; font-weight: bold; color: #F85415">{{leftCourseNum}}</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -110px; font-size: 14px; color: #747C8D">已上课时：{{courseNum}}节</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -85px; font-size: 14px; color: #747C8D">待上课时：{{courseNum_2}}节</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -60px; font-size: 14px; color: #747C8D">预约课时：{{courseNum_1}}节</p>
						<p style="position: absolute; margin-left: 250px; margin-top: -35px; font-size: 14px; color: #747C8D">总充值课时：{{courseNum_3}}节</p>
					</div>

					<div style="position: absolute; margin-left: 76%; margin-top: -200px; cursor:pointer; "> 
						<el-dropdown style="height:70px;">
                <span style="position: relative; display: inline-block;color: #000; cursor: pointer; vertical-align: middle; font-size: 16px;">
                    <img style="position: absolute; width: 40px; height: 40px; " src="../../../static/img/org/home/help.png">
										<p style="position: absolute; width: 70px; height: 50px; margin-left: 5px; margin-top: 40px;">帮助</p>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 360px;">
									<el-dropdown-item>1.预约课时=各个班级建立时填写的总课时=已上课时+待上课时</el-dropdown-item>
                  <el-dropdown-item>2.剩余课时计算规则=总充值课时-预约课时</el-dropdown-item>
                  <el-dropdown-item>3.班级总数与剩余课时的数据会在每晚00:00钟进行更新。</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
					</div>
					
				</div>
			</div>

			<!-- 今日课程 -->
			<div  v-show="isExitCourse" class="container-fluid">
				<div style="width:96%; height: 380px; background-color: #FFFFFF; margin-top: 20px; margin-left: 2%;">
					<p style="margin-left: 2%; margin-top: 20px; font-size: 16px; font-weight: 600px;">今日课程</p>
				
					<!-- table  -->
					<div style="">
					<table class="table table-striped table-condensed"  style="width: 96%; margin-top: 20px; margin-left: 2%; z-index: 0;">
    					<thead style="background-color: #FFE62F;">
    					<tr style="display: block;">
        			<th style="width: 210px; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级名称</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程级别</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">班级类型</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">课程类型</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">中教老师</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">外教老师</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">学生名单</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">学习课件</a> 
							</th>
							<th style="width: 11%; text-align: center;">
								<a style="color: #666666; font-size: 14px; text-decoration:none;">上课时间</a> 
							</th>
    					</tr>
   						</thead>

						<tbody style="display: block; height: 280px; overflow: auto;">
							<tr style="height: 10px;" v-for="item in scheduleArray" v-bind:key="item.id">
								<td style="width: 210px; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;word-wrap:break-word;word-break:break-all;">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_name}}</a> 
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="font-size: 14px; text-decoration:none;">{{item.c_level}}</a> 
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="font-size: 14px; text-decoration:none;">{{item.class_format}}</a> 
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="font-size: 14px; text-decoration:none;">{{item.c_type}}</a> 
								</td>
								<td @click="checkPhone(item.mobile)" style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6; color: #F85415; cursor:pointer;">
									<a style="font-size: 14px; text-decoration:none;">{{item.t_name}}</a> 
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="font-size: 14px; text-decoration:none;">{{item.en_t_name}}</a> 
								</td>
								<td @click="checkStudent(item)" style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6; color: #F85415; cursor:pointer;">
									<a style="font-size: 14px; text-decoration:none;">查看</a> 
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="color: #F85415; cursor:pointer;" v-on:click="showpdf(item.c_pdf_url)">查看</a>
								</td>
								<td style="width: 11%; text-align: center; background-color: #F5F6F9; border: 1px solid #F0EFF6;">
									<a style="font-size: 14px; text-decoration:none;">{{item.time}}</a> 
								</td>
							</tr>
							
						</tbody>

					</table>
					</div>
				</div>
			</div>
        <!-- </div> -->

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_exit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" style="width: 380px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
					</div>

					<div class="modal-body">
						<p style="font-size: 18px;  margin-left: 160px; margin-top: 10px; ">
							确定要真的退出吗？
						</p>
					</div>
					
					<div class="modal-footer">
						<button style="width: 120px; height: 40px; float: left; background-color: #605E73; border: none; color: #fff; font-size: 16px; font-weight: bold; border-radius: 2px;" >
							确定
						</button>
						<button style="width: 120px; height: 40px; margin-left: 200px; background-color: #F85415; border: none; color: #fff; font-size: 16px; font-weight: bold; border-radius: 2px;" >
							取消
						</button>
						
					</div>
				</div>
			</div>
		</div>


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
						<ul  v-for="n in studentArray.length" v-bind:key="n">
							<a style="color: #333333; font-size: 18px; text-decoration:none;">{{studentArray[n-1]}}</a>
						</ul>
					</div>	
				</div>
			</div>
		</div>
    <!-- 小班 -->
		<el-dialog title="学生名单" :visible.sync="lookMoreStuVisible" center>
        <el-table :data="studentArray" border fit size="mini">
          <el-table-column align="center" prop="name" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="en_name" label="英文名">
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="lookMoreStuVisible = false">确 定</el-button>
        </span>
      </el-dialog>

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" style="width: 400px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 style=" margin: 0 auto;  text-align: center; margin-top: 10px; ">
							中教老师手机号
						</h4>
					</div>
					<div class="modal-body" style="height: 160px; text-align: center; margin-top: 10px; overflow-y:scroll; overflow-x: hidden;">
						<a style="color: #333333; font-size: 18px; text-decoration:none;">{{teacherPhone}}</a>
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
import { setCookie, getCookie, delCookie, delCookieOne } from '../../assets/js/cookie.js'
export default {
  name: 'vnav',
  data () {
	return {
	  loadingRouteData: true,
	  isExitCourse: false,
	  navImg_1: '../../../static/img/org/nav/nav_home2.png',
	  navImg_2: '../../../static/img/org/nav/nav_class1.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch1.png',
	  phone: '',
	  teacherID: '',

	  allClassNum: '',
	  studentNum: '',
	  classNum_1: '',
	  classNum_2: '',

	  leftCourseNum: '',
	  courseNum: '',
	  courseNum_1: '',
	  courseNum_2: '',
	  courseNum_3: '',

	  num1: 0,
	  num2: 0,

		scheduleArray: [],
		
		studentArray: [],
		teacherPhone: '',

		lookMoreStuVisible: false
	}
  },
  components: {
	loading
  },
  mounted () {
	/* 页面挂载获取保存的cookie值，渲染到页面上 */
	this.phone = getCookie('phone')
	this.teacherID = getCookie('teacherID')

	this.get_schedule()
	// $('#myModal_exit').modal('show');	
  },
  methods: {
	get_course () {
	  var that = this
	  //   this.$http.get('http://101.201.152.181:9010/Statistics/course?uid=' + this.teacherID, {
	  // 	emulateJSON: true
	  //   })
	  axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Statistics/course?uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function (response) {
		if (response.data.code === 1) {
		  that.allClassNum = response.data.data.class.class_total
		  that.studentNum = response.data.data.class.student_nums
		  that.classNum_1 = response.data.data.class.fixed_class
		  that.classNum_2 = response.data.data.class.ti_class

		  that.leftCourseNum  = response.data.data.lessons.remaining_course
		  that.courseNum = response.data.data.lessons.over_course
		  that.courseNum_1 = response.data.data.lessons.reservations
			that.courseNum_2 = response.data.data.lessons.not_course
			that.courseNum_3 =  response.data.data.lessons.total_num 

		  that.num1 = that.allClassNum.toString().length
		  that.num2 = that.leftCourseNum.toString().length

		  if (parseInt(that.allClassNum) > 0) {
			that.isExitCourse = true
		  }
		  else {
			that.isExitCourse = false
		  }
		  that.loadingRouteData = false
		}
		else {

		}
	  })
	},

	get_schedule() {
	  var that = this;
	//   this.$http.get('http://101.201.152.181:9010/Statistics/schedule?sign=1&uid=' + this.teacherID, {
	// 	emulateJSON: true
	//   })
	  axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Statistics/schedule?sign=1&uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function (response) {
		if (response.data.code === 1) {
		  that.scheduleArray = []
		  that.scheduleArray = response.data.data.data

		  that.get_course()

		  for (var i = 0; i < that.scheduleArray.length; i++) {
			if (that.scheduleArray[i].c_type === '0') {
			  that.scheduleArray[i].c_type = '正式课'
			}
			else if (that.scheduleArray[i].c_type === '1') {
			  that.scheduleArray[i].c_type = '体验课'
			}

			if (that.scheduleArray[i].class_format === '1') {
				that.scheduleArray[i].class_format = '双师班'
			}
			else if (that.scheduleArray[i].class_format === '2') {
				that.scheduleArray[i].class_format = '小班'
			}

			//教师英文名
			if(that.scheduleArray[i].t_name.length > 10) {
				var str1 = that.scheduleArray[i].t_name.substring(0, 10)
				var str2 = that.scheduleArray[i].t_name.substring(10, that.scheduleArray[i].t_name.length)
				that.scheduleArray[i].t_name = str1 + " " + str2
			}

			if(that.scheduleArray[i].en_t_name.length > 10) {
				var str1 = that.scheduleArray[i].en_t_name.substring(0, 10)
				var str2 = that.scheduleArray[i].en_t_name.substring(10, that.scheduleArray[i].en_t_name.length)
				that.scheduleArray[i].en_t_name = str1 + " " + str2
			}
		  }
		}
		else {

		}
	  })
	},

	showpdf (url) {
	  console.log(url)
	  window.open(url)
	},

	creatClass () {
		console.log('creatClass...')
		setCookie('isFix', false, 1000 * 60)
	  this.navigatorFun('/waijiao/create')
	},

	checkStudent(item) {
		if (item.class_format === '双师班') {
				this.studentArray = item.s_list.split(',')
				$('#myModal_student').modal('show')
		} else {
			this.studentArray = item.students
      // item.students.forEach(item => {
      //   this.studentArray.push(item.name + '-' + item.en_name + '-' + item.mobile)
			// })
			this.lookMoreStuVisible = true
		}
		
	},

	checkPhone(phone) {
		this.teacherPhone = phone
		$('#myModal_phone').modal('show')
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

.el-dropdown-menu__item {
  text-align: left;
}
</style>
