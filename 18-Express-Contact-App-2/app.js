// =========== Express JS ===========
const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Configuration NPM Flash
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

// Gunakan NPM EJS
app.set("view engine", "ejs");
// Third-party MidleWare
app.use(expressLayouts);
// Build-in Midleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (request, response) => {
  const mhs = [
    { nama: "Ahmat", alamat: "Jember" },
    { nama: "Davit", alamat: "Lumajang" },
    { nama: "Ari", alamat: "Bandung" },
  ];
  response.render("index", {
    layout: "layouts/main-layouts",
    nama: "Ahmat Daviit",
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

app.get("/contact", (req, response) => {
  const contacts = loadContact();
  response.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// Form Add Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layouts",
  });
});

// Proses Data Conntact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Kontak Sudah Terdaftar !!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("nohp", "No HP Tidak Valid !!").isMobilePhone("id-ID"),
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Kontak",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // Kirimkan flash Pesan
      req.flash("msg", "Data Contact Berhasil Di Tambahkan");
      res.redirect("/contact");
    }
  }
);

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
