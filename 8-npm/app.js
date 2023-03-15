const validator = require("validator");
const chalk = require("chalk");

// untuk mengecek apakah string tyoe email  apa bukan
// console.log(validator.isEmail("davitaridani@gmail.com"));

// => cek apakah inputan nomer indonesia
// console.log(validator.isMobilePhone("081232421", "id-ID"));

// => cek apakah inputan berisi angka
// console.log(validator.isNumeric("081232421"));

// ==================== NPM CHALK ==================
// =================================================

console.log(chalk.blue("Hello world!"));
console.log(chalk.red("Ahmat Davit"));
