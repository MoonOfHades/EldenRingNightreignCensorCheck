import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Game from '../model/Game';
import GameLanguage from '../model/GameLanguage';
import { getPublicImagePath } from '../util/AssetUtils';

interface BlockedListAccordionProps {
  game: Game;
  language: GameLanguage;
  blockedWordsList: string[];
  disabled: boolean;
  onClick?: () => void;
}

/**
 * Enables viewing the full blocked word list for the selected word/language
 */
export default function BlockedListAccordion(props: BlockedListAccordionProps) {
  const { game, language, blockedWordsList, disabled, onClick } = props;
  // Used for only rendering accordion content when needed in order to fix lag on close
  const [expanded, setExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when language changes
  useEffect(() => {
    if (scrollContainerRef.current && expanded) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [language, expanded]);

  return (
    <Accordion
      expanded={expanded}
      disabled={disabled}
      onChange={() => {
        onClick?.();
        setExpanded(disabled ? false : !expanded);
      }}
      slotProps={{ transition: { unmountOnExit: true } }}
    >
      <AccordionSummary
        expandIcon={
          <img
            src={getPublicImagePath('golden-order-icon.png')}
            alt='expand'
            style={{
              width: '40px',
              height: '40px',
              margin: '-8px',
            }}
          />
        }
        aria-controls='blocked-list-content'
        id='blocked-list-header'
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <img
            src={getPublicImagePath('golden-order-icon.png')}
            alt='list'
            style={{
              width: '40px',
              height: '40px',
              margin: '-8px 12px -8px -8px',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
          <Typography
            component='span'
            variant='body1'
            sx={{
              flex: 1,
              textAlign: 'center',
            }}
          >
            View blocked word list
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {expanded && (
          <Box
            ref={scrollContainerRef}
            sx={{
              // Extend to the bottom-ish of the viewport on mobile
              // On desktop, use arbitrarily chosen height
              maxHeight: { xs: 'calc(100svh - 240px)', md: 400 },
              overflowY: 'auto',
              pr: 1,
            }}
          >
            <Paper
              variant='outlined'
              square
              sx={{ p: 1.5, bgcolor: 'background.paper', m: 1 }}
            >
              <Typography
                sx={{ textDecoration: 'underline' }}
                className='dark-mode-white'
              >
                <strong>
                  Blocked words for {game} ({language.label}):
                </strong>
              </Typography>
              <Box
                component='pre'
                sx={{
                  m: 0,
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
                className='dark-mode-white'
              >
                {blockedWordsList.join('\n')}
              </Box>
            </Paper>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
