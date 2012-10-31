var timer_mainmenu;
var settingwindows;
function openSettingWindow(url) {
    settingwindows.load(url).dialog('open');
}
function openMessageWindow(html) {
    settingwindows.html(html).dialog('open');
}
function closeSettingWindow() {
    settingwindows.dialog("close");
    settingwindows.dialog("destroy");
}
function saveSetting() {
    var isAutoRegis = $("#chkRegisAuto").attr("checked");
    $.post("/ajaxload/useraction.aspx", { a: "sst", type: "1", value: isAutoRegis }, function (retval) {
        if (retval == 3)
            alert("Đăng nhập để thực hiện chức năng này");
    });
    closeSettingWindow();
}

var linkdownloadWin = "http://hdplayer.vcmedia.vn/bin/soha-suite-installer_phim.exe";
//var linkdownloadWin = "http://tracker.vcmedia.vn/HDPlayer/SohaInstaller.exe";
var linkdownloadMac = "http://tracker.vcmedia.vn/HDPlayer/Test/SohaPlayer-MacOS-1.0.12.0316.pkg";
function downloadPlayer(redirectUrl, guidValue) {
    if (navigator.appVersion.indexOf("Mac") != -1) {
        downloadplayer(linkdownloadMac);
    }
    else {
        downloadplayer(linkdownloadWin);
    }
    if (redirectUrl != "") {
        window.location.href = redirectUrl;
    }
    if (guidValue != null) {
        logCame(guidValue);
    }
}
function downloadplayer(url) {
    var popupwin = window.open(url);
}
function logCame(guidValue) {
    var camValue = getURLParameters("cam");
    var cookieValue = null;
    try {
        cookieValue = Get_Cookie("cam_sohaphim").toString();
    } catch (e) {
    }

    if (cookieValue == null && guidValue != "") {
        $.ajax({
            type: "POST",
            url: "/ajaxload/logCam.aspx",
            data: "keyValue=" + guidValue + "&camValue=" + camValue,
            timeout: 15000,
            success: function (retval) {
                SetCookie("cam_sohaphim", guidValue, 28);
            }
        });
    }
}
function getURLParameters(paramName) {
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0) {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);
        var i = 0;
        for (i = 0; i < arrURLParams.length; i++) {
            var sParam = arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i = 0; i < arrURLParams.length; i++) {
            if (arrParamNames[i] == paramName) return arrParamValues[i];
        }

    }
    return null;
}


$(function () {
    var _height = $(document).height();
    if (_height >= 1200) {
        $("body").removeClass().addClass("two");
    }
    else {
        $("body").removeClass().addClass("one");
    }
    var winWidth = $(window).width();
    if (winWidth < 1000) {
        $(".navSoha").css("position", "static");
    }

    $('#page_header1_txtMainSearch').each(function () {
        $(this).data("txt", $.trim($(this).val()));
    }).focus(function () {
        if ($.trim($(this).val()) === $(this).data("txt")) {
            $(this).val("");
            $(this).css({ "color": "#fff", "font-style": "normal", "font-weight": "bold" });
        }
    }).blur(function () {
        if ($.trim($(this).val()) === "") {
            $(this).val($(this).data("txt"));
            $(this).css({ "color": "#e9e9e9", "font-style": "italic", "font-weight": "normal" });
        }
    });

    $('html').click(function () {
        $('#pnFun').hide();
        $('#pnFun_getinfo').hide();
        $("#mingpanel .subMenuContent").hide();
    });

    $("#btnArrDownSocial").click(function (event) {
        $('#pnFun').hide();
        $("#mingpanel .subMenuContent").hide();
        $('#pnFun_getinfo').hide();
        $("#subMenuContentSocial").toggle();
        event.stopPropagation();
    });

    $('#btnArrDown').click(function (event) {
        $('#pnFun_getinfo').hide();
        $("#mingpanel .subMenuContent").hide();
        $('#pnFun').toggle();
        event.stopPropagation();
    });

    $('#btnArrowDown_getinfo').click(function (event) {
        $('#pnFun').hide();
        $("#mingpanel .subMenuContent").hide();
        $('#pnFun_getinfo').toggle();
        event.stopPropagation();
    });

    $(".menu a").removeClass("active");
    var catID = $("input[id*=hidCatID]").val();
    if (catID == 15) {
        $(".menu a:eq(1)").addClass("active");
    }
    else if (catID == 100) {
        $(".menu a:eq(0)").addClass("active");
    }


    $('.search a').click(function () {
        searchFilm();
    });
    $('.search input').keypress(function (e) {
        if (e.which == '13') {
            searchFilm();
            return false;
        }
    });
    //    $(".dvGuide").each(function () {
    //        $(this).hover(function() {
    //            $(".dvGuide").removeClass("active");
    //            $(this).addClass("active");
    //            $(this).children().css("display", "block");
    //        }, function() {
    //            $(".subMenuContent").hide();
    //            $(".dvGuide").removeClass("active");
    //        });
    //    });
    $(".dvGuide").each(function () {
        $(this).click(function () {
            var dvguide = $(this);
            var subobj = $(dvguide).children(".subMenuContent");
            $(subobj).show();


            var mid = $(dvguide).attr("mid");
            if (mid != undefined) {

                var dvreturn = $("div[cid='0" + mid + "']");
                if (navigator.userAgent.indexOf('MSIE 9.0') != -1) {
                    switch (mid) {
                        case "5":
                            $("#div_menu_le").css("left", "-184px");
                            break;
                        case "6":
                            $("#div_menu_bo").css("left", "-286px");
                            break;
                    }
                }
                $.ajax({
                    type: "GET",
                    url: "/ajaxload/load_menu_phim.aspx?menu=" + mid,
                    cache: true,
                    success: function (data) {
                        $(dvreturn).html(data);
                        $(dvguide).removeAttr("mid");
                    }
                });
            }
        });
        $(this).hover(function () {
            $(".dvGuide").removeClass("active");
            $(this).addClass("active");

            //            var dvguide = $(this);
            //            timer_mainmenu = setTimeout(function () {
            //               
            //            }, 250);
        }, function () {
            //clearTimeout(timer_mainmenu);
            $(".subMenuContent").hide();
            $(".dvGuide").removeClass("active");
        })
    });

    //    $(".dvGuide2").hover(function () {
    //        timer_mainmenu = setTimeout(function () {
    //            $(".subMenuContent2").show();
    //        }, 250);
    //    }, function () {
    //        clearTimeout(timer_mainmenu);
    //        $(".subMenuContent2").hide();
    //    });

    $('html').click(function () {
        $('#pnFun').hide();
        $('#pnFun_getinfo').hide();
        $(".dvGuide_TBF .subMenuContent").hide();
    });

    settingwindows = $("#settingwindows").dialog({ modal: true, closeOnEscape: true, resizable: false, width: 455, height: 240, draggable: false, autoOpen: false, closeText: '', zIndex: 3999,
        /* Scrollbar fix  */
        open: function (event, ui) { $('body').css('overflow', 'hidden'); $('.ui-widget-overlay').css('width', '100%'); },
        close: function (event, ui) { $('body').css('overflow', 'auto'); }
    });
    //    $("body").ajaxComplete(function () {
    //        mesVip = $("div[id*=lblMesVip]").html();
    //        if (mesVip != "") {
    //            var html = '<div class="clear over"><p class="deRed"></p><h2 class="cat"><a href="#">Thông báo</a></h2></div>';
    //            html += '<div class="border ntBor m0 p10_20 bgreport lh18">' + mesVip + '</div>';
    //            settingwindows.html(html).dialog('open');
    //        }
    //    })
    var isSPVip = $("input[id*=hidIsSPVip]").val();
    if (isSPVip == 0) {
        promodiag = $("#openpopwindows").dialog({ modal: true, closeOnEscape: true, resizable: false, width: 868, height: 751, draggable: false, autoOpen: false, closeText: '', zIndex: 9999, close: function (event, ui) {
            SetCookieH("hasSeePromo", "1", 1);
        }
        });
        if ($('#popuppromo1_openorder').val() == "1") {
            promodiag.dialog('open');
        }
    }


    //end of load completed page
});




/*TBF - Thong bao Film */
function mark_as_read(obj, url) {
    $.ajax({
        type: "GET",
        //url: "/ajaxload/mark_as_read.aspx?notiid=" + obj,
        url: "/ajaxload/mark_as_read.aspx",
        data: "",
        timeout: 15000,
        success: function (retval) {
            if (retval == "1" || retval == "2") {
                return false;
            }
            else if (retval == "0") {
                if (url != "")
                    window.location.href = url;
                else {
                    if (obj == 0) {
                        $("div[id*='div_TBF_']").removeClass("active");
                        $("#notify_num_TBF").hide();
                    }
                    else {
                        $("#div_TBF_" + obj).removeClass("active");
                        reduce_num_notify();
                    }
                }
            }
        },
        error: function (xhr, status) {
            return false;
        }
    });
}
function mark_read_client(obj) {
    $("#" + obj).removeClass("active");
}
function crease_num_notify() {
    var obj = $("#notify_num_TBF").html();
    obj = parseInt(obj) + 1;
    $("#notify_num_TBF").html(obj).show();
}
function reduce_num_notify() {
    var obj = $("#notify_num_TBF").html();
    obj = parseInt(obj) - 1;
    if (obj < 1) {
        obj = 0;
        $("#notify_num_TBF").hide();
    }
    else
        $("#notify_num_TBF").html(obj);
}
function move_temp(temp) {
    var title = $(".sub_TBF .subtitle_TBF");
    $(".sub_TBF .subtitle_TBF").remove();
    $(".sub_TBF").prepend(temp);
    $(".sub_TBF").prepend(title);
    if ($(".sub_TBF").children().size() > 7) {
        $(".sub_TBF").children().eq($(".sub_TBF").children().size() - 2).remove();
    }
}


function fixFloat(perRow, divBound, ItemBound) {
    $("div[class=clear]", $(divBound)).remove();
    $(ItemBound, $(divBound)).each(function () {
        index = $(ItemBound, $(divBound)).index($(this));
        if ((index) % perRow == 0) {
            $(this).before("<div class='clear'></div>");
        }
        if ((index) % perRow == (perRow - 1)) {
            $(this).css("margin-right", "0px");
        }
    })
}


function toogleLight(obj) {
    if ($(obj).hasClass("lightOn")) {
        $(obj).removeClass("lightOn");
        $(obj).addClass("lightOff");
        $("#lightPanel").height($(document.body).height());
        $("#lightPanel").fadeOut();
    }
    else {
        $(obj).removeClass("lightOff");
        $(obj).addClass("lightOn");
        $("#lightPanel").height($(document.body).height());
        $("#lightPanel").fadeIn();
    }
}
function searchFilm() {
    var keysearch = $("input[id*=txtMainSearch]").val();
    if (keysearch != "Tìm kiếm" || keysearch == "") {
        if (keysearch == '18' || keysearch == '18+') {
            window.location = 'http://phim.soha.vn/searchs/1/18/18.html';
        }
        else {
            $.post("/searchRedirect.aspx", { keyword: keysearch }, function (e) {
                window.location = e;
            });
        }
    }
}
function trim(str) {
    if (!str || typeof str != 'string')
        return null;

    return str.replace(/^[\s]+/, '').replace(/[\s]+$/, '').replace(/[\s]{2,}/, ' ');
}
function updateUserCoins(coins) {
    $("#page_header1_userCoins").fadeOut(function () {
        $(this).html(coins).fadeIn();
    });
}

function bb_setHomepage(obj) {
    if (document.all) {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage('http://phim.soha.vn/');
    }
    else {
        alert("Kéo Logo Sohaphim vào nút Home để đặt Sohaphim làm trang chủ");
    }
}

function bb_bookmarksite(title, url) {
    if (document.all)
        window.external.AddFavorite(url, title);
    else if (window.sidebar)
        window.sidebar.addPanel(title, url, "")
}

function LoadPhimNenXem() {
    $.ajax({
        type: "GET",
        url: "/ajaxload/phimbannenxem.aspx",
        success: function (retval) {
            $("#HDRecomment").html(retval);
            $(".item:odd", $("#HDRecomment")).addClass("odd");
            $(".hidden-tip", $("#HDRecomment")).each(function () {
                var fID = $(this).attr("fID");
                $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                    $(".lstXepHang .bound").easyTooltip({
                        useElement: "hidden-tip"
                    });
                })
                $(".lstXepHang .iconPlayS").css({ "top": "45px", "left": "30px" });
                $(".lstXepHang .bound").hover(function () { $(".iconPlayS", this).show() }, function () { $(".iconPlayS", this).hide() });
            });

        }
    });
}
function LoadTheSameCat() {
    var elem = $("#sameCat");
    var catID = $("input[id*=hidCatID]").val();
    $(elem).html('<div class="loading1"></div>')
    if (catID > 0 || catID.indexOf(',') > -1) {
        $.ajax({
            type: "GET",
            url: "/ajaxload/thesamecat_hd.aspx",
            data: "id=" + catID,
            success: function (retval) {
                $(elem).html(retval);
                $(".hidden-tip", $(elem)).each(function () {
                    var fID = $(this).attr("fID");
                    $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                        $(".img", $(elem)).easyTooltip({
                            useElement: "hidden-tip"
                        });
                    })
                })
                fixFloat(5, $("#sameCat"), $(".trigger"));
            }
        });
    }
}

function LoadTheSameCat2() {
    var elem = $("#sameCat");
    var catID = $("input[id*=hidCatID]").val();
    $(elem).html('<div class="loading1"></div>')
    if (catID > 0 || catID.indexOf(',') > -1) {
        $.ajax({
            type: "GET",
            url: "/ajaxload/thesamecat_hd2.aspx",
            data: "id=" + catID,
            success: function (retval) {
                $(elem).html(retval);
                $(".hidden-tip", $(elem)).each(function () {
                    var fID = $(this).attr("fID");
                    $(".img", $(elem)).easyTooltip({
                        useElement: "hidden-tip"
                    });
                })
                fixFloat(5, $("#sameCat"), $(".trigger"));
            }
        });
    }
}

function LoadTapFilmMoi(channel, page) {
    var elem = $("#tapfilmmoi");
    //$(elem).append('<div class="loading3 imgborder cP fontbold">Loading</div>');
    $.ajax({
        type: "GET",
        url: "/ajaxload/tapfilmhdmoi.aspx",
        data: "page=" + page,
        success: function (retval) {
            $(elem).html(retval);
            var _total = $("#totalpage", elem).val();
            $(".pageingpanel", $(elem)).pager({ 'channel': channel, 'totalPage': _total, 'pageindex': page, 'nameFunc': 'LoadTapFilmMoi' });
            $(".item:odd", $(elem)).addClass("odd");

            $(".hidden-tip", $(elem)).each(function () {
                var fID = $(this).attr("fID");
                $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                    $(".lstXepHang .img").easyTooltip({
                        useElement: "hidden-tip"
                    });
                })
            })
            $(".lstXepHang .img").hover(function () { $(".iconPlayS", this).show() }, function () { $(".iconPlayS", this).hide() });

        }
    });
}

function addtowatchlist(shpid, filmid, filmtype, objectcontrol) {
    $.post("/ajaxload/addwatch.aspx", { shpid: shpid, filmid: filmid, filmtype: filmtype }, function (retval) {
        if (retval == "0") {
            sysNotification("Bạn hãy đăng nhập để thực hiện chức năng này", "center", "error", false);
        }
        else if (retval == "-1") {
            sysNotification("Phim này đã có trong thư viện của bạn", "center", "error", false);
        }
        else {
            try {
                sysNotification("Phim đã được thêm vào thư viện của bạn.", "top-right", "default", false);
                $(objectcontrol).addClass("btndis");
                var _value = parseInt($("#page_header1_lblTotalFilms").text());
                $("#page_header1_lblTotalFilms").text((_value + 1));
            }
            catch (er) { }
        }
    });
}
function getFilmSource(filmId, page, container) {
    $("#" + container).html('<div class="loading1"></div>')
    $("#" + container).load("/ajaxload/filmsources.aspx?id=" + filmId + "&p=" + page, function () { });
}
function loadHotToDay(chanel, page) {
    var elem = $("#filmhot");
    //$(elem).append('<div class="loading2 imgborder cCy bold">Loading</div>');
    $.ajax({
        type: "GET",
        url: "/ajaxload/hotToday.aspx",
        data: "page=" + page,
        success: function (retval) {
            $(elem).html(retval);
            var _total = $("#totalpage", elem).val();
            $(".pageingpanel", $(elem)).pager({ 'channel': chanel, 'totalPage': _total, 'pageindex': page, 'nameFunc': 'loadHotToDay' });

            //            var curPage = $(".pageingpanel a.active", $(elem)).text();
            //            $(".item", $(elem)).each(function (index) {
            //                var stt = (curPage - 1) * 5 + index + 1;
            //                $(".stt", $(this)).text(stt);
            //                if (stt <= 2)
            //                    $(".stt", $(this)).addClass("sttG");
            //                else
            //                    $(".stt", $(this)).addClass("sttB");
            //            })

            $(".hidden-tip", $(elem)).each(function () {
                var fID = $(this).attr("fID");
                $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                    $(".lstXepHang .img").easyTooltip({
                        useElement: "hidden-tip"
                    });
                })
            })
        }
    });
}
function loadInfo(fid) {
    $.get("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
        $("." + options.useElement, $(this)).html(ret);
    });
}

function sysNotification(mesg, position, theme, sticky) {
    $.jGrowl(mesg, {
        sticky: sticky,
        position: position,
        theme: theme,
        life: 3000
    });
}

function sysNotiFilm(mesg) {
    crease_num_notify();
    sysNotification(mesg, "bottom-left", "default", false);
    move_temp(mesg);
}

(function ($) {
    $.fn.pager = function (settings) {
        var defaults = {
            type: 'number',
            totalPage: 1,
            pageindex: 1,
            channel: 1,
            nameFunc: 'displayVideoEventChannelSub',
            templateNumber: '<a href="javascript:void(0)" onclick="{nameFunc}({channel},{page})">{page}</a>',
            templateSelectNumber: '<a href="javascript:void(0)" class="active">{page}</a>',
            template3dot: "<a href='javascript:void(0)' class='disable'>...</a>",
            templateNext: "<a href='javascript:void(0)' onclick='{nameFunc}({channel},{pageNext})' class='next'></a>",
            templateDisNext: "<a href='javascript:void(0)' class='disable next'></a>",
            templatePre: "<a href='javascript:void(0)' onclick='{nameFunc}({channel},{pagePrev})' class='prev'></a>",
            templateDisPre: "<a href='javascript:void(0)' class='disable prev'></a>"
        };

        var settings = $.extend(defaults, settings);

        return this.each(function () {
            obj = $(this);
            if (settings.type == 'number') {
                var strPaging = "";
                if (settings.totalPage < 10) {
                    for (var i = 1; i <= settings.totalPage; i++) {
                        if (i == settings.pageindex)
                            strPaging += settings.templateSelectNumber.replace(/{page}/g, i);
                        else
                            strPaging += settings.templateNumber.replace(/{page}/g, i);
                    }
                }
                else {
                    if (settings.pageindex < 5) {
                        for (var i = 1; i <= 10; i++) {
                            if (i == settings.pageindex)
                                strPaging += settings.templateSelectNumber.replace(/{page}/g, i);
                            else
                                strPaging += settings.templateNumber.replace(/{page}/g, i);
                        }
                        strPaging += settings.template3dot;
                        strPaging += settings.templateNumber.replace(/{page}/g, settings.totalPage - 1);
                        strPaging += settings.templateNumber.replace(/{page}/g, settings.totalPage);

                    }
                    else {
                        var temp = 0;
                        if (settings.totalPage > parseInt(settings.pageindex) + 5)
                            temp = parseInt(settings.pageindex) + 5;
                        else
                            temp = settings.totalPage;

                        if (settings.pageindex >= 7) {
                            strPaging += settings.templateNumber.replace(/{page}/g, 1);
                            strPaging += settings.templateNumber.replace(/{page}/g, 2);
                            strPaging += settings.template3dot;
                        }
                        for (var i = (settings.pageindex - 4); i < temp; i++) {
                            if (i == settings.pageindex)
                                strPaging += settings.templateSelectNumber.replace(/{page}/g, i);
                            else
                                strPaging += settings.templateNumber.replace(/{page}/g, i);
                        }
                        if (settings.totalPage > (settings.pageindex + 5)) {
                            strPaging += settings.template3dot;
                            strPaging += settings.templateNumber.replace(/{page}/g, settings.totalPage - 1);
                            strPaging += settings.templateNumber.replace(/{page}/g, settings.totalPage);
                        }

                    }
                }

                var bla = "";
                if (settings.pageindex == 1) {
                    if (settings.totalPage > 1)
                        bla = settings.templateDisPre + strPaging + settings.templateNext;
                    else
                        bla = settings.templateDisPre + strPaging + settings.templateDisNext;
                }
                else if (settings.pageindex == settings.totalPage)
                    bla = settings.templatePre + strPaging + settings.templateDisNext;
                else
                    bla = settings.templatePre + strPaging + settings.templateNext;

                bla = bla.replace(/{nameFunc}/g, settings.nameFunc).replace(/{channel}/g, settings.channel).replace(/{pagePrev}/g, (settings.pageindex - 1)).replace(/{pageNext}/g, (settings.pageindex + 1));
                $(this).html(bla + '<div class="clear"></div>');
            }
        })
    }

})(jQuery);
function testopenLoginWindow() {
    var _width = 550;
    var Xpos = ((screen.availWidth - _width) / 2);
    var _height = 500;
    var Ypos = ((screen.availHeight - _height) / 2);
    window.open('/lib.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);
}
function OpenPay() {
    SetCookie('beforepay_url', window.location.href, 1);
    //popup('/payment/pays.aspx');     //cũ  
    popup('/pay/payment/pays.aspx');       //mới
}

function popup(url) {
    var _width = 710;
    var Xpos = ((screen.availWidth - _width) / 2);
    var _height = 750;
    var Ypos = ((screen.availHeight - _height) / 2);
    window.open('/pay/payment/Pays.aspx', '', 'width=' + _width + ',height=' + _height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + Xpos + ',screenY=' + Ypos);

    //    var width = 710;
    //    var height = 750;
    //    var left = (screen.width - width) / 2;
    //    var top = (screen.height - height) / 2;
    //    
    //    window.open("/payment/Pay.aspx", 'Phim.soha.vn', 'width=' + width + ',height=' + height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + left + ',screenY=' + top);
    //    var newwin = window.open(url, 'Phim.soha.vn', 'width=' + width + ',height=' + height + ',toolbar=no,resizable=fixed,status=no,scrollbars=no,menubar=no,screenX=' + left + ',screenY=' + top);
    //    if (window.focus) { newwin.focus() }
    //return false;
}

$.fn.sameHeights = function () {

    $(this).each(function () {
        var tallest = 0;

        $(this).children().each(function (i) {
            if (tallest < $(this).height()) { tallest = $(this).height(); }
        });
        $(this).children().css({ 'height': tallest });
    });
    return this;
};
$.fn.groupItem = function (pPerDiv) {
    var pArrLen = $(this).size();
    for (var i = 0; i < pArrLen; i += pPerDiv) {
        $(this).filter(':eq(' + i + '),:lt(' + (i + pPerDiv) + '):gt(' + i + ')').wrapAll('<div class="wrapBound" />');
    }
    $(".wrapBound").sameHeights();
};
function toogleMore(obj) {
    var curClass = $.trim($(obj).prev().attr("class"));
    if (curClass == "limitText") {
        $("#pnInfoFilm").removeClass("limitText").addClass("fullText");
        $(obj).text("Thu gọn");
    } else {
        $("#pnInfoFilm").removeClass("fullText").addClass("limitText");
        $(obj).text("Xem thêm");
    }

}
function checkAction() {
    $.ajax({
        type: "GET",
        url: "/ajaxload/sso.aspx",
        data: "",
        timeout: 15000,
        success: function (retval) {
            if (retval == "1") {
                return false;
            }
            else if (retval == "0") {
                window.location.href = 'http://phim.soha.vn/ssosignout.aspx';
            }
        },
        error: function (xhr, status) {
            return false;
        }
    });
}
function sysNoti_xemsau(mesg) {
    //crease_num_notify();
    sysNotification(mesg, "bottom-left", "default", false);
}
function getInfoStar(star) {
    if ($('div.star_hidden_tip[star="' + star + '"]').html().indexOf('http://phim.soha.vn/images/loading.png') > -1) {
        $.ajax({
            type: "GET",
            url: "/ajaxload/popupStar.aspx?star=" + star,
            success: function (retval) {
                if ($.trim(retval) != '') {
                    //alert('jheh');
                    $('div.star_hidden_tip[star="' + star + '"]').html(retval);
                    $('div.star_hidden_tip[star="' + star + '"]').parent(".boundStar").easyTooltip({
                        useElement: "star_hidden_tip",
                        tooltipId: 'star_easyTooltip'
                    });
                    $('div.star_hidden_tip[star="' + star + '"]').css('width', '130px');
                }
                else
                    $('div.star_hidden_tip[star="' + star + '"]').css('display', 'none');
            }
        });
    }
}
$(function () {
    if ($("#userEmail").html() != null && $.trim($("#userEmail").html().toString()) == "") $(".divWatchLate").html('');
    $(".btnXemSau").click(function () {
        addtolib($(this));
    });
});

function addtolib(btnXemSau) {

    if ($(btnXemSau).attr("shpid") == -1) {
        sysNoti_xemsau("Đã có trong thư viện của bạn!");
    }
    else {
        $.ajax({
            type: "POST",
            url: "/ajaxload/addwatch.aspx",
            data: "&shpid=" + $(btnXemSau).attr("shpid") + "&filmtype=" + $(btnXemSau).attr("filmtype"),
            timeout: 10000,
            success: function (retval) {
                if (retval > 0) {

                    //them dong vao thu vien
                    var tv_id = $(btnXemSau).attr("shpid");
                    var tv_url = $(btnXemSau).parent().parent().find('a').attr("href").split('.html');
                    var tv_img = $(btnXemSau).parent().parent().parent().find('img[class="imgnone"]').attr("src");

                    //get_lib_comm
                    var str = get_lib_comm(tv_id, retval, tv_url[0], tv_img);

                    var chanel_tv = $(".menu_thuvien_foo_slide").attr("cid");
                    if (chanel_tv) {
                        $("#foo_view_" + chanel_tv).prepend(str);
                        var tv_itemsize = $("#foo_view_" + chanel_tv + " div[class='img rel']").size() + 1;
                        $("#foo_view_" + chanel_tv).css("width", parseInt($("#foo_view_" + chanel_tv).css("width").replace("px")) + 144 + "px");
                        var hiddentip = $('.hidden-tip[fid="' + tv_id + '"]', $(".menu_thuvien_foo_slide"));
                        $(hiddentip).each(function () {
                            var fID = $(this).attr("fID");
                            $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                                $(this).parent().easyTooltip({
                                    useElement: "hidden-tip"
                                });
                            });
                        });
                        var iconplayL = $(hiddentip).parent().find(".iconPlayL");
                        $(iconplayL).css({ "top": "60px", "left": "35px" });
                        $(hiddentip).parent().hover(function () { $(iconplayL).show() }, function () { $(iconplayL).hide() });
                    }
                    //end them dong vao thu vien

                    sysNoti_xemsau("Đã thêm vào thư viện của bạn!");
                    $(btnXemSau).attr("shpid", "-1");
                }
                else if (retval == -1) {
                    sysNoti_xemsau("Đã có trong thư viện của bạn!");
                }
            },
            error: function (retval) {
                $(btnXemSau).attr("shpid", "-1");
            }
        });
    }
}

function get_lib_comm(filmId, libId, url, film_thumb) {
    var strResult = "";
    var tempHtml = '<div style="border-bottom: none;padding-bottom:14px;" class="item rel fix_item">\
                                            <div class="img rel">\
                                                <a href="[url]">\
                                                    <img src="[filmCropThumb]" width="130" height="187" onerror="this.src=http://phim.soha.vn/images/404_thumb_film.jpg;" class="imgnone"/>\
                                                    <span class="iconPlayL"></span>\
                                                </a>\
                                                <div class="hidden-tip" fID="[filmId]"></div>\
                                            </div>\
                                            <a class="btnDeleteLib2" data-value="[libId]" href="javascript:void(0)" onclick="removeFilm(this);">\
                                                <b style="color:red">[X]</b>\
                                                Xóa khỏi thư viện\
                                            </a>\
                                    </div>';

    var str = tempHtml.replace('[url]', url + '.html');
    str = str.replace('[filmCropThumb]', film_thumb);
    str = str.replace('[filmId]', filmId);
    str = str.replace('[libId]', libId);
    strResult += str;

    return strResult;
}
var URPopup;
$(function () {
    if ($(".UserRequest").html() != null) {
        $("body").append('<div id="URBtnOpen" class="rotate">Yêu cầu phim</div>');
        URPopup = $(".UserRequest").dialog({ modal: true, closeOnEscape: true, resizable: false, width: 450, height: 500, draggable: false, autoOpen: false, closeText: '', zIndex: 3999 });

        $("#URBtnOpen").click(function () {
            URPopup.dialog('open');
        });
        $("#URContent").click(function () {
            if ($(this).val() == "Nhập nội dung yêu cầu") $(this).val("");
        });
        $("#URBtnSend").click(function () {
            if ($("#URContent").val() != "" && $("#URContent").val() != "Nhập nội dung yêu cầu") {
                $("#URbtnLoadding").show();
                $.ajax({
                    type: "POST",
                    url: "/ajaxload/UserRequest.aspx",
                    data: "&content=" + $("#URContent").val() + "&text=" + $("input[id*='txtcaptcha']").val(),
                    timeout: 10000,
                    success: function (retval) {
                        if (retval == 1) {
                            $("#URbtnLoadding").hide();
                            alert('Cảm ơn bạn đã gửi yêu cầu đến Soha Phim!');
                            URPopup.dialog('close');
                            window.location.reload();
                        }
                        else if (retval == -1) {
                            alert('Bạn nhập sai mã bảo vệ rồi!');
                        }
                        else if (retval == -2) {
                            alert('Bạn cần đăng nhập để gửi yêu cầu!');
                        }
                        else alert('Oh. Đã có lỗi xảy ra! Bạn thử nhấn nút Gửi ý kiến lại lần nữa xem!');
                    },
                    error: function () {
                        alert('Oh. Đã có lỗi xảy ra! Bạn thử nhấn nút Gửi ý kiến lại lần nữa xem!');
                    }
                });
            } else alert("Bạn chưa viết yêu cầu kìa!");
        });
    }
});

function strReplace(str) {
    var l;
    var from = "àáäâặảậẫấèéềëêệếểễìíïîòóöôỏơờộớọồợỗổốùúüûủñç ưữăầụỉứửạÚỹẻÁẢÂ:ỷđĐ";
    var to = "aaaaaaaaaeeeeeeeeeiiiiooooooooooooooouuuuunc-uuaauiuauuyeaaa-ydD";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.toLowerCase().replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return str.replace('+', '');
}
function strExtractString(str, limit) {
    if (str.toString().length > limit)
        return str.toString().substr(0, limit) + "...";
    else
        return str.toString();
}

function completeVideo() {
    var currentEPS = $("#lblHdEps a.active");
    var nextEPS = $(currentEPS).next();
    var lnkNextEPS = $(nextEPS).attr("href");
    var clsNextEPS = $(nextEPS).attr("class");
    if (lnkNextEPS != null && clsNextEPS != "disable")
        window.location.href = lnkNextEPS;
}
function LoadTop_Phim_Hot(elem) {
    $.ajax({
        type: "GET",
        url: "/ajaxload/top_film_hot.aspx",
        success: function (retval) {
            $(elem).html(retval);

            $(".item:odd", $(elem)).addClass("odd");
            $(".hidden-tip", $(elem)).each(function () {
                var fID = $(this).attr("fID");
                $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
                    $(".lstXepHang .img").easyTooltip({
                        useElement: "hidden-tip"
                    });
                });
            });
        }
    });
}
function load_xem_thu_hd(elem, title) {
    $.ajax({
        type: "GET",
        url: "/ajaxload/xem_thu_hd_box.aspx",
        success: function (retval) {
            $(elem).html(retval);
            if (title)
                $(elem).prepend(title);
        }
    });
}
$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});
$(function () {
    var s = $.getUrlVar('s');
    if (s != undefined)
        SetCookie("sourceRefer", s, 30);
});
function addImgTag(fid) {
    $("div[fid='" + fid + "']").each(function (index) {
        var a = $(this).parent(":first").find("a:first");
        if (a.has("span[class='free']").length == 0) {
            a.append("<span class='free'></span>");
        }
    });
}
function addTag(fid) {
    $("div[fid='" + fid + "']").each(function (index) {
        var fType = $(this).find("#lblInfoHD [class='sButR']").text();
        var a = $(this).parent().parent().find("a:last");
        //console.log(this, fType);
        if (fType != "HD" && fType != "" && a.find("span[class='sButR p2_5 font14']").length == 0)
        //if (a.find("span[class='sButR p2_5 font14']").length == 0)
            a.prepend("<span class='sButR p2_5 font14'>" + fType + "</span>");
    });
}
function get_comment(cid, ctype, element) {
    var currentDate = new Date();
    $.ajax({
        type: "GET",
        url: "/ajaxload/comment.aspx?id=" + cid + "&t=" + ctype + "&dummy=" + currentDate,
        success: function (retval) {
            $(element).html(retval);
        }
    });
}
function get_subcomment(cid, ctype, element) {
    var currentDate = new Date();
    $.ajax({
        type: "GET",
        url: "/ajaxload/comment_sub.aspx?id=" + cid + "&t=" + ctype + "&dummy=" + currentDate,
        success: function (retval) {
            $(element).html(retval);
        }
    });
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function like_this_film(element) {
    var f = $(element).attr("ref");
    if (f > 0) {
        var t = 1;
        if ($(element).attr("class").indexOf("btn_unlike_film") > -1)
            t = 0;
        $.ajax({
            type: "GET",
            url: "/ajaxload/like_this_film.aspx?t=" + t + "&f=" + f,
            success: function (retval) {
                if (retval == '0') {
                    openLoginWindow();
                }
                else if (retval == '-1') {
                    sysNotification("Bạn vui lòng chờ 10 phút để thực hiện lại thao tác này!", "bottom-left", "error", false);
                }
                else {
                    $(element).attr("ref", "0");
                    $(element).attr("class", $(element).attr("class") + "_active");

                    if (t == 1) {
                        $('.bar_like').attr("ref", parseInt($('.bar_like').attr("ref")) + 1);

                        var cls = 'btn_unlike_film';
                        if ($('a[class*="' + cls + '"]').attr('ref') == '0') {
                            $('.bar_unlike').attr("ref", parseInt($('.bar_unlike').attr("ref")) - 1);
                            $('a[class*="' + cls + '"]').attr("ref", "0");
                            $('a[class*="' + cls + '"]').attr("class", cls);
                        }
                        //$(".btn_unlike_film").attr("ref", "0");
                        //$(".btn_unlike_film").attr("class", $(".btn_unlike_film").attr("class") + "_disable");
                    }
                    else {
                        $('.bar_unlike').attr("ref", parseInt($('.bar_unlike').attr("ref")) + 1);

                        var cls = 'btn_like_film';
                        if ($('a[class*="' + cls + '"]').attr('ref') == '0') {
                            $('.bar_like').attr("ref", parseInt($('.bar_like').attr("ref")) - 1);
                            $('a[class*="' + cls + '"]').attr("ref", "0");
                            $('a[class*="' + cls + '"]').attr("class", cls);
                        }

                        //$(".btn_like_film").attr("ref", "0");
                        //$(".btn_like_film").attr("class", $(".btn_like_film").attr("class") + "_disable");
                    }

                    gen_bar_likefilm();

                    set_like_num();
                }
            }
        });
    }
    else {
        if ($(element).attr('class').indexOf('_active') == -1)
            sysNotification("Bạn vui lòng chờ 10 phút để thực hiện lại thao tác này!", "bottom-left", "error", false);
    }
}
function set_like_num() {
    var like = parseInt($('.bar_like').attr('ref'));
    var unlike = parseInt($('.bar_unlike').attr('ref'));

    if (like > 0)
        $('#div_num_like').html(like + " người thích");
    if (unlike > 0)
        if (like > 0)
            $('#div_num_like').html($('#div_num_like').html() + ", " + unlike + " người không thích");
        else
            $('#div_num_like').html(unlike + " không thích");
}

function gen_bar_likefilm() {
    var like = parseInt($('.bar_like').attr('ref'));
    var unlike = parseInt($('.bar_unlike').attr('ref'));
    var wf = 267;
    if (like == 0 && unlike == 0)
        return;

    if (like > 0) {
        wl = wf * like / (like + unlike);
        wd = wf - wl;
        $('.bar_like').width(wl);
        $('.bar_unlike').width(wd);
        if (wd == 0) wd = 6;
        $('.bar_unlike').width(wd);
        $('.bar_unlike').css('background-position', '-' + (75 + (wf - wd)) + 'px -81px');
    }
    else {
        $('.bar_like').width(6);
        $('.bar_unlike').width(wf);
        $('.bar_unlike').width(wf);
        $('.bar_unlike').css('background-position', '-' + 75 + 'px -81px');
    }
}

function showhide_bug_watch() {
    if ($("#div_email").html() == null || $.trim($("#div_email").html().toString()) == "") {
        $("#bugreport1").css('display', 'block');
    }
}
