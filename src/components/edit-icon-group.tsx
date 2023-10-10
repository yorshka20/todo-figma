import React from 'react';

import cancelIcon from '../assets/cancel.svg';
import tickIcon from '../assets/tick.svg';
import { IconWrapper } from './icon-wrapper';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

function Component({ onConfirm, onCancel }: Props) {
  return (
    <div className="flex flex-row justify-between items-center edit-icon-group">
      <IconWrapper
        onClick={onCancel}
        src={cancelIcon}
        className="cancel-icon"
      />
      <IconWrapper onClick={onConfirm} src={tickIcon} className="tick-icon" />
    </div>
  );
}

export const EditIconGroup = React.memo(Component);
