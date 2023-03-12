import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import { selectorAuth } from "../services/selectors";
import Loader from "../components/loader/Loader";

function ProtectedRoute({ children, anonymous = false, onlyWith = null }) {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { isLoading, user } = useSelector(selectorAuth);

  if (isLoading) {
    return <Loader />;
  }

  if ((anonymous && user) || (onlyWith && from !== onlyWith)) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !user) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  anonymous: PropTypes.bool,
  onlyWith: PropTypes.string
}

export default ProtectedRoute;
