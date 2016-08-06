<!DOCTYPE html>
<html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<head>
<title>Users Listing</title>

<link rel="stylesheet"
	href="http://kendo.cdn.telerik.com/2015.3.930/styles/kendo.common-bootstrap.min.css">
<link rel="stylesheet"
	href="http://kendo.cdn.telerik.com/2015.3.930/styles/kendo.bootstrap.min.css">

<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/angular.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/jszip.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/kendo.all.min.js"></script>
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
							url : "/staff/viewuserdata/showUsers",
							dataType : "json"
						}
					}
				});

				$("#grid").kendoGrid({
					dataSource : ds,
					height : 300,
					groupable : false,
					sortable : true,
					pageable : {
						refresh : false,
						pageSizes : true,
						buttonCount : 5
					},
					columns : [ {
						field : "id",
						title : "Id",
						width : 7
					}, {
						field : "firstName",
						title : "FirstName",
						width : 20
					}, {
						field : "lastName",
						title : "LastName",
						width : 20
					}, {
						field : "emailAddress",
						title : "emailAddress",
						width : 50
					}, {
						field : "securityQuestion",
						title : "securityQuestion",
						width : 80
					}, {
						field : "securityAnswer",
						title : "securityAnswer",
						width : 80
					} ]
				});
			});
		</script>
	</div>
</body>
</html>