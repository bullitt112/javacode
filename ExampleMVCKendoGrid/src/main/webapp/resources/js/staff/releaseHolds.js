function displayReleaseHolds(containerId) {
	$('#searchResults').kendoGrid({	
		dataSource: {
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/releaseholds/getall",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },	       
        },
        pageSize: 50,
        serverPaging: true,
        schema: {
			data: "releaseHoldsItems",
			total: "total",			
			model: {
                id: "id",
                fields: {
                	selected: {
                		nullable: true,
                	},
                	studentId: {
                        editable: false,
                        nullable: true
                    },
                    studentName: {                       
                    },
                    "['releaseMethod.name']": {                                             
                    },
                    holds: {                        
                    }
                }
			}
           }
        },
        pageable: true,
        sortable: false,
        dataBound: onDataBound,
        rowTemplate: kendo.template($("#rowTemplate").html()),
            columns: [                     
					  { field: "selected",  title: "<input id='checkAll', type='checkbox', class='check-box checkallbox' />", width: 25},
                      { field: "studentId", title: "Student ID", width: 95},
                      { field: "studentName", title: "Student Name", width: 250 },
                      { field: "releaseMethod.name", title: "Release Method", width: 195 },
                      { field: "holds", title: "Holds", width: 95  },                      
                  ],
            error: function (e) {
                $(containerId).html(e.xhr.responseText);
            }	
    	});
}

function onDataBound(e) {
	 
	//init Hold popup
	if (typeof($('.popover-diploma').clickover) == 'function') {
		$('.popover-diploma').clickover({ html : true});
	}
	
    // only enable "release diploma hold button if a checkbox is checked 	
	 $("#showSelection").attr("disabled", true);

	selectedRowsIds = [];
	
	$(".checkbox").bind("click", function() { 

	row = $(this).closest("tr");
	grid = $("#searchResults").data("kendoGrid");
	dataItem = grid.dataItem(row);
	
	var id = dataItem.id
	
	if (selectedRowsIds.indexOf(id) > -1) {
		selectedRowsIds.splice(selectedRowsIds.indexOf(id), 1);
		$(this).removeClass("checked");
	} else {
	
	selectedRowsIds.push(id);
	$(this).addClass("checked");
	
	}	
	console.log("Selected Rows IDs - " + selectedRowsIds);
	
	if ($(".checkbox:checked").length > 0) {
		 $("#showSelection").attr("disabled", false);
	 } else {
		 $("#showSelection").attr("disabled", true);
	 }

	});

	// when the top 'checkall' checkbox is clicked, add or remove the checkallIsChecked class and add or remove the checked boxes
$("#checkAll").bind("click", function() {
		
		if($(this).hasClass("checkAllIsChecked")) {
			$(this).removeClass("checkAllIsChecked");

			$(".checkbox").each(function() {
				
				if ($(this).hasClass("checked")){$(this).trigger('click');}
				
				$(this).prop('checked', false);
				//disable the Release Diploma Hold Button
				$("#showSelection").attr("disabled", true);
			});
			
		} else {
			$(".checkbox").each(function() {
				if($(this).hasClass("checked")) {
					console.log("Already Checked");
					$(this).prop('checked', true);
				} else {
					
					$(this).trigger('click');
					$(this).prop('checked', true);
				} 
			});
			$(this).addClass("checkAllIsChecked");
			//Enable the Release Hold Button
			$('#showSelection').prop('disabled', false);
		};
	});

// change the button color from primary to neutral depending on whether the button is disabled or not
$('input[type=checkbox]').bind("click", function() {
	
	
	var isDisabled = $(".releaseHoldsButton").is(':disabled');
    if (isDisabled) {
    	$(".releaseHoldsButton:disabled").removeClass("primary").addClass("neutral");
    } else {
    	$(".releaseHoldsButton").removeClass("neutral").addClass("primary");
    };			
});
	
	$("#showSelection").bind("click", function () {
 
//		console.log("Selected Rows IDs - " + selectedRowsIds);
		  
			$.ajax({
				 type: "POST",
				 traditional: true,
				 url: "../diplomarequest/releaseholds/releaseDiplomaHoldExecute",
				 data: {
					 ids: selectedRowsIds,
				 },
				 async: false,
				 success : function(data) {
					 grid.dataSource.read();
				 }   
			});
			
			// display the success message after the reload of the grid data is completely finished using 'ajaxComplete()'
			$( document ).ajaxComplete(function( event,request, settings ) {
				  $(".releaseHoldsSuccessMessage").html('<p class=\"message success\"><i class=\"icon-ok\"></i> Hold on Diploma has been released for the selected student(s).</p>');
				});			
			
			$("#checkAll").prop('checked', false);

		});	
}