//Get articles and display on page
// $.getJSON("/articles", (data) => {
//     data.forEach((() => {
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].link + "</p>")
//     }))
// })

$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        let button = $("<button>")
      // Display the apropos information on the page
      $("#articles").append("<a class='article-divs' href='" + data[i].link + "' 'data-id='" + data[i]._id + "'>" + data[i].headline + "<button class='button-success' data-id=" + data[i]._id + "> Save </button>" + "<br />" + "</a>");
    }
  });

  $(document).on("click", ".article-divs", function () {

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
  