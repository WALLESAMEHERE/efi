$(document).foundation();

"use strict"
/// //HEAD
$(document).ready(function() {
// global url
    const config = {
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
        return r;
    }
    // function checking status
    function checkStatus(number, status) {
        if (status == 'outcome') {
            number1 = parseInt(number);
            number2 = number1 - (number1 * 2);
            return number2;
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
                var tab = table[i];
                // function format fulldate to dat and month
                let date = formatDate(tab.date);
                // function change number - add a comma to of decimal and spaces to the thousandths
                let number = change(tab.amount, " ");


                var lista = '<li>';
                lista += '<div class="row collapse">';
                lista += '<div class="large-2 columns history_data text-center">' + date + '</div>';
                lista += '<div class="large-8 columns history_desc"><p class="descript">' + tab.description + '</p>';
                lista += '<p class="category">' + tab.category + '</p><ul><span class="icon-chevron-down show_acc"></span><li>OK</li><li>Anuluj</li></ul></div>';
                lista += '<div class="large-2 columns history_money">' + checkStatus(number, tab.status) + tab.currency + '</div></div></li>';
                // add li element to HTML
                $('.history_ul').append(lista);
                // // // // // //
                google.charts.load('current', {'packages':['corechart']});
                      google.charts.setOnLoadCallback(drawChart);

                      function drawChart() {
   var data = new google.visualization.DataTable();

// Declare columns
  data.addColumn('date', 'Data');
      data.addColumn('number', 'Cash');
// starting balance
      var addition = 0;
// loop Income expenses every day
      for (var i = 0; i < table.length; i++) {
                var tab = table[i];
            // changing EURO to PLN
                function exkasa(number,currency){
                    if(currency == "EUR"){
                        var exchange = number * 4.30;
                        return exchange;
                  } 
                  else{
                    return number;
                  }
                }
            // converted currency
                var po = exkasa(tab.amount,tab.currency);
            // changing number + or -
                function kasa(number){
                   if (tab.status == 'outcome') {
                        number1 = parseInt(number);
                        number2 = number1 - (number1 * 2);
                        return number2;
                    } else if (tab.status == 'income') {
                        number1 = parseInt(number);
                        return number1;
                    } else {
                        return false;
                    }
                }
// changed number + or - function
        var kasaminus = kasa(po);
// account balance 
        var addition = addition +(kasaminus);
      data.addRows([
        [new Date(tab.date), addition],
      ]);
  }
                        var options = {
                          title: 'Efigence Camp',
                            curveType: 'function',
                            animation:{
                            duration: 1000,
                            easing: 'out',
                          },
                          legend: { position: 'bottom' }
                        };
                        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
                        chart.draw(data, options);
                }
// // // // /// /// // /// // /
            }
             $('.show_acc').on('click', function(e){
                $(this).parent().toggleClass('show_hist_nav');
                $(e.target).toggleClass('activ_span');

             });

// chart 
             
        };

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

//
(function getBudgetDate() {
        sendA("data/budget", "GET", {}, succesDate, lifeError);
        // succes
        function succesDate(data) {
            var text = data.content;
            //  adding the data to the structure
            console.log(text.year);
        };
        function lifeError(){};     
    })();
    //////////////////////////////////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 


(function pokazDate() {
    let date = moment().format('MMMM YYYY');
        $('.get_month').html(date);
        $('.left').on('click',function(){
            let date = moment().add(-1 ,'months').format('MMMM YYYY');
            $('.get_month').html(date);
        });
         $('.right').on('click',function(){
            let date = moment().add(1 ,'months').format('MMMM YYYY');
            $('.get_month').html(date);
        });

    })();

     // user search animation 
    $('#input_search_btn').on('click', function() {
        $('.sery').toggleClass('clasa_on'); // width from 0 too 80%;
    });
    // button message / settings - alert box 
    // click on button
    $('.panel_btn').on('click', function(e) {
        // condition - if button has active box
        if ($(e.target).parent().find('.user_panel_msg').hasClass('user_alert_on')) {}
        // condition - if button doesn't have active box
        else if (!$(e.target).hasClass('user_alert_on')) {
            // remove other active box
            $('.user_panel_msg').removeClass('user_alert_on').attr('aria-hidden', 'true');
            // add class and show alert box about this button
            $(this).parent().find('.user_panel_msg').addClass('user_alert_on').attr('aria-hidden', 'false');
            e.stopPropagation()
        }
    });
    // click on body
    $('body').on('click', function(e) {
        e.stopPropagation();
        // condition - if button doesn't have active box
        if (!$(e.target).hasClass('user_panel_msg')) {
            // remove active box
            $('.user_panel_msg').removeClass('user_alert_on').attr('aria-hidden', 'true');
        }
    });
    // show mobile menu
    $('.mobile_hamb').on('click', function() {
        $('.medium_nav').toggleClass('mobile_show');
        $('.mobile_hamb').toggleClass('hamb_open').toggleClass('hamb_close');
    });
    $('.game_category').on('click', function() {
        $(this).children('.select_work').find('span').toggleClass('check_box');
        $(this).children('.select_work').find('p').fadeToggle(100).toggleClass('percent_prog');
        // aria checked
        if ($(this).attr('aria-checked') == 'true') {
            $(this).attr('aria-checked', 'false');
        } else {
            $(this).attr('aria-checked', 'true');
        }
    });
    // checks game progress and replaces styles
    (function gameProgress() {
        var zet = $('.game_category');
        for (var i = 0; i < zet.length; ++i) {
            var item = zet[i];
            var wid = $(item).children('.progress').width();
            if (wid == 0) {
                $(item).css({
                    'color': 'black'
                });
                $(item).find('.badge_place').css({
                    'color': 'silver'
                });
            } else {}
        }
    })();
    // show/hide games with 100% progress
    $('.hide_done_challenge').on('click', function() {
        $('.challenge_compl').fadeOut().attr('aria-hidden', 'true');
    });
    $('.show_all_challenge').on('click', function() {
        $('.challenge_compl').fadeIn().attr('aria-hidden', 'false');
    });
    // check the active buttons and setAttribute aria.
    (function sortableButtonPressed() {
        $('.board_buttons').find('button').on('click', function() {
            if ($(this).attr('aria-pressed') == 'false') {
                $(this).attr('aria-pressed', 'true').addClass('active');
                $(this).parent().siblings().find('button').attr('aria-pressed', 'false').removeClass("active");
            }
        });
    })();
// adding a category game to aria-label
    (function gameInfoAria() {
        var zet = $('.game_category');
        for (var i = 0; i < zet.length; ++i) {
            var item = zet[i];
            var wid = $(item).children('p').text();
            $(item).attr('aria-label', wid);
        }
    })();

// google chart
   
});