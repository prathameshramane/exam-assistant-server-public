var XLSX = require("xlsx");

const convertXlsxToJson = async (file, markObj, callback) => {
  var workbook = await XLSX.read(file.data);
  var sheet_name_list = workbook.SheetNames;
  // console.log(sheet_name_list); // getting as Sheet1

  sheet_name_list.forEach(function (y) {
    var worksheet = workbook.Sheets[y];
    //getting the complete sheet
    // console.log(worksheet);

    var headers = {};
    var data = [];
    for (z in worksheet) {
      if (z[0] === "!") continue;
      //parse out the column, row, and value
      var col = z.substring(0, 1);
      // console.log(col);

      var row = parseInt(z.substring(1));
      // console.log(row);

      var value = worksheet[z].v;
      // console.log(value);

      //store header names
      if (row == 1) {
        const firstName = ["First Name", "first name"];
        const lastName = ["Last Name", "last name"];
        const seatNo = [
          "Roll No",
          "Roll no",
          "Roll No.",
          "Roll no.",
          "Seat",
          "Seat No",
          "Seat no.",
          "Roll Number",
          "Roll number",
          "Roll Number.",
          "Roll number.",
          "Seat",
          "Seat Number",
          "Seat number.",
        ];
        const semester = ["sem", "Sem", "Semester", "semester"];
        const email = ["Email Address"];
        const paperUrl = [
          "Upload Paper",
          "Upload Scanned Paper",
          "Upload Document",
          "Upload Scanned Document",
          "Upload",
        ];
        const department = ["Dept", "Department"];
        if (firstName.includes(value)) headers[col] = "firstName";
        if (lastName.includes(value)) headers[col] = "lastName";
        if (seatNo.includes(value)) headers[col] = "seatNo";
        if (semester.includes(value)) headers[col] = "semester";
        if (email.includes(value)) headers[col] = "email";
        if (paperUrl.includes(value)) headers[col] = "paperUrl";
        if (department.includes(value)) headers[col] = "department";

        continue;
      }

      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }

    var index = 1;
    data.forEach((element) => {
      element.id = index++;
      element.marksObject = markObj;
      delete element.undefined;
      if (element.paperUrl) {
        element.paperUrl = element.paperUrl.split("id=")[1];
      }
    });
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    // console.log(data);

    callback(data);
  });
};

module.exports = convertXlsxToJson;
