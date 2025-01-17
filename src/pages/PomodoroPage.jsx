import React, { useState, useEffect } from 'react';
    import { Typography, Box, Button, Slider, Grid } from '@mui/material';

    function PomodoroPage() {
      const [workTime, setWorkTime] = useState(25);
      const [breakTime, setBreakTime] = useState(5);
      const [timeRemaining, setTimeRemaining] = useState(workTime * 60);
      const [isWorking, setIsWorking] = useState(true);
      const [isRunning, setIsRunning] = useState(false);

      useEffect(() => {
        let intervalId;
        if (isRunning) {
          intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
          }, 1000);
        }

        if (timeRemaining < 0) {
          clearInterval(intervalId);
          setIsRunning(false);
          setTimeRemaining(isWorking ? breakTime * 60 : workTime * 60);
          setIsWorking(!isWorking);
        }

        return () => clearInterval(intervalId);
      }, [isRunning, timeRemaining, isWorking, workTime, breakTime]);

      const handleStartStop = () => {
        setIsRunning(!isRunning);
      };

      const handleReset = () => {
        setIsRunning(false);
        setTimeRemaining(isWorking ? workTime * 60 : breakTime * 60);
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      return (
        <Box>
          <Typography variant="h4" gutterBottom>
            Pomodoro Timer
          </Typography>
          <Typography variant="h6" gutterBottom>
            {isWorking ? 'Work Time' : 'Break Time'}
          </Typography>
          <Typography variant="h2" align="center" gutterBottom>
            {formatTime(timeRemaining)}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={2}>
            <Button variant="contained" color="primary" onClick={handleStartStop}>
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" align="center">Work Time (minutes)</Typography>
              <Slider
                value={workTime}
                onChange={(e, value) => setWorkTime(value)}
                min={1}
                max={60}
                step={1}
                aria-label="Work Time"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" align="center">Break Time (minutes)</Typography>
              <Slider
                value={breakTime}
                onChange={(e, value) => setBreakTime(value)}
                min={1}
                max={30}
                step={1}
                aria-label="Break Time"
              />
            </Grid>
          </Grid>
        </Box>
      );
    }

    export default PomodoroPage;
