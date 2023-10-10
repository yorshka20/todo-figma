import React from 'react';

interface Props {
  name: string;
  className?: string;
}

function Component({ name, className = '' }: Props) {
  return <span className={`tag-item self-center ${className}`}>{name}</span>;
}

export const TagItem = React.memo(Component);
