import React, { useCallback, useEffect, useRef } from 'react';

import doneIcon from '../assets/done.svg';
import trashIcon from '../assets/trash.svg';
import type { TodoListItem } from '../interface';
import { TagItem } from './tag-item';

interface Props extends TodoListItem {
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  focused: boolean;
}

function Component({
  id,
  focused,
  onClick,
  onDelete,
  title,
  content,
  priority,
  tags,
}: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    onClick(id);
  };

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !focused) {
      return;
    }

    const gap = 400;

    let startX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      // console.log('deltaX', deltaX);
      node.style.transform = `translateX(${deltaX}px)`;

      if (Math.abs(deltaX) > gap) {
        handleDelete();
        node.style.transform = `translateX(0px)`;
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      // restore position
      node.style.transform = `translateX(0px)`;

      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseLeave = () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseup', handleMouseUp);
    };

    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [focused, handleDelete]);

  return (
    <div
      onClick={handleClick}
      ref={nodeRef}
      className={`flex flex-col justify-start items-start todo-item ${
        focused ? 'focused' : ''
      }`}
    >
      <h2>{title}</h2>
      <p className="flex-1">{content}</p>
      <div className="flex flex-row flex-nowrap justify-start items-center tag-list">
        <TagItem name={priority} className="priority" />
        {tags.map((tag, i) => (
          <TagItem name={tag} key={i} />
        ))}
      </div>
      {focused && (
        <>
          <img src={trashIcon} className="focused-icon trash" />
          <img src={doneIcon} className="focused-icon done" />
        </>
      )}
    </div>
  );
}

export const TodoItem = React.memo(Component);
