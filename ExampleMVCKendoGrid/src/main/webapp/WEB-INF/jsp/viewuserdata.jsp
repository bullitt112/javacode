<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%-- <%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%> --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

<!DOCTYPE html>
<html>
<head>
<style>
html {
	font-size: 14px;
	font-family: Arial, Helvetica, sans-serif;
}
</style>
<title></title>
<link rel="stylesheet"
	href="//kendo.cdn.telerik.com/2015.3.930/styles/kendo.common-material.min.css" />
<link rel="stylesheet"
	href="//kendo.cdn.telerik.com/2015.3.930/styles/kendo.material.min.css" />

<script src="//kendo.cdn.telerik.com/2015.3.930/js/jquery.min.js"></script>
<script src="//kendo.cdn.telerik.com/2015.3.930/js/kendo.all.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
</head>

<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Kendo GRID</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<!-- 					<li class="active"><a href="/hello">Home <span
							class="sr-only">(current)</span></a></li> -->
					<li><a href="/register">Register</a></li>
					<li><a href="/search">Search</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

	<div class="container">
		<div class="masthead">
			
		<form:form commandName="criteria"
			cssClass="form-horizontal registrationForm">
			<div class="row">
				<div class="span6">
					<form:input path="lastName" placeholder="Enter lastName " id="txtlastName_1" cssClass="input-xxlarge" />
					<br />
				</div>
				<div class="span6">
					<button type="submit" class="button large primary btnSearchUserData" id="searchUserData">GO</button>
					<button type="button" class="button large searchUserDataClear" id="searchUserData">Clear</button>
				</div>
			</div>

	<div id="example">
		<div class="demo-section k-content">
				   <input type="text" class="form-control" id="usr" placeholder="Enter lastName " style="width: 30%;">
				    <button type="button" class="btn btn-default btn-xs">Left</button>
					<button type="button" class="btn btn-primary btn-xs">Middle</button>
				</div>
			</div>

		</form:form>
			</div>

			<!-- Same name as tiles config. Eg: /staff/userData.view -->
			<div id="searchResults"></div>
		</div>
	
</body>
<script id="rowTemplate" type="text/x-kendo-tmpl">
# if(window.altRow) { #
<tr class="k-alt k-master-row" role="row" data-lastName="#: name #">	
# } else { #
<tr class="k-master-row" role="row" data-lastName="#: name #">	
# } #
		<td>#: rowNumber #</td>
		<td>#: name #</td>
		<td>#: value #</td>
</tr>
# window.altRow = !window.altRow; #
</script>

<script>
	$(".searchUserDataClear").click(function() {
		var txtlastName_1 = $("#txtlastName_1");
		txtlastName_1.val("");
		$("#userData").html("");

		clearSearchResults();
	});

	$(".btnSearchUserData").click(
		function(event) {
			// prevent submit form
			event.preventDefault();
	
			// call ajax to get html result
			if ('' != $('#txtlastName_1').val()) {
				displaySearchResult($('#txtlastName_1').val());
			} else {
				$('#searchResults').removeClass('k-grid k-widget');
				$('#searchResults')
						.html('<font color="red">lastName must not be empty.</font>');
			}
		});

	function displaySearchResult(criteria) {
		clearSearchResults();

		$.ajax({method : "POST",
					url : "/staff/viewuserdata/search",
					data : {
						lastName : criteria
					}
				})
			.done(
			function(dValue) {
				var grid = $("#searchResults").kendoGrid(
					{
						dataSource : {
							data : dValue.models,
							pageSize : parseInt(dValue.models.length) || 1,
							error : function(e) {
								$("#searchResults")
										.html(
												e.xhr.responseText);
							}
						},
						sortable : false,
						pageable : {
							input : true,
							numeric : false
						},
						columns : [ {
							field : "name",
							title : "Name",
							width : 150
						}, {
							field : "value",
							title : "Value",
							width : 400
						} ],
						detailTemplate : '<div class="diploma-request-home"></div>',
						rowTemplate : kendo.template($(
								"#rowTemplate").html()),
						detailInit : getStudentDRHome,
						dataBound : function(e) {
							var grid = e.sender;
							if (grid.dataSource.total() == 0) {
								var colCount = grid.columns.length;
								$(e.sender.wrapper)
										.find('tbody')
										.append(
												'<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data"></td></tr>');
							}
						}
					});
});
	}

	function getStudentDRHome(event) {
		var detailRow = event.detailRow;
		console.log("Selected " + kendo.stringify(event.data.studentId));
	}

	function clearSearchResults() {
		var grid = $("#searchResults").data("kendoGrid");
		if (grid === undefined) {

		} else {
			grid.destroy();
		}
		$("#searchResults").html('');
		$('#searchResults').removeClass('k-grid k-widget');
	}
</script>

<style>
<div id ="pager" class="k-pager-wrap">
</div>
</style>
