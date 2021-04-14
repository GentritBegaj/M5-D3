import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddStudent = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentObj = {
      name,
      surname,
      email,
      date,
    };
    console.log(studentObj);

    try {
      const response = await fetch("http://localhost:3001/students/", {
        method: "POST",
        body: JSON.stringify(studentObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Student Added successfully");
        props.fetchStudents();
        setName("");
        setSurname("");
        setEmail("");
        setDate("");
      } else {
        console.log("Error while adding student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={6} className="offset-3 my-3">
            <h1>Add Student:</h1>
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
                <Form.Label>Surname:</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Surname"
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of birth:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  id="date-of-birth"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button className="btn-lg" type="submit">
                  Add
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStudent;
