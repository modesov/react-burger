import { FC } from 'react';
import ReactDOM from 'react-dom';

import loaderStyle from './loader.module.css';

const boxLoader = document.getElementById('loader');

const Loader: FC = () => {
  return boxLoader 
  ? ReactDOM.createPortal(
    (
      <div className={loaderStyle.loaderBox}>
        <div className={loaderStyle.loader}>
          <div className={loaderStyle.face}>
            <div className={loaderStyle.circle}></div>
          </div>
          <div className={loaderStyle.ace}>
            <div className={loaderStyle.circle}></div>
          </div>
        </div>
      </div>
    ),
    boxLoader
  )
  : null
}

export default Loader;
