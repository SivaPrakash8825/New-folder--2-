const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});
const db = require("./config/db");

const createUsersTable = () => {
  try {
    db.query(
      "CREATE TABLE IF NOT EXISTS `users` (`id` varchar(70) NOT NULL,`email` varchar(45) NOT NULL,`phoneno` varchar(45) NOT NULL,`name` varchar(45) DEFAULT NULL,`role` varchar(45) DEFAULT NULL,`password` varchar(100) DEFAULT NULL,`city` varchar(45) DEFAULT NULL,PRIMARY KEY (`id`,`email`,`phoneno`));",
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Users Table Created");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

createUsersTable();

const createWorkersTable = () => {
  try {
    db.query(
      "CREATE TABLE IF NOT EXISTS `workers` (`id` varchar(60) NOT NULL,`userId` varchar(60) DEFAULT NULL,`price` int DEFAULT NULL,`age` int DEFAULT NULL,`experience` varchar(20) DEFAULT NULL,`role` varchar(45) DEFAULT NULL,`isVerified` int DEFAULT '0',`plan` varchar(45) DEFAULT 'no',`city` varchar(45) DEFAULT NULL,PRIMARY KEY (`id`));",
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Workers Table Created");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

createWorkersTable();

const createBookersTable = () => {
  try {
    db.query(
      "CREATE TABLE IF NOT EXISTS `bookers` (`id` varchar(60) NOT NULL,`customerId` varchar(60) DEFAULT NULL,`workerId` varchar(60) DEFAULT NULL,`name` varchar(45) DEFAULT NULL,`phoneno` varchar(45) DEFAULT NULL,`email` varchar(45) DEFAULT NULL,`address` varchar(70) DEFAULT NULL,PRIMARY KEY (`id`));",
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Bookers Table Created");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

createBookersTable();

const createRatingsTable = () => {
  try {
    db.query(
      "CREATE TABLE IF NOT EXISTS `ratings` (`id` varchar(60) NOT NULL,`customerId` varchar(60) DEFAULT NULL,`workerId` varchar(60) DEFAULT NULL,`rating` int DEFAULT NULL,`comment` varchar(70) DEFAULT NULL,PRIMARY KEY (`id`));",
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Ratings Table Created");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

createRatingsTable();
