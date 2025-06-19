const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Directory to manage files
const baseDir = path.join(__dirname, "files");

// Ensure the "files" directory exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const filename = query.filename;
  const filepath = path.join(baseDir, filename || "");

  res.setHeader("Content-Type", "text/plain");

  if (pathname === "/create") {
    if (!filename || !query.content) {
      res.writeHead(400);
      return res.end("Missing filename or content");
    }

    fs.writeFile(filepath, query.content, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error creating file");
      }
      res.end(`File '${filename}' created successfully`);
    });
  } else if (pathname === "/read") {
    if (!filename) {
      res.writeHead(400);
      return res.end("Missing filename");
    }

    fs.readFile(filepath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found");
      }
      res.end(`Content of '${filename}':\n\n${data}`);
    });
  } else if (pathname === "/delete") {
    if (!filename) {
      res.writeHead(400);
      return res.end("Missing filename");
    }

    fs.unlink(filepath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found or already deleted");
      }
      res.end(`File '${filename}' deleted successfully`);
    });
  } else {
    res.writeHead(404);
    res.end("Invalid endpoint. Use /create, /read, or /delete");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
