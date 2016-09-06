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

    (function getDate() {
        // arrow to server
        sendA("data/summary", "GET", {}, lifeFinance, lifeError);
        // succes
        function lifeFinance(data) {
            var text = data.content[0];
            $.each(text, function(i, v) {
                let r = v.toLocaleString('pl', {
                    minimumFractionDigits: 2,
                });
                r = r.replace("\.", ",");
            });
            ///////////////////////////////// TEST TEST TEST
            var currencyPL = " PLN"
                //  adding the data to the structure

            $('#balance span').html(
                change(text.balance, "") + currencyPL
            );
            $('#av_funds span').html(
                change(text.funds, "") + currencyPL
            );
            $('#payments span').html(
                change(text.payments, "") + currencyPL
            );
        };

        function lifeError() {};
    })();
    (function getProducts() {
        sendA("data/products", "GET", {}, lifeFinance, lifeError);
        // succes
        function lifeFinance(data) {
            var text = data.content[0];
            //  adding the data to the structure

            $('.product_type').html( text.type);
            $('.product_cash').html(change(text.amount, "") + text.currency);         
        };
        function lifeError(){};
        
    })();
     
    

    // UNIVERSAL FUNCTION - change numbers

    // function - add a comma to of decimal and spaces to the thousandths
    function change(number, currency) {

        let r = number.toLocaleString('pl', {
            minimumFractionDigits: 2,
        });
        r = r.replace("\.", ",");
        r += " " + currency;
        return r.bold();
    }
    // function checking status
    function checkStatus(number, status) {
        if (status == 'outcome') {
            number = '-' + number;
            let numberb = number.bold();
            return numberb;
        } else if (status == 'income') {
            var box = '<span class="number_status">';
            box += number;
            box += '</span>';
            $('.number_status b').addClass('income_st');
            return box;
        } else {
            return false;
        }
    }
    // TEST APIII history
    (function getHistory() {

        sendA("data/history", "GET", {}, lifeFinance, lifeError);

        function lifeFinance(historyData) {
            var conte = new Array(historyData.content);
            var table = conte[0];
            for (var i = 0; i < table.length; i++) {
                let tab = table[i];
                // function format fulldate to dat and month
                let date = formatDate(tab.date);
                // function change number - add a comma to of decimal and spaces to the thousandths
                let number = change(tab.amount, " ");


                var lista = '<li>';
                lista += '<div class="row collapse">';
                lista += '<div class="large-2 columns history_data">' + date + '</div>';
                lista += '<div class="large-8 columns history_desc"><p class="descript">' + tab.description + '</p>';
                lista += '<p class="category">' + tab.category + '</p><ul><li></li>asdasd</ul></div>';
                lista += '<div class="large-2 columns history_money">' + checkStatus(number, tab.status) + tab.currency + '</div></div></li>';
                // add li element to HTML
                $('.history_ul').append(lista);
            }
        }

        function lifeError() {}
    })();
    
    // function change fulldate to day and month
    function formatDate(date) {
        var d = new Date(date);
        // + 1 , bcs getMonth returns in the range from 0 to 11
        var month = d.getMonth() + 1;
        // <= 9 add 0 and returns two digit format
        if (month <= 9)
            month = '0' + month;

        var day = d.getDate();
        // <= 9 add 0 and returns two digit format
        if (day <= 9)
            day = '0' + day;
        return day + "." + month;
    }


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
    // show mobile menu
    $('.mobile_hamb').on('click', function() {
        $('.medium_nav').toggleClass('mobile_show');
    });
});