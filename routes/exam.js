var express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const authentication = require("../utils/authentication");
const getMarksObj = require("../utils/getMarksObject");
const convertXlsxToJson = require("../utils/xlsx-json");

const Exams = require("../models/exams");
const Users = require("../models/users");
var examRouter = express.Router();
// examRouter.use(bodyParser.urlencoded({ extended: true }));

const cors = require("./cors");

examRouter
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get("/:examId", cors.cors, authentication.verifyUser, (req, res, next) => {
    Exams.findById(req.params.examId)
      .then((exam) => {
        if (String(exam.ownerId) !== String(req.user._id)) {
          throw "You are not allowed to access this exam";
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          exam: exam,
        });
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          message: err,
        });
      });
  });

examRouter
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post("/", cors.cors, authentication.verifyUser, (req, res, next) => {
    var newExam = {};
    newExam.examName = req.body.examName;
    newExam.semester = req.body.semester;
    newExam.department = req.body.department;
    newExam.subjectName = req.body.subjectName;
    newExam.totalMarks = req.body.totalMarks;
    newExam.ownerId = req.user._id;
    const examObject = JSON.stringify(getMarksObj(req.body));
    if (req.files) {
      const excel_file = req.files.excelFile;
      convertXlsxToJson(excel_file, examObject, (examData) => {
        newExam.examData = examData;
        Exams(newExam)
          .save()
          .then((exam) => {
            newExam._id = exam._id;
            return Users.findById(req.user._id);
          })
          .then((user) => {
            user.exams.push({
              examId: newExam._id,
              examName: newExam.examName,
              subjectName: newExam.subjectName,
              semester: newExam.semester,
              department: newExam.department,
            });

            return Users.findByIdAndUpdate(
              req.user._id,
              {
                $set: {
                  exams: user.exams,
                },
              },
              { new: true }
            );
          })
          .then((user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              message: "Exam with id " + newExam._id + " created Successfully",
            });
          })
          .catch((err) => {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: false, message: err });
          });
      });
    }
  });

examRouter
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post("/:examId", cors.cors, authentication.verifyUser, (req, res, next) => {
    Exams.findById(req.params.examId)
      .then((exam) => {
        if (String(exam.ownerId) !== String(req.user._id)) {
          throw "You are not allowed to access this exam";
        }
        const examData = JSON.parse(req.body.examData);
        console.log(examData)
        return Exams.findByIdAndUpdate(
          exam._id,
          {
            $set: {
              examData: examData,
            },
          },
          { new: true }
        );
      })
      .then((newExam) => {
        console.log(newExam);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          message: "Successfully Updated",
        });
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          message: err,
        });
      });
  });

module.exports = examRouter;
