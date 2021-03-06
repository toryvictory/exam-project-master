import React, {
  useLayoutEffect, lazy, Suspense, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS, { REFRESH_TOKEN_KEY, ROLES } from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner/Spinner';
import ConfirmPasswordReset from './pages/ConfirmPasswordReset/ConfirmPasswordReset';
import { refreshAuthRequest } from './actions/auth/authActionCreators';
import { controller } from './api/ws/socketController';
import { userSelector } from './selectors';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HowItWorks = lazy(() => import('./pages/HowItWorks/HowItWorks'));
const EventsPage = lazy(() => import('./pages/Events/EventsPage'));

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      dispatch(
        refreshAuthRequest({
          refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        }),
      );
    }
  }, []);

  const user = useSelector(userSelector);
  const { id } = user || {};

  useEffect(() => {
    if (user) {
      controller.subscribe(id);
      return () => controller.unsubscribe(id);
    }
  }, [user]);

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={['/login', '/signup', '/resetPassword']} component={AuthPage} />
          <Route path="/howItWorks" component={HowItWorks} />
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/payment"
            component={Payment}
          />
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/events"
            component={EventsPage}
          />
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/startContest"
            component={StartContestPage}
          />
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/startContest/nameContest"
          >
            <ContestCreationPage
              contestType={CONSTANTS.NAME_CONTEST}
              title="Company Name"
            />
          </PrivateRoute>
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/startContest/taglineContest"
          >
            <ContestCreationPage
              contestType={CONSTANTS.TAGLINE_CONTEST}
              title="TAGLINE"
            />
          </PrivateRoute>
          <PrivateRoute
            roles={[ROLES.CUSTOMER]}
            exact
            path="/startContest/logoContest"
          >
            <ContestCreationPage
              contestType={CONSTANTS.LOGO_CONTEST}
              title="LOGO"
            />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard" component={Dashboard} roles={[ROLES.CUSTOMER, ROLES.CREATOR]} />
          <PrivateRoute exact path="/contest/:id" component={ContestPage} roles={[ROLES.CUSTOMER, ROLES.CREATOR]} />
          <PrivateRoute exact path="/account" component={UserProfile} roles={[ROLES.CUSTOMER, ROLES.CREATOR]} />
          <Route path="/confirmPasswordReset/:token" component={ConfirmPasswordReset} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ChatContainer />
    </Router>
  );
}

export default App;
