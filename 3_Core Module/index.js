// =============== CORE MODULE ===============================
// File System

const fs = require("fs");
const readline = require("readline");

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
// => Metode rl.question() menampilkan query dengan menuliskannya ke output, menunggu input pengguna diberikan pada input, lalu memanggil callback fungsi yang meneruskan input yang disediakan sebagai argumen pertama.

// rl.question("Masukan Nama Anda : ", (answer) => {
//   console.log(`${answer}, Terima Kasih Sudah Memasukan Nama Anda`);
//   rl.close();
// });

const ac = new AbortController();
const signal = ac.signal;

rl.question("What is your favorite food? ", { signal }, (answer) => {
  console.log(`Oh, so your favorite food is ${answer}`);
});

signal.addEventListener(
  "abort",
  () => {
    console.log("The food question timed out");
  },
  { once: true }
);

setTimeout(() => ac.abort(), 5000);
