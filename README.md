# Ti.Places
Google Places API Library for Titanium Appcelerator Alloy.

Please feel free to contribute.

![image](http://s11.postimg.org/zah62grjl/image.gif?raw=true)

## Usage

Create lib folder under app directory and then copy and paste the Ti.Place.js library. Visit https://console.developers.google.com and get google places webservice server key and add remote ip address for testing in emulator

* Include Ti.Places Library  

```javascript
var places = require('ti.places');
```

* Set the Google Place API Key.  

```javascript
places.setAPIKey("YOUR API KEY");
```

* Search Places API

```javascript
//Search Options
var searchOptions = {
lat : -33.8670522, //latitude
lon : 151.1957362, //longitude
radius : 500, //radius in meters
name : "", //name of place
type : "atm | bank", //['airport', 'atm', 'bank', 'bar', 'parking', 'pet_store','pharmacy', 'police', 'post_office', 'shopping_mall']
sensor : false, //sensor parameter to indicate whether your application used a sensor
success: function (response) { //success callback
//Code goes here..
},
fail : function () { //fail callback
//Code goes here..
}
};

places.api.searchPlace(searchOptions); //Execute the search query
```
* Get Place Details Information API

Pass the reference id for specific place for fetching the place details.

```javascript
//Get Place Details Options
var placeOptions = {
reference : "CmRcAAAAferhk3fERWey5ZpxevSxsfEFZe59rDOE0Q8r72wOsdPhPcJfZO06moigXnatF0NxhWWE7GdO3acRqtwnfWWain6g5RABWxUQLzlvkeDy4BhCxgqZWUzrbQNF-96KjmgLEhBPsNtWUyjVRoJlAzA8alkrGhQ4uQtKjGuqzYr1C6hmVBpvmbBRLw",
sensor : true, //sensor parameter to indicate whether your application used a sensor
success: function (response) { //success callback
//code goes here..
},
fail : function () { //fail callback
//code goes here...
}
};

places.api.getPlaceDetails(placeOptions); //Execute the place details query
```

* Query AutoComplete API

```javascript
//AutoComplete Options
var autoCompleteOptions = {
type: "establishment", //default: geocode
success: function (response) { //success callback
//code goes here..
},
fail : function () { //fail callback
//code goes here..
}
};

//On Search Place Trigger AutoComplete Search
$.searchPlace.addEventListener("change", function (e) {
autoCompleteOptions.input = e.value;
places.api.autoComplete(autoCompleteOptions);
});
```

**Features**
* Search Places
* Get Place Details
* Query for Auto Complete
* Works in android/ios

##Notes
* Any bugs please raise a ticket
* If the libray helped you then please click on star to support it :)

