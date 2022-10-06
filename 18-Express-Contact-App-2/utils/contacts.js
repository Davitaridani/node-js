const fs = require("fs");

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

// Ambil semua data di Contact.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contact-app.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// Cari Contact Berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// Menuliskan / Menimpa file contacts.json degn data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contact-app.json", JSON.stringify(contacts));
};

// Tambah Data Contact Baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// Cek Nama Yang Dupliket/Sudah Ada
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

module.exports = { loadContact, findContact, addContact, cekDuplikat };
