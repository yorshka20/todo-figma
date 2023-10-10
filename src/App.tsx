import { useCallback, useEffect, useState } from 'react';

import './App.css';
import { AddIcon } from './components/add-icon';
import { FloatMenu } from './components/float-menu';
import { ShadowMask } from './components/shadow-mask';
import { TodoItem } from './components/todo-item';
import type { TodoListItem } from './interface';
import { mockData } from './mock';

function App() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const [showFloatMenu, setShowFloatMenu] = useState(false);

  useEffect(() => {
    // fetch data
    setTodoList(mockData);
  }, []);

  const handleAdd = useCallback(() => {
    setShowFloatMenu(true);
  }, []);

  const handleConfirmAdd = (tag: TodoListItem | undefined) => {
    setShowFloatMenu(false);

    if (!tag) {
      return;
    }
    console.log('tag', tag);
    setTodoList((l) => [...l, tag]);
  };

  const handleCancelAdd = () => {
    setShowFloatMenu(false);
  };

  return (
    <div className="flex flex-col justify-start items-center tailwind/gray/50 container">
      <ShadowMask />
      {todoList.map((item, index) => (
        <TodoItem
          id={item.id}
          key={index}
          title={item.title}
          content={item.content}
          priority={item.priority}
          tags={item.tags}
        />
      ))}

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
