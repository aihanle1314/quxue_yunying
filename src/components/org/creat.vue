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
                        <a style="font-size: 16px; font-weight: 800;" @click="navigatorFun('/Home')">
							<img style="float: left; width: 22px; height: 20px; margin-left: 40px;" :src="navImg_1">
							<a style="margin-left: 15px; color: #747C8D; text-decoration:none;">首页</a>
						</a>
                    </li>
                    <li style="cursor:pointer;">
						<a style="font-size: 16px; font-weight: 800;"  class="active-menu" @click="navigatorFun('/Class')">
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
			<div class="container-fluid" v-show="true">
				<div style="width:96%; height: 600px; background-color: #FFFFFF; margin-top: 20px; margin-left: 2%;" >
					<div class="container-fluid">
						<p style="margin-top: 10px; width: 100px; font-size: 10px; color: #F85415; cursor: pointer;" v-on:click='goback'>{{back}}</p>
						<p v-show="showTishi" style="position: absolute; margin-top: -20px; margin-left: 30%; font-size: 14px; font-weight: bold; color: #F85415;">{{tishi}}</p>
					</div>
					<!-- 第一步 -->
					<div class="container-fluid" v-show="isCreatDiv1">
						<div style="width:60%; height: 40px; margin-top: 10px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级名称</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="自定义班级名称，建议“XX教育XX班”" v-model="className">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 75px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 85px; margin-top: 10px; font-size: 14px; font-weight: bold;">年级</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<select id='gradeSel' class="form-control" style="width: 380px; margin-left: 20px; background-color: #E3E5E8;">
  									<option>学前</option>
  									<option>1年级</option>
  									<option>2年级</option>
  									<option>3年级</option>
  									<option>4年级</option>
  									<option>5年级</option>
  									<option>6年级</option>
								</select>
							</div>
							<p style="position: absolute; margin-left: 140px; margin-top: 43px; font-size: 8px; color: #AAB2C2">注：同一个班学生建议不要跨两个年级，如跨年级则此处选择本班最低学生年级。</p>
						</div>
            
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级类型</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<select id="classFormat" v-model="class_format" class="form-control" style="width: 380px; margin-left: 20px; background-color: #E3E5E8;">
  									<option :value="1">双师班</option>
  									<option :value="2">小班</option>
								</select>
						  </div>
						</div>

						<div style="width:60%; height: 80px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">课程类型</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<select id="classType" class="form-control" style="width: 380px; margin-left: 20px; background-color: #E3E5E8;">
  									<option>正式课程</option>
  									<option>体验课程</option>
								</select>
							</div>

							<p style="position: absolute; margin-left: 140px; margin-top: 43px; font-size: 8px; color: #AAB2C2;">
								注:
							</p>
							<p style="position: absolute; width: 380px; margin-left: 160px; margin-top: 43px; font-size: 8px; color: #AAB2C2;">
								选择“固定班级”，可为已付费班级选择固定上课时间，如每周一、三17:00上课， 适合长期上课班级； 
							</p>
							<p style="position: absolute; width: 380px; margin-left: 160px; margin-top: 80px; font-size: 8px; color: #AAB2C2;">
								选择“体验班级”，可为体验班级选择某天某时段上课，适合短期上课。							
							</p>
						</div>

            <div v-if="class_format===1">
						<div style="width:60%; height: 40px; margin-top: 30px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 35px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 45px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教英文名</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="配合外教老师上课的中教老师英文名" v-model="zhName">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 5px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 15px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教老师手机号</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" maxlength="11" placeholder="配合外教老师上课的中教老师手机号" v-model="zhPhone">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 45px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 55px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生人数</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生人数，建议10-20人" v-model="studentNum">
							</div>
						</div>
          
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生英文名单，名字间用逗号隔开" v-model="studnetList">
							</div>
						</div>
            </div>

            <div v-if="class_format===2">
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<button class="button" style="position: absolute; margin-left: 160px; margin-top: 10px;" v-on:click="handleStudent()">选择</button>
						  <div style="position: absolute;margin-left:140px;margin-top:50px;width:400px;">
							  <el-tag type="warning" v-for="tag in domains" :key="tag.key" closable
                  :disable-transitions="false" @close="removeDomain(tag)"
                  style="margin-left:10px;margin-bottom:10px;">
                  {{tag.value}}
                </el-tag>
							</div>
						</div>
            </div>
						<button v-if="isFix!='true'" class="button" v-on:click="checkClassName()">下一步</button>	
						<button v-if="isFix=='true'" class="button" style="width: 100px;" v-on:click="next(1)">下一步(修改)</button>	
					</div>
					<!-- 第一步 fixInfo -->
					<div class="container-fluid" v-show="isCreatDiv1_fixInfo1">
						<div style="width:60%; height: 40px; margin-top: 10px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级名称</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.class_name}}</p>
						
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 75px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 85px; margin-top: 10px; font-size: 14px; font-weight: bold;">年级</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.grade}}</p>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级类型</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.class_format}}</p>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">课程类型</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.class_type}}</p>
						</div>
            
						<div v-if="class_format===1">
						<div style="width:60%; height: 40px; margin-top: 30px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 35px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 45px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教英文名</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="配合外教老师上课的中教老师英文名" v-model="zhName">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 5px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 15px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教老师手机号</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" maxlength="11" placeholder="配合外教老师上课的中教老师手机号" v-model="zhPhone">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 45px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 55px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生人数</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生人数，建议10-20人" v-model="studentNum">
							</div>
						</div>
            
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<!-- <p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{studnetList}}</p> -->
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生英文名单，名字间用逗号隔开" v-model="studnetList">
							</div>
						</div>
            </div>

						<div v-else-if="class_format===2">
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<button class="button" style="position: absolute; margin-left: 160px; margin-top: 10px;" v-on:click="handleStudent()">选择</button>
						  <div style="position: absolute;margin-left:140px;margin-top:50px;width:400px;">
							  <el-tag type="warning" v-for="tag in domains" :key="tag.key" closable
                  :disable-transitions="false" @close="removeDomain(tag)"
                  style="margin-left:10px;margin-bottom:10px;">
                  {{tag.value}}
                </el-tag>
							</div>
						</div>
            </div>

						<button class="button" v-on:click="next(1)">修改</button>	
					</div>
					<!-- 第一步 fixInfo2-->
					<div class="container-fluid" v-show="isCreatDiv1_fixInfo2">
						<div style="width:60%; height: 40px; margin-top: 10px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级名称</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="自定义班级名称，建议“XX教育XX班”" v-model="className">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 75px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 85px; margin-top: 10px; font-size: 14px; font-weight: bold;">年级</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<select id='gradeSel' class="form-control" style="width: 380px; margin-left: 20px; background-color: #E3E5E8;">
  									<option>学前</option>
  									<option>1年级</option>
  									<option>2年级</option>
  									<option>3年级</option>
  									<option>4年级</option>
  									<option>5年级</option>
  									<option>6年级</option>
								</select>
							</div>
							<p style="position: absolute; margin-left: 140px; margin-top: 43px; font-size: 8px; color: #AAB2C2">注：同一个班学生建议不要跨两个年级，如跨年级则此处选择本班最低学生年级。</p>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">班级类型</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.class_format}}</p>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 50px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">课程类型</p>
							<p style="position: absolute; margin-left: 140px; margin-top: 10px; font-size: 14px; font-weight: bold;">{{fixInfo.class_type}}</p>
						</div>
            
						<div v-if="class_format===1">
						<div style="width:60%; height: 40px; margin-top: 30px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 35px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 45px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教英文名</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="配合外教老师上课的中教老师英文名" v-model="zhName">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 5px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 15px; margin-top: 10px; font-size: 14px; font-weight: bold;">中教老师手机号</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" maxlength="11" placeholder="配合外教老师上课的中教老师手机号" v-model="zhPhone">
							</div>
						</div>

						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 45px; margin-top: 12px; font-size: 14px; font-weight: bold; color: red">*</p>
							<p style="position: absolute; margin-left: 55px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生人数</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生人数，建议10-20人" v-model="studentNum">
							</div>
						</div>
            
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<div style="position: absolute; margin-left: 120px; margin-top: 6px;">
								<input id='name_input' class="creat-input" type="text" placeholder="参与外教课的学生英文名单，名字间用逗号隔开" v-model="studnetList">
							</div>
						</div>
            </div>

						<div v-else-if="class_format===2">
						<div style="width:60%; height: 40px; margin-top: 20px; margin-left: 20%;">
							<p style="position: absolute; margin-left: 60px; margin-top: 10px; font-size: 14px; font-weight: bold;">学生名单</p>
							<button class="button" style="position: absolute; margin-left: 160px; margin-top: 10px;" v-on:click="handleStudent()">选择</button>
						  <div style="position: absolute;margin-left:140px;margin-top:50px;width:400px;">
							  <el-tag type="warning" v-for="tag in domains" :key="tag.key" closable
                  :disable-transitions="false" @close="removeDomain(tag)"
                  style="margin-left:10px;margin-bottom:10px;">
                  {{tag.value}}
                </el-tag>
							</div>
						</div>
            </div>

						<button class="button" v-on:click="next(1)">修改</button>	
					</div>
					<!-- 第二步 （固定班级）帮助 -->
					<div v-show="isCreatDiv2" style="position: absolute; margin-left: 78%; margin-top: -30px; cursor:pointer; "> 
						<el-dropdown style="height:70px;">
                <span style="position: relative; display: inline-block;color: #000; cursor: pointer; vertical-align: middle; font-size: 16px;">
                    <img style="position: absolute; width: 40px; height: 40px; " src="../../../static/img/org/home/help.png">
										<p style="position: absolute; width: 70px; height: 50px; margin-left: 5px; margin-top: 40px;">帮助</p>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 360px;">
									<el-dropdown-item>1.上课频次：如选择周一、三、五，则固定每周一、三、五均为本班级上课时间</el-dropdown-item>
                  <el-dropdown-item>2.选择时段：只能选择一个时段，如选择16:00，则每次上课时间均为16:00-16:25</el-dropdown-item>
                  <el-dropdown-item>3.选择开班日期：选定某日期，表示本班级在此日期后可以随时上课，一般提交申请后5-7内即可开始上课。</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
					</div>
					<!-- 第二步 （固定班级） -->
					<div class="container-fluid" v-show="isCreatDiv2">
						<!-- week -->
						<div style="width: 80%; height: 80px; margin-top: -10px; margin-left: 10%;">
							<p style="position: absolute; font-size: 12px; font-weight: bold;">选择上课日期，可多选</p>
							<button id='weekBtn1' class="button1" v-on:click="weekSel(1)">星期一</button>
							<button id='weekBtn2' class="button1" v-on:click="weekSel(2)">星期二</button>
							<button id='weekBtn3' class="button1" v-on:click="weekSel(3)">星期三</button>
							<button id='weekBtn4' class="button1" v-on:click="weekSel(4)">星期四</button>
							<button id='weekBtn5' class="button1" v-on:click="weekSel(5)">星期五</button>
							<button id='weekBtn6' class="button1" v-on:click="weekSel(6)">星期六</button>
							<button id='weekBtn7' class="button1" v-on:click="weekSel(7)">星期日</button>
						</div>
						<!-- time -->
						<div style="width: 80%; height: 140px; margin-top: -10px; margin-left: 10%;">
							<p style="position: absolute; font-size: 12px; font-weight: bold;">选择时段</p>
							<div style="height: 20px;"></div>
							<button v-for="n in timeArray.length" class="button2" :id="timeIDArray[n-1]" v-on:click="timeSel(n-1)" v-bind:key="n">
								{{timeArray[n-1]}}
							</button>
						</div>
						<!-- date -->
						<div style="width: 80%; height: 240px; margin-top: -20px; margin-left: 10%;">
							<p style="position: absolute; font-size: 12px; margin-top: 10px; font-weight: bold;">选择开课日期</p>
							<div style="margin-left: 85%; margin-top: 6px;">
								<select id='startDate' class="form-control" style="width: 110px; height: 30px; background-color: #E3E5E8;">
  									<option v-for="m in dateArray.length" v-bind:key="m">{{dateArray[m-1]}}</option>
								</select>
							</div>
							<table class="table table-striped table-condensed"  style="width: 96%; margin-top: 0px; margin-left: 2%; z-index: 0;">
								<thead style="background-color: #F5F6F9;">
									<tr>
										<th style="width: 14%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期一</a> 
										</th>
										<th style="width: 14%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期二</a> 
										</th>
										<th style="width: 14%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期三</a> 
										</th>
										<th style="width: 14%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期四</a> 
										</th>
										<th style="width: 14%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期五</a> 
										</th>
										<th style="width: 15%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期六</a> 
										</th>
										<th style="width: 15%; text-align: center;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">星期日</a> 
										</th>
									</tr>
								</thead>
								<tbody >
									<tr v-for="x in weekNum" style="line-height:100%; height: 10px;" v-bind:key="x">
										<td v-for="y in 7" class="button3" v-on:click='daySel((x-1)*7 + y-1)' :id="daysIDArray[(x-1)*7 + y-1]" v-bind:key="y">
											{{daysArray[(x-1)*7 + y-1]}}
										</td>
									</tr>
									
								</tbody>	
							</table>
						</div>
						<!-- 课时量 -->
						<div style="width: 80%; height: 60px; margin-top: 20px; margin-left: 10%;">
							<p style="position: absolute; margin-left: 15%; margin-top: 10px; font-size: 14px; font-weight: bold;">课时量</p>
							<div style="position: absolute; margin-left: 20%; margin-top: 6px;">
								<input class="class-input" type="text"  maxlength="4" placeholder="请输入课时" v-model="classTimeNum">
							</div>
							<p style="position: absolute; margin-left: 20%; width: 300px; margin-top: 43px; font-size: 8px; color: #383a40">注：趣学外教每个级别课时为24课时，建议按24的倍数填写课时，若小于24课时，则不能完整学习一个级别</p>
						</div>

						<button v-if="isFix!='true'" class="button" style="margin-top: 20px;" v-on:click="next(2)">提交</button>
						<button v-if="isFix=='true'" class="button" style="margin-top: 20px;" v-on:click="next(2)">提交(修改)</button>
					</div>
					

					<!-- 第二步 (体验班级) -->
					<div class="container-fluid" v-show="isCreatDiv3">
						<!-- date -->
						<div style="width: 96%; height: 240px; margin-top: -40px; margin-left: 2%;">
							<!-- <p style="position: absolute; font-size: 12px; margin-top: 10px; font-weight: bold;">选择上课日期</p> -->
							<p style="position: absolute; margin-left: 80px; margin-top: 5px; font-size: 10px; color: #666666">*点击下方表格，即可预约该时间段课程，再次点击可取消</p>
							<div style="margin-left: 88%; margin-top: 10px;">
								<select id='startDate2' class="form-control" style="width: 110px; height: 30px; background-color: #E3E5E8;">
  									<option v-for="m in dateArray.length" v-bind:key="m">{{dateArray[m-1]}}</option>
								</select>
							</div>

							<img v-show="isTurnLeft" v-on:click='leftOrRight(1)' style="position: absolute; margin-left: -20px; margin-top: 260px; cursor:pointer;" src="../../../static/img/org/schedule/left.png">
							<img v-show="isTurnRight" v-on:click='leftOrRight(2)' style="position: absolute; margin-left: 73%; margin-top: 260px; cursor:pointer;" src="../../../static/img/org/schedule/right.png">

							<table class="table table-condensed"  style="width: 96%; margin-top: 5px; margin-left: 2%; z-index: 0;">
								<thead style="background-color: #FFE62F;">
									<tr style="display: block;">
										<th style="width: 200px; text-align: center;">
											<p style="color: #666666; font-size: 14px; text-decoration:none;">时段</p> 
										</th>
										<th style="width: 12.5%; text-align: center;" v-for="n in 7" v-bind:key="n">
											<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">{{titleDateArray[currentTitleDateIndex*7 + n-1].week}}</p> 
											<p style="height: 10px; color: #666666; font-size: 14px; text-decoration:none;">{{titleDateArray[currentTitleDateIndex*7 + n-1].date}}</p> 
										</th>
										
									</tr>
								</thead>
								<tbody style="display: block; height: 460px; overflow: auto;">
									<tr v-for="n in timeArray.length" style="line-height:100%; height: 10px;" v-bind:key="n">
										<td style="width: 200px; text-align: center; background-color: #FFE62F; border: 1px solid #F0EFF6;">
											<a style="color: #666666; font-size: 14px; text-decoration:none;">{{timeArray[n-1]}}</a> 
										</td>
										<td :id="selectTableItemArray_id[n-1][0]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][0])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][1]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][1])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][2]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][2])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][3]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][3])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][4]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][4])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][5]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][5])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										<td :id="selectTableItemArray_id[n-1][6]" class="selDay" v-on:click="selectItem(selectTableItemArray_id[n-1][6])">
											<!-- <a style="color: #ffffff; font-size: 14px; text-decoration:none;">已选</a>  -->
										</td>
										
									</tr>
								</tbody>	
							</table>
						</div>

						<button v-if="isFix!='true'" class="button" style="margin-top: 320px;" v-on:click="next(2)">提交</button>
						<button v-if="isFix=='true'" class="button" style="margin-top: 320px;" v-on:click="next(2)">提交(修改))</button>
					</div>
				</div>
			</div>
        <!-- </div> -->

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
						<p style="color: #666666; font-size: 14px;">您已选择</p> 
						<p style=" color: #666666; font-size: 14px;">{{warnLabel1}}</p> 
						<p style="color: #666666; font-size: 14px;">{{warnLabel2}}</p>
						<p style="color: #666666; font-size: 14px;">开始上课</p> 
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod1" @click="cancel">
							取消
						</button>
						<button class="buttonMod2" @click="creatClass">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
					<div class="modal-body" style="height: 120px; margin-top: 40px; text-align: center;">
						<p style="margin-left: 40px; font-size: 14px; font-weight: bold;">您的外教课申请已提交,</p> 
						<p style="margin-left: 90px; font-size: 14px; font-weight: bold;">趣学教务老师会尽快通知您结果</p> 
						<img style="position: absolute; margin-left: -120px; margin-top: -60px;" src="../../../static/img/org/bingo.png">
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod2" @click="submit">
							知道了
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
					<div class="modal-body" style="height: 180px; margin-top: -10px; text-align: center;">
						<p style="color: #666666; font-size: 14px;">您已选择</p> 
						<div style="height: 90px; overflow: scroll; overflow-y:scroll; ">
							<p style=" color: #666666; font-size: 14px;" v-for="n in selectDateArray.length" v-bind:key="n">
								{{selectDateArray[n-1]}}
							</p> 
						</div>
						
						<p style="color: #666666; font-size: 14px;">开始上课</p> 
					</div>
					
					<div class="modal-footer">
						<button class="buttonMod1" @click="cancel">
							取消
						</button>
						<button class="buttonMod2" @click="creatClass">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal_fixInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
			<div class="modal-dialog" style="width: 400px;">
				<div class="modal-content">
					<div class="modal-body" style="height: 80px; text-align: center; margin-top: 10px; overflow-y:scroll; overflow-x: hidden;">
						<a style="color: #333333; font-size: 18px; text-decoration:none;">编辑班级成功</a>
					</div>

					<div class="modal-footer">
						<button class="buttonMod2" @click="finishFixInfo">
							知道了
						</button>
					</div>
					
					
				</div>
			</div>
		</div>
    <!--选择小班学生 -->
		<el-dialog :visible.sync="dialogVisible" width="60%">
          <div slot="title" class="dialog-title">
            请选择学生
          </div>
          <div>
           <el-transfer class="transfer-box" v-model="selStudents" :data="studentShow" filterable
            :filter-method="studfilterMethod" :render-content="renderFunc"
            filter-placeholder="请输入机构名称/学生姓名/手机号" :target-order="'push'"
            :titles="['学生列表', '已选学生']">
           </el-transfer>
         </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" icon="el-icon-plus" style="position:absolute;left:10px;"
            @click.native="handleAddStudent">添加学生</el-button>
          <el-button type="primary" size="small" @click.native="selectStudent">确 定</el-button>
          <el-button size="small" @click.native="dialogVisible=false">取 消</el-button>
        </div>
        <el-dialog title="添加学生" :visible.sync="addDialogVisible"
          append-to-body>
        <el-form ref="stuform" :inline="true" :model="stuform" :rules="sturules">
           <el-form-item>
              <el-input v-model="stuform.s_name" placeholder="学生姓名" style="width:140px;" ></el-input>
          </el-form-item>
          <el-form-item>
              <el-input v-model="stuform.en_name" placeholder="英文名" style="width:140px;"></el-input>
          </el-form-item>
          <el-form-item>
              <el-input v-model="stuform.phone" placeholder="手机号" style="width:140px;"></el-input>
          </el-form-item>
          <el-form-item>
              <el-select v-model="stuform.grade" placeholder="请选择" style="width:110px;">
                  <el-option v-for="item in gragelist" :key="item" :label="item" :value="item">
                  </el-option>
              </el-select>
          </el-form-item>
           <el-form-item>
                <el-button type="primary" :loading="stuaddloading" @click="onSubmitStuForm('stuform')">提交</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
	</div>

	

</template>

<script>
import axios from 'axios'
import vnav from './vnav.vue'
import loading from './loading.vue'
import { setCookie, getCookie, delCookie, delCookieOne } from '../../assets/js/cookie.js'
export default {
  name: 'Creat',
  data () {
    return {
	  isCreatDiv1: true,
	  isCreatDiv2: false,
		isCreatDiv3: false,
		isCreatDiv1_fixInfo1: false,
		isCreatDiv1_fixInfo2: false,
	  showTishi: false,
	  tishi: '',
	  navImg_1: '../../../static/img/org/nav/nav_home1.png',
	  navImg_2: '../../../static/img/org/nav/nav_class2.png',
	  navImg_3: '../../../static/img/org/nav/nav_sch1.png',
	  phone: '',
	  teacherID: '',

	  back: '<返回上一页',
	  backIndex: 0,

	  className: '',
	  zhName: '',
	  zhPhone: '',
	  studentNum: '',
	  studnetList: '',
	  classTimeNum: '',

	  gradeIndex: 0,
		classTypeIndex: 0, // 课程类型
		class_format: 1, // 班级类型

	  selTimeIndex: -1,
	  selDayIndex: -1,
	  selStartMon: '',
	  selStartDay: '',

	  timeArray: [],

	  timeIDArray: ['timeBtn0', 'timeBtn1', 'timeBtn2', 'timeBtn3', 'timeBtn4', 'timeBtn5', 'timeBtn6', 'timeBtn7', 'timeBtn8', 'timeBtn9', 
					'timeBtn10', 'timeBtn11', 'timeBtn12', 'timeBtn13', 'timeBtn14', 'timeBtn15', 'timeBtn16', 'timeBtn17', 'timeBtn18',
					'timeBtn19', 'timeBtn20', 'timeBtn21', 'timeBtn22', 'timeBtn23', 'timeBtn24', 'timeBtn25'],
	  dateArray: ['2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12'],
	  daysArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
				"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
				"21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
				"", "", "", "", ""],
	  daysIDArray: ["dayBtn1", "dayBtn2", "dayBtn3", "dayBtn4", "dayBtn5", "dayBtn6", "dayBtn7", "dayBtn8", "dayBtn9", "dayBtn10",
				"dayBtn11", "dayBtn12", "dayBtn13", "dayBtn14", "dayBtn15", "dayBtn16", "dayBtn17", "dayBtn18", "dayBtn19", "dayBtn20",
				"dayBtn21", "dayBtn22", "dayBtn23", "dayBtn24", "dayBtn25", "dayBtn26", "dayBtn27", "dayBtn28", "dayBtn29", "dayBtn30",
				"dayBtn31", "dayBtn32", "dayBtn33", "dayBtn34", "dayBtn35", "dayBtn36", "dayBtn37", "dayBtn38", "dayBtn39", "dayBtn40",
				"dayBtn41", "dayBtn42"],
	  isweekArray: [false, false, false, false, false, false, false],
	  weekArray: ['周一', '周二', '周三', '周四', '周五','周六', '周日'],
	  warnLabel1: '每周四、周日17：30上课',
	  warnLabel2: '5月11日',

	  weekNum: 6,
	  firstDate: '',
	  startDayIndex: 0,
	  endDayIndex: 35,

	  selectTableItemArray_is: [],
	  selectTableItemArray_id: [],

	  selectTableNumArray: [],

	  isTurnLeft: false,
	  isTurnRight: true,

	  titleDateArray: [
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
		{'week': '星期一', 'date': '06-08'},
	  ],
	  currentTitleDateIndex: 0,

	  selectDateArray: [],

		allClassNum: 0, //可选择最大课时量
		
		fixInfo: {
			'id': '12',
			'class_name': "学生名单啊",
			'mobile': "15120018725",
			'class_format': "双师班",
			'class_type': "固定",
			'teacher_name': "xueshengmingdan",
			'c_nums': "12",
			'en_teacher_name': "yanyan",
			'student_nums': "12",
			'status': "1",
			's_list': ['dfs', 'sdfs', 'ssdfsdf']
		},

		isFix: false,

    gragelist: ['学前', '1年级', '2年级', '3年级', '4年级', '5年级', '6年级'],
		dialogVisible: false,
    addDialogVisible: false,
    studentList: [], // 学生列表
		selStudents: [], // 选中的学生
		domains: [],
    renderFunc (h, option) {
      return <div><div class="render-cbitem">{ option.label }</div><div class="render-cbitem">{ option.mobile }</div></div>
    },
    studfilterMethod (query, item) {
      if (item) {
        return item.label.indexOf(query) > -1 || item.mobile.indexOf(query) > -1
      } else {
        return false
      }
    },
	  stuform: { // 添加学生表单
      s_name: '',
      en_name: '',
      phone: '',
      grade: ''
    },
    sturules: {
        s_name: [
          { required: true, message: '请输入学生名称', trigger: 'blur' }
        ],
        en_name: [
          { required: true, message: '请输入英文名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ]
    },
    stuaddloading: false
    }
  },
  components: {
    loading
  },
  mounted () {
	/*页面挂载获取保存的cookie值，渲染到页面上*/
	this.phone = getCookie('phone')
	this.teacherID = getCookie('teacherID')

	this.isFix = getCookie('isFix')


	if(this.isFix == 'true') {
		var fixInfo = getCookie('classInfo')
		this.fixInfo = eval('(' + fixInfo + ')')
		// console.log('fixInfo: ', fixInfo)
		this.className = this.fixInfo.class_name
		this.zhName = this.fixInfo.teacher_name
		this.zhPhone = this.fixInfo.mobile
		this.studentNum = this.fixInfo.student_nums
		this.studnetList = this.fixInfo.s_list
		this.grade = this.fixInfo.grade

		this.domains = []
    if (this.fixInfo.class_format === '小班') {
			this.class_format = 2
      if (this.fixInfo.students) {
        this.fixInfo.students.forEach(item => {
          this.domains.push({
            value: item.name + ' ' + item.mobile,
            key: item.s_id
          })
        })
      }
    } else if (this.fixInfo.class_format === '双师班') {
      this.class_format = 1
		}

		if(this.fixInfo.status == '已排课') {
			this.isCreatDiv1 = false
			this.isCreatDiv1_fixInfo1 = true
			this.isCreatDiv1_fixInfo2 = false
		}
		else if(this.fixInfo.status == '未通过') {
			this.isCreatDiv1 = true
			this.isCreatDiv1_fixInfo1 = false
			this.isCreatDiv1_fixInfo2 = false
		}
		else {
			this.isCreatDiv1 = false
			this.isCreatDiv1_fixInfo1 = false
			this.isCreatDiv1_fixInfo2 = true
		}
	
	}

	// timeSlot
	this.get_timeSlot()

	this.get_course()

	var that = this
	$(document).ready(function () {
　　  $('#startDate').change(function () {
		that.startDateSelChange()
　　　}) 
	})

	$(document).ready(function () {  
　　　$('#startDate2').change(function () {  
		that.startDateSelChange2()
　　　}) 
	})
	},
	computed: {
    studentShow () {
      var data = []
      this.studentList.forEach((item, index) => {
        data.push({
          key: item.id,
          label: item.name + '-' + item.en_name,
          mobile: item.mobile
        })
      })
      return data
    }
  },
  methods: {
    get_course () {
	  var that = this
	  // this.$http.get('http://101.201.152.181:9010/Statistics/course?uid=' + this.teacherID, {
		// emulateJSON: true
		// })
		axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Statistics/course?uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function(response) {
		if (response.data.code === 1) {
		  that.allClassNum = response.data.data.lessons.remaining_course
		}
		else {
		}
	  })
	},

	get_timeSlot () {
	  var that = this
	  // this.$http.get('http://101.201.152.181:9010/Schedule/timeSlot?uid=' + this.teacherID, {
	  //   emulateJSON: true
		// })
		axios({
			baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Schedule/timeSlot?uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function (response) {
	    if (response.data.code == 1) {
		  that.selectDateArray = []
		  that.timeArray = []
		  that.timeArray = response.data.date.time_slot
		  that.timeArray[0] = '08:00'
		  that.timeArray[1] = '08:30'
		  that.timeArray[2] = '09:00'
		  that.timeArray[3] = '09:30'

		  that.dateArray = []
		  that.dateArray = response.data.date.month

		  that.firstDate = response.data.date.date_info.date

		  that.selStartMon = that.firstDate.substring(0, 7)

		  that.getDaysData(that.dateArray[0], 0)

		  that.initSelectTableItemArray()

		  that.init_showWeekDays(0, that.dateArray[0])
		}
		else {

		}
	  })
	},

	initSelectTableItemArray: function () {
	  this.selectTableItemArray_is = []
	  this.selectTableItemArray_id = []
	  this.selectTableNumArray = []
	  for (var i = 0; i < this.timeArray.length; i++) {
		var dd = []
		var cc = []

		for (var j = 0; j < 7; j++) {
		  dd.push(false)
		  var num = i*7 + j
		  var str_id = 'selDayID_' + num
		  cc.push(str_id)
		}
		this.selectTableItemArray_is.push(dd)
		this.selectTableItemArray_id.push(cc)
	  }
	},

	selectItem: function (idStr) {
	  var num = parseInt(idStr.substring(9, idStr.length))
	  console.log('**num: ', num)
	  // 通过num 转换为 上课日期
	  var timeIndex = parseInt(num / 7)
	  var dateIndex = num % 7

	  var indexD = this.currentTitleDateIndex * 7 + dateIndex
	  var obj = document.getElementById('startDate2')
	  var index = obj.selectedIndex
	  var dateA = this.dateArray[index].split('-')
	  var selDate = dateA[0] + '-' + this.titleDateArray[indexD].date
	  var selTime = this.timeArray[timeIndex]
	  var sel = selDate + ' ' + selTime

	  console.log('----日期: ', indexD + ', 时间: ', timeIndex)
	  console.log('----selDate: ', sel)

	  if (this.titleDateArray[indexD].date === ' ') {
		console.log('......')
		return
	  }
		
	  // 获取点击的item
	  var itemid = 'selDayID_' + num
	  var btn = document.getElementById(itemid)
	  var cl = btn.getAttribute('class')
	  if (cl === 'selDay') {
		btn.setAttribute('class', 'selDay_sel')
		btn.innerHTML = '已选'

		this.selectTableNumArray.push(num)
		this.selectDateArray.push(sel)
	  }
	  else if (cl === 'selDay_sel') {
		btn.setAttribute('class', 'selDay')
		btn.innerHTML = ''

		var index = this.selectTableNumArray.indexOf(num)
		this.selectTableNumArray.splice(index, 1)

		var index2 = this.selectDateArray.indexOf(sel)
		this.selectDateArray.splice(index2, 1)
	  }

	},

	// date: '2018-01' or '2018-01-01'
	init_showWeekDays: function (index, date) {
	  this.titleDateArray = []
	  this.currentTitleDateIndex = 0

	  var startYear = ''
	  var startMon = ''
	  var startDay = ''
	  var dd = ''
	  if (index == 0) {
		dd = this.firstDate.split('-')
		startDay = dd[2]
	  }
	  else {
		dd = date.split('-')
		if(date.length > 7) {
		  startDay = dd[2]
		}
		else {
		  startDay = '01'
		}
	  }
	  startYear = dd[0]
	  startMon = dd[1]

	  this.currentStartDate = startYear + '-' + startMon + '-' + startDay
	  // console.log('startMon: ', startMon);
	  // 确定所选的当前月，天数
	  if (parseInt(startMon) === 1 || parseInt(startMon) === 3 || parseInt(startMon) === 5 || parseInt(startMon) === 7 || parseInt(startMon) === 8 || parseInt(startMon) === 10 || parseInt(startMon) === 12) {
		this.currentMonDays = 31
	  }
	  else if (parseInt(startMon) === 2) {
		this.currentMonDays = 28
	  }
	  else {
		this.currentMonDays = 30
	  }
	  // 如果为当前月，去掉已经过去的天数
	  if (index === 0) {
		this.currentMonDays = this.currentMonDays - parseInt(startDay) + 1
	  }

	  // console.log('currentMonDays: ', this.currentMonDays);

	  for (var i = 0; i < this.currentMonDays; i++) {
		var startDate = startYear + '-' + startMon + '-' + startDay
		var dd = {
		  'date': startMon +"-"+ startDay,
		  'week': this.getWeek2(startDate)
		}
		this.titleDateArray.push(dd)

		var day = parseInt(startDay)
		day++
		startDay = day < 10 ? '0' + day : day
	  }

	  // 补齐：每个都为7天的展示
	  var fix_len = this.titleDateArray.length % 7
	
	  if (fix_len === 0) {
		fix_len = 7
	  }

	  for(var i=0; i<Math.abs(fix_len-7); i++) {
		var dd = {
		  'date': ' ',
		  'week': ' '
	    }
	    this.titleDateArray.push(dd)
	  }

	  // console.log(fix_len, this.titleDateArray)
	},

	// 左右按钮
	leftOrRight: function (num) {
	  if (num === 1) { // left
		this.currentTitleDateIndex--
	  }
	  else { // right
		this.currentTitleDateIndex++
	  }

	  this.isTurnLeft = this.currentTitleDateIndex === 0 ? false : true
	  this.isTurnRight = this.currentTitleDateIndex * 7 >= this.titleDateArray.length - 8 ? false : true

	  this.dayIndex = this.currentTitleDateIndex * 7

	  if (this.currentSelectedIndex === 0) {
		var dd = this.firstDate.split('-')
		this.dayIndex = this.dayIndex + parseInt(dd[2])
	  }

	  this.init_tableItem()
	},

	getWeek (dateString) {
	  var dateArray = dateString.split('-')
	  var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
	  var week = '星期' + '日一二三四五六'.charAt(date.getDay())
	  return '7123456'.charAt(date.getDay())
	},

	// dateString: '2018-10-01'
	getWeek2 (dateString) {
	  var dateArray = dateString.split('-')
	  var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
	  var week = '星期' + '日一二三四五六'.charAt(date.getDay())
	  return week
	},

	creatClass: function () {
	  var that = this

	  var obj1 = document.getElementById('gradeSel')
	  var index1 = obj1.selectedIndex
	  var grade = obj1.options[index1].text

	  var obj2 = document.getElementById('classType')
		var typeIndex = obj2.selectedIndex

	  var week = ''
	  for (var i = 0; i < this.isweekArray.length; i++) {
	    if (this.isweekArray[i]) {
		  week += this.weekArray[i] + ','
		}	
	  }
	  week = week.substring(0, week.length - 1)

	  // s_time
	  var time = this.timeArray[this.selTimeIndex]

	  // startDate
	  var obj = document.getElementById('startDate')
	  var index = obj.selectedIndex
	  var date = this.dateArray[index]
	  var start_date = date + '-' + this.selStartDay

	  var study_time = ''
	  for (var i = 0; i < this.selectDateArray.length; i++) {
		if (i === 0) {
		  study_time = this.selectDateArray[i]
		}
		else {
		  study_time += ','+this.selectDateArray[i]
		}
	  }

		// console.log('study_time: ', study_time)
		
	  var data = {
		'uid': parseInt(this.teacherID),
		'c_name': this.className,
		'grade': grade,
		't_name': this.zhName,
		'mobile': this.zhPhone,
		's_nums': parseInt(this.studentNum),
		's_list': this.studnetList,
		'c_type': typeIndex,
		'class_format': this.class_format,
		'week': week,
		's_time': time,
		'nums': parseInt(this.classTimeNum),
		'start_date': start_date,
		'study_time': study_time
		}
		
		var slist = ''
		if (this.class_format === 2) { // 小班
      this.domains.forEach((item, index) => {
        if (index === this.domains.length - 1) {
          slist += item.key
        } else {
          slist += item.key + ','
        }
			})
			data['s_list'] = slist
		}

	  jQuery.support.cors = true
	  $.ajax({
			url: this.$store.getters.wjBaseAPI + "/Schedule/createcourse",
			method: "post",
			data: data,
			dataType: 'json',
			crossDomain: true === !(document.all),
			success: function (response) {
				$('#myModal').modal('hide')
				$('#myModal3').modal('hide')
				if (response.code === 1) {
				$('#myModal2').modal('show')
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
	},

	goback: function () {
	  if (this.backIndex === 0) {
		// 返回首页
		this.navigatorFun('/waijiao/class')
	  }
	  else if (this.backIndex === 1) {
		// 返回第一页
		this.isCreatDiv1 = true
		this.isCreatDiv2 = false
		this.isCreatDiv3 = false
	  }
	},

	next: function (num) {
	  if (num === 1) {
	    var isEn = true
			var p = /[a-z]/i

			for (var i = 0; i < this.zhName.length; i++) {
		  	var b = p.test(this.zhName.substring(i, i+1))
		  	if (!b) {
					isEn = false
					break
		  	}
			}
			
			console.log('---isStr: ', b)
			if (this.className === '') {
		  	this.showTishi = true
				this.tishi = '班级名称不能为空！'
				return
			}

      if (this.class_format === 1) {
			  if (this.zhName === '') {
		  	  this.showTishi = true
					this.tishi = '中教英文名不能为空！'
					return
			  }
			  else if (!isEn) {
		  	  this.showTishi = true
					this.tishi = '请输入全英文名！'
					return
			  }
			  else if(this.zhName.indexOf(' ') >= 0) {
				  this.showTishi = true
					this.tishi = '英文名不能包含空格！'
					return
			  }
			  else if (this.zhPhone === '' || !this.checkNumber(this.zhPhone) || this.zhPhone.length !== 11 || !this.checkPhone(parseInt(this.zhPhone))) {
		  	  this.showTishi = true
					this.tishi = '请输入正确的中教老师手机号！'
					return
			  }
			  else if (this.studentNum === '' || !this.checkNumber(this.studentNum)) {
		  	  this.showTishi = true
					this.tishi = '请输入正确的学生人数！'
					return
			  }
		  } else if (this.class_format === 2) {
        if (this.domains.length > 4) {
          this.showTishi = true
					this.tishi = '学生人数不能超过4'
					return
				}
			}
		  this.showTishi = false
		  this.tishi = ''

			if(this.isFix == 'false' || this.fixInfo.status == '未通过') {
					console.log('------ 1212121')
					var obj1 = document.getElementById('gradeSel')
		  		this.gradeIndex = obj1.selectedIndex

		  		var obj2 = document.getElementById('classType')
		  		this.classTypeIndex = obj2.selectedIndex

		  		this.isCreatDiv1 = false
		  		if (this.classTypeIndex === 0) {
						this.isCreatDiv2 = true
						this.isCreatDiv3 = false
		  		}
		  		else {
						this.isCreatDiv2 = false
						this.isCreatDiv3 = true
		  		}
		  		this.backIndex = 1
			} else {
					console.log('------ 333333333')
					this.submitFix()
			}
	  }
	  else if (num === 2 && this.classTypeIndex === 0) {
			var isWeek = false
			for (var i = 0; i < this.isweekArray.length; i++) {
		  	if (this.isweekArray[i]) {
					isWeek = true
					break
		  	}
			}
		
			if (!isWeek) {
		  	this.showTishi = true
		  	this.tishi = '请选择上课日期！'
			}
			else if (this.selTimeIndex < 0) {
		  	this.showTishi = true
		  	this.tishi = '请选择时段！'
			}
			else if (this.selStartDay === '') {
		  	this.showTishi = true
		  	this.tishi = '请选择开课日期！'
			}
			else if (this.classTimeNum === '' || !this.checkNumber(this.classTimeNum)) {
		  	this.showTishi = true
		  	this.tishi = '请输入正确的课时量！'
			}
			else if (parseInt(this.classTimeNum) > this.allClassNum) {
		  	this.showTishi = true
		  	this.tishi = '填写的课时量不能超过拥有的课时量！'
			}
			else if (parseInt(this.classTimeNum) === 0) {
		  	this.showTishi = true
		  	this.tishi = '填写的课时量不能为0！'
			}
			else if (parseInt(this.classTimeNum) < 12) {
		  	this.showTishi = true
		  	this.tishi = '填写的课时量至少为12！'
			}
			else {
		  	this.showTishi = false
		  	this.tishi = ''

		  	this.warnLabel1 = '每'
		  	for (var i = 0; i < this.isweekArray.length; i++) {
					if (this.isweekArray[i]) {
			  		this.warnLabel1 += this.weekArray[i] + ','
					}	
		  	}

		  	this.warnLabel1 += this.timeArray[this.selTimeIndex]

		  	var obj = document.getElementById("startDate")
		  	var index = obj.selectedIndex
		  	var date = this.dateArray[index]
		  	this.warnLabel2 = date + '-' + this.selStartDay

		  	$('#myModal').modal('show')	
			}
	  }
	  else if (num === 2 && this.classTypeIndex === 1) {
			if(this.selectDateArray.length <= 0) {
		  	this.showTishi = true
		  	this.tishi = '请选择上课日期！'
			}
			else {
		  	this.showTishi = false
		  	this.tishi = ''

		  	$('#myModal3').modal('show')
			}
	  }
	},

	weekSel: function (num) {
	  this.isweekArray[num-1] = !this.isweekArray[num-1]

	  var btn = document.getElementById('weekBtn' + num)
	  if (this.isweekArray[num-1]) {
	    btn.setAttribute('class', 'button1_p')
	  } 
	  else {
		btn.setAttribute('class', 'button1')
	  }
	},

	timeSel: function (num) {
	  var btn = document.getElementById('timeBtn' + num)
	  btn.setAttribute('class', 'button2_p')

	  if (this.selTimeIndex >= 0) {
		var btn2 = document.getElementById('timeBtn' + this.selTimeIndex)
		btn2.setAttribute('class', 'button2')
	  } 

	  this.selTimeIndex = num
	},

	daySel: function (num) {
	  // 确定index
	  var obj = document.getElementById('startDate')
	  var index = obj.selectedIndex

	  // 确定disableIndex， 当index为0时，使用
	  var dateArray = this.dateArray[0] + '-01'
	  var weekIndex = this.getWeek(dateArray)
	  var ddArray = this.firstDate.split('-')
	  var disableIndex = parseInt(weekIndex) + parseInt(ddArray[2]) - 2

	  if(num >= this.startDayIndex && num <= this.endDayIndex && index !== 0) {
		var btn = document.getElementById('dayBtn' + (num + 1))
		btn.setAttribute('class', 'button3_p')

		if (this.selDayIndex >= 0) {
		  var btn2 = document.getElementById('dayBtn' + (this.selDayIndex + 1))
		  btn2.setAttribute('class', 'button3')
		}

		this.selDayIndex = num

		if(parseInt(this.daysArray[num]) < 10) {
		  this.selStartDay = '0' + this.daysArray[num]
		}
		else {
		  this.selStartDay = this.daysArray[num]
		}
	  }
	  else if (num >= disableIndex && num <= this.endDayIndex && index === 0) {
		var btn = document.getElementById('dayBtn' + (num + 1))
		btn.setAttribute('class', 'button3_p')

		if (this.selDayIndex >= 0) {
		  var btn2 = document.getElementById('dayBtn' + (this.selDayIndex + 1))
		  btn2.setAttribute('class', 'button3')
		}

		this.selDayIndex = num

		if(parseInt(this.daysArray[num]) < 10) {
		  this.selStartDay = '0' + this.daysArray[num]
		}
		else {
		  this.selStartDay = this.daysArray[num]
		}
	  }	
	},

	startDateSelChange: function () {
	  console.log('1.onchange....')
	  var obj = document.getElementById('startDate')
	  var index = obj.selectedIndex
	  var date = this.dateArray[index]

	  this.selStartMon = this.dateArray[index]
	  this.selStartDay = ''

	  this.getDaysData(date, index)
	},

	startDateSelChange2: function () {
	  console.log('2.onchange....')
	  this.isTurnLeft = false
	  this.isTurnRight = true

	  var obj = document.getElementById('startDate2')
	  var index = obj.selectedIndex
	  var date = this.dateArray[index]

	  this.selStartMon = this.dateArray[index]
	  this.selStartDay = ''

	  this.getDaysData(date, index)

	  console.log('index: ', index + ', date: ', date)
	  this.init_showWeekDays(index, date)

	  this.init_tableItem()

	},

	init_tableItem: function () {
	  for (var i = 0; i < this.selectTableItemArray_id.length; i++) {
		var dayArray = this.selectTableItemArray_id[i]
		for (var j = 0; j < dayArray.length; j++) {
		  var btn = document.getElementById(dayArray[j])
		  var cl = btn.getAttribute('class')
			btn.setAttribute('class', 'selDay')
			btn.innerHTML = ''
		}
	  }

	  // 将已经选中的item，变为选中状态
	  console.log('Titlendex: ', this.currentTitleDateIndex)
	  for (var n = this.currentTitleDateIndex * 7; n < this.currentTitleDateIndex * 7 + 7; n++) {
		var titleDateItem = this.titleDateArray[n].date
		for(var m = 0; m < this.selectDateArray.length; m++) {
			// console.log("@@"+this.selectDateArray[m] + ", " + titleDateItem)
		  if(this.selectDateArray[m].indexOf(titleDateItem) >= 0 && titleDateItem.length > 3) {
			var num = this.selectTableNumArray[m]
			var btn = document.getElementById('selDayID_' + num)
			var cl = btn.getAttribute('class')
			btn.setAttribute('class', 'selDay_sel')
			btn.innerHTML = '已选'
		  }
		}
	  }
	},

	getDaysData: function (date, index) {
	  var days = 30
	  var dArray = date.split('-')
	  var mon = parseInt(dArray[1])
	  if (mon === 1 || mon === 3 || mon === 5|| mon === 7|| mon === 8|| mon === 10|| mon === 12) {
		days = 31
	  }
	  else if (mon === 2) {
		days = 28
	  }
	  else {
		days = 30
	  }

	  var week = 0
	  week = parseInt(this.getWeek(date+'-01'))

	  this.startAndEndIndex(index, week, days)
		
	  this.daysArray = []
	  var day = 0
	  for (var i = 1; i <= 35; i++) {
		if (i === week) {
		  day++
		  this.daysArray.push(day.toString())
		}
		else if (i > week && day < days) {
		  day++
		  this.daysArray.push(day.toString())
		}
		else if(i < week) {
		  this.daysArray.push(' ')
		}
	  }
	  console.log(day , days)
	  if(day < days) {
		for (var i = 0; i < 7; i++) {
		  if(day < days) {
			day++
			this.daysArray.push(day.toString())
		  }
		  else {
			this.daysArray.push(' ')
		  }	
		}
	  }
	  // 别删，固定班级要用
	  this.setDisbleDay(index)
	},

	setDisbleDay: function (index) {
	  console.log('.....setDisbleDay')

	  // 回复已经选中
	  if (this.selDayIndex >= 0) {
		var btn = document.getElementById('dayBtn' + (this.selDayIndex + 1))
		btn.setAttribute('class', 'button3')
	  }

	  for(var x = 0; x < 7; x++) {
		var btn = document.getElementById('dayBtn' + (x + 1))
		btn.setAttribute('class', 'button3')
	  }

	  if (index === 0) {
		var dateArray = this.dateArray[0] + '-01'
		var weekIndex = this.getWeek(dateArray)
		var ddArray = this.firstDate.split('-')
		var disableIndex = parseInt(weekIndex) + parseInt(ddArray[2]) - 2

		for (var x = 0; x < disableIndex; x++) {
		  var btn = document.getElementById('dayBtn' + (x + 1))
		  btn.setAttribute('class', 'button3_d')
		}

		for (var x = disableIndex; x < this.endDayIndex; x++) {
		  var btn = document.getElementById('dayBtn' + (x + 1))
		  btn.setAttribute('class', 'button3')
		}
	  }
	  else {
		for (var x = this.startDayIndex; x < this.endDayIndex; x++) {
		  var btn = document.getElementById('dayBtn' + (x + 1))
		  btn.setAttribute('class', 'button3')
		}
	  }

	  if (this.daysArray.length >= 34) {
		this.weekNum = 6
	  }
	  else {
		this.weekNum = 5
	  }
	},

	startAndEndIndex: function (index, week, days) {
	  // if(index == 0) {
	  // 	var dArray = this.firstDate.split('-');
	  // 	this.startDayIndex = week + parseInt(dArray[2])-2;
	  // }
	  // else {
	  this.startDayIndex = week -1
	  // }
	  this.endDayIndex = week + days -2
	  console.log('startDayIndex: ', this.startDayIndex + ', endDayIndex: ', this.endDayIndex)
	},

	submit: function () {
	  $('#myModal2').modal('hide')
	  this.navigatorFun('/waijiao/class')
	},

	cancel: function () {
	  $('#myModal').modal('hide')
	  $('#myModal3').modal('hide')
	},

	submitFix: function() {
		var that = this
		 var data = {
			'uid': parseInt(this.teacherID),
			'id': this.fixInfo.id,
			'c_name': this.className,
			'grade': this.grade,
			't_name': this.zhName,
			'mobile': this.zhPhone,
			's_nums': parseInt(this.studentNum),
			's_list': this.studnetList	
		}
		
		var slist = ''
		if (this.class_format === 2) { // 小班
      this.domains.forEach((item, index) => {
        if (index === this.domains.length - 1) {
          slist += item.key
        } else {
          slist += item.key + ','
        }
			})
			data['s_list'] = slist
		}
			
	  jQuery.support.cors = true
	  $.ajax({
			url: this.$store.getters.wjBaseAPI + "/Schedule/modclass",
			method: "post",
			data: data,
			dataType: 'json',
			crossDomain: true === !(document.all),
			success: function (response) {
				if (response.code === 1) {
						$('#myModal_fixInfo').modal('show')
				} 
				else {
					alert(response.msg)
				} 	
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.error(textStatus, "error");
				console.error(errorThrown, "error");
			}
	  })
	},

	checkClassName: function() {
			var that = this
			axios({
				baseURL: this.$store.getters.wjBaseAPI,
	    	url: '/Schedule/checkClassname?uid=' + this.teacherID+'&c_name='+this.className,
      	method: 'get'
	  	})
	  	.then(function (response) {
	    	if (response.data.code == 1) {
					that.next(1)
				}
				else {
					alert(response.data.msg)
				}
	  })
	},

	finishFixInfo () {
			$('#myModal_fixInfo').modal('hide')
			this.navigatorFun('/waijiao/class')
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

	getStudentList () {
		let self = this
    axios({
		  baseURL: this.$store.getters.wjBaseAPI,
	    url: '/Student/studentbasicinfo?uid=' + this.teacherID,
      method: 'get'
	  })
	  .then(function (response) {
			 if(response.data.code === 1000) {
				 self.studentList = response.data.data
			 }
		})
	},
	
	handleStudent () {
      this.getStudentList()
      this.dialogVisible = true
      this.selStudents = []
      this.domains.forEach(item => {
        this.selStudents.push(item.key)
      })
    },
    selectStudent () {
      this.dialogVisible = false
      this.domains = []
      this.selStudents.forEach(id => {
        var item = this.studentList.find((element) => (element.id === id))
        this.domains.push({
          value: item.name + ' ' + item.mobile,
          key: id
        })
      })
    },
    removeDomain (item) {
      var index = this.domains.indexOf(item)
      if (index !== -1) {
        this.domains.splice(index, 1)
      }
    },
    handleAddStudent () {
			this.addDialogVisible = true
			this.stuaddloading = false
      this.stuform = {
        s_name: '',
        en_name: '',
        phone: '',
        grade: ''
      }
    },
    onSubmitStuForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
					this.stuaddloading = true
					this.stuform['uid'] = this.teacherID
          let self = this
	        $.ajax({
		        url: this.$store.getters.wjBaseAPI + "/Student/editstudent",
		        method: "post",
		        data: this.stuform,
		        dataType: 'json',
		        crossDomain: true === !(document.all),
		        success: function (response) {
                if (response.code === 1000) {
									self.stuaddloading = false
                  self.addDialogVisible = false
                  self.getStudentList()
			          } else {
									self.stuaddloading = false
									alert(response.msg)
								}
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {
							self.stuaddloading = false
			        console.error(textStatus, "error");
			        console.error(errorThrown, "error");
		        }
	        })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
	width: 380px;
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

.class-input {
	width: 300px;
	height: 40px;
	margin-left: 0px;
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

.button {
	width: 80px;
	height: 30px;
	margin-left: 45%;
	margin-top: 100px;
	background-color: #F85415;
	border: none;
	color: #fff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button1{
	width: 13%;
	height: 30px;
	margin-top: 30px;
	margin-left: 1.1%;
	float: left;
	background-color: #F5F6F9;
	border: none;
	color: #666666;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button1_p{
	width: 13%;
	height: 30px;
	margin-top: 30px;
	margin-left: 1.1%;
	float: left;
	background-color: #FDB730;
	border: none;
	color: #ffffff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button2{
	width: 9%;
	height: 30px;
	margin-top: 5px;
	margin-left: 0.8%;
	float: left;
	background-color: #F5F6F9;
	border: none;
	color: #666666;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button2_p{
	width: 9%;
	height: 30px;
	margin-top: 5px;
	margin-left: 0.8%;
	float: left;
	background-color: #FDB730;
	border: none;
	color: #ffffff;
	font-size: 10px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.button3 {
	text-align: center; 
	background-color: #F5F6F9; 
	border: 1px solid #F0EFF6; 
	cursor: pointer;
}

.button3_d {
	text-align: center; 
	background-color: #F5F6F9; 
	border: 1px solid #F0EFF6; 
	color: #b8b8b8;
	cursor: pointer;
}

.button3_p {
	text-align: center; 
	background-color: #FDB730; 
	border: 1px solid #ffffff; 
	color: #ffffff;
	cursor: pointer;
}

.buttonMod1 {
	width: 80px;
	height: 40px;
	float: left;
	background-color: #AAB2C2;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.buttonMod2 {
	width: 80px;
	height: 40px;
	margin-left: 200px;
	background-color: #F85415;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	border-radius: 2px;
	outline: none;
}

.selDay {
	width: 12.5%; 
	text-align: center; 
	border: 1px solid #F0EFF6;
}

.selDay_sel {
	width: 12.5%; 
	text-align: center; 
	border: 1px solid #F0EFF6;
	background-color: #FDB730;
}

.el-dropdown-menu__item {
  text-align: left;
}
</style>

<style rel="stylesheet/scss" lang="scss">
  .dialog-title {
    border-bottom: 1px solid #aaaaaa;
    text-align: left;
    padding-bottom: 5px;
  }
  .dialog-footer {
    border-top: 1px solid #aaaaaa;
    padding-top: 10px;
    position: relative;
  }
  .transfer-box {
    text-align: left;
    width: 80%;
    height: 420px;
    margin-left: 10px;
    .el-transfer-panel {
      width: 45%;
      height: 420px;
    }
    .el-transfer-panel__body {
      height: 300px;
    }
    .el-transfer__buttons {
      display: inline-block;
      vertical-align: middle;
      padding: 0 10px;
    }
    .el-transfer-panel__list.is-filterable {
      height: 300px;
    }
    .el-transfer-panel__item {
      height: 40px;
      line-height: 40px;
    }
  }
  .render-cbitem {
    height: 20px;
    line-height: 20px;
  }
</style>
