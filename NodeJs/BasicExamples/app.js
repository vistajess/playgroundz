var path = require('path');
var websiteHome = "Desktop/Jess//sampleNode/index.html"; 
var websiteAbout = "Desktop/Jess/sampleNode/about.html";
//`dirname` = "Desktop/Jess/sampleNode/" directory without the core file
//`basename` = "index.html"
//`ext` = .html
console.log(path.normalize(websiteHome));
console.log(path.dirname(websiteAbout));
console.log(path.basename(websiteAbout));
console.log(path.extname(websiteAbout));

// =============

console.log(__dirname); // displays the full path
console.log(__filename); // displays the full path plus the file name