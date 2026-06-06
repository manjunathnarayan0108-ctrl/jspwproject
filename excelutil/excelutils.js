import test from "@playwright/test";
import ExcelJs from "exceljs";



export  async function writeExcelData(filepath, rowNumber, data,cell) {

    // create workbook instance and read the file form the filepath
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filepath);
    
    //get worksheet from the workbook and update the cell value in memory
    const worksheet = workbook.getWorksheet(1);
    
    // Update the cell value in memory
    worksheet.getRow(rowNumber).getCell(cell).value = data;
    
    // 3. CRITICAL MISSING LINE: Save the memory changes back to the physical file!
    await workbook.xlsx.writeFile(filepath);
}


     
export async function getExcelData(filepath,sheetName) {

    const workbook = new ExcelJs.Workbook();

     await workbook.xlsx.readFile(filepath);

     const worksheet=  workbook.getWorksheet(sheetName.trim());

         
       const data= [];

       const headers= [];

       worksheet.getRow(1).eachCell((cell,columnNumber)=>{

        headers[columnNumber]= cell.value;

         headers.push(cell.value);
       })


             const rowData= {

                    rowNumber: rowNumber,
                  };

        worksheet.eachRow((row,rowNumber)=>{

             if(rowNumber===1) return;


              headers.forEach((header,index)=>{

                 if(header==='S.No' ||header==='Actual Result'||header==='Expected Result'||header==='Status'||
                    header==='Test case status'){
                    return;
                 }
                     rowData[header]= row.getCell(index+1).value;
              })
             
        })

         data.push(rowData);
          
          return data;


}


         export async function writeExcelData(filePath,sheetName,rowNumber,actualResult,testCaseResult) {

              const workBook = new ExcelJs.Workbook();

              await workBook.xlsx.readFile(filePath);


               const workSheet= workBook.getWorksheet(sheetName.trim());

              let headerRow = workSheet.getRow(1);


               let actualResultColumn;

               let statusColumn;
               
                headerRow.eachCell((cell,columnNumber)=>{


                     if(cell.value==='Actual Result'){

                        actualResultColumn= columnNumber;
                     } 
                      
                      if(cell.value==='Test case status'){

                        statusColumn= columnNumber;
                      }


                       workSheet
                       .getRow(rowNumber)
                       .getCell(actualResultColumn)
                       .value= actualResult;


                       workSheet
                       . getCell(rowNumber,statusColumn)
                       .value=testCaseResult;


                        await workBook.xlsx.writeFile(filePath);
        
                })
         }


