const cetakNama = (nama) => `hallo nama saya ${nama}`;

const umur = 22;

const mhs = {
  nama: "Ahmat Davit Ari",
  alamat: "Jember",
  cetakMhs() {
    return `halo nama  Saya ${this.nama}, Alamat Sata ${this.alamat}`;
  },
};

class Person {
  constructor() {
    console.log("Object telah Di Buat");
  }
}

// ====== Cara Biasa ========
// module.exports.cetakNama = cetakNama;
// module.exports.umur = umur;
// module.exports.mhs = mhs;
// module.exports.Person = Person;

module.exports = {
  cetakNama,
  umur,
  mhs,
  Person,
};
