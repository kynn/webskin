var loginwindos;
$(function () {
    loginwindos = $("#loginEvent").dialog({ modal: true, closeOnEscape: true, resizable: false, width: 560, height: 500, draggable: false, position: 'center', autoOpen: false, closeText: '' });
});

function openLoginWindow() {
    loginwindos.load('/mingid/preload.aspx').dialog('open');
}
function openRegisWindow() {
    loginwindos.dialog("option", "height", 570);
    loginwindos.load('/mingid/preloafregis.aspx').dialog('open');
}

function openSSOWindow(url) {
    loginwindos.load('/mingid/preload2.aspx?url=' + url).dialog('open');
}

function closeLoginWindow() {
    loginwindos.dialog("close");
    var _url = window.location.href.toString();
    if (_url.search("ssosignout.aspx") == -1) {
        window.location.href = window.location.href;

    }
    else {
        window.location.href = "http://phim.soha.vn/";

    }
}

function open_logout_window() {
    //    $.ajax({
    //        type: "POST",
    //        async: false,
    //        url: "/mingid/logout.aspx",
    //        data: "",
    //        success: function (e) {
    //            document.write('<iframe src="http://id.ming.vn/logout" style="display:none" width="1" height="1"></iframe>');
    //            window.location.href = window.location.href;
    //        }
    //    });
    var width = 300;
    var height = 20;
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);

    var url = "/mingidmodules/logout.aspx";

    if (navigator.userAgent.indexOf('Opera') > -1) {
        window.open(url);
    }
    else {
        window.open(url, "", '"resizable=no,scrollbars=yes,width=' + width + 'px,height=' + height + 'px,left=' + left + ',top=' + top + '"');
    }
}
