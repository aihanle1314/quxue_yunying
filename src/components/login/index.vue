<template>
	<div id="box" class="box" style="positon:relative;">
		<div class="login-wrap">
			<img style="position:absolute; width: 140px; height: 80px; margin-top: 80px; left: 50%; margin-left:-70px;" src="../../../static/img/org/login/logo.png" />
			<div style="margin-top: 40px;"></div>
			
			<p class="login-title">趣学英语</p>
			<p class="login-title2">学校管理后台</p>

			<p style="position: absolute; width: 80px; margin-left: -30px; left: 50%; margin-top: 140px; font-size: 20px; color: #343840;">欢迎登录</p>
			<div style="position: absolute; width: 70px; height: 2px; margin-left: -25px; left: 50%; margin-top: 165px; background-color: #FDB730;"></div>


			<div style="margin-left: 60px; margin-top: 250px; ">
				<img style="margin-top: 8px; margin-left: -320px;" src="../../../static/img/org/login/user.png">
				<input id='name_input' class="login-input" type="text" placeholder="请输入账号" v-model="phone">
				<div style="position: absolute; width: 340px; height: 1px; margin-left: -170px; left: 50%; margin-top: 5px; background-color: #E5E8ED;"></div>
			</div>

			<div class="margin-left: 60px; margin-top: 380px; ">
				<img style="margin-top: 40px; margin-left: -320px;" src="../../../static/img/org/login/lock.png">
				<input id='password_input' class="login-input"  style="width: 220px; margin-top: 20px; margin-left: 80px;" type="password" placeholder="请输入密码" v-model="pwd"
				  @keydown.enter="login">
				<img style="margin-top: 40px; margin-left: 260px; cursor:pointer;" v-on:click='showPW' :src="pwImgUrl">
				
				<div style="position: absolute; width: 340px; height: 1px; margin-left: -170px; left: 50%; margin-top: 5px; background-color: #E5E8ED;"></div>
			</div>

			<div style="margin: auto; margin-left: 0px;">
				<label style="float: left; margin-left: 40px; margin-top: 20px; font-size: 14px; color: #999999">
				    <input id="remeber" style="font-size: 16px;" type="checkbox">&nbsp;&nbsp;记住密码
				</label>
				<button class="button" v-on:click="login">登录</button>	
			</div>
			
			<p style="margin-left: 200px; margin-top: 30px;" v-show="showTishi">{{tishi}}</p>	
			<p style="margin-left: 120px; margin-top: 180px; font-size: 10px;">* 浏览器建议使用IE9.0以上，火狐，chrome</p>	
		</div>

		<img style="width: 100%; height: 100%;" src="../../../static/img/org/login/bg.png" />
	</div>
</template>
<script type="text/javascript">
import { setCookie, getCookie, delCookie, PageStatistics } from '../../assets/js/cookie.js'
import { setToken, setUserId, getUserId, removeUserHeader } from '@/utils/auth'
export default {
  name: "login",
  data() {
	return {
	  showTishi: false,
	  tishi: '',
	  phone: '',
	  pwd: '',

	  teacherID: 0,
	  name: '',
	  oid: 0,
	  role: '',

	  isShow: false,

	  pwImgUrl: '../../../static/img/org/login/pw1.png'

	}
  },
  mounted () {
	console.log('----- remeber :', getCookie('remeber'))
	if (getCookie('remeber') === 'on') {
	  this.phone = getCookie('phone')
	  this.pwd = getCookie('pwd')
	  $("#remeber").prop("checked", true)
	}
	else {
	  this.phone = ''
	  this.pwd = ''
	}		
  },
  methods: {
	login () {
	  var that = this
	  if (this.phone === '') {
		  this.showTishi = true
		  this.tishi = this.$t("message.global.login_input1_placeholder")
	  } else if(this.pwd === '') {
		  this.showTishi = true
		  this.tishi = this.$t("message.global.login_input2_placeholder")
	  } else {
		  var data = {
		    username: this.phone,
		    pwd: this.pwd
		  }
      removeUserHeader()
		  this.$store.dispatch('Login', data).then(() => {
			  setCookie('phone', that.phone, 1000 * 60)
			  setCookie('pwd', that.pwd, 1000 * 60)
			  if ($('#remeber').is(':checked')) {
				  console.log('remeber: on')
				  setCookie('remeber', 'on', 1000 * 60)
			  } else {
				  console.log('remeber: off')
				  setCookie('remeber', 'off', 1000 * 60)
			  }

			  that.teacherID = that.$store.getters.userId
			  setCookie('teacherID', that.teacherID, 1000 * 60)

			  this.$router.push({ path: '/' })
		  }).catch(() => {
			  that.showTishi = true
	      that.tishi = response.msg
		  })

		// jQuery.support.cors = true
		// $.ajax({
		//   url: 'http://101.201.152.181:9010/Statistics/signup',
		//   method: 'post',
		//   data: data,
		//   dataType: 'json',
		//   crossDomain: true === !(document.all),
		//   success: function (response) {
		// 	// console.log("login status: ", response.code)
		// 	if (response.code === 1) {
		// 	  setCookie('phone', that.phone, 1000 * 60);
		// 	  setCookie('pwd', that.pwd, 1000 * 60)
		// 	  if ($('#remeber').is(':checked')) {
		// 		console.log('remeber: on')
		// 		setCookie('remeber', 'on', 1000 * 60)
		// 	  } else {
		// 		console.log('remeber: off')
		// 		setCookie('remeber', 'off', 1000 * 60)
		// 	  }

		// 	  that.teacherID = response.data.uid
		// 	  setCookie('teacherID', that.teacherID, 1000 * 60)

		// 	  that.$router.push('/Home')
		// 	} 
		// 	else {
		// 	  that.showTishi = true
		// 	  that.tishi = response.msg
		// 	} 	
		//   },
		//   error: function (XMLHttpRequest, textStatus, errorThrown) {
		// 	console.error(textStatus, 'error')
		// 	console.error(errorThrown, 'error')
		//   }
		// })
	  }
    },

	showPW: function () {
	  this.isShow = !this.isShow;

	  var inputInVisible = document.getElementById('password_input')
	  if (this.isShow) {
		inputInVisible.type = 'text'
		this.pwImgUrl = '../../../static/img/org/login/pw2.png'
	  }
	  else {
		inputInVisible.type = 'password'
		this.pwImgUrl = '../../../static/img/org/login/pw1.png'
	  }
	}
  }
}
</script>
<style scoped type="text/css">	
.box {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

.login-wrap {
	position: absolute;
	z-index: 1;
	background-color: #FFFFFF;
	width: 400px;
	height: 600px;
	margin-top: 80px;
	border-radius: 5px;
	left: 50%; 
	margin-left: 200px;
	
}

.login-title {
	position: absolute; 
	margin-left: -210px;
	margin-top: 380px;
	font-size: 30px; 
	font-weight: 300px; 
	color: #FFFFFF; 
	
}

.login-title2 {
	position: absolute; 
	margin-left: -140px;
	margin-top: 425px;
	font-size: 20px; 
	color: #FFFFFF; 
	
}

.login-input-div {
	width: 200px;
	height: 40px;
	margin: auto;
	margin-left: 60px;
	margin-top: 150px;

	border: 1px solid #E3E3E3;
}

.login-input {
	width: 280px;
	height: 40px;
	float: left;
	margin-left: 20px;
	line-height: 16px;
	margin-top: -6px;
	outline: none;
	border: 0px solid #E3E3E3;
	font-size: 14px;
	box-sizing: border-box;
	background-color: #FFFFFF;
	-webkit-box-shadow: 0 0 0px 1000px white inset;
	box-shadow: 0 0 0px 1000px white inset;
}


p {
	color: red;
}

.button {
	width: 340px;
	height: 40px;
	float: left;
	margin-left: 25px;
	margin-top: 60px;
	background-color: #FDB730;
	border: none;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	border-radius: 2px;
}
</style>
