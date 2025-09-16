import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectContacts } from '../../redux/AppRedux/selectors';
import {
  selectContactsFilter,
  selectFilterUp,
  selectFilterDown,
  selectError,
  selectIsLoading,
} from '../../redux/AppRedux/selectors';
import {
  deleteContact,
  openModal,
  fetchContactById,
  handleFilterFowardUp,
  handleFilterFowardDown,
  handleFilterBackwardUp,
  handleFilterBackwardDown,
  updateStatus,
  openMobileAndTabModal,
} from '../../redux/AppRedux/operations';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import svg from '../SharedLayout/icons.svg';

export const ContactList = ({ children }) => {
  const contacts = useSelector(selectContacts);
  const filterUp = useSelector(selectFilterUp);
  const filterDown = useSelector(selectFilterDown);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [taskStatus, setTaskStatus] = useState();
  //let myContacts  
  const dispatch = useDispatch();
  const handleDelete = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 1000);
    //console.log(evt.target.name);
    dispatch(deleteContact(evt.target.name));
    /*//dispatch(closeModal());
    const exist = contacts.find(contact => contact._id === evt.target.name);
    console.log(contacts);
    if (exist === undefined) {
      console.log('gvghi');
      dispatch(closeModal());
    }*/
    
  };
  const filterValue = useSelector(selectContactsFilter);

  const handleModalOpen = (evt) => {
    if (evt.target.getAttribute('data-id')) {
      //console.log('Modal opened!');

      const id = evt.currentTarget.getAttribute('data-id');
      //console.log(id);
      dispatch(fetchContactById(id));
      dispatch(openModal());
      dispatch(openMobileAndTabModal());
    }
  };
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(4);


  const handleForward = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 500);
    //let fwdWar = lowerLimit + 4;
    if (filterValue === "") {
      setLowerLimit(lowerLimit + 4);
      setUpperLimit(upperLimit + 4);
    }
    if (filterValue !== "") {
      console.log("OK")
      const str = filterUp;
      const sto = filterDown
      dispatch(handleFilterFowardUp(str));
      dispatch(handleFilterFowardDown(sto));
    }
  }

  const handleBackward = (evt) => {
     evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
       evt.target.style.boxShadow = 'none';
     }, 500);
    //let fwdWar = lowerLimit + 4;
    if (filterValue === "") {
      setLowerLimit(lowerLimit - 4);
      setUpperLimit(upperLimit - 4);
    }
    if (filterValue !== '') {
      const str1 = filterUp;
      const sto1 = filterDown;
       dispatch(handleFilterBackwardUp(str1));
       dispatch(handleFilterBackwardDown(sto1));
     }
  };
  
  const handleChange = (evt) => {
    dispatch(updateStatus({ status: evt.target.checked, myUpdateStatusId:evt.target.name}));
  }
  
   const bestMatches = contacts.filter(
     contact =>
       contact.name.toLowerCase().includes(filterValue.trim().toLowerCase()) &&
       filterValue.trim() !== ''
  );
  
  useEffect(()=>{},[contacts])

  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Appointments / Booking List</h3>
      {children}
      {filterValue === '' && contacts.length !== 0 && (
        <ul
          className={css.contactsList}
          style={{
            height: `${
              contacts.length >= 4 ? '296px' : "auto" 
            }`,
          }}
        >
          {contacts.map(contact => {
            const myindex = contacts.indexOf(contact);
            if (myindex >= lowerLimit && myindex < upperLimit) {
              return (
                <li
                  key={contact._id}
                  data-id={contact._id}
                  className={css.contactsItem}
                  onClick={handleModalOpen}
                >
                  <span className={css.contactsData} data-id={contact._id}>
                    <input
                      type="checkbox"
                      className={css.checkbox}
                      checked={contact.status}
                      name={contact._id}
                      onChange={handleChange}
                    />
                    :{' '}
                    <span className={css.contactsPhone} data-id={contact._id}>
                      {contact.name}
                    </span>
                  </span>
                  <span className={css.contactsButtonArea}>
                    <button
                      type="submit"
                      className={css.contactsButton}
                      name={contact._id}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              );
            }
          })}
        </ul>
      )}
      {contacts.length === 0 && (
        <div className={css.contactsListAlt}>
          {isLoading && !error && (
            <b className={css.notification}>Loading Tasks...</b>
          )}
          {!isLoading && !error && (
            <b className={css.notification}>No Appointments Here!!!</b>
          )}
          {!isLoading && error && <b className={css.notification}>Error!!!</b>}
        </div>
      )}
      {filterValue === '' && (
        <div className={css.navigationArea}>
          {lowerLimit !== 0 && (
            <button className={css.navigationButton} onClick={handleBackward}>
              Prev
            </button>
          )}
          {!(upperLimit > contacts.length) &&
            upperLimit !== contacts.length && (
              <button className={css.navigationButton} onClick={handleForward}>
                Forward
              </button>
            )}
        </div>
      )}
      {filterValue !== '' && (
        <div className={css.navigationArea}>
          {filterDown !== 0 && (
            <button className={css.navigationButton} onClick={handleBackward}>
              Prev
            </button>
          )}
          {!(filterUp > bestMatches.length) &&
            filterUp !== bestMatches.length && (
              <button className={css.navigationButton} onClick={handleForward}>
                Forward
              </button>
            )}
        </div>
      )}
    </div>
  );
};

ContactList.propTypes = {
  children: PropTypes.node,
};
