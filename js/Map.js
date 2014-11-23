/**
 * Wrapper module for Leaflet.js to create a map based on some
 * Geogrpahic points passed in.
 */
var MapUtils = (function() {
	var mapUtil = {};
	var map = null;

	/**
	 * Formats the sample location data into a more suitable format
	 * to be mapped using Leaflet.js
	 *
	 * @param 	sampleData	The sample data array to be formatted
	 * @return	data		The formatted data
	 */
	function formatData(sampleData) {
		var data  = [];
		$(sampleData).each(function(index, value){
			data.push([parseFloat(value[0]), parseFloat(value[1])]);
		});
		return data;
	}
	
	/**
	 * Adds a polyline to the map using teh sample data passed in.
	 * This function also sets the map position to fit the plotted data points.
	 *
	 * @param 	formattedData	The formatted data to be added to the map.
	 * @return	None
	 */
	function addPolyLine(formattedData) {
		// create a red polyline from an arrays of LatLng points
		var polyline = L.polyline(formattedData, {color: 'red'}).addTo(map);
		
		// zoom the map to the polyline
		map.fitBounds(polyline.getBounds());
	}
	
	/**
	 * Adds a tile layer to the map.
	 * The tile layer is the graphical representation of the area being viewed on the map.
	 *
	 * @param 	None
	 * @return	None
	 */
	function addTileLayer() {
		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i875mjb7'
		}).addTo(map);
	}

	/**
	 * Module Entry Point.
	 * Create a map using Leaflet.js, passing in the sample data points to be plotted.
	 *
	 * @param 	sampleData	The sample data points to be added to the map.
	 * @param 	nodeName	The nodeName of the div that is to be used for the map.
	 * @return	None
	 */
	mapUtil.createMap = function (sampleData, nodeName) {
		// create the map
		map = L.map(nodeName);
		
		// add a tile layer to the map
		addTileLayer();
		
		// format the data to be passed to the map
		var formattedData = formatData(sampleData);
		
		// add the data to the map in the form of a polyline
		addPolyLine(formattedData);
	};

	// Export the module
	return mapUtil;
}());