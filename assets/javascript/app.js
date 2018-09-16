// Variables
// list of animals to start
var buttons = ["cat", "rabbit", "sloth", "dog", "monkey", "bird", "pig"];
// varable to hold the html strings for creating animal buttons
var btnlayout1 = '<button type="button" class="search-btn btn btn-light h-25 m-1">'
var btnlayout2 = '</button>'

// Functions
// transforms the list of animals into buttons, and displays them
function displayButtons() {
    for (i = 0; i < buttons.length; i++) {
        var newbtn = btnlayout1 + buttons[i] + btnlayout2
        $(".buttons-here").append(newbtn)
    }
}
// function call for initial display of buttons
displayButtons();

// function to add new buttons
$(document).on("click", "#add-term", function(event) {
    event.preventDefault();
    // keep from doubling buttons
    $(".buttons-here").empty();
    // save the input
    var newTerm = $("#add-input").val().trim();
    // empty the input field
    $("#add-input").val("")
    // add new term to the array
    if (newTerm.length > 0 && (!buttons.includes(newTerm))) {
        buttons.push(newTerm);
    }
    // call function to display buttons
    displayButtons();
});

$(document).on("click", ".search-btn", function() {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    $(this).text() + "+snuggle&api_key=2Sa4Ig2XujezRLCfHZjD7vvsL3X8AJMi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
        .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifdiv m-3'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img class='gif'>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $(".gifs-here").append(gifDiv);
        }
        });
})

// play and pause function
$(document).on("click", ".gif", function() {
    var holdSrc1 = $(this).attr("src")
    var holdSrc2 =  $(this).attr("data-src")
    $(this).attr("src", holdSrc2)
    $(this).attr("data-src", holdSrc1)
});

// clear function
$(document).on("click", "#clear-btn", function() {
    $(".gifs-here").empty();
});