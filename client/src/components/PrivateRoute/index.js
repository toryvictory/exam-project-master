import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import checkRole from './helpers/checkRole';
import { authSelector } from '../../selectors';
import { REFRESH_TOKEN_KEY } from '../../constants';

function PrivateRoute({ roles, ...rest }) {
  const history = useHistory();
  const { isFetching, user } = useSelector(authSelector);

  let willFetchUser;
  if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
    willFetchUser = true;
  }

  if (user) {
    if (roles && !checkRole(user.role, roles)) {
      alert('Forbidden route'); // need pretty popup
      history.goBack();
      return;
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

export default PrivateRoute;
