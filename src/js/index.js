document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(function () {

    $('.key').html($('#key').html());

    /*引言*/
    var up = 0;
    var foreword = new Hammer($("#foreword")[0]);
    foreword.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    foreword.on("swipeup", function (e) {
        if (up < 3) {
            up += 1;
            var current = $('#foreword ul li:nth-child(' + up + ')');
            current.addClass('up');
            current.next().find('img').first().delay(800).fadeIn(2000, function () {
                console.log($(this));
            });
        } else if (up == 3) {
            $("#foreword").addClass('up');
        }
    });

    function year(year) {
        var year = parseInt(year);
        if (year > 1900 && year < 2017) {
            return true;
        } else {
            alert('请输入合理的年份！')
        }
    }

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
                if (back.length == 4) {
                    if (year(back)) {
                        calc += 1;
                        $('#calc_2').fadeOut(1000);
                        $('#calc_3').fadeIn(1000);
                    } else {
                        $('#back').val('');
                    }
                }
                break;
            case 3:
                var mother = $('#mother').val();
                if (mother.length == 4) {
                    var father = $('#father').val();
                    if (year(father) && year(mother)) {
                        calc += 1;
                        $('#calc_3').fadeOut(1000);
                        $('#calc_4').fadeIn(1000);
                    } else {
                        $('#mother').val('');
                        $('#father').val('');
                    }
                }
                break;
            case 4:
                var you = $('#you').val();
                if (you.length == 4) {
                    if (year(you)) {
                        calc += 1;
                        $('#calc_4').fadeOut(1000);
                        $('#calc_5').fadeIn(1000);
                    } else {
                        $('#you').val('');
                    }
                }
                break;
            case 5:
                if ($('#count').val()) {
                    calc += 1;
                    $('#calc_5').fadeOut(1000);
                    $('#calc_6').fadeIn(1000);
                    calculator();
                }
                break;
            case 6:
                calc = 1;
                $('#calc_6').fadeOut(1000);
                $('#calc_2').fadeIn(1000);
                $('input').val('');
                break;

            default:
                break;
        }

    });

    /*计算器*/
    $('.num').on('touchstart', function () {
        $(this).addClass('dark');
    });

    $('.num').on('touchend', function () {
        var type = $(this).parent().parent().data('type');
        $(this).removeClass('dark');
        switch (type) {
            case 'back_year':
                if ($('#back').val().length < 4) {
                    var val = $('#back').val() + $(this).data('num');
                    $('#back').val(val);
                }

                break;
            case 'parent_year':
                if ($('#father').val().length < 4) {
                    var val = $('#father').val() + $(this).data('num');
                    $('#father').val(val);
                    /*if (val.length == 4) {
                        alert('请继续输入母亲的出生年份！');
                    }*/
                } else if ($('#mother').val().length < 4) {
                    var val = $('#mother').val() + $(this).data('num');
                    $('#mother').val(val);
                }
                break;
            case 'you_year':
                if ($('#you').val().length < 4) {
                    var val = $('#you').val() + $(this).data('num');
                    $('#you').val(val);
                }
                break;
            case 'back_count':
                if ($('#count').val().length < 3) {
                    var val = $('#count').val() + $(this).data('num');
                    $('#count').val(val);
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
        var father = $('#father').val();
        var mother = $('#mother').val();
        var last_back_home_year = $('#back').val();
        var count = $('#count').val();

        if (isNaN(myself) || isNaN(father) || isNaN(mother) || isNaN(last_back_home_year)) {
            alert('所有输入框都必须填写');
            return false;
        }
        var my_age = current_year - myself; //自己年龄
        var father_age = current_year - father; //父亲年龄
        var mothther_age = current_year - mother; //目前年龄
        var max_age = father_age >= mothther_age ? mothther_age : father_age; //父母年龄最大的

        var age_item = 100 - max_age;
        var time_item = current_year <= last_back_home_year ? 1 : current_year - last_back_home_year;
        console.log(time_item, age_item);

        var time_left = 0;
        if (age_item > 0 && time_item > 0) {
            time_left = (age_item / time_item) * count;
            time_left = time_left <= 0 ? 0 : time_left.toFixed(0);
        }

        var result = time_left + "次"
        $('#result').html(result);
    }

});