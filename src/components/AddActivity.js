import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";

const AddActivity = ({ token, setPublicActivities, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  async function fetchActivities() {

    const response = await fetch(
      "https://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const activityList = await response.json();
    setPublicActivities(activityList);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch(
      "https://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    fetchActivities();
    history.push("/Activities");
  };

  return (
    <div id="container">
      <div id="login-navbar">
        <h2>Please Fill Out the Information Below to Create a New Activity!</h2>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <input
            required
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button type="submit" className='button-19'>Submit</button>
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default AddActivity;