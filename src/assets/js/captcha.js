{/* <script src='https://www.google.com/recaptcha/api.js?onload=recaptchaOnload&render=explicit' async defer></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script> */}


function recaptchaOnload(siteKey) {
    var _captchaTries = 0;
    console.log('recaptchaOnload');
    _captchaTries++;
    if (_captchaTries > 9)
        return;
    if ($('.g-recaptcha').length > 0) {
        grecaptcha.render("recaptcha", {
            sitekey: siteKey,
            callback: function() {
                console.log('recaptcha callback');
                window.localStorage.setItem('captcha','1');
            },
            "expired-callback": function(){
                window.localStorage.setItem('captcha','0');
                console.log('token expired callback');
            },
            "error-callback": function(){
                window.localStorage.setItem('captcha','0');
                console.log('error callback');
            }
        });
        return;
    }
}
function recaptchaReset() {
    if (jQuery('.g-recaptcha').length > 0) {
        grecaptcha.reset();
        window.localStorage.setItem('captcha','0');
        return;
    }
}
