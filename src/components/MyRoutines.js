import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Routines from "./Routines";

const MyRoutines = ({token, user, publicActivities})=> {
  if(!user){
      return (
          <></>
      )
  }

  const [publicRoutines, setPublicRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [activityId, setActivityId] = useState(null);
  const [id, setId] = useState(null);
  const [duration, setDuration] = useState('');
  const [count, setCount] = useState('');
  const history = useHistory();
  const { username } = user;
  const displayUsername = username.toUpperCase();
  let displayActivDetail = false;

  async function fetchRoutines() {
    const response = await fetch(
      `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      }
    );
    const info = await response.json();
    setPublicRoutines(info);
    }

    async function handleClick(id) {
      setError("");

      const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const info = await response.json();

      if(info.error) {
          return setError(info.error);
      }

      fetchRoutines();
      history.push("/MyRoutines");
    }

    async function handleActivClick(id) {
      setError("");

      const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      });
      const info = await response.json();

      if(info.error) {
          return setError(info.error);
      }

      fetchRoutines();
      history.push("/MyRoutines");
    }

    if(activityId){
      displayActivDetail = true;
    }

    async function handleSubmit(routineId) {
      console.log(routineId, activityId, duration, count);
      setError("");

      const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(
              {
                  activityId,
                  count,
                  duration
              }
          )
      });
      const info = await response.json();

      if(info.error) {
          return setError(info.error);
      }

      fetchRoutines();
      setActivityId(null);
      displayActivDetail = false;
    }

    useEffect(() => {
      fetchRoutines();
    }, []);

  return (
    <div className="routine-page">
    <div className="my-routine-header">
        <h2>{displayUsername}'s Routines</h2>
        <form className="add-form">
            <label htmlFor='title'>Search:</label>
            <input required type='text' name='searchTerm' value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)}/>
        </form>
        {token  ? (
            <button className="button-19">
                <Link to="/AddRoutine" id="addR-btn">Add Routine</Link>
            </button>
        ) : (
            null
        )}
    </div> 
    <h1 id="routine_cards_title">{displayUsername}'s Routines:</h1>
    <div id="cards">
      {
        publicRoutines[0] ? (
            publicRoutines.map((routine) => {
              return (
                <div key={routine.id} id="card">
                  <div id="name_section">
                    <div id="name-btn">
                      <h2 id="name">{routine.name}</h2>
                      <button id="delete-button" onClick={() => handleClick(routine.id)}>
                        <img src="https://img.icons8.com/external-anggara-blue-anggara-putra/32/000000/external-delete-interface-anggara-blue-anggara-putra.png"/>
                      </button>
                    </div>
                    <div id="goal_section">
                      <p id="goal-title">Goal:</p>
                      <p id="goal">{routine.goal}</p>
                    </div>
                  </div>
                  <div id="activ_section">
                    <div id="activ-add">
                      <div id="activ-add-vis">
                        <h3>Activities:</h3>
                        <div id="menu"> 
                          <select
                            id="selectActiv"
                            defaultValue="default"
                            required
                            onChange={(e) => {
                              setActivityId(e.target.value)
                              setId(routine.id)
                            }}
                          >
                            <option key="default" value="default" disabled>
                              Add an Activity
                            </option>
                            {publicActivities.map((activity) => {
                              return (
                                <option key={activity.id} value={activity.id}>
                                  {activity.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      {displayActivDetail && routine.id === id ? (
                          <div id='activ-add-nonvis'>
                            <div id='nonvis-title'>
                              <p>Please Fill Out the Information Below to Create a New Activity</p>
                            </div>
                            <form 
                              className="nonvis-form" 
                              onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit(routine.id)
                              }}
                            >
                              <div id="form-input">
                                <label htmlFor='duration'>Duration:</label>
                                <input required type='text' name='duration' value={duration} 
                                  onChange={(event) => setDuration(event.target.value)}/>
                                <label htmlFor='count'>Count:</label>
                                <input required type='count' name='count' value={count} 
                                  onChange={(event) => setCount(event.target.value)}/>
                              </div>
                              <button type='submit'>Submit</button>
                            </form>
                            <p>{error}</p>
                          </div>
                      ) : (
                        null                          
                      )}
                    </div>
                    {routine.activities[0] ? (
                      <div id="activ_cards">
                        {routine.activities.map((activity) => {
                          return (
                            <div key={activity.id} id="activ_card">
                              <div id="activ-head">
                                <p id="activities">Activity: {activity.name}</p>
                                <button id="delete-button" onClick={() => handleActivClick(activity.routineActivityId)}>
                                  <img src="https://img.icons8.com/external-anggara-blue-anggara-putra/32/000000/external-delete-interface-anggara-blue-anggara-putra.png"/>
                                </button>
                              </div>
                              <p id="description">Description: {activity.description}</p>
                              <p id="count">Count: {activity.count}</p>
                              <p id="duration">Duration: {activity.duration}</p>
                              <button id="edit-btn">
                                <Link to={`/EditActivity/${activity.routineActivityId}`} id="edit-activ">Edit</Link>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div id="miss-activ">
                        <img src="/images/No-Activities-Art.png" alt=""/>
                      </div>
                    )}  
                  </div>
                  <div id="creator">
                    <p>Creator: {routine.creatorName}</p>
                    <button>
                      <Link to={`/EditRoutine/${routine.id}`} id="edit-link">Edit</Link>
                    </button>
                  </div>
                </div>
            );
            })
        ) : (
            <h1>You Have Not Created Any Routines Yet!</h1>
        )
      }
    </div>
    </div>
  );
};
export default MyRoutines;