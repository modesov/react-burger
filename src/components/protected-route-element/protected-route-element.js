import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUser } from "../../services/actions/auth";
import { selectorAuth } from "../../services/selectors";
import Loader from "../loader/Loader";

function ProtectedRouteElement({ element }) {
  const location = useLocation();
  const { isLoading, user } = useSelector(selectorAuth);
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    setUserLoaded(true);
  }, []);

  if (isLoading || !isUserLoaded) {
    return <Loader />
  }

  return user ? element : <Navigate to="/login" state={{ from: location }} />
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
}

export default ProtectedRouteElement;
