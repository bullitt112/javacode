
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%-- <%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>Kendo UI JSP Wrappers</title>

<link href="http://cdn.kendostatic.com/2011.3.1129/styles/kendo.common.min.css" rel="stylesheet" />
<link href="http://cdn.kendostatic.com/2011.3.1129/styles/kendo.default.min.css" rel="stylesheet" />
<!-- 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="http://cdn.kendostatic.com/2011.3.1129/js/kendo.all.min.js"></script>  
-->

<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2015.2.902/js/kendo.all.min.js"></script>


</head>
<body>
	<div id="main-content">
	 <div id="custom-window"></div>
		<div id="grid"></div>
		<script>
			$(document).ready(function() {
				var ds = new kendo.data.DataSource({
					transport : {
						read : {
							url : "../staff/viewuserdata/findAllUsers.json",
							dataType : "json", 
						},
						   destroy: {
                               url: "../users/deleteUser",
                               dataType: "json",
                               type: "POST"
                           },
                           update:  {
                               url: "../users/editUser",
                               dataType: "json",
                               contentType: "application/json; charset=utf-8",
                               type: "POST"
                           },
                           create: {
                               url: "../users/editUser",
                               dataType: "json",
                               contentType: "application/json; charset=utf-8",
                               type: "POST"
                           },
			                 parameterMap: function(options, operation) {
			                 	if (operation == "destroy"){
			                		var selectedValue = $(".k-input").text();
			                		alert("Value ="+ selectedValue);
			                	} else {
			                        return JSON.stringify(options);
			                    } 
			                } 
					},
		             schema: {
		                 model: {
		                	id: "id",
							fields: {
						         firstName: {editable: true},
		                         fastName: {editable: true},
		                         emailAddress: {editable: true},
		                         password: {editable: true},
		                         securityQuestion: {editable: true}
			             	}
		                 }
		             }
				});

				$("#grid").kendoGrid({
					dataSource : ds,
					height : 250,
					toolbar: ["create"],
					columns : [
					    {field : "firstName", title : "First Name", width : "20px"}, 
						{field : "lastName", title : "Last Name", width : "20px"}, 
						{field : "emailAddress", title : "Email Address", width : "20px"}, 
						{field : "password",title : "Password", width : "20px"}, 
						{field : "securityQuestion", title : "Security Question", width : "40px"},
						{
							command:[
						        {name: "destroy", text: "Delete"},
								{name: "edit", text: "Modify"}
						    ],
							title: "Option",
		                    width: 100
	                    }
						],
						editable: "popup"
				});
			});
			
			function openCustomWindow(e) {
				   e.preventDefault();
				   myWindow.center().open();
				}

				function editorWindowClosed(e) {  
				    myGrid.cancelChanges(); 
				}

				var myWindow = $("#custom-window").kendoWindow({
					        modal: true,
					        resizable: false,
					        title: "Test",
					        visible: false,
				            close: editorWindowClosed
					    }).data("kendoWindow");
		</script>
	</div>
</body>
</html>  
 