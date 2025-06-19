const fs = require("fs").promises;

async function processFile() {
  try {
    const data = await fs.readFile("input.txt", "utf8");
    const modifiedData = data.toUpperCase();
    await fs.writeFile("output.txt", modifiedData);
    console.log("File has been written successfully!");
  } catch (err) {
    console.error("Error during file processing:", err);
  }
}

processFile();

//original callback.js code :
// const fs = require("fs");

// fs.readFile("input.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return;
//   }

//   const modifiedData = data.toUpperCase();

//   fs.writeFile("output.txt", modifiedData, (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//       return;
//     }

//     console.log("File has been written successfully!");
//   });
// });
