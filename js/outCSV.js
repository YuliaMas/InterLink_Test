//table UI
function fillOutTable(head, data) {
	const headTb = document.getElementById("headTable");
	const dataTb = document.getElementById("dataTable");

	for (let i=0; i<head.length;i++) {
		const th = document.createElement("TH");
		th.innerText = head[i];
		headTb.appendChild(th);
	}

		data.forEach((value, key) => {
			const row = document.createElement("TR");
			const td = document.createElement("TD");
			console.log(value, key);
			td.innerText = key;
			row.appendChild(td);

			for (let i=0; i< head.length; i++) {
				let cell = document.createElement("TD");
				cell.innerText = "0";

				for (let j = 0; j < value.length; j++) {
						let d1 = new Date(value[j][0]);
						let d2 = new Date(head[i]);
						const recordDate = d1.getFullYear() + "-" + ("0"+(d1.getMonth()+1)).slice(-2) +"-"+("0" +
								d1.getDate()).slice(-2);
						const headDate = d2.toISOString().slice(0, 10);

						if (recordDate === headDate ) {
							cell.innerText = (+cell.innerText + +value[j][1]).toString();
						}
					}
				row.appendChild(cell);
				dataTb.appendChild(row);
				}
		})
}

//user-defined function to download CSV file
function downloadCSV(csv, filename) {
	let csvFile;
	let downloadLink;

	//define the file type to text/csv
	csvFile = new Blob([csv], {type: 'text/csv'});
	downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.href = window.URL.createObjectURL(csvFile);
	downloadLink.style.display = "none";

	document.body.appendChild(downloadLink);
	downloadLink.click();
}

//user-defined function to export the data to CSV file format
function exportTableToCSV(filename) {
	//declare a JavaScript variable of array type
	let csv = [];
	const rows = document.querySelectorAll("#tableToCSV table tr");

	//merge the whole data in tabular form
	for(let i=0; i<rows.length; i++) {
		let row = [], cols = rows[i].querySelectorAll("td, th");
		for( let j=0; j<cols.length; j++)
			row.push(cols[j].innerText);
		csv.push(row.join(","));
	}
	//call the function to download the CSV file
	downloadCSV(csv.join("\n"), filename);
}