var places = require('ti.places');
var types = ['airport', 'atm', 'bank', 'bar', 'parking', 'pet_store','pharmacy', 'police', 'post_office', 'shopping_mall'];

//Set Google Places API Key
places.setAPIKey("YOUR API KEY"); //GO TO - https://console.developers.google.com and fetch webservice server key and add remote ip address for testing in emulator

var renderCardData = function (data) {
	$.icon.setImage(data.icon);
	$.name.setText("Name ==> " + data.name);
	$.vicinity.setText("Vicinity ==> " + data.vicinity);
	$.type.setText("Type ==> " + data.type);
};

//Search Place Options
var searchOptions = {
	lat : -33.8670522,
	lon : 151.1957362,
	radius : 500,
	name : "",
	type : types[1] + "|" + types[2],
	sensor : false,
	success: function (response) {
		//getting an item out of the json response
		var data = {
			name : response.results[1].name,
			vicinity : response.results[1].vicinity,
			icon : response.results[1].icon,
			type : response.results[1].types[0]
		};
		renderCardData(data);
	},
	fail : function () {
		Titanium.UI.createAlertDialog({
			title: "API call failed",
			message: e,
			buttonNames: ['OK']
		}).show();
	}
};

//Bind Event Click Listener for Search Place
$.getLocation.addEventListener("click", function () {
	places.api.searchPlace(searchOptions);
});

//Get Place Details Options
var placeOptions = {
	sensor : true,
	success: function (response) {
		//getting an item out of the json response
		var data = {
			name : response.result.name,
			vicinity : response.result.vicinity,
			icon : response.result.icon,
			type : response.result.types[0]
		};
		renderCardData(data);
	},
	fail : function () {
		Titanium.UI.createAlertDialog({
			title: "API call failed",
			message: e,
			buttonNames: ['OK']
		}).show();
	}
};

//Bind Event Click Listener for Get Place Detail based on reference id
$.getPlaceDetails.addEventListener("click", function () {
	placeOptions.reference = "CmRcAAAAferhk3fERWey5ZpxevSxsfEFZe59rDOE0Q8r72wOsdPhPcJfZO06moigXnatF0NxhWWE7GdO3acRqtwnfWWain6g5RABWxUQLzlvkeDy4BhCxgqZWUzrbQNF-96KjmgLEhBPsNtWUyjVRoJlAzA8alkrGhQ4uQtKjGuqzYr1C6hmVBpvmbBRLw";
	places.api.getPlaceDetails(placeOptions);
});

//Display Auto Complete Data on drop down table
var displayAutoCompleteData = function (data) {
	var titles = _.map(data.predictions, function (prediction) {
		return { 
			title : prediction.description,
			reference : prediction.reference
		};
	});
	$.autoFillTable.setHeight(50 * titles.length + "dp");
	$.autoFillTable.setData(titles);
};

//On Table Row Click Fetch Place Reference Id and Display Card Info
$.autoFillTable.addEventListener("click", function (e) {
	placeOptions.reference = e.rowData.reference;
	places.api.getPlaceDetails(placeOptions);
	$.autoFillTable.setData([]);
	$.autoFillTable.setHeight("0dp");
	$.searchPlace.setValue(e.rowData.title);
});

//AutoComplete Options
var autoCompleteOptions = {
	type: "establishment", //default: geocode
	success: function (response) {
		//getting an item out of the json response
		var data = {
			predictions : response.predictions
		};
		displayAutoCompleteData(data);
	},
	fail : function () {
		Titanium.UI.createAlertDialog({
			title: "API call failed",
			message: e,
			buttonNames: ['OK']
		}).show();
	}
};

//On Search Place Trigger Drop Down Search
$.searchPlace.addEventListener("change", function (e) {
	autoCompleteOptions.input = e.value;
	places.api.autoComplete(autoCompleteOptions);
});


$.index.open();
