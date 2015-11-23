$(function() {
    $(".nav .searchBtn").click(function() {
        $(this).hide();
        $(".nav .searchBtnClick").show();
    })
    $(".nav .searchBtnClick .searchBtn2").click(function() {
        $(".nav .searchBtnClick").hide();
        $(".nav .searchBtn").show();
    })
    $(".nav .waiul li").hover(function() {
        $(this).find(".neinav").show();
    }, function() {
        $(this).find(".neinav").hide();
    });
    $(".class-list li").click(function() {
        selectItem($(this));
        var url = "../" + $(this).attr("data-role") + ".html";
        getTable(url);
    })
})

function getTable(url) {
    $(document).ready(function() {
        $("#loader").show();
        bodyContent = $.ajax({
            url: url,
            contentType: "application/x-www-form-urlencoded;",
            global: false,
            type: "GET",
            dataType: "html",
            async: true,
            success: function(data) {
                $(".ajax-wrapper").html($(data).html());
                $(".spec-list li").click(function() {
                    selectItem($(this));
                    $(".spec-table").removeClass("cur");
                    $(".spec-table").eq($(this).index()).addClass("cur");
                })
                $(".reset-btn").click(function() {
                    $(".talent-table tr td").removeClass("cur").css("opacity", 1);
                })
                for (var i = 0; i < $(".talent-table table tr td:nth-child(1)").length; i++) {
                    var item = $(".talent-table table tr td:nth-child(1)").eq(i);
                    var desc, cost;
                    if ($(".talent-table table tr td:nth-child(2)").eq(i).html() != null) {
                        desc = $(".talent-table table tr td:nth-child(2)").eq(i).html();
                        if ($(".talent-table table tr td:nth-child(3)").eq(i).html != null) {
                            cost = $(".talent-table table tr td:nth-child(3)").eq(i).html();
                        }
                    }
                    var meta = desc;
                    if (cost) {
                        meta += "</br></br>" + cost;
                    };
                    if (!meta) {
                        meta = "暂无改动。";
                    };
                    if (item.attr("class") != "level") {
                        item.addClass("talent").attr("title", meta);
                    }
                }
                $(".talent-table table tr td:nth-child(2)").hide();
                $(".talent-table table tr td:nth-child(3)").hide();
                $(".talent").click(function() {
                    $(this).parent().parent().find("tr td").removeClass("cur").css("opacity", "0.3");
                    $(this).addClass("cur").css("opacity", "1");
                })
                $('.talent').tooltipster({
                    contentAsHTML: true,
                    animation: 'swing',
                    touchDevices: false,
                    maxWidth: 250,
                    minWidth: 250,
                    theme: 'tooltipster-noir'
                });
                $("#loader").hide();
            }
        })
    })
}

function selectItem(target) {
    target.parent().find("li").removeClass("cur");
    target.addClass("cur");
}