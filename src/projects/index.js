import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);

const projectsJSONPath = join(dirname(filename), "projects.json");

// console.log(dirname(dirname(filename)));
const studentsJSONPath = join(
  dirname(dirname(filename)),
  "students",
  "students.json"
);

const getProjects = () => {
  const projects = JSON.parse(fs.readFileSync(projectsJSONPath).toString());
  return projects;
};
const getStudents = () => {
  const students = JSON.parse(fs.readFileSync(studentsJSONPath).toString());
  return students;
};

router.get("/", (req, res, next) => {
  try {
    const projects = getProjects();
    if (req.query && req.query.name) {
      const filteredProjects = projects.filter(
        (project) =>
          project.hasOwnProperty("name") &&
          project.name.toLowerCase().includes(req.params.name)
      );
    } else {
      res.status(200).send(projects);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const projects = getProjects();
    const project = projects.find((project) => project.ID === req.params.id);
    res.status(200).send(project);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const projects = getProjects();
    const students = getStudents();
    const { studentId } = req.body;
    const student = students.find((s) => s.ID === studentId);
    if (student) {
      let numberOfProjects = projects.filter(
        (project) => project.studentId === studentId
      ).length;

      const newProject = req.body;
      newProject.ID = uniqid();
      newProject.createdAt = new Date();
      projects.push(newProject);
      fs.writeFileSync(projectsJSONPath, JSON.stringify(projects));
      const newStudentsArray = students.filter((s) => s.ID !== studentId);
      numberOfProjects++;
      student.numberOfProjects = numberOfProjects;
      newStudentsArray.push(student);
      fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));

      res.status(201).send(newProject.ID);
    } else {
      res.status(400).send({ message: "Body parameters are not sufficient" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    const projects = getProjects();
    const newProjectsArray = projects.filter(
      (project) => project.ID !== req.params.id
    );
    const modifiedProject = req.body;
    modifiedProject.ID = req.params.id;
    newProjectsArray.push(modifiedProject);
    fs.writeFileSync(projectsJSONPath, JSON.stringify(newProjectsArray));
    res.status(201).send("Project modified");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const projects = getProjects();
    const project = projects.find((p) => p.ID === req.params.id);
    const newProjectsArray = projects.filter(
      (project) => project.ID !== req.params.id
    );
    fs.writeFileSync(projectsJSONPath, JSON.stringify(newProjectsArray));
    const students = getStudents();
    const student = students.find(
      (student) => student.ID === project.studentId
    );
    const newNumberOfProjects = newProjectsArray.filter(
      (p) => p.studentId === project.studentId
    ).length;
    student.numberOfProjects = newNumberOfProjects;

    console.log("SSSSSSSSSSSSSS", student);

    const newStudentsArray = students.filter(
      (student) => student.ID !== project.studentId
    );

    newStudentsArray.push(student);
    fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));

    res.status(204).send("Project deleted");
  } catch (error) {
    console.log(error);
  }
});

export default router;
