import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


import { selectorAuth } from "../services/selectors";
import Loader from "../components/loader/Loader";

interface ProtectedRouteProps {
  children: ReactElement;
  anonymous?: boolean;
  onlyWith?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, anonymous = false, onlyWith }) => {
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

export default ProtectedRoute;
