/****
 * @author: Ajain Vivek (ChaiCode.com)
 * @description: Google Places Library for Titanium Appcelerator Alloy
 * @version: 1.0
 * @license : MIT Licensed
 */

var api = (function() {
	
	var xhr = null;
	
	/**
	 * @desc: HTTP Service Call API
	 * @param {String} url - google places api url
	 */
	var _serviceCall = function (url, callback) {
		if(xhr == null){
			xhr = Titanium.Network.createHTTPClient();
		}
		xhr.open('GET', url);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		xhr.onerror = function(e){
		Ti.API.error("API ERROR " + e.error);
			if (callback.error) {
				callback.fail(e);
			}
		};
		xhr.onload = function(){
			Ti.API.debug("API response: " + this.responseText);
			if (callback.success) {
				var jsonResponse = JSON.parse(this.responseText);
				callback.success(jsonResponse);
			}
		};
		xhr.send();
	}; 
	
	/**
	 * @desc: Retrieves the google place location info
	 * @param {Object} - 
	 * {
	 * 	lat : "10.232", //latitute
	 *  lon : "23.234", //longitude,
	 *  radius : 500, //radius in meters
	 *  name: "Paris", //location name
	 *  sensor: "true/false", //
	 *  type: "bank",//['airport', 'atm', 'bank', 'bar', 'parking', 'pet_store','pharmacy', 'police', 'post_office', 'shopping_mall']
	 * }
	 */
	var searchPlace = function(opts) {
		var options = {
			lat : opts.lat || "",
			lon : opts.lon || "",
			radius : opts.radius || 500,
			name : opts.name || "",
			sensor : opts.sensor || "",
			type : opts.type || "",
			success : opts.success || function () {},
			fail : opts.fail || function () {}
		};
		var url = "https://maps.googleapis.com/maps/api/place/search/json?";
		url = url + "location=" + options.lat + ',' + options.lon;
		url = url + "&radius=" + options.radius;
		url = url + "&types=" + options.type;
		url = url + "&name=" + options.name;
		url = url + "&sensor=" + options.sensor;
		url = url + "&key=" + Titanium.App.Properties.getString("googlePlacesAPIKey");
		_serviceCall(url, {
			success : options.success,
			fail : options.fail
		});
	};
	
	/**
	 * @desc: get autocomplete places data
	 * @param {Object} - 
	 * {
	 * 	input : "Par", //search term
	 *  type : "geocode", //[establishment, geocode],
	 *  language : "en", //[en, fr]
	 * }
	 */
	var autoComplete = function (opts) {
		var options = {
			input : opts.input || "",
			type : opts.type || "geocode",
			languange : opts.language || "en",
			success : opts.success || function () {},
			fail : opts.fail || function () {}
		};
		var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
		url = url + "input=" + options.input;
		url = url + "&types=" + options.type;
		url = url + "&language=" + options.language;
		url = url + "&key=" + Titanium.App.Properties.getString("googlePlacesAPIKey");
		_serviceCall(url, {
			success : options.success,
			fail : options.fail
		});
	};
	
	/**
	 * @desc: get place info
	 * @param {Object} - 
	 * {
	 * 	reference : "ClREAAAAPnDnLpS74g6b", //unique reference id of location
	 *  sensor : "true/false"
	 * }
	 */
	var getPlaceDetails = function(opts) {
		var options = {
			reference : opts.reference || "",
			sensor : opts.sensor || false,
			success : opts.success || function () {},
			fail : opts.fail || function () {}
		};
		var url = "https://maps.googleapis.com/maps/api/place/details/json?";
		url = url + "reference=" + options.reference;
		url = url + "&sensor=" + options.sensor;
		url = url + "&key=" + Titanium.App.Properties.getString("googlePlacesAPIKey");
		_serviceCall(url, {
			success : options.success,
			fail : options.fail
		});
	};
	//return our public API
	return {
		searchPlace : searchPlace,
		autoComplete : autoComplete,
		getPlaceDetails : getPlaceDetails
	};
} ());

exports.api = api;
exports.setAPIKey = function (key) {
	Titanium.App.Properties.setString("googlePlacesAPIKey", key);
};
exports.getAPIKey = function () {
	return Titanium.App.Properties.getString("googlePlacesAPIKey");
};