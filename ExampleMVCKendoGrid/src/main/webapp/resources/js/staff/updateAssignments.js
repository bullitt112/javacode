function initUpdateAssignmentsTabs() {
    var ts = $("#tabstrip").kendoTabStrip({
        animation: { open: { effects: "fadeIn"} },
        contentUrls: [
                    '/StudentWebMVC/staff/manage/diplomarequest/updateassignments/managetermorder',
                    '/StudentWebMVC/staff/manage/diplomarequest/updateassignments/manageretroactive',
                    '/StudentWebMVC/staff/manage/diplomarequest/updateassignments/managereplacement',
                    '/StudentWebMVC/staff/manage/diplomarequest/updateassignments/maildiplomas'
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

$( document ).ready(function() {
	
	// remove duplicate options from selects for update assignments
	$("select option").each(function(){
		  $(this).siblings("[value="+ this.value+"]").remove();
		});
		
	var primaryOriginalSelectTermOrder; 
	var primaryOriginalSelectTermOrderLogonId;
	var backupOriginalSelectTermOrder;
	var backupOriginalSelectTermOrderLogonId
	var primaryOriginalSelectRetroactive;
	var primaryOriginalSelectRetroactiveLogonId;
	var backupOriginalSelectRetroactive;
	var backupOriginalSelectRetroactiveLogonId
	var primaryOriginalSelectReplacement;	
	var primaryOriginalSelectReplacementLogonId;
	var backupOriginalSelectReplacement;
	var backupOriginalSelectReplacementLogonId;
	
	setOriginalValues();
	
	function setOriginalValues() {
		
		primaryOriginalSelectTermOrder = $(".primarySelectTermOrder").val();		
		primaryOriginalSelectTermOrderLogonId = $('.primarySelectTermOrder option:selected').attr('class');
		
		backupOriginalSelectTermOrder = $(".backupSelectTermOrder").val();
		backupOriginalSelectTermOrderLogonId = $('.backupSelectTermOrder option:selected').attr('class');
		
		primaryOriginalSelectRetroactive = $(".primarySelectRetroactive").val();
		primaryOriginalSelectRetroactiveLogonId = $('.primarySelectRetroactive option:selected').attr('class');
		
		backupOriginalSelectRetroactive = $(".backupSelectRetroactive").val();
		backupOriginalSelectRetroactiveLogonId = $('.backupSelectRetroactive option:selected').attr('class');
		
		primaryOriginalSelectReplacement = $(".primarySelectReplacement").val();
		primaryOriginalSelectReplacementLogonId = $('.primarySelectReplacement option:selected').attr('class');
		
		backupOriginalSelectReplacement = $(".backupSelectReplacement").val();
		backupOriginalSelectReplacementLogonId = $('.backupSelectReplacement option:selected').attr('class');		
	}
	
	$("#updateAssignmentsMailDiplomas").attr('disabled', 'disabled');
	$("#updateAssignmentsRetroactive").attr('disabled', 'disabled');
	$("#updateAssignmentsReplacement").attr('disabled', 'disabled');
	$("#updateAssignmentsTermOrder").attr('disabled', 'disabled');
	
	var primary = '';
	var primaryLogonId = '';
	var backup = ''; 
	var backupLogonId = '';
	var originalPrimary = '';
	var originalPrimaryLogonId = '';
	var originalBackup = '';
	var originalBackupLogonId = '';
	
	$('select').on('change', function() {
		
		$(".button").removeAttr('disabled');
		
		if ($(this).hasClass("primaryId")) {
			primary = this.value;
			primaryLogonId = $(this).find('option:selected').attr('class');
		}		
		if ($(this).hasClass("backupId")) {
			backup = this.value;
			backupLogonId = $(this).find('option:selected').attr('class');
		}		
	});
	
	$(".UpdateAssignmentsButton").click(function() {
		
		if ($(this).attr("id")=='updateAssignmentsTermOrder') {
			permissionId = "101";
						
			if(!primary){
				originalPrimary = '';
				 } else {
					 originalPrimary = primaryOriginalSelectTermOrder;
					 originalPrimaryLogonId = primaryOriginalSelectTermOrderLogonId;
				 };
				 
			if(!backup){
				originalBackup = '';
					 } else {
						 originalBackup = backupOriginalSelectTermOrder;
						 originalBackupLogonId = backupOriginalSelectTermOrderLogonId;
					 };	
		}
	
		if ($(this).attr("id")=='updateAssignmentsRetroactive') {
			permissionId = "108";
			if(!primary){
				originalPrimary = '';
				 } else {
					 originalPrimary = primaryOriginalSelectRetroactive;
					 originalPrimaryLogonId = primaryOriginalSelectRetroactiveLogonId;
				 };
				 
			if(!backup){
				originalBackup = '';
					 } else {
						 originalBackup = backupOriginalSelectRetroactive;
						 originalBackupLogonId = backupOriginalSelectRetroactiveLogonId;
					 };	
		}		
		if ($(this).attr("id")=='updateAssignmentsReplacement') {
			permissionId = "107";
			
			if(!primary){
				originalPrimary = '';
				 } else {
					 originalPrimary = primaryOriginalSelectReplacement;
					 originalPrimaryLogonId = primaryOriginalSelectReplacementLogonId;
				 };
				 
			if(!backup){
				originalBackup = '';
					 } else {
						 originalBackup = backupOriginalSelectReplacement;
						 originalBackupLogonId = backupOriginalSelectReplacementLogonId;
					 };	
		}		
		
//		console.log("passing to updateAssignments -" + "primary -" + primary +"primaryLogonId -" + primaryLogonId+"backup -" + backup+"backupLogonId -" + backupLogonId+"originalPrimary -" + originalPrimary+"originalPrimaryLogonId -" + originalPrimaryLogonId+"originalBackup -" + originalBackup+"originalBackupLogonId -" + originalBackupLogonId+"permissionId -" + permissionId);			
		updateAssignments(primary, primaryLogonId, backup, backupLogonId, originalPrimary, originalPrimaryLogonId, originalBackup, originalBackupLogonId, permissionId);
	});
	
	function updateAssignments(primary, primaryLogonId, backup, backupLogonId, originalPrimary, originalPrimaryLogonId, originalBackup, originalBackupLogonId, permissionId) {
		
		 $.ajax({	        	 
	            type: 'POST',
	            url: '/StudentWebMVC/staff/manage/diplomarequest/updateassignments/updateAssignments',
	            data: { 	
	         		'primary': primary,
	         		'primaryLogonId': primaryLogonId,
	                'backup': backup,
	                'backupLogonId': backupLogonId,
	                'originalPrimary': originalPrimary ,
	                'originalPrimaryLogonId': originalPrimaryLogonId,
	                'originalBackup': originalBackup ,
	                'originalBackupLogonId': originalBackupLogonId,
	                'permissionId' : permissionId

	            },
	            success: function(){
	            	 setOriginalValues();
	            	 $(".updateAssignmentsSuccessMessage").html('<p class=\"message success\"><i class=\"icon-ok\"></i> Diploma Assignment has been successfully updated.</p>');
	            }
	        }); 		
	}	
});