function getAddresses(elementId) {
	if ($(elementId).length != 0) {
	
		var request = ajaxCall("/StudentWebMVC/utils/admission/address", '', 'GET', true, null);
		
		request.success(function(data) {
			var id = $(data).attr("class");
			$("." + id).replaceWith(data);
		});
		
	}
}

function processAdmissionPaymentLink() {
	var radiovalue=$("#admission-payment-deposit input:radio:checked").val();
	if (radiovalue == null) {
		radiovalue = 'deposit';
	}
	//$("#admission-payment-link").attr("href", $("#admission-payment-link").attr("href")+radiovalue);
	$("#slrForm").attr("action", $("#admission-payment-link").attr("href"));
	$("#slrForm").submit();
	return false;
}

function submitParentForm(formId, formPlacementId, resultId) {
	var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, formPlacementId);
	
	request.success( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined') console.log("Success: reloading Parent form");
		  // reload tab
		  $( resultId ).empty().html(data);
	 });
	
	return false;
}

function submitHomeAddressForm(formId, formPlacementId, resultId) {
	if (typeof(console) != 'undefined') console.log("Submitting form to " + $(formId).attr("action"));
	var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, formPlacementId);
	
	request.success( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined') console.log("Success: reloading home address form " + resultId);
		  // reload tab
		  $( resultId ).empty().html(data);
		  initAdmissionHomeAddressEdit();
	 });
	request.complete( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined') console.log("Ajax call is completed with " + textStatus);
		  initAddress();
	 });
	
	return false;
}

function initAdmissionHomeAddressEdit() {
	$('.edit-hidden-form').click(function() {
		var id = $(this).attr('rel');
		//initAddress();
		$('#'+id).show();
		$('.'+id+'-dependent').hide();
		return false;
	});
}

function initAdmissionHomePage() {
	$('.accordion .head').click(function() {
		var arrow = $(this).children('.ui-icon');
		
		if (arrow && arrow.hasClass('ui-icon-triangle-1-e')) {
			arrow.removeClass('ui-icon-triangle-1-e');
			arrow.addClass('ui-icon-triangle-1-s');
		}
		else {
			arrow.removeClass('ui-icon-triangle-1-s');
			arrow.addClass('ui-icon-triangle-1-e');			
		}
		
		$(this).next().toggle();
		return false;
	});
	
}


function stepsNavigation() {
	
	$('.slr-steps').click(function() {
		if (typeof(console) != 'undefined') console.log("Steps = " + slrSteps);
		if (typeof(console) != 'undefined') console.log("currentStep = " + currentStep);

		var showId = $(this).attr('rel');
		
		if (showId == 'next') {
			var i = jQuery.inArray(currentStep, slrSteps);
			if (i > 0 && (i + 1) < slrSteps.length)
				showId = slrSteps[i + 1];
		}
		else if (showId == 'back') {
			var i = jQuery.inArray(currentStep, slrSteps);
			if (i > 0)
				showId = slrSteps[i - 1];
		}
		
		if (typeof(console) != 'undefined') console.log("showId = " + showId);
		
		if (showId == 'next') {
			// submit form
			if (typeof(console) != 'undefined') console.log("submitting admission form");
				$('.admissionForm').submit();
		}
//		else if (showId == 'accept') {
//			showConfirmation('changeDecision', 'accept');
//		}
		else if (currentStep == 'accept' ) {
			window.location = "?step=home";
			
		}
		else if (
				showId == 'accept'
				|| currentStep == 'parentContact' 
				|| currentStep == 'deposit'
				|| currentStep == 'officialEmail'
				|| currentStep == 'confirm') {
			// redirect back
			if (typeof(console) != 'undefined') console.log("redirect to step " + showId);
			window.location = "?step="+showId;
		}
		else {
			var index = jQuery.inArray(showId, slrSteps);
			if (index != -1 && index == 0) {
				// hide Back link
			}
			else if (index != -1 && index < (slrSteps.length - 1) ) {
				// change Next link to Next
				$('a[rel="next"]').html('Next <span class="golden">&raquo;</span>');
			}
			else if (index != -1 && index == (slrSteps.length - 1) ) {
				// change Next link to Save and Continue
				$('a[rel="next"]').html('Continue <span class="golden">&raquo;</span>');
			}
	
			$('.slr-steps').removeClass('selected currentStep');
			$('a[rel="'+showId+'"]').addClass('selected currentStep');
			//$(this).addClass('selected');
	
			$('.collapse-content').hide();
			$('#' + showId).css('display', 'inline-block');
			
			currentStep = showId;
			//console.log("currentStep = " + currentStep);
			
			//if (typeof(console) != 'undefined') console.log ("hello click " + $('#'+showId+'-step').text() );
					
			 $('#interior-split-page-header-full').text($('a[id="'+showId+'-step"]').text());
			 document.title = $('#interior-split-page-header-full').text();
			return false;
		}
	});
}

function showConfirmation(boxId, step) {
	if (typeof(console) != 'undefined') console.log("Current location - " + window.location.pathname);
	
	//$( "#"+boxId ).dialog( "destroy" );
	var dlg = $( "#"+boxId ).dialog({

		buttons: {
			Confirm: function() {
				// redirect to change decision
				window.location = "?step="+step;
			},
			Cancel: function() {
				// close dialog
				$( this ).dialog( "close" );
			}
		}
	});
}

function slrVerifyConfirmation(boxId) {
	//console.log("Current location - " + window.location.pathname);
	
	//$( "#"+boxId ).dialog( "destroy" );
	var dlg = $( "#"+boxId ).dialog({

		buttons: {
			Confirm: function() {
				$('#slrPreEdit').val(true);
				$('.admissionForm').submit();
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				// close dialog
				$( this ).dialog( "close" );
			}
		}
	});
}

function handleFinSupportOther() {
	
	showHideDependentElement4Checkbox(this);
	
	//input:radio[name="${model}.othStateResTaxReturnLastYear"]
	var inputEl = 'input:text[name="' + $(this).attr('rel') + '"]';
	//if (typeof(console) != 'undefined') console.log("element " +inputEl +" -- " + $(inputEl).attr("name") + ', value = ' + $(inputEl).val());

	if (!$(this).attr('checked'))
		$(inputEl).val('');
}

function showHideDependentElement4Checkbox(element) {
	//if (typeof(console) != 'undefined') console.log("element " + $(element).attr("name") + ', value = ' + $(element).attr('checked'));

	__showHideDependentElement($(element).attr('name'), $(element).attr('checked'));
}

var stateDataSource;

function initStandaloneState() {
	if ($('input.state-field').length > 0) {
		if (stateDataSource == null) {
			stateDataSource = new kendo.data.DataSource({
	            transport: {
	                read: {
	                    dataType: "json",
	                    url: '/StudentWebMVC/utils/admission/states'
	                }
	            }
			});
			stateDataSource.fetch(function() {
		    	var data = stateDataSource.data();
		    	var data_no_ca = removeState(['CA', 'FC'], data);
		    	var data_no_fc = removeState(['FC'], data);
		    	
			    $('input.state-field').each(function( index ) {
			    		if ($(this).hasClass('no-CA')) {
			    			initStateList(this, data_no_ca);
			    		}
			    		else if ($(this).hasClass('no-FC')) {
			    			initStateList(this, data_no_fc);
			    		}
			    		else {
			    			initStateList(this, data);
			    			
			    		}
				    	//if (typeof(console) != 'undefined') console.log("init state for " + $(this).attr('id'));
			    });
			});
		}
	}
	  	
}

function initStateList(el, data) {
	$(el).kendoDropDownList({
        dataTextField: "name",
        dataValueField: "value",
        dataSource: data
	});
	var dropdownlist = $(el).data("kendoDropDownList");
	dropdownlist.list.width(280);
}

function removeState(states, data) {
	var data_no_state = new Array();

	var j = 0;
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		//if (typeof(console) != 'undefined') console.log("item " + item.value);
		if (!findState(item, states)) {
			data_no_state[j++] = item;
		}
	}
	return data_no_state;
}

function findState(item, states) {
	var res = false;

	for (var k = 0; k < states.length; k++) {
		if (item.value == states[k]) {
			res = true;
			break;
		}
	}
	return res;
}


function initOptSchoolState(selectedOption) {
	
	delete_value = typeof delete_value !== 'undefined' ? delete_value : false;
	
    $.getJSON('/StudentWebMVC/utils/states', {country: 'US'}, function(stateCodeList) {
    	
    	//console.log('console StateCode :- ' + stateCodeList);
    	
    	var select = $('#optSchoolState');
    	var options;
    	if($(select).prop) {
    	  options = $(select).prop('options');
    	}
    	else {
    	  options = $(select).attr('options');
    	}

    	$('option', $(select)).remove();
    	
    	
   		options[options.length] = new Option("Select State", "");
    	
   		$.each(stateCodeList, function(val, text) {
   			if (this.value ==   '  ' || this.value == 'AA' || this.value == 'AE' ||  this.value == 'AP')
   				return;
   			options[options.length] = new Option(this.name, this.value);
   		});

		select.val(selectedOption);
   		getSchool($(select).val(), $('#optSchoolName-value').val());

    });
    
	
	$('#optSchoolState').change(function() {
		getSchool($(this).val(), $('#optSchoolName-value').val());
    });

}

function optSchoolLocationChange() {
	$('input:radio[name="optSchoolLocation"]').change(function(){
		if ($(this).val() == 1) {
			$('#optSchoolName').parent().hide();
			$('#optSchoolState').val('');
			$('#optSchoolState-value').val('');
			$('#optSchoolName').val('');
			$('#optSchoolName-value').val('');
		}
		else {
			$('#optForeignSchoolName').parent().hide();
			$('#optSchoolCountry').val('');
			$('#optSchoolCountry-value').val('');
			$('#optForeignSchoolName').val('');
			$('#optForeignSchoolName-value').val('');
		}
	});
}

function getSchool(stateCode, selectedOption) {
	
	var select = $('#optSchoolName');
	$(select).parent().hide();
	if (stateCode.length == 0) {
		$(select).val('');
		return;
	}
	
	$.getJSON('/StudentWebMVC/utils/admission/schoolsByState', {state: stateCode}, function(schoollist) {
    	
    	//console.log('console schoollist :- ' + schoollist);
    	
    	var options;
    	if($(select).prop) {
    	  options = $(select).prop('options');
    	}
    	else {
    	  options = $(select).attr('options');
    	}

    	$('option', $(select)).remove();
    	
    	if (!jQuery.isEmptyObject(schoollist)) {
        	
    		if (options == undefined)
    			options = new Array();
    			
    
   			options[options.length] = new Option("Select School", "");
    	
    		$.each(schoollist, function(val, text) {
    			options[options.length] = new Option(this.instituteName, this.instituteCode);
    		});
    		select.val(selectedOption);

    		$(select).parent().show();
    	}
    	else {
       	    $(select).parent().hide();
    	}

    });
    
}


function initOptSchoolCountries(selectedOption) {
	
	delete_value = typeof delete_value !== 'undefined' ? delete_value : false;
	
    $.getJSON('/StudentWebMVC/utils/admission/gradCountries', {}, function(countrylist) {
    	
    	var select = $('#optSchoolCountry');
    	var options;
    	if($(select).prop) {
    	  options = $(select).prop('options');
    	}
    	else {
    	  options = $(select).attr('options');
    	}

    	$('option', $(select)).remove();
    	
    	
   		options[options.length] = new Option("Select Country", "");
    	
   		$.each(countrylist, function(val, text) {
   			options[options.length] = new Option(this.locationName, this.locationUCOP);
   		});

		select.val(selectedOption);
		getForeignSchool($(select).val(), $('#optForeignSchoolName-value').val());

    });
    
  
    
	$('#optSchoolCountry').change(function() {
		getForeignSchool($(this).val(), $('#optForeignSchoolName-value').val());
    });

}


function getForeignSchool(countryCode, selectedOption) {
	
	var select = $('#optForeignSchoolName');
	$(select).parent().hide();
	if (countryCode.length == 0) {
		return;
	}
	
	$.getJSON('/StudentWebMVC/utils/admission/foreignSchoolByCountry', {country: countryCode}, function(foreignschoollist) {
    	
    	//console.log('console foreignschoollist :- ' + foreignschoollist);
    	
    	var options;
    	if($(select).prop) {
    	  options = $(select).prop('options');
    	}
    	else {
    	  options = $(select).attr('options');
    	}

    	$('option', $(select)).remove();
    	
    	
    	if (!jQuery.isEmptyObject(foreignschoollist)) {
        	
    		if (options == undefined)
    			options = new Array();
    			
   			options[options.length] = new Option("Select School", "");
    	
    		$.each(foreignschoollist, function(val, text) {
    			options[options.length] = new Option(this.institutionName, this.institutionCode);
    		});
    		select.val(selectedOption);

    		$(select).parent().show();
    	}
    	else {
    		$(select).parent().hide();
    	}


    });
    
}

function initLawDepositPayment() {
	if($("input[name=fullDepositFlag]").length != 0) {
		changeNextButton4Law();
	}
}

function changeNextButton4Law() {
	var firstDeposit = $('input[name=fullDepositFlag]:checked', '#paymentTracker').val();
	if (firstDeposit == 0) {
		$('a[rel="next"]').html('Pay First Deposit <span class="golden">&raquo;</span>');
	}
	else {
		$('a[rel="next"]').html('Pay and Submit <span class="golden">&raquo;</span>');
	}
}

function changeLawDeposit() {
	if($("input[name=fullDepositFlag]").length != 0) {
		$('input[name=fullDepositFlag]').change(function() {
			changeNextButton4Law();
		});
	}
}

//should be last in the file
$(document).ready(function(){

	//add spinner to admission form submission event
	$('.admissionForm').bind("submit", function() {
		//if (typeof(console) != 'undefined') console.log("... adding spinner");
		$("body").addClass( "ajax-none ajax-spinner" );
	});

	//add spinner to process link on admission home page
	$('.processLink').bind("click", function() {
		//if (typeof(console) != 'undefined') console.log("... adding spinner");
		$("body").addClass( "ajax-none ajax-spinner" );
	});
});

