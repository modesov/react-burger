import { FC, ReactNode } from 'react';
import centerBoxStyle from './center-box.module.css';
import clsx from 'clsx';

interface CenterBoxProps {
  children: ReactNode;
  className?: string;
}

const CenterBox: FC<CenterBoxProps> = ({ children, className }) => {
  return (
    <div className={centerBoxStyle.container}>
      <div className={clsx(centerBoxStyle.centerBox, className)}>
        {children}
      </div>
    </div>
  );
}

export default CenterBox;
