function initMailDiplomaTabs() {
    var ts = $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: [
                    '/StudentWebMVC/staff/manage/diplomarequest/maildiplomas/queue',
                    '/StudentWebMVC/staff/manage/diplomarequest/maildiplomas/completed'
                ]
    }).data('kendoTabStrip');
    
	// reload tab on each click
    ts.tabGroup.on('click','li',function(e){        
    	//if (typeof(console) != 'undefined') console.log("id = " + $(this).attr("id"));
    	var tab = $(this).attr("aria-controls");
    	var loadFlag = $("#"+tab).attr("aria-expanded");

    	//if (typeof(console) != 'undefined') console.log("load flag " + loadFlag);
    	
    	if (loadFlag != null)
    		ts.reload($(this));
    });

}

function getMailingQDataSource(page, containerId) {

	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/maildiplomas/queue/list",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
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

function displayMailingQueue(containerId) {
    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getMailingQDataSource(page, containerId);
    
    var grid = $('#'+containerId).kendoGrid({
    	dataSource: dataSource,
        pageable: true,
        columns: [
                  { template: "<input type='checkbox' name='idList' class='checkbox selectRow'  value='#: id #'/>",  width: 30},
                  { field: "studentId", title: "Student ID", width: 95},
                  { field: "displayName", title: "Student Name", width: 260 },
                  { field: "term", title: "Degree Term", width: 95 },
                  { field: "releaseMethod", title: "Release Method", width: 195 },
                  { field: "mailingFee", title: "Mailing Fee", width: 90, format: "{0:c}" }
         ],
        
         detailTemplate: kendo.template($("#mailingQDetailTemplate").html()),
         dataBound: function(e) {
        	$('th.k-header:nth-child(2)').html("<input type='checkbox' class='checkbox toggleSelect' />");
        	checkIfEmpty(e, containerId);
       }
 
	});
    
    //bind click event to the checkbox
    grid.on("click", ".selectRow" , selectRow);
    grid.on("click", ".toggleSelect", toggleSelect);
}

function getLabelDataSource(selectedIds, containerId) {
	
	var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/maildiplomas/queue/labels",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                type: "POST", 
           },
           parameterMap: function(options, operation) {
	            if (operation == "read") {
	            	return kendo.stringify(selectedIds);
	            }
	            else {
	            	return options;
	            }
           }
       },
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'id'
            }
        },
                
        error: function (e) {
            $('#'+containerId).html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function displayLabelQueue(selectedIds, containerId) {
    clearSearchResults();
    
    var dataSource = getLabelDataSource(selectedIds, containerId);
    
    var grid = $('#'+containerId).kendoGrid({
    	dataSource: dataSource,
        pageable: false,
        columns: [
                  { field: "studentId", title: "Student ID", width: 95},
                  { field: "displayName", title: "Student Name", width: 280 },
                  { field: "releaseMethod", title: "Release Method", width: 195 },
                  { field: "mailingFee", title: "Mailing Fee", width: 95, format: "{0:c}" },
                  { field: "labelPrintDate", title: "Label Print Date", width: 120, template: "#= kendo.toString(kendo.parseDate(labelPrintDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }
         ],
        
         detailTemplate: kendo.template($("#mailingQDetailTemplate").html()),
         dataBound: function(e) {
        	checkIfEmpty(e, containerId);
       }
 
	});
    
    //bind click event to the checkbox
}

function getCompletedQDataSource(page, containerId) {

	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/maildiplomas/completed/list",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            }
        },
        pageSize: 25,
        serverPaging: true,
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'id'
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

function displayCompletedQueue(containerId) {
    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getCompletedQDataSource(page, containerId);
    
    var grid = $('#'+containerId).kendoGrid({
    	dataSource: dataSource,
        pageable: true,
        columns: [
                  { template: "<input type='checkbox' name='selectedId' class='checkbox selectRow'  value='#: id #'/>",  width: 30},
                  { field: "studentId", title: "Student ID", width: 95},
                  { field: "displayName", title: "Student Name", width: 200 },
                  { field: "term", title: "Degree Term", width: 100 },
                  { field: "releaseMethod", title: "Release Method", width: 195 },
                  { field: "mailingFee", title: "Mailing Fee", width: 95, format: "{0:c}" },
                  { field: "labelPrintDate", title: "Label Print Date", width: 120, template: "#= kendo.toString(kendo.parseDate(labelPrintDate, 'yyyy-MM-dd'), 'MM/dd/yyyy') #" }
         ],
        
         detailTemplate: kendo.template($("#completedQDetailTemplate").html()),
         dataBound: function(e) {
        	$('th.k-header:nth-child(2)').html("<input type='checkbox' class='checkbox toggleSelect' />");
        	checkIfEmpty(e, containerId);
       }
 
	});
    
    //bind click event to the checkbox
    grid.on("click", ".selectRow" , selectRow);
    grid.on("click", ".toggleSelect", toggleSelect);
}

function toggleSelect() {
    var checked = this.checked;
    $( ".selectRow" ).prop( "checked", checked );
    $( ".selectRow" ).each(function( index, el ) {
        var checked = el.checked,
        row = $(el).closest("tr");

        if (checked) {
            //-select the row
            row.addClass("k-state-selected");
            } else {
            //-remove selection
            row.removeClass("k-state-selected");
        }
    });
    toggleActions();
}

function toggleActions() {
    var n = $( "input.selectRow:checked" ).length;
    console.log("toggleActions: " + n);
 
    if (n > 0) {
    	$('.generatelabels').addClass('primary');
    	$('.generatelabels').removeClass('neutral');
    	$('.generatelabels').removeAttr('disabled');
    	
    }
    else {
    	$('.generatelabels').addClass('neutral');
    	$('.generatelabels').removeClass('primary');
     	$('.generatelabels').attr('disabled', 'disabled');
   }
}

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr");

    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
        } else {
        //-remove selection
        row.removeClass("k-state-selected");
    }
    toggleActions();
}

function checkIfEmpty(e, containerId) {
    if (e == undefined || e.sender == undefined || e.sender._data.length == 0) {       //if datasource is empty
    	$('#'+containerId).hide();
    	$('.'+containerId+'Empty').show();
    	$('.'+containerId+'Empty').removeClass('hidden');
    }
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
