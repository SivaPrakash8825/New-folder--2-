const express = require("express");
const router = express.Router();
const cuid = require("cuid");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// console.log(cuid.slug());
router.post("/register", async (req, res) => {
  const { email, phoneno, name, role, password, city } = req.body; // Needed data
  // console.log(email,phoneno,name,role,password,city ); //check
  const uqId = cuid.slug();
  //

  try {
    db.query(
      `select * from ${role} where email = ? or phoneno = ?`,
      [email, phoneno],
      async (err, result) => {
        if (err) console.log(err);
        else {
          // console.log(result.length);
          if (result.length > 0) {
            return res.status(400).send({
              status: "error",
              msg: "User Data Already Exist !!!",
              class: "err",
            });
          }

          const hashpass = await bcryptjs.hash(password, 10);
          db.query(
            ` insert into ${role}(id,email,phoneno,name,role,password,city) values(?,?,?,?,?,?,?)`,
            [uqId, email, phoneno, name, role, hashpass, city],
            (err, result) => {
              if (err) console.log(err);
              else {
                return res.send({
                  status: "noerror",
                  msg: "Registration Completed :)",
                  class: "noerr",
                });
              }
            }
          );
        }
      }
    );
    // db.end();
  } catch (error) {
    return res.status(400).send({
      status: "error",
      msg: error,
      class: "err",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      "select * from users where email = ?",
      [email],
      async (err, result) => {
        if (err) console.log(err);
        else {
          // console.log(result);
          if (result.length == 0) {
            return res.status(400).send({
              status: "error",
              msg: "Email Doesn't Exist !!!",
              class: "err",
            });
          }
          const isValid = await bcryptjs.compare(password, result[0].password);
          if (!isValid) {
            return res.status(400).send({
              status: "error",
              msg: "Password Doesn't Match !!!",
              class: "err",
            });
          }

          //After Login

          const userdata = result[0];
          // console.log(userdata);
          const token = jwt.sign(
            { userdata: userdata },
            process.env.jwtSecretCode,
            {
              expiresIn: process.env.jwtExpireTime,
            }
          );

          const cookieExpire = {
            expires: new Date(
              Date.now() + process.env.jwtCookieExpire * 1000 * 60 * 60 * 24
            ),
            httpOnly: true,
            sameSite: "none",
            path: "/",
            secure: true,
          };

          res.cookie("jai", token, cookieExpire);

          // console.log(req.cookies);
          res.send({
            status: "noerror",
            msg: "Login Successful :)",
            data: result[0],
            class: "noerr",
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/updateLogin", async (req, res) => {
  const { id, email, phoneno, name, password, city } = req.body; // Needed data
  // console.log(id,email,phoneno,name,password ,city); //check
  try {
    const hashpass = await bcryptjs.hash(password, 10);
    db.query(
      "update users set email=?,phoneno=?,name=?,password=?,city=? where id =?",
      [email, phoneno, name, hashpass, city, id],
      (err, result) => {
        if (err) console.log(err);
        else {
          console.log(result);
          return res.send({
            status: "noerror",
            msg: "User Details Updated :)",
            class: "noerr",
          });
        }
      }
    );
    // db.end();
  } catch (error) {
    return res.status(400).send({
      status: "error",
      msg: error,
      class: "err",
    });
  }
});

router.get("/me", async (req, res) => {
  // res.send("work");
  try {
    const cookiee = req.cookies.jai;

    if (cookiee) {
      const decodeData = await jwt.verify(cookiee, process.env.jwtSecretCode);

      var arole1 = "";

      const arole = decodeData.userdata.role;
      switch (arole) {
        case "user":
          arole1 = "users";
          break;
        case "painter":
          arole1 = "Paintersdata";
          break;
        case "designer":
          arole1 = "Designerdata";
          break;
        case "electrician":
          arole1 = "Electriciandata";
          break;
        case "packer":
          arole1 = "Packerdata";
          break;
        case "plumber":
          arole1 = "Plumberdata";
          break;
      }

      if (arole1 != "users") {
      } else {
        db.query(
          `select p.id,p.price,p.age,p.experience,p.isVerified,p.plan,u.id,u.email,u.phoneno,u.name,u.role,u.city,u.regDate from ${arole1} p right join users u on p.user_id = u.id`,
          [decodeData.id],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          }
        );
      }
      res.send(decodeData);
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/logout", (req, res) => {
  try {
    res.clearCookie("jai", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      path: "/",
      secure: true,
    });
    res.status(200).send("deleted");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
