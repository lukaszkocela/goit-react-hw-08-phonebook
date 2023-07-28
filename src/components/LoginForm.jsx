import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/operations';

const styles = {
  container: ['flex', 'justify-center', 'mt-12'].join(' '),
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

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const loginElements = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    dispatch(login(loginElements));
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <TextField
            id="login-email-input"
            label="Email"
            type="Email"
            size="small"
            name="email"
          />
        </label>
        <label className={styles.label}>
          <TextField
            id="login-password-input"
            label="Password"
            type="password"
            size="small"
            name="password"
          />
        </label>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </form>
    </div>
  );
};