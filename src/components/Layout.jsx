import React from 'react';
    import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
    import { Link, useNavigate } from 'react-router-dom';
    import { supabase } from '../supabaseClient';
    import { useUserStore } from '../store/userStore';

    function Layout({ children }) {
      const navigate = useNavigate();
      const user = useUserStore((state) => state.user);
      const setUser = useUserStore((state) => state.setUser);

      const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
          setUser(null);
          navigate('/login');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Quran App
              </Typography>
              {user ? (
                <>
                  <Button color="inherit" component={Link} to="/home">Home</Button>
                  <Button color="inherit" component={Link} to="/quran">Quran</Button>
                  <Button color="inherit" component={Link} to="/pomodoro">Pomodoro</Button>
                  <Button color="inherit" component={Link} to="/profile">Profile</Button>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      );
    }

    export default Layout;
