$(function(){
		$("input[type='checkbox']").click(function () {
            if ($(this).is(":checked")) {
                $("#selectoption").show();
            } else {
                $("#selectoption").hide();
            }
        });	
		
$('[data-toggle="popover"]').popover({placement: "bottom",html : true, container: 'body'}); 

$(".closeBtn").click(function(){
	$('[id="selectoption"]').removeClass("show").addClass("hide");
});
$(".shareFiles").click(function(){
	$(".shareIcons").toggle();	
});


$("#success-alert").hide();
            $(".submitBtn").click(function() {
                $("#success-alert").show();
                window.setTimeout(function () { 
                            $("#success-alert").hide(); }, 1000);               
                  });  
		  
if($( window ).width() < 768){
changeGoogleStyles();
	
	function changeGoogleStyles() {
    if(($goog = $('.goog-te-menu-frame').contents().find('body')).length) {
        var stylesHtml = '<style>'+
            '.goog-te-menu2 {'+
                'max-width:100% !important;'+
                'overflow:scroll !important;'+
                'box-sizing:border-box !important;'+
                'height:auto !important;'+
            '}'+
        '</style>';
        $goog.prepend(stylesHtml);
    } else {
        setTimeout(changeGoogleStyles, 50);
    }
}
	$('.dropdown').click(function(){	
		$(this).find('img').toggle();
		});
	}


});

	function getPolicyMax(objPolicyId) {
        console.log("getPolicy");  
    }
	
	function callCh() {
        console.log("callCh()");  
    }