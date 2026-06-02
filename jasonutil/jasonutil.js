import path from "path";
import fs from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, "../datasheet.json");


// Helper function to update the JSON file with results
export async function writeJsonResult(id, status) {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    
    const currentData = JSON.parse(fileContent.replace(/^\uFEFF/, ''));
    
    // Find the specific case by its ID and map the actual result
    const caseIndex = currentData.findIndex(item => item.id === id);
    if (caseIndex !== -1) {
        currentData[caseIndex].actualResult = status;
    }
    
    // Save back to file with clean 2-space formatting indentation
    await fs.writeFile(dataPath, JSON.stringify(currentData, null, 2), "utf-8");
}



