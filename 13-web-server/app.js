const http = require("http");
const fs = require("node:fs");

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("File : File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-Type": "text/html",
  });

  // Juga bisa Dengan Switch Case
  const url = req.url;
  if (url === "/about") {
    renderHTML("./about.html", res);
  } else if (url === "/contact") {
    renderHTML("./contact.html", res);
  } else {
    renderHTML("./index.html", res);
  }
});

server.listen(3000, () => {
  console.log("Server Anda Berjalan Di Port 3000");
});
