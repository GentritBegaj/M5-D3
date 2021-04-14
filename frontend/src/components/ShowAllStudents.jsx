import React from "react";
import { Container, Table } from "react-bootstrap";
import ShowStudent from "./ShowStudent";
import uniqid from "uniqid";

const ShowAllStudents = (props) => {
  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th># of Projects</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((student) => (
            <ShowStudent
              key={uniqid()}
              student={student}
              projects={props.projects}
              fetchStudents={props.fetchStudents}
              fetchProjects={props.fetchProjects}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShowAllStudents;
