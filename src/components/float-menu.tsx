import React, { ChangeEvent, useCallback, useState } from 'react';

import { generateId } from '../helper';
import type { PriorityText, TodoListItem } from '../interface';
import { EditIconGroup } from './edit-icon-group';
import { PriorityButton } from './priority-button';

interface Props {
  onConfirm: (tag: TodoListItem | undefined) => void;
  onCancel: () => void;
}

const priorityList: PriorityText[] = ['1', '2', '3', '4'];

const emptyItem: TodoListItem = {
  id: '',
  title: '',
  content: '',
  tags: [],
  priority: 'P4',
};

function Component({ onConfirm, onCancel }: Props) {
  const [item, setItem] = useState<TodoListItem>(emptyItem);

  const [activePriority, setActivePriority] = useState<PriorityText | ''>('');

  const handleClickPriority = useCallback((id: PriorityText) => {
    setActivePriority((o) => (o === id ? '' : id));
  }, []);

  const handleConfirm = () => {
    // submit is not allowed when either title nor content is empty
    if (!item.title && !item.content) {
      return;
    }

    onConfirm({
      ...item,
      id: generateId(), // generate random string as id
      priority: `P${activePriority || 4}` as TodoListItem['priority'], // default is p4
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleContentChange = (
    type: 'content' | 'title' | 'tags',
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const data = (item && { ...item }) || ({} as TodoListItem);
    const { value } = e.target;
    // console.log(value);
    if (type === 'tags') {
      const tags = value.split(',').filter(Boolean);
      data[type] = tags;
    } else {
      data[type] = value;
    }

    setItem(data);
  };

  return (
    <>
      {/* a grey shadow mask */}
      <div className="h-full w-full full-mask" />
      <div className="flex flex-col justify-start items-start self-center float-menu">
        <input
          onChange={(e) => handleContentChange('title', e)}
          className="w-full title"
          placeholder="please input title..."
        />
        <textarea
          onChange={(e) => handleContentChange('content', e)}
          className="w-full content"
          placeholder="please input content..."
        />
        <input
          onChange={(e) => handleContentChange('tags', e)}
          className="w-full tag-input"
          placeholder="please input tags, tags are split by `,`"
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
        <EditIconGroup onCancel={handleCancel} onConfirm={handleConfirm} />
      </div>
    </>
  );
}

export const FloatMenu = React.memo(Component);
