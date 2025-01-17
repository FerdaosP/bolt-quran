import React, { useState, useEffect } from 'react';
    import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
    import { AuthContext } from './context/AuthContext';
    import { useUserStore } from './store/userStore';
    import HomePage from './pages/HomePage';
    import LoginPage from './pages/LoginPage';
    import SignupPage from './pages/SignupPage';
    import QuranPage from './pages/QuranPage';
    import PomodoroPage from './pages/PomodoroPage';
    import ProfilePage from './pages/ProfilePage';
    import Layout from './components/Layout';
    import Loading from './components/Loading';
    import { supabase } from './supabaseClient';

    function App() {
      const [currentUser, setCurrentUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      const setUser = useUserStore((state) => state.setUser);
      const location = useLocation();

      console.log("App component rendered");

      useEffect(() => {
        console.log("App useEffect triggered");
        supabase.auth.getSession()
          .then(({ data: { session }, error }) => {
            if (error) {
              console.error('Error getting session:', error);
              setLoading(false);
              navigate('/login');
              return;
            }
            console.log("Initial session:", session);

            supabase.auth.onAuthStateChange(async (event, session) => {
              console.log("Auth state change:", event, session);
              if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                if (session?.user) {
                  setCurrentUser(session.user);
                  setUser(session.user);

                  const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                  if (error) {
                    console.error('Error fetching user data from Supabase:', error);
                  } else if (!data) {
                    const { error: insertError } = await supabase
                      .from('users')
                      .insert([{ id: session.user.id, email: session.user.email }]);
                    if (insertError) {
                      console.error('Error inserting user data into Supabase:', insertError);
                    }
                  }
                  if (location.pathname !== '/home') {
                    navigate('/home');
                  }
                }
              } else if (event === 'SIGNED_OUT') {
                setCurrentUser(null);
                setUser(null);
                if (location.pathname !== '/login') {
                  navigate('/login');
                }
              }
              setLoading(false);
            });
            if (session?.user) {
              setCurrentUser(session.user);
              setUser(session.user);
              if (location.pathname !== '/home') {
                navigate('/home');
              }
            } else {
              if (location.pathname !== '/login') {
                navigate('/login');
              }
            }
            setLoading(false);
          });
      }, [navigate, setUser]);

      if (loading) {
        return <Loading />;
      }

      return (
        <AuthContext.Provider value={{ currentUser }}>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/pomodoro" element={<PomodoroPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </AuthContext.Provider>
      );
    }

    export default App;
