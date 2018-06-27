$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        let button = $("<button>")
        let div = $("<div class='col-md-12' id='article-divs'>")
        // Display the apropos information on the page
        $("#articles").append(div);
        $("#article-divs").append("<a class='article-divs' href='" + data[i].link + "' data-id='" + data[i]._id + "'>" + data[i].headline + "<button class='button-success' data-id=" + data[i]._id + "> Save </button>" + "<br />" + "</a>");
        $("#article-divs").append("<p class='summary-text' data-id='" + data[i]._id + "'>Summary goes here (click to add note)</p>")
        $(".summary-text").attr("data-toggle", "modal");
        $(".summary-text").attr("data-target", "#exampleModal");
    }

    //$("#articles").append("<p class='summary-text'>Summary goes here</p>")
});

$(document).on("click", ".summary-text", function () {

    let thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(((data) => {
            console.log(data)
            // The title of the article
            $(".modal-header").html("<h2>" + data.headline + "</h2>");
            // An input to enter a new title
            $(".modal-body").html("<input id='titleinput' name='title' >" + "<br />");
            // A textarea to add a new note body
            $(".modal-body").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#save-note-button").attr("data-id", data._id);

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        }))
});

// When you click the savenote button
$("#save-note-button").on("click", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
        
        });

})
