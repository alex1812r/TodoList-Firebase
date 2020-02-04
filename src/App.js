import React, { useState } from 'react';
import firebase from './firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Spinner from './components/Spinner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged(auth =>  {
    setLoading(false);
    setUser(auth ? auth.email : auth);
  });

  return (
    <Router>
      <Navbar 
        user={user}
      />
      {
        loading ?
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner />
        </div>
        :
        <div className="container-fluid px-5 mt-5">
          <Switch>
            <Route 
              path="/" 
              render={() => {
                if(user) {
                  return <Dashboard />
                } else {
                  return <Login />
                }
              }}/>
          </Switch>
        </div>
      }
    
    </Router>
  );
}

export default App;