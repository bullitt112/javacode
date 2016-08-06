	function preloader() {
		if (document.images) {
			var img1 = new Image();
			var img2 = new Image();
			var img3 = new Image();
	
			img1.src = "/StudentWebMVC/resources/img/logo-print.gif";
			img2.src = "/StudentWebMVC/resources/iwe/img/background.jpg";
			img3.src = "/StudentWebMVC/resources/img/callout-link-arrow.png";
			
			if (typeof(console) != 'undefined') console.log("   ... loaded images");
			
		}
	}
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				func();
			}
		}
	}
	addLoadEvent(preloader);
