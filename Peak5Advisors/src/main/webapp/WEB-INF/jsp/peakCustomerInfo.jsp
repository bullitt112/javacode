<!DOCTYPE html>
<html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<head>
<title>Peak5Advisors CustomerInfo</title>

<link rel="stylesheet"
	href="http://kendo.cdn.telerik.com/2015.3.930/styles/kendo.common-bootstrap.min.css">
<link rel="stylesheet"
	href="http://kendo.cdn.telerik.com/2015.3.930/styles/kendo.bootstrap.min.css">

<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/angular.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/jszip.min.js"></script>
<script src="http://cdn.kendostatic.com/2014.3.1316/js/kendo.all.min.js"></script>
<style>
.k-grid .k-grid-header .k-header .k-link{
	height: auto;
	font-size: 12px;
	font-weight: bold;
}

.k-grid{
font-size: 12px;
}
.k-grid .k-grid-header .k-header {
	white-space: normal;
}
</style>
<style>
   .k-grid {
       font-family: "DejaVu Sans", "Arial", sans-serif;
   }

   /* Hide the Grid header and pager during export */
   .k-pdf-export .k-grid-toolbar,
   .k-pdf-export .k-pager-wrap
   {
       display: none;
   }
</style>
</head>
<body>
	<div id="main-content">
		<div id="custom-window"></div>
		
		<div id="grid" class="k-content" style="width: 1400Px"></div>

		<script>
			$(document).ready(function() {
				$("#btnExport").kendoButton({
				    click: function()
				    {
				      $("#grid").data("kendoGrid").saveAsExcel()
				    }
				  })
				  
				$("#grid").kendoGrid({
		            excel: {
		                fileName: "Peak5ExcelExport.xlsx",
		                filterable:true,
		                allPages:true
		              },
						toolbar: ["pdf"],
			            pdf: {
			                allPages: true,
			                fileName: "Peak5PdfExport.pdf",
			                proxyURL: "//demos.telerik.com/kendo-ui/service/export"
			            },
					dataSource : {
				/* 	type : "odata", */
					transport : {
							read : "/peak/showCustomers", dataType : "json"
						},
						 pageSize: 10
					},
					height : 450,
					  filterable: true,
                      sortable: true,
                      pageable: true,
					navigatable: true,
					groupable : false,
					
					scrollable: {
				        virtual: false
				    },
				    selectable: "multiple row",
					pageable : {
						refresh : true,
						pageSizes : true,
						buttonCount : 3
					},
					columns : [{
						field : "owner",
						title : "Owner",
						filterable: false,
						width : 15
					}, {
						field : "state",
						title : "State",
						filterable: true,
						width : 08
					}, {
						field : "address",
						title : "Address",
						width : 15
					}, {
						field : "county",
						title : "County",
						filterable: false,
						width : 10
					}, {
						field : "contactName",
						title : "Contact Name",
						filterable: false,
						width : 15
					}, {
						field : "electricSupplier",
						title : "Electric Supplier",
						filterable: false,
						width : 15
					}, {
						field : "electricyRate",
						title : "Electricy Rate",
						filterable: false,
						width : 13
					}, {
						field : "electricityContractExpiration",
						title : "Electricity Contract Expiration",
						filterable: false,
						width : 10
					}, {
						field : "naturalGasSupplier",
						title : "Natural Gas Supplier",
						filterable: false,
						width : 20
					},  {
						field : "naturalGasRate",
						title : "Natural Gas Rate",
						filterable: false,
						width : 08
					},  {
						field : "naturalGasContractExpiration",
						title : "Natural Gas Contract Expiration",
						filterable: false,
						width : 10
					}]
				});
			});
			
		</script>
		<script>
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. cdn.kendostatic.com
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>
    
	</div>
	<br>
	<button id="btnExport">Export to Excel</button>
</body>
</html>