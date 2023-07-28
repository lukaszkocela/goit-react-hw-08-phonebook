import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const styles = {
  box: [
    'absolute',
    'top-1/2',
    'left-1/2',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'bg-gray-100',
    'p-10',
    'rounded-2xl',
    'shadow-2xl'
  ].join(' '),
  text: ['text-center', 'pb-7', 'uppercase', 'font-bold'].join(' '),
};

export const PhoneBookModal = ({ open, handleModalClose, children, title }) => {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.box}>
        <h3 className={styles.text}>{title}</h3>
        {children}
      </Box>
    </Modal>
  );
};