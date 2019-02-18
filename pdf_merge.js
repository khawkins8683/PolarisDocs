
//version 1 -------------------------------------------------------------------------------------
// const fs = require('fs');
// const merge = require('easy-pdf-merge');
// const path = require('path');
 
// //get all files in this folder
// const pdfFolder = path.join(__dirname, 'DocumentationPDF', 'Analysis');
// const dest = path.join(__dirname,'combined_pdf.pdf');
// console.log(pdfFolder,'\n',dest);


// fs.readdir(pdfFolder, (err, files) => {
//    let fullFileList = [];
//    for(let i=0; i<files.length; i++){
//         fullFileList.push(path.join(pdfFolder , files[i]) );
//    }
//    console.log('Detected files: ', fullFileList);
//    merge(fullFileList,dest,function(err){

//         if(err)
//         return console.log(err);

//         console.log('Success , merged',fullFileList );
//     });
// });

//version 2----------------------------------------------------------------------------------------
// const PDFMerge = require('pdf-merge');
// const fs = require('fs');
// var path = require('path');

 
// //get all files in this folder
// const pdfFolder = path.join(__dirname, 'DocumentationPDF', 'Analysis');
// const dest = path.join(__dirname,'combined_pdf.pdf');
// console.log(pdfFolder,'\n',dest);

// fs.readdir(pdfFolder, (err, files) => {
   
//    let fullFileList = [];
//    for(let i=0; i<files.length; i++){
//         fullFileList.push( path.join(pdfFolder , files[i]) );
//    }
//    console.log('combining',fullFileList);
//    PDFMerge(fullFileList, {output: dest})
//     .then((buffer) => {console.log('saved new file')});
// });

//this is refferencing the current directory
// const files = [
//     `${__dirname}/1.pdf`,
//     `${__dirname}/2.pdf`,
//     {file: `${__dirname}/protected.pdf`, inputPw: '_SeCrEt_'}
// ];
 
// function mergePDF(fileList) {
//      PDFMerge(fileList, {output: `${__dirname}/combined_pdf.pdf`})
//           .then((buffer) => {console.log('saved new file')});
// }

///Version 3 ------------------------------------------------------------------------------
// const pdftk = require('node-pdftk');
// const path = require('path');
// const fs= require('fs'); 

// const pdfFolder = path.join(__dirname, 'DocumentationPDF', 'Analysis');
// const dest = path.join(__dirname,'combined_pdf.pdf');

// fs.readdir(pdfFolder, (err, files) => {
   
//    let fullFileList = {};
//    let  = null;
//    for(let i=0; i<3; i++){
//      fspath = path.join( pdfFolder , files[i]);
//      if(fs.existsSync(fspath)){
//           console.log(fspath,"exists");
//           fullFileList['pdf' + i] = fspath;
//      }
//    }
//    console.log('detected ', fullFileList , ' files');
//    let keyList = Object.keys(fullFileList).join(" ");
//    pdftk.input(fullFileList).cat(keyList).output(dest)
//      .then(buffer => {
//      // Do stuff with the output buffer
//           console.log('success');
//      })
//      .catch(err => {
//      // handle errors
//           console.log('error detected:',err);
//           return err;
//      });
// });

//PDF kit
const PDFDocument = require('pdfkit');
const path = require('path');
const fs= require('fs'); 

//desitination and link directories
const pdfFolder = path.join('.', 'DocumentationPDF', 'Analysis');
const dest = path.join(__dirname,'new_pdf.pdf');

//create empty pdf
const doc = new PDFDocument;
doc.pipe(fs.createWriteStream(dest)); // write to PDF


//this probably needs to be done with a relative path
const dirFileList = function(baseDir){
     let files = fs.readdirSync(pdfFolder);
     let fullFileList = [];
     for(let i=0; i<files.length; i++){
          fullFileList.push( path.join(pdfFolder , files[i]) );
     }
     return fullFileList;
}
//add link to pdf
const createFileLink = function(doc,file){
     let name = path.basename(file);     
     doc.fontSize(20)
          .fillColor('red')
          .text(name, 20, 0, {
               link: file,
               underline: true
     });     
}

// add stuff to PDF here using methods described below...
let files = dirFileList(pdfFolder);
console.log('found ',files);
createFileLink(doc, files[[1]] );

doc.fontSize(20)
   .fillColor('red')
   .text('Another link!', 20, 30, {
     link: 'http://apple.com/',
     underline: true
   }
);
// finalize the PDF and end the stream
doc.end();



