const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.post("/reviewdata", (req, res) => {
  const { receiverid, senderid, rating, review } = req.body;
  const uqId = cuid.slug();
  db.query(
    "insert into Ratingtable value(?,?,?,?,?)",
    [uqId, receiverid, senderid, rating, review],

    (err, rows) => {
      if (err) return console.log(err);
      // console.log(rows);
    }
  );
});

//get particular review sender data and receiver data..
router.get("/getrate", (req, res) => {
  const { receiverid } = req.body;
  db.query(
    "select u.name,u.city,r.rating,r.review  from Ratingtable as r inner join user as u on u.id=r.senderid where r.Receiverid=?",
    [receiverid],
    (err, rows) => {
      if (err) return console.log(err);
      // console.log(rows);
      res.send({ data: rows });
    }
  );
});

module.exports = router;
