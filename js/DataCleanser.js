/**
 * Module for the algorithms related to cleaning erroneous points 
 * from sample geographic data.
 */
var DataCleanser = (function() {
	var dataCleanser = {};
	
	/**
	 * Check two locations and return flag indicating if the speed/distance 
	 * travelled between the two points is reasonable.
	 *
	 * @param 	currentPoint	The start point.
	 * @param 	previousPoint	The end point.
	 *
	 * @return	true/false		Boolean indicating if the journey is realistic.
	 */
	function checkLocation(currentPoint, previousPoint) {
		// always add in first point - i.e. will have no previous point
		if(previousPoint.length == 0) 
			return true;
		
		// get the distance travelled
		var distance = GeoUtilities.getDistanceTravelled(
			currentPoint[0], currentPoint[1], 
			previousPoint[0], previousPoint[1], "K");
			
		// get time taken
		var time = getTimeDifference(currentPoint[2], previousPoint[2]);
		
		// get the average speed
		var speed = GeoUtilities.getAverageSpeed(time, distance);
		
		// check the speed
		return checkSpeed(speed);
	}
	
	/**
	 * Checks the speed to see if it is considered realistic.
	 * For the purposes of this test, a realistic speed is defined as...
	 * > 0 && <= 80
	 *
	 * @param 	speed		The speed travelled at.
	 *	
	 * @return	true/false	Indictaing if the speed is realistic.
	 */
	function checkSpeed(speed) {
		if(speed > 0 && speed <= 80)
			return true;
		else return false;
	}
	
	/**
	 * Returns the number of seconds between two timestamps.
	 *
	 * @param 	time1	The first timestamp.
	 * @param 	time2	The second timestamp.
	 *
	 * @return	seconds	The number of seconds between the two timestamps.
	 */
	function getTimeDifference(time1, time2) {
		return time1 - time2;
	}
	
	/**
	 * Cleane the array of sample geographoc data points.
	 * Cleanse here means to remove what is considered to be erroneous points.
	 * An erroneous point is an unrealistic distance/speed travelled
	 *
	 * @param 	sampleData	The sample data points to be analysed.
	 *
	 * @return	cleanData	An array of points with erroneous points removed.
	 */
	dataCleanser.cleanseData = function (sampleData) {
		var cleanData = [];
		var previousPoint = [];
		
		$(sampleData).each(function(index, value){
			currentPoint = [parseFloat(value[0]), parseFloat(value[1]), value[2]];
			
			if(checkLocation(currentPoint, previousPoint)) {
				cleanData.push([parseFloat(value[0]), parseFloat(value[1])]);
			}
			
			previousPoint = currentPoint;
		});
		
		return cleanData;
	};
	
	// Export the module
	return dataCleanser;
}());
