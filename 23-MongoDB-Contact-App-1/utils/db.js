const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

// // Menmabhkan 1 data
// const contact_1 = new contact({
//   nama: "Dimas Ainur",
//   nohp: "085356783888",
//   email: "dimasainur@gmail.com",
// });

// // SImpan Collection
// contact_1
//   .save()
//   .then((result) => console.log(result))
//   .catch((err) => {});
