const kontak = require("./kontak");

const main = async () => {
  const nama = await kontak.tulisPertanyaan("Masukan Nama Anda : ");
  const email = await kontak.tulisPertanyaan("Masukan Email Anda : ");
  const noHP = await kontak.tulisPertanyaan("Masukan Nomor Anda : ");

  kontak.simpanContact(nama, email, noHP);
};

main();
