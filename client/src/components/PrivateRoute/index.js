import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner/Spinner';
import checkRole from './helpers/checkRole';
import { authSelector } from '../../selectors';
import { REFRESH_TOKEN_KEY, ROLES } from '../../constants';

function PrivateRoute({ roles, ...rest }) {
  const { isFetching, user } = useSelector(authSelector);

  let willFetchUser;
  if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
    willFetchUser = true;
  }

  if (user) {
    if (roles && !checkRole(user.role, roles)) {
      toast.error('Forbidden route!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return <Redirect to="/" />;
    }
    return <Route {...rest} />;
  }

  if (willFetchUser || isFetching) {
    return <Spinner />;
  }

  return <Redirect to="/login" />;
}

PrivateRoute.propTypes = {
  roles: PropTypes.oneOfType([
    PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

PrivateRoute.defaultProps = {
  roles: [ROLES.CUSTOMER, ROLES.CREATOR],
};

export default PrivateRoute;
