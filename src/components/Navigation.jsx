import { Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Button
        to="/"
        component={NavLink}
        sx={{
          '&.active': {
            color: '#1708dd',
            fontWeight: 900,
          },
          paddingRight: '30px',
        }}
        startIcon={<Home />}
      >
        Home
      </Button>
      {isLoggedIn && (
        <Button
          to="/contacts"
          component={NavLink}
          sx={{
            '&.active': {
              color: '#a5e4b8',
              fontWeight: 900,
            },
          }}
        >
          Contacts
        </Button>
      )}
    </div>
  );
};