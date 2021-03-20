function parseData(data){
	let csvData = [];
	let line = data.split("\n");
	line.forEach(res => {
		csvData.push(res.split(","));
	});
	console.log(csvData.shift());
	console.log(csvData.sort());

	const test = Object.assign(csvData.map((k,i) => ({[k[0]] :
				{[k[1]]: [k[2]]}})))
	console.log(test);
	createOutTable(csvData);
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

function createOutTable(data) {
	let dataNameDate = [];
	let headerNameDate = [];
	let dataName = [];

	data.forEach(res => {
		headerNameDate.push(res[1]);
	});

	data.forEach(res => {
		dataName.push([ res[0], [ [res[1], res[2]] ] ]);
	});
	console.log(dataName);

	function unique(arr) {
		let result = [];
		for (let date of arr) {

			if (!result.includes(date)) {
				result.push(date);
			}
		}

		for (let i = 0; i <= result.length - 1; i++) {
			result.sort(function(a, b) {
				let dateA = new Date(a), dateB = new Date(b);
				return dateA-dateB;
			})
		}

		for (let i = 0; i < result.length ; i++) {
			let d = new Date(result[i]);
			const dateString = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) +"-"+("0" + d.getDate()).slice(-2);
			result[i] = dateString;
		}

		return result;
	}


	function uniqueName(arr){
		let resultName = [];
		for (let name of arr) {
			if (!resultName.includes(name)) {
				resultName.push(name);
			}
		}
		console.log(resultName);
		return resultName;
	}

	console.log(uniqueName(dataName));
	console.log(unique(headerNameDate));

	headerNameDate = unique(headerNameDate);

	dataNameDate.push(uniqueName(dataName));
	console.log(dataNameDate);

	let outputData = new Map();
	fullDataName(dataName);
	fillOutTable(headerNameDate,  outputData);

	function fullDataName(dataName) {

		for (let i=0; i < dataName.length; i++){

				if (outputData.get(dataName[i][0]) !== undefined){
					outputData.get(dataName[i][0]).push(dataName[i][1][0]);
				} else
					outputData.set(dataName[i][0], dataName[i][1]);
		}
		console.log(outputData);
	}
}