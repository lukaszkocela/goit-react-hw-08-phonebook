import { Button, TextField } from '@mui/material';

const styles = {
  container: ['flex', 'justify-center'].join(' '),
  form: ['flex', 'flex-col', 'items-start', 'max-w-sm'].join(' '),
  label: ['flex', 'flex-col', 'mb-5', 'w-50'].join(' '),
};

export const PhoneBookForm = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <TextField
            type="text"
            size="small"
            name="name"
            label="Name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Lucas, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={styles.label}>
          <TextField
            type="tel"
            size="small"
            name="number"
            label="Number"
            title="Please enter the correct number xxx-xxx-xxx"
            required
          />
        </label>

        <Button type="submit" variant="contained" style={{ margin: '0 auto' }}>
          Save
        </Button>
      </form>
    </div>
  );
};