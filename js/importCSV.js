const tableCSV = document.getElementById("tableCSV");
let obj_csv = {
	size:0,
	dataFile:[],
	dataType: 'text',
};

function readImage(input) {
	console.log(input)
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.readAsBinaryString(input.files[0]);
		reader.onload = function (e) {
			console.log(e);
			obj_csv.size = e.total;
			obj_csv.dataFile = e.target.result;
			console.log(obj_csv.dataFile);
			parseData(obj_csv.dataFile);
			printFileData(obj_csv.dataFile);
		}
	}
}

//table UI
function printFileData(data) {
	let allRows = data.split(/\r?\n|\r/);
	let table = '<table>';

	for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
		if (singleRow === 0) {
			table += '<thead>';
			table += '<tr>';
		} else {
			table += '<tr>';
		}

		let rowCells = allRows[singleRow].split(',');

		for (let rowCell = 0; rowCell < rowCells.length; rowCell++) {
			if (singleRow === 0) {
				table += '<th>';
				table += rowCells[rowCell];
				table += '</th>';
			} else {
				table += '<td>';
				table += rowCells[rowCell];
				table += '</td>';
			}
		}
		if (singleRow === 0) {
			table += '</tr>';
			table += '</thead>';
			table += '<tbody>';
		} else {
			table += '</tr>';
		}
	}

	table += '</tbody>';
	table += '</table>';
	tableCSV.innerHTML = table;
}
