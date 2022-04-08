import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const Activities = ({ token, publicActivities, fetchActivities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [routines, setRoutines] = useState([]);
  const [id, setId] = useState("");
  function activityMatches(activity, text) {
    if (
      activity.name.toLowerCase().includes(text) ||
      activity.description.toLowerCase().includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  }
  const filteredActivities = publicActivities.filter((activity) =>
    activityMatches(activity, searchTerm)
  );
  const activitiesToDisplay = searchTerm.length
    ? filteredActivities
    : publicActivities;
  useEffect(() => {}, []);
  async function handleClick(activityId) {
    setId(activityId);
    setError("");
    const response = await fetch(
      `https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}/routines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const info = await response.json();
    setRoutines(info);
    if (info.error) {
      return setError(info.error);
    }
    await fetchActivities();
  }
  console.log("routines", routines);
  return (
    <div className="routine-page">
      <div className="activity-header">
        <h2>Activities</h2>
        <form className="add-form">
          <label htmlFor="title">Search:</label>
          <input
            required
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>
        {token ? (
          <button className="button-19">
            <Link to="/AddActivity" id="addR-btn">
              Add Activity
            </Link>
          </button>
        ) : null}
      </div>
      <h1 id="routine_cards_title">Activities:</h1>
      <div id="cards">
        {publicActivities[0]
          ? activitiesToDisplay.map((activity) => {
              return (
                <div key={activity.id} id="card">
                  <div id="name_section">
                    <h2 id="name">{activity.name}</h2>
                    <div id="goal_section">
                      <p id="goal-title">Description:</p>
                      <p id="goal">{activity.description}</p>
                    </div>
                  </div>
                  <div id="activ_section">
                    <div>
                      <h3>Associated Routines:</h3>
                      <button
                        id={`assoc_routines_${activity.id}`}
                        className="assoc_routines"
                        onClick={() => handleClick(activity.id)}
                      >
                        View Associated Routines
                      </button>
                    </div>
                    {routines[0] && activity.id == id ? (
                      <div id="activ_cards">
                        {routines.map((routine) => {
                          return (
                            <div key={routine.id} id="activ_card">
                              <div id="activ-head">
                                <p id="activities">Routine: {routine.name}</p>
                              </div>
                              <p id="description">Goal: {routine.goal}</p>
                              <p id="count">Creator: {routine.creatorName}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        {id && activity.id == id ? (
                          <h1>No Routines to Display</h1>
                        ) : (
                          null
                        )
                        }
                        </div>
                    )}
                  </div>
                  <p id="creator">Fitness+ llc</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default Activities;