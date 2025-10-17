$(function(){
    $('.JQrateAlertSignUp').on('click', function(evt){
		evt.preventDefault();
        // clear any existing forms
        if($('#raform').length &gt; 0){
            $('#raform').data('validator', null);
            if($('#raform').closest('tr').is(':visible')){
                $('#raform').closest('tr').hide('slow');
            }
            $('.JQrateSignup').remove();
        }

        data_id = $(this).attr('data-id');
        data_rateid =$(this).attr('data-rateid');

        $signup_div = $('div[data-rateid=' + data_rateid + '][data-id=' + data_id + ']');

        $signup_div.load('/render.php',{mod: "liverates",action: "display_signup",params: 'id~' + data_rateid + '|recid~' + data_id}, function(){

            if($signup_div.closest('tr').is(':hidden')){
				
                $signup_div.closest('tr').show('slow');
            }

            $('#raform').validate({

                    submitHandler: function(form) {
                        $('.ajaxInProgress_wrapper').show();

                        var encoded_params = $(form).serialize();

                        $.ajax({
                            type: "POST",
                            url: "/render.php",
                            data: encoded_params})
                         .done(function(resultsObj){
                                // clear any existing forms
                                if($('#raform').length &gt; 0){
                                    $('#raform').data('validator', null);
                                    $('#raform').closest('tr').slideUp('slow').delay(1000);
                                }
                                $('.JQrateSignup').remove();
                                if('response' in resultsObj){
									$('#dialog_content').html(resultsObj.response);
									$('#dialog').dialog("open");
                                    //$('div.ra_message_area[data-rateid=' + data_rateid + ']').html(resultsObj.response).fadeIn('slow');
                                    //$('div[data-rateid=' + data_rateid + '][data-id=' + data_id + ']').html(resultsObj.response).fadeIn('slow');
                                }

                                //$('html, body').animate({ scrollTop: $('div.ra_message_area[data-rateid=' + data_rateid + ']').offset().top }, 'slow');
                         })
						 .fail(function(results){
                              alert("We're sorry, our Rate Notification system is currently unavailable. Please try again later.");
                         });

                        // end progress indicator
                        $('.ajaxInProgress_wrapper').hide();
                    },
                    success: function(label) {
                        // set   as text for IE
                        label.html("");
                    }
                });
        });
    });

    // optout form
    $('#raform_optout').validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            focusInvalid: false,
            focusCleanup: true,
            errorClass: "error",
            validClass: "success",

            errorElement: "div",
            submitHandler: function(form) {
                $('.ajaxInProgress_wrapper').show();

                var encoded_params = $(form).serialize();

                $.ajax({
                    type: "POST",
                    url: "/render.php",
                    data: encoded_params})
                 .done(function(resultsObj){
                        if('status' in resultsObj){
                            if(resultsObj.status == 'success'){
                                $('#rate_alert_form_div').slideUp('slow');
                            }
                        }
                        if(!$('#optout_message_area').hasClass('red')){
                            $('#optout_message_area').addClass('red')
                        }
                        if('response' in resultsObj){
                            $('#optout_message_area').html(resultsObj.response).fadeIn('slow');
                        }

                 })
				 .fail(function(results){
                      alert("We're sorry, our Rate Notification system is currently unavailable. Please try again later.");
                });

                // end progress indicator
                $('.ajaxInProgress_wrapper').hide();
            },
            success: function(label) {
                // set   as text for IE
                label.html("");
            }
        });
});