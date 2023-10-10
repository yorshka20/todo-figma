import React from 'react';

function Component({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  return (
    <div
      style={{
        transform: `rotate(${position === 'bottom' ? 0 : 180}deg)`,
        [position]: 0,
      }}
      className="w-full shadow-mask"
    />
  );
}

export const ShadowMask = React.memo(Component);
