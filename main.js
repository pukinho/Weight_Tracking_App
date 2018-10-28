// Shorten stuff
var $ = function (id) {
	return document.getElementById(id);
}

// Set default date-input value to today
Date.prototype.toDateInputValue = (function () {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
});

// Change inner date values
$('date_1').value = new Date().toDateInputValue();
$('date_2').value = new Date().toDateInputValue();
$('date_1').addEventListener('click', function () {
	$('weight_1').value = '';
});
$('date_2').addEventListener('click', function () {
	$('weight_2').value = '';
});

// Listen for submit (Person_1)
$('sbt_1').addEventListener('click', saveData_1);

// Listen for submit (Person_2)
$('sbt_2').addEventListener('click', saveData_2);

function saveData_1() {
	// Get values
	var dateVal_1 = $('date_1').value;
	var weightVal_1 = $('weight_1').value;

	// Create object to store values
	var listItem_1 = {
		date: dateVal_1,
		weight: weightVal_1
	}

	// Check if storage is empty
	if (localStorage.getItem('listItems_1') === null) {
		// Init array
		var listItems_1 = [];
		// Add to array
		listItems_1.push(listItem_1);
		// Set to local storage
		localStorage.setItem('listItems_1', JSON.stringify(listItems_1));
	} else {
		// Fetch from local storage
		var listItems_1 = JSON.parse(localStorage.getItem('listItems_1'));
		// Add item to array
		listItems_1.push(listItem_1);
		// Set back to local storage
		localStorage.setItem('listItems_1', JSON.stringify(listItems_1));
	}

	graph();
}

function saveData_2() {
	// Get values
	var dateVal_2 = $('date_2').value;
	var weightVal_2 = $('weight_2').value;

	// Create object to store values
	var listItem_2 = {
		date: dateVal_2,
		weight: weightVal_2
	}

	// Check if storage is empty
	if (localStorage.getItem('listItems_2') === null) {
		// Init array
		var listItems_2 = [];
		// Add to array
		listItems_2.push(listItem_2);
		// Set to local storage
		localStorage.setItem('listItems_2', JSON.stringify(listItems_2));
	} else {
		// Fetch from local storage
		var listItems_2 = JSON.parse(localStorage.getItem('listItems_2'));
		// Add item to array
		listItems_2.push(listItem_2);
		// Set back to local storage
		localStorage.setItem('listItems_2', JSON.stringify(listItems_2));
	}

	graph();
}

// Chart from CanvasJS.com (used Trial Version)

function graph() {

	// Get list items from local storage
	var listItems_1 = JSON.parse(localStorage.getItem('listItems_1'));
	var listItems_2 = JSON.parse(localStorage.getItem('listItems_2'));

	if (localStorage.getItem('listItems_1') === null) {
		// Init array
		var listItems_1 = [];
	}
	if (localStorage.getItem('listItems_2') === null) {
		// Init array
		var listItems_2 = [];
	}

	// Make empty arrays for data points in graph
	var dataPoints_1 = [];
	var dataPoints_2 = [];

	// Fill data points arrays
	for (var i = 0; i < listItems_1.length; i++) {
		dataPoints_1.push({ x: new Date(listItems_1[i].date), y: parseInt(listItems_1[i].weight) });
	}
	for (var j = 0; j < listItems_2.length; j++) {
		dataPoints_2.push({ x: new Date(listItems_2[j].date), y: parseInt(listItems_2[j].weight) });
	}

	// Make chart
	var chart = new CanvasJS.Chart('chartContainer', {
		animationEnabled: true,
		theme: 'dark1',
		title: {
			text: 'Weight Comparison Graph'
		},
		axisX: {
			title: 'Time',
			valueFormatString: 'DD MMM',
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: 'Weight',
			crosshair: {
				enabled: true
			}
		},
		toolTip: {
			shared: true
		},
		data: [{
			type: 'line',
			connectNullData: true,
			showInLegend: true,
			name: 'Person_1',
			markerType: 'square',
			xValueFormatString: 'DD MMM YYYY',
			color: '#F08080',
			dataPoints: dataPoints_1 // Data points for Person_1
		},
		{
			type: 'line',
			connectNullData: true,
			showInLegend: true,
			name: 'Person_2',
			dataPoints: dataPoints_2 // Data points for Person_2
		}]
	});
	chart.render();

	function toogleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		} else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
}

