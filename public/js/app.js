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
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].link + "<button 'class=button-success'> Save </button>" + "</p>");
    //   $("p").addClass("article-divs");
    //   $(".article-divs").append(button);
    }
  });
  