const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.post("/reviewdata", (req, res) => {
  const { bookerid, servicemanid, name, phonenumber, email, address } =
    req.body;
  const uqId = cuid.slug();
  db.query(
    "insert into Bookersdata value(?,?,?,?,?,?,?)",
    [uqId, bookerid, servicemanid, name, phonenumber, email, address],

    (err, rows) => {
      if (err) console.log(err);
      console.log(rows);
    }
  );
});

router.post("/service", (req, res) => {
  const { name, servicemanid, phoneno, email } = req.body;
  const uqId = cuid.slug();
  db.query(
    "insert into bookers value(?,?,?,?,?)",
    [uqId, name, phoneno, servicemanid, email],

    (err, rows) => {
      if (err) console.log(err);
      console.log(rows);
    }
  );
});

router.get("/requested/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query("select * from bookers where servicemanid=?", [id], (err, row) => {
    if (err) console.log(err);
    res.send(row);
  });
});

//get particular review booker data and serviceman data..
router.get("/getrate", (req, res) => {
  const { servicemanid } = req.body;

  db.query(
    "select * from bookeds where servicemanid=?",
    [servicemanid],
    (err, row) => {
      if (err) console.log(err);
      res.send(row);
    }
  );
});

module.exports = router;
