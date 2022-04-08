import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import App from './components/App';

const app = document.getElementById('app')
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, app)