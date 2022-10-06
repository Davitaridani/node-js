// =========== Express JS ===========
const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");

// Gunakan NPM EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

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

app.get("/coba", (request, response) => {
  response.render("coba");
});

// Midleware
app.use("/", (reg, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Contoh aplikasi Menjalankan di Port  ${port} `);
});
