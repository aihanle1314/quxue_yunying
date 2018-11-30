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
                        <a style="font-size: 16px; font-weight: 800;"  @click="navigatorFun('/Home')">
							<img style="float: left; width: 22px; height: 20px; margin-left: 40px;" :src="navImg_1">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">首页</a>
						</a>
                    </li>
                    <li style="cursor:pointer;">
						<a style="font-size: 16px; font-weight: 800;" @click="navigatorFun('/Class')">
							<img style="float: left; width: 20px; height: 20px; margin-left: 40px;" :src="navImg_2">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">班级</a>
						</a>                    
					</li>
					<li style="cursor:pointer;">
                        <a style="font-size: 16px; font-weight: 800;" class="active-menu" @click="navigatorFun('/Schedule')">
							<img style="float: left; width: 4px; height: 40px; margin-left: -20px; margin-top: -10px;" src="../../../static/img/org/nav/nav_bar.png">
							<img style="float: left; width: 20px; height: 20px; margin-left: 40px;" :src="navImg_3">
							<a style="margin-left: 15px; color: #FFFFFF; text-decoration:none;">课表</a>
						</a>
                    </li>
                </ul>
            </div>
        </nav> -->

		<!-- /. NAV SIDE  -->
        <!-- <div id="page-wrapper"> -->
			
			<!-- schedule -->
			<div class="container-fluid" >
				<div style="width:98%; height: 620px; background-color: #FFFFFF; margin-top: 20px; margin-left: 1%;">
					<div class="container-fluid">
						<p style="width: 100px; margin-top: 10px; margin-left: 10px; font-size: 10px; color: #F85415; cursor: pointer;" v-on:click='goback'>{{back}}</p>
					</div>

					<!-- select -->
					<div style="container-fluid">
					  <div style="width:96%; height: 40px; margin-top: 5px; margin-left: 2%;background-color: #f5f6f9;">
						<button id='typeBtn1' class="button" style="margin-top: 5px; margin-left: 20px;" v-on:click="get_classInfo(3)">待上课程</button>
						<button id='typeBtn2' class="button_d" style="margin-top: 5px; margin-left: 0px;" v-on:click="get_classInfo(2)">已上课程</button>
						<button class="button" style="margin-top: 5px; margin-left: 60px; width: 80px;" v-on:click="exportExcel">导出Excel</button>
					  </div>
					  <div style="width:96%; height: 40px; margin-top: -5px; margin-left: 2%;background-color: #f5f6f9;">
						<input v-model="start_date" style="width: 140px; margin-left: 20px;margin-top: 5px;" type="date" value="">
						<input v-model="start_time" style="width: 80px; margin-left: 0px;margin-top: 5px;" type="time" value="">
						<!-- <p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">--</p> -->
						<input v-model="end_date" style="width: 140px; margin-left: 20px;margin-top: 5px;" type="date" value="">
						<input v-model="end_time" style="width: 80px; margin-left: 0px;margin-top: 5px;" type="time" value="">
						
						<select id="classType_1" style="margin-left: 20px;  width: 90px; margin-top: 10px;" v-model="class_format">
  							<option :value="''">全部</option>
  							<option :value="1">双师班</option>
  							<option :value="2">小班</option>
						</select>

						<select id="classType_2" style="margin-left: 10px;  width: 90px; margin-top: 10px;" v-model="class_type">
  							<option :value="''">全部</option>
  							<option :value="0">正式课</option>
  							<option :value="1">体验课</option>
						</select>

						<input id='search_input_1' class="search-input" type="text" placeholder="输入班级名称" v-model="c_name"
						 style="margin-left: 10px; margin-top: 5px;" > 

						<button class="button" style="width: 60px; margin-top: -5px; margin-left: 10px; background-color: #F85415;" v-on:click="search()">查询</button>
					  </div>
					</div>

					<!-- table -->
					<div style="">
					<table id='classTable1' v-if="showNum==1" class="table " style="width: 96%; margin-top: 10px; margin-left: 2%; z-index: 0; ">
    					<thead style="">
							<tr style="display: block;">
								<th style="width: 210px; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; height: 10px;color: #666666; font-size: 14px; text-decoration:none;">班级名称</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程级别</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">班级类型</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程类型</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">中教老师</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">外教老师</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">学生名单</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">学习课件</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F; cursor:pointer;"  v-on:click='timeFlow'>
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">上课时间↑↓</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程状态</p> 
								</th>
								
							</tr>
						</thead>

						<tbody style="display: block; height: 460px; overflow: auto;" >
							<loading v-if="loadingRouteData"></loading>
							<tr v-if="!loadingRouteData" style="height: 10px;" v-for="item in classInfoArray" v-bind:key="item.id">
								
								<td style="width: 210px; text-align: center; border: 1px solid #F0EFF6; word-wrap:break-word;word-break:break-all;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_level}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.class_format}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_type}}</p> 
								</td>
								<td @click="checkPhone(item.mobile)" style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; cursor:pointer; font-size: 14px; text-decoration:none;">{{item.t_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.en_teacher ? item.en_teacher : item.en_t_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='checkStudent(item)'>查看</p>
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='showPDF(item.c_pdf_url)'>查看</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.time}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.status}}</p> 
								</td>
								
							</tr>
            		
						</tbody>

					</table>

					<table id='classTable2' v-if="showNum==0" class="table " style="width: 96%; margin-top: 10px; margin-left: 2%; z-index: 0; ">
    					<thead style="">
							<tr style="display: block;">
								<th style="width: 210px; text-align: center; background-color: #FFE62F; " >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">班级名称</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程级别</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">班级类型</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程类型</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F; " >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">中教老师</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">外教老师</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F;" >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">学生名单</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F; " >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">学习课件</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F; " >
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">课程录像</p> 
								</th>
								<th style="width: 10%; text-align: center; background-color: #FFE62F; cursor:pointer;"  v-on:click='timeFlow'>
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">上课时间↑↓</p> 
								</th>
							</tr>
						</thead>

						<tbody style="display: block; height: 460px; overflow: auto;" >
							<loading v-if="loadingRouteData"></loading>
							<tr v-if="!loadingRouteData" style="height: 10px;" v-for="item in classInfoArray" v-bind:key="item.id">
								
								<td style="width: 210px; text-align: center; border: 1px solid #F0EFF6;word-wrap:break-word;word-break:break-all;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_level}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.class_format}}</p>
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.c_type}}</p> 
								</td>
								<td @click="checkPhone(item.mobile)" style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; cursor:pointer; font-size: 14px; text-decoration:none;">{{item.t_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<!-- {{item.en_t_name}} -->
									
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.en_teacher ? item.en_teacher : item.en_t_name}}</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='checkStudent(item)'>查看</p>
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='showPDF(item.c_pdf_url)'>查看</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #F85415; font-size: 14px; text-decoration:none; cursor:pointer;" v-on:click='showPDF(item.video_url)'>查看</p> 
								</td>
								<td style="width: 10%; text-align: center; border: 1px solid #F0EFF6;">
									<p style="color: #666666; font-size: 14px; text-decoration:none;">{{item.time}}</p> 
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
						<ul  v-for="item in studentArray" v-bind:key="item">
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
		<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div id="player" style="margin: auto;">
			</div>
		</div>

	  <el-dialog title="学生名单" :visible.sync="lookMoreStuVisible" center>
        <el-table :data="studentArray" border fit size="mini">
          <el-table-column align="center" prop="name" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="en_name" label="英文名">
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号">
          </el-table-column>
          <el-table-column align="center" label="评语" prop="content" v-if="sign===2">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="lookMoreStuVisible = false">确 定</el-button>
        </span>
      </el-dialog>

	</div>
	
</template>

<script>
import axios from 'axios'
import vnav from './vnav.vue'
import loading from './loading.vue'
import { setCookie, getCookie, delCookie, delCookieOne} from '../../assets/js/cookie.js'
export default {
  name: 'ScheduleInfo',
  data () {
	return {
	  loadingRouteData: true,
	  back: '<返回上一页',
	  navImg_1: '../../../static/img/org/nav/nav_home1.png',
	  navImg_2: '../../../static/img/org/nav/nav_class1.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch2.png',
	  phone: '',
	  teacherID: '',

	  classInfoArray: [],

	  studentArray: [],
	  teacherPhone: '',

		showNum: 0,

		sign: 0,
		
		start_date: '',
		start_time: '',
		end_date: '',
		end_time: '',
		c_name: '',
		class_format: '',
		class_type: '',

		lookMoreStuVisible: false
	}
  },
  components: {
	loading
  },
  mounted () {
	/*页面挂载获取保存的cookie值，渲染到页面上*/
    this.phone = getCookie('phone')
	this.teacherID = getCookie('teacherID')

	// remain_judge
	this.get_classInfo(3)
  },
  methods: {
	// （1：今日课程,2：已上课程，3： 待上课程）
	get_classInfo (type) {
	  this.loadingRouteData = true
	  var btn1 = document.getElementById('typeBtn1')
	  var btn2 = document.getElementById('typeBtn2')
	  if (type === 2) {
		this.showNum = 0
		btn2.setAttribute('class', 'button')
		btn1.setAttribute('class', 'button_d')
	  } 
	  else {
		this.showNum = 1
		btn1.setAttribute('class', 'button')
		btn2.setAttribute('class', 'button_d')
	  }

	  this.sign = type
	  // 重置搜索条件
	  this.start_date = ''
	  this.start_time = ''
	  this.end_date = ''
	  this.end_time = ''
	  this.c_name = ''
	  this.class_format = ''
	  this.class_type = ''

	  var that = this
	  // this.$http.get('http://101.201.152.181:9010/Statistics/schedule?uid=' + this.teacherID + '&sign=' +type, {
		// emulateJSON: true
		// })
		axios({
		baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Statistics/schedule?uid=' + this.teacherID + '&sign=' +type,
      method: 'get'
	  })
	  .then(function (response) {
		if(response.data.code === 1) {
		  that.loadingRouteData = false
		  that.classInfoArray = []
		  that.classInfoArray = response.data.data.data

		  for (var i = 0; i < that.classInfoArray.length; i++) {
			if (that.classInfoArray[i].c_type === '0') {
			  that.classInfoArray[i].c_type = '正式课'
			}
			else {
			  that.classInfoArray[i].c_type = '体验课'
			}

			if (that.classInfoArray[i].class_format === '1') {
				that.classInfoArray[i].class_format = '双师班'
			}
			else if (that.classInfoArray[i].class_format === '2') {
				that.classInfoArray[i].class_format = '小班'
			}

			if (that.classInfoArray[i].status === '0') {
			  that.classInfoArray[i].status = '审核中...'
			}
			else if (that.classInfoArray[i].status === '1') {
			  that.classInfoArray[i].status = '已排课'
			}
			else if (that.classInfoArray[i].status === '2'){
			  that.classInfoArray[i].status = '未通过'
			}
			else if (that.classInfoArray[i].status === '4'){
			  that.classInfoArray[i].status = '已结课'
			}

			//教师英文名
			if(that.classInfoArray[i].t_name.length > 10) {
				var str1 = that.classInfoArray[i].t_name.substring(0, 10)
				var str2 = that.classInfoArray[i].t_name.substring(10, that.classInfoArray[i].t_name.length)
				that.classInfoArray[i].t_name = str1 + " " + str2
			}
			if(that.classInfoArray[i].en_t_name.length > 10) {
				var str1 = that.classInfoArray[i].en_t_name.substring(0, 10)
				var str2 = that.classInfoArray[i].en_t_name.substring(10, that.classInfoArray[i].en_t_name.length)
				that.classInfoArray[i].en_t_name = str1 + " " + str2
			}
		  }
		}
		else {

		}
	  })
	},

	checkStudent(item) {
		if (item.class_format === '双师班') {
		  this.studentArray = item.s_list.split(',')
		  $('#myModal_student').modal('show')
		} else {
		   this.studentArray = item.students
        //    item.students.forEach(item => {
		// 	  this.studentArray.push(item.name + '-' + item.en_name + '-' + item.mobile)
		// 	  if (item.content) {
        //         this.studentArray.push(item.content)
		// 	  }
		//   })
		  this.lookMoreStuVisible = true
		}
	},

	checkPhone(phone) {
		this.teacherPhone = phone
		$('#myModal_phone').modal('show')
	},

	showPDF: function (url) {
	  window.open(url)
	},

	timeFlow: function () {
		this.classInfoArray.reverse();

	},

	// 导出
  exportExcel() {
		if(this.showNum == 1) {
			$('#classTable1').tableExport({
          type: 'excel',
          mso: {
                fileFormat: 'xlsx'
          },
          fileName: '待上课程信息'
      });
		}
		else {
			$('#classTable2').tableExport({
          type: 'excel',
          mso: {
                fileFormat: 'xlsx'
          },
          fileName: '已上课程信息'
      });
		}
      
	},
	
	search: function () {

		console.log(this.start_date, this.start_time, this.end_date, this.end_time);
        if(this.start_date !== '' && this.start_time === '') {
			alert('请选择完整的开始时间段查询')
		}
		else if(this.end_date !== '' && this.end_time === '') {
			alert('请选择完整的结束时间段查询')
		}
		else {
			var start = this.start_date+' '+this.start_time
			var end = this.end_date+' '+this.end_time

			this.loadingRouteData = true
			var that = this
			axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    	url: '/Statistics/schedule?uid='+this.teacherID+'&sign='+this.sign+'&stime='+start+'&etime='+end+'&c_format='+this.class_format+'&c_type='+this.class_type+'&c_name='+this.c_name,
      	    method: 'get'
	  	})
	  	.then(function (response) {
				if(response.data.code === 1) {
						that.loadingRouteData = false
						that.classInfoArray = []
		  			that.classInfoArray = response.data.data.data

		  			for (var i = 0; i < that.classInfoArray.length; i++) {
							if (that.classInfoArray[i].c_type === '0') {
			  					that.classInfoArray[i].c_type = '正式课'
							}
							else {
			  				that.classInfoArray[i].c_type = '体验课'
							}

							if (that.classInfoArray[i].class_format === '1') {
			  					that.classInfoArray[i].class_format = '双师班'
							}
							else {
			  				that.classInfoArray[i].class_format = '小班'
							}

							if (that.classInfoArray[i].status === '0') {
			  				that.classInfoArray[i].status = '审核中...'
							}
							else if (that.classInfoArray[i].status === '1') {
			  				that.classInfoArray[i].status = '已排课'
							}
							else if (that.classInfoArray[i].status === '2'){
			  				that.classInfoArray[i].status = '未通过'
							}
							else if (that.classInfoArray[i].status === '4'){
			                 that.classInfoArray[i].status = '已结课'
			                }
		  			}
				}
				else {

				}
	  	})

		}
	},

	goback: function () {
	  this.navigatorFun('/waijiao/schedule')
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
	height: 30px;
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
	background-color: #F85415;
	border: none;
	color: #fff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button_d {
	width: 80px;
	height: 30px;
	background-color: #F5F6F9;
	border: none;
	color: #AAB2C2;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}
</style>
