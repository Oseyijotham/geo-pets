import { useEffect, lazy } from 'react';
//import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { SharedSortingLayout } from '../SharedSortingLayout/SharedSortingLayout';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RestrictedRouteRegister } from '../RestrictedRouteRegister/RestrictedRouteRegister';
import { RestrictedRouteLogin } from '../RestrictedRouteLogin/RestrictedRouteLogin';
import { RestrictedRouteNav } from '../RestrictedRouteNav/RestrictedRouteNav';
import { refreshUser, getUser, logOut } from '../../redux/AuthRedux/operations';
import { retrieveApiKey } from '../../redux/AppRedux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHook } from '../../customHook/customHook'
import { jwtDecode } from 'jwt-decode';
import Notiflix from 'notiflix';
import { ThreeCircles } from 'react-loader-spinner';
import css from '../SortedAllTasks/SortedAllTasks.module.css';


const Register = lazy(() => import('../Register/Register'));
const Login = lazy(() => import('../Login/Login'));
const Contacts = lazy(() => import('../Contacts/Contacts'));
const Home = lazy(() => import('../Home/Home'));
const SharedFooter = lazy(() => import('../SharedFooter/SharedFooter'));
const SortedAllTasks = lazy(() => import('../SortedAllTasks/SortedAllTasks'));
const SortedPendingTasks = lazy(() => import('../SortedPendingTasks/SortedPendingTasks'));
const SortedCompletedTasks = lazy(() => import('../SortedCompletedTasks/SortedCompletedTasks'));
const SortedPastDueTasks = lazy(() => import('../SortedPastDueTasks/SortedPastDueTasks'));
const Profile = lazy(() => import('../Profile/Profile'));

export const App = () => {
  const { token, isRefreshing} = useAuthHook();
  const dispatch = useDispatch();

  // Effect to check and decode token
  /*By the way the token is null in the initial state so when the user logs in the value of the token changes which triggers the
  useEffect hook below*/
  useEffect(() => {
    if (token) {
      
        const interval = setInterval(() => {
          const { exp } = jwtDecode(token); // Decode token to get expiry
          const currentTime = Math.floor(Date.now() / 1000);;

          if (exp - currentTime <= 120) {
            Notiflix.Notify.warning('Session timeout');
            dispatch(logOut()); // Force logout 60 seconds or less before token expires
            clearInterval(interval); // Cleanup
          }
          console.log("check")
        }, 60 * 1000); // Check every 1 minute
      
    
    

    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(retrieveApiKey());
  }, [dispatch]);
  return isRefreshing ? (
    <div>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#9225ff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
      />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<SharedFooter />}>
        <Route
          index
          element={
            <RestrictedRouteLogin
              redirectTo="sharedLayout/Home"
              component={<Login />}
            />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRouteRegister redirectTo="/" component={<Register />} />
          }
        />
        <Route path="sharedLayout" element={<SharedLayout />}>
          <Route
            path="Home"
            element={<PrivateRoute redirectTo="/" component={<Home />} />}
          />
          <Route
            path="*"
            element={<PrivateRoute redirectTo="/" component={<Home />} />}
          />
          <Route
            path="sheduler"
            element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
          />
          <Route path="sorting" element={<SharedSortingLayout />}>
            <Route
              index
              element={
                <RestrictedRouteNav component={<SharedSortingLayout />} />
              }
            />

            <Route
              path="all"
              element={
                <PrivateRoute redirectTo="/" component={<SortedAllTasks />} />
              }
            />

            <Route
              path="pending"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedPendingTasks />}
                />
              }
            />

            <Route
              path="completed"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedCompletedTasks />}
                />
              }
            />

            <Route
              path="past_due"
              element={
                <PrivateRoute
                  redirectTo="/"
                  component={<SortedPastDueTasks />}
                />
              }
            />
          </Route>
          <Route
            path="profile"
            element={<PrivateRoute redirectTo="/" component={<Profile />} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};