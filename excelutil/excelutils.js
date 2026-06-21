import ExcelJs from "exceljs";

export async function getExcelData(filePath, sheetName) {

    

    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet =
        workbook.getWorksheet(sheetName.trim());

    const data = [];
    const headers = [];

    worksheet.getRow(1).eachCell((cell) => {

        headers.push(cell.value);
    });

    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber === 1) return;

        const rowData = {
            rowNumber
        };

        console.log("Headers:");
headers.forEach(h => console.log(`[${h}]`));

        headers.forEach((header, index) => {

            if (
                header === "Actual Result" ||
                header === "Status" ||
                header === "Test case status"
            ) {
                return;
            }

            rowData[header] =
                row.getCell(index + 1).value;
        });

        data.push(rowData);
    });

    return data;
}



export async function writeExcelData(
    filePath,
    sheetName,
    rowNumber,
    actualResult,
    testCaseResult
) {

    const workBook = new ExcelJs.Workbook();

    await workBook.xlsx.readFile(filePath);

    const workSheet =
        workBook.getWorksheet(sheetName.trim());

    const headerRow =
        workSheet.getRow(1);

    let actualResultColumn;
    let statusColumn;

    headerRow.eachCell((cell, columnNumber) => {

        if (cell.value === "Actual Result") {

            actualResultColumn = columnNumber;
        }


        if (cell.value === "Test case status") {

            statusColumn = columnNumber;
        }
    });

    
    workSheet
        .getRow(rowNumber)
        .getCell(actualResultColumn)
        .value = actualResult;

    workSheet
        .getRow(rowNumber)
        .getCell(statusColumn)
        .value = testCaseResult;

    await workBook.xlsx.writeFile(filePath);
}

