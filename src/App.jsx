import React from 'react';
import './style.css';
import uniqid from 'uniqid';

const KEY = 'todoApp.todoList';

export default function App() {
  const [todo, setTodo] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);
  const [boleanTodo, setBoleanTodo] = React.useState(false);
  const [todoId, setTodoId] = React.useState('');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todo === '') {
      setError('you need to write the to-do');
      return;
    }
    setTodoList([...todoList, { id: uniqid(), todo }]);
    setTodo('');
    setError(null);
  };

  const dellTodo = (id) => {
    const newTodos = todoList.filter((item) => item.id !== id);

    setTodoList(newTodos);
  };

  const btnEditTodo = (item) => {
    setBoleanTodo(true);
    setTodoId(item.id);

    setTodo(item.todo);
  };

  const editTodo = (e) => {
    e.preventDefault();

    if (todo === '') {
      setError('you need to write the to-do');
      return;
    }

    const newTodos = todoList.map((item) =>
      item.id === todoId ? { id: uniqid(), todo } : item
    );

    setTodoList(newTodos);
    setBoleanTodo(false);
    setTodoId('');
    setTodo('');
    setError(null);
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">Simple Crud</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">To-do List</h4>
          <ul className="list-group">
            {todoList.length === 0 ? (
              <h1>You do not have To-Dos</h1>
            ) : (
              todoList.map((item) => (
                <li key={item.id} className="list-group-item">
                  <span className="lead">{item.todo}</span>
                  <button
                    onClick={(e) => dellTodo(item.id)}
                    className="btn btn-danger btn-sm float-end"
                  >
                    ✘-Dell
                  </button>
                  <button
                    className="btn btn-warning btn-sm  float-end mx-2"
                    onClick={(e) => btnEditTodo(item)}
                  >
                    ✎-edit
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {boleanTodo ? 'Edit To-do' : 'New To-do'}
          </h4>

          <form onSubmit={boleanTodo ? editTodo : addTodo}>
            {error ? <span className="text-danger">{error} </span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="new todo"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />

            {boleanTodo ? (
              <button className="btn btn-success  col-12" type="submit">
                Edit
              </button>
            ) : (
              <button className="btn btn-dark  col-12" type="submit">
                ➕ Add
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
