const yargs = require("yargs");
const kontak = require("./kontak");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Kontak Baru",
    builder: {
      nama: {
        describe: "Nama Anda",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email Anda",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No Hp Anda",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      kontak.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Unutk menampilkaan daftar contact/data
yargs.command({
  command: "list",
  describe: "Menampilkan Semua Data Nama dan No HP Contact",
  handler() {
    kontak.listContact();
  },
});

// Unutk Menampikan Detail Sebuah Kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan Detail Sebuah Contact",
  builder: {
    nama: {
      describe: "Nama Anda",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    kontak.detailContact(argv.nama);
  },
});

// Hapus Kontak Berdasarkan Nama
yargs.command({
  command: "delete",
  describe: "Menghapus Kontak Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Anda",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    kontak.deleteContact(argv.nama);
  },
});

yargs.parse();
