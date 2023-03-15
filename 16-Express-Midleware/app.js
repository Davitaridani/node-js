// =========== Express JS ===========
const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

// Set Up NPM View Engine EJS
app.set("view engine", "ejs");
// Third-party MidleWare
app.use(expressLayouts);

// Build-in Midleware
app.use(express.static("public"));
app.use(morgan("dev"));

// App Level Midleware
app.use((reg, res, next) => {
  console.log("Time :", Date.now());
  next();
});

app.get("/", (request, response) => {
  const mhs = [
    { nama: "Ahmat", alamat: "Jember" },
    { nama: "Davit", alamat: "Lumajang" },
    { nama: "Ari", alamat: "Bandung" },
  ];

  response.render("index", {
    layout: "layouts/main-layouts",
    nama: "Ahmat Davit",
    title: "Halaman Home",
    mhs,
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

app.get("/contact", (request, response) => {
  response.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
  });
});

// Midleware
app.use("/", (reg, res) => {
  res.status(404);
  res.send("<h4>404</h4>");
});

app.listen(port, () => {
  console.log(`Contoh aplikasi Menjalankan di Port  ${port} `);
});
