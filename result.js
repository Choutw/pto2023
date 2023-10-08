alert(`Congratulations on completing your space journey!\n\
You’ve successfully embarked on an exciting and thrilling adventure.\n\
Below are all the locations you visited during this trip, along with their story descriptions.\n\
This itinerary is also provided to you as a reference for your future real space travels!\n`);

var urlParams = new URLSearchParams(window.location.search);
var arrayAsJSON = urlParams.get('array');
var retrievedArray = JSON.parse(decodeURIComponent(arrayAsJSON));

console.log(retrievedArray);

fetch('travel_data.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n');
        const headers = rows[0].split(',');
        const parsedData = [];

        for (let i = 1; i < rows.length; i++) {
            const obj = {};
            const currentRow = rows[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentRow[j];
            }

            parsedData.push(obj);
        }

        console.log(parsedData); // Parsed data
    });

//
var tbody = document.querySelector('#data-table tbody');

for (var i = 0; i < retrievedArray.length; i++) {
    var rowIndex = retrievedArray[i]; // get index

    // Create new line
    var row = document.createElement('tr');

    // 
    var rowData = parsedData[rowIndex];

    // 
    for (var key in rowData) {
        if (rowData.hasOwnProperty(key)) {
            var cell = document.createElement('td');
            cell.textContent = rowData[key]; 
            row.appendChild(cell); 
        }
    }

    tbody.appendChild(row); 
}






