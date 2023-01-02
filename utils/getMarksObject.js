function getMarksObj(data) {
  var jsonString = "{";

  const sub1 = `: {"A": 0, "Marks": `;
  const sub2 = `: {"A": 0, "B": 0, "Marks": `;
  const sub3 = `: {"A": 0, "B": 0, "C": 0, "Marks": `;
  const sub4 = `: {"A": 0, "B": 0, "C": 0, "D": 0, "Marks": `;
  const sub5 = `: {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "Marks": `;
  const sub6 = `: {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "Marks": `;

  for (let index = 1; index <= parseInt(data.numOfQuestions); index++) {
    jsonString += `"` + String(index) + `"`;
    if (data["subQuestion" + String(index)] == "1") {
      jsonString += sub1 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (data["subQuestion" + String(index)] == "2") {
      jsonString += sub2 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (data["subQuestion" + String(index)] == "3") {
      jsonString += sub3 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (data["subQuestion" + String(index)] == "4") {
      jsonString += sub4 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (data["subQuestion" + String(index)] == "5") {
      jsonString += sub5 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (data["subQuestion" + String(index)] == "6") {
      jsonString += sub6 + String(data["questionMarks" + String(index)]) + "}";
    }
    if (index !== parseInt(data.numOfQuestions)) {
      jsonString += ",";
    }
  }

  jsonString += "}";
  return JSON.parse(jsonString);
}

module.exports = getMarksObj
