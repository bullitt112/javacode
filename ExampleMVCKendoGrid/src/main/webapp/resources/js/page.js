
var timerId;

var ErrorMessage = "The system is unavailable this time. Please try again later.";

$(document).ready(function(){
	// init help buttons
	initHelpButtons();	
	//initButtons();
	initSpinner();
	
	//tooltip scripts
	if (typeof($('.popover-transcript').clickover) == 'function') {
		$('.popover-transcript').clickover({ html : true});
	}
	
	//widgets
	$('.page_collapsible').collapsible();
	
	$('.transcript_collapsible').collapsible({
	    defaultOpen: 'transcript_col'
	});
	
	if($('div#main-wrapper').is('.transcript-order')){
		$('.help_collapsible').collapsible();
	}
	else{
		if($('div#main-wrapper').is('.ssnitin')) {
			$('.help_collapsible').collapsible({
			});
		}
			else{
				$('.help_collapsible').collapsible({
					defaultOpen: 'helpwidget'
				});
			}		
	}

});

function initHelpButtons() {
	$( "span.personal.icon-question-sign" ).click(function() { openHelpBox($(this).attr('rel')); return false; });
	$( "span.admission.icon-question-sign" ).click(function() { openHelpBox($(this).attr('rel')); return false; });
	$( "span.personal.help-link" ).click(function() { openHelpBox($(this).attr('rel')); return false; });
	$( "span.admission_slr.icon-question-sign" ).click(function() { openHelpBox($(this).attr('rel')); return false; });
}

function isNumeric(n) {
    var n2 = n;
    n = parseFloat(n);
    return (n!='NaN' && n2==n);
}

//***********************************************************************
//Function show or hide dependent elements
//1. All elements with style 'dependent' will no show on the start
//2. All elements with style 'element name' will be hidden
//3. All elements with style 'element name' + 'element value' will be shown
//4. All dots inside element name will be converted to '-'
//***********************************************************************
function showHideDependentElement() {
	//if (typeof(console) != 'undefined') console.log("element " + $(this).attr("name") + ', value = ' + $(this).val());

	__showHideDependentElement($(this).attr('name'), $(this).val());
}

function __showHideDependentElement(hideElement, showElement) {
	
	var nameElements = hideElement.split('.');
	var name = '.' + nameElements.join('-');

	//if (typeof(console) != 'undefined') console.log('showHideDependentElements -- hiding ' + name);
	$(name).hide();
	
	//if (typeof(console) != 'undefined') console.log('showHideDependentElements -- showing ' + name + showElement);
	$(name + showElement).show();

}

function showHideDependentElement2() {
	//if (typeof(console) != 'undefined') console.log("       " + $(this).attr("name") + ', rel = ' + $(this).attr('rel'));

	__showHideDependentElement2($(this).attr('name'), $(this).attr('rel'));
}

function __showHideDependentElement2(masterElement1, masterElement2) {
	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- elements ' + masterElement1 + ' ' + masterElement2);
	
	var nameElements1 = masterElement1.split('.');
	var name1 = '.' + nameElements1.join('-');

	var nameElements2 = masterElement2.split('.');
	var name2 = '.' + nameElements2.join('-');

	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- names ' + name1 + ' ' + name2);
	
	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- value name ' + 'input[name="'+masterElement1+'"]:radio:checked');
	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- value name ' + 'input[name="'+masterElement2+'"]:radio:checked');

	var value1 = $('input[name="'+masterElement1+'"]:radio:checked').val();
	var value2 = $('input[name="'+masterElement2+'"]:radio:checked').val();

	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- values ' + value1 + ' ' + value2);
	
	$(name1).hide();
	
	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- showing ' + name1 + value1);
	//if (typeof(console) != 'undefined') console.log('__showHideDependentElement2 -- showing ' + name2 + value2);
	$(name1 + value1).show();
	$(name2 + value2).show();

}


function initShortDatePicker() {
    var currentYear = (new Date).getFullYear();
    if ($('input.date-picker').length > 0) {
    	
    	$('input.date-picker').each(function( index ) {
        	//if (typeof(console) != 'undefined') console.log(index +" - "+  $(this).attr('id'));
    		var datePicker = $(this).data("kendoDatePicker");
    		if (datePicker == null) {
	        	if ($(this).hasClass('future')) {
	        		__initShortDatePicker(this, '+1d', '+50y');
	        	}
	        	else if ($(this).hasClass('past')) {
	        		__initShortDatePicker(this, '1940-01-01', 'today');
	       		
	        	}
	        	else {
	        		__initShortDatePicker(this, '1940-01-01', '+20y');
	        		
	        	}
    		}
    	});

    }
}

function __initShortDatePicker(el, minDate, maxDate) {
	var minDt = Date.parse(minDate);
	var maxDt = Date.parse(maxDate);
	//if (typeof(console) != 'undefined') console.log('Init ShortDatePicker for ' + $(el).attr('id') +' with min date ' + minDt +' and maxDate' + maxDt);
    $(el).kendoDatePicker({
        // defines the start view
        start: "year",

        // defines when the calendar should return date
        depth: "year",

        // display month and year in the input
        format: "MM/yyyy",
        
        min:  minDt,
        max:  maxDt,
        parseFormats: ["MM/yyyy", "MM-yyyy"],
        footer: false

    });	

    $(el).bind("focus", function() {
        $(this).data("kendoDatePicker").open();
    });
}


function initDatePicker() {
    var currentYear = (new Date).getFullYear();
    if ($('input.full-date-picker').length > 0) {
    	
    	$('input.full-date-picker').each(function( index ) {
        	//if (typeof(console) != 'undefined') console.log(index + ": future=" + $(this).hasClass('future') + ", past="+$(this).hasClass('past'));
    		var datePicker = $(this).data("kendoDatePicker");
    		if (datePicker == null) {
	        	if ($(this).hasClass('future')) {
	        		__initDatePicker(this, '+1d', '+50y');
	        	}
	        	else if ($(this).hasClass('past')) {
	        		__initDatePicker(this, '1940-01-01', 'today');
	       		
	        	}
	        	else {
	        		__initDatePicker(this, '1940-01-01', '+20y');
	        		
	        	}
    		}
    	});

    }

}

function initDateFields(period) {
    var currentYear = (new Date).getFullYear();
	if (period == 'future') {
		__initDatePicker('+1d', '+50y');
	}
	else if (period == 'past') {
		__initDatePicker('1940-01-01', '0');
	}
	else {
		__initDatePicker('1940-01-01', '+20y');
	}
}

function __initDatePicker(el, minDate, maxDate) {
	var minDt = Date.parse(minDate);
	var maxDt = Date.parse(maxDate);
	//if (typeof(console) != 'undefined') console.log('Init DatePicker for ' + $(el).attr('id') +' with min date ' + minDt +' and maxDate' + maxDt);
    $(el).kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",
        
        min:  minDt,
        max:  maxDt,
        parseFormats: ["MM/dd/yyyy", "dd/MM/yyyy", "MM-dd-yyyy"]
    });	

    $(el).bind("focus", function() {
        $(this).data("kendoDatePicker").open();
    });

}

function initDateTimePicker() {
    var currentYear = (new Date).getFullYear();
    if ($('input.datetimepicker').length > 0) {
    	
    	$('input.datetimepicker').each(function( index ) {
        	//if (typeof(console) != 'undefined') console.log(index +" - "+  $(this).attr('id'));
    		var datePicker = $(this).data("kendoDateTimePicker");
    		if (datePicker == null) {
	        	if ($(this).hasClass('future')) {
	        		__initDateTimePicker(this, '+1d', '+50y');
	        	}
	        	else if ($(this).hasClass('past')) {
	        		__initDateTimePicker(this, '1940-01-01', 'today');
	       		
	        	}
	        	else {
	        		__initDateTimePicker(this, '1940-01-01', '+20y');
	        		
	        	}
    		}
    	});

    }
}

function __initDateTimePicker(el, minDate, maxDate) {
	var minDt = Date.parse(minDate);
	var maxDt = Date.parse(maxDate);
	//if (typeof(console) != 'undefined') console.log('Init DatePicker for ' + $(el).attr('id') +' with min date ' + minDt +' and maxDate' + maxDt);
    $(el).kendoDateTimePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy hh:mm tt",
        timeFormat: "hh:mm tt",
        
        min:  minDt,
        max:  maxDt,
        parseFormats: ["MM/dd/yyyy hh:mm tt", "dd/MM/yyyy hh:mm tt", "MM-dd-yyyy hh:mm tt"]
    });	

//    $(el).bind("focus", function() {
//        $(this).data("kendoDateTimePicker").open();
//    });

}


//init fields onfocus and on blur events
function highlightFormFields() {
	// needed for Chrome. Without it onclick event on radio button doesn't work in Chrome
	$('.field').click(function() {
	    $(this).focus();
	});
	
	$('.field').focusin(function(){
		//if (console) console.log('focus fire ' + $(this).attr('name'));
		$(this).closest('li').css('background-color', '#FFF7C0');
	});
	
	$('.field').focusout(function(){
		//if (console) console.log('focus blur ' + $(this).attr('name'));
		$(this).closest('li').css('background-color', '#ffffff');
	});
	
	//set focus on first visible form element
	$("form#slrForm:not(.filter) :input:visible:enabled:first").focus();
	
	//set focus on first error form element
	$("form#slrForm:not(.filter) :input.error:visible:enabled:first").focus();

}

function initTabindex() {
	var i = 1;
	$('#slrForm .tabindex:visible:enabled').each(function(){ $(this).attr('tabindex', i++);});
}

//show help box
function openHelpBox(boxId) {
	$( "#"+boxId ).dialog({
		modal: true,
		minWidth: 600,
		maxHeight: 500,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
}

function initTextareaCharLimit(elementClass, counterClass, limit) {
	// controls character input/counter
	$('textarea'+elementClass).keyup(function() {
		var charLength = $(this).val().length;
		
		// Displays count
		$('span'+counterClass).html(charLength + ' of '+ limit +' characters used');
		
		// Alerts when 250 characters is reached
		if($(this).val().length > limit) {
			$('span'+counterClass).html('<strong>You may only have up to '+limit+' characters.</strong>');
	        $(this).val($(this).val().substr(0, limit));
		}
	});	
}

function initInputCharLimit(elementClass, counterClass, limit) {
	// controls character input/counter
	$('input'+elementClass).keyup(function() {
		var charLength = $(this).val().length;
		
		// Displays count
		$('span'+counterClass).html(charLength + ' of '+ limit +' characters used');
		
		// Alerts when 250 characters is reached
		if($(this).val().length > limit) {
			$('span'+counterClass).html('<strong>You may only have up to '+limit+' characters.</strong>');
	        $(this).val($(this).val().substr(0, limit));
		}
	});	
}

function getCountries(id, selectedOption) {
	
    $.getJSON('/StudentWebMVC/utils/countries', {}, function(countries) {
//    	var options = $(id);
//    	
//   	
//    	options.get(0).options.length = 0;
//    	options.get(0).options[0] = new Option("Select country", ""); 
//    	$.each(countries, function() {
//    		options.get(0).options[options.get(0).options.length] = new Option(this.name, this.code);
//    	    //options.append($("<option />").val(this.code).text(this.name));
//    	});
//
//        // set default value
//    	options.val(defaultValue);
    	var select = $(id);
    	
    	var options;
    	if(select.prop) {
    	  options = select.prop('options');
    	}
    	else {
    	  options = select.attr('options');
    	}
    	
    	$('option', select).remove();
    	
   		options[options.length] = new Option("Select country", "");
    	
   		$.each(countries, function(val, text) {
   			options[options.length] = new Option(this.name, this.code);
   		});
   		select.val(selectedOption);
    });
}

function initAddressHelper() {
	if ($('div.addressData select.addressClass').length == 0) {
		return;
	}
	
    $.getJSON('/StudentWebMVC/utils/addressClass', {}, function(addrClasses) {
     	$('div.addressData select.addressClass').each(function (i, select) {
     		
	    	var options;
	    	if($(select).prop) {
	    	  options = $(select).prop('options');
	    	}
	    	else {
	    	  options = $(select).attr('options');
	    	}
	    	
	    	$('option', $(select)).remove();
	    	
	   		$.each(addrClasses, function(val, text) {
	   			options[options.length] = new Option(this.name, this.value);
	   		});
	   		
	   		//$(select).val("offCampusAddress");
	   		var classValue = $(select).next('[type=hidden]').val();
	   		$(select).val(classValue);
	   		if (typeof(console) != 'undefined') console.log("addressClass " + classValue );
	   		
	   		$(select).attr('rel', 'residenceHall');
	   		
	   		select.addEventListener(
	   		     'change',
	   		     function() {
	   		    	 //toggleSelect(this);
	   		    	changeAddressClass(this);
	   		     },
	   		     false
	   		  );
	   		
	   		//init values on load
	   	    toggleSelect($('div.addressData select.addressClass'));

    	});
    });
}

function loadResidenceHalls() {
    $.getJSON('/StudentWebMVC/utils/residenceHalls', {}, function(halls) {
     	$('div.addressData select.residenceHall').each(function (i, select) {
     		
	    	var options;
	    	
	    	if($(select).prop) {
	    	  options = $(select).prop('options');
	    	}
	    	else {
	    	  options = $(select).attr('options');
	    	}
	    	
	    	$('option', $(select)).remove();
	    	options[options.length] = new Option("No Res Hall selected", "");	    	
	   		$.each(halls, function(val, text) {	   			
	   			options[options.length] = new Option(this.name, this.value);
	   		});
	   		
	   		var hallValue = $(select).next('[type=hidden]').val();
	   		$(select).val(hallValue);
	   		if (typeof(console) != 'undefined') console.log("residence Hall value " + hallValue );

	   		
//	   		$(select).val("offCampusAddress");
	   		
//	   		select.addEventListener(
//	   		     'change',
//	   		     function() {
//	   		    	 toggleSelect(this);
//	   		     },
//	   		     false
//	   		  );
    	});
    });
	
}

function changeAddressClass(selectObj){
	toggleSelect(selectObj);
	if (typeof(console) != 'undefined') console.log("Change Adress new-----------------");
	//additional clean up
	//$('#address.street').val('');
	$('[name="address.street"]').val('');
	$('[name="address.street2"]').val('');
	$('[name="address.city"]').val('');
	$('[name="address.zip"]').val('');
	$('[name="address.country"]').val('');
	$('[name="address.state"]').val('');
	$('[name="address-state"]').val('');
	$('[name="residenceHall"]').val('');
	
}

function toggleSelect(select) {
	if (typeof(console) != 'undefined') console.log("onChange event " + $(select).val() );
	//var resHallElement = '.'+$(select).attr('rel');
	
	//$(resHallElement).hide();
	
	if ($(select).val() == 'residenceHall') {
		loadResidenceHalls();
		//$(resHallElement).show();
		$('.otherCampusAddress').hide();
		$('.offCampusAddress').hide();
		$('.residenceHall').show();
		
	}
	else if ($(select).val() == 'otherCampusAddress') {
		$('.residenceHall').hide();
		$('.offCampusAddress').hide();
		$('.otherCampusAddress').show();
		
	}
	else {
		$('.residenceHall').hide();
		$('.otherCampusAddress').hide();
		$('.offCampusAddress').show();
	}
}

function initAddress(delete_value) {
	delete_value = typeof delete_value !== 'undefined' ? delete_value : false;
	
	if ($('div.address select.country').length == 0) {
		return;
	}
	
    $.getJSON('/StudentWebMVC/utils/countries', {}, function(countries) {
     	$('div.address select.country').each(function (i, select) {
     		
	    	var options;
	    	if($(select).prop) {
	    	  options = $(select).prop('options');
	    	}
	    	else {
	    	  options = $(select).attr('options');
	    	}
//	    	console.log("this " + $(select).name);
//	    	console.log("parent " + $(this).parent().parent().attr('class'));
//	    	console.log("next " + $(this).next('[type=hidden]').val());
//	    	console.log("state select " + $(select).parent().parent().find('select.province').attr('rel') );
//	    	console.log("state " + $(select).parent().parent().find('select.province').name );
	    	
	    	$('option', $(select)).remove();
	    	
	   		options[options.length] = new Option("Select country", "");
	    	
	   		$.each(countries, function(val, text) {
	   			if (delete_value && this.code == 'US')
	   				return;
	   			options[options.length] = new Option(this.name, this.code);
	   		});
	   		
	   		var countryValue = $(this).next('[type=hidden]').val();
	   		$(select).val(countryValue);
	   		if (typeof(console) != 'undefined') console.log("set country to " + countryValue );
	   		
	   		//init states
	   		var state = $(select).parent().parent().find('select.province');
	   		
	   		var stateValue = state.next('[type=hidden]').val();
	   		if (typeof(console) != 'undefined') console.log("state valus is " + stateValue);
	   		getStates(state, countryValue, stateValue);
	   		
    	});
    });
    
	$("div.address select.country").change(function() {
        getStates("#"+$(this).attr("rel"), $(this).val());
    });
	
	initAddressHelper();

}



function initStates() {
	if ($('div.address select.state').length == 0) {
		return;
	}
	
	$('div.address select.state').each(function(i, select) {
		
	});
	
	
    $.getJSON('/StudentWebMVC/utils/states', {country: countryCode}, function(states) {
    	$(id).each(function (i, select) {
    		
    		//console.log("processing " + select.name);
    		var options;
    		if($(select).prop) {
    			options = $(select).prop('options');
    		}
    		else {
    			options = $(select).attr('options');
    		}
    	
    		$('option', $(select)).remove();

    		//console.log("processing prop " + $(select).prop('options'));
    		//console.log("processing state value " + $(select).attr("rel"));

    		if (!jQuery.isEmptyObject(states)) {
    	
        		//console.log("processing - going to add state options");
    			options[options.length] = new Option("Select state", "");
    	
    			$.each(states, function(val, text) {
    				options[options.length] = new Option(this.name, this.value);
        	   		//console.log("processing adding option " + this.name);
    			});
    			$(select).val($(select).attr("rel"));

    		}

    	});
    });
}

function getStates(id, countryCode, selectedOption) {

	if (countryCode.length == 0) {
		$(id).parent().hide();
		return;
	}
	
	
    $.getJSON('/StudentWebMVC/utils/states', {country: countryCode}, function(states) {
    	var options;
    	var select = $(id);
    	if(select.prop) {
    	  options = select.prop('options');
    	}
    	else {
    	  options = select.attr('options');
    	}
    	
    	$('option', select).remove();

    	if (!jQuery.isEmptyObject(states)) {
    	
    		if (options == undefined)
    			options = new Array();
    			
    // if non us select province
    		if (countryCode == 'US'){
    			options[options.length] = new Option("Select state", "");
    		}else{
    			options[options.length] = new Option("Select province", "");
    		}
    	
    		$.each(states, function(val, text) {
    			options[options.length] = new Option(this.name, this.value);
    		});
    		select.val(selectedOption);

    		//var element = select.attr("rel");
    		$(select).parent().show();
    	}
    	else {
    		//var element = select.attr("rel");
    		$(select).parent().hide();
    	}
    	
    });
}

function initMultiStates(id, countryCode) {
    $.getJSON('/StudentWebMVC/utils/states', {country: countryCode}, function(states) {
    	$(id).each(function (i, select) {
    		
    		//console.log("processing " + select.name);
    		var options;
    		if($(select).prop) {
    			options = $(select).prop('options');
    		}
    		else {
    			options = $(select).attr('options');
    		}
    	
    		$('option', $(select)).remove();

    		//console.log("processing prop " + $(select).prop('options'));
    		//console.log("processing state value " + $(select).attr("rel"));

    		if (!jQuery.isEmptyObject(states)) {
    	
        		//console.log("processing - going to add state options");
    			options[options.length] = new Option("Select state", "");
    	
    			$.each(states, function(val, text) {
    				options[options.length] = new Option(this.name, this.value);
        	   		//console.log("processing adding option " + this.name);
    			});
    			$(select).val($(select).attr("rel"));

    		}
    	});
    });
}

function initButtons() {
	$( "input:submit, input:button" ).button();
	$('.add-item-button').button({
		icons: {
			primary: "ui-icon-plus"
			}
	});
	$('.edit-item-button').button({
		icons: {
			primary: "ui-icon-pencil"
			}
	});
	$('.del-item-button').button({
		icons: {
			primary: "ui-icon-close"
			}
	});
	$('.save-item-button').button({
		icons: {
			primary: "ui-icon-disk"
			}
	});
	$('.cancel-item-button').button({
		icons: {
			primary: "ui-icon-cancel"
			}
	});
}

function showHideContent(toShow, toHide) {
	$(toHide).hide();
	$(toShow).show();
	return false;
}

function getAjaxForm(formUrl, formId, contentId) {
	var request = ajaxCall(formUrl, '', 'GET', false, formId);
	
	request.success( function(data, textStatus, jqXHR){

		  if (typeof(console) != 'undefined')  console.log("Success: reloading content in "+formId+", http status = " + jqXHR.status);
		  $(formId).empty().html(jqXHR.responseText);
	 });

	showHideContent(formId, contentId);
	return false;
}

function getAjaxFormWithParams(formUrl, data, formId, contentId) {
	var request = ajaxCall(formUrl, data, 'GET', false, formId);
	
	request.success( function(data, textStatus, jqXHR){

		  if (typeof(console) != 'undefined')  console.log("Success: reloading content in "+formId+", http status = " + jqXHR.status);
		  $(formId).empty().html(jqXHR.responseText);
	 });

	showHideContent(formId, contentId);
	return false;
}


function cancelAjaxForm(formId, contentId) {
	$(formId).empty();
	showHideContent(contentId, formId);
	return false;
}

function submitAjaxForm(formId, resultId) {
	var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, resultId);
	
	request.success( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined') console.log("Success: reloading "+ formId + " form and populating " + resultId);
		  //if (typeof(console) != 'undefined') console.log("Status" +textStatus +"\n\nData: " + data);

		  if (data.indexOf('<html') != -1 && data.indexOf('<body') != -1) {
			  $('html').empty().html( data );

			  $("body").addClass( "ajax-none ajax-spinner" );
			  $(document.body).trigger('load');
		  }
		  else
			  $( resultId ).empty().html(data);

	});
	
	return false;
}

function openSwitchUserDialog(id) {
	var boxId = "#"+id + "-dialog";
	if (typeof(console) != 'undefined') console.log("Dialog id: " + boxId);
	//$( boxId).dialog( "destroy" );

	var request = ajaxCall("/StudentWebMVC/app/utils/user/change", '', 'GET', true, null);
	
	var dataId;
	request.success(function(data) {
		dataId = $(data).attr("class");
		if (typeof(console) != 'undefined') console.log("Got data with id: " + dataId);
		$("#" + dataId).empty().html(data);
	});

	var dlg = $( boxId )
	.dialog({
		modal: true,
		minHeight: 280,
		
		open: function( event, ui ) {
			if (typeof(console) != 'undefined') console.log("Init switch user dialog");


		},		
		
		buttons: {
			Confirm: function() {
				var formId = "#switch-user-form";
				if (typeof(console) != 'undefined') console.log("Content id: " + id);
				var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, "#" + dataId);
				
				request.success( function(data, textStatus, jqXHR){
					  if (typeof(console) != 'undefined') console.log("Success: refreshing page");
					  $( boxId ).dialog( "close" );
					  $(boxId).dialog('destroy');

					  location.reload();
				 });
				
			},
			Cancel: function() {
				$("#" + dataId).empty();
				// close dialog
				$( this ).dialog( "close" );
				$(boxId).dialog('destroy');

			}
		}

	});
	return false;
}


function resetForm(id) {
	$('#'+id).each(function(){
	        this.reset();
	});
}


function thirdparty_sort(a, b){
	if($('.third_party_name').text().trim().toLowerCase() == $(a).children('span').text().trim().toLowerCase()){
		$(a).children('span').addClass('tpn_match');
	}
	if($('.third_party_name').text().trim().toLowerCase() == $(b).children('span').text().trim().toLowerCase()){
		$(b).children('span').addClass('tpn_match');
	}
	return ($(b).children('span').text()) < ($(a).children('span').text()) ? 1 : -1;    
}

function thirdpartyname_sort(a, b){
	return ($(b).children('span').hasClass('tpn_match')) ? 1 : -1; 
}

function init_page_collapsible_third_party() {
	$('.page_collapsible_third_party').collapsible({  
		animateClose: function (elem, opts) {
							elem.children('.third_party_functions').slideUp(opts.speed);
					  },
		animateOpen: function (elem, opts) {
							elem.children('.third_party_functions').slideDown(opts.speed);
					 }, 
		loadClose: function() {} 
	});
				
	$(".third_party_sort .page_collapsible_third_party").sort(thirdparty_sort).appendTo('.third_party_sort').sort(thirdpartyname_sort).appendTo('.third_party_sort');
	
}



//jQuery plugin to prevent double submission of forms
jQuery.fn.preventDoubleSubmission = function() {
  $(this).on('submit',function(e){
    var $form = $(this);

    if (typeof(console) != 'undefined') console.log("Form submitted");

    if ($form.data('submitted') === true) {
      // Previously submitted - don't submit again
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored
      $form.data('submitted', true);
    }
  });

  // Keep chainability
  return this;
};
