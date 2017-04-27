function addMultiDatesPicker(id) {
	$(`#${id}`).multiDatesPicker({
	dateFormat: "yymmdd"});
}			

function clearDates(id) {
	$(`#${id}`).multiDatesPicker('resetDates', 'picked');
}

function printValuesOfDatePicker() {
	var selectedValues = $("#multidatepicker").multiDatesPicker('getDates');
	selectedValues.forEach(function(entry) {
		$("#printDiv").append("<p>" + entry + "</p>");
	});
}

function reactOnSelection(selectId, inputId, customText) {    
    var valueOfRoute = document.getElementById(selectId).value;
    if (valueOfRoute === customText) {
    	$(`#${inputId}`).show();
    	$(`#${selectId}`).hide();
    }
}
    
function clearForm() {
	$("#routeCustom").hide();
    $("#reasonCustom").hide();
    $("#distCustom").hide();
    $("#route").show();
    $("#reason").show();
    $("#dist").show();
	document.getElementById("collectData").reset();
	clearDates("calendarAndButtons");
}

function getDataFromForm() {
    var formElements = $(document.getElementById("collectData").elements).filter(":visible");
    var formValues = [];
    for (var i = 0; i < formElements.length; i++) {
    	formValues.push(formElements[i].value);
    }
    var calcValue = formElements[2].value * formElements[3].value;
    formValues.push(calcValue.toFixed(2));
    return formValues;
    }
	
var entrySet = [];

function prepareData(formValues) {
	var selectedDates = $("#calendarAndButtons").multiDatesPicker('getDates');
	for(i in selectedDates) {
		var oneRowEntry = [];
		oneRowEntry.push(selectedDates[i]);
		oneRowEntry = oneRowEntry.concat(formValues);
		entrySet.push(oneRowEntry);
	}
}

function sortData(arrayData) {
	function sortFunction(a, b) {
		if (a[0] === b[0]) {
			return 0;
		}
    	else if (a[0] < b[0]) {
    		return -1;
    	}
    	else {
    		return 1;
    	}
	}
	return arrayData.sort(sortFunction);
}

var sortedData;

function processData() {
	var formValues = getDataFromForm();
	prepareData(formValues);
	sortedData = sortData(entrySet);
}


function updateTableWithData(sortedData) {
	$("#tableBody").html("");
	for (var i = 0; i < sortedData.length; i++) {
		var date = sortedData[i][0];
		date = date.slice(6) + "-" + date.slice(4, 6) + "-" + date.slice(0, 4)
		$("#tableBody").append(
			"<tr>" +
				"<td>" + (i+1) + "</td>" + 
				"<td>" + date + "</td>" +
				"<td>" + sortedData[i][1] + "</td>" + 
				"<td>" + sortedData[i][2] + "</td>" + 
				"<td>" + sortedData[i][3] + "</td>" +
				"<td>" + sortedData[i][4] + "</td>" + 
				"<td>" + sortedData[i][5] + "</td>" +
				"<td></td>" + 
				"<td></td>" +
			"</tr>")
	}
}


function displayData() {
	processData();
	console.log(sortedData);
	updateTableWithData(sortedData);
}

function removeLastRow() {
	if (sortedData.length > 0) {
		sortedData.splice(sortedData.length - 1);
	}
	console.log(sortedData);
	updateTableWithData(sortedData);
}






