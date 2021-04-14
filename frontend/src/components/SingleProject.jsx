import React, { useState } from "react";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const SingleProject = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/projects/" + props.project.ID,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Project deleted");
        props.fetchProjects();
        props.fetchStudents();
      } else {
        console.log("Error while deleting project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>{props.project.name}</td>
      <td>{props.project.description}</td>
      <td>{props.project.repoURL}</td>
      <td>{props.project.liveURL}</td>
      <td
        className="d-flex justify-content-between"
        style={{ cursor: "pointer" }}
      >
        <DeleteForeverIcon onClick={handleDelete} />
        <BorderColorIcon onClick={() => setIsEdit(!isEdit)} />
      </td>
    </tr>
  );
};

export default SingleProject;
