var currentTab = 0;

function initBatchActions(urls, selectedTab) {
	$("#tabs").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: urls,
        contentLoad: onContentLoad
    });

	var tabStrip = $("#tabs").data("kendoTabStrip");
	
	activateBatchTab(selectedTab);
		
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

function activateBatchTab(hash) {
	var tabStrip = $("#tabs").data("kendoTabStrip");
	if (typeof(console) != 'undefined') console.log('Got hash from url ' + hash);
	if (hash == 'tab_dt_batch_manager' 
			|| hash == 'tab_dt_job_manager' 
			|| hash == 'tab_j_test') {
		
		var tabToActivate = $("#"+hash);
		tabStrip.activateTab(tabToActivate);
	}
	else {
		var tabToActivate = $("#tab_dt_batch_manager");
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