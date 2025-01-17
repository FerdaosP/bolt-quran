import React, { useState, useEffect } from 'react';
    import { Typography, Box } from '@mui/material';
    import { useUserStore } from '../store/userStore';
    import { supabase } from '../supabaseClient';

    function ProfilePage() {
      const user = useUserStore((state) => state.user);
      const [profile, setProfile] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchProfile = async () => {
          if (user) {
            const { data, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();

            if (error) {
              console.error('Error fetching profile:', error);
            } else {
              setProfile(data);
            }
          }
          setLoading(false);
        };

        fetchProfile();
      }, [user]);

      if (loading) {
        return <Typography>Loading profile...</Typography>;
      }

      return (
        <Box>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {user ? (
            <Box>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              {profile && (
                <Typography variant="body1">
                  <strong>Last Login:</strong> {profile.last_login || 'N/A'}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body1">
              Please log in to view your profile.
            </Typography>
          )}
        </Box>
      );
    }

    export default ProfilePage;
