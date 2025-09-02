import { Divider, Link, Stack, Typography } from '@mui/material';
import { GH_REPOSITORY_LINK } from '../constants/AppConstants';

export default function AppFooter() {
  return (
    <>
      <Stack spacing={1}>
        <Divider variant='fullWidth' />
        <Typography
          alignSelf='center'
          variant='body1'
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Fan project. Not affiliated with or endorsed by FromSoftware, Inc.
        </Typography>
        <Link
          href={GH_REPOSITORY_LINK}
          variant='body1'
          sx={{ color: 'inherit' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          View Source Code on Github
        </Link>
      </Stack>
    </>
  );
}
