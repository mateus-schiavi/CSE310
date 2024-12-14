const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Define the file path based on the URL
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  let extname = path.extname(filePath);
  let contentType = "text/html";

  // Set the content type based on the file extension
  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".html":
      contentType = "text/html";
      break;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
