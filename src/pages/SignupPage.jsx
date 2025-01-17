
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { supabase } from '../supabaseClient';
    import { TextField, Button, Box, Typography, Alert } from '@mui/material';
    import { Link } from 'react-router-dom';

    function SignupPage() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) {
            setError(error.message);
          } else {
            navigate('/home');
          }
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            <Typography variant="body2" align="center">
              Already have an account