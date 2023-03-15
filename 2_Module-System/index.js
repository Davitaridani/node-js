// =============== MODULE  SYSTEM ===============================
// 1. Core Module
// 2. local Module
// 3. Third Party Module

// Urutan Module
// const fs = require("fs"); // Core Module (Contoh)
// const cetakNama = require("./coba"); //Local Module
// const momen = require("momen"); // third party module/node_module (NPM Module)

const coba = require("./coba");

console.log(
  coba.cetakNama("Ahmat Davit Ari Dani"),
  coba.umur,
  coba.mhs.cetakMhs(),
  new coba.Person()
);
