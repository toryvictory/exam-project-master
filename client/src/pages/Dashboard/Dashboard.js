import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROLES } from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import { userSelector } from '../../selectors';

const Dashboard = (props) => {
  const { role } = useSelector(userSelector);
  const history = useHistory();
  return (
    <div>
      <Header />
      {role === ROLES.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : (
        <CreatorDashboard history={history} match={props.match} />
      )}
    </div>
  );
};

export default Dashboard;
