import React from 'react';

interface Props {
  className?: string;
  src: string;
  onClick: () => void;
}

function Component({ className, src, onClick }: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <img className={className} src={src} onClick={handleClick} alt="icon" />
  );
}

export const IconWrapper = React.memo(Component);
