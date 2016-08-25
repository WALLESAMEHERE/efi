$(document).foundation();


// ON SUBMIT !!!!!!

$(document).ready(function() {
    function loginSucces(response) {
        $("#blad").html(""); // clear error
        $(window).attr("location", "dash.html"); // replace to dashboard
    }

    function loginError(response) {
        var obj = JSON.parse(response.responseText);
        $('#blad') // show error
            .fadeIn('slow')
            .html(obj.message)
            .delay(3000)
            .fadeOut('slow');
        return false;
    }


    "use strict"

    var config = {
        baseApi: "https://efigence-camp.herokuapp.com/api/"
    };

    function sendA(endpoint, method, data, sCallback, eCallback) {
        console.log(eCallback);
        $.ajax({
                type: method,
                data: data,
                url: config.baseApi + endpoint,
            })
            .done(function(msg) {
                sCallback(msg);
            })
            .error(function(error) {
                eCallback(error);
            });
    }
    var foo = function(msg) {
        console.log(msg);
    };


    $('#login').on('submit', function(e) {
        e.preventDefault();

        var pass = $('#password').val(); // get password
        var user = $('#user').text(); // get user name
        var text = {
            login: user,
            password: pass

        };
        sendA("login", "POST", text, loginSucces, loginError);
        // validation input password
        if (pass == "") { // condition - if the field is empty 
            $('#blad') // show error 
                .fadeIn('slow')
                .html('dupa haslo')
                .delay(3000)
                .fadeOut('slow');
            return false;
        } else {

            $("#blad").html(''); // clear error
            sendA(text); // arrow to server 
            return false;
        }
    });
// finance life stream

function lifeFinance(){
    var text = a.content[0];

    $('#balance span').html(text.balance + " ");
    $('#av_funds span').html(text.funds + " ");
    $('#payments span').html(text.payments + " ");

};
function lifeError(){};
sendA("data/summary", "GET", {}, lifeFinance, lifeError );



    /*
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
    */
});


// user search animation 
$(document).ready(function() {
    $('#input_search_btn').on('click', function() {
        $('.sery').toggleClass('clasa_on'); // width from 0 too 80%;
    });


    // button message / settings - alert box 

    // click on button
    $('.panel_btn').on('click', function(e) {
        // condition - if button has active box
        if ($(e.target).parent().find('.user_panel_alert').hasClass('user_alert_on')) {}
        // condition - if button doesn't have active box
        else if (!$(e.target).hasClass('user_alert_on')) {
            // remove other active box
            $('.user_panel_alert').removeClass('user_alert_on');
            // add class and show alert box about this button
            $(this).parent().find('.user_panel_alert').addClass('user_alert_on');
            e.stopPropagation()
        }
    });
    // click on body
    $('body').on('click', function(e) {
        // condition - if button doesn't have active box
        if (!$(e.target).hasClass('user_panel_alert')) {
            // remove active box
            $('.user_panel_alert').removeClass('user_alert_on');
        }
    });
});


// FINANCE


// global finance url
var url = "https://efigence-camp.herokuapp.com/api//data/";
// get JSON - summary




/*  			$.each(data.content, function(i, a) {
 					$('#balance span').html(a.balance +" ");
 					$('#av_funds span').html(a.funds +" ");
 					$('#payments span').html(a.payments +" ");
					
					//test
 					console.log(a);
*/