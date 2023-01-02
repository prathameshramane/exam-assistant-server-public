const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataScehma = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      default: "Not Available",
    },
    lastName: {
      type: String,
      default: "Not Available",
    },
    email: {
      type: String,
      default: "Not Available",
    },
    seatNo: {
      type: String,
      default: "Not Available",
    },
    department: {
      type: String,
      default: "Not Available",
    },
    paperUrl: {
      type: String,
      required: true,
    },
    marksObject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const examSchema = new Schema(
  {
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
    examData: [dataScehma],
    totalMarks: {
      type: String,
      default: "Not Available",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Exams = mongoose.model("Exam", examSchema);
module.exports = Exams;
