

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "60f47effe64bc8f896debedd3c546a64" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	
	
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log(response);
			model.browseItems = response.results;
			callback(response);
		},
		fail: function() {
			console.log("FAIL at Discover Movies!");
		}
	});
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  
  
  var watchlistElement = $("#section-watchlist ul");
  var browseElement = $("#section-browse ul");
  
  // TODO 7 -- clear everything from both lists
  watchlistElement.empty();
  browseElement.empty();
  
  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>").append(title);
    watchlistElement.append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var button = $("<button></button>").text("Add to Watchlist").click(function() {
        model.watchlistItems.push(movie);
        render();
      });

    var itemView = $("<li></li>").append(title).append(button);
    browseElement.append(itemView);
  });
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

