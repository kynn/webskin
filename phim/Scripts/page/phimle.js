$(function () {
    $("div id*=[foo]").removeClass("lstFilm").removeClass("h500");
    $(".boxeventload").each(function () {
        var channel = $(this).attr("cID");

        $(".lstFilm").each(function () {
            var pageSize = $(".item", $(this)).size();
            var effItem = pageSize % 4;
            effItem == 0 ? effItem = 5 : effItem += 1;
            $(".item:gt(" + (pageSize - effItem) + ")", $(this)).addClass("nBor");
        })

        $(".item", $(this)).groupItems(8, "lstFilm");
        $(".item", $(this)).groupItems(4, "wrapBound");
        $(".wrapBound").sameHeights();

        $("#foo_" + channel, $(this)).carouFredSel({
            circular: true,
            infinite: false,
            auto: false,
            scroll: {
                items: "page"
            },
            prev: {
                button: "#foo_" + channel + "_prev",
                key: "left"
            },
            next: {
                button: "#foo_" + channel + "_next",
                key: "right"
            },
            pagination: "#foo_" + channel + "_pag"
        });
    });


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
    $(".menu a:eq(0)").addClass("active");
    $(".lstFilm .item").groupItem(4);

})