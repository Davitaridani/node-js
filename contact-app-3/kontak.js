const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Mmebuat Folder Data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Mmebbuat File Json Jka Belum Ada
const filePath = "./data/contact-app.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Load Data Contact
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact-app.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  //  const fileBuffer = fs.readFileSync("data/contact-app.json", "utf-8");
  //  const contacts = JSON.parse(fileBuffer);

  // Panggil Function
  const contacts = loadContact();

  // Cek Jika ada Data yang sama
  const duplikatData = contacts.find((contact) => contact.email === email);

  if (duplikatData) {
    console.log(chalk.red`Data Sudah Terdaftar, Gunakan Data Lain!!`);
    return false;
  }

  // cek Email Valid apa tidak
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold("Email Anda Tidak Valid!!"));
      return false;
    }
  }

  // Cek No HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.bold("No HP Anda Tidak Valid!!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contact-app.json", JSON.stringify(contacts));

  console.log(chalk.green("Terima Kasih Sudah Memasukan Data"));
};

// List Contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.green("===== Daftar Data Kontak ====="));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHP} `);
  });
};

// Detail Contact
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.bold(`${nama} Tidak Di Temukan !!`));
    return false;
  }

  console.log(chalk.green(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

// Delet Kontak
const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red.bold(`${nama} Tidak Di Temukan !!`));
    return false;
  }

  fs.writeFileSync("data/contact-app.json", JSON.stringify(newContact));

  console.log(chalk.green(`Data ${nama} Berhasil Di Hapus !!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
