document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);


var loader = new createjs.LoadQueue(false);
loader.setMaxConnections(100);
loader.maintainScriptOrder = true;
loader.loadManifest([
    'img/c1_bg.jpg',
    'img/c2_bg.jpg',
    'img/c3_bg.jpg',
    'img/c4_bg.jpg',
    'img/c5_bg.jpg',
    'img/c6_bg.jpg',
    'img/f1_bg.jpg',
    'img/f2_bg.jpg',
    'img/f3_bg.jpg',
    'img/f4_bg.jpg',
    'img/share.jpg',
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/c1_1.png',
    'img/c1_bt.png',
    'img/c2_1.png',
    'img/c3_1.png',
    'img/c4_1.png',
    'img/c5_1.png',
    'img/c6_1.png',
    'img/c6_2.png',
    'img/c6_3.png',
    'img/c6_4.png',
    'img/c6_bt1.png',
    'img/c6_bt2.png',
    'img/c6_bt3.png',
    'img/c6_bt5.png',
    'img/c6_bt6.png',
    'img/calc_1.png',
    'img/calc_2.png',
    'img/down.png',
    'img/f1_1.png',
    'img/f1_2.png',
    'img/f2_1.png',
    'img/f2_2.png',
    'img/f3_1.png',
    'img/f3_2.png',
    'img/f4_1.png',
    'img/man1_bg.png',
    'img/man2_bg.png',
    'img/man3_bg.png',
    'img/man4_bg.png',
    'img/man5_bg.png',
    'img/man6_bg.png',
    'img/man7_bg.png',
    'img/num0.png',
    'img/num1.png',
    'img/num2.png',
    'img/num3.png',
    'img/num4.png',
    'img/num5.png',
    'img/num6.png',
    'img/num7.png',
    'img/num8.png',
    'img/num9.png',
    'img/num_del.png',
    'img/num_sub.png',
    'img/p1_bg.png',
    'img/p2_bg.png',
    'img/p3_bg.png',
    'img/tips1.png',
    'img/tips2.png',
]);
loader.on("progress", function (event) {});
loader.on('error', function (e) {
    console.log(e);
})
loader.on("complete", function (event) {
    console.log('全部加载完成');
    $('#loading').fadeOut(100);
    $('#f1w').delay(300).fadeIn(2000);
    $('#f1w_1').animate({'height':354},1200,function () {
        $('#f1w_2').animate({'height':322},1200);
    });
    $('#man1').show();
});

$(function () {

    $('.key').html($('#key').html());

    /*引言*/
    var up = 1;
    var foreword = new Hammer($("#foreword")[0]);
    foreword.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    foreword.on("swipeup", function (e) {
        if (up < 4) {
            var current = $('#foreword ul li:nth-child(' + up + ')');
            current.addClass('up');
            current.next().find('img').first().delay(600).fadeIn(2000);
            up += 1;
            if (up == 2) {
                $('#man2').show();
                $('#f2w_1').animate({'height':375},1200,function () {
                    $('#f2w_2').animate({'height':319},1200);
                });
                return false;
            }
            if (up == 3) {
                $('#man3').show();
                $('#f3w_1').animate({'height':623},1500,function () {
                    $('#f3w_2').animate({'height':375},1200);
                });
                return false;
            }
            if (up == 4) {
                $('#man3').show();
                $('#f4w_1').animate({'height':512},1200,function () {
                    $('#f4w_2').animate({'height':317},1200,function () {
                        $('#f4w_3').animate({'height':477},1200);
                    });
                });
                return false;
            }
        } else if (up == 4) {
            $("#foreword").addClass('up');
        }
    });

    var flag = false;

    function year(year) {
        var year = parseInt(year);
        if (year > 1900 && year < 2018) {
            return true;
        } else {
            if (flag) return;
            flag = true;

            $('#flash').stop(true, false).animate({
                top: 10
            }).delay(4000).animate({
                top: -130
            }, function () {
                flag = false;
            });
            console.log('请输入合理的年份！按*号键清除');
        }
    }

    /*确认按钮*/
    var calc = 1;
    $('.sub').on('touchend', function () {
        switch (calc) {
            case 1:
                calc += 1;
                $('#calc_1').fadeOut(1000);
                $('#calc_2').fadeIn(1000);
                break;
            case 2:
                var back = $('#back').val();
                if (year(back)) {
                    calc += 1;
                    $('#calc_2').fadeOut(1000);
                    $('#calc_3').fadeIn(1000);
                } else {
                    $('#back').val('');
                }
                break;
            case 3:
                var parent = $('#parent').val();
                if (year(parent)) {
                    calc += 1;
                    $('#calc_3').fadeOut(1000);
                    $('#calc_4').fadeIn(1000);
                } else {
                    $('#parent').val('');
                }
                break;
            case 4:
                var you = $('#you').val();
                if (year(you)) {
                    calc += 1;
                    $('#calc_4').fadeOut(1000);
                    $('#calc_5').fadeIn(1000);
                } else {
                    $('#you').val('');
                }
                break;
            case 5:
                if ($('#count').val() == '0') {
                    calc += 2;
                    $('#calc_5').fadeOut(1000);
                    $('#calc_7').fadeIn(1000);
                } else if ($('#count').val()) {
                    calc += 1;
                    $('#calc_5').fadeOut(1000);
                    $('#calc_6').fadeIn(1000);
                    calculator();
                }
                break;
            case 6:
                calc = 2;
                $('#calc_6').fadeOut(1000);
                $('#calc_2').fadeIn(1000);
                $('input').val('');
                break;
            case 7:
                
                if ($('#how_many_year').val() < 2) {
                    $('#how_many_year').val('');
                    if (flag) return;
                    flag = true;
                    $('#flash_p').html('输入的数不能小于2');
                    $('#flash').stop(true, false).animate({
                        top: 10
                    }).delay(4000).animate({
                        top: -130
                    }, function () {
                        flag = false;
                        $('#flash_p').html('请输入合理的年份！');
                    });
                } else {
                calc = 6;
                $('#calc_7').fadeOut(1000);
                $('#calc_6').fadeIn(1000);
                calculator();}
                break;

            default:
                break;
        }

    });

    /*计算器*/
    $('.btn').on('touchstart', function () {
        $(this).addClass('dark');
    });

    $('.btn').on('touchend', function () {
        $(this).removeClass('dark');
    });

    $('.num').on('touchend', function () {
        switch (calc) {
            case 2:
                if ($('#back').val().length < 4) {
                    var val = $('#back').val() + $(this).data('num');
                    $('#back').val(val);
                }

                break;
            case 3:
                if ($('#parent').val().length < 4) {
                    var val = $('#parent').val() + $(this).data('num');
                    $('#parent').val(val);
                    /*if (val.length == 4) {
                        alert('请继续输入母亲的出生年份！');
                    }*/
                } 
                break;
            case 4:
                if ($('#you').val().length < 4) {
                    var val = $('#you').val() + $(this).data('num');
                    $('#you').val(val);
                }
                break;
            case 5:
                if ($('#count').val().length < 3) {
                    var val = $('#count').val() + $(this).data('num');
                    $('#count').val(val);
                }
                break;
            case 7:
                if ($('#how_many_year').val().length < 3) {
                    var val = $('#how_many_year').val() + $(this).data('num');
                    $('#how_many_year').val(val);
                }
                break;

            default:
                break;
        }

    });

    $('.del').on('touchend', function () {
        $(this).parent().parent().find('input').val('');
    });


    /*计算公式*/
    var calculator = function () {

        var date = new Date;
        var current_year = date.getFullYear();

        var myself = $('#you').val();
        var parent = $('#parent').val();
        var last_back_home_year = $('#back').val();
        var count = $('#count').val();
        
        if (count == '0') {
            count = 1 / ($('#how_many_year').val());
        }


        var my_age = current_year - myself; //自己年龄
        var max_age = current_year - parent; //父母年龄最大的

        var age_item = 100 - max_age;
        var time_item = current_year <= last_back_home_year ? 1 : current_year - last_back_home_year;
        console.log(time_item, age_item);

        var time_left = 0;
        if (age_item > 0 && time_item > 0) {
            time_left = (age_item / time_item) * count;
            time_left = time_left <= 0 ? 0 : time_left.toFixed(0);
        }

        var result = time_left
        $('#result span:first-child').html(result);
        wechatShareData.title = '我留给爸妈的相聚次数仅剩' +result+ '次，别让爸妈等得太久';
        wechat_share();
    }

    /*落地页*/
    $('#back_now').on('touchend', function () {
        $('#left_time').fadeOut(1000);
        $('#accompany').fadeIn(1000);
    });
    $('#wait_you').on('touchend', function () {
        $('#accompany').fadeOut(1000);
        $('#photo').fadeIn(1000);
    });
    $('#back_now_2').on('touchend', function () {
        $('#accompany').fadeOut(1000);
        $('#recruit').fadeIn(1000);
        $('#block').fadeOut(400);
    });
    $('#back_now_3').on('touchend', function () {
        $('#photo').fadeOut(1000);
        $('#recruit').fadeIn(1000);
        $('#block').fadeOut(400);
    });

    /*下拉刷新*/

    /*var c6_top  = startY = moveY = endY = lastY = 0;
    var isMove = false;

    $('#photo').on('touchstart', function (e) {
        isMove = true;
        e.preventDefault();
        var touch = e.originalEvent.targetTouches[0]; 
        lastY = startY = touch.pageY;
        $('#refresh p').html('下拉更换图片');
        
    });

    $('#photo').on('touchmove', function (e) {
        if (isMove) {
            
            e.preventDefault();
            var touch = e.originalEvent.targetTouches[0]; 
            moveY = touch.pageY;
            
            console.log(c6_top);
            if (moveY - startY > 0 ) {
            var distance = moveY - lastY;
            speed = Math.ceil(Math.abs(moveY - startY)/100 +1)
            console.log(speed);
            
            c6_top += (distance)/(speed);
            if (c6_top >100) {
                $('#refresh p').html('松开手更换图片');
            } else {
                $('#refresh p').html('下拉更换图片');
            }
                
            $("#calc_6").css('top', c6_top + 'px');
            lastY = moveY;
            }

        }
    });

    $('#photo').on('touchend', function (e) {
            if (c6_top >= 100) {
                $('.pic').each(function () {
                src = 'img/' + Math.ceil(Math.random()*4) + '.png';
                    $(this).attr('src',src)
                })
            }
            $('#refresh p').html('更换图片中...');
            c6_top = 0
            e.preventDefault();
            $("#calc_6").animate({'top': c6_top},100);
            
            isMove = false;
    });*/

});