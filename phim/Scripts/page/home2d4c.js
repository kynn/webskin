//var promodiag;


$(document).ready(function () {
    //$("#lstFocusFilm .item:first").addClass("active");
    //$("#mainFilm .img").hover(function () { $(".iconPlayL", this).show() }, function () { $(".iconPlayL", this).hide() })

    $("div id*=[foo]").removeClass("lstFilm").removeClass("h500");
    $(".par_foo_slide").each(function () {
        var channel = $(this).attr("cID");

        var timer_foo_show;
        var timer_foo_hide;

        if ($("#foo_view_" + channel + " div[class='img rel']").size() < 5) {
            //HIDE NUT XEM THEM
            $("#xemthem_" + channel).css("display", "none");
            $("#titleLink_" + channel).attr("href", "#");
        }
        else {
            //SHOW-HIDE NEXT PREV
            $("#foo_" + channel).hover(function () {
                timer_foo_show = setTimeout(function () {
                    $("#foo_" + channel + "_prev").fadeIn();
                    $("#foo_" + channel + "_next").fadeIn();
                    clearTimeout(timer_foo_show);
                }, 500);

            }, function () {
                clearTimeout(timer_foo_show);
                $("#foo_" + channel + "_prev").fadeOut();
                $("#foo_" + channel + "_next").fadeOut();
            });
        }

        //SCROLL
        var inittime = 7;

        var fv_itemwidth = $("#foo_view_" + channel + " div[class='img rel']").eq(0).width() + 14;
        var fv_itemsize = $("#foo_view_" + channel + " div[class='img rel']").size() + 1;
        $("#foo_view_" + channel).css("width", (fv_itemwidth * fv_itemsize) + "px");
        $("#foo_" + channel + "_next").bind('mouseenter', function () {
            //Scroll to left
            //console.log('Scroll to left');
            var widthView = $("#foo_view_" + channel).width();
            var le = $("#foo_" + channel).width() - widthView;
            var curleft = parseInt($("#foo_view_" + channel).css("left").replace('pt', '').replace('px', ''));
            if (curleft > le) {
                var dura = (curleft - le) * inittime;
                $("#foo_view_" + channel).animate({ left: (le + 50) + "px" }, dura, 'linear');
            }

        }).bind('mouseleave', function () {
            //Stop
            //console.log('Stop');
            $("#foo_view_" + channel).stop();
        });

        $("#foo_" + channel + "_prev").bind('mouseenter', function () {
            //Scroll to left
            console.log('Scroll to right');
            var curleft = $("#foo_view_" + channel).css("left").replace('px', '');
            console.log(curleft);
            if (curleft < 0) {
                var dura = (curleft * -1) * inittime;
                $("#foo_view_" + channel).animate({ left: "0px" }, dura, 'linear');
            }

        }).bind('mouseleave', function () {
            //Stop
            console.log('Stop');
            $("#foo_view_" + channel).stop();
        });


//        $(".hidden-tip", $(this)).each(function () {
//            var fID = $(this).attr("fID");
//            $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                $(".lstFilm .img").easyTooltip({
                    useElement: "hidden-tip"
                });
//            });
//        });
        $(".iconPlayL", "#foo_" + channel, $(this)).css({ "top": "60px", "left": "35px" });
        $(".img", "#foo_" + channel, $(this)).hover(function () { $(".iconPlayL", this).show() }, function () { $(".iconPlayL", this).hide() });


    });

    $("#home").addClass("active");
    $("#lstBaner").carouFredSel({
        auto: {
            pauseDuration: 10000,
            pauseOnHover: true
        },
        prev: {
            button: "#prevbannerdiv"
        },
        next: {
            button: "#nextbannerdiv"
        }
    });
    $("#prevbannerdiv", this).hide();
    $("#nextbannerdiv", this).hide();
    $(".lstBaner").hover(function () {
        $("#prevbannerdiv", this).show();
        $("#nextbannerdiv", this).show();

    }, function () {
        $("#prevbannerdiv", this).hide();
        $("#nextbannerdiv", this).hide();

    });
    $("#lstBaner").each(function () {
//        $(".hidden-tip", $(this)).each(function () {
//            var fID = $(this).attr("fID");
//            $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                $(".img").easyTooltip({
                    useElement: "hidden-tip"
                });
//            });
//        });
    });

    $("#lstFocusFilm").carouFredSel({
        width: 258,
        circular: true,
        infinite: true,
        auto: false,
        scroll: {
            items: 5
        },
        prev: {
            button: ".iconPrevS",
            key: "left"
        },
        next: {
            button: ".iconNextS",
            key: "right"
        }
    });

    //    $("#lstFocusFilm .poster").bind("click", function () {
    //        var item = $(this).parent();
    //        var html = $(".infoHide", $(item)).html();
    //        $("#lstFocusFilm .item").removeClass("active");
    //        $(item).addClass("active");
    //        $(".mainFilm").html(html).fadeIn(function () {
    //            $("#mainFilm .img").hover(function () { $(".iconPlayL", this).show() }, function () { $(".iconPlayL", this).hide() })
    //        });
    //    });


});
