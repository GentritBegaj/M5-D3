import express from "express";
import uniqid from "uniqid";
import {
  getStudents,
  getProjects,
  writeProjects,
  writeStudents,
  writeProjectsPicture,
} from "../lib/fs-tools.js";
import multer from "multer";
import path from "path";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await getProjects();
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

router.get("/:id", async (req, res) => {
  try {
    const projects = await getProjects();
    const project = projects.find((project) => project.ID === req.params.id);
    res.status(200).send(project);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const projects = await getProjects();
    const students = await getStudents();

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
      await writeProjects(projects);
      const newStudentsArray = students.filter((s) => s.ID !== studentId);
      numberOfProjects++;
      student.numberOfProjects = numberOfProjects;
      newStudentsArray.push(student);
      await writeStudents(newStudentsArray);

      res.status(201).send(newProject.ID);
    } else {
      res.status(400).send({ message: "Body parameters are not sufficient" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const projects = await getProjects();
    const newProjectsArray = projects.filter(
      (project) => project.ID !== req.params.id
    );
    const modifiedProject = req.body;
    modifiedProject.ID = req.params.id;
    newProjectsArray.push(modifiedProject);
    await writeProjects(newProjectsArray);
    res.status(201).send("Project modified");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.ID === req.params.id);
    const newProjectsArray = projects.filter(
      (project) => project.ID !== req.params.id
    );
    await writeProjects(newProjectsArray);
    const students = await getStudents();
    const student = students.find(
      (student) => student.ID === project.studentId
    );
    const newNumberOfProjects = newProjectsArray.filter(
      (p) => p.studentId === project.studentId
    ).length;
    student.numberOfProjects = newNumberOfProjects;

    const newStudentsArray = students.filter(
      (student) => student.ID !== project.studentId
    );

    newStudentsArray.push(student);
    await writeStudents(newStudentsArray);

    res.status(204).send("Project deleted");
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/:id/uploadPhoto",
  multer().single("projectPic"),
  async (req, res, next) => {
    const projectId = req.params.id;
    try {
      console.log(req.file.originalname);
      writeProjectsPicture(
        `${projectId}${path.extname(req.file.originalname)}`,
        req.file.buffer
      );
      const projects = await getProjects();
      const project = projects.find((p) => p.ID === projectId);
      project.imageUrl = `http://localhost:3000/img/projects/${projectId}${path.extname(
        req.file.originalname
      )}`;
      const newProjectsArray = projects.filter((pr) => pr.ID !== projectId);
      newProjectsArray.push(project);
      await writeProjects(newProjectsArray);
      res.status(201).send("Picture of project added");
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
