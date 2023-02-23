import ReactDOM from 'react-dom';

import loaderStyle from './loader.module.css';

const boxLoader = document.getElementById('loader');

function Loader() {
  return ReactDOM.createPortal(
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
  );
}

export default Loader;
