 import React from 'react';
import { ROLES } from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';
import {userSelector} from "../../selectors";
import {useHistory} from 'react-router-dom';


const Dashboard = props => {
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
