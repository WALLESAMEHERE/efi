$(document).foundation();


// ON SUBMIT !!!!!!

$(document).ready(function(){
	$('#login').on('submit', function(e){
		e.preventDefault();
		$(this).find(':submit').attr('disabled','disabled');// disabled submit 
		 setTimeout(function() {
	        $(':submit').attr('disabled', false); // enabled submit 
	    }, 4000);
		var pass = $('#password').val(); // get password
		var user = $('#user').text();	// get user name
		var text = {
			login:user,
			password:pass
		};	
// validation input password
		if(pass == ""){ // condition - if the field is empty 
			$('#blad')  // show error 
			.fadeIn('slow')
			.html('dupa haslo')
			.delay(3000)
			.fadeOut('slow');
			return false;
		} 
		else{

			$("#blad").html(''); // clear error
			sendAjax(text); // arrow to server 
			return false;
		}
	});
	function sendAjax(text){
		$.ajax({
		  type: "post",
		  data:text,
		  url: "https://efigence-camp.herokuapp.com/api/login",
		  error: function(response) {
		  	var obj = JSON.parse(response.responseText);
		    $('#blad') // show error
		    .fadeIn('slow')
		    .html(obj.message)
		    .delay(3000)
		    .fadeOut('slow');
		    return false;	    
		  },
		  success: function(response) {
		  	$("#blad").html(""); // clear error
		    $(window).attr("location","dash.html"); // replace to dashboard
		  }
		});
	}
});


// user search animation 
$(document).ready(function(){
	$('#input_search_btn').on('click', function(){
		$('.sery').toggleClass('clasa_on'); // width from 0 too 80%;
	});
});

// button message / settings - alert box 
$(document).ready(function(){
// click on button
	$('.panel_btn').on('click',function(e){
// condition - if button has active box
		if($(e.target).parent().find('.user_panel_alert').hasClass('user_alert_on')){}
// condition - if button doesn't have active box
		else if(! $(e.target).hasClass('user_alert_on')){
		// remove other active box
			$('.user_panel_alert').removeClass('user_alert_on');
		// add class and show alert box about this button
			$(this).parent().find('.user_panel_alert').addClass('user_alert_on');
			e.stopPropagation()
		}
	});
// click on body
	$('body').on('click',function(e){
// condition - if button doesn't have active box
		if(! $(e.target).hasClass('user_panel_alert')){
// remove active box
			$('.user_panel_alert').removeClass('user_alert_on');
		}
	});	
});		
 

 // FINANCE

 $(document).ready(function(){
 	// global finance url
 	var url ="https://efigence-camp.herokuapp.com/api//data/";
 	// get JSON - summary
 	$.getJSON(url += 'summary', function(data){ 
 			$.each(data.content, function(i, a) {
 					$('#balance span').html(a.balance +" ");
 					$('#av_funds span').html(a.funds +" ");
 					$('#payments span').html(a.payments +" ");
					
					//test
 					console.log(a);

 			});
 		});
 	});

