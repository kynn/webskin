var modalBox = {
    parent: "body",
    close: function () {
        $(".modal-window").remove();
        $(".modal-overlay").remove();
    },
    open: function (url) {
        var modal = "";
        modal += "<div class=\"modal-overlay\"></div>";
        modal += "<div class=\"modal-window\" style=\"z-index:400;width: 785px; height:" + getViewPortHeight() + "\px;\">";
        modal += this.content;
        modal += "</div>";
        $(this.parent).append(modal);
        $(".modal-window").append("<a class=\"close-window\"></a>");
        $(".close-window").click(function () {
            modalBox.close();

            var scr = document.createElement("script");
            scr.setAttribute("type", "text/javascript");
            scr.setAttribute("src", "http://pay.phim.soha.vn/payment2/CheckAllStepCompleted?key=" + url);
            document.body.appendChild(scr);

            //console.log(window.location);

        });
    }
};
function openMyModal(url) {
    modalBox.content = "<iframe id=\"frPaymentPhim\" frameborder='0' scrolling='no' allowtransparency='true' src='" + url + "' style='width:100%;height:1200px;'></iframe>";

    modalBox.open(url.split("=")[1]);
    center($('.modal-window'));
}

function closeMyModal() {
    modalBox.close();
    window.location.href = window.location.href;
}


function center (e)
{
    var x = ((getViewPortWidth() - e[0].offsetWidth) /2);
    var y = (getViewPortHeight()/6) + getViewPortScrollY();

    setLocation(e, x, y);
}

function setLocation(e, x, y)
{
    e.css({position : 'absolute', left : (x + 'px'), top : (y + 'px')});
}


function getViewPortWidth()
{
    var width = 0;

    if ((document.documentElement) && (document.documentElement.clientWidth))
    {
        width = document.documentElement.clientWidth;
    }
    else if ((document.body) && (document.body.clientWidth))
    {
        width = document.body.clientWidth;
    }
    else if (window.innerWidth)
    {
        width = window.innerWidth;
    }

    return width;
}

function getViewPortHeight()
{
    var height = 0;

    if (window.innerHeight)
    {
        height = (window.innerHeight);
    }
    else if ((document.documentElement) && (document.documentElement.clientHeight))
    {
        height = document.documentElement.clientHeight;
    }

    return height;
}

function getContentHeight()
{
    if (document.body)
    {
        if (document.body.scrollHeight)
        {
            return document.body.scrollHeight;
        }

        if (document.body.offsetHeight)
        {
            return document.body.offsetHeight;
        }
    }

    return 0;
}

function getViewPortScrollX()
{
    var scrollX = 0;

    if ((document.documentElement) && (document.documentElement.scrollLeft))
    {
        scrollX = document.documentElement.scrollLeft;
    }
    else if ((document.body) && (document.body.scrollLeft))
    {
        scrollX = document.body.scrollLeft;
    }
    else if (window.pageXOffset)
    {
        scrollX = window.pageXOffset;
    }
    else if (window.scrollX)
    {
        scrollX = window.scrollX;
    }

    return scrollX;
}

function getViewPortScrollY()
{
    var scrollY = 0;

    if ((document.documentElement) && (document.documentElement.scrollTop))
    {
        scrollY = document.documentElement.scrollTop;
    }
    else if ((document.body) && (document.body.scrollTop))
    {
        scrollY = document.body.scrollTop;
    }
    else if (window.pageYOffset)
    {
        scrollY = window.pageYOffset;
    }
    else if (window.scrollY)
    {
        scrollY = window.scrollY;
    }

    return scrollY;
}