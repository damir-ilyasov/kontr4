import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  createTheme,
} from '@mui/material';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import MuiDashboard from './components/ui/MuiDashboard';
import MuiTechnologyCard from './components/ui/MuiTechnologyCard';
import MuiTechnologyModal from './components/ui/MuiTechnologyModal';
import ThemeToggle from './components/ui/ThemeToggle';
import { useNotification } from './components/ui/MuiNotification';
import AppLayout from './components/ui/Layout/AppLayout';

function AppContent() {
  const { NotificationComponent, showNotification } = useNotification();
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Hooks',
      description: 'Изучение хуков: useState, useEffect, useContext, useReducer, useMemo, useCallback.',
      category: 'frontend',
      status: 'in-progress',
      progress: 75,
      resources: ['https://react.dev/reference/react'],
      deadline: '2024-03-15',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: 'Material-UI',
      description: 'Освоение Material Design компонентов для React приложений.',
      category: 'ui-library',
      status: 'completed',
      progress: 100,
      resources: ['https://mui.com/', 'https://mui.com/material-ui/getting-started/'],
      createdAt: '2024-01-10',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  const handleSaveTechnology = (techData) => {
    try {
      if (editingTech) {
        // Редактирование
        setTechnologies(prev =>
          prev.map(tech =>
            tech.id === editingTech.id
              ? { ...tech, ...techData, updatedAt: new Date().toISOString() }
              : tech
          )
        );
        showNotification({
          severity: 'success',
          title: 'Успешно!',
          message: `Технология "${techData.title}" обновлена`,
        });
      } else {
        // Добавление новой
        const newTech = {
          id: Date.now(),
          ...techData,
          status: 'not-started',
          progress: 0,
          createdAt: new Date().toISOString(),
        };
        setTechnologies(prev => [...prev, newTech]);
        showNotification({
          severity: 'success',
          title: 'Успешно!',
          message: `Технология "${techData.title}" добавлена`,
        });
      }
      setIsModalOpen(false);
      setEditingTech(null);
    } catch (error) {
      showNotification({
        severity: 'error',
        title: 'Ошибка!',
        message: 'Не удалось сохранить технологию',
      });
    }
  };

  const handleEdit = (technology) => {
    setEditingTech(technology);
    setIsModalOpen(true);
  };

  const handleDelete = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    setTechnologies(prev => prev.filter(t => t.id !== techId));
    showNotification({
      severity: 'info',
      title: 'Удалено',
      message: `Технология "${tech?.title}" удалена`,
    });
  };

  const handleStatusChange = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppLayout
        title="🚀 Трекер технологий"
        onAddClick={() => {
          setEditingTech(null);
          setIsModalOpen(true);
        }}
        sidebarContent={
          <Box sx={{ p: 2 }}>
            <ThemeToggle variant="switch" />
          </Box>
        }
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* Дашборд */}
          <MuiDashboard technologies={technologies} />

          {/* Сетка технологий */}
          <Box sx={{ mt: 4 }}>
            <MuiTechnologyModal
              open={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingTech(null);
              }}
              technology={editingTech}
              onSave={handleSaveTechnology}
            />

            {technologies.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Box sx={{ fontSize: 64, mb: 2 }}>📚</Box>
                <Typography variant="h5" gutterBottom>
                  Технологий пока нет
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                  Начните свой путь к освоению новых технологий
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setIsModalOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Добавить первую технологию
                </Button>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography variant="h5">
                    Мои технологии ({technologies.length})
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {technologies.map(technology => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={technology.id}>
                      <MuiTechnologyCard
                        technology={technology}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Container>
      </AppLayout>

      {/* Компонент уведомлений */}
      <NotificationComponent />
    </Box>
  );
}

function App() {
  const { darkMode } = useTheme();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default function AppWrapper() {
  return (
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  );
}