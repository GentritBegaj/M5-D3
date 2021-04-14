import React, { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import NavBar from "./NavBar";
import ShowAllStudents from "./ShowAllStudents";

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/students");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.log("Error while fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.log("Error while fetching projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <NavBar searchValue={searchValue} handleInput={handleInput} />
      <AddStudent fetchStudents={fetchStudents} />
      <ShowAllStudents
        fetchStudents={fetchStudents}
        fetchProjects={fetchProjects}
        students={students}
        projects={projects}
      />
    </>
  );
};

export default HomePage;
