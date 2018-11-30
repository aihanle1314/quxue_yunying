$(document).ready(function() {
	if(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9) {
		var createDiv = document.createElement('div');
		createDiv.style.background = "#F4F4F4";
		//					createDiv.style.border="1px solid red";
		createDiv.style.marginTop = '10%'
		createDiv.style.width = "100%";
		createDiv.style.height = '40px';
		createDiv.style.fontSize = '30px'
		createDiv.style.textAlign = 'center'
		createDiv.innerHTML = '您的IE浏览器版本过低，请下载IE9及以上版本,或者使用其它浏览器,谢谢！';
		document.body.appendChild(createDiv);
	}
});