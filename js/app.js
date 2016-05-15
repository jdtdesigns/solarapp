var data = {
	battery: 16,
	device: 60, // Total Power Device has left in % (From 0-100)
};

var SolarApp = (function() {
	var init = function() {
		simulate();

		$('#battery-icon').attr('class', data.battery < 26 ? 'fa fa-battery-quarter' : data.battery < 51 ? 'fa fa-battery-half' : data.battery < 76 ? 'fa fa-battery-three-quarters' : 'fa fa-battery-full');
		$('#battery').html(data.battery + '%');
		if ( data.battery < 16 ) {
			$('#battery').addClass('low');
			$('#battery-icon').addClass('low');
		}

		showTime();
		SolarApp.time = setInterval(function() {
			showTime();
		}, 1000);
	};

	var simulate = function() {
		var chargeNeeded = 100 - data.device; // Charge left from 100
		data.deviceTime = Math.floor((chargeNeeded / 100) * 300); // Time left to charged based on 300 minutes

		SolarApp.absorded = setInterval(function() {
			showAbsorded();
		}, 2500);

		SolarApp.batteryLife = setInterval(function() {
			var battery = $('#battery');

			data.battery--;
			battery.html(data.battery + '%');
			$('#battery-icon').attr('class', data.battery < 26 ? 'fa fa-battery-quarter' : data.battery < 51 ? 'fa fa-battery-half' : data.battery < 76 ? 'fa fa-battery-three-quarters' : 'fa fa-battery-full');

			if ( data.battery < 16 ) {
				$('#battery').addClass('low');
				$('#battery-icon').addClass('low');
			}
			if ( data.battery === 0 ) clearInterval(SolarApp.batteryLife);
		}, 5000);

		SolarApp.deviceCharge = setInterval(function() {
			data.device += 1;
			data.deviceTime -= 3;
			if ( data.device === 100 ) clearInterval(SolarApp.deviceCharge);
			showDeviceStatus();
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
			powerNeeded = 100 - data.device,
			time = data.deviceTime,
			hours = Math.floor(time / 60),
			minutes = time % 60;

		$('#status').html(hours === 0 && minutes === 0 ? 'Charge Complete' : hours + ' hrs ' + minutes + ' mins');	
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