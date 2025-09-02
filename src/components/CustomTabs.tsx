import styled from '@emotion/styled';
import { Tab, Tabs, Typography } from '@mui/material';
import Color from '../constants/Colors';
import { getPublicImagePath } from '../util/AssetUtils';

const TAB_INDICATOR_IMAGE_URL = getPublicImagePath('grace-border-centered.png');

const INDICATOR_HEIGHT = 1.429;

// Change tab text size based on screen size
const commonTabSx = {
  typography: { xs: 'h6', lg: 'h5' },
};

// Elden ring tab with gold text style
export const EldenRingTabLabel = ({ selected }: { selected: boolean }) => (
  <Typography
    component='span'
    variant='h5'
    display='inline'
    className={selected ? 'gold-text' : ''}
    sx={commonTabSx}
  >
    ELDEN RING
  </Typography>
);

// Nightreign tab with both metallic styles
export const NightreignTabLabel = ({ selected }: { selected: boolean }) => (
  <Typography component='span' display='inline'>
    <Typography
      component='span'
      variant='h5'
      display='inline'
      className={selected ? 'gold-text' : ''}
      sx={commonTabSx}
    >
      ELDEN RING{' '}
    </Typography>
    <Typography
      component='span'
      variant='h5'
      display='inline'
      className={selected ? 'silver-text' : ''}
      sx={commonTabSx}
    >
      NIGHTREIGN
    </Typography>
  </Typography>
);

export const StyledTabs = styled(Tabs)({
  overflow: 'visible',
  // hide the default indicator
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

// Customized tab component with fancy glowy grace indicator
export const StyledGameTab = styled(Tab)({
  position: 'relative', // required for the ::after positioning
  textTransform: 'none',

  '&.Mui-selected': {
    color: 'inherit',
    backgroundColor: 'transparent',
    // Shadow to make label text stand out a bit more against the glow
    filter: 'drop-shadow(0 0.286rem 0.571rem rgba(0,0,0,0.8))',
  },

  // Adding a glowing light behind the selected tab
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: `${INDICATOR_HEIGHT - 0.857}rem`,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '85%',
    height: '1.714rem',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient
    background: `radial-gradient(ellipse at center, ${Color.GRACE_YELLOW} 0%, black 70%)`,
    filter: 'blur(1.429rem)',
    opacity: 0,
    transition: 'opacity 1s ease',
    pointerEvents: 'none',
    zIndex: 0,
  },

  '&.Mui-selected::before': {
    opacity: 1,
  },

  // Grace indicator for selected tab
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: `1.5rem`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    backgroundSize: '100% 100%',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.7s ease',
  },

  '&.Mui-selected::after': {
    opacity: 1,
    backgroundImage: `url('${TAB_INDICATOR_IMAGE_URL}')`,
  },

  // Force label to be above the ::after
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
});
