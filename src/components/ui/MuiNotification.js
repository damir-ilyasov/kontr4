import React from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  Slide,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const MuiNotification = ({
  open,
  onClose,
  message,
  title,
  severity = 'info', // 'success', 'error', 'warning', 'info'
  duration = 6000,
  autoHide = true,
  action,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHide ? duration : null}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiAlert-root': {
          alignItems: 'center',
        },
      }}
    >
      <Alert
        severity={severity}
        onClose={handleClose}
        variant="filled"
        elevation={6}
        sx={{
          width: '100%',
          minWidth: 300,
          maxWidth: 450,
          borderRadius: 2,
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          },
        }}
        action={
          action || (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

// Хук для удобного использования уведомлений
export const useNotification = () => {
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    title: '',
    severity: 'info',
  });

  const showNotification = (options) => {
    setNotification({
      open: true,
      ...options,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const NotificationComponent = () => (
    <MuiNotification
      open={notification.open}
      onClose={hideNotification}
      message={notification.message}
      title={notification.title}
      severity={notification.severity}
      duration={notification.duration}
      action={notification.action}
    />
  );

  return {
    showNotification,
    hideNotification,
    NotificationComponent,
  };
};

// Типовые уведомления
export const notificationTypes = {
  success: (message, title = 'Успех!') => ({
    severity: 'success',
    message,
    title,
  }),
  error: (message, title = 'Ошибка') => ({
    severity: 'error',
    message,
    title,
  }),
  warning: (message, title = 'Внимание') => ({
    severity: 'warning',
    message,
    title,
  }),
  info: (message, title = 'Информация') => ({
    severity: 'info',
    message,
    title,
  }),
};

export default MuiNotification;