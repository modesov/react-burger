import PropTypes from 'prop-types';
import centerBoxStyle from './center-box.module.css';

function CenterBox({ children }) {
  return (
    <div className={centerBoxStyle.container}>
      <div className={centerBoxStyle.centerBox}>
        {children}
      </div>
    </div>
  );
}


CenterBox.propTypes = {
  children: PropTypes.node.isRequired
}

export default CenterBox;
