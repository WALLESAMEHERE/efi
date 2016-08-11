$(document).foundation();

$(document).ready(function(){
	$('#user_btn').on('click', function(){
		 var pass = $('#password').val();
		 	
	var text = {
		login:"efi",
		password:pass
	};
	sendAjax(text);
	});
	 function sendAjax(text){
		$.ajax({
		  type: "post",
		  data:text,
		  url: "https://efigence-camp.herokuapp.com/api/login",
		  error: function(response) {
		  	var obj = response.responseText
		    document.getElementById("blad").innerHTML = obj.message;
		  },
		  success: function(response) {
		    console.log(response);
		  }
		});
	}
});


//http://stackoverflow.com/questions/16781357/get-element-of-a-responsetext-json-of-an-openlayers-get-request