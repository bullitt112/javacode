	function displaySearchResult(criteria, pageSize, offset) {
        //console.log("Searching for "+kendo.stringify(criteria));

        clearSearchResults();
        
        var page = 1;
        
        if (offset >= 0)
    		page = offset/pageSize + 1;
        
        var dataSource = getSearchDataSource(criteria, pageSize, page);
        
        var grid = $("#searchResults").kendoGrid({
        	autoBind: false,
        	dataSource: dataSource,
            sortable: false,
            pageable: true,
            columns: [
                { field: "rowNumber", title: "#", width: 50},
                { field: "studentId", title: "Student ID", width: 150 },
                { field: "fullName", title: "Student Name", width: 350 },
                { field: "birthDate", title: "Birth Date", width: 100 },
                { field: "holdFlag", title: "Holds", width: 75 }
            ],
            detailTemplate: '<div class="diploma-request-home diploma-request-home-#:studentId #"></div>',
            rowTemplate: kendo.template($("#rowTemplate").html()),
            detailInit: getStudentDRHome,
            
            dataBound: function(e) {
            	//init Hold popup
            	if (typeof($('.popover-diploma').clickover) == 'function') {
            		$('.popover-diploma').clickover({ html : true});
            	}
            }
		});
        
        if (offset >= 0) {
        	var page = offset/pageSize + 1;
    		var optionalData = { skip: offset, page: page };
            dataSource.read(optionalData);
        }
        else {
            dataSource.read();
        }
	}
	
	function getSearchDataSource(criteria, pageSize, currentPage) {
		var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                	url: "/StudentWebMVC/staff/manage/diplomarequest/search",
                    dataType: "json",
                    data: { q: criteria }
                },
            },
            pageSize: pageSize,
            serverPaging: true,
            schema: {
    			data: "students",
    			total: "total"
    		},
    		page: currentPage,
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
	
	function getStudentDRHome(event) {
		var detailRow = event.detailRow;
		
		//console.log("Selected "+kendo.stringify(event.data.studentId));
		
		detailRow.find(".diploma-request-home").html('');
		
		var request = ajaxCall("/StudentWebMVC/staff/manage/diplomarequest/home", 'uid='+event.data.studentId, 'GET', true, detailRow.find(".dr-home-contaiter"));
		request.success(function(data) {
			detailRow.find(".diploma-request-home").html(data);
			initDRHomeStartButton();
		});

	}
	
	function clearSearchResults() {
        var grid = $("#searchResults").data("kendoGrid");
        if (grid === undefined) {
        	
        }
        else {
        	grid.destroy();
        }
        $("#searchResults").html('');
	}
	
	function initDRHomeStartButton() {
		$('.start').on('click', function(){

			getAjaxForm($(this).attr('href'), "#diploma-request-content" , "#diploma-request-content" );
			return false;
		});
		
	}
	
	function initReleaseDateUpdate() {
		var dateAction = $('.enterReleaseDate');
		$('.enterReleaseDateWindow').hide();
		
		dateAction.click(function (e) {
			var requestId = $(this).attr('rel');
			var dateAction = $('.enterReleaseDate');
			
			var dateWindow = $('#enterReleaseDateWindow'+requestId);			
			if (!dateWindow.data("kendoWindow")) {

				dateWindow.kendoWindow({
		            width: "500px",
		            actions: ["Close"],
		            title: "",
		            visible: false,
		            open: function() {
		            	initDatePicker();
		            	
		            	//set todey date
		            	var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');
		            	
		            	$('input.full-date-picker').each(function( index ) {
		            		var datePicker = $(this).data("kendoDatePicker");
		            		datePicker.value(todayDate);
		            	});
		            	
		            	$('.submitReleaseDate').click(function(e) {
		            		e.preventDefault();
		            		e.stopPropagation();
		            		e.stopImmediatePropagation();
		            		
		            		var win = $(this).closest(".k-window-content").data("kendoWindow");
		            		var requestId = $(win.wrapper.context).attr('data-requestid');
		            		
		            		submitReleaseForm($(this).closest('.releaseDateForm'), '#releaseDateMessage' + requestId, requestId);
		            	});
		            },
		            close: function() {
		            	dateAction.show();
		            	
		            }
		        }).data("kendoWindow");
		    }

			var win = dateWindow.data("kendoWindow");
			
			win.center();
			win.open();
			
			$(this).hide();
	    });
	}
	
function cleanKendoWindows(el) {
	$(el).each(function () {
		var win = $(this).closest(".k-window-content").data("kendoWindow");
		if (win != undefined) {
			//console.log("Destroing window "+$(this).attr('id'));
			win.destroy();
		}
	});
}
	
function initTrackingNumberUpdate(winTitle) {
	
	var trackAction = $('.enterTrackingNumber'),

	trackWindow = $('.enterTrackingNumberWindow');

//	if (typeof (console) != 'undefined')
//			console.log("initTrackingNumberUpdate " + trackWindow.closest(".k-window-content")
//					+ ", condition: " + (trackWindow.closest(".k-window-content").data("kendoWindow") == undefined));


	if (trackWindow.closest(".k-window-content").data("kendoWindow") == undefined) {

		trackWindow.kendoWindow({
            width: "420px",
            actions: ["Close"],
            title: ""+winTitle,
            visible: false,
            open: function() {
       
            },
            close: function() {
            	var win = $(this).closest(".k-window-content").data("kendoWindow");
      
            	trackAction.show();
            }
        });
    }
	
	$('.submitTrackingNumber').click(function(e) {
		var win = $(this).closest(".k-window-content").data("kendoWindow");
		var requestId = $(win.wrapper.context).attr('data-requestid');
  
        submitTrackingForm($(this).closest('.trackingNumberForm'), '#trackingNumberMessage' + requestId, requestId);
    	
    	//win.close();
	});
	
	trackAction.click(function (e) {
		var requestId = $(this).attr('rel');
	
		var win = $('#enterTrackingNumberWindow'+requestId).data("kendoWindow");
		win.center();
		win.open();
		$(this).hide();
    });

}
	
	function submitReleaseForm(formId, resultId, requestId) {

		var studentId = $('#uid_' + requestId).val();

		var request = ajaxCall($(formId).attr("action"), $(formId)
				.serialize(), 'POST', false, resultId);

		request.success(function(data, textStatus, jqXHR) {
//			if (typeof (console) != 'undefined')
//				console.log("Success: reloading " + formId + " form and populating " + resultId);

			if (data.indexOf('<html') != -1
					&& data.indexOf('<body') != -1) {
				$('html').empty().html(data);

				$("body").addClass("ajax-none ajax-spinner");
				$(document.body).trigger('load');
			
			} else {
				
				$('.diploma-request-home-' + studentId).empty().html(data);
//				var win = $('#enterReleaseDateWindow' + requestId).data("kendoWindow");
//				if (win != undefined) win.close();
		
			}

		});

		return false;
	}
	
	function submitTrackingForm(formId, resultId, requestId) {
	
	
		var studentId = $('#uid_' + requestId).val();
		var trackingNumber = $('#trackingNumber' + requestId).val();

		if(trackingNumber.trim().length==0) {
			alert('Please input tracking number');
			return;
		}
	
		var request = ajaxCall($(formId).attr("action"), $(formId)
				.serialize(), 'POST', false, resultId);

		request.success(function(data, textStatus, jqXHR) {
//			if (typeof (console) != 'undefined')
//				console.log("Success: reloading " + formId + " form and populating " + resultId);
	
			if (data.indexOf('<html') != -1
					&& data.indexOf('<body') != -1) {
				$('html').empty().html(data);

				$("body").addClass("ajax-none ajax-spinner");
				$(document.body).trigger('load');
			} else {
	
				$('.diploma-request-home-' + studentId).empty().html(data);
//				var win = $('#enterTrackingNumberWindow' + requestId).data("kendoWindow");
//				if (win != undefined) win.close();
			}

		});

		return false;
	}
	