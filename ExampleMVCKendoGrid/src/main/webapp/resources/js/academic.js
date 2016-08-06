
function cancelDegreeTermForm() {
	var errorBoxId = "#termForm-errors";
	//showHideContent('#viewRow', '#formRow');
	resetForm('termForm');
	$('#formRow').hide();
	$('#viewRow').show();
	$("#viewRow").children().show();
	$("#formRow").children().hide();
	
	$(errorBoxId).html("");
	return false;
}

function editDegreeTermForm() {
	//showHideContent('#formRow', '#viewRow');
	resetForm('termForm');
	$('#formRow').show();
	$('#viewRow').hide();
	
	$("#viewRow").children().hide();
	$("#formRow").children().show();

	$('.message-box').html("");
	return false;
}

function confirmChangingDegreeExpectedTerm(formId, confirmUrl, updateUrl) {
	var boxId = formId + "-dialog";
	var errorBoxId = formId + "-errors";
	if (typeof(console) != 'undefined') console.log("Dialog id: " + boxId);

	//$(boxId).dialog('destroy');
	//$(boxId).remove();
	//$(boxId).empty();
	
	// remove error messages if any
	$('#termForm-errors').html("");

	var cancelButton = function() {
		// close dialog
		$( this ).dialog( "close" );
		$(boxId).dialog('destroy');
	};
	var confirmButton = function () {
		if (typeof(console) != 'undefined') console.log("Content id: " + formId);
		$( this ).dialog( "close" );
		$(boxId).dialog('destroy');
		submitAjaxForm('#termForm','#degree-expected-term-data', '');
	};
  
	// check preEdit conditions
	var request = jsonCall(confirmUrl, $(formId).serialize(), 'GET', false, errorBoxId);
	request.success( function(data, textStatus, jqXHR){

		  if (typeof(console) != 'undefined')  console.log("Success: reloading content in "+boxId+", http status = " + jqXHR.status);
		  //if (typeof(console) != 'undefined')  console.log(jqXHR.responseText);
		  //$(formId).empty().html(jqXHR.responseText);
		  var status = jQuery.parseJSON(jqXHR.responseText);
		  
		  var html = "<ul>";
		  $.each(status.messages, function(i, item) {
			    html += "<li>" + item.description + "</li>";
		  });
		  
		  $(boxId).empty().html(html);
		  //if (typeof(console) != 'undefined')  console.log("Updated dialog content: " + html);

		  $(boxId).dialog({
				modal: true,
				minHeight: 200,
				minWidth: 500,
				autoOpen: false
		  });

		  if (typeof(console) != 'undefined')  console.log("Init dialog: error level = " + status.errorLevel);
		  if (status.errorLevel == 'info') {
			  if (typeof(console) != 'undefined')  console.log("Creating dialog with Confirm and reset buttons");
			  $(boxId).dialog('option', 'buttons', {'Continue': confirmButton, 'Cancel' : cancelButton});
		  }
		  else {
			  $(boxId).dialog('option', 'buttons', {'Cancel' : cancelButton});
		  }
		  $(boxId).dialog('open');
	 });

	return false;
}

function initTermSelection() {
    $('#termName label').html(getSelectedTerm());
}

function getSelectedTerm() {
	var term = '';
    var label=$('.select_filter_term :selected').parent().attr('label');
    if (typeof(label) != 'undefined') {
    	if (typeof(console) != 'undefined')  console.log(label+' ' + $('.select_filter_term :selected').text());
    	term = $('.select_filter_term :selected').text() + ' ' + label;
    }
    return term;
}

function confirmNonAtendance(formId, confirmUrl, updateUrl) {
	if (typeof(console) != 'undefined')  console.log("Confirm non-attendance, url="+confirmUrl);
	
	var boxId = formId + "-dialog";
	var errorBoxId = "#attendance-data";

	//$( boxId).dialog('destroy');
	$(boxId).empty();
	
	// remove error messages if any
	$('.error').hide();
	$('#confirm-attendance-message').hide();
	$('#update-attendance-message').html('');

	var cancelButton = function() {
		// close dialog
		$( this ).dialog( "close" );
	};
	var confirmButton = function () {
		if (typeof(console) != 'undefined') console.log("Content id: " + formId);
		$( this ).dialog( "close" );
		$(boxId).dialog('destroy');

		submitAjaxForm(formId,'#update-attendance-message', '#update-attendance-message');
	};
	
	// confirm if non attendance can be set
	var request = jsonCall(confirmUrl, $(formId).serialize(), 'GET', false, errorBoxId);
	request.success( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined')  console.log("Success: confinrming non attendance, http status = " + jqXHR.status);
		  
		  var status = jQuery.parseJSON(jqXHR.responseText);
		  if (!status.status) {
			  //errorBoxId
			  if (typeof(console) != 'undefined')  console.log("non attendance status = " + status.message);
			  $('#confirm-attendance-message div.message ul li').html(status.message);
			  $('#confirm-attendance-message div.message').show();
			  $('#confirm-attendance-message').show();
		  }
		  else {
			  //show confirmation box
			  var message = status.message;
			  
			  $(boxId).empty().html(message.replace(/@{selectedTerm}/g, getSelectedTerm()));
			  var dlg = $(boxId).dialog({
					modal: true,
					minHeight: 200,
					minWidth: 500,
					autoOpen: false
			  });
			  $(boxId).dialog('option', 'buttons', {'Continue': confirmButton, 'Cancel' : cancelButton});
			  $(boxId).dialog('open');
		  }
	});
}

$(document).ready(function(){
	
	document.title = $("#interior-split-page-header-full").text();

});
