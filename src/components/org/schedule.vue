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
						<a style="font-size: 16px; font-weight: 800;"  @click="navigatorFun('/Class')">
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
			<loading v-show="loadingRouteData"></loading>
			<!-- schedule -->
			<div v-show="!loadingRouteData" class="container-fluid" >
				<div style="width:98%; height: 620px; background-color: #FFFFFF; margin-top: 20px; margin-left: 1%;">
					<!-- <p style="margin-left: 2%; margin-top: 20px; font-size: 16px; font-weight: 600px;">今日课程</p> -->
					<div style="height: 30px;"></div>
					<!-- select -->
					<div style="margin-left: 85%; margin-top: -25px;">
						<select id='startDate'  class="form-control" style="width: 110px; height: 30px;">
  							<option v-for="m in dateArray.length" v-bind:key="m">{{dateArray[m-1]}}</option>
						</select>
					</div>

					<img v-show="isTurnLeft" v-on:click='leftOrRight(1)' style="position: absolute; margin-left: 10px; margin-top: 260px; cursor:pointer;" src="../../../static/img/org/schedule/left.png">
					<img v-show="isTurnRight" v-on:click='leftOrRight(2)' style="position: absolute; margin-left: 81%; margin-top: 260px; cursor:pointer;" src="../../../static/img/org/schedule/right.png">

					<!-- table -->
					<div style="">
					<table class="table " style="width: 90%; margin-top: 10px; margin-left: 5%; z-index: 0; ">
    					<thead style="">
							<tr style="display: block;">
								<th style="width: 200px; text-align: center; background-color: #FFE62F; border: 2px solid #FFFFFF;">
									<p style="position: absolute; margin-left: 80px; margin-top: -40px; color: #666666; font-size: 14px; text-decoration:none;">日期</p> 
									<p style="position: absolute; margin-left: 15px; margin-top: -20px; color: #666666; font-size: 14px; text-decoration:none;">时段</p> 
									<div style="position: absolute; margin-left: -10px; margin-top: -22px; width: 140px; height: 2px; transform:rotate(21deg); background-color: #FFFFFF; "></div>
								</th>
								<th style="width: 12.5%; text-align: center; background-color: #FFE62F; border: 2px solid #FFFFFF;" v-for="n in 7" v-bind:key="n">
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">{{titleDateArray[currentTitleDateIndex*7 + n-1].week}}</p> 
									<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">{{titleDateArray[currentTitleDateIndex*7 + n-1].date}}</p> 
								</th>
								
							</tr>
						</thead>

						<tbody style="display: block; height: 460px; overflow: auto;" >
							<tr style="height: 10px;" v-for="n in timeArray.length" v-bind:key="n">
								<td style="width: 200px; text-align: center; background-color: #FFE62F; border: 1px solid #F0EFF6;">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{timeArray[n-1]}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex][n-1].str != ' ' && tableInfoArray[dayIndex][n-1].arr.length == 0 ">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex][n-1].str != ' ' && tableInfoArray[dayIndex][n-1].arr.length != 0 " @click="checkClass(tableInfoArray[dayIndex][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+1][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+1][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+1][n-1].str != ' ' && tableInfoArray[dayIndex+1][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+1][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+1][n-1].str != ' '&& tableInfoArray[dayIndex+1][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+1][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+1][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+2][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+2][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+2][n-1].str != ' ' && tableInfoArray[dayIndex+2][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+2][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+2][n-1].str != ' ' && tableInfoArray[dayIndex+2][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+2][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+2][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+3][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+3][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+3][n-1].str != ' ' && tableInfoArray[dayIndex+3][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+3][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+3][n-1].str != ' ' && tableInfoArray[dayIndex+3][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+3][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+3][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+4][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+4][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+4][n-1].str != ' ' && tableInfoArray[dayIndex+4][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+4][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+4][n-1].str != ' ' && tableInfoArray[dayIndex+4][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+4][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+4][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+5][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+5][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+5][n-1].str != ' ' && tableInfoArray[dayIndex+5][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+5][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+5][n-1].str != ' ' && tableInfoArray[dayIndex+5][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+5][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+5][n-1].str}}</a> 
								</td>

								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6;" v-if="tableInfoArray[dayIndex+6][n-1].str == ' '">
									<a style="color: #666666; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+6][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+6][n-1].str != ' ' && tableInfoArray[dayIndex+6][n-1].arr.length == 0">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+6][n-1].str}}</a> 
								</td>
								<td style="width: 12.5%; text-align: center; border: 1px solid #F0EFF6; background-color: #FDB730;" v-if="tableInfoArray[dayIndex+6][n-1].str != ' ' && tableInfoArray[dayIndex+6][n-1].arr.length != 0" @click="checkClass(tableInfoArray[dayIndex+6][n-1].arr)">
									<a style="color: #fff; font-size: 14px; text-decoration:none;">{{tableInfoArray[dayIndex+6][n-1].str}}</a> 
								</td>

							</tr>
            		
						</tbody>

					</table>
					</div>

					<button class="button" style="margin-top: 0px; margin-left: 45%;" v-on:click="classInfo">查看课表详情</button>

				</div>
			</div>
	
        <!-- </div> -->

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div id="player" style="margin: auto;">
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
					</div>
					<div class="modal-body" style="height: 360px; text-align: center; margin-left: -40px; margin-top: 10px; overflow-y:scroll; overflow-x: hidden;">
						<ul v-for="n in classNameArray.length" v-bind:key="n">
							<a style="color: #333333; font-size: 18px; text-decoration:none;">{{classNameArray[n-1]}}</a>
						</ul>
					
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
  name: 'Schedule',
  data () {
	return {
	  loadingRouteData: true,
	  navImg_1: '../../../static/img/org/nav/nav_home1.png',
	  navImg_2: '../../../static/img/org/nav/nav_class1.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch2.png',
	  phone: '',
	  teacherID: '',

	  dateArray: [],
	  timeArray: [],
		firstDate: '',
		
		fix_classInfoArray: [
				{'week': '周一', 'date': '--', 'info': []},
				{'week': '周二', 'date': '--', 'info': []},
				{'week': '周三', 'date': '--', 'info': []},
				{'week': '周四', 'date': '--', 'info': []},
				{'week': '周五', 'date': '--', 'info': []},
				{'week': '周六', 'date': '--', 'info': []},
				{'week': '周日', 'date': '--', 'info': []},
		],

	  titleDateArray: [
				{'week': '周一', 'date': '--'},
				{'week': '周二', 'date': '--'},
				{'week': '周三', 'date': '--'},
				{'week': '周四', 'date': '--'},
				{'week': '周五', 'date': '--'},
				{'week': '周六', 'date': '--'},
				{'week': '周日', 'date': '--'},
	  ],
	  currentTitleDateIndex: 0,

	  classInfoArray: [],
		tableInfoArray: [],

		classNameArray: [],

	  isTurnLeft: false,
	  isTurnRight: true,

	  dayIndex: 0,
	  currentStartDate: '',
	  currentMonDays: 30 // 当前所选月份中，可查看的天数
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
	console.log('1.')
	$(document).ready(function () {  
	  console.log('2.')
　　  $('#startDate').change(function () {
		console.log('3.')
		that.startDateSelChange()
　　　}) 
	})
	this.get_timeSlot()
  },
  methods: {
	get_timeSlot () {
	  var that = this
	//   this.$http.get('http://101.201.152.181:9010/Schedule/timeSlot?uid=' + this.teacherID, {
	// 	emulateJSON: true
	//   })
	  axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Schedule/timeSlot?uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function (response) {
		if (response.data.code === 1) {
		  that.dateArray = []
		  that.dateArray = response.data.date.month

		  that.firstDate = response.data.date.date_info.date

		  var dateArray = that.dateArray[0].split('-')
		  var date = dateArray[0] + dateArray[1]

		  that.get_schedule(date)
		}
		else {
		}
	  })
	},

	// date: 201807
	get_schedule (date) {
	  var that = this
	//   this.$http.get('http://101.201.152.181:9010/Schedule/scheduleTimeInfo?uid=' + this.teacherID + '&date='+date, {
	// 	emulateJSON: true
	//   })
	  axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Schedule/scheduleTimeInfo?uid=' + this.teacherID + '&date=' + date,
      method: 'get'
	  })
	  .then(function (response) {
	    if (response.data.code === 1) {
		  	that.dayIndex = 0

		  	that.timeArray = []
		  	that.timeArray = response.data.data.time_slot
		  	that.timeArray[0] = '08:00'
		  	that.timeArray[1] = '08:30'
		  	that.timeArray[2] = '09:00'
		  	that.timeArray[3] = '09:30'

				that.classInfoArray = []
				for (var i = 0; i < response.data.data.class_info.length; i++) {
					if(i == 0) {
						//fix days
						var firstDays = response.data.data.class_info[0].week
						var weekArray = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
						var firstIndex = weekArray.indexOf(firstDays)
						if(firstIndex > 0 && firstIndex <= 6) {
								for(var j=0; j<firstIndex; j++) {
									console.log('j: ', j+", date: ", that.fix_classInfoArray[j]);
									that.classInfoArray.push(that.fix_classInfoArray[j]);
								}	
						}
					
					}

					that.classInfoArray.push(response.data.data.class_info[i])
				}
				// console.log('classInfoArray: ', that.classInfoArray)
				
		  	// 处理title显示数据
	    	that.titleDateArray = []
		  	for (var i = 0; i < that.classInfoArray.length; i++) {
		    	var dItem = {
			  		'week': that.classInfoArray[i].week,
			  		'date': that.classInfoArray[i].date
					}
					that.titleDateArray.push(dItem)
				}
				
				// console.log('titleDateArray: ', that.titleDateArray)

		  	// 处理class_info
				that.tableInfoArray = []
		  	for (var i = 0; i < that.classInfoArray.length; i++) {
					var tArray = []
					for(var j = 0; j < that.timeArray.length; j++) {
						var item = {
							'str': ' ',
							'arr': []
						}
			  		tArray.push(item)
					}
					that.tableInfoArray.push(tArray)
				
				}
				
				console.log('--tableInfoArray: ', that.tableInfoArray)

		  	for (var i = 0; i < that.classInfoArray.length; i++) {
					var info = that.classInfoArray[i].info
					for (var j = 0; j < info.length; j++) {
						if(that.timeArray.indexOf(info[j].study_time) > 0) {

							var indexTime = that.timeArray.indexOf(info[j].study_time)
							if(that.tableInfoArray[i][indexTime].str != ' ') {
								that.tableInfoArray[i][indexTime].str += (','+info[j].class_name)
							}
							else {
								that.tableInfoArray[i][indexTime].str = info[j].class_name
							}
						}
						
			  		
					}
				}

				for (var i = 0; i < that.tableInfoArray.length; i++) {
					for (var j = 0; j < that.tableInfoArray[i].length; j++) {
						var className = that.tableInfoArray[i][j].str
						if(className.indexOf(',') > 0) {
							var cArray = className.split(',')
							var len = cArray.length
							that.tableInfoArray[i][j].str = (cArray[0]+'('+len.toString()+')')

							that.tableInfoArray[i][j].arr = cArray
						}
					}
				}
				
				// console.log('tableInfoArray: ', that.tableInfoArray)
				// console.log('tableInfoArray_date: ', that.tableInfoArray_date)

		  	that.init_showWeekDays(that.dateArray[0])
	    }
			else {
			
			}
	  })
	},

	// dateString: '2018-10-01'
	getWeek (dateString) {
	  var dateArray = dateString.split('-')
	  var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
	  var week = '星期' + '日一二三四五六'.charAt(date.getDay())
	  return week
	},

	// select月份日期选择响应函数
	startDateSelChange: function () {
	  console.log('....')
	  var obj = document.getElementById('startDate')
	  var index = obj.selectedIndex
	  var date = this.dateArray[index]

	  var ddArray = date.split('-')

	  this.loadingRouteData = true
	  this.get_schedule(ddArray[0]+ddArray[1])
	},

	// date: '2018-01' or '2018-01-01'
	init_showWeekDays: function(date) {
	  this.currentTitleDateIndex = 0;

	  // 补齐：每个都为7天的展示
	  var fix_len = Math.abs(this.titleDateArray.length % 7 - 7)
	  fix_len = fix_len == 7 ? 0 : fix_len
	  for (var i = 0; i < fix_len; i++) {
		var dd = {
		  'date': ' ',
		  'week': ' '
		}
		this.titleDateArray.push(dd)

		var aa = []
		for (var j = 0; j < this.timeArray.length; j++) {
			var item = {
				'str': ' ',
				'arr': []
			}
			aa.push(item)
			
		}
		this.tableInfoArray.push(aa)
	  }

	  this.isTurnLeft = false
	  // 2页已上
	  var pageNum = parseInt(this.titleDateArray.length / 7)
	  this.isTurnRight = pageNum >= 2 ? true : false

	  this.loadingRouteData = false
	},

	// 左右按钮
	leftOrRight: function (num) {
	  if (num == 1) { // left
		this.currentTitleDateIndex--
	  }
	  else { // right
		this.currentTitleDateIndex++
	  }
	  console.log('1===', this.currentTitleDateIndex)

	  this.isTurnLeft = this.currentTitleDateIndex === 0 ? false : true
	  this.isTurnRight = this.currentTitleDateIndex * 7 >= this.titleDateArray.length - 8 ? false : true

	  this.dayIndex = this.currentTitleDateIndex * 7
	},

	classInfo: function () {
	  this.navigatorFun('/waijiao/scheduleInfo')
	},

	checkClass: function(classNameArray) {
		this.classNameArray = classNameArray
		console.log(this.classNameArray)

		$('#myModal_student').modal('show')
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
	width: 220px;
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
	width: 120px;
	height: 30px;
	background-color: #F85415;
	border: none;
	color: #fff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}
</style>
