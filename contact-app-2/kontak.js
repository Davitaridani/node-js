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

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync("data/contact-app.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

  // Cek Jika ada Data yang sama / Cek Duplikat
  const duplikatData = contacts.find((contact) => contact.email === email);

  if (duplikatData) {
    console.log(chalk.red`Data Sudah Terdaftar, Gunakan Data Lain!!`);
    return false;
  }

  // cek Email Valid atau tidak
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

module.exports = { simpanContact };
