import express from "express";
import multer from "multer";
import { writeStudentsPicture } from "../lib/fs-tools.js";

const router = express.Router();

router.post(
  "/:id/uploadPhoto",
  multer().single("profilePic"),
  async (req, res, next) => {
    studentId = req.params.id;
    try {
      console.log(req.file);
      await writeStudentsPicture(
        req.file.originalname,
        req.file.buffer
        // (req.file.id = studentId)
      );
      res.status(201).send("File uploaded");
    } catch (error) {
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
// router.post(
//   "/upload",
//   multer().single("profilePic"),
//   async (req, res, next) => {
//     try {
//       console.log(req.file);
//       await writeStudentsPicture(req.file.originalname, req.file.buffer);
//       res.status(201).send("File uploaded");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// router.post(
//   "/uploadMultiple",
//   multer().array("multipleProfilePic", 2),
//   async (req, res, next) => {
//     try {
//       const arrayOfPromises = req.files.map(
//         async (file) =>
//           await writeStudentsPicture(file.originalname, file.buffer)
//       );
//       await Promise.all(arrayOfPromises);
//       res.send("Pictures uploaded");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export default router;
