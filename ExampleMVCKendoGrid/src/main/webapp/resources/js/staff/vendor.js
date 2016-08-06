function initTermSelection() {
    $('#termName label').html(getSelectedTerm());
}

function getSelectedTerm() {
	var term = '';
    var label=$('.select_filter_term :selected').parent().attr('label');
    if (typeof(label) != 'undefined') {
    	//if (typeof(console) != 'undefined')  console.log(label+' ' + $('.select_filter_term :selected').text());
    	term = $('.select_filter_term :selected').text() + ' ' + label;
    }
    return term;
}

function startVendorFlow(formElement) {
	//submitAjaxForm($(formElement).attr('id'), '#diploma-request-content');
	getAjaxFormWithParams('/StudentWebMVC/staff/manage/diplomarequest/termorder/process', {'term': $('.select_filter_term :selected').val()}, '#diploma-request-content', '#diploma-request-content');
}

function initVendorStateNavigation() {
	$('.state-nav').unbind( "click" );
	$('.state-nav:not(.disabled)').on('click', function(){
		processVendorState($(this).attr('id'));
	});
}

function processVendorState(eventId) {
	//if (typeof(console) != 'undefined')  console.log("going to " + eventId + " state");
	//if (typeof(console) != 'undefined')  console.log("form action: " + $('#diplomaForm').attr("action"));
	
	$('input[name="_eventId"]').val(eventId);
	submitAjaxForm('#termOrderForm', '#diploma-request-content');
	return false;
}

function getMajorDataSource(term, step, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/major",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'term': term, 'step': step }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/major",
                type: "POST",
                data: { 'step': step }
            }
        },
        pageSize: pageSize,
        serverPaging: true,
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'rowNumber',
                fields: {
                	rowNumber: { type: "number", editable: false, nullable: false },
                	studentId: { editable: false, nullable: false },
                	diplomaName: { editable: false, nullable: false },
                	degreeName: { editable: false, nullable: false },
                	majorLine1: { editable: true },
                	majorLine2: { editable: true },
                	majorLine3: { editable: true }
                }
            }
        },
        
        change: function(e) {
            if (e.action == 'sync') {
            	//hack - no idea why kendo grid not doing it by itself
            	//find pristine data and replace it, otherwise cancel button will reset data to the very first value
                e.sender._pristineData = e.items;
            }
        },

        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
            processRecords(type, response);
        },

        error: function (e) {
            //var message = e.xhr.responseJSON["odata.error"].message.value;
            //var innerMessage = e.xhr.responseJSON["odata.error"].innererror.message;
            //if (typeof(console) != 'undefined') console.log("    Error retriving search results");
            //clearSearchResults();
            $("#searchResults").html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function displayMajorListing(term, step, pageSize) {
    //console.log("Searching for "+kendo.stringify(offset));

    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getMajorDataSource(term, step, pageSize, page);
    
    var grid = $("#searchResults").kendoGrid({
    	dataSource: dataSource,
        pageable: true,
        columns: [
            { field: "rowNumber", title: "#",  width: 30},
            { field: "studentId", title: "UID",  width: 60 },
            { field: "diplomaName", title: "Name", width: 120 },
            { field: "degreeName", title: "Degree", width: 110 },
            { field: "majorLine1", title: "Major", width: 150 },
            { command: [{ name: "edit", text: "Edit" }], title: "&nbsp;", width: 50 }
        ],
        editable: {
            mode: "popup",
            template: kendo.template($("#popup-editor").html()),
            window: {
            	minWidth: 600
            }
        },
        
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),

        dataBound: function(e) {
        	//console.log('dataBound: ');
        	//console.log(e);
        	checkIfEmpty(e);
            //console.log("\n\ndataBound: Datasource has changes: " + e.sender.dataSource.hasChanges());
       }
 
	});
}

function getSpecDataSource(term, step, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/spec",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'term': term, 'step': step }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/spec",
                type: "POST"
            }
        },
        pageSize: pageSize,
        serverPaging: true,
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'rowNumber',
                fields: {
                	rowNumber: { type: "number", editable: false, nullable: false },
                	studentId: { editable: false, nullable: false },
                	diplomaName: { editable: false, nullable: false },
                	degreeName: { editable: false, nullable: false },
                	specializationLine1: { editable: true },
                	specializationLine2: { editable: true },
                	specializationLine3: { editable: true }
                }
            }
		},
        change: function(e) {
            if (e.action == 'sync') {
            	//hack - no idea why kendo grid not doing it by itself
            	//find pristine data and replace it, otherwise cancel button will reset data to the very first value
                e.sender._pristineData = e.items;
            }
        },

        requestEnd: function(e) {
            var response = e.response;
            var type = e.type;
            processRecords(type, response);
        },

        error: function (e) {
            //var message = e.xhr.responseJSON["odata.error"].message.value;
            //var innerMessage = e.xhr.responseJSON["odata.error"].innererror.message;
            //if (typeof(console) != 'undefined') console.log("    Error retriving search results");
            //clearSearchResults();
            $("#searchResults").html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function displaySpecListing(term, step, pageSize) {

    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getSpecDataSource(term, step, pageSize, page);
    
    var grid = $("#searchResults").kendoGrid({
    	autoBind: true,
    	dataSource: dataSource,
        sortable: false,
        pageable: true,
        columns: [
            { field: "rowNumber", title: "#", width: 30},
            { field: "studentId", title: "UID", width: 60 },
            { field: "diplomaName", title: "Name", width: 120 },
            { field: "degreeName", title: "Degree", width: 110 },
            { field: "specializationLine1", title: "Specialization", width: 150 },
            { command: [{ name: "edit", text: "Edit" }], title: "&nbsp;", width: 50 }
        ],
            
        editable: {
            mode: "popup",
            template: kendo.template($("#popup-editor").html()),
            window: {
            	minWidth: 600
            }
      },
            
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),

        dataBound: function(e) {
        	checkIfEmpty(e);
        }        
	});
}

function getReviewDataSource(term, isHonors, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/review",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'term': term, 'isHonors': isHonors }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/termorder/review",
                type: "POST"
            },
            parameterMap: function(options, operation) {
            	//console.log('parameterMap: ' + operation);
            	//console.log(options);
                if (operation !== "read" && options) {
                    return {recordObj: kendo.stringify(options)};
                }
                else {
                	return options;
                }
            }
        },
        pageSize: pageSize,
        serverPaging: true,
        schema: {
			data: "records",
			total: "total",
            model: {
            	id: 'rowNumber',
                fields: {
                	rowNumber: { type: "number", editable: false, nullable: false },
                	studentId: { editable: false, nullable: false },
                	diplomaName: { editable: false, nullable: false },
                	diplomaRequest: {editable: true}
                }
            }
		},
        change: function(e) {
            if (e.action == 'sync') {
                //console.log('change');
            	//console.log(e);
            	//hack - no idea why kendo grid not doing it by itself
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
	            	if (data[i].rowNumber == response.rowNumber) {
	            		data[i].diplomaName = response.diplomaName;
	            		data[i].diplomaRequest = response.diplomaRequest;

	            		pristineData[i].diplomaName = response.diplomaName;
	            		pristineData[i].diplomaRequest = response.diplomaRequest;
	            		
	            		break;
	            	}
	            }
	        	
	            //console.log('requestEnd');
	        	//console.log(e);
            }
        	
            //processRecords(type, response);
        },

        error: function (e) {
            //var message = e.xhr.responseJSON["odata.error"].message.value;
            //var innerMessage = e.xhr.responseJSON["odata.error"].innererror.message;
            //if (typeof(console) != 'undefined') console.log("    Error retriving search results");
            //clearSearchResults();
            $("#searchResults").html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function displayReviewListing(term, isHonors, pageSize) {
    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getReviewDataSource(term, isHonors, pageSize, page);
    
    var grid = $("#searchResults").kendoGrid({
    	autoBind: true,
    	dataSource: dataSource,
        sortable: false,
        pageable: true,
        columns: [
            { field: "rowNumber", title: "#", width: 30},
            { field: "studentId", title: "UID", width: 60 },
            { field: "diplomaName", title: "Name", width: 120 },
            { command: [{ name: "edit", text: "Edit" }], title: "&nbsp;", width: 50 },
            { field: "diplomaRequest.releaseMethod", title: "Release Method", width: 80 },
            { field: "diplomaRequest.mailingFee", title: "Mailing Fee", width: 60, format:"{0:c2}" },
            { field: "diplomaRequest.mailingAddress", title: "Mailing Address", width: 80}
        ],
            
        editable: {
            mode: "popup",
            template: kendo.template($("#popup-editor").html()),
            window: {
            	minWidth: 900
            }
        },
            
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#altRowTemplate").html()),

        dataBound: function(e) {
        	checkIfEmpty(e);
        }        
	});
}

function initReviewListing(term, pageSize) {
	//console.log('initReviewListing');
	$('.isHonors').on('click', function(){
		displayReviewListing(term, $(this).val(), pageSize);
	});
}

