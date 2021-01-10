import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodoList, actions, RootState, TodoItem } from "../redux";

import './App.css';

function TodoEditor() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState<string>("");
  const [inputValue, setInputValue] = useState<Number>(1);

  const handleText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const handleEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (inputText && e.keyCode === 13) {
      dispatch(actions.addTodoItems({
        text: inputText,
        isDone: false
      }));
      setInputText('');
    }
  }, [dispatch, inputText]);

  const handleSelect = useCallback((e: any) => {
    console.log("value", e.target.value);
    console.log("type", typeof(e.target.value));
    setInputValue(Number(e.target.value));
  }, []);

  return (
    <div>
      <input
        type='text'
        onChange={handleText}
        onKeyDown={handleEnter}
        value={inputText}
        className='txt-input'
        placeholder='write something here...'
      />
      <select onChange={handleSelect}>
        <option value="1">apple</option>
        <option value="2">banana</option>
      </select>
      {
        inputValue === 2 && (
          <p>hello</p>
        )
      }
    </div>


  )

}

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector<RootState, TodoItem[]>(state => selectTodoList(state.todos));
  const handleCheck = useCallback((item: TodoItem) => {
    dispatch(actions.toggleTodoItems(item));
  }, [dispatch]);


  return (
    <ul>
      {todoList.map((item: TodoItem) => {
        console.log("item", item && item.text);
        return (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.isDone} onChange={handleCheck.bind({}, item)} className="chk-input" />
              <span className={item.isDone ? 'txt-complete' : ''}>
                {item.text}
              </span>
            </label>

          </li>
        )
      })}
    </ul>
  )

}

function App() {
  return (
    <div className='container'>
      <h1 className='title'>Todo List</h1>
      <TodoEditor />
      <TodoList />
    </div>
  )
}

export default App;
