import { useState, useEffect } from 'react'

import "./style.css";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


function Todos() {

  const [todos, setTodos]=useState (JSON.parse(localStorage.getItem("todos")));

  useEffect ( () => {
    if (localStorage.getItem("todos") === null ) {
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
      setTodos (JSON.parse(localStorage.getItem("todos")))
    }
  }, [ ] )

  const [status, setStatus]=useState("");
  const [filteredTodos, setFilteredTodos] =useState ([ ]);

  useEffect(() => {
    const filterHandler = ( ) => {
      switch (status) {
        case "completed" :
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
         

        case "active" :
          setFilteredTodos(todos.filter((todo)=>todo.completed === false));
          break;

        default:
          setFilteredTodos(todos);
          break;
      }
    };
    saveLocalTodos ( )
    filterHandler ( );
  } , [todos, status]);

  const saveLocalTodos = ( ) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }



  return (
    <div className='App' >

      <section className='todoapp' >
        <Header
          todos={filteredTodos}
          addTodos={setTodos}
        />
        <Main
          todos={filteredTodos}
          setTodos={setTodos}
        />
        <Footer
          todos={todos}
          status={status}
          setStatus={setStatus}
          filteredTodos={filteredTodos}
          setTodos={setTodos}
        />
      </section>


      <footer className='info'>
        <p>Created by Buse Turan</p>

      </footer>

      
    </div>
  )
}

export default Todos
