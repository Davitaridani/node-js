const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// Set Up method-override
app.use(methodOverride("_method"));

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

// Form Add Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layouts",
  });
});

// Proses Add Data Contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render("add-contact", {
        title: "Form Tambah Data Kontak",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (err, result) => {
        // Kirimkan flash Pesan
        req.flash("msg", "Data Contact Berhasil Di Tambahkan");
        res.redirect("/contact");
      });
    }
  }
);

// Delete Contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   // Jika Contact Tidak Ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h4>404</h4>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       // Kirimkan flash Pesan
//       req.flash("msg", "Data Contact Berhasil di Hapus!");
//       res.redirect("/contact");
//     });
//   }
// });

// Form Ubah/Edit Data Contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({
    nama: req.params.nama,
  });

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

// Delete Contact
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    // Kirimkan flash Pesan
    req.flash("msg", "Data Contact Berhasil di Hapus!");
    res.redirect("/contact");
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

// Proses Ubah/Edit Data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
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
      res.render("edit-contact", {
        title: "Form Ubah Data Kontak",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // Kirimkan flash Pesan
        req.flash("msg", "Data Contact Berhasil Di Ubah");
        res.redirect("/contact");
      });
    }
  }
);

app.listen(port, () => console.log(`Berjalan DI Posrt ${port}`));
