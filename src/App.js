import { ReactComponent as TrashFill } from './icons/trash-fill.svg';
import { ReactComponent as JournalAll } from './icons/journal-text.svg';
import { ReactComponent as JournalDone } from './icons/journal-check.svg';
import { ReactComponent as JournalNotDone } from './icons/journal-x.svg';
import { ReactComponent as ClipboardFill } from './icons/clipboard2-fill.svg';

import Colors from './Colors.json'
import './Task.scss';
import './Radio.scss';
import './Accordion.scss';
import './NewTask.scss';
import './App.css';
import './Btn.scss';
import React, { useState } from 'react';

function App() {

  const [filter,setFilter]=useState('ALL');

  const handleFilterChange=(e)=>{setFilter( e.target.value);}
  const handleExpandChange=(e)=>{
    if (e.target.checked) document.getElementsByClassName('app-header')[0].classList.add("header-expand");
    else document.getElementsByClassName('app-header')[0].classList.remove("header-expand");
  }

  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      color: "#F5F5F5",
      isDone: false
    }
  ]);

  function Todo({ task, index, markTodo, removeTodo }) {
    return (
    <div class="task">
      <div style={{backgroundColor: task.color}} class="task-cl"/>
      <span style={{ textDecoration: task.isDone ? "line-through" : "" }}>{task.text}</span>
      <div class="task-controls">
        <div class="toggle">
          <input type="checkbox" id={"task-toggle"} onChange={e => markTodo(index, true)}/>
          <label for={"task-toggle"}></label>
        </div>
        <button class="checkbutton" onClick={() => removeTodo(index)}><TrashFill/></button>
      </div>
    </div>
    );
  }

  function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");
    const [cls, setCls] = useState(0);
  
    const handleColorChange=(e)=>{
      if (cls<Colors.palette.length-1) setCls(cls+1);
      else setCls(0);
    }

    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value, Colors.palette[cls].hex);
      setValue("");
    };
  
    return (
      <div class="header-add-block">
      <label class="new-task-label">
        <input type="text" class="new-task-input" placeholder="Add items..." onChange={e => setValue(e.target.value)}/>
        <ClipboardFill class="icon" title={Colors.palette[cls].color}  onClick={handleColorChange} style={{color: Colors.palette[cls].hex}}/>
      </label>
      <button class="add-task-button" onClick={handleSubmit}>Добавить</button>
    </div>
    );
  }

  const addTodo = (text, color) => {
    const newTodos = [...todos, { text, color }];
    setTodos(newTodos);
  };

  const markTodo = (index, active) => {
    const newTodos = [...todos];
    newTodos[index].isDone = active;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };




  return (
      <div class="background-main">
        <div class="app-header">
          <span class="app-header-text">REACT TODO</span>
          <div>
            <input onChange={handleExpandChange} type="checkbox" id="hamburger-checkbox" />
             <label class="hamburger-label" for="hamburger-checkbox">
                <div class="hamburger-line"/>
                <div class="hamburger-line"/>
                <div class="hamburger-line"/>
              </label>
            </div>
            <FormTodo addTodo={addTodo} />
            <div class="radio-container" style={{paddingRight: "0px"}}>
              <div class="tabs">
                <input onChange={handleFilterChange} value="ALL" type="radio" id="radio-1" name="tabs" defaultChecked/>
                <label class="tab" for="radio-1"><JournalAll class="icon-filter"/></label>
                <input onChange={handleFilterChange} value="DONE" type="radio" id="radio-2" name="tabs"/>
                <label class="tab" for="radio-2"><JournalDone class="icon-filter"/></label>
                <input onChange={handleFilterChange} value="NDONE" type="radio" id="radio-3" name="tabs"/>
                <label class="tab" for="radio-3"><JournalNotDone class="icon-filter"/></label>
                <span class="glider"></span>
              </div>
            </div>
          </div>
        <div class="task-container">
          {todos.map((task, index) => (
          <Todo
                key={index}
                index={index}
                task={task}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
          ))}
        </div>
      </div>
  );
}

export default App;
