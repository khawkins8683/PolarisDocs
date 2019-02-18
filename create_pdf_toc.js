const PDFDocument = require('pdfkit');
const path = require('path');
const fs= require('fs'); 
const PDFMerge = require('pdf-merge');



// ------ Main ------  ----- -------- ---------------




//create empty pdf
// const doc = new PDFDocument;
// doc.pipe(fs.createWriteStream(dest)); // write to PDF
// // add stuff to PDF here using methods described below...
// let files = dirFileList(pdfFolder);
// console.log('found ',files);
// createFileLink(doc, files[[1]] );

// doc.fontSize(20)
//    .fillColor('red')
//    .text('Another link!', 20, 30, {
//      link: 'http://apple.com/',
//      underline: true
//    }
// );
// // finalize the PDF and end the stream
// doc.end();
//Main ------- End --------- ----- ----------- --------





// all directories
const dirList = function(baseDir){
    //retun list of ./base/dir1 ,..../base/dir2
}

//utility functions
const fileList = function(baseDir){
     let files = fs.readdirSync(pdfFolder);
     let fullFileList = [];
     for(let i=0; i<files.length; i++){
          fullFileList.push( path.join(pdfFolder , files[i]) );
     }
     return fullFileList;
}
//Add a package section

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



//desitination and link directories
const pdfFolder = path.join('.', 'DocumentationPDF', 'Test');
const dest = path.join(__dirname,'new_pdf.pdf');

//test merge 
let pdfs = fileList(pdfFolder);
console.log('Merging files: ',pdfs);
PDFMerge(pdfs, {output: path.join(__dirname,'new_pdf_merged.pdf')} )
    .then(()=>console.log("Merged files"));

