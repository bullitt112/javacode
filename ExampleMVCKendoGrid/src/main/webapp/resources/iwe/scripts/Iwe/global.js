/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	GLOBAL SCRIPTS
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/


//Dropdown Menu
function dropDownMenu() {

    var dropdownLinks = $(".dropdown-link");
    var dropdownWrapper = $(this).next(".dropdown-wrapper");
    var dropdownSpacer = $("#dropdown-spacer");

    //if all dropdown menus are closed
    if (!($(dropdownLinks).hasClass("selected"))) {
        $(this).addClass("selected");
        /*	$(dropdownSpacer).animate({
        height: "115"
        }, "fast");
        $(dropdownWrapper).slideDown("fast");*/

        $(dropdownWrapper).slideDown("fast",
            function () {
                $(dropdownSpacer).animate({
                    height: $(dropdownWrapper).height() + 25
                }, "fast");
            }
        );
    }
    //if $(this) dropdown menu is open
    else if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(dropdownSpacer).animate({
            height: "0"
        }, "fast");
        $(dropdownWrapper).slideUp("fast");
    }
    //if another dropdown menu is open
    else if ($(dropdownLinks).not(this).hasClass("selected")) {
        $(dropdownLinks).removeClass("selected");
        $(this).addClass("selected");
        $(".dropdown-wrapper").hide();
        /*$(dropdownWrapper).show();*/
        $(dropdownWrapper).show();
        $(dropdownSpacer).animate({
            height: $(dropdownWrapper).height() + 25
        }, "fast");
    }

    //don't follow the link
    return false;
}





/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	DOM IS LOADED
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/
$(document).ready(function () {


    //MAIN NAV
    $(".dropdown-link").bind("click", dropDownMenu); //bind dropdown menu function

    $(".close").click(function () { //close menu
        $('.selected').focus();
        $(".dropdown-link").removeClass('selected');
        $(this).parents(".dropdown-wrapper").slideUp("fast");
        $("#dropdown-spacer").animate({
            height: ""
        }, "fast");

        return false;
    });
   
    // bootstrap dropdown bug fix - force the browser to redirect to the clicked link.
    $('.dropdown-menu a').on('touchstart', function(e) {
        window.location.href = $(this).attr('href');
    });
    
});


