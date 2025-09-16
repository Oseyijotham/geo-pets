import { useAuthHook } from '../../customHook/customHook';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectSortAll,
  selectSortPending,
  selectSortFulfilled,
  selectSortPastDue,
} from '../../redux/AuthRedux/selectors';



export const RestrictedRouteNav = ({ component: Component }) => {
  const onAll = useSelector(selectSortAll);
    const onPending = useSelector(selectSortPending);
    const onFulfilled = useSelector(selectSortFulfilled);
    const onPastDue = useSelector(selectSortPastDue);
  const { isLoggedIn } = useAuthHook();

  if(onAll === false && onPending === false && onFulfilled === false && onPastDue === false ) { return isLoggedIn ? <Navigate to={'all'} /> : Component;}
 
  if(onAll === true) { return isLoggedIn ? <Navigate to={'all'} /> : Component;}
  
  if(onPending === true) { return isLoggedIn ? <Navigate to={'pending'} /> : Component; } 
  
  if(onFulfilled === true) { return isLoggedIn ? <Navigate to={'completed'} /> : Component; } 
  
  if(onPastDue === true){ return isLoggedIn ? <Navigate to={'past_due'} /> : Component;} 
};

