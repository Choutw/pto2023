alert(`Congratulations on completing your space journey!\n\
You’ve successfully embarked on an exciting and thrilling adventure.\n\
Below are all the locations you visited during this trip, along with their story descriptions.\n\
This itinerary is also provided to you as a reference for your future real space travels!\n`);

var urlParams = new URLSearchParams(window.location.search);
var arrayAsJSON = urlParams.get('array');
var retrievedArray = JSON.parse(decodeURIComponent(arrayAsJSON));

console.log(retrievedArray);