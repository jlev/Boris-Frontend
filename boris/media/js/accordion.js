// TODO - Accordion Form

$(function() 

{

	$(".accordion-next").hide();
	$(".accordion-prev").hide();

	if(document.location.hash==="#accordion") {
	
		
	$("form ul").css("height","250px");
	
	$(".accordion-next").show();
	$(".accordion-prev").show();

	$("input#get_started").click(function() {
	
		$(".accordion-content:not(:first)").hide();
		$(".accordion-header").click(function() {
			$(".accordion-content").slideUp("slow");
			$(this).next().slideDown("slow");
		});
		$(".accordion-next").click(function() {
			$(this).parent().parent().parent(this).children(".accordion-content").slideUp();
			console.log($(this).parent().parent().parent(this).next().children().slideDown());
		});
		
		
		
	});

	} else if(document.location.has==="#tabs") {
		$("#tab-nav").show();
	
	
	} 


		

	//when user clicks header, hides all other sections but one associated with that header (accordion-header)

});
	