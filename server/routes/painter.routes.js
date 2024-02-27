const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

async function getusercookie(err, res, next) {
  const cookie = await jwt.verify(req.cookies.jai, process.env.SECRET);
}

router.post("/painterdata", (req, res) => {
  const { user_id, price, dob, experience } = req.body;
  const uqId = cuid.slug();
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "insert into Paintersdata(id,user_id,price,age,experience) values(?,?,?,?,?)",
      [uqId, user_id, price, age, experience],
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

//!!! Need to check
router.post("/updateprice", (req, res) => {
  const { id, experience, price, dob } = req.body;
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "update Paintersdata set price=?,experience=?,age=? where user_id=?",
      [price, experience, age, id],
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

router.get("/getiddata/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "select l.id,l.email,l.phoneno,l.name,l.city,l.regDate,p.isVerified,p.id as pid,p.price,p.age,p.experience from users l left join Paintersdata p on l.id=p.user_id and p.id = ?",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      res.send({ data: rows });
    }
  );
});

module.exports = router;
