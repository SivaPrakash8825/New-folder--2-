const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// db.connect();

router.post("/setUserDetails", (req, res) => {
  try {
    const uqId = cuid.slug();
    const { userid, address } = req.body;
    // console.log(id, userid, address);
    db.query(
      "insert into userdetails values(?,?,?)",
      [uqId, userid, address],
      (err, result) => {
        if (err) console.log(err);

        return res.send({
          status: "noerror",
          msg: "Registration Completed :)",
          class: "noerr",
        });
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

router.get("/getUserDetails/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query(
      "select l.id,l.email,l.phoneno,l.name,l.city,l.regDate,u.id as uid,u.address from users l inner join userdetails u on l.id=u.userid  and l.id = ?",
      [id],
      (err, result) => {
        if (err) console.log(err);
        else {
          if (result.length == 0) {
            return res.send({
              status: "error",
              msg: "UserData Not Found",
              class: "err",
            });
          }
          return res.send({
            status: "noerror",
            userdata: result[0],
            class: "noerr",
          });
        }
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

module.exports = router;
