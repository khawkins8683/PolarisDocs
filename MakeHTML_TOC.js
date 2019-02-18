//Go in and for every dir with every file create a link for every.html file
//post this on the github pages - contact Virginia and Morgan about going live
//Get Path and fs
const fs = require('fs');
const path = require('path');

//Utility functions
let htmlQ = function(input){
    if(typeof input === 'string'){
        const inputSplit = input.split('.');
        return inputSplit[inputSplit.length-1] === "html";
    }else{
        return false;
    }
}
let writeLink = function(file){
    let input = '\n\t\t<li><a href="'+ file +'">';
    input = input + path.basename(file, '.html');
    return input + '</li></a>'
}
let writeTitle = function(dir){
    let input = '\n\t<h2>';
    input = input + path.basename(dir);
    return input + '</h2>';
}
let writeSection = function(stream, dir){
    //first write title 
    stream.write(writeTitle(dir) + '\n\t<ul>');
    //get all files
    const files = fs.readdirSync(dir);
    let fullFile = '';
    for(let i =0; i<files.length; i++){
        fullFile = path.join(dir,files[[i]]);
        if(htmlQ(fullFile))
            stream.write(writeLink(fullFile));
    }
    stream.write('\n\t</ul>');
}

///--------------MAIN ----------MAIN ---------------
let main = function(docBaseDir){
    //Create write stream
    const htmlStream = fs.createWriteStream(path.join('.' , 'index.html'));
    //write html head
    htmlStream.write('<html>\n<head>\n\t<link rel="stylesheet" type="text/css" href="style.css">\n\t<title>Polaris-M Docs</title>\n</head>\n<body>');
    //write Polaris - M header
    htmlStream.write('<div id="polarisHeader">\n\t<img src="./Images/logo.png">\n\t<p>hello world</p></div>')
    const dirList = fs.readdirSync(docBaseDir);
    let dir = '';
    for(let i = 0; i<dirList.length; i++){
        dir = path.join(docBaseDir,dirList[[i]]);
        writeSection(htmlStream,dir);
    }
    htmlStream.end('\n</body>\n</html>');
}

// -- Main Call -- 
const docBaseDir = path.join('.','DocumentationPDF');
main(docBaseDir);