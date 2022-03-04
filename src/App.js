import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { About } from './components/About';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import NoteState from './context/notes/NoteState';
import {getCookie} from './helpers/auth'

function App() {

  const authToken = getCookie('token')  
  

  return (
    <div className="App">
        <NoteState>
          <Router>
            <Switch>
              <Route exact path='/'>{authToken ? <Home/> : <Login/>}</Route>
              <Route exact path='/about'><About /></Route>
              <Route exact path='/login'><Login /></Route>
              <Route exact path="/register"><Register /></Route>
            </Switch>
          </Router>
        </NoteState>
    </div>
  );
}

export default App;
