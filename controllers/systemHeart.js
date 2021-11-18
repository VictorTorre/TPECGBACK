const { response, request } = require("express");
// [START firestore_deps]
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
// [END firestore_deps]

const getDataWereable = async (req = request, res = response) => {
  const serviceAccount = require("../systemheart-d26de2f1664d.json");

  initializeApp({
    credential: cert(serviceAccount),
  });

  const db = getFirestore();

  const snapshot = await db
    .collection("usuarios")
    .doc("1")
    .collection("14-11-2021:18:00:11")
    .get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
    // console.log(data);
  });
  res.json({
      data
  })
};

module.exports = getDataWereable;
