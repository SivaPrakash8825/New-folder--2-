const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
async function getusercookie(err, res, next) {
  const cookie = await jwt.verify(
    req.cookies.servicifyCookie,
    process.env.SECRET
  );
}

router.post("/plumberdata", (req, res) => {
  const { userId, price, dob, experience } = req.body;
  const uqId = cuid.slug();
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "insert into PlumbersData values(?,?,?,?,?)",
      [uqId, userId, price, age, experience],
      (err, rows) => {
        if (err) console.log(err);
        console.log(rows);
      }
    );
  } catch (error) {
    res.status(400).send({
      msg: "err",
    });
  }
  res.send("added");
});
router.post("/updateprice", (req, res) => {
  const { id, price } = req.body;

  try {
    db.query(
      "update PlumbersData set price=? where upId=?",
      [price, id],
      (err, rows) => {
        if (err) console.log(err);
        res.send({
          msg: "updated",
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      msg: "err",
    });
  }
});

router.get("/getbycity/:city", (req, res) => {
  const { city } = req.params;
  db.query("select * from Plumbersdata where city=?", [city], (err, rows) => {
    if (err) {
      res.send({
        msg: "no data",
      });
      console.log(err);
    } else {
      res.send({ msg: rows });
    }
  });
});

router.get("/getiddata/:id", (req, res) => {
  const { id } = req.params;
  db.query("select * from PlumbersData where userId=?", [id], (err, rows) => {
    if (err) console.log(err);
    res.send({ data: rows });
  });
});

module.exports = router;
