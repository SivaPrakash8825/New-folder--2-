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

router.post("/painterdata", (req, res) => {
  const { user_id, price, dob, experience } = req.body;
  const uqId = cuid.slug();
  const currentDate = new Date();
  const userDOB = new Date(dob);
  const age = Math.floor((currentDate - userDOB) / (1000 * 60 * 60 * 24 * 365));

  try {
    db.query(
      "insert into workers(id,user_id,price,age,experience) values(?,?,?,?,?)",
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
      "update workers set price=?,experience=?,age=? where user_id=?",
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
router.get("/getbycity/:city", async (req, res) => {
  const { city } = req.params;
  console.log(city);
  try {
    const cookiee = req.cookies.jai;
    if (cookiee) {
      const decode = await jwt.verify(cookiee, process.env.jwtSecretCode);
      db.query(
        "select a.id,a.phoneno,a.name,a.city,b.price,b.age,b.experience from users as a inner join workers as b on a.id=b.user_id where a.city=? and a.id!=?;",
        [city, decode.userdata.id],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.send(err);
          } else {
            return res.send(rows);
          }
        }
      );
    } else {
      console.log("not exists");
    }
  } catch (e) {
    console.log(e);
  }
});

// ,l.regDate
router.get("/getiddata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    db.query(
      "select a.id,a.email,a.phoneno,a.name,a.city,b.price,b.age,b.experience from users as a inner join workers as b on a.id=b.user_id where a.id=?",
      [id],
      (err, rows) => {
        if (err) console.log(err);
        res.send(rows);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
