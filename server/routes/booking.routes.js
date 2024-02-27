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

//get particular review booker data and serviceman data..
router.get("/getrate", (req, res) => {
  const { servicemanid } = req.body;
  db.query(
    "select * from Bookersdata where servicemanid=?",
    [servicemanid],
    (err, row) => {
      if (err) console.log(err);
      res.send(row);
    }
  );
});

module.exports = router;
