const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const modifiedData = data.toUpperCase();

  fs.writeFile("output.txt", modifiedData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }

    console.log("File has been written successfully!");
  });
});
