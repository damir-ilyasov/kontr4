import React from 'react';
import {
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Brightness6 as AutoModeIcon,
} from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ variant = 'icon' }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  if (variant === 'switch') {
    return (
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
            inputProps={{ 'aria-label': 'переключить тему' }}
          />
        }
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            <span>{darkMode ? 'Темная' : 'Светлая'}</span>
          </Box>
        }
      />
    );
  }

  if (variant === 'auto') {
    const [autoMode, setAutoMode] = React.useState(false);

    const handleAutoMode = () => {
      setAutoMode(!autoMode);
      // Здесь можно добавить логику для автоматического режима
    };

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Автоматический режим">
          <IconButton
            onClick={handleAutoMode}
            color={autoMode ? 'primary' : 'default'}
            size="small"
          >
            <AutoModeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            size="small"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  // Вариант по умолчанию - иконка
  return (
    <Tooltip title={darkMode ? 'Светлая тема' : 'Темная тема'}>
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        aria-label="переключить тему"
        size="large"
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;