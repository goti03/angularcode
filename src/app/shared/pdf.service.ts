import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import * as moment from 'moment/moment.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;  



export class PdfService{

    
    pdf(body, title, pageSize) {
        var Orientation = 'portrait';
        if(pageSize != 'A4'){
          Orientation = 'landscape';
        }
        var title1 = title+"_"+moment().format('YYYYMMDDHHmmss');
        let docDefinition = { 
          pageSize: pageSize,
          pageOrientation: Orientation,
          info: {
            title: title1,
          },
          content: [  
              {
                text: title,  
                style: 'headerStyle'  
              },
             
              {  
                layout: 'lightHorizontalLines',
                headerRows: 1,
                  table: {  
                      body: body,
                  }  
              }  
          ], 
          styles : {
            headerStyle : {
              fontSize : 20,
              bold:true,
              alignment: 'center',
              margin: [0, 15, 0, 15]  
    
            }
          } 
      }  
       pdfMake.createPdf(docDefinition).open();  
      }
}