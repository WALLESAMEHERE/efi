$(document).foundation();


/// //HEAD

$(document).ready(function() {

    "use strict"


    var config = {
        baseApi: "https://efigence-camp.herokuapp.com/api/"
    };

    // universal function 
    function sendA(endpoint, method, data, sCallback, eCallback) {
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

    // ON SUBMIT - login

    $('#login').on('submit', function(e) {
        e.preventDefault();
        $(this).find(':submit').attr('disabled', 'disabled'); // disabled submit 
        setTimeout(function() {
            $(':submit').attr('disabled', false); // enabled submit 
        }, 4000);


        var pass = $('#password').val(); // get password
        var user = $('#user').text(); // get user name
        var text = {
            login: user,
            password: pass

        };


        sendA("login", "POST", text, loginSucces, loginError);


        // api succes 
        function loginSucces(response) {

            if (pass == "") { // condition - if the field is empty 
                loginError();
                return false;
            } else {

                $("#blad").html(''); // clear error
                $(window).attr("location", "dash.html"); // replace to dashboard

            }
        }
        // api error
        function loginError(response) {
            var obj = JSON.parse(response.responseText);
            $('#blad') // show error
                .fadeIn('slow')
                .html(obj.message)
                .delay(3000)
                .fadeOut('slow');
            return false;
        }
    });

    // LIFE STREAM DATA

    function getDate() {
        // arrow to server
        sendA("data/summary", "GET", {}, lifeFinance, lifeError);
        // succes
        function lifeFinance(a) {

            var text = a.content[0];

            ///////////////////////////////// TEST TEST TEST
            console.log(text.funds.toLocaleString());

            $.each(text, function(i, v) {
                console.log(i, v.toLocaleString());
            });
            ///////////////////////////////// TEST TEST TEST
            // formatted, data      
            var poszlo = change(text.balance, ",", " ");
            var poszlo1 = change(text.funds, ",", " ");
            var poszlo2 = change(text.payments, ",", " ");

            //  adding the data to structure

            $('#balance span').html(poszlo.bold() + " PLN");
            $('#av_funds span').html(poszlo1.bold() + " PLN");
            $('#payments span').html(poszlo2.bold() + " PLN");

          	var test = 5;

            // function - add a comma to of decimal and spaces to the thousandths
            function change(number, comma, currency) {
                number = new String(number);
                if (number.length < 2) {
                	//  change the number to the decimal
                	number = parseInt(number, 10) / 10;
                	// change number to string
                	  var stringNumber = number.toString();
                	// change dot to comma
                	  	stringNumber = stringNumber.replace("\.",",");              	  	               	  
                    var wynik = stringNumber + currency;
                    return wynik;
                } else if (number.length < 3) {
                    var numberK = number.slice(0, number.length - 1);
                    numberK += comma;
                    numberK += number.slice(number.length - 1, number.length);
                    var wynik = numberK + currency;
                    return wynik;
                } else if (number.length < 8) {
                    var numberK = number.slice(0, number.length - 4);
                    numberK += " ";
                    numberK += number.slice(number.length - 4, number.length - 1);
                    numberK += comma;
                    numberK += number.slice(number.length - 1, number.length);
                    var wynik = numberK + currency;
                    return wynik;
                } else {
                    console.log(number);
                }
            }


        };

        function lifeError() {};
    };
    // induction function
    getDate();

    //////////////////////////////////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 

    // user search animation 


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