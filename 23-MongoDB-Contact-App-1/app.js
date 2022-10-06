const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");

require("./utils/db");
const Contact = require("./model/contact");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// Configurasi Flash
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Set Up EJS
// Gunakan NPM EJS
app.set("view engine", "ejs");
// Third-party MidleWare
app.use(expressLayouts);
// Build-in Midleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const mhs = [
    { nama: "Ahmat", alamat: "Jember" },
    { nama: "Davit", alamat: "Lumajang" },
    { nama: "Ari", alamat: "Bandung" },
  ];

  res.render("index", {
    layout: "layouts/main-layouts",
    nama: "Ahmat Davit Ari Dani",
    title: "Halaman Home",
    mhs,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  // Contact.find().then((contact) => {
  //   res.send(contact);
  // });

  const contacts = await Contact.find();
  res.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman Contact Detail
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detailContact", {
    layout: "layouts/main-layouts",
    title: "Halaman Detail Contact",
    contact,
  });
});

app.listen(port, () => console.log(`Berjalan DI Posrt ${port}`));
