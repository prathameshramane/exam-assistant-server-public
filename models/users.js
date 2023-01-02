const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
  examId: {
    type: String,
    required: true,
  },
  examName: {
    type: String,
    default: "Not Available",
  },
  semester: {
    type: String,
    default: "Not Available",
  },
  department: {
    type: String,
    default: "Not Available",
  },
  subjectName: {
    type: String,
    default: "Not Available",
  },
});

const Users = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "",
  },
  exams: [examSchema],
});

var options = {
  errorMessages: {
    MissingPasswordError: "No password was given",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Account locked due to too many failed login attempts",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password or username are incorrect",
    IncorrectUsernameError: "Password or username are incorrect",
    MissingUsernameError: "No username was given",
    UserExistsError: "A user with the given username is already registered",
  },
};

Users.plugin(passportLocalMongoose, options);
module.exports = mongoose.model("User", Users);
