function openTermSelectionDialog(title) {
	//hide enrollment actions
	$('#enrollment-actions').hide();
	
	//$( "#termSelection" ).dialog( "destroy" );
	
	var term = '';

	var dlg = $( "#termSelection" ).dialog({
		
		modal: true,
		minWidth: 600,
		minHeight: 200,
		maxWidth: 600,
		title: title,

		buttons: {
			Save: function() {
				term = '12F';
				$('#enrollment-actions').show();

				$( this ).dialog( "close" );
			}
			
		},
		beforeClose: function(event, ui) {
			if (term.length == 0) 
				return false;
			else
				return true;
		}
	});
}

function initEnrollmentActions() {
	$( "#tabs" ).tabs();
}

function enrollToClass() {
	$('#error-message').empty();
	$.ajax({
		  url: "/StudentWebMVC/app/enrollment/addclass",
		  data: $("#addClassForm").serialize(),
		  type: "POST",
		  cache: false,
		  statusCode: {
			  412: function(jqXHR, textStatus, errorThrown) {
				  $('#error-message').empty().html(jqXHR.responseText);
				  //alert("ErrorThrown <" + errorThrown + ">, textStatus <" + textStatus + ">, jqXHR.responseText = "+jqXHR.responseText);
			  }
		  }
//	})
//	.error(function (jqXHR, textStatus, errorThrown){
//		if (textStatus == 509) {
//			alert("Error " + errorThrown);
//		}
	})
	.success(function(data, textStatus, jqXHR){
		$('#addClassForm')[0].reset();

		getStudyList();
	});
	return false;
}

function getStudyList() {
	$('#study-list').empty();
	$.ajax({
		  url: "/StudentWebMVC/app/enrollment/getstudylist",
		  type: "GET",
		  cache: false,
		  statusCode: {
			  412: function(jqXHR, textStatus, errorThrown) {
				  $('#error-message').empty().html(jqXHR.responseText);
				  $('#study-list').empty();
			  }
		  }
	})
	.success(function (data, textStatus, jqXHR){
		$('#study-list').empty().html(data);
	});
	return false;
	
}