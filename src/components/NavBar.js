import React from 'react'
import firebase from '../firebase';

const NavBar = ({user}) => {
  const logOut = () => {
    firebase.auth().signOut();
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <h4 className="navbar-brand">
          To Do List
        </h4>
        <ul className="navbar-nav ml-auto">
          {
            user ? 
              <li className="nav-item">
                <span className="text-white mr-3">{ user }</span>
                <button onClick={logOut} className="btn btn-danger">
                  LogOut
                </button>
              </li>
            : null
          }
        </ul>

      </div>
    </nav>

  );
}

export default NavBar;