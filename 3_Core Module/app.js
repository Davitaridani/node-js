// =============== CORE MODULE ===============================
// File System

const fs = require("fs");
const readline = require("readline");

// ===== Menuliskan File Secara Synchronous =============
// try {
//   fs.writeFileSync("data/test.txt", "Secara Synchronous");
// } catch (err) {
//   console.log(err);
// }

// ===== Menuliskan File Secara Asynchronous =============
// fs.writeFile("data/test.txt", "Hello Word Secara Asynchronous", (err) => {
//   console.log(err);
// });

// Membaca file secara Sync
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// Membaca file secara Async
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// ==============================

// Membaca melalui Commond Promp
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Masukan Nama Anda : ", (nama) => {
//   rl.question("Masukan No HP Anda : ", (noHp) => {
//     const contact = {
//       nama,
//       noHp,
//     };

//     const file = fs.readFileSync("data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file);
//     contacts.push(contact);
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//     console.log("Terima Kasih");

//     rl.close();
//   });
// });

// ================ DOCS READLINE NODE JS ===================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  ========== Event Line ==========
// ==> Event'line'dipancarkan setiap kali inputaliran menerima input akhir baris

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("line", (nama) => {
//   console.log(`Masukan Nama Anda Adalah ${nama}`);
//   rl.close();
// });

//  ========== Event History ==========
// rl.on("history", (history) => {
//   console.log(`Received: ${history}`);
// });

// ============== rl.question ==============
rl.question("Masukan Nama Anda ? ", (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});
