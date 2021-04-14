import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./AllProjectsModal.css";
import SingleProject from "./SingleProject";

const AllProjectsModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>All Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>ProjectDescription</th>
                <th>Repo URL</th>
                <th>Live URL</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.projects
                .filter((project) => project.studentId === props.student.ID)
                .map((project) => (
                  <SingleProject
                    key={project.ID}
                    project={project}
                    projects={props.projects}
                    student={props.student}
                    fetchStudents={props.fetchStudents}
                    fetchProjects={props.fetchProjects}
                  />
                ))}
            </tbody>
          </Table>
          {props.projects.map}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllProjectsModal;
