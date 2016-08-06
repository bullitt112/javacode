function getStaffManagementDataSource() {
	
	$('#searchResults').kendoGrid({	
		dataSource: {
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/getall",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            update: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/update",
                type: "POST"
            },
            destroy: {
                url: "/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/delete",
                type: "POST"
            },
            parameterMap: function(options, operation) {
	            if (operation === "update") {
	            	
	            	var roleDescription = $(".k-input").text();
	            	var active = $('input[name=active]').prop('checked');
	            	var employee_id = $("label:contains('UID')").parent().next().text();
	            	var uclaLogonId = $("label:contains('UCLA Logon ID')").parent().next().text();   

                    return {active: active, employee_id: employee_id, roleDescription: roleDescription, uclaLogonId: uclaLogonId}
	            }
	            else if (operation === "destroy") {

                    return {employee_id: options.employee_id, uclaLogonId: options.logonId};
	            	
	            }
	            else {
	            	return options;
	            }
	        }
        },
        pageSize: 25,
        serverPaging: false,
        schema: {
			data: "staffMembers",
			total: "total",			
			model: {
                id: "logonId",
                fields: {
            		lastName: { editable: false },
            		firstName: { editable: false },
            		id: { editable: false },
            		logonId: { editable: false },
            		employee_id: { editable: false },
            		active: { editable: true, type: "boolean" },
            	}
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
        pageable: true,
        sortable: false,
        dataBound: onDataBound,
        rowTemplate: kendo.template($("#rowTemplate").html()),
            columns: [                     
					  { field: "lastName",  title: "Last Name", width: 110},
                      { field: "firstName", title: "First Name", width: 110},
                      { field: "employee_id", title: "UID", width: 60 },
                      { field: "logonId", title: "UCLA Logon ID", width: 75 },
                      { field: "roleDescription", title: "Role", width: 60, editor: rolesDropDownEditor  }, 
                      { command: [{ name: "edit", text: "Edit" }], title: "&nbsp;", width: 65 },
                      { command: [{ name: "destroy", text: "Delete" }], title: "&nbsp;", width: 65 }
                  ],
                  editable: {
                      mode: "popup",
                      window: {
                      	minWidth: 600
                      }
                  },
            error: function (e) {
                $(containerId).html(e.xhr.responseText);
            }	
    	});	
    
    function rolesDropDownEditor(container, options) {
        $('<input required data-text-field="roleDescription" data-value-field="roleDescription" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataSource: [{
                	roleDescription: "Admin",
                	roleId: "1"
            	}, {
            		roleDescription: "Staff",
            		roleId: "2"
            	}]
            });
    }
}

function onDataBound(e) {
	
	$( ".deleteStaffButton" ).click(function() {

		var employee_id;
		var logonId;
              	
    	$(this).parent().parent().siblings().each(function() {

    		 if ($( this ).is("#employee_id")) { 
    			 employee_id = $( this ).html();
    		 }
    		 if ($( this ).is("#logonId")) {
    			 logonId = $( this ).html();
    		 }
    		 
    		 console.log(employee_id + logonId );
       		             		  
    	});
    	
//         $.ajax({
//        	     	        	 
//            type: 'POST',
//            url: '/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/delete',
//            data: { 	         		
//                'uid': employee_id,
//                'uclaLogonId': logonId,
//            },
//            success: function(){
//            	 $(".addStaffSuccessMessage").html('<p class=\"message success\"><i class=\"icon-ok\"></i> Staff member added.</p>');
//            }
//        });    	        	         
//        //remove the row that was added to 'active staff'
//         var uid = $(this).parent().parent().attr('data-uid')
//         var dataRow = $('#staffMemberSearchResults').data("kendoGrid").dataSource.getByUid(uid);
//         $('#staffMemberSearchResults').data("kendoGrid").dataSource.remove(dataRow); 
    });

}

function initStaffManagementTabs() {
    var ts = $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: [
                    '/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/activestaff',
                    '/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/addstaff'
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

function displaySearchResult(criteria, pageSize, offset) {

    clearSearchResults();
    
    var page = 1;   
    
    if (offset >= 0)
		page = offset/pageSize + 1;
    
    var dataSource = getSearchDataSource(criteria, pageSize, page);
    
    var grid = $("#staffMemberSearchResults").kendoGrid({
    	autoBind: false,
    	dataSource: dataSource,
        sortable: false,
        pageable: true,
        columns: [
			{ field: "lastName",  title: "Last Name", width: 85},
			{ field: "firstName", title: "First Name", width: 85},
			{ field: "employee_id", title: "UID", width: 60 },
			{ field: "logonId", title: "UCLA Logon ID", width: 80 },
			{ title: "Role", width: 75, }, 
            { title: "&nbsp;", width: 65 }
        ],
        rowTemplate: kendo.template($("#rowTemplateAddStaff").html()),
        
        dataBound: function(e) {
        	
          	// disable the 'add' button if a role is not selected
        	$('.addStaffButton').attr('disabled', 'disabled');
        	$(".addStaffSelect").change(function () {
                                             
                role = $(this).val();

                if (!role) {  
                	$(this).parent().parent().find(".addStaffButton").attr('disabled', 'disabled');
                	
                } else {
                	$(this).parent().parent().find(".addStaffButton").removeAttr('disabled');              	
                }
              });
        	
        	$( ".addStaffButton" ).click(function() {   	   
   	         	  var uid = $(this).parent().parent().attr('data-uid');
   	              //remove the row that was added to 'active staff'
//   	          var dataRow = $('#staffMemberSearchResults').data("kendoGrid").dataSource.getByUid(uid);
//                $('#staffMemberSearchResults').data("kendoGrid").dataSource.remove(dataRow);       
            	
            	var lastName;
        		var firstName;
        		var employee_id;
        		var logonId;
        		var active = true;
        		var role;
                       	
            	$(this).parent().siblings().each(function() {

            		 if ($( this ).is("#lastName")) {             	
            			 lastName = $( this ).html();
            		 }
            		 if ($( this ).is("#firstName")) { 
            			 firstName = $( this ).html();
            		 }
            		 if ($( this ).is("#employee_id")) { 
            			 employee_id = $( this ).html();
            		 }
            		 if ($( this ).is("#logonId")) {
            			 logonId = $( this ).html();
            		 }
            		 
            		 if ($( this ).is("#active")) {
            			 active = $( this ).children().children().prop('checked');
            		 }

            		 if ($( this ).is("#role")) { 
            			 role = $( this ).children().val();
            		 }
            		             		  
            	});
            	
    	         $.ajax({
    	        	     	        	 
    	            type: 'POST',
    	            url: '/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/insertStaffMember',
    	            data: { 	
    	         		'lastName': lastName,	
    	                'firstName': firstName,
    	                'uid': employee_id,
    	                'uclaLogonId': logonId,
    	                'active': active,
    	         		'role': role
    	            },
    	            success: function(){    	            	
    	            	$('<p class=\"message success addStaffSuccessMessage\"><i class=\"icon-ok\"></i> The selected user has been added.</p>').insertAfter($("[data-uid=" + uid + "]"));
    	            	$("[data-uid=" + uid + "]").children().children().attr('disabled','disabled');
    	            }
    	        });    	         
    	         $( document ).ajaxError(function() {
    	        	 $('<p class=\"message error addStaffSuccessMessage\"><i class=\"icon-exclamation-sign\"></i> The selected user could not be added. Please try again.</p>').insertAfter($("[data-uid=" + uid + "]"));
    	        	});
            });
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
    dataSource.read();
}

function getSearchDataSource(criteria, pageSize, currentPage) {
	var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
            	url: "/StudentWebMVC/staff/manage/diplomarequest/staffmanagement/search",
                dataType: "json",
                data: { q: criteria }
            },
        },
        pageSize: pageSize,
        serverPaging: false,
        schema: {
			data: "staffMembers",
			total: "total"
		},
		parameterMap: function(options, operation) {
            if (operation === "update") {
            	
            	var criteria = $("#staffMemberSearchCriteria").text();
            	
                return {criteria: criteria};
            }
            else {
            	return options;
            }
        },
		page: currentPage,
        error: function (e) {
            //var message = e.xhr.responseJSON["odata.error"].message.value;
            //var innerMessage = e.xhr.responseJSON["odata.error"].innererror.message;
            //if (typeof(console) != 'undefined') console.log("    Error retriving search results");
            //clearSearchResults();
            $("#staffMemberSearchResults").html(e.xhr.responseText);
        }
	});
	
	return dataSource;
}