import validator from "validator";
import chalk from "chalk";

// NPM Validator

console.log(validator.isEmail("foo@bar.com"));
console.log(validator.isMobilePhone("08537348382", "id-ID"));
console.log(validator.isNumeric("08537348382", "id-ID"));

// NPM Chalk
const nama = "Ahmat Davit ";
const pesan = chalk.bgRed`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, beatae! ${nama}`;

console.log(pesan);
