document.addEventListener('touchmove', function (event) {
event.preventDefault();
}, false);

$(function () {

    /*引言*/
    var up = 0;
    var foreword = new Hammer($("#foreword")[0]);
    foreword.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    foreword.on("swipeup", function (e) {
        if (up < 3) {
            up += 1;
            $('#foreword ul li:nth-child('+ up +')').addClass('up');
        } else if (up == 3) {
                $("#foreword").addClass('up');
        }
    });


    var calc = 0;
    $('#calc button').on('touchend', function () {
        switch (calc) {
            case 0:
                calc += 1;
                $('#calc_1').fadeOut(3000);
                $('#calc_2').fadeIn(3000);
                break;
        
            default:
                break;
        }
        
    });

});