import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  container: ['flex', 'justify-center', 'pt-12'].join(' '),
  form: [
    'flex',
    'flex-col',
    'border-3',
    'p-12',
    'rounded-2xl',
    'shadow-2xl',
  ].join(' '),
  label: 'mb-10',
};

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const registerElements = {
      name: form.elements.username.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    if (registerElements.name.length < 2) {
      return toast.error('Username must consist of 2 characters', {
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

    dispatch(register(registerElements));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <TextField
            id="register-username-input"
            label="Username"
            type="text"
            size="small"
            name="username"
          />
        </label>
        <label className={styles.label}>
          <TextField
            id="register-email-input"
            label="Email"
            type="Email"
            size="small"
            name="email"
          />
        </label>
        <label className={styles.label}>
          <TextField
            id="register-password-input"
            label="Password"
            type="password"
            size="small"
            name="password"
          />
        </label>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
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
    </div>
  );
};
