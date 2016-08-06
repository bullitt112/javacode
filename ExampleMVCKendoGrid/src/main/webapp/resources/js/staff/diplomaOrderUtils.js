function processRecords(type, response) {
    if (type == 'read') {
    	//if (typeof(console) != 'undefined') console.log("read "+response.total +" records");
    	
    	$('#stepTotal').val(response.total);
    	checkCompletion(response.total, response.updatedTotal);
    }
    else if (type == 'update') {
    	checkCompletion(response.total, response);
    }
}

function checkCompletion(total, updatedTotal) {
	var total = $('#stepTotal').val();
	
	if (typeof(console) != 'undefined') console.log("checkCompletion: total=" + total + ", updatedTotal=" + updatedTotal);
	
	if (total != -1 && total <= updatedTotal) {
		// hide message
		$('.stepErrorMessage').addClass('hidden');
	}
	else {
		$('.totalRecords').html(total);
		$('.updatedRecords').html(updatedTotal);
		$('.stepErrorMessage').removeClass('hidden');
	}
}
function checkIfEmpty(e) {
    if (e == undefined || e.sender == undefined || e.sender._data.length == 0) {       //if datasource is empty
    	$('#searchResults').hide();
    	$('.searchResultsEmpty').show();
    }
    else {
    	$('#searchResults').show();
    	$('.searchResultsEmpty').hide();
    }
}
