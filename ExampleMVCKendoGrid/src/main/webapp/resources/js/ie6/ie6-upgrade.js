////COOKIE FUNCTIONS////////////////////////////
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
///////////////////////////////////////////
function e(str) {
	createCookie("displayIE6killerMsg","yes",365);
	
	var ie6_warning = "";
	ie6_warning += "<div id=\"ie6-upgrade-wrapper\" style=\"font-family: Verdana,Arial,Helvetica,Geneva,sans-serif;font-size: 11px;position: absolute;top: 0;left: 0;padding-top: 10px;background-color: #fef7cc;width: 100% !important;border-bottom: 1px solid #000000;filter:alpha(opacity=90);\">";
	ie6_warning += "<div id=\"ie6-upgrade\" style=\"position: relative;margin: 0 auto;padding: 0 200px 0 25px;width: 720px;background: url(/js/ie6/icon-caution.png) no-repeat 0 5px;\">";
	ie6_warning += "<p style=\"line-height:1.5em;text-align:left;\">Your browser (Internet Explorer 6) is no longer being supported.  To get the best possible experience, we recommend you upgrade to a ";
	ie6_warning += "<a href=\"http://www.microsoft.com/windows/internet-explorer/\" style=\"color: #536895;\">newer version of Internet Explorer</a> or use a different web browser such as ";
	ie6_warning += "<a href=\"http://www.mozilla.com/firefox/\" style=\"color: #536895;\">Firefox</a>, <a href=\"http://www.google.com/chrome\" style=\"color: #536895;\">Chrome</a>, or <a href=\"http://www.apple.com/safari/\" style=\"color: #536895;\">Safari</a>.</p>";
	ie6_warning += "<span id=\"ie6-close-button\" onclick=\"closeBrowserWarning();\" style=\"position: absolute;top: 0;right: 10px;padding-right: 15px;background: url(/js/ie6/icon-close.png) no-repeat right .22em;text-transform: uppercase;cursor: pointer;\">Close</span>";
	ie6_warning += "</div></div>";
	
	document.getElementById("ie6Warning").innerHTML = ie6_warning;
}


function closeBrowserWarning() {
	createCookie("displayIE6killerMsg","no",7); //DELETE COOKIE
	document.getElementById('ie6-upgrade-wrapper').style.visibility = 'hidden';
}

window.onload = function() {
	var x = readCookie('displayIE6killerMsg'); // yes or no
	if(x == null || x == "yes") {
		e();
	}
}