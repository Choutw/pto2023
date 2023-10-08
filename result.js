alert(`This is your result\nEnjoy it!!\n`);

var urlParams = new URLSearchParams(window.location.search);
var arrayAsJSON = urlParams.get('array');
var retrievedArray = JSON.parse(decodeURIComponent(arrayAsJSON));

console.log(retrievedArray)