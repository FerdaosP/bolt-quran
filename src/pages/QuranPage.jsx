import React, { useState, useEffect } from 'react';
    import { Typography, Box, List, ListItem, ListItemText, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
    import { useUserStore } from '../store/userStore';
    import { supabase } from '../supabaseClient';
    import { QuranData } from '../quranData';
    import { quranText } from '../quranText';

    function QuranPage() {
      const user = useUserStore((state) => state.user);
      const [surah, setSurah] = useState(1);
      const [ayat, setAyat] = useState(1);
      const [translation, setTranslation] = useState('');
      const [arabicText, setArabicText] = useState('');

      useEffect(() => {
        const fetchAyat = async () => {
          const surahData = QuranData.Sura[surah];
          if (surahData && surahData.length > 0) {
            const startAyat = surahData[0];
            const endAyat = startAyat + surahData[1];
            const currentAyatIndex = startAyat + ayat - 1;
            const currentAyat = quranText.find(item => item.index === currentAyatIndex);
            if (currentAyat) {
              setArabicText(currentAyat.text);
              const translationData = await supabase
                .from('nl_siregar')
                .select('text')
                .eq('sura', surah)
                .eq('aya', ayat)
                .single();
              if (translationData.data) {
                setTranslation(translationData.data.text);
              } else {
                setTranslation('Translation not found');
              }
            } else {
              setArabicText('Ayat not found');
              setTranslation('Translation not found');
            }
          }
        };
        fetchAyat();
      }, [surah, ayat, supabase]);

      const handleSurahChange = (event) => {
        setSurah(event.target.value);
        setAyat(1);
      };

      const handleAyatChange = (event) => {
        setAyat(event.target.value);
      };

      const getAyatOptions = () => {
        const surahData = QuranData.Sura[surah];
        if (surahData && surahData.length > 0) {
          const ayatCount = surahData[1];
          return Array.from({ length: ayatCount }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ));
        }
        return [];
      };

      const getSurahOptions = () => {
        return QuranData.Sura.slice(1).map((sura, index) => (
          <MenuItem key={index + 1} value={index + 1}>
            {index + 1} - {sura[4]}
          </MenuItem>
        ));
      };

      return (
        <Box>
          <Typography variant="h4" gutterBottom>
            Quran
          </Typography>
          {user ? (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="surah-select-label">Surah</InputLabel>
                  <Select
                    labelId="surah-select-label"
                    id="surah-select"
                    value={surah}
                    label="Surah"
                    onChange={handleSurahChange}
                  >
                    {getSurahOptions()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="ayat-select-label">Ayat</InputLabel>
                  <Select
                    labelId="ayat-select-label"
                    id="ayat-select"
                    value={ayat}
                    label="Ayat"
                    onChange={handleAyatChange}
                  >
                    {getAyatOptions()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Arabic Text
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'right', fontFamily: 'Arial', fontSize: '24px', lineHeight: '2.0' }}>
                  {arabicText}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Translation
                </Typography>
                <Typography variant="body1">
                  {translation}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1">
              Please log in to view the Quran.
            </Typography>
          )}
        </Box>
      );
    }

    export default QuranPage;
