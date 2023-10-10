import React from 'react';

import addIcon from '../assets/add.svg';
import { IconWrapper } from './icon-wrapper';

interface Props {
  onClick: () => void;
}

function Component({ onClick }: Props) {
  return <IconWrapper src={addIcon} className="add-icon" onClick={onClick} />;
}

export const AddIcon = React.memo(Component);
