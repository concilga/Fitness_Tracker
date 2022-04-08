import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register';
import Navbar from './Navbar';
import Footer from './Footer';
import MyRoutines from './MyRoutines';
import Home from './Home'
import Routines from './Routines';
import Activities from './Activities';
import AddRoutine from './AddRoutine';
import EditRoutine from './EditRoutine';
import AddActivity from './AddActivity';
import EditActvitiy from './EditActivity';

const App = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null)
    const [publicRoutines, setPublicRoutines] = useState([]);
    const [publicActivities, setPublicActivities] = useState([]);

    const fetchUser = async() => {
        const isToken = localStorage.getItem("token");
        if(isToken) {
            setToken(isToken);
        }
        const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
                Authorization: `Bearer ${isToken}`,
            },
        });
        const info = await response.json();
        
        if(info.id) {
            setUser(info);
        }
    }

    async function fetchRoutines() {
        const response = await fetch(
          "https://fitnesstrac-kr.herokuapp.com/api/routines",
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
    
    useEffect(() => {
        fetchUser();
        fetchRoutines();
        fetchActivities();
    }, [token]);

    return (
        <>
            <Navbar token={token} setToken={setToken} 
            setUser={setUser} />

            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/MyRoutines">
                <MyRoutines user={user} token={token} publicActivities={publicActivities}/>
            </Route>
            <Route path="/Routines">
                    <Routines publicRoutines={publicRoutines} token={token} user={user} />
            </Route>
            <Route path="/Login">
                <Login token={token} setToken={setToken} />
            </Route>
            <Route path="/Register">
                <Register token={token} setToken={setToken} />
            </Route>
            <Route path="/Activities">
                <Activities  publicActivities={publicActivities} token={token} user={user} fetchActivities={fetchActivities}/>
            </Route>
            <Route path="/AddRoutine">
                <AddRoutine setPublicRoutines={setPublicRoutines} token={token} user={user} />
            </Route>
            <Route path="/AddActivity">
                <AddActivity setPublicActivities={setPublicActivities} token={token} user={user} />
            </Route>
            <Route path="/EditRoutine/:id">
                <EditRoutine token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines} user={user}/>
            </Route>
            <Route path="/EditActivity/:id">
                <EditActvitiy token={token} publicRoutines={publicRoutines} setPublicRoutines={setPublicRoutines} user={user}/>
            </Route>

            <Footer />
        </>
    );
}

export default App;