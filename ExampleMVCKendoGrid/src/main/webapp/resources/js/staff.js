var currentTab = 0;

function initStaffActions(urls, selectedTab) {
	$("#tabs").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: urls,
        contentLoad: onContentLoad
    });

	var tabStrip = $("#tabs").data("kendoTabStrip");
	
	activateStaffTab(selectedTab);
		
	// reload tab on each click
    tabStrip.tabGroup.on('click','li',function(e){  
   
    	if (typeof(console) != 'undefined') console.log("id = " + $(this).attr("id"));
    	var tab = $(this).attr("aria-controls");
    	var loadFlag = $("#"+tab).attr("aria-expanded");
    	if (loadFlag != null)
    		tabStrip.reload($(this));
    });

	initLinks();
}

function activateStaffTab(hash) {
	var tabStrip = $("#tabs").data("kendoTabStrip");
	if (typeof(console) != 'undefined') console.log('Got hash from url ' + hash);
	if (hash == 'tab_dt_user_data_viewer' 
			|| hash == 'tab_roles_and_permissions' 
			|| hash == 'tab_staff_admit_reset'  
			|| hash == 'tab_staff_admit_smgr') {
		
		var tabToActivate = $("#"+hash);
		tabStrip.activateTab(tabToActivate);
	}
	else {
		var tabToActivate = $("#tab_dt_user_data_viewer");
		tabStrip.activateTab(tabToActivate);
	}
}

function onSelect(e) {
    currentTab = $(e.item).index(); //newly selected  
}


function onError(e) {
    // access the selected item via e.item (Element)
	var tabStrip = $("#tabs").data("kendoTabStrip");
	
	//if (typeof(console) != 'undefined') console.log("selected: " + currentTab);

	$(tabStrip.contentElement(currentTab)).html(e.xhr.responseText);
	tabStrip.select(currentTab);
	
 };

function onContentLoad(e) {
	var personal_title = $(e.item).text();
	$('#interior-split-page-header-full').text(personal_title);
	document.title = personal_title;
}

function initLinks() {
	
}

function submitTabForm(formId, formPlacementId) {
	
	var request = ajaxCall($(formId).attr("action"), $(formId).serialize(), 'POST', false, formPlacementId);
	
	request.success( function(data, textStatus, jqXHR){
		  if (typeof(console) != 'undefined') console.log("Success: reloading tab");
		  // reload tab
		  //$( "#tabs" ).tabs( "load" , $( "#tabs" ).tabs( "option", "selected" ) );
		  var selectedTab = $("#tabs").data("kendoTabStrip").select();
		  if (typeof(console) != 'undefined') console.log("Success: reloading selected tab " + selectedTab);
		  $("#tabs").data("kendoTabStrip").reload(selectedTab);
	 });
	
	return false;
}

function getSelectedTab(tabID){
    return $(tabID).find($(tabID+" .ui-tabs-nav .ui-tabs-selected a").attr('href'));
}


function confirmDeleteDialog(id, url) {
	var boxId = "#"+id + "-dialog";
	if (typeof(console) != 'undefined') console.log("Dialog id: " + boxId);
	  $('#form-error-box').html("");
	  $('#form-error-box').hide();
	//$( boxId).dialog( "destroy" );

	var dlg = $( boxId )
	.dialog({
		modal: true,
		minHeight: 200,
		
		open: function( event, ui ) {
			if (typeof(console) != 'undefined') console.log("Init switch user dialog");


		},		
		
		buttons: {
			Confirm: function() {
				if (typeof(console) != 'undefined') console.log("Content id: " + id);
				var request = ajaxCall(url, null, 'POST', false, '#form-error-box');
				
				request.success( function(data, textStatus, jqXHR){
					  if (typeof(console) != 'undefined') console.log("Success: refreshing page");
					  $( boxId ).dialog( "close" );
					  $( boxId).dialog( "destroy" );

					  // reload tab
					  //$( "#tabs" ).tabs( "load" , $( "#tabs" ).tabs( "option", "selected" ) );
					  var selectedTab = $("#tabs").data("kendoTabStrip").select();
					  if (typeof(console) != 'undefined') console.log("Success: reloading selected tab " + selectedTab);
					  $("#tabs").data("kendoTabStrip").reload(selectedTab);
					  //$('#tabs-4').html(jqXHR.responseText);

				 });
				request.error( function(jqXHR, textStatus, errorThrown) {
					  $( boxId ).dialog( "close" );
					  $( boxId).dialog( "destroy" );

					  //alert("ErrorThrown <" + errorThrown + ">, textStatus <" + textStatus + ">, jqXHR.responseText = "+jqXHR.responseText);
					  if (typeof(console) != 'undefined') console.log("responseText: "+jqXHR.responseText);
					  //if (errorId != null) $(errorId).empty().html(jqXHR.responseText);
					  
					  $('#form-error-box').show();
				  });
				
			},
			Cancel: function() {
				// close dialog
				$( this ).dialog( "close" );
				$( boxId).dialog( "destroy" );

			}
		}

	});
	
	$(".ui-widget-header").css("background", "#f3f3f3 none repeat scroll 0 0")
						.css("border", "none")
						.css("color", "#454545");
	$(".ui-button").addClass("k-button k-button-icontext k-primary k-grid-update");
	$(".ui-button").removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
	return false;
}

function confirmDeleteDialogWithParams(id, url,params) {
	var boxId = "#"+id + "-dialog";
	if (typeof(console) != 'undefined') console.log("Dialog id: " + boxId);
	  $('#form-error-box').html("");
	  $('#form-error-box').hide();
	//$( boxId).dialog( "destroy" );

	var dlg = $( boxId )
	.dialog({
		modal: true,
		minHeight: 200,
		
		open: function( event, ui ) {
			if (typeof(console) != 'undefined') console.log("Init switch user dialog");


		},		
		
		buttons: {
			Confirm: function() {
				if (typeof(console) != 'undefined') console.log("Content id: " + id);
				var request = ajaxCall(url, params, 'POST', false, '#form-error-box');
				
				request.success( function(data, textStatus, jqXHR){
					  if (typeof(console) != 'undefined') console.log("Success: refreshing page");
					  $( boxId ).dialog( "close" );
					  $( boxId).dialog( "destroy" );

					  // reload tab
					  //$( "#tabs" ).tabs( "load" , $( "#tabs" ).tabs( "option", "selected" ) );
					  var selectedTab = $("#tabs").data("kendoTabStrip").select();
					  if (typeof(console) != 'undefined') console.log("Success: reloading selected tab " + selectedTab);
					  //$("#tabs").data("kendoTabStrip").reload(selectedTab);
					  //$('#tabs-4').html(jqXHR.responseText);
					  
						
					  // call ajax to get html result
					  $.ajax({
							 type: "POST",
							 url: "../staff/myuclaaccess",
							 data: { uid: $("#txtUid").val().trim(),grouper:$('input[name=mode]').val()}
						}).done(function(html) {
							
							// show searched data
							$("#grouperRoleData").html(html);
						});

				 });
				request.error( function(jqXHR, textStatus, errorThrown) {
					  $( boxId ).dialog( "close" );
					  $( boxId).dialog( "destroy" );

					  //alert("ErrorThrown <" + errorThrown + ">, textStatus <" + textStatus + ">, jqXHR.responseText = "+jqXHR.responseText);
					  if (typeof(console) != 'undefined') console.log("responseText: "+jqXHR.responseText);
					  //if (errorId != null) $(errorId).empty().html(jqXHR.responseText);
					  
					  $('#form-error-box').show();
				  });
				
			},
			Cancel: function() {
				// close dialog
				$( this ).dialog( "close" );
				$( boxId).dialog( "destroy" );

			}
		}

	});
	
	$(".ui-widget-header").css("background", "#f3f3f3 none repeat scroll 0 0")
						.css("border", "none")
						.css("color", "#454545");
	$(".ui-button").addClass("k-button k-button-icontext k-primary k-grid-update");
	$(".ui-button").removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
	return false;
}