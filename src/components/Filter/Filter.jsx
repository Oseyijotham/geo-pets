import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/AppRedux/selectors';
import {
  selectContactsFilter,
  selectFilterUp,
  selectFilterDown
} from '../../redux/AppRedux/selectors';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import { setFilter } from '../../redux/AppRedux/filterSlice';
import {
  deleteContact,
  openModal,
  fetchContactById,
  openMobileAndTabModal,
  updateStatus,
} from '../../redux/AppRedux/operations';

export const Filter = () => {
  const searchTermId = nanoid();
  const contacts = useSelector(selectContacts);
  const filterUpper = useSelector(selectFilterUp);
  const filterLower = useSelector(selectFilterDown);
  const filterValue = useSelector(selectContactsFilter);
  const dispatch = useDispatch();
  const handleSearch = event => {
    dispatch(setFilter(event.target.value));
    console.log(event.target.value);
  };
  const bestMatches = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filterValue.trim().toLowerCase()) &&
      filterValue.trim() !== ''
  );

  const handleModalOpen = evt => {
    if (evt.target.getAttribute('data-id')) {
      const id = evt.currentTarget.getAttribute('data-id');
      dispatch(fetchContactById(id));
      dispatch(openModal());
      dispatch(openMobileAndTabModal());
    }
  };

  const handleDelete = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 1000);
    dispatch(deleteContact(evt.target.name));
  };

   const handleChange = (evt) => {
      dispatch(updateStatus({ status: evt.target.checked, myUpdateStatusId:evt.target.name}));
    }

  return (
    <div className={css.contactList}>
      <label htmlFor={searchTermId}>
        <span className={css.formLabel}>Search Appointments By Customer:</span>
        <input
          type="text"
          placeholder="Enter Customer Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Enter Customer Name"
          required
          onChange={handleSearch}
          id={searchTermId}
          autoComplete="off"
          className={css.formInput}
          value={filterValue}
        />
      </label>

      {filterValue !== '' && bestMatches.length !== 0 && (
        <ul className={css.contactsList}>
          {bestMatches.map(contact => {
            const myindex = bestMatches.indexOf(contact);
            if (myindex >= filterLower && myindex < filterUpper) {
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
    </div>
  );
};
