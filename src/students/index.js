import { Router } from "express";
import {
  getStudents,
  writeStudents,
  writeStudentsPicture,
} from "../lib/fs-tools.js";
import uniqid from "uniqid";
import multer from "multer";
import path from "path";

const router = Router();

router.get("/", async (req, res) => {
  const students = await getStudents();
  res.send(students);
});

router.get("/:id", async (req, res) => {
  const students = await getStudents();
  const student = students.find((student) => student.ID == req.params.id);
  res.send(student);
});

router.post("/", async (req, res) => {
  const students = await getStudents();
  const newStudent = req.body;

  if (duplicateEmailCheck(newStudent.email)) {
    newStudent.ID = uniqid();
    students.push(newStudent);

    await writeStudents(students);
    res.status(201).send({ id: newStudent.ID });
  } else {
    console.log("Duplicate email address");
    res.status(409).send("This email address is already in use");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const students = await getStudents();
    const newStudentsArray = students.filter(
      (student) => student.ID !== req.params.id
    );

    const modifiedStudent = req.body;
    modifiedStudent.ID = req.params.id;
    newStudentsArray.push(modifiedStudent);

    await writeStudents(newStudentsArray);
    res.status(201).send("Student modified");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const students = await getStudents();

  const newStudentsArray = students.filter(
    (student) => student.ID !== req.params.id
  );

  await writeStudents(newStudentsArray);
  res.status(204).send();
});

router.post(
  "/:id/uploadPhoto",
  multer().single("profilePic"),
  async (req, res, next) => {
    const studentId = req.params.id;
    try {
      console.log(req.file);
      console.log(path.extname(req.file.originalname));
      await writeStudentsPicture(
        `${studentId}${path.extname(req.file.originalname)}`,
        req.file.buffer
      );
      const students = await getStudents();
      const student = students.find((s) => s.ID === studentId);
      student.imageUrl = `http://localhost:3000/img/students/${studentId}${path.extname(
        req.file.originalname
      )}`;
      const newStudentsArray = students.filter((st) => st.ID !== studentId);
      newStudentsArray.push(student);
      await writeStudents(newStudentsArray);
      res.status(201).send("Picture added");
    } catch {
      console.log(error);
    }
  }
);

router.post(
  "/uploadMultiple",
  multer().array("multipleProfilePic", 2),
  async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map(
        async (file) =>
          await writeStudentsPicture(file.originalname, file.buffer)
      );
      await Promise.all(arrayOfPromises);
      res.send("Pictures uploaded");
    } catch (error) {
      console.log(error);
    }
  }
);

const duplicateEmailCheck = async (email) => {
  const studentsArray = await getStudents();
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
