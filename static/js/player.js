function doNothing() {
    event.preventDefault ? event.preventDefault():(event.returnValue = false);
    window.event.returnValue = false;
    return false;
}

function get_dplayer(url, video_id, width, height) {
    var container = $("#" + video_id);
    container.css("width", width);
    container.css('height', height);
    container.attr("oncontextmenu", "doNothing();");


    var dp = new DPlayer({
	container: document.getElementById(video_id),
	mutex: true,
	video: {
	    url,
	    type: 'auto',
	}
    });

    dp.on('fullscreen', function(){
	var size = getScreenSize();
	container.css("width", size.width);
	container.css("height", size.height);
    });

    dp.on('fullscreen_cancel', function(){
	container.css("width", width);
	container.css("height", height);
    });

    dp.on('ended', function() {
	dp.playButton.innerHTML = dp.icons.get("loop");
    });

    dp.on('canplay', function() {
	dp.play();
    });
}

function get_video(url, video_id, width, height) {
    console.log(url);
    get_dplayer(url, video_id, width, height);
}
