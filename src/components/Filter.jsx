import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from 'redux/contacts/filtersSlice';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { addNewContact } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';
import { PhoneBookForm } from './PhoneBookForm';
import { PhoneBookModal } from './PhoneBookModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = [
  'flex',
  'items-center',
  'justify-evenly',
  'border-b-4',
  'border-gray-50',
  'p-2',
  'mb-5',
].join(' ');

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleInputChange = evt => dispatch(filterContact(evt.target.value));

  const stateContacts = useSelector(selectContacts);
  const stateContactsNames = stateContacts.map(contact => contact.name);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const contact = {
      name,
      number,
    };

    if (stateContactsNames.includes(name)) {
      return toast.error(`${name} is alredy in contacts`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      const regularExpressionName =
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
      if (!regularExpressionName.test(name)) {
        return toast.error('Please enter right name', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }

      const regularExpressionPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
      if (!regularExpressionPhone.test(number)) {
        return toast.error('Please enter the correct number xxx-xxx-xxx', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }

    dispatch(addNewContact(contact));
    setOpen(false);

    toast.success('Contact added succesfully', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    form.reset();
  };

  return (
    <div className={styles}>
      <TextField
        size="small"
        label="Find contact by name"
        onChange={handleInputChange}
      />
      <Button onClick={handleModalOpen} variant="contained">
        Add new contact
      </Button>
      <PhoneBookModal
        open={open}
        handleModalClose={handleModalClose}
        title="Add contact"
      >
        <PhoneBookForm onSubmit={handleSubmit} />
      </PhoneBookModal>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};