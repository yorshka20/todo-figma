import React from 'react';

import type { PriorityText } from '../interface';

interface PriorityButtonProps {
  id: PriorityText;
  selected: boolean;
  onClick: (id: PriorityText) => void;
}

function Component({ id, selected, onClick }: PriorityButtonProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex justify-center items-center priority-button ${
        selected ? 'selected' : ''
      }`}
    >
      {id}
    </div>
  );
}

export const PriorityButton = React.memo(Component);
