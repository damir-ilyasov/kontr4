import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  LinearProgress,
  Tooltip,
  Avatar,
  Collapse,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon,
  AccessTime as AccessTimeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useNotification, notificationTypes } from './MuiNotification';

const MuiTechnologyCard = ({
  technology,
  onEdit,
  onDelete,
  onStatusChange,
  showDetails = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { showNotification } = useNotification();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    showNotification(
      notificationTypes.warning(
        `Удалить "${technology.title}"?`,
        'Подтверждение удаления'
      )
    );
    // Здесь можно добавить подтверждение через диалог
    if (window.confirm(`Удалить "${technology.title}"?`)) {
      onDelete(technology.id);
      showNotification(
        notificationTypes.success(
          `Технология "${technology.title}" удалена`,
          'Успешно'
        )
      );
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(technology.id, newStatus);
    showNotification(
      notificationTypes.success(
        `Статус "${technology.title}" изменен на "${getStatusText(newStatus)}"`,
        'Статус обновлен'
      )
    );
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'success',
          icon: <CheckCircleIcon />,
          text: 'Завершено',
          progress: 100,
        };
      case 'in-progress':
        return {
          color: 'warning',
          icon: <PlayCircleIcon />,
          text: 'В процессе',
          progress: 50,
        };
      case 'on-hold':
        return {
          color: 'secondary',
          icon: <PauseCircleIcon />,
          text: 'Отложено',
          progress: 25,
        };
      default:
        return {
          color: 'default',
          icon: <AccessTimeIcon />,
          text: 'Не начато',
          progress: 0,
        };
    }
  };

  const { color, icon, text, progress } = getStatusConfig(technology.status);

  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#1976d2',
      backend: '#9c27b0',
      database: '#2e7d32',
      devops: '#ed6c02',
      mobile: '#0288d1',
      tools: '#7b1fa2',
    };
    return colors[category] || '#757575';
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: getCategoryColor(technology.category),
              width: 40,
              height: 40,
            }}
          >
            {technology.title.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="меню"
            onClick={handleMenuOpen}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" component="div" noWrap>
            {technology.title}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip
              label={technology.category}
              size="small"
              variant="outlined"
              sx={{
                borderColor: getCategoryColor(technology.category),
                color: getCategoryColor(technology.category),
              }}
            />
            <Chip
              icon={icon}
              label={text}
              color={color}
              size="small"
              variant="filled"
            />
          </Box>
        }
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit(technology);
          }}
        >
          <EditIcon sx={{ mr: 1 }} />
          Редактировать
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} />
          Удалить
        </MenuItem>
      </Menu>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {technology.description}
        </Typography>

        {showDetails && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Прогресс изучения
              </Typography>
              <LinearProgress
                variant="determinate"
                value={technology.progress || progress}
                color={color}
                sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption">
                  {technology.progress || progress}%
                </Typography>
                {technology.deadline && (
                  <Typography variant="caption" color="text.secondary">
                    До: {new Date(technology.deadline).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
            </Box>

            <Collapse in={expanded}>
              {technology.resources && technology.resources.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Ресурсы:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    {technology.resources.slice(0, 3).map((resource, index) => (
                      <Chip
                        key={index}
                        label={`Ресурс ${index + 1}`}
                        size="small"
                        variant="outlined"
                        onClick={() => window.open(resource, '_blank')}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Collapse>
          </>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          {showDetails && (
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {expanded ? 'Скрыть' : 'Подробнее'}
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {technology.status !== 'completed' && (
            <Tooltip title="Отметить как завершенное">
              <IconButton
                size="small"
                color="success"
                onClick={() => handleStatusChange('completed')}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          )}

          {technology.status !== 'in-progress' && technology.status !== 'completed' && (
            <Tooltip title="Начать изучение">
              <IconButton
                size="small"
                color="warning"
                onClick={() => handleStatusChange('in-progress')}
              >
                <PlayCircleIcon />
              </IconButton>
            </Tooltip>
          )}

          {technology.status === 'in-progress' && (
            <Tooltip title="Приостановить">
              <IconButton
                size="small"
                color="secondary"
                onClick={() => handleStatusChange('on-hold')}
              >
                <PauseCircleIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default MuiTechnologyCard;