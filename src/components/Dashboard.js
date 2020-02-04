import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Form from './Form';
import TodoList from './ToDoList';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const getTodo = async id => {
    const db = firebase.firestore();
    const doc = await db.collection('todos').doc(id).get();
    const todo = {id: doc.id, ...doc.data()};
    console.log(todo);
    setTodoToEdit(todo);
  };

  const cancelEdit = () => setTodoToEdit(null);

  useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();
      db.collection("todos").onSnapshot(data => {
        const todos = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(todos);
      });
    }
    fetchData();
  },[]);

  return (
    <div className="row">
      <div className="col-lg-4 mb-5">
        <Form 
          todoToEdit={todoToEdit}
          cancelEdit={cancelEdit}
        />
      </div>
      <div className="col-lg-8">
        <TodoList
          todos={todos}
          getTodo={getTodo}
        />
      </div>
    </div>
  );
}

export default Dashboard;
