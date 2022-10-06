const yargs = require("yargs");
const kontak = require("./kontak");

yargs.command({
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
});

yargs.parse();
