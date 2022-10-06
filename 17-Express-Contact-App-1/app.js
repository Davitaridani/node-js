// =========== Express JS ===========
const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");
// Gunakan NPM EJS
app.set("view engine", "ejs");
// Third-party MidleWare
app.use(expressLayouts);

// Build-in Midleware
app.use(express.static("public"));

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
  const contacts = loadContact();
  response.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
    contacts,
  });
});

// Detail Contact
app.get("/contact/:nama", (request, response) => {
  const contact = findContact(request.params.nama);
  response.render("detailContact", {
    layout: "layouts/main-layouts",
    title: "Halaman Detail Contact",
    contact,
  });
});

app.get("/coba", (request, response) => {
  response.render("coba");
});

// Midleware
app.use("/", (reg, res) => {
  res.status(404);
  res.send("<h4>404</h4>");
});

app.listen(port, () => {
  console.log(`Contoh aplikasi Menjalankan di Port  ${port} `);
});
