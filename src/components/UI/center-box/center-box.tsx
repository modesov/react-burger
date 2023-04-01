import { FC, ReactNode } from 'react';
import centerBoxStyle from './center-box.module.css';

interface CenterBoxProps {
  children: ReactNode;
}

const CenterBox: FC<CenterBoxProps> = ({ children }) => {
  return (
    <div className={centerBoxStyle.container}>
      <div className={centerBoxStyle.centerBox}>
        {children}
      </div>
    </div>
  );
}

export default CenterBox;
