import React, { ChangeEvent, useState } from 'react';

import type { PriorityText, TodoListItem } from '../interface';
import { EditIconGroup } from './edit-icon-group';
import { PriorityButton } from './priority-button';

interface Props {
  onConfirm: (tag: TodoListItem | undefined) => void;
  onCancel: () => void;
  show: boolean;
}

const priorityList: PriorityText[] = ['1', '2', '3', '4'];

function Component({ onConfirm, onCancel, show }: Props) {
  const [item] = useState<TodoListItem>();

  const [activePriority, setActivePriority] = useState<PriorityText | ''>('');

  const handleClickPriority = (id: PriorityText) => {
    setActivePriority(id);
  };

  const handleConfirm = () => {
    //

    onConfirm(item);
  };

  const handleCancel = () => {
    //
    onCancel();
  };

  const handleContentChange = (
    type: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(e);
    switch (type) {
      case 'input':
        break;
      case 'content':
        break;
      case 'tag':
        break;

      default:
        break;
    }
  };

  if (!show) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full float-menu-container">
      <div className="flex flex-col justify-start items-center w-full float-menu">
        <input
          onChange={(e) => handleContentChange('title', e)}
          className="w-full title"
        />
        <textarea
          onChange={(e) => handleContentChange('content', e)}
          className="w-full content"
        />
        <input
          onChange={(e) => handleContentChange('tag', e)}
          className="w-full tag-input"
        />
        <div className="flex flex-row justify-start items-center priority-buttons">
          {priorityList.map((p) => (
            <PriorityButton
              id={p}
              key={p}
              selected={p === activePriority}
              onClick={handleClickPriority}
            />
          ))}
        </div>
      </div>
      <EditIconGroup onCancel={handleCancel} onConfirm={handleConfirm} />
    </div>
  );
}

export const FloatMenu = React.memo(Component);
