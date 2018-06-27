$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        let button = $("<button>")
        let div = $("<div class='col-md-12' id='article-divs'>")
        // Display the apropos information on the page
        $("#articles").append(div);
        $("#article-divs").append("<a class='article-divs' href='" + data[i].link + "' data-id='" + data[i]._id + "'>" + data[i].headline + "<button class='button-success' data-id=" + data[i]._id + "> Save </button>" + "<br />" + "</a>");
        $("#article-divs").append("<p class='summary-text' data-id='" + data[i]._id + "'>Summary goes here (click to add note)</p>")
    }

    //$("#articles").append("<p class='summary-text'>Summary goes here</p>")
});

$(document).on("click", ".summary-text", function () {

    $("#notes").empty();

    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(((data) => {
            console.log(data)
        }))

})
