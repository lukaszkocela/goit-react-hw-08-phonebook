import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { deleteContact, editContact } from 'redux/contacts/operations';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { deepOrange } from '@mui/material/colors';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { PhoneBookModal } from './PhoneBookModal';
import { PhoneBookForm } from './PhoneBookForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const PhoneBookList = () => {
  const [contactId, setContactId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  const handleOpenDelete = evt => {
    setContactId(evt.currentTarget.id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = evt => {
    setRowsPerPage(parseInt(evt.target.value), 10);
    setPage(0);
  };

  const handleModalOpen = evt => {
    setContactId(evt.currentTarget.id);
    setOpen(true);
  };
  const handleModalClose = () => setOpen(false);

  const handleDeleteContact = () => {
    dispatch(deleteContact(contactId));
    toast.success('Contact deleted', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const contactData = {
      name,
      number,
      contactId,
    };

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

    dispatch(editContact(contactData));

    toast.info('Contact changed', {
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
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, width: '40%' }} key="name">
                Name
            </TableCell>
            <TableCell sx={{ fontWeight: 800 }} key={'number'}>
              Phone number
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 800 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.number}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      id={contact.id}
                      sx={{
                        ':hover': {
                          color: '#22dc0d',
                        },
                      }}
                      onClick={handleModalOpen}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      sx={{
                        color: deepOrange[900],
                        ':hover': {
                          color: '#bf360c',
                        },
                      }}
                      id={contact.id}
                      onClick={handleOpenDelete}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <PhoneBookModal
        open={open}
        handleModalClose={handleModalClose}
        title="Edit contact"
      >
        <PhoneBookForm onSubmit={handleSubmit} />
      </PhoneBookModal>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>No</Button>
          <Button
            onClick={(handleCloseDelete, handleDeleteContact)}
            autoFocus
            variant="contained"
          >
            Yes, I'm sure
          </Button>
        </DialogActions>
      </Dialog>
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
        theme="colored"
      />
    </>
  );
};