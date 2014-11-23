/**
 * Wrapper module for functions related to analysing & manipulating
 * geographic data.
 */
var GeoUtilities = (function() {
	var geoUtilities = {};
	
	/**
	 * Returns the distance travelled between the points specified.
	 *
	 * This algorithm was originally posted at...
	 * http://www.geodatasource.com/developers/javascript
	 *
	 * @param 	lat1		The first latitude.
	 * @param 	lon1		The first longitude.
	 * @param 	lat2		The second latitude.
	 * @param	lon2		The second longitude.
	 * @param 	unit		The distance type - M, K, N.
	 *
	 * @return	distance	The distance travelled.
	 */
	geoUtilities.getDistanceTravelled = function (lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}
	
	/**
	 * Returns the average speed travelled based on the specified time & distance.
	 *
	 * @param 	time		The time taken to travel the distance.
	 * @param 	distance	The distance tyravelled.
	 *
	 * @return	speed		The average speed.
	 */
	geoUtilities.getAverageSpeed = function (time, distance) {
		return (60/time) * distance * 60;
	}
	
	// Export the module
	return geoUtilities;
}());