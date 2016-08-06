function initSSN() {
	var selected = $("input[name='dataType']:checked").val();
	
	$('.dependent').hide();
	
	if (selected == 'SSN') {
		$('.ssnNumber').show();
	}
	else if (selected == 'ITIN') {
		$('.itinNumber').show();
	}
	else if (selected == 'DECLINE') {
		$('.decline-dependent').show();
	}

}

function initSSNButtons() {
	$("input[name='dataType']").click(function () {
		initSSN();
	});
	
	$('#submit').click(function(e) {
		e.preventDefault();
		
		if (!$(this).hasClass("grey"))
			$('#ssnForm').submit();
	});
}