import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddStudent = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoURL, setRepoURL] = useState("");
  const [liveURL, setLiveURL] = useState("");
  const studentId = props.studentId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectObj = {
      name,
      description,
      repoURL,
      liveURL,
      studentId,
    };
    console.log(projectObj);

    try {
      const response = await fetch("http://localhost:3001/projects/", {
        method: "POST",
        body: JSON.stringify(projectObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Project Added successfully");
        props.fetchStudents();
        props.fetchProjects();
        props.onHide();
        setName("");
        setDescription("");
        setRepoURL("");
        setLiveURL("");
      } else {
        console.log("Error while adding project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.projectModalShow} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Surname"
                id="surname"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Repo URL:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Repo URL"
                required
                value={repoURL}
                onChange={(e) => setRepoURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Live URL:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Live URL"
                required
                value={liveURL}
                onChange={(e) => setLiveURL(e.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button className="btn-lg" type="submit">
                Add Project
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStudent;
