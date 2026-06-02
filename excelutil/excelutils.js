import ExcelJs from "exceljs";

export async function writeExcelData(filepath, rowNumber, data) {
    // 1. REMOVE 'await' from 'new ExcelJs.Workbook()' (Creating an object instance is synchronous)
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filepath);
    
    // 2. REMOVE 'await' from 'workbook.getWorksheet(1)' (This is a synchronous method)
    const worksheet = workbook.getWorksheet(1);
    
    // Update the cell value in memory
    worksheet.getRow(rowNumber).getCell(4).value = data;
    
    // 3. CRITICAL MISSING LINE: Save the memory changes back to the physical file!
    await workbook.xlsx.writeFile(filepath);
}

export async function getExcelData(filepath) {
    const workbook = new ExcelJs.Workbook(); // Removed 'await'
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet(1); // Removed 'await'

    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            data.push({
                rowNumber: rowNumber, // 4. CRITICAL MISSING LINE: You must pass the rowNumber back to your test!
                username: row.getCell(1).value,
                password: row.getCell(2).value,
                expected: row.getCell(3).value
            });
        }
    });

    return data;
}