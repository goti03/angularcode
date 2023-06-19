import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from "exceljs/dist/exceljs.min.js";
import { isNumeric } from 'rxjs/internal-compatibility';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportTableAsExcelFile(element:any,excelFileName:string){
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    console.log('ws',ws);
   
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // const excelBuffer: any =XLSX.writeFile(wb, excelFileName);
    const excelBuffer: any =XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
     
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(excelFileName);
    var header1 = Object.keys(json[0]);
    let header = [];
    for(let a of header1){
      header.push(a.toUpperCase());
    }
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    headerRow.font = { name: 'Comic Sans MS', family: 4, size: 10, bold: true };
    headerRow.height = 30;
    for (let x1 of json) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      var a = worksheet.addRow(temp);
      a.alignment = { horizontal : 'left'};
    }
    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      var number;
      var secondcheckForNum = true;
      var iteration = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 20;
          if (columnLength > maxLength ) {
              maxLength = columnLength;
          }
          number = isNumeric(cell.value);
          if(number == false && iteration != 0){
            secondcheckForNum = false;
          }
          iteration++;
      });
      column.width = maxLength < 20 ? 20 : maxLength+5;
      if(number && secondcheckForNum){
        column.alignment = { horizontal : 'right'};
      }
  });
  headerRow.alignment = {  vertical : 'center', horizontal : 'center'};
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, excelFileName + '_Export_'  + new Date().valueOf() + '.xlsx');
    });

    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_Export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}