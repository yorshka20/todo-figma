import { useEffect, useState } from 'react';

import './App.css';
import addIcon from './assets/add.svg';
import { FloatMenu } from './components/float-menu';
import { IconWrapper } from './components/icon-wrapper';
import { TagItem } from './components/tag-item';
import type { TodoListItem } from './interface';
import { mockData } from './mock';

function App() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const [showFloatMenu, setShowFloatMenu] = useState(false);

  useEffect(() => {
    // fetch data
    setTodoList(mockData);
  }, []);

  const handleAdd = () => {
    setShowFloatMenu(true);
  };

  const handleConfirmAdd = (tag: TodoListItem | undefined) => {
    //
    tag;
  };

  const handleCancelAdd = () => {
    setShowFloatMenu(false);
  };

  return (
    <div className="flex flex-col justify-start items-center tailwind/gray/50 container">
      {todoList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-start items-start todo-item"
        >
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <div className="flex flex-row flex-nowrap justify-start items-center tag-list">
            <TagItem name={item.priority} className="priority" />
            {item.tags.map((tag, i) => (
              <TagItem name={tag} key={i} />
            ))}
          </div>
        </div>
      ))}

      <FloatMenu
        show={showFloatMenu}
        onConfirm={handleConfirmAdd}
        onCancel={handleCancelAdd}
      />

      {!showFloatMenu && (
        <IconWrapper src={addIcon} className="add-icon" onClick={handleAdd} />
      )}
    </div>
  );
}

export default App;
