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

//!!! Update Worker Profile
router.post("/updateProfile", (req, res) => {
  const { userId, experience, price, dob, role } = req.body;
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "update workers set price=?,experience=?,age=? where userId=? and role=?;",
      [price, experience, age, userId, role],
      (err, rows) => {
        if (err) return console.log(err);
        return res.send({
          msg: "Profile Updated",
        });
      }
    );
  } catch (error) {
    res.status(400).send({
      msg: "Error",
    });
  }
});

router.post("/painterdata", (req, res) => {
  const { userId, price, dob, experience } = req.body;
  const uqId = cuid.slug();
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "insert into workers(id,userId,price,age,experience) values(?,?,?,?,?)",
      [uqId, userId, price, age, experience],
      (err, rows) => {
        if (err) return console.log(err);
        // console.log(rows);
      }
    );
  } catch (error) {
    res.status(400).send({
      msg: "err",
    });
  }
  res.send("added");
});

router.post("/getRequestsByCity", async (req, res) => {
  const { city, role, userId } = req.body;
  // console.log(city, role, userId);
  try {
    db.query(
      "select a.id,a.email,a.phoneno,a.name,a.city,b.price,b.age,b.experience from users as a inner join workers as b on a.id=b.userId where a.city=? and a.id!=? and b.role=?;",
      [city, userId, role],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          // console.log(rows);
          return res.send(rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

// ,l.regDate
router.get("/getiddata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    db.query(
      "select a.id,a.email,a.phoneno,a.name,a.city,b.price,b.age,b.experience from users as a inner join workers as b on a.id=b.userId where a.id=?",
      [id],
      (err, rows) => {
        if (err) return console.log(err);
        res.send(rows);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
