function Person(id, role) {
    this.id = id;
    this.role = role; // 1, 老师 0, 学生 5：监控
    this.url = "ws://123.56.138.199:9999";
    this.conn;

    this.init = function() {
	this.conn = new WebSocket(this.url); 
	var n = this;
	this.conn.onopen = function(evt) { 
	    console.log("on open");
	};
	
	this.conn.onclose = function(evt) { 
	    console.log("on close");
	    n.init();
	};
	
	this.conn.onmessage = function(evt) { 
	    console.log("on message "  + evt.data);

	    var obj = eval("(" + evt.data + ")");
	    switch(obj.msgId) {
            case 1:
		/*
		if(obj.statu == 1) {
		    n.lid = obj.lid;
		} else {
		    n.lid = 0;
		}
		console.log(n.lid);
		*/
		break;
	    case 2:
		//var lid = Document.getElementById(obj.lid);
		//lid.innerHTML = "<img src=" + obj.buffer + " width='300' heigth='300' />";
		break;
	    }
	};
	
	this.conn.onerror = function(evt) { 
	    console.log("on error");
	}; 
    };

    this.onEnter = function(lid) {
	if(this.conn) {
	    var data = {
		"msgId": 1, 
		"role": this.role,
		"id": this.id,
		"lid": lid,
		"statu": 1
	    };

	    this.conn.send(JSON.stringify(data));
	}
    };

    this.onExit = function() {
	if(this.conn) {
	    var data = {
		"msgId": 1, 
		"role": this.role,
		"id": this.id,
		"lid": this.lid,
		"statu": 0
	    };

	    this.conn.send(JSON.stringify(data));
	}
    };

    this.uploadImage = function(lid, str) {
	if(this.conn) {
	    var data = {
		"msgId": 2,
		"buffer": str, 
		"lid": lid
	    };
	    this.conn.send(JSON.stringify(data));
	}
    };
}
