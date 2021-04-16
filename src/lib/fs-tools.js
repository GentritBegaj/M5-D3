import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const studentsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/students"
);

console.log({ studentsFolderPath });

const ProjectsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/projects"
);

export const getStudents = async () =>
  readJSON(join(dataFolderPath, "students.json"));

export const writeStudents = async (content) =>
  writeJSON(join(dataFolderPath, "students.json"), content);

export const getProjects = async () =>
  readJSON(join(dataFolderPath, "projects.json"));

export const writeProjects = async (content) =>
  writeJSON(join(dataFolderPath, "projects.json"), content);

export const writeStudentsPicture = async (filename, content) =>
  writeFile(join(studentsFolderPath, filename), content);

export const writeProjectsPicture = async (filename, content) =>
  writeFile(join(ProjectsFolderPath, filename), content);
