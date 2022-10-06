const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Mmebuat Folder Data JIka Belum Ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Mmebuat File Json Jika Belum Ada
const filePath = "./data/contact-app.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// Membuat Pertanyaan
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);
  fs.writeFileSync(filePath, JSON.stringify(contacts));

  console.log("Terima Kasih Sudah Memasukan Data");
  rl.close();
};

module.exports = { tulisPertanyaan, simpanContact };
