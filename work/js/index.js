(function($) {
    var $ct = $('#change-time'),
        $st = $('#set-time'),
        $c = $('#counter'),
        $min = $('.counter-min', $c),
        $sec = $('.counter-sec', $c),
        $et = $('#end-timer'),
        timeRest = 0;

var inter = {
    start : function(fctn) {
        if(!inter.value) {
            inter.value = setInterval(fctn, 1000);
        }
    },

    stop : function() {
        if(inter.value) {
            clearTimeout(inter.value);
            inter.value = null;
        }
    },


};

var countdown = {
    start : function(started) {
        if(started) {
            $('.last-time', $c).removeClass('last-time');
            timeRest = $st.data('time');
        }
     inter.start(countdown.loop);
    },
    stop : function(End) {
        if(End) {
            $et[0].play();
            $('.counter-box', $c).click(function(){
                countdown.start(true);
            });
        }
        inter.stop();
    },

    loop : function() {
        var min = Math.floor(timeRest/60),
            sec = timeRest%60;
        min = min.toString().length == 1 ? "0" + min : min;
        sec = sec.toString().length == 1 ? "0" + sec : sec;

        $min.text(min);
        $sec.text(sec);

        if(timeRest == 0) {
            countdown.stop(true);
        } 
        else if(timeRest < 5)  {
            $('.counter-box', $c).addClass('last-time');
        }

        timeRest --;
    }
};

var setHeadTime = function() {
    var min =  Math.floor(timeRest/60),
        sec = timeRest%60,
        html = "";

    if(min > 0) {
        html += min + 'minute' + (min > 9 ? 's' : '') + ' ';
    }
    if(sec > 0) {
        html += sec + 'second' + (sec > 9 ? 's' : '');
    }

    $st.attr('data-time', timeRest).find('span').html(html);
};
var setMainTime = function() {
    var min = Math.floor(timeRest/60),
        sec = timeRest%60;

    min = min.toString().length == 1 ? "0" + min : sec;
    sec = sec.toString().length == 1 ? "0" + min : sec;

    $min.text(min);
    $sec.text(sec);
};


$('.js-starter', $c).click(function () {
    $(this).fadeOut(400, function() {
        $('.js-countdown').fadeIn(400, function(){
            countdown.start(true);
        });
    });
});


$('.js-stop', $c).click(function() {
    var $t = $(this);

    if(inter.value) {
        countdown.stop();
        $('.btn-pause', $t).attr('aria-hidden', 'true');
        $('.btn-play', $t).attr('aria-hidden', 'false');
    } else {
        countdown.start();
        $('.btn-pause', $t).attr('aria-hidden', 'false');
        $('.btn-play', $t).attr('aria-hidden', 'true');
    }
});

$('.js-start', $c).click(function() {
    countdown.start(true);
});

$('button', $st).click(function() {
    $st.add($ct).toggleClass('show');

});

$ct.on('submit', function() {
    var newMin = parseInt($('#minutes').val()) || 0,
        newSec = parseInt($('#seconds').val()) || 0;


    timeRest = (newMin*60) + newSec;
    localStorage.setItem('timer', timeRest);

    setHeadTime();
    setMainTime();

    $st.add($ct).toggleClass('show');

    return false;
});

$('[type="number"]', $ct).setVal(!!$('[type="number"]', $ct).val());


timeRest = localStorage.getItem('timer') || 60;
setHeadTime();
setMainTime();
})(jQuery);








