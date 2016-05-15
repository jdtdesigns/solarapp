var data = {
	battery: 100,
	device: 0, // Total Power Device has left in % 0-100
	deviceTime: 300, // 300 is Full(100%) --> ( device: 80/deviceTime: 60 = Calculated 20% of 300 is 60 )
};

var SolarApp = (function() {
	var init = function() {
		simulate();
		$('#battery').html(data.battery + '%').addClass(data.battery < 15 ? 'low' : '');
		
		showTime();
		SolarApp.time = setInterval(function() {
			showTime();
		}, 1000);
	};

	var simulate = function() {
		SolarApp.absorded = setInterval(function() {
			showAbsorded();
		}, 2500);

		SolarApp.batteryLife = setInterval(function() {
			var battery = $('#battery');

			data.battery--;
			battery.html(data.battery + '%');
			if ( data.battery < 15 ) battery.addClass('low');
			if ( data.battery === 0 ) clearInterval(SolarApp.batteryLife);
		}, 5000);

		SolarApp.deviceCharge = setInterval(function() {
			data.device += 1;
			if ( data.device === 100 ) clearInterval(SolarApp.deviceCharge);
			showDeviceStatus();
		}, 3000);

		SolarApp.deviceTime = setInterval(function() {
			data.deviceTime -= 3;
			if ( data.deviceTime === 0 ) clearInterval(SolarApp.deviceTime);
		}, 3000);
	};

	var showTime = function() {
		var time = $('#time'),
			date = $('#date'),
			currentTime = new Date(),
			minutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes(),
			hour = currentTime.getHours(),
			displayHour = currentTime.getHours() <= 12 ? currentTime.getHours() : currentTime.getHours() - 12,  
			today = getDate(currentTime),
			suffix = hour >= 12 ? 'PM' : 'AM';

		time.html(displayHour  + ':' + minutes + ' ' + suffix);
		date.html(today);
	};

	var showDeviceStatus = function() {
		var indicator = $('#indicator'),
			time = data.deviceTime,
			hours = Math.floor(time / 60),
			minutes = time % 60;

		$('#status').html(hours + ' hrs ' + minutes + ' mins');	
		indicator.css('width', data.device + '%');
	};

	var showAbsorded = function() {
		var num = Math.floor(Math.random() * (750 - 500)) + 500;

		$('#tracking').html(num + ' kw/hour');
	};

	var getDate = function(obj) {
		var date = obj,
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var setSuffix = function(num) {
			switch(num) {
		        case 1:
		        case 21:
		        case 31:
		          return num + 'st';
		        case 2:
		        case 22:
		          return num + 'nd';
		        case 3:
		        case 23:
		          return num + 'rd';
		      }
		      return num + 'th';
		};

		return months[date.getMonth()] + ' ' + setSuffix(date.getDate()) + ', ' + date.getFullYear(); 
	};

	return {
		init: init
	};
})();

SolarApp.init();