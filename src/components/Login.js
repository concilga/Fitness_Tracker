import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom';

const Login = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkLogin, setCheckLogin] = useState('')

    const history = useHistory();
  
    const handleChange = (event) => {
      setUsername(event.target.value);
    }

    const handleLogin = async(event) => {
        event.preventDefault();
        setCheckLogin("");

        const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    username,
                    password
            }),
        });
        const info = await response.json();

        if(info.error) {
            return setCheckLogin(info.error)
        }

        setToken(info.token);
        localStorage.setItem("token", info.token);

        history.push("/");
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleLogin(event);
      setUsername('');
      setPassword('');
    }
  
    return (
      <div id='container'>
        <div id='login-navbar'>
          Login:
        </div >
        <div className="login-form"> 
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input required type='text' name='username' value={username} onChange={handleChange} />
            <label htmlFor='password'>Password:</label>
            <input required type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            <p>{checkLogin}</p>
            <button type='submit' className='button-19'>Submit</button>
          </form>
          <p>Haven't created an account yet?</p>
          {
              <>
              <Link to="/Register">Register Here</Link>
              </>
          }
        </div>
      </div>
    )

}


export default Login; 