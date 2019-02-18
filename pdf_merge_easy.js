const fs = require('fs');
console.log('post fs');
const merge = require('easy-pdf-merge');
console.log('post easy merge');
 
//get all files in this folder
const pdfFolder = './DocumentationPDF/Analysis';
const destination = './Merged_PDF.pdf';


fs.readdir(pdfFolder, (err, files) => {
   let fullFileList = [];
   for(let i=0; i<files.length; i++){
        fullFileList.push(pdfFolder + '/' + files[i] );
   }
   console.log('Detected files: ', fullFileList);
   merge(fullFileList,destination,function(err){

        if(err)
        return console.log(err);

        console.log('Success , merged',fullFileList );
    });
});


