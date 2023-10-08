alert(`Congratulations on completing your space journey!\n\
You’ve successfully embarked on an exciting and thrilling adventure.\n\
Below are all the locations you visited during this trip, along with their story descriptions.\n\
This itinerary is also provided to you as a reference for your future real space travels!\n`);

var urlParams = new URLSearchParams(window.location.search);
var arrayAsJSON = urlParams.get('array');
var retrievedArray_num = JSON.parse(decodeURIComponent(arrayAsJSON));
var arrayAsJSON2 = urlParams.get('array2');
var retrievedArray_src = JSON.parse(decodeURIComponent(arrayAsJSON2));
var arrayAsJSON3 = urlParams.get('array3');
var retrievedArray_act = JSON.parse(decodeURIComponent(arrayAsJSON3));

console.log(retrievedArray_num);
console.log(retrievedArray_src);
console.log(retrievedArray_act);

function createTable(tableData) {
  var divide = document.createElement('div');
  divide.className = 'tbl-content';
  var table = document.createElement('table');
  table.cellPadding = "0";
  table.cellSpacing = "0";
  table.border = "0";
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
/*
    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
*/

    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(rowData[0]));
    row.appendChild(cell);

    var img = document.createElement('img');
    img.src = "./resources/" + rowData[1];
    img.style.width = '400px';
    row.appendChild(img);

    var cell2 = document.createElement('td');
    cell2.appendChild(document.createTextNode(rowData[2]));
    row.appendChild(cell2);

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

var route_table = [];
for (var i = 0; i < retrievedArray_num.length; i++){
    var temp = [];
    
    temp.push(retrievedArray_num[i]);
    temp.push(retrievedArray_src[i]);
    temp.push(retrievedArray_act[i]);

    route_table.push(temp);
}

console.log(route_table);
createTable(route_table);
