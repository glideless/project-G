(function(d,$) {
	var
		btnStart = $("#start"),
		btnStop = $("#stop"),
		consoleLog = $("#console"),
		geoWatcherID,

		options = {
	  		enableHighAccuracy: false,
	  		timeout: 5000,
	  		maximumAge: 0
		}
	;

	function geoGetSuccess(pos) {
	  	var 
	  		crd = pos.coords,
	  		log = $("<p/>").text("lat: " + crd.latitude + ", long: " + crd.longitude)
	  	;

	  	consoleLog.append(log);

	};

	function geoGetError(err) {
	  var log = $("<p/>").text("NAPAKA: " + err.code + ": " + err.message);
	  consoleLog.append(log);
	};

	btnStart.click(function(e) {
		e.preventDefault();

		geoWatcherID = navigator.geolocation.watchPosition(geoGetSuccess, geoGetError, options);

		var log = $("<p/>").text("GeoWatcher started");
	  	consoleLog.append(log);

	});

	btnStop.click(function(e) {
		e.preventDefault();

		navigator.geolocation.clearWatch(geoWatcherID);

		var log = $("<p/>").text("GeoWatcher stopped");
	  	consoleLog.append(log);

	});

}(document,jQuery));
