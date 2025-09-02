import React, { useState } from 'react';
import './App.css';
import NameCheckerPage from './components/NameCheckerPage';
import GameLanguage from './model/GameLanguage';
import Game from './model/Game';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './constants/Themes';
import AppFooter from './components/AppFooter';
import {
  EldenRingTabLabel,
  NightreignTabLabel,
  StyledGameTab,
  StyledTabs,
} from './components/CustomTabs';

function App() {
  const [selectedTabValue, setSelectedTabValue] = useState(
    Game.ELDEN_RING_NIGHTREIGN,
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    GameLanguage.English,
  );

  const handleTabChange = (event: React.SyntheticEvent, value: Game) => {
    setSelectedTabValue(value);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(GameLanguage.fromLabel(event.target.value));
  };

  const languages = GameLanguage.values();

  const generateLanguageOptions = function generate() {
    return languages.map((language) => (
      <MenuItem value={language.label}>{language.label}</MenuItem>
    ));
  };

  const titleTextBaseSx = {
    typography: { xs: 'h6', md: 'h4' },
  };
  const subtitleTextBaseSx = {
    typography: { xs: 'h6', md: 'h4' },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth={'lg'} disableGutters sx={{ overflow: 'hidden' }}>
        <Box className='App'>
          <AppBar position='static'>
            <Toolbar
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'auto 1fr auto',
                  md: '1fr auto 1fr',
                },
                alignItems: 'center',
                minHeight: { xs: 56, md: 64 },
                px: 2,
              }}
            >
              <Box />

              <Box
                sx={{
                  justifySelf: { xs: 'start', md: 'center' },
                  textAlign: { xs: 'left', md: 'center' },
                  px: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  width: { xs: '100%', md: 'auto' },
                }}
              >
                <Typography
                  variant='h4'
                  component='span'
                  className={'gold-text'}
                  sx={{ ...titleTextBaseSx, fontWeight: 'bold' }}
                >
                  <strong>ELDEN RING</strong>
                </Typography>
                {selectedTabValue === Game.ELDEN_RING_NIGHTREIGN && (
                  <Typography
                    variant='h4'
                    component='span'
                    className={'silver-text'}
                    sx={{ ...titleTextBaseSx, fontWeight: 'bold' }}
                  >
                    <strong> NIGHTREIGN </strong>
                  </Typography>
                )}
                <Typography
                  variant='h4'
                  className='dark-mode-white'
                  sx={{ ...subtitleTextBaseSx, fontWeight: 'bold' }}
                >
                  <strong>Name Censor Checker</strong>
                </Typography>
              </Box>
              <Box sx={{ justifySelf: 'end' }}>
                <FormControl
                  sx={{
                    ml: 1,
                    minWidth: { xs: 96, md: 120 },
                    alignItems: 'flex-start',
                    '& .MuiFormControl-root': {
                      alignItems: 'flex-start',
                    },
                  }}
                  size='small'
                >
                  <Typography
                    variant='caption'
                    component='div'
                    className='dark-mode-white'
                    sx={{
                      mb: 0.5,
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <strong>Game Language:</strong>
                  </Typography>
                  <Select
                    labelId='language-select-label'
                    id='language-select'
                    value={selectedLanguage.label}
                    onChange={(e) => handleLanguageChange(e)}
                    autoWidth
                    size='small'
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        height: { xs: 32, md: 40 },
                      },
                      '& .MuiSelect-select': {
                        py: { xs: 0.25, md: 0.75 },
                        pl: { xs: 1, md: 1.5 },
                        pr: { xs: 3, md: 3 },
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        lineHeight: { xs: 1.4, md: 1.5 },
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { fontSize: { xs: '0.95rem', md: '1rem' } },
                      },
                    }}
                  >
                    {generateLanguageOptions()}
                  </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ pb: { xs: 6, md: 10 } }}>
            <StyledTabs
              value={selectedTabValue}
              onChange={handleTabChange}
              variant='fullWidth'
            >
              <StyledGameTab
                label={
                  <NightreignTabLabel
                    selected={selectedTabValue == Game.ELDEN_RING_NIGHTREIGN}
                  />
                }
                value={Game.ELDEN_RING_NIGHTREIGN}
              />
              <StyledGameTab
                label={
                  <EldenRingTabLabel
                    selected={selectedTabValue == Game.ELDEN_RING}
                  />
                }
                value={Game.ELDEN_RING}
                id='eldenRingTab'
              />
            </StyledTabs>

            <TabContext value={selectedTabValue}>
              <TabPanel value={Game.ELDEN_RING_NIGHTREIGN}>
                <NameCheckerPage
                  game={Game.ELDEN_RING_NIGHTREIGN}
                  language={selectedLanguage}
                />
              </TabPanel>
              <TabPanel value={Game.ELDEN_RING}>
                <NameCheckerPage
                  game={Game.ELDEN_RING}
                  language={selectedLanguage}
                />
              </TabPanel>
            </TabContext>
            <AppFooter />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
