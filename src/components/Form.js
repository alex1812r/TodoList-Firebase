import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

export default function Form({ todoToEdit, cancelEdit }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if(todoToEdit) {
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description);
    }
  },[todoToEdit]);

  const handleOnSubmit = e => {
    e.preventDefault();
    
    let errors = [];
    if(title === '') {
      errors.push('title is required');
    }
    if(description === '') {
      errors.push('description is required');
    }

    if(errors.length) {
      setErrors(errors);
      
      setTimeout(() => {
        setErrors([]);
      }, 3000);

      return;
    }
    
    const db = firebase.firestore();
    const todo = { title, description };
    
    if(todoToEdit) db.collection('todos').doc(todoToEdit.id).set(todo);
      
    else db.collection('todos').add(todo);

    setTitle('');
    setDescription('');
    cancelEdit();
  };

  const handleCancelEdit =  () => {
    cancelEdit();
    setTitle('');
    setDescription('');
  }

  return (

    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">Add a To do</h3>

        <form onSubmit={handleOnSubmit}>
          
          <div className="form-group">
            <label>Titile</label>
            <input 
              type="text" 
              className="form-control"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              cols="30" 
              rows="10" 
              className="form-control"
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="form-group">
            {
              todoToEdit ?
                <>
                  <button type="submit" className="btn btn-info btn-block mb-3">
                    edit to do
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="btn btn-warning btn-block">
                    cancel
                  </button>
                </>
              :
                <button type="submit" className="btn btn-success btn-block">
                  add to do
                </button>
            }
          </div>

          {
            errors.length ?
              errors.map((error, index) => (
                <div key={index} className="alert alert-danger text-center">
                  { error }
                </div>
              ))
            : null
          }
        </form>

      </div>
    </div>
  );
}