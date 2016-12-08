//holds the value of the input field to be used in addButton
var searchVar;

//grabs the button title to be used in the queryURL
var hold;

//holds the rating of the current gif
var ratingStore;

//sends a request to giphy using the button title as the search value
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchVar + "&api_key=dc6zaTOxFJmzC";

//holds the current url and exchanges it with the url stored in data-holdsrc
var exchange;



//runs when submit/enter key hit---------------------------------------------
var submitButton = function(){

	//if the input field is blank, a blank button would be created.
	//to prevent this, we exit the function if the input field has
	//been left blank
	if ($('#searchgif').val()=== ''){
		return;
	};

	//store the value in the input field
	searchVar = ($('#searchgif').val());
	
	//clear the field after and create a button
	$('#searchgif').val("");
	//contains the actual html to add
	addButton();
};	



//Adds the html to to button row---------------------------------------------
var addButton = function(){
	$('.buttons').append('<button class="btn btngif">' + searchVar + '</button>');
}



//run the ajax call to load giphy gifs----------------------------------------
var addGif = function(){
	//first empty any existing images so they don't stack
	$('.images').empty();

	//sends a request to giphy
	$.ajax({ url: queryURL, method: "GET" }).done(function(response) {
		//creates html and displays each image on the page
		for (i=0; i<10; i++){

			ratingStore = '<p>Rating: ' + response.data[i].rating + '</p>';
			urlStore = '<img src="' + response.data[i].images.fixed_height_still.url + '"' +
			'data-holdsrc = "' + response.data[i].images.fixed_height.url +'">';
			
			$('.images').append('<div class = "gifHolder">' + ratingStore + urlStore + '</div>');

		}
	});
}

//----------------------------------------------------------------

//Run submitButton to create a button when submit is clicked --
$('.submit').on('click', submitButton);
//or enter button is hit
document.onkeyup =function(event) {
	if (event.key == 'Enter'){
		submitButton();
	}
}


//when a newly created button is clicked, we query giphy and display gifs
$('.buttons').on('click', '.btngif', function(){
	//grabs the search term from the button's text and puts it into the queryURL
	hold = this.outerText;
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hold + "&api_key=dc6zaTOxFJmzC";

	//uses the queryURL to add images
	addGif();
})


//exchanges the shown url with the stored url
$('.images').on('click', 'img', function(){

	//hold what was initially being shown
	exchange = $(this).attr('src');

	//change whatever is being shown to the stored url
	$(this).attr('src', $(this).attr('data-holdsrc') );

	//replace the stored url with what was being shown
	$(this).attr('data-holdsrc', exchange);

});

