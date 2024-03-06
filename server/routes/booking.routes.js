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
  const { name, workerId, customerId, phoneno, email, address } = req.body;
  // console.log(name, workerId, customerId, phoneno, email);
  const uqId = cuid.slug();
  db.query(
    "insert into bookers(id,customerId,workerId,name,phoneno,email,address) value(?,?,?,?,?,?,?)",
    [uqId, customerId, workerId, name, phoneno, email, address],

    (err, rows) => {
      if (err) {
        console.log(err);
        return { msg: "Error" };
      }
      console.log(rows);
      return { msg: "Inserted" };
    }
  );
});

router.get("/requested/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.query("select * from bookers where workerId=?", [id], (err, row) => {
    if (err) console.log(err);
    res.send(row);
  });
});

//get particular review booker data and serviceman data..
router.get("/getrate", (req, res) => {
  const { servicemanid } = req.body;
  console.log(servicemanid);
  db.query(
    "select * from booked where servicemanid=?",
    [servicemanid],
    (err, row) => {
      if (err) console.log(err);
      res.send(row);
    }
  );
});

module.exports = router;
