function initNoticeSubmitButton() {
	if (typeof (console) != 'undefined') console.log('initing NoticeSubmit button');

	$("#noticeSubmit").click(function(e) {
		var type = $(this).attr("rel");
		
		if (typeof (console) != 'undefined') console.log('submitting '+type +' form, action ' + $('#'+type+'Form').attr("action"));
		var request = ajaxCall(
				$('#'+type+'Form').attr("action"),
				$('#'+type+'Form').serialize(), 'POST', false,
				'#'+type+'Content');
		
		request.success(function(data, textStatus, jqXHR) {
			if (typeof (console) != 'undefined') console.log("Success: reloading '+type +' tab");
			$('#'+type+'Content').empty().html(data);
		}); 
		
		e.preventDefault();
	});	
}

function initAlertSubmitButton() {
	if (typeof (console) != 'undefined') console.log('initing AlertSubmit button');

	$("#alertSubmit").click(function(e) {
		var type = $(this).attr("rel");
		if (typeof (console) != 'undefined') console.log('submitting '+type +' form, action ' + $('#'+type+'Form').attr("action"));
		var request = ajaxCall(
				$('#'+type+'Form').attr("action"),
				$('#'+type+'Form').serialize(), 'POST', false,
				'#'+type+'Content');
		
		request.success(function(data, textStatus, jqXHR) {
			if (typeof (console) != 'undefined') console.log("Success: reloading '+type +' tab");
			$('#'+type+'Content').empty().html(data);
		}); 
		
		e.preventDefault();
	});	
}

function initCancelButton() {
	$(".cancel").click(function(e) {
		var tabStrip = $("#tabs").data("kendoTabStrip");
		var tabId = $(this).attr("rel");
		tabStrip.reload($('#' + tabId));
		
		e.preventDefault();
		
	});
}

function initRecipientsForNewNotice(noticeData) {
	dataSource = new kendo.data.DataSource({
        data: noticeData
    });
	
//     $("#pager").kendoPager({
//         dataSource: dataSource
//     });

    $("#recipientList").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });
	
	dataSource.read();
	
	$("#addRecipient").click(function(e) {
 		var validator = $("#noticeForm").data("kendoValidator");
		
         if (validator.validate()) {
     		dataSource.add({ id: null, uclaLogonId: $('#recipientName').val() });
    		
    		var listView = $("#recipientList").data("kendoListView");
            listView.refresh();
            $('#recipientName').val('');
            
            initRemoveRecipient();
 		 }
        
		e.preventDefault();
    });

	
    initRemoveRecipient();
}

function initRemoveRecipient() {
	$(".removeRecipient").click(function(e) {
		var uid = $(this).attr('rel')
		console.log('UID ' + uid);

		var recipient = dataSource.getByUid(uid);
		
		if (typeof (console) != 'undefined') console.log('Recipient ' + recipient);
		
		dataSource.remove(recipient);
		var listView = $("#recipientList").data("kendoListView");
        listView.refresh();
		
        initRemoveRecipient();
        
		e.preventDefault();
		
	});
	
}

function initNoticeRecipients(readUrl, addUrl, removeUrl, noticeId) {

	var dataSource = new kendo.data.DataSource({
			transport : {
				read : {
					url : readUrl,
					dataType : "json"
				},
				destroy : {
					url : removeUrl,
					type: "POST",
					dataType : "json"
				},
				parameterMap : function(options, operation) {
					if (operation == "destroy" && options) {
						if (typeof(console) != 'undefined') console.log("options: " + kendo.stringify(options));
						return {id : options.id };
					}
					else if (operation == "read") {
						return {id: noticeId, total: options.take, skip: options.skip };
					}
					else if (operation == "create") {
						return {id: noticeId, uclaLogonId: options.uclaLogonId};
					}
				}
			},
			pageSize: 200,
			serverPaging: true,
			schema : {
				total: "total", // total is returned in the "total" field of the response
    			data: "recipients",

				model : {
						id : "id",
						fields : {
							id : {
								editable : false,
								nullable : true
							},
							uclaLogonId : "uclaLogonId"
						}
				}
			}
		});

	    $("#pager").kendoPager({
	        dataSource: dataSource
	    });

		var listView = $("#recipientList").kendoListView({
			dataSource : dataSource,
			template : kendo.template($("#template").html())
		})
		.data("kendoListView");

//		dataSource.read();

		$("#addRecipient").click(function(e) {

			var request = ajaxCall(
					$('#noticeForm').attr("action"),
					$('#noticeForm').serialize(), 'POST', false,
					"#noticeMsg");
			
			request.error(function(data, textStatus, jqXHR) {
				if (typeof (console) != 'undefined') console.log("Error: showing the message " + kendo.stringify(data));
				$("#noticeMsg").empty().html(data.responseText);
				$("#noticeMsg").removeClass("message success");
				$("#noticeMsg").addClass("message error");
			}); 
			
			request.success(function(data, textStatus, jqXHR) {
				if (typeof (console) != 'undefined') console.log("Success: showing the message");
				$("#noticeMsg").empty().html(data);
				$("#noticeMsg").removeClass("message error");
				$("#noticeMsg").addClass("message success");
				$("[name='recipients']").val("");
				
			}); 
			
			request.done(function( data ) {

// 				var listView = $("#recipientList").data("kendoListView");
// 				if (typeof (console) != 'undefined') console.log("refreshing list " + kendo.stringify(listView));
// 				listView.refresh();
				dataSource.read();
			});
			e.preventDefault();
		});

// 		initRemoveRecipient();
}


function initFeatureAlertRecipients(readUrl, addUrl, removeUrl, noticeId) {

	var dataSource = new kendo.data.DataSource({
			transport : {
				read : {
					url : readUrl,
					dataType : "json"
				},
				destroy : {
					url : removeUrl,
					type: "POST",
					dataType : "json"
				},
				parameterMap : function(options, operation) {
					if (operation == "destroy" && options) {
						if (typeof(console) != 'undefined') console.log("options: " + kendo.stringify(options));
						return {id : options.id };
					}
					else if (operation == "read") {
						return {id: noticeId, total: options.take, skip: options.skip };
					}
					else if (operation == "create") {
						return {id: noticeId, uclaLogonId: options.uclaLogonId};
					}
				}
			},
			pageSize: 200,
			serverPaging: true,
			schema : {
				total: "total", // total is returned in the "total" field of the response
    			data: "recipients",

				model : {
						id : "id",
						fields : {
							id : {
								editable : false,
								nullable : true
							},
							uclaLogonId : "uclaLogonId"
						}
				}
			}
	});

    $("#pager").kendoPager({
        dataSource: dataSource
    });

	var listView = $("#recipientList").kendoListView({
		dataSource : dataSource,
		template : kendo.template($("#template").html()),
		remove: function(e) {
			$("#noticeMsg").empty();
			$("#noticeMsg").removeClass("message success error");
			if (typeof (console) != 'undefined') console.log("removing record ");
		}
	})
	.data("kendoListView");


	$("#addRecipient").click(function(e) {

		var request = ajaxCall(
				$('#alertForm').attr("action"),
				$('#alertForm').serialize(), 'POST', false,
				"#noticeMsg");
		
		request.error(function(data, textStatus, jqXHR) {
			if (typeof (console) != 'undefined') console.log("Error: showing the message " + kendo.stringify(data));
			$("#noticeMsg").empty().html(data.responseText);
			$("#noticeMsg").removeClass("message success");
			$("#noticeMsg").addClass("message error");
		}); 
		
		request.success(function(data, textStatus, jqXHR) {
			if (typeof (console) != 'undefined') console.log("Success: showing the message");
			$("#noticeMsg").empty().html(data);
			$("#noticeMsg").removeClass("message error");
			$("#noticeMsg").addClass("message success");
			$("[name='recipients']").val("");
			
		}); 
		
		request.done(function( data ) {

// 				var listView = $("#recipientList").data("kendoListView");
// 				if (typeof (console) != 'undefined') console.log("refreshing list " + kendo.stringify(listView));
// 				listView.refresh();
			dataSource.read();
		});
		e.preventDefault();
	});

// 		initRemoveRecipient();
}
