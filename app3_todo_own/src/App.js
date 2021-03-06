import React, { useState, useEffect} from "react";
import "./App.css";
//Imported Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  //State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run Once When The App Start
  useEffect(() => {
    getLocalTodos();
    console.log('i fire once');
  },[]);
  
  //UseEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();       
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      
      let todoLocal= JSON.parse(localStorage.getItem("todos"))

      setTodos(todoLocal)

    }
  }

  return (
    <div className="App">
      <header>
        <h1> Todo List... </h1>
        <h4>Ha nincs Eszed legyen Noteszed!</h4>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}
export default App;