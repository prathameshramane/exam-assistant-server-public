var express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authentication = require("../utils/authentication");

const Users = require("../models/users");
var userRouter = express.Router();
userRouter.use(bodyParser.json());

const cors = require("./cors");

userRouter
  .options(cors.corsWithOptions, (req, res) => {
    console.log(req);
    res.sendStatus(200);
  })
  .get("/", cors.cors, authentication.verifyUser, (req, res, next) => {
    Users.findOne({ username: req.user.username }).then((user) => {
      var returnedUser = {};
      returnedUser.firstname = user.firstname;
      returnedUser.lastname = user.lastname;
      returnedUser.department = user.department;
      returnedUser.designation = user.designation;
      returnedUser.username = user.username;
      returnedUser.exams = user.exams;
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(returnedUser);
    });
  });

/* Login User */
userRouter
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    "/login",
    cors.cors,
    passport.authenticate("local"),
    function (req, res, next) {
      const token = authentication.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Successfully Logged in!",
        token: token,
        userCredentials: {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          department: req.user.department,
          designation: req.user.designation,
          exams: req.user.exams
        },
      });
    }
  );

/* Signuo User */
userRouter
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post("/signup", cors.cors, function (req, res, next) {
    Users.register(
      new Users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
          }
          if (req.body.department) {
            user.department = req.body.department;
          }
          if (req.body.designation) {
            user.designation = req.body.designation;
          }
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
              return;
            }
          });
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          });
        }
      }
    );
  });

module.exports = userRouter;
