// const http = require("http");
// const fs = require("node:fs");

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("File : File Not Found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "content-Type": "text/html",
//   });

//   // Juga bisa Dengan Switch Case
//   const url = req.url;
//   if (url === "/about") {
//     renderHTML("./about.html", res);
//   } else if (url === "/contact") {
//     renderHTML("./contact.html", res);
//   } else {
//     renderHTML("./index.html", res);
//   }
// });

// server.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });

// =========== Express JS ===========
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.sendFile("./index.html", {
    root: __dirname,
  });
});

app.get("/contact", (request, response) => {
  response.sendFile("./contact.html", {
    root: __dirname,
  });
});

app.get("/about", (request, response) => {
  response.sendFile("./about.html", {
    root: __dirname,
  });
});

app.get("/coba", (request, response) => {
  response.sendFile("./coba.html", {
    root: __dirname,
  });
});

// Midleware
app.use("/", (reg, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Contoh aplikasi Menjalankan di Port  ${port} `);
});
