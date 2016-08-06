function toggleReleaseMethodAdds() {
	var val = $('input:radio[name="request.releaseMethod.id"]:checked').val();

	if (typeof(console) != 'undefined')  console.log("releaseMethod.id radio was clicked " + val);
	
	$('.releaseMethodAdds').hide();
	$('.releaseMethodAdds'+val).show();

}

function toggleStaffDiscount() {
	var val = $('input:radio[name="discount.type"]:checked').val();

	if (typeof(console) != 'undefined')  console.log("discount.type radio was clicked " + val);
	
	$('.staffDiscount').hide();
	$('.staffDiscount'+val).show();

}

function toggleReplacementReason() {
	var val = $('input:radio[name="request.replacementReason.id"]:checked').val();

	if (typeof(console) != 'undefined')  console.log("replacementReason.id radio was clicked " + val);
	
	$('.request-replacementReason').hide();
	$('.request-replacementReason'+val).show();

}


function processState(eventId) {
	if (typeof(console) != 'undefined')  console.log("going to " + eventId + " state");
	if (typeof(console) != 'undefined')  console.log("form action: " + $('#diplomaForm').attr("action"));
	
	$('input[name="_eventId"]').val(eventId);
	submitAjaxForm('#diplomaForm', '#diploma-request-content');
	return false;
}

function submitAjaxFormCustom(formId, resultId) {
	var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, resultId);
	
	request.success( function(data, textStatus, jqXHR){
		  //if (typeof(console) != 'undefined') console.log("Success: reloading "+ formId + " form and populating " + resultId);
		  //if (typeof(console) != 'undefined') console.log("Status" +textStatus +"\n\nData: " + data);
		  $( resultId ).empty().html(data);
		  
		  if (data.indexOf('cashnet.com') != -1) {
			  //if (typeof(console) != 'undefined') console.log("redirecting to cashnet");
			  //$('#Form1').submit();
			  $("html").empty().html(data);
			  $("body").addClass( "ajax-none ajax-spinner" );
			  $(document.body).trigger('load');
		  }
	 });
	
	return false;
}

function onAdressInfoClick() {
	if (typeof(mailingInfo) != 'undefined') {	
		
		$('.mailingInfo').click(function() {

			// if the zip code is longer than 5, use a '-' after the first 5
			zip = mailingInfo.zip;			
			if (/^\d{6,}$/.test(zip)) {
				zip = zip.substring(0,5) + "-" + zip.substring(5);
			}
						
			$('#address\\.street').val(mailingInfo.street1);
			$('#address\\.street2').val(mailingInfo.street2);
			$('#address\\.zip').val(zip);
			$('#address\\.city').val(mailingInfo.city);
			$('input[name="address-country"]').val(mailingInfo.country);
			$('input[name="address-state"]').val(mailingInfo.state);
			
			initAddress();
		});
	}
}

function initStateNavigation() {
	$('.state-nav').on('click', function(){
		processState($(this).attr('id'));
	});
	
	$('.end-state-nav').on('click', function(){
		$('input[name="_eventId"]').val($(this).attr('id'));
		$('#diplomaForm').submit();
	});
}

function initReplacements(defaultLetterId,  defaultLetterType) {

	$('.letter-replacement-div').hide();
	
	$('.letter-source').click(function(){
		var id = $(this).attr('rel');
		
		// grab the original value, if cancel button is clicked, place the original value back 
		var originalValue = $(this).text();
		var clickedLetterSource = $(this);
		
		// if the ok button is clicked, make the original value the current value
		$('.diploma-request-edit-name-ok').click(function() {
			original_value = clickedLetterSource.text();			
		});	
		
		var originalNumValue = originalValue.charCodeAt(0);

		// if the cancel button is clicked, replace with the original value for each part of the name - firstName, middleName, lastName, middleNameDot, and suffixComma
		if ($(this).hasClass('firstName')) {
			initCancelButton(id, 'firstNameForm', clickedLetterSource, originalValue, originalNumValue);
		} 
		else if ($(this).hasClass('middleName')) {
			initCancelButton(id, 'middleNameForm', clickedLetterSource, originalValue, originalNumValue);
		} 
		else if ($(this).hasClass('lastName')) {
			initCancelButton(id, 'lastNameForm', clickedLetterSource, originalValue, originalNumValue);
		} 
		else if ($(this).hasClass('suffixComma')) {
			initCancelButton(id, 'suffixComma', clickedLetterSource, originalValue, originalNumValue);
		}
		else if ($(this).hasClass('periodAfterSuffix')) {
			initCancelButton(id, 'periodAfterSuffix', clickedLetterSource, originalValue, originalNumValue);
		}
		
		if (typeof(console) != 'undefined') console.log("    clicked on letter with id= " + id);
		$('.letter-replacement-div').hide();

		if ($(this).hasClass('firstName'))
			$('.firstName.letter-replacement-div'+id).show();
		
		else if ($(this).hasClass('lastName'))
			$('.lastName.letter-replacement-div'+id).show();
		
		else if ($(this).hasClass('middleName'))
			$('.middleName.letter-replacement-div'+id).show();

		else if ($(this).hasClass('suffixComma'))
			$('.suffixComma.letter-replacement-div'+id).show();

		else if ($(this).hasClass('periodAfterSuffix'))
			$('.periodAfterSuffix.letter-replacement-div'+id).show();

		$('.letter-source').removeClass("selected-letter");
		$(this).addClass("selected-letter");
				
	});
	
	$('.close-action').click(function(){
		var id = $(this).attr('rel');
		$('.letter-replacement-div'+id).hide();		
	});
	
	if (defaultLetterId != -1) {
		$('.'+defaultLetterType+'.letter-source'+defaultLetterId).click();
	}

	$('.letter-replacement').click(function() {
		var id = $(this).attr('rel');
		var val = $(this).attr('data-letter');
		var numVal = $(this).attr('data-lettervalue');

		if (typeof(console) != 'undefined') console.log("    going to replace id= " + id + " with " + val +"("+numVal+")");
		
		if ($(this).hasClass('firstNameForm')) {
			changeReplacementValue(id, 'firstName', 'firstNameForm', val, numVal);
		}
		else if ($(this).hasClass('middleNameForm')) {
			changeReplacementValue(id, 'middleName', 'middleNameForm', val, numVal);
		}
		
		else if ($(this).hasClass('lastNameForm')) {
			changeReplacementValue(id, 'lastName', 'lastNameForm', val, numVal);
		}
		
		else if ($(this).hasClass('suffixCommaForm')) {
			changeReplacementValue(id, 'suffixComma', 'suffixComma', val, numVal);
		}

		else if ($(this).hasClass('periodAfterSuffixForm')) {
			changeReplacementValue(id, 'periodAfterSuffix', 'periodAfterSuffix', val, numVal);
		}
});		
	
}

function initCancelButton(id, className, clickedLetterSource, originalValue, originalNumValue) {
	$('.diploma-request-edit-name-cancel,.letter-source').click(function() {
		clickedLetterSource.text(originalValue);
		clickedLetterSource.html(originalValue);
		$('input[name="'+className+'.letters['+id+'].replacementValue"]').val(originalNumValue);
		
		if (typeof(console) != 'undefined') console.log(className+ " replaced with the original value: " + originalNumValue);	
	});
}

function changeReplacementValue(id, letterClassName, valueClassName, charValue, numValue) {
	$('.'+letterClassName+'.letter-source'+id).html(charValue);
	if (typeof(console) != 'undefined') console.log("    replaced " + valueClassName);
	$('input[name="'+valueClassName+'.letters['+id+'].replacementValue"]').val(numValue);
	
}

function clearUploadErrors() {
	$('#uploadErrors').html("");
	$('#uploadErrors').removeClass("error icon-warning-sign");

}

function addUploadErrors(message) {
	$('#uploadErrors').html(message);
	$('#uploadErrors').addClass("error icon-warning-sign");

}

function countUploaded() {
	return $('.k-file-success').size();
}

function onSelect(e) {
	// Array with information about the uploaded files
	clearUploadErrors();

	var fileTotal = countUploaded() + e.files.length;

	if (fileTotal > 3) {
		addUploadErrors("You cannot upload more than 3 documents");
		e.preventDefault();
		return;
	}

	$.each(e.files, function(index, value) {
		// console.log("Name: " + value.name);
		// console.log("Size: " + value.size + " bytes");
		// console.log("Extension: " + value.extension);
		// if(value.extension != ".JPG") {
		// e.preventDefault();
		// alert("Please upload jpg image files");
		// }
	});
}

function onError(e) {
	// Array with information about the uploaded files
	var files = e.files;

	addUploadErrors(e.XMLHttpRequest.responseText);

	if (e.operation == "upload") {
		if (typeof (console) != 'undefined')
			console.log("Failed to upload " + files.length + " files");
	}
}

function onSuccess(e) {
	// Array with information about the uploaded files
	var files = e.files;

	clearUploadErrors();

	var fileTotal = countUploaded();
	if (fileTotal >= 3) {
		$(".k-upload-button").hide();
	} else {
		$(".k-upload-button").show();
	}
}

function initKeyboard() {
	
	//	place all of the input fields ids in an array
	var inputFields = ["keyboard1", "keyboard2", "keyboard3"];
	
	//loop through the array for each input field to add the keyboard
	inputFields.forEach(function(entry) {
	
// Diploma Request - Name Change - jQuery Keyboard
$('#' + entry).keyboard({

	  // set this to ISO 639-1 language code to override language set by the layout
	  // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
	  // language defaults to "en" if not found
	  language     : null,
	  rtl          : false,

	  // *** choose layout ***
	  layout       : 'custom',
	  
	//*** change keyboard language & look ***
	  display : {    
	      'meta1' :  'Q',
	      'meta2' :  'W',
	      'meta3' :  'E',
		  'meta4' :  'R',
		  'meta5' :  'T',
		  'meta6' :  'Y',
		  'meta7' :  'U',
	      'meta8' :  'I',
		  'meta9' :  'O',
		  'meta10' : 'P',
		  'meta11' : 'A',
		  'meta12' : 'S',
		  'meta13' : 'D',
		  'meta14' : 'F',
		  'meta15' : 'G',
		  'meta16' : 'H',
		  'meta17' : 'J',
		  'meta18' : 'K',
		  'meta19' : 'L',	      
		  'meta20' : 'Z',
		  'meta21' : 'X',
		  'meta22' : 'C',
		  'meta23' : 'V',
		  'meta24' : 'B',
		  'meta25' : 'N',
	      'meta26' : 'M',
	      'meta27' : ',',
	      'meta28' : '.',
	      'accept': 'OK:OK (Shift-Enter)',
		  },

	  customLayout : { 
		  'default': ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
		              '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
		              '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
		              '{left} {right} {space} {bksp} {accept} {cancel}'
		              ],
		  'meta1' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
		             'Q',
		              '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
		              '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
		              '{left} {right} {space} {bksp} {accept} {cancel}'
		              ],
		  'meta2' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
		             'W',
		              '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
		              '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
		              '{left} {right} {space} {bksp} {accept} {cancel}'
		              ],
	      'meta3' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	              'E \u00C8 \u00C9 \u00CA \u00CB',
	               '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	               '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	               '{left} {right} {space} {bksp} {accept} {cancel}'
	              ],
	      'meta4' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'R',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta5' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'T',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta6' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'Y \u00DD \u0178',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta7' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'U \u00D9 \u00DA \u00DB \u00DC',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta8' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'I \u00CC \u00CD \u00CE \u00CF',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta9' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'O \u00D2 \u00D3 \u00D4 \u00D6 \u00D8 \u00D5',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
	      'meta10' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                 'P',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
          'meta11' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  'A \u00C0 \u00C1 \u00C2 \u00C4 \u00C3 \u00C5',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
          'meta12' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
	                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
	                  'S \u0160',
	                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
	                  '{left} {right} {space} {bksp} {accept} {cancel}'
	                 ],
          'meta13' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                  'D',
                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                  '{left} {right} {space} {bksp} {accept} {cancel}'
                 ],
          'meta14' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                     '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                     'F',
                     '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                     '{left} {right} {space} {bksp} {accept} {cancel}'
                    ],
         'meta15' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                    '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                    'G',
                    '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                    '{left} {right} {space} {bksp} {accept} {cancel}'
                   ],
         'meta16' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                   '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                   'H',
                   '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                   '{left} {right} {space} {bksp} {accept} {cancel}'
                  ],
         'meta17' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                      '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                      'J',
                      '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                      '{left} {right} {space} {bksp} {accept} {cancel}'
                     ],
         'meta18' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                     '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                     'K',
                     '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                     '{left} {right} {space} {bksp} {accept} {cancel}'
                    ],
         'meta19' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                    '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                    'L',
                    '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                    '{left} {right} {space} {bksp} {accept} {cancel}'
                   ],
         'meta20' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                   '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',                   
                   '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                   'Z \u017D ',
                   '{left} {right} {space} {bksp} {accept} {cancel}'
                  ],
         'meta21' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',                  
                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                  'X',
                  '{left} {right} {space} {bksp} {accept} {cancel}'
                 ],
         'meta22' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                     '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',                     
                     '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                     'C \u00C7',
                     '{left} {right} {space} {bksp} {accept} {cancel}'
                    ],
         'meta23' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                    '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',                 
                    '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                    'V',
                    '{left} {right} {space} {bksp} {accept} {cancel}'
                   ],
         'meta24' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                   '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',                  
                   '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                   'B',
                   '{left} {right} {space} {bksp} {accept} {cancel}'
                  ],
        'meta25' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                  '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                  '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                  'N \u00D1',
                  '{left} {right} {space} {bksp} {accept} {cancel}'
                 ],
        'meta26' : ['{meta1} {meta2} {meta3} {meta4} {meta5} {meta6} {meta7} {meta8} {meta9} {meta10}',	                
                     '{meta11} {meta12} {meta13} {meta14} {meta15} {meta16} {meta17} {meta18} {meta19}',
                     '{meta20} {meta21} {meta22} {meta23} {meta24} {meta25} {meta26} , .',
                     'M',
                     '{left} {right} {space} {bksp} {accept} {cancel}'
                    ],
	     
	  },

	  position     : {
	    of : null, // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
	    my : 'left top',
	    at : 'left top',
	    at2: 'center top' // used when "usePreview" is false (centers keyboard at bottom of the input/textarea)
	  },

	  // allow jQuery position utility to reposition the keyboard on window resize
	  reposition   : true,

	  // preview added above keyboard if true, original input/textarea used if false
	  usePreview   : true,

	  // if true, the keyboard will always be visible
	  alwaysOpen   : false,

	  // give the preview initial focus when the keyboard becomes visible
	  initialFocus : true,

	  // if true, keyboard will remain open even if the input loses focus.
	  stayOpen     : false,
	  
	  // Message added to the key title while hovering, if the mousewheel plugin exists
	  wheelMessage : 'Use mousewheel to see other keys',

	  css : {
	    input          : 'ui-widget-content ui-corner-all', // input & preview
	    container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix', // keyboard container
	    buttonDefault  : 'ui-state-default ui-corner-all', // default state
	    buttonHover    : 'ui-state-hover',  // hovered button
	    buttonAction   : 'ui-state-active', // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
	    buttonDisabled : 'ui-state-disabled', // used when disabling the decimal button {dec}
	    buttonEmpty    : 'ui-keyboard-empty' // empty button class name {empty}
	  },

	  // *** Useability ***
	  // Auto-accept content when clicking outside the keyboard (popup will close)
	  autoAccept   : true,

	  // Prevents direct input in the preview window when true
	  lockInput    : false,

	  // Prevent keys not in the displayed keyboard from being typed in
	  restrictInput: true,

	  // Check input against validate function, if valid the accept button is clickable;
	  // if invalid, the accept button is disabled.
	  acceptValid  : true,

	  // if acceptValid is true & the validate function returns a false, this option will cancel
	  // a keyboard close only after the accept button is pressed
	  cancelClose  : true,

	  // Use tab to navigate between input fields
	  tabNavigation: true,

	  // press enter (shift-enter in textarea) to go to the next input field
	  enterNavigation : true,
	  // mod key options: 'ctrlKey', 'shiftKey', 'altKey', 'metaKey' (MAC only)
	  enterMod : 'altKey', // alt-enter to go to previous; shift-alt-enter to accept & go to previous

	  // if true, the next button will stop on the last keyboard input/textarea; prev button stops at first
	  // if false, the next button will wrap to target the first input/textarea; prev will go to the last
	  stopAtEnd : true,

	  // Set this to append the keyboard immediately after the input/textarea it is attached to.
	  // This option works best when the input container doesn't have a set width and when the
	  // "tabNavigation" option is true
	  appendLocally: false,

	  // Append the keyboard to a desired element. This can be a jQuery selector string or object
	  appendTo: 'body',

	  // If false, the shift key will remain active until the next key is (mouse) clicked on;
	  // if true it will stay active until pressed again
	  stickyShift  : true,

	  // caret places at the end of any text
	  caretToEnd   : false,

	  // Prevent pasting content into the area
	  preventPaste : true,

	  // Set the max number of characters allowed in the input, setting it to false disables this option
	  maxLength    : false,

	  // allow inserting characters @ caret when maxLength is set
	  maxInsert    : true,

	  // Mouse repeat delay - when clicking/touching a virtual keyboard key, after this delay the key
	  // will start repeating
	  repeatDelay  : 500,

	  // Mouse repeat rate - after the repeatDelay, this is the rate (characters per second) at which the
	  // key is repeated. Added to simulate holding down a real keyboard key and having it repeat. I haven't
	  // calculated the upper limit of this rate, but it is limited to how fast the javascript can process
	  // the keys. And for me, in Firefox, it's around 20.
	  repeatRate   : 20,

	  // resets the keyboard to the default keyset when visible
	  resetDefault : false,

	  // Event (namespaced) on the input to reveal the keyboard. To disable it, just set it to ''.
	  openOn       : 'focus',

	  // When the character is added to the input
	  keyBinding   : 'mousedown',

	  // combos (emulate dead keys : http://en.wikipedia.org/wiki/Keyboard_layout#US-International)
	  // if user inputs `a the script converts it to à, ^o becomes ô, etc.
	  useCombos    : true,

	  // *** Methods ***
	  // Callbacks - add code inside any of these callback functions as desired
	  initialized : function(e, keyboard, el) {},
	  visible     : function(e, keyboard, el) {},
	  change      : function(e, keyboard, el) {
  
		  $('[name="44"],[name="46"] ').click(function (e){  
			  
			  // if the comma or period button is pressed, disable them
			  $('[name="44"]').attr("disabled", true);
	          $('[name="46"]').attr("disabled", true);
	          
	          // break out, don't allow the below code to enable comma and period
	          return false;
			    
			});
		  
		  // loop through all of the button numbers that are allowed to activate the comma and period
		  $.each([81, 87, 69, 200, 201, 202, 203, 82, 84,89, 221, 376, 85, 217, 218, 219, 220, 73, 204, 205, 206,
		          207, 79, 210, 211, 212, 213, 214, 215, 216, 80, 65, 192, 193, 194, 195, 196, 197, 83, 352, 68, 70, 
		          71, 72, 74, 75, 76, 90, 381, 88, 67, 199, 86, 66, 78, 209, 77], function(index, value) {
			  
			  $('.ui-keyboard-' + value).click(function (e){
				  // if a button other than the comma or period is pressed, enable them both
				  $('[name="44"]').attr("disabled", false);
			      $('[name="46"]').attr("disabled", false);
			  });
		  
		  });
		  	  
	  },
	  beforeClose : function(e, keyboard, el, accepted) {},
	  accepted    : function(e, keyboard, el) {},
	  canceled    : function(e, keyboard, el) {},
	  hidden      : function(e, keyboard, el) {},

	  switchInput : null, // called instead of base.switchInput

	  // this callback is called just before the "beforeClose" to check the value
	  // if the value is valid, return true and the keyboard will continue as it should
	  // (close if not always open, etc)
	  // if the value is not value, return false and the clear the keyboard value
	  // ( like this "keyboard.$preview.val('');" ), if desired
	  // The validate function is called after each input, the "isClosing" value will be false;
	  // when the accept button is clicked, "isClosing" is true
	  validate    : function(keyboard, value, isClosing) {
		  return true;
	  },

	});
	});
};

