import { Outlet } from 'react-router-dom';
import {
  Container,
  Header,
  Link
} from './SharedSortingLayout.styled';
import { Suspense } from 'react';
import {
setSortAll, setSortPending, setSortFulfilled, setSortPastDue
} from '../../redux/AuthRedux/operations';
import { useDispatch } from 'react-redux';
import css from './SharedSortingLayout.module.css';
import { ThreeCircles } from 'react-loader-spinner';

export const SharedSortingLayout = () => {
  const dispatch = useDispatch();
  const handleSortAll = () => {
     dispatch(setSortAll());
  }

   const handleSortPending = () => {
     dispatch(setSortPending());
  };
  
  const handleSortFulfilled = () => {
    dispatch(setSortFulfilled());
  };

  const handleSortPastDue = () => {
    dispatch(setSortPastDue());
  };
  return (
    <Container>
      <Header>
        <Link to="/sharedLayout/sorting/all" onClick={handleSortAll}>
          All
        </Link>
        <Link to="/sharedLayout/sorting/pending" onClick={handleSortPending}>
          Pending
        </Link>
        <Link to="completed" onClick={handleSortFulfilled}>
          Fulfilled
        </Link>
        <Link to="past_due" onClick={handleSortPastDue}>
          Past Due
        </Link>
      </Header>

      <Suspense
        fallback={
          <div className={css.childWrapper}>
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
        }
      >
        <Outlet />
      </Suspense>
    </Container>
  );
};
