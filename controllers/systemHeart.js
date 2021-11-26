const { response, request } = require("express");
const mysql = require("mysql");

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
    .doc("3")
    .collection("14-11-2021:17:30:10")
    .get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
    // console.log(data);
  });
  res.json({
    data,
  });
};
const dates = [];

const getDates = async (id) => {
  const con = mysql.createConnection({
    host: "34.95.253.14",
    user: "dev",
    password: "Dev$1590",
    database: "ecglector",
  });
  con.connect();
  await con.query(
    "select * from ecglector.ECGs where Pacientes_ID_paciente=" + id,
    (err, rows) => {
      if (err) throw err;
      console.log("Data received from Db:");
      rows.forEach((row) => {
        var dat = new Date(row.fecha_lectura);
        var newDate = new Date(
          dat.getTime() + dat.getTimezoneOffset() * 60 * 1000
        );
        var offset = dat.getTimezoneOffset() / 60;
        var hours = dat.getHours();
        newDate.setHours(hours - offset);
        const helper = newDate.toISOString().replace("T", "-").split("-", 3);
        var firebaseFormDate =
          helper[2] +
          "-" +
          helper[1] +
          "-" +
          helper[0] +
          ":" +
          newDate.toISOString().split("T")[1].replace("Z", "").split(".")[0];
        dates.push(firebaseFormDate);
        // console.log(firebaseFormDate)
      });
    }
  );
  con.end();
};

const serviceAccount = require("../systemheart-d26de2f1664d.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const getData = async (id, date) => {
  // console.log(id,date)
  const snapshot = await db
    .collection("usuarios")
    .doc(id)
    .collection(date)
    .get();
  const data = [];
  await snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

const getMobileResultLectures = async (req = request, res = response) => {
  // const id  = req.query.id;
  const allLectures = [];
  var id = req.params["id"];
  await getDates(id);
  setTimeout(function () {
    for (let index = 0; index < dates.length; index++) {
      getData(id.toString(), dates[index]).then((result) => {
        result.forEach((res) => {
          allLectures.push(res);
        });
      });
    }
    setTimeout(function () {
      // console.log("allLectures", allLectures.length);
      const helper2 = [];
      for (let index = 0; index < allLectures.length; index++) {
        if (allLectures[index] != null) {
          if (allLectures[index].result == "Insuficiencia cardíaca") {
            helper2.push(allLectures[index]);
            break;
          }else {
            helper2.push(allLectures[index]);
          }
        }
      }
      res.json({
        result_lectures: helper2,
      });
    }, 4000);
  }, 4000);
};

const getWebResultAbnormality = async (req = request, res = response) => {
  // const id  = req.query.id;
  const allLectures = [];
  var id = req.params["id"];
  await getDates(id);
  setTimeout(function () {
    for (let index = 0; index < dates.length; index++) {
      getData(id.toString(), dates[index]).then((result) => {
        result.forEach((res) => {
          allLectures.push(res);
        });
      });
    }
    setTimeout(function () {
      // console.log("allLectures", allLectures.length);
      const helper2 = [];
      for (let index = 0; index < allLectures.length; index++) {
        if (allLectures[index] != null) {
          if (allLectures[index].result == "Insuficiencia cardíaca") {
            helper2.push(allLectures[index]);
          }
        }
      }
      res.json({
        result_lectures: helper2,
      });
    }, 4000);
  }, 4000);
};

const getWebResultLectures = async (req = request, res = response) => {
  // const id  = req.query.id;
  const allLectures = [];
  var id = req.params["id"];
  await getDates(id);
  setTimeout(function () {
    for (let index = 0; index < dates.length; index++) {
      getData(id.toString(), dates[index]).then((result) => {
        result.forEach((res) => {
          allLectures.push(res);
        });
      });
    }
    setTimeout(function () {
      console.log("allLectures", allLectures.length);
      const helper2 = [];
      for (let index = 0; index < allLectures.length; index++) {
        if (allLectures[index] != null) {
          helper2.push(allLectures[index]);
          console.log(allLectures[index]);
        }
      }
      res.json({
        result_lectures: helper2,
      });
    }, 4000);
  }, 4000);
};


module.exports = {
  getDataWereable,
  getWebResultLectures,
  getWebResultAbnormality,
  getMobileResultLectures,
};
