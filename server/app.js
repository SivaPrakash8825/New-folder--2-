const express = require("express");
const app = express();
const port = 9000;
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("got");
});

app.get("/me", (req, res) => {
  console.log("asdf");
});

//for users
app.use("/api/auth", require("./routes/register.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/painter", require("./routes/painter.routes"));
app.use("/api/packers", require("./routes/packers.routes"));
app.use("/api/designer", require("./routes/designer.routes"));
app.use("/api/electrician", require("./routes/electrician.routes"));
// app.use("/api/painter", require("./routes/painter.routes"));
app.use("/api/others", require("./routes/others.routes"));
// app.use("/api/me", require("./routes/register.routes"));
// app.use("/home", require("./routes/home"));
//for review and rating..
app.use("/api/review", require("./routes/review.routes"));

//for booking
app.use("/api/booking", require("./routes/booking.routes"));

app.listen(port, () => {
  console.log(`Server Runs on Port ${port}`);
});
