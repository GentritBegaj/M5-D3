import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);

const studentsJSONPath = join(dirname(filename), "students.json");

router.get("/", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const fileAsAJSON = JSON.parse(fileAsAString);

  res.send(fileAsAJSON);
  console.log(fileAsAJSON);
});

router.get("/:id", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const students = JSON.parse(fileAsAString);

  const student = students.find((student) => student.ID == req.params.id);
  res.send(student);
});

router.post("/", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const students = JSON.parse(fileAsAString);

  const newStudent = req.body;
  // console.log("NEW STUDENT", newStudent);

  if (duplicateEmailCheck(newStudent.email)) {
    newStudent.ID = uniqid();
    students.push(newStudent);

    fs.writeFileSync(studentsJSONPath, JSON.stringify(students));
    res.status(201).send({ id: newStudent.ID });
  } else {
    console.log("Duplicate email address");
    res.status(409).send("This email address is already in use");
  }
});

router.put("/:id", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const students = JSON.parse(fileAsAString);
  const newStudentsArray = students.filter(
    (student) => student.ID !== req.params.id
  );

  const modifiedStudent = req.body;
  modifiedStudent.ID = req.params.id;
  newStudentsArray.push(modifiedStudent);

  fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));
  res.status(201).send("Student modified");
});

router.delete("/:id", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const students = JSON.parse(fileAsAString);

  const newStudentsArray = students.filter(
    (student) => student.ID !== req.params.id
  );
  fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));
  res.status(204).send();
});

const duplicateEmailCheck = (email) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);

  const filteredStudentsArray = studentsArray.filter(
    (student) => student.email.toLowerCase() === email.toLowerCase()
  );
  if (filteredStudentsArray.length === 0) {
    return true;
  } else {
    return false;
  }
};

export default router; // Important
