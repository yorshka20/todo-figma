import { useCallback, useEffect, useState } from 'react';

import './App.css';
import titleImg from './assets/title.svg';
import { AddIcon } from './components/add-icon';
import { FloatMenu } from './components/float-menu';
import { ShadowMask } from './components/shadow-mask';
import { TodoItem } from './components/todo-item';
import type { TodoListItem } from './interface';
import { mockData } from './mock';

function App() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const [showFloatMenu, setShowFloatMenu] = useState(false);
  const [focusedItem, setFocusedItem] = useState('');

  useEffect(() => {
    // fetch data
    const storage = localStorage.getItem('todo-list');
    if (storage) {
      setTodoList(JSON.parse(storage));
      return;
    }

    setTodoList(mockData);
  }, []);

  useEffect(() => {
    // console.log('list', todoList);
    // save to local storage.
    () => {
      localStorage.setItem('todo-list', JSON.stringify(todoList));
    };
  }, [todoList]);

  const handleAdd = useCallback(() => {
    setShowFloatMenu(true);
  }, []);

  const handleConfirmAdd = (tag: TodoListItem | undefined) => {
    setShowFloatMenu(false);

    if (!tag) {
      return;
    }
    // console.log('tag', tag);
    setTodoList((l) => [...l, tag]);
  };

  const handleCancelAdd = () => {
    setShowFloatMenu(false);
  };

  const handleClickItem = useCallback((id: string) => {
    setFocusedItem(id);
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    // console.log('delete', id);
    setTodoList((l) => l.filter((i) => i.id !== id));
  }, []);

  return (
    <div
      className={`flex flex-col justify-start items-center tailwind/gray/50 container`}
    >
      {/* head shadow mask. another one is at bottom */}
      <ShadowMask />

      {/* `Daily Todo` title */}
      <img className="title-img" src={titleImg} />

      {/* todo item list  */}
      <div className="todo-list flex flex-col w-full justify-start items-center">
        {todoList.map((item, index) => (
          <TodoItem
            {...item}
            focused={focusedItem === item.id}
            key={index}
            onClick={handleClickItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      {/* add todo list edit board */}
      {showFloatMenu && (
        <FloatMenu onConfirm={handleConfirmAdd} onCancel={handleCancelAdd} />
      )}

      {/* add todo item button */}
      {!showFloatMenu && <AddIcon onClick={handleAdd} />}

      <ShadowMask position="bottom" />
    </div>
  );
}

export default App;
