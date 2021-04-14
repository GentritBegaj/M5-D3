import React, { useState } from "react";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import EditOrDeleteModal from "./EditOrDeleteModal";
import AddProject from "./AddProject";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AllProjectsModal from "./AllProjectsModal";

const ShowStudent = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [projectModalShow, setProjectModalShow] = useState(false);
  const [allProjectsModalShow, setAllProjectsModalShow] = useState(false);

  // const numberOfProjects = props.projects.filter(
  //   (project) => project.studentId === props.student.ID
  // ).length;

  return (
    <>
      <tr>
        <td>{props.student.ID}</td>
        <td>{props.student.name}</td>
        <td> {props.student.surname} </td>
        <td>{props.student.email}</td>
        <td>{props.student.date} </td>
        <td>
          <div className="d-flex justify-content-between">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setAllProjectsModalShow(true)}
            >
              {props.student.numberOfProjects || 0}
            </div>
            <PostAddIcon
              style={{ cursor: "pointer" }}
              onClick={() => setProjectModalShow(true)}
            />
          </div>
        </td>
        <td className="text-right">
          <div onClick={() => setModalShow(true)} style={{ cursor: "pointer" }}>
            <BorderColorIcon />{" "}
          </div>
        </td>
      </tr>
      <EditOrDeleteModal
        fetchStudents={props.fetchStudents}
        fetchProjects={props.fetchProjects}
        student={props.student}
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AddProject
        projectModalShow={projectModalShow}
        onHide={() => setProjectModalShow(false)}
        studentId={props.student.ID}
        fetchStudents={props.fetchStudents}
        fetchProjects={props.fetchProjects}
      />
      <AllProjectsModal
        show={allProjectsModalShow}
        onHide={() => setAllProjectsModalShow(false)}
        projects={props.projects}
        student={props.student}
        fetchStudents={props.fetchStudents}
        fetchProjects={props.fetchProjects}
      />
    </>
  );
};

export default ShowStudent;
