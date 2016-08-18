$(document).foundation();

/* ON CLICK !!!!!!

$(document).ready(function(){
	 	
	$('#user_btn').on('click', function(e){
		e.preventDefault();
		$(this).attr('disabled', 'disabled'); // disabled submit button
		 setTimeout(function() {
	        $('#user_btn').attr("disabled", false); // enabled submit button
	    }, 4000);

		var pass = $('#password').val(); // input password
		var user = $('#user').text();	// user name
		var text = {
			login:user,
			password:pass
		};	
		// validation
		if(pass == ""){
			$('#blad')  // show error 
			.fadeIn('slow')
			.html('dupa haslo')
			.delay(3000)
			.fadeOut('slow');
			return false;
		} 
		else{
			$("#blad").html (''); // clear error
			sendAjax(text); // arrow to server
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
		    $(window).attr("location","http://google.pl"); // replace to dashboard
		  }
		});
	}
});

*/
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
		// validation
		if(pass == ""){
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
		    $(window).attr("location","http://google.pl"); // replace to dashboard
		  }
		});
	}
});
