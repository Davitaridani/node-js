const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("koneksi gagal");
  }

  //  Pilih DB
  const db = client.db(dbName);

  // Tambah/Insert Data ke collection person
  // db.collection("person").insertOne(
  //   {
  //     nama: "Dimas Ainur",
  //     alamat: "Bandung",
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Gagal Menambahkan Data");
  //     }
  //     console.log(result);
  //   }
  // );

  // cara Menambahkan Lebih dari satu data
  // db.collection("person").insertMany(
  //   [
  //     {
  //       nama: "Davit",
  //       alamat: "Jember",
  //     },
  //     {
  //       nama: "Dani",
  //       alamat: "Jakarta",
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Data Gagal Di Tambahkan");
  //     }
  //     console.log(result);
  //   }
  // );

  // // Menampilkan Semua Data Yang Ada DI Collection/table "Person"
  // console.log(
  //   db
  //     .collection("person")
  //     .find()
  //     .toArray((err, result) => {
  //       console.log(result);
  //     })
  // );

  // Memapilkan data berdasarkan kriteria/Mem FILTER
  // console.log(
  //   db
  //     .collection("person")
  //     .find({ _id: ObjectId("633d7c9b363d17b487b528c1") })
  //     .toArray((err, result) => {
  //       console.log(result);
  //     })
  // );

  // Ubah Data Berdasarkan ID
  // const updateData = db.collection("person").updateOne(
  //   {
  //     _id: ObjectId("633d7c9b363d17b487b528c1"),
  //   },
  //   {
  //     $set: {
  //       nama: "Ahmat Davit Ari",
  //       alamat: "Malang",
  //     },
  //   }
  // );

  // updateData
  //   .then((result, err) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // Memngubah data Lebih dari Satu berdasarkan Kreteria
  // const updateMany = db.collection("person").updateMany(
  //   {
  //     alamat: "Malang",
  //   },
  //   {
  //     $set: {
  //       alamat: "Jember",
  //     },
  //   }
  // );

  // updateMany
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));

  // Meghapus Satu Data
  db.collection("person")
    .deleteOne({
      _id: ObjectId("633d7c9b363d17b487b528c1"),
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  // Menghapus Data Leih Dari Satu Data
  db.collection("person")
    .deleteOne({
      alamat: "Bandung",
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
