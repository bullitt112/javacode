//function ajaxResponse(responseText, successFlag) {
//	this.text = responseText;
//	this.success = successFlag;
//	
//	this.setText=setText;
//	function setText(text) {
//		this.text=text;
//	}
//	
//	this.setSuccess=setSuccess;
//	function setSuccess(success) {
//		this.success = success;
//	}
//}

function ajaxCall(url, data, type, cache, errorId) {
	var request = $.ajax({
		  url: url,
		  data: data,
		  type: type,
		  cache: cache,
		  error: function(jqXHR, textStatus, errorThrown) {
			  if (typeof(console) != 'undefined') console.log("ErrorThrown <" + errorThrown + ">, jqXHR.redirect = "+jqXHR.redirect);
			  if (typeof(console) != 'undefined') console.log("Failure calling url" + url + ", textStatus =" + textStatus + ", replacing element " + errorId);
			  if (typeof(console) != 'undefined') console.log("responseStatus: "+jqXHR.status);
			  if (errorId != null) $(errorId).empty().html(jqXHR.responseText);
		  }
	});
	return request;
}

function jsonCall(url, data, type, cache, errorId) {
	var request = $.ajax({
		  url: url,
		  data: data,
		  type: type,
		  dataType: 'json',
		  cache: cache,
		  error: function(jqXHR, textStatus, errorThrown) {
			  //alert("ErrorThrown <" + errorThrown + ">, textStatus <" + textStatus + ">, jqXHR.responseText = "+jqXHR.responseText);
			  if (typeof(console) != 'undefined') console.log("Failure calling url" + url + ", textStatus =" + textStatus + ", replacing element " + errorId);
			  if (errorId != null) $(errorId).empty().html(jqXHR.responseText);
		  }
	});
	return request;
}

function jsonCall2(url, data, type, cache, errorId) {
	var request = $.ajax({
		  url: url,
		  data: data,
		  type: type,
		  contentType : 'application/json; charset=utf-8',
		  dataType: 'json',
		  processData:false,
		  cache: cache,
		  error: function(jqXHR, textStatus, errorThrown) {
			  //alert("ErrorThrown <" + errorThrown + ">, textStatus <" + textStatus + ">, jqXHR.responseText = "+jqXHR.responseText);
			  if (typeof(console) != 'undefined') console.log("Failure calling url" + url + ", textStatus =" + textStatus + ", replacing element " + errorId);
			  if (errorId != null) $(errorId).empty().html(jqXHR.responseText);
		  }
	});
	return request;
}

function initSpinner() {
	//global ajax settings
//	$.ajaxSetup({
//		  timeout: 25000,
//		  statusCode: {
//			    304: function() {
//			      alert( "page not found" );
//			    }
//			  }
//		});

	$("body").bind("ajaxSend", function() {
		if (typeof(console) != 'undefined') console.log("... adding spinner");
		$(this).addClass( "ajax-none ajax-spinner" );

	}).bind("ajaxStop", function() {
		if (typeof(console) != 'undefined') console.log("... hiding spinner");
		$(this).removeClass( "ajax-none ajax-spinner" );
	
	}).bind("ajaxError", function() {
		if (typeof(console) != 'undefined') console.log("... hiding spinner");
		$(this).removeClass( "ajax-none ajax-spinner" );
	});
}

