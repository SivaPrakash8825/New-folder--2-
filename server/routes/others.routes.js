const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.get("/isVerified/:city", (req, res) => {
  try {
    const city = req.params.city;
    db.query(
      "select l.id,l.email,l.phoneno,l.name,l.city,l.regDate,p.id as pid,p.price,p.age,p.experience from users l inner join Paintersdata p on l.id=p.userId  and l.city = ? and p.isVerified = 1",
      [city],
      (err, result) => {
        if (err) console.log(err);
        return res.send({ data: result });
      }
    );
  } catch (error) {
    return res.status(400).send({
      status: "error",
      msg: error,
      class: "err",
    });
  }
});

router.get("/notVerifiedUsers", (req, res) => {
  try {
    db.query(
      "select  l.id,l.email,l.phoneno,l.name,l.city,l.regDate,p.id as pid,p.price,p.age,p.experience,p.plan from users l inner join Paintersdata p on l.id=p.userId and p.isVerified = 0",
      (err, result) => {
        if (err) console.log(err);
        else {
          return res.send({ data: result });
        }
      }
    );
  } catch (err) {
    return res.status(400).send({
      status: "error",
      msg: err,
      class: "err",
    });
  }
});

router.put("/upateVerified/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "update Paintersdata set isVerified = 1 where userId = ?",
      [id],
      (err, result) => {
        if (err) console.log(err);
        else {
          return res.send({ msg: "Updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.put("/updatePlan/:id", (req, res) => {
  try {
    const id = req.params.id;
    const plan = req.body.plan;
    db.query(
      "update Paintersdata set plan = ? where userId = ?",
      [plan, id],
      (err, result) => {
        if (err) console.log(err);
        else {
          return res.send({ msg: "Updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.get("/regDate/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query("select regdate from users where id = ?", [id], (err, result) => {
      if (err) console.log(err);
      else {
        return res.send({ data: result });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
