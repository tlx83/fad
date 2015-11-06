$(document).ready(function () {
	//AJAX REQUEST GLOBAL CONFIG
	$.ajaxSetup({
		timeout: 7500
	});

	$(document).ajaxStart(function() {
	  $(".comfirm-box").slideUp('fast');
	});

	$('#main-menu').metisMenu({
    activeClass: 'active'
  });

	$(document).on('click','.sidebar-collapse.collapse.in',function(e) {
	    if( $(e.target).hasClass('ajax') ) {
	        $(this).collapse('hide');
		    $("html, body").animate({
		        scrollTop: 0
		    }, 750);
		    return false;
	    }
	});

	$("#up_img_p").bind("click", function () {
		$('#editp').trigger('click');
	});
	
	$("#editp").on("change", function () {
		$("#upload").ajaxForm({
			success: function(data){
	            if(data != '') {
	                $(".content-box-message").html(data);
					$(".comfirm-box").slideDown('fast');
	            }
	        }
		}).submit();
	});	  

	$('#table').dataTable({"pageLength": 50});  
}); //$(document).ready

$(document).on('click', 'a.ajax', function(e) {
	e.preventDefault();
	var href = $(this).attr('href');
	var load_here = $(".load-here");
	$.ajax({
		dataType: "html",
		type: "POST",
		url: href,		
		error: function(){		
			// Load the content in to the page.
			load_here.html("<p class='loading-error text-center'>Oops! Errore di caricamento!</p>");
		},
		
		beforeSend: function(){
            load_here.empty();
			load_here.addClass('preload-content');
		},
				
		success: function (result) {
			load_here.removeClass('preload-content').html(result);
		}
	});
});

$(document).on('click', '.comfirm-box span', function(e) {
		$(".comfirm-box").slideUp('fast');
});

$('#ModalFile, #ModalMedia').on('hidden', function(){
	$(this).data('modal', null);
	$('.modal-dialog .modal-body.img-library').empty();
});


$('.scrollup').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

$(window).bind("load resize", function () {
	if ($(this).width() < 768) {
	    $('div.sidebar-collapse').addClass('collapse');
	} else {
	    $('div.sidebar-collapse').removeClass('collapse');
	}
});
