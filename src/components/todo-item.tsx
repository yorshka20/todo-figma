import React from 'react';

import type { TodoListItem } from '../interface';
import { TagItem } from './tag-item';

interface Props extends TodoListItem {
  //
}

function Component({ id, title, content, priority, tags }: Props) {
  const handleClick = () => {
    id;
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-start items-start todo-item"
    >
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="flex flex-row flex-nowrap justify-start items-center tag-list">
        <TagItem name={priority} className="priority" />
        {tags.map((tag, i) => (
          <TagItem name={tag} key={i} />
        ))}
      </div>
    </div>
  );
}

export const TodoItem = React.memo(Component);
