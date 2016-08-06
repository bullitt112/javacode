
function validateCreateOrder() {
	if (validator.validate()) {
		$('#createOrderButton').attr("disabled", false);
	}
	else {
		$('#createOrderButton').attr("disabled", true);
		
	}

}

function validateReviewOrder(validator) {
	if (validator.validate()) {
		$('#payOrderButton').attr("disabled", false);
	}
	else {
		$('#payOrderButton').attr("disabled", true);
		
	}

}


function getCreateOrderValidator(){
	var validator = 
		$("#orderForm").kendoValidator({

		rules: {
		           radio: function(input) {
		               if (input.is("[type=radio]") && input.attr("required")) {        
		                  return $("#orderForm").find("[name=" + input.attr("name") + "]").is(":checked");
		               }
		               return true;
		            }
		           },
		           messages: {
		               radio: "",
		               required: ""
		           }
	}).data("kendoValidator");
	
	return validator;
}

function completeOrderTitleChange(flag) {
	if (flag) {
		$('#interior-split-page-header-full').text("Transcript Order Receipt");
		document.title = $("#interior-split-page-header-full").text();
	}
}

function toggleIXEmail(recipientType) {
	if (recipientType == 'IX') {
		$('#ix-email').show();
	}
	else {
//		if (typeof(console) != 'undefined') console.log("    1. cleaning email value = "+$('#email').val());
		$('#email').val("");
//		if (typeof(console) != 'undefined') console.log("    2. after cleaning email value = "+$('#email').val());
		$('#ix-email').hide();
	}
	
}

function toggleStandardDeliveryMessage(recipientType) {
	if (recipientType == 'DM') {
		$('#standard-mail-message').show();
	}
	else {
		$('#standard-mail-message').hide();
	}
}

function toggleInPerson(recipientType) {
	if (recipientType == 'IP') {
		$('#in-person').show();
	}
	else {
		$('#in-person').hide();
	}	
}

function toggleFedexDeliveryMessage(recipientType) {
	$('.fedex-message').hide();
	
	if (recipientType == 'DX' || recipientType == 'IX') {
		$('#fedex-message-'+recipientType).show();
	}
}

function initNumericBox(max) {
	if ($("input.numeric-box").length > 0) {
		$("input.numeric-box").each(function( index ) {
			
			//if (typeof(console) != 'undefined') console.log( index + ": " + $( this ).attr('id') + ' class: ' +  $( this ).attr('class') );
			
			if (!$(this).hasClass('k-input')) {
				$(this).kendoNumericTextBox({
					format: '#',
					decimals: 0,
					min: 1,
					max: max
				});	
			}
			
		});
	}
}

function onAlternativeNameChange() {
	$('#alternativeName').change(function() {
		var nameValue = $('#alternativeName').val();
		if (nameValue == null || nameValue == '' ) {
			// if alternative name is empty
			mailingInfo.name = currentUserName;
		}
		else {
			mailingInfo.name = nameValue;
		}
		
	});
}

function onAdressInfoClick() {
	if (typeof(mailingInfo) != 'undefined') {
		$('.mailingInfo').click(function() {
			var cnt = $(this).attr('rel');
			if (typeof(console) != 'undefined') console.log("    changing address, cnt="+cnt);
			
			$('input[name="info[0]"]').val(mailingInfo.name);
			$('#address\\.street').val(mailingInfo.street1);
			$('#address\\.street2').val(mailingInfo.street2);

			if ( (mailingInfo.zip).length == 9 && mailingInfo.country == "US" ){
				$('#address\\.zip').val(mailingInfo.zip.replace(/(\d{5})(\d{4})/, "$1-$2"));
				}
			else{
				$('#address\\.zip').val(mailingInfo.zip);	
			}
		
			$('#address\\.city').val(mailingInfo.city);
			$('input[name="address-country"]').val(mailingInfo.country);
			$('input[name="address-state"]').val(mailingInfo.state);
			
			if (typeof(console) != 'undefined') console.log('input[name="address-country'+cnt+'"]' +" = "+$('input[name="address-country'+cnt+'"]').val());
			if (typeof(console) != 'undefined') console.log('#address-state'+cnt +" = "+$('#address-state'+cnt).val());
	
			initAddress();
		});
	}
}

function recipientChange(recipientId) {
	$('#recipientId').val(recipientId);
	
	return true;
}

function disableCountry(code) {
	if ('DE' == code || 'DX' == code)
		$('#address\\.country').prop('disabled', 'disabled');
}


