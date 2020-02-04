import React from 'react'
import ToDo from './ToDo'

const ToDoList = ({todos, getTodo}) => (
  <div className="row">
    
      {
        todos.map(todo => (
          <div key={todo.id} className="col-md-4">
            <ToDo
              todo={todo}
              getTodo={getTodo}
            />
          </div>
        ))
      }
  </div>
)

export default ToDoList;