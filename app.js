// document.ready

// Create an array of strings, each one a certain topic 
var topics = [
	"basketball",
	"football",
	"soccer",
	"baseball",
	"swimming",
	"golf",
];

var newTopics = [];

function makeButtons() {
	$("#button-div").empty();
	for (var i=0; i<topics.length; i++) {
		var buttons = $("<button>");
		buttons.html(topics[i]);
		buttons.attr("topics", topics[i]);
		
		$("#button-div").append(buttons);
	}
}

makeButtons();
getGifs();

$("#add-button-submit").on("click", function(event) {
	event.preventDefault();

	// get new button from textbox and
	var newButtonTopic = $("#new-button").val().trim();
    topics.push(newButtonTopic);
    console.log(topics);
    // for (var i=0; i<newTopics.length; i++) {
    // 	var newButtons = $("<button>");
    // 	newButtons.html(newTopics[i]);
    // 	newButtons.attr("topics", newTopics[i]);
    // 	$("#button-div").append(newButtons);
    // }
    makeButtons();
    getGifs();
});



//When the user clicks on a button, the page should grab 10 static, 
//non-animated gif images from the GIPHY API and place them on the page. 

function getGifs() {

	$("button").on("click", function() {

		console.log(this);
		var person = $(this).attr("topics");
		console.log(person);
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        person + "&api_key=dc6zaTOxFJmzC&limit=10";


	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })

	        .done(function(response) {
	        	console.log(response);
	          var results = response.data;


	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item' >");

	            var rating = results[i].rating;

	            var p = $("<p>").text("Rating: " + rating);

	            var personImage = $("<img id='gif-pics' data-state='still'>");
	            personImage.attr("src", results[i].images.fixed_height_still.url);
	            personImage.attr("data-animate", results[i].images.fixed_height.url);
	            personImage.attr("data-still", results[i].images.fixed_height_still.url);

	            gifDiv.prepend(p);
	            gifDiv.prepend(personImage);

	            $("#gifs-appear-here").prepend(gifDiv);

	            
	          }

	    	

	        });



	    $(document.body).on("click", "img", function() {
			var state = ($(this).attr("data-state"));
		    console.log(this);
		    console.log(state);

		    if (state === "still") {
		    	console.log(this.src);

		    	$(this).attr("src" ,$(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		     } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");

		    } 
		})




	});
};











