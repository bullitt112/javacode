function generateExcel(batchId, honorsFlag) {
//	if (typeof(console) != 'undefined') console.log("Generate Excel for batch "+batchId+", honorsFlag " + honorsFlag);
	
	var batchInfo = ".batchInfo"+batchId+honorsFlag;
	var request = ajaxCall("/StudentWebMVC/staff/manage/diplomarequest/batch/excel", 'batchId='+batchId+'&honors='+honorsFlag, 'GET', true, batchInfo);
	request.success(function(data) {
		$(batchInfo).html(data);
	});

	return false;
}

function getBatchesDataSource(currentPage, containerId) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/updatebatch/getall",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
	        update: {
	            url: "/StudentWebMVC/staff/manage/diplomarequest/updatebatch",
	            type: "POST"
	        },
	        destroy: {
	            url: "/StudentWebMVC/staff/manage/diplomarequest/updatebatch/delete",
	            type: "POST"
	        },
	        parameterMap: function(options, operation) {
	            if (operation !== "read" && options) {
	            	// hack - removing 'id' property from 'type' property added by unknown source and unknown reason
	            	//delete options.type.id;

	            	//SMJ: 
	            	return {id: options.id};
	            	//alert("options.id = " + options.id);
	            }
	            else {
	            	//alert("options = " + options);
	            	return options;
	            }
	        }
        },
        pageSize: 250,
        serverPaging: true,
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'id'
            }
        },
        
        change: function(e) {
            if (e.action == 'sync') {
                //console.log('change');
            	//console.log(e);
            	//hack - no idea why kendo grid not doing it 
            	//find pristine data and replace it, otherwise cancel button will reset data to the very first value
                e.sender._pristineData = e.items;
            }
        },

        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
            
            if (type == 'update') {
	            var data = e.sender._data;
	            var pristineData = e.sender._data;
	            
	            for (var i = 0; i < data.length; i++) {
	            	if (data[i].id == response.id) {
	            		data[i].batch = response.batch;
	            		data[i].nextStatusConfirm = response.nextStatusConfirm;
	            		data[i].isEditable = response.isEditable;
	            		data[i].isDetailVisible = response.isDetailVisible;
	            		data[i].nextStatusDescr = response.nextStatusDescr;

	            		pristineData[i].batch = response.batch;
	            		pristineData[i].nextStatusConfirm = response.nextStatusConfirm;
	            		pristineData[i].isEditable = response.isEditable;
	            		pristineData[i].isDetailVisible = response.isDetailVisible;
	            		pristineData[i].nextStatusDescr = response.nextStatusDescr;
	            		
	            		break;
	            	}
	            }
	        	
	            //console.log('requestEnd');
	        	//console.log(e);
            }
        },
        
        error: function (e) {
            //var message = e.xhr.responseJSON["odata.error"].message.value;
            //var innerMessage = e.xhr.responseJSON["odata.error"].innererror.message;
            //if (typeof(console) != 'undefined') console.log("    Error retriving search results");
            //clearSearchResults();
            $('#'+containerId).html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function clearSearchResults(containerId) {
    var grid = $('#'+containerId).data("kendoGrid");
    if (grid === undefined) {
    	
    }
    else {
    	grid.destroy();
    }
    $('#'+containerId).html('');
}

function deleteEventListener(e, el, window) {
    var windowTemplate = kendo.template($("#deleteConfrimationTemplate").html());
     
	//add a click event listener on the delete button
	var tr = $(e.target).closest("tr"); //get the row for deletion
	var data = el.dataItem(tr); //get the row data so it can be referred later
	
//	if (typeof(console) != 'undefined') console.log("    Ready to delete batch");
//	if (typeof(console) != 'undefined') console.log(data);
	
	window.content(windowTemplate(data)); //send the row data object to the template and render it
	window.open().center();  

	$("#yesButton").click(function(){
		var grid = $("#searchResults").data("kendoGrid");
	
//		if (typeof(console) != 'undefined') console.log("    Deleting batch...");
//		if (typeof(console) != 'undefined') console.log(grid);
		
		grid.dataSource.remove(data)  //prepare a "destroy" request 
		grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
		window.close();
	});
	$("#noButton").click(function(){
		window.close();
	});                             
}	


function displayBatches(containerId) {
    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getBatchesDataSource(page, containerId);
    
    var window = $("#confirmationWindow").kendoWindow({
        title: "Please confirm",
        visible: false, //the window will not appear before its .open method is called
        width: "300px",
        height: "150px",
    }).data("kendoWindow");

    var grid = $('#'+containerId).kendoGrid({
    	dataSource: dataSource,
        pageable: true,
        columns: [
                  { title: "Batch ID", width: 100},
                  { title: "Batch Type", width: 150},
                  { title: "Created By", width: 130 },
                  { title: "Batch Status" },
                  { command: [{ name: "edit", text: "Edit" }, 
                              { name: "drop", text: "Delete", click: function(e){console.log("Batch delete start...."); deleteEventListener(e, this, window);}}], 
                              title: "&nbsp;", width: 160 }
                  ],
        editable: {
        	confirmation: "Are you sure that you want to delete this row?",
            mode: "popup",
            update: true,
            template: kendo.template($("#popup-editor").html()),
            window: {
            	minWidth: 600
            }
        },
            
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),

        detailTemplate: kendo.template($("#updateBatchDetailTemplate").html()),
        detailInit: detailInit,
        
        dataBound: function(e) {
        	checkIfEmpty(e);
        	$('[rel="clickover"]').clickover({html : true});
       }
 
	});
    
    initNotificationButton();
    
}

function checkIfEmpty(e) {
    //console.log('checkIfEmpty:' + e.sender._data.length);
    if (e == undefined || e.sender == undefined || e.sender._data.length == 0) {       //if datasource is empty
    	$('#searchResults').hide();
    	$('.searchResultsEmpty').show();
    }
    else {
    	$('#searchResults').show();
    	$('.searchResultsEmpty').hide();
    }
}

function detailInit(e) {
	var detailRow = e.detailRow;
	
	//console.log(detailRow);
}

function initNotificationWindow() {
    var window = $("#notificationWindow").kendoWindow({
        title: "Email Notifications",
        visible: false, //the window will not appear before its .open method is called
        width: "300px",
        height: "130px",
    }).data("kendoWindow");	
}

function initNotificationButton() {
	$("#searchResults").on("click", ".btnNotification",  false);
  	
	$("#searchResults").on("click", ".btnNotification", function(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		var win = $("#notificationWindow").data("kendoWindow");
		
		var currentDataItem = getSelectedItem(e.currentTarget);
		
		win.content(renderNotificationTemplate(currentDataItem));
		
		initNotificationConfirmButtons();
		
		win.center();
		win.open();
  	});
}

function initNotificationConfirmButtons() {
	$("#notificationWindow").on("click", "#notificationCancelButton", false);
	$("#notificationWindow").on("click", "#notificationCancelButton", function(e){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		
		var win = $("#notificationWindow").data("kendoWindow");
		win.close();
	});

	$("#notificationWindow").on("click", "#notificationConfirmButton", false);
	$("#notificationWindow").on("click", "#notificationConfirmButton", function(e){
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		var url =$(e.currentTarget).attr('href');
		var win = $("#notificationWindow").data("kendoWindow");
		var request = ajaxCall(
					url, 
					null, 
					'POST', 
					true, 
					'#notificationMessage');
	
		request.success(function(data) {
			$("#notificationMessage").html(data.message);
			win.close();
		});

	});
}

function renderRowTemplate(data) {
    return kendo.Template.compile($('#rowTemplatePart').html())(data);
}


function renderNotificationTemplate(data) {
    return kendo.Template.compile($('#notificationConfirmationTemplate').html())(data);
}

function getGrid() {
	return $("#searchResults").data("kendoGrid");
}

function getSelectedItem(el) {
	return getGrid().dataItem($(el).closest("tr"));
}
