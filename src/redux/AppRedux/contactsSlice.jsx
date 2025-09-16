
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  openModal,
  closeModal,
  openSortedAllModal,
  closeSortedAllModal,
  openSortedPendingModal,
  closeSortedPendingModal,
  openSortedCompletedModal,
  closeSortedCompletedModal,
  openSortedPastDueModal,
  closeSortedPastDueModal,
  fetchContactById,
  fetchSortedAllContactById,
  fetchSortedPendingContactById,
  fetchSortedCompletedContactById,
  fetchSortedPastDueContactById,
  handleFilterFowardUp,
  handleFilterFowardDown,
  handleFilterBackwardUp,
  handleFilterBackwardDown,
  updateContactAvatar,
  updateSortedAllContactAvatar,
  updateSortedPendingContactAvatar,
  updateSortedCompletedContactAvatar,
  updateSortedPastDueContactAvatar,
  updateContactName,
  updateSortedAllContactName,
  updateSortedPendingContactName,
  updateSortedCompletedContactName,
  updateSortedPastDueContactName,
  updateContactEmail,
  updateSortedAllContactEmail,
  updateSortedPendingContactEmail,
  updateSortedCompletedContactEmail,
  updateSortedPastDueContactEmail,
  updateContactPhone,
  updateSortedAllContactPhone,
  updateSortedPendingContactPhone,
  updateSortedCompletedContactPhone,
  updateSortedPastDueContactPhone,
  updateStatus,
  openMobileAndTabModal,
  closeMobileAndTabModal,
  openAllMobileAndTabModal,
  closeAllMobileAndTabModal,
  openPendingMobileAndTabModal,
  closePendingMobileAndTabModal,
  openCompletedMobileAndTabModal,
  closeCompletedMobileAndTabModal,
  openPastDueMobileAndTabModal,
  closePastDueMobileAndTabModal,
  saveCustomerName,
} from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

/*const handleKeyPending = state => {
  state.contacts.isKeyLoading = true;
  state.contacts.error = null;
};

const handleKeyRejected = (state, action) => {
  state.contacts.isKeyLoading = false;
  state.contacts.error = action.payload;
};*/

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      isKeyLoading: false,
      error: null,
      openMyModal: false,
      openMyMobileAndTabModal: true,
      openMyAllMobileAndTabModal: true,
      openMyPendingMobileAndTabModal: true,
      openMyCompletedMobileAndTabModal: true,
      openMyPastDueMobileAndTabModal: true,
      openMyAllModal: false,
      openMyPendingModal: false,
      openMyCompletedModal: false,
      openMyPastDueModal: false,
      selectedContact: {
        name: null,
        email: null,
        dueDate: null,
        avatarURL: null,
        groups: null,
      },
      selectedSortedAllContact: {
        name: null,
        email: null,
        dueDate: null,
        avatarURL: null,
        groups: null,
      },
      selectedSortedPendingContact: {
        name: null,
        email: null,
        dueDate: null,
        avatarURL: null,
        groups: null,
      },
      selectedSortedCompletedContact: {
        name: null,
        email: null,
        dueDate: null,
        avatarURL: null,
        groups: null,
      },
      selectedSortedPastDueContact: {
        name: null,
        email: null,
        dueDate: null,
        avatarURL: null,
        groups: null,
      },
      isSlideLoading: false,
      isSlideError: false,
      filterUpLimit: 4,
      filterDownLimit: 0,
      customerName:null,
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
        //console.log(action.payload);
        //myContacts.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        /*state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          item => item._id === action.payload
        );
        state.contacts.items.splice(index, 1);*/
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(openModal.fulfilled, (state, action) => {
        state.contacts.openMyModal = action.payload;
      })

      .addCase(closeModal.fulfilled, (state, action) => {
        state.contacts.openMyModal = action.payload;
        //state.contacts.selectedContact = {};
      })
      .addCase(openSortedAllModal.fulfilled, (state, action) => {
        state.contacts.openMyAllModal = action.payload;
      })

      .addCase(closeSortedAllModal.fulfilled, (state, action) => {
        state.contacts.openMyAllModal = action.payload;
        //state.contacts.selectedContact = {};
      })
      .addCase(openSortedPendingModal.fulfilled, (state, action) => {
        state.contacts.openMyPendingModal = action.payload;
      })

      .addCase(closeSortedPendingModal.fulfilled, (state, action) => {
        state.contacts.openMyPendingModal = action.payload;
        //state.contacts.selectedContact = {};
      })

      .addCase(openSortedCompletedModal.fulfilled, (state, action) => {
        state.contacts.openMyCompletedModal = action.payload;
      })

      .addCase(closeSortedCompletedModal.fulfilled, (state, action) => {
        state.contacts.openMyCompletedModal = action.payload;
        //state.contacts.selectedContact = {};
      })

      .addCase(openSortedPastDueModal.fulfilled, (state, action) => {
        state.contacts.openMyPastDueModal = action.payload;
      })

      .addCase(closeSortedPastDueModal.fulfilled, (state, action) => {
        state.contacts.openMyPastDueModal = action.payload;
        //state.contacts.selectedContact = {};
      })

      /*.addCase(fetchContactById.fulfilled, (state, action) => {
        const myContact = myContacts.find(contact => {
          return contact._id === action.payload;
        });
        state.contacts.selectedContact = myContact;
      });*/
      .addCase(fetchContactById.pending, state => {
        state.contacts.isSlideLoading = true;
        state.contacts.selectedContact.avatarURL = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.contacts.selectedContact = action.payload;
        state.contacts.isSlideLoading = false;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.contacts.isSlideLoading = false;
        state.contacts.isSlideError = action.payload;
      })

      .addCase(fetchSortedAllContactById.pending, state => {
        state.contacts.isSlideLoading = true;
        state.contacts.selectedSortedAllContact.avatarURL = null;
      })
      .addCase(fetchSortedAllContactById.fulfilled, (state, action) => {
        state.contacts.selectedSortedAllContact = action.payload;
        state.contacts.isSlideLoading = false;
        /*if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload;
        }*/
      })
      .addCase(fetchSortedAllContactById.rejected, (state, action) => {
        state.contacts.isSlideLoading = false;
        state.contacts.isSlideError = action.payload;
      })

      .addCase(fetchSortedCompletedContactById.pending, state => {
        state.contacts.isSlideLoading = true;
        state.contacts.selectedSortedCompletedContact.avatarURL = null;
      })
      .addCase(fetchSortedCompletedContactById.fulfilled, (state, action) => {
        state.contacts.selectedSortedCompletedContact = action.payload;
        state.contacts.isSlideLoading = false;
        /*if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload;
        }*/
      })
      .addCase(fetchSortedCompletedContactById.rejected, (state, action) => {
        state.contacts.isSlideLoading = false;
        state.contacts.isSlideError = action.payload;
      })

      .addCase(fetchSortedPastDueContactById.pending, state => {
        state.contacts.isSlideLoading = true;
        state.contacts.selectedSortedPastDueContact.avatarURL = null;
      })
      .addCase(fetchSortedPastDueContactById.fulfilled, (state, action) => {
        state.contacts.selectedSortedPastDueContact = action.payload;
        state.contacts.isSlideLoading = false;
        /*if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload;
        }*/
      })
      .addCase(fetchSortedPastDueContactById.rejected, (state, action) => {
        state.contacts.isSlideLoading = false;
        state.contacts.isSlideError = action.payload;
      })

      .addCase(fetchSortedPendingContactById.pending, state => {
        state.contacts.isSlideLoading = true;
        state.contacts.selectedSortedPendingContact.avatarURL = null;
      })
      .addCase(fetchSortedPendingContactById.fulfilled, (state, action) => {
        state.contacts.selectedSortedPendingContact = action.payload;
        state.contacts.isSlideLoading = false;
        /*if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedContact = action.payload;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload;
        }*/
      })
      .addCase(fetchSortedPendingContactById.rejected, (state, action) => {
        state.contacts.isSlideLoading = false;
        state.contacts.isSlideError = action.payload;
      })

      .addCase(handleFilterFowardUp.fulfilled, (state, action) => {
        state.contacts.filterUpLimit = action.payload;
      })
      .addCase(handleFilterFowardDown.fulfilled, (state, action) => {
        state.contacts.filterDownLimit = action.payload;
      })
      .addCase(handleFilterBackwardUp.fulfilled, (state, action) => {
        state.contacts.filterUpLimit = action.payload;
      })
      .addCase(handleFilterBackwardDown.fulfilled, (state, action) => {
        state.contacts.filterDownLimit = action.payload;
      })
      .addCase(updateContactAvatar.fulfilled, (state, action) => {
        state.contacts.selectedContact.avatarURL = action.payload.avatarURL;

        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedAllContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedContact._id
        ) {
          state.contacts.selectedSortedPendingContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedContact._id
        ) {
          state.contacts.selectedSortedCompletedContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedContact._id
        ) {
          state.contacts.selectedSortedPastDueContact.avatarURL =
            action.payload.avatarURL;
        }
      })
      .addCase(updateSortedAllContactAvatar.fulfilled, (state, action) => {
        state.contacts.selectedSortedAllContact.avatarURL =
          action.payload.avatarURL;

        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact.avatarURL = action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPendingContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedCompletedContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPastDueContact.avatarURL =
            action.payload.avatarURL;
        }
      })
      .addCase(updateSortedPendingContactAvatar.fulfilled, (state, action) => {
        state.contacts.selectedSortedPendingContact.avatarURL =
          action.payload.avatarURL;

        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedContact.avatarURL = action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPendingContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedCompletedContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPastDueContact.avatarURL =
            action.payload.avatarURL;
        }
      })
      .addCase(
        updateSortedCompletedContactAvatar.fulfilled,
        (state, action) => {
          state.contacts.selectedSortedCompletedContact.avatarURL =
            action.payload.avatarURL;

          if (
            state.contacts.selectedContact._id ===
            state.contacts.selectedSortedPendingContact._id
          ) {
            state.contacts.selectedContact.avatarURL = action.payload.avatarURL;
          }
          if (
            state.contacts.selectedSortedAllContact._id ===
            state.contacts.selectedSortedPendingContact._id
          ) {
            state.contacts.selectedSortedPendingContact.avatarURL =
              action.payload.avatarURL;
          }
          if (
            state.contacts.selectedSortedCompletedContact._id ===
            state.contacts.selectedSortedPendingContact._id
          ) {
            state.contacts.selectedSortedCompletedContact.avatarURL =
              action.payload.avatarURL;
          }
          if (
            state.contacts.selectedSortedPastDueContact._id ===
            state.contacts.selectedSortedPendingContact._id
          ) {
            state.contacts.selectedSortedPastDueContact.avatarURL =
              action.payload.avatarURL;
          }
        }
      )
      .addCase(updateSortedPastDueContactAvatar.fulfilled, (state, action) => {
        state.contacts.selectedSortedPastDueContact.avatarURL =
          action.payload.avatarURL;

        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedContact.avatarURL = action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedAllContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPendingContact.avatarURL =
            action.payload.avatarURL;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedCompletedContact.avatarURL =
            action.payload.avatarURL;
        }
      })

      .addCase(updateContactName.pending, handlePending)
      .addCase(updateContactName.fulfilled, (state, action) => {
        state.contacts.selectedContact.name = action.payload.newObj.name;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateContactName.rejected, handleRejected)
      .addCase(updateSortedAllContactName.pending, handlePending)
      .addCase(updateSortedAllContactName.fulfilled, (state, action) => {
        state.contacts.selectedSortedAllContact.name =
          action.payload.newObj.name;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedAllContactName.rejected, handleRejected)
      .addCase(updateSortedPendingContactName.pending, handlePending)
      .addCase(updateSortedPendingContactName.fulfilled, (state, action) => {
        state.contacts.selectedSortedPendingContact.name =
          action.payload.newObj.name;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPendingContactName.rejected, handleRejected)
      .addCase(updateSortedCompletedContactName.pending, handlePending)
      .addCase(updateSortedCompletedContactName.fulfilled, (state, action) => {
        state.contacts.selectedSortedCompletedContact.name =
          action.payload.newObj.name;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedCompletedContactName.rejected, handleRejected)
      .addCase(updateContactEmail.pending, handlePending)

      .addCase(updateSortedPastDueContactName.pending, handlePending)
      .addCase(updateSortedPastDueContactName.fulfilled, (state, action) => {
        state.contacts.selectedSortedPastDueContact.name =
          action.payload.newObj.name;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPastDueContactName.rejected, handleRejected)

      .addCase(updateContactEmail.fulfilled, (state, action) => {
        state.contacts.selectedContact.email = action.payload.newObj.email;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateContactEmail.rejected, handleRejected)

      .addCase(updateSortedAllContactEmail.pending, handlePending)
      .addCase(updateSortedAllContactEmail.fulfilled, (state, action) => {
        state.contacts.selectedSortedAllContact.email =
          action.payload.newObj.email;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedAllContactEmail.rejected, handleRejected)
      // updateSortedPendingContactEmail
      .addCase(updateSortedPendingContactEmail.pending, handlePending)
      .addCase(updateSortedPendingContactEmail.fulfilled, (state, action) => {
        state.contacts.selectedSortedPendingContact.email =
          action.payload.newObj.email;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPendingContactEmail.rejected, handleRejected)

      .addCase(updateSortedCompletedContactEmail.pending, handlePending)
      .addCase(updateSortedCompletedContactEmail.fulfilled, (state, action) => {
        state.contacts.selectedSortedCompletedContact.email =
          action.payload.newObj.email;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedCompletedContactEmail.rejected, handleRejected)

      .addCase(updateSortedPastDueContactEmail.pending, handlePending)
      .addCase(updateSortedPastDueContactEmail.fulfilled, (state, action) => {
        state.contacts.selectedSortedPastDueContact.email =
          action.payload.newObj.email;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPastDueContactEmail.rejected, handleRejected)

      .addCase(updateContactPhone.pending, handlePending)
      .addCase(updateContactPhone.fulfilled, (state, action) => {
        state.contacts.selectedContact.dueDate = action.payload.newObj.dueDate;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateContactPhone.rejected, handleRejected)
      //updateSortedAllContactPhone
      .addCase(updateSortedAllContactPhone.pending, handlePending)
      .addCase(updateSortedAllContactPhone.fulfilled, (state, action) => {
        state.contacts.selectedSortedAllContact.dueDate =
          action.payload.newObj.dueDate;
        console.log(action.payload.newObj);
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedAllContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedAllContactPhone.rejected, handleRejected)
      //updateSortedPendingContactPhone
      .addCase(updateSortedPendingContactPhone.pending, handlePending)
      .addCase(updateSortedPendingContactPhone.fulfilled, (state, action) => {
        state.contacts.selectedSortedPendingContact.dueDate =
          action.payload.newObj.dueDate;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedPendingContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPendingContactPhone.rejected, handleRejected)

      .addCase(updateSortedCompletedContactPhone.pending, handlePending)
      .addCase(updateSortedCompletedContactPhone.fulfilled, (state, action) => {
        state.contacts.selectedSortedCompletedContact.dueDate =
          action.payload.newObj.dueDate;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPastDueContact._id ===
          state.contacts.selectedSortedCompletedContact._id
        ) {
          state.contacts.selectedSortedPastDueContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedCompletedContactPhone.rejected, handleRejected)

      .addCase(updateSortedPastDueContactPhone.pending, handlePending)
      .addCase(updateSortedPastDueContactPhone.fulfilled, (state, action) => {
        state.contacts.selectedSortedPastDueContact.dueDate =
          action.payload.newObj.dueDate;
        state.contacts.items = action.payload.newRay;
        state.contacts.isLoading = false;
        if (
          state.contacts.selectedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedAllContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedAllContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedPendingContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedPendingContact = action.payload.newObj;
        }
        if (
          state.contacts.selectedSortedCompletedContact._id ===
          state.contacts.selectedSortedPastDueContact._id
        ) {
          state.contacts.selectedSortedCompletedContact = action.payload.newObj;
        }
        //state.token = action.payload.token;
      })
      .addCase(updateSortedPastDueContactPhone.rejected, handleRejected)

      .addCase(updateStatus.pending, handlePending)
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
        //state.token = action.payload.token;
      })
      .addCase(updateStatus.rejected, handleRejected)

      .addCase(openMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyMobileAndTabModal = action.payload;
      })

      .addCase(closeMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyMobileAndTabModal = action.payload;
      })

      .addCase(openAllMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyAllMobileAndTabModal = action.payload;
      })

      .addCase(closeAllMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyAllMobileAndTabModal = action.payload;
      })

      .addCase(openPendingMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyPendingMobileAndTabModal = action.payload;
      })

      .addCase(closePendingMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyPendingMobileAndTabModal = action.payload;
      })

      .addCase(openCompletedMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyCompletedMobileAndTabModal = action.payload;
      })

      .addCase(closeCompletedMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyCompletedMobileAndTabModal = action.payload;
      })

      .addCase(openPastDueMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyPastDueMobileAndTabModal = action.payload;
      })

      .addCase(closePastDueMobileAndTabModal.fulfilled, (state, action) => {
        state.contacts.openMyPastDueMobileAndTabModal = action.payload;
      })
    
      .addCase(saveCustomerName.fulfilled, (state, action) => {
        state.contacts.customerName = action.payload;
      });
  },
});



export const contactsReducer = contactsSlice.reducer;