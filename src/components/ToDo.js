import React from 'react'
import firebase from '../firebase';

const ToDo = ({ todo, getTodo }) => {
  const deleteTodo = id => {
    if(window.confirm('are you sure want to delete it?!')){
      const db = firebase.firestore();
      db.collection('todos').doc(id).delete();
    }
  };
  const textStyles = {
    minHeight: `150px`,
    display: `flex`,
    textAlign: `center`,
    alignItems: `center`
  };
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{todo.title}</h4>
        <p className="card-text" style={textStyles}>{todo.description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button className="btn btn-info" onClick={e => getTodo(todo.id)}>Edit</button>
        <button className="btn btn-danger" onClick={e => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ToDo;