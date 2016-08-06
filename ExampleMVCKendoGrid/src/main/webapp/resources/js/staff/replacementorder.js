
var currentDataItem;

function startReplacementFlow() { 
	getAjaxFormWithParams(
			'/StudentWebMVC/staff/manage/diplomarequest/replacementorder/process', 
			'#order-content', 
			'#order-content');
}

function initStateNavigation() {
	$('.state-nav').unbind( "click" );
	$('.state-nav:not(.disabled)').on('click', function(){
		processState($(this).attr('id'));
	});
}

function processState(eventId) {
	//if (typeof(console) != 'undefined')  console.log("going to " + eventId + " state");
	//if (typeof(console) != 'undefined')  console.log("form action: " + $('#diplomaForm').attr("action"));
	
	$('input[name="_eventId"]').val(eventId);
	submitAjaxForm('#orderForm', '#order-content');
	return false;
}

function getMajorDataSource(step, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/major",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'step': step }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/major",
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

function displayMajorListing(step, pageSize) {
    //if (typeof(console) != 'undefined') console.log("Searching for records from "+ startDate + " to " + endDate);

    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getMajorDataSource(step, pageSize, page);
    
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
        	checkIfEmpty(e);
       }
 
	});
}

function getSpecDataSource(step, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/spec",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'step': step }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/spec",
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
            $("#searchResults").html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}

function displaySpecListing(step, pageSize) {

    clearSearchResults();
    
    var page = 1;
    
    var dataSource = getSpecDataSource(step, pageSize, page);
    
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

function getReviewDataSource(isHonors, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/review",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: { 'isHonors': isHonors }
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/review",
                type: "POST"
            },
            parameterMap: function(options, operation) {
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

function displayReviewListing(isHonors, pageSize) {
 	clearSearchResults();
    
 	var page = 1;
    
    var dataSource = getReviewDataSource(isHonors, pageSize, page);
    
  	var grid = $("#searchResults").kendoGrid({
    	autoBind: true,
    	dataSource: dataSource,
        sortable: false,
        pageable: true,
        columns: [
            { field: "rowNumber", title: "#", width: 30},
            { field: "studentId", title: "UID", width: 60 },
            
            {  
              template: kendo.template($("#diplomaNameColumn").html()),
              title: "Name", 
              width: 120 },
            
            { template: kendo.template($("#replacementReasonColumn").html()),
              title: "Replacement Reason",
              width: 120
            },
            
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
            
//        rowTemplate: kendo.template($("#rowTemplate").html()),
//        altRowTemplate: kendo.template($("#altRowTemplate").html()),

        dataBound: function(e) {
        	checkIfEmpty(e);
        }
        
	});
  	
  	$("#searchResults").on("click", ".reviewDocuments", function(e) {
		showValidateNameChangeDetails(e);
  	});
  	
}

function initReviewNameChange() {
	$(".reviewDocuments").click(false);
	$(".reviewDocuments").click(function(e) {
		showValidateNameChangeDetails(e);
	});
}

function showValidateNameChangeDetails(e) {
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();

	var currentDataItem = getSelectedItem(e.currentTarget);
	wnd.content(detailsTemplate(currentDataItem));
	
	var initialFiles = [];
	
	for (var i = 0; i < currentDataItem.diplomaRequest.documents.length; i++) {
		initialFiles.push({
			name: currentDataItem.diplomaRequest.documents[i].fileName,
			extenstion: currentDataItem.diplomaRequest.documents[i].fileExtension,
			size: currentDataItem.diplomaRequest.documents[i].size
		});
	} 
	
	initStaffActivity();
	
	//init comment list
	getStaffComments();
	
	wnd.center().open();
}

function onSuccess(e) {
	// Array with information about the uploaded files
	var res = e.response;
	
	if (res != undefined && res.success) {
		currentDataItem.diplomaRequest.documents = res.result;

		$('#uploadedDocs').html(renderDocumentsTemplate(currentDataItem.diplomaRequest));
	}
}

function initReviewListing(pageSize) {
	$('.isHonors').on('click', function(){
		displayReviewListing($(this).val(), pageSize);
	});
}

function getGrid() {
		return $("#searchResults").data("kendoGrid");
}

function getSelectedItem(el) {
	return getGrid().dataItem($(el).closest("tr"));
}

function renderDocumentsTemplate(data) {
    return kendo.Template.compile($('#nameChangeDocs').html())(data);
}

function renderStaffCommentsTemplate(data) {
    return kendo.Template.compile($('#staffCommentsTemplate').html())(data);
}

function getStaffComments() {
	var request = ajaxCall('/StudentWebMVC/staff/manage/diplomarequest/replacementorder/comment/list',  $('#addCommentForm').serialize(), 'POST', false, '#addCommentError');
		
	request.success(function(data) {
		if (data.success)
			$('#staffCommentsContainer').html(renderStaffCommentsTemplate(data.result));
		});
}


function verifyNameChange(url, requestId) {
	var request = ajaxCall(
					url, 
					'requestId='+requestId, 
					'POST', 
					true, 
					'#addCommentError');
	
	request.success(function(data) {
		$("#actionContainer").on("click", false);
		wnd.close();
	});
}

function initStaffActivity() {
	// init upload file element
	$("#file").kendoUpload({
	    async: {
	    	saveUrl: "/StudentWebMVC/staff/manage/diplomarequest/replacementorder/doc/upload",
	        autoUpload: true
	    },
	    
	    multiple: true,
		showFileList: false,
		
		upload: function (e) {
			e.data = { requestId: $("#requestId").val() };
			//if (typeof(console) != 'undefined')  console.log("adding requetsId to POST " + $("#requestId").val());
		},
		
		success: onSuccess
	});
	
	// init comment field
	initTextareaCharLimit("#staffComment", "#staffCommentMsg", 254);
	
	// init action buttons
	$('[rel="clickover"]').clickover({html : true});
	
	//init add comment button
	var validator = $("#addCommentForm").kendoValidator().data("kendoValidator");
	
	$("#documentsDetails").on("click", "#addComment", function(e) {
		e.preventDefault();
		
		if (validator.validate()) {
			var request = ajaxCall($(e.currentTarget).attr('href'),  $('#addCommentForm').serialize(), 'POST', false, '#addCommentError');
		
			request.success(function(data) {
				if (data.success) {
					$('#staffCommentsContainer').html(renderStaffCommentsTemplate(data.result));
					$('#staffComment').val('');
				}	
			});
		}
  	});

	// init verify buttons
	$("#actionContainer").on("click", ".verifyName", function(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		
		var requestId = $('#addCommentForm input[name="requestId"]').val();
		verifyNameChange($(e.currentTarget).attr('href'), requestId);
		
	});
}
