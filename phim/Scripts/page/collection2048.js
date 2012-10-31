$(function () {
    var pageSize = $(".lstFilm .item").size();
    var effItem = pageSize % 4;
    effItem == 0 ? effItem = 5 : effItem += 1;
    $(".lstFilm .item:gt(" + (pageSize - effItem) + ")").addClass("nBor");

    $(".hidden-tip").each(function () {
        var fID = $(this).attr("fID");
        $(this).load("/ajaxload/popupFilm.aspx?id=" + fID, function (ret) {
            $(".lstFilm .img").easyTooltip({
                useElement: "hidden-tip"
            });
        })
    })
    $(".lstFilm .item").groupItem(4);
    $(".lstFilm .img").hover(function () { $(".iconPlayL", this).show() }, function () { $(".iconPlayL", this).hide() });

    var sort = $("input[id*=hidSort]").val();
    $("#slSort").val(sort);

    $("#slSort").bind("change", function () {
        var order = $(this).val();
        var link = location.href;
        var arrLink = link.split('http://phim.soha.vn/');
        var newLink = '';
        for (var i = 0; i < 5; i++) {
            newLink += arrLink[i] + "/";
        }
        var o = parseInt(arrLink[6]);
        if (isNaN(parseInt(o))) {
            newLink += "1/" + order + "/" + arrLink[6];
        }
        else {
            newLink += "1/" + order + "/" + arrLink[7];
        }
        window.location.href = newLink;
    })

    $("#cvSort").bind("change", function () {
        var order = $(this).val();
        var link = location.href;
        var arrLink = link.split('http://phim.soha.vn/');
        var newLink = '';
        if ((link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-le.html") > 0) || (link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-bo.html") > 0)) {
            for (var i = 0; i < 3; i++) {
                newLink += arrLink[i] + "/";
            }
            var o = parseInt(arrLink[4]);
            if (isNaN(parseInt(o))) {
                newLink += "1/" + order + "/" + arrLink[4];
            }
            else {
                newLink += "1/" + order + "/" + arrLink[5];
            }
        }
        else {
            for (var i = 0; i <= 5; i++) {
                newLink += arrLink[i] + "/";
            }
            var o = parseInt(arrLink[7]);
            if (isNaN(parseInt(o))) {
                newLink += "1/" + order + "/" + arrLink[7];
            }
            else {
                newLink += "1/" + order + "/" + arrLink[8];
            }
        }
        window.location.href = newLink;
    });
    selValDropOrder();
});

function selValDropOrder() {
    var link = location.href;
    var arrLink = link.split('http://phim.soha.vn/');
    var o;
    if ((link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-le.html") > 0) || (link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-bo.html") > 0)) {
        o = parseInt(arrLink[4]);
    }
    else {
        o = parseInt(arrLink[7]);
    }
    if (isNaN(parseInt(o))) {
    }
    else {
        $("#cvSort option").each(function () {
            if ($(this).val() == o) {
                $(this).attr("selected", "selected");
            }
            else {
                $(this).removeAttr("selected");
            }
        });
    }
}
function selValColDropOrder() {
    var link = location.href;
    var arrLink = link.split('http://phim.soha.vn/');
    var o = parseInt(arrLink[7]);
    if (isNaN(parseInt(o))) {
    }
    else {
        $("#cvSort option").each(function () {
            if ($(this).val() == arrLink[7]) {
                $(this).attr("selected", "selected");
            }
            else {
                $(this).removeAttr("selected");
            }
        });
    }
}
function openlinkorder(order) {
    var link = location.href;
    var arrLink = link.split('http://phim.soha.vn/');
    var newLink = '';
    for (var i = 0; i < 5; i++) {
        newLink += arrLink[i] + "/";
    }
    var o = parseInt(arrLink[6]);
    if (isNaN(parseInt(o))) {
        newLink += "1/" + order + "/" + arrLink[6];
    }
    else {
        newLink += "1/" + order + "/" + arrLink[7];
    }
    window.location.href = newLink;
}

function cv_openlinkorder(order) {
    var link = location.href;
    var arrLink = link.split('http://phim.soha.vn/');
    var newLink = '';
    if ((link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-le.html") > 0) || (link.indexOf("http://phim.soha.vn/quoc-gia/1/1/phim-bo.html") > 0)) {
        for (var i = 0; i < 3; i++) {
            newLink += arrLink[i] + "/";
        }
        var o = parseInt(arrLink[4]);
        if (isNaN(parseInt(o))) {
            newLink += "1/" + order + "/" + arrLink[4];
        }
        else {
            newLink += "1/" + order + "/" + arrLink[5];
        }
    }
    else {
        for (var i = 0; i <= 5; i++) {
            newLink += arrLink[i] + "/";
        }
        var o = parseInt(arrLink[7]);
        if (isNaN(parseInt(o))) {
            newLink += "1/" + order + "/" + arrLink[7];
        }
        else {
            newLink += "1/" + order + "/" + arrLink[8];
        }
    }
    window.location.href = newLink;
}
function get_sub_film(subtype) {
    var url = window.location.href;
    url = replaceAll(url, "http://phim.soha.vn/", "");
    url = replaceAll(url, ":", "");
    //createCookie("cookie_filmsubsoha", subtype.toString() + ";;;" + url, 1);
    createCookie("cookie_filmsubsoha", subtype, 1);
    var url = window.location.href;
    var u = url.split('http://phim.soha.vn/');
    for (var i = 0; i < u.length; i++) {
        if (u[i] == 'the-loai' || u[i] == 'quoc-gia') {
            u[i + 2] = 1;
            url = u.join('http://phim.soha.vn/');
            window.location.href = url;
        }
    }
   
}
function setcurrent_sub_film() {
    var obj = readCookie("cookie_filmsubsoha");
    if (obj)
        $("#ddl_filter_sub option").eq(obj).attr("selected", "selected");
    else
        $("#ddl_filter_sub option").eq(0).attr("selected", "selected"); //mac dinh la tat ca

}
//function setcurrent_sub_film() {
//    var obj = readCookie("cookie_filmsubsoha");
//    var url = window.location.href;
//    url = replaceAll(url, "/", "");
//    url = replaceAll(url, ":", "");
//    if (obj.indexOf(url) > -1) {
//        subtype = obj.split('%3B%3B%3B')[0];
//        $("#ddl_filter_sub option").eq(subtype).attr("selected", "selected");
//    }
//}
//cookie
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
}