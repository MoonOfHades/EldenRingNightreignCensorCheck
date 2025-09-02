import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import LanguageBlockedWordListResolver from '../util/BlockedWordListResolver';
import Game from '../model/Game';
import GameLanguage from '../model/GameLanguage';
import NameInputForm from './NameInputForm';
import React, { useEffect, useState } from 'react';
import AhoCorasickBlockedWordChecker from '../util/BlockedWordChecker';
import { fetchPublicFile } from '../util/AssetUtils';
import BlockedListAccordion from './BlockedListAccordion';

interface NameCheckerPageProps {
  game: Game;
  language: GameLanguage;
  onClick?: () => void;
}

function NameCheckerPage(props: NameCheckerPageProps) {
  const [blockedListLoading, setBlockedListLoading] = useState<boolean>(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [nameInputDisabled, setNameInputDisabled] = useState<boolean>(false);
  const [blockedWordsList, setBlockedWordsList] = useState<string[]>([]);
  const [blockedWordChecker, setBlockedWordChecker] =
    useState<AhoCorasickBlockedWordChecker>(
      new AhoCorasickBlockedWordChecker([]),
    );

  // Load word list when blocked words file changes
  useEffect(() => {
    setFetchErrorMessage(undefined);
    setNameInputDisabled(true);
    setBlockedListLoading(true);
    fetchPublicFile(
      new LanguageBlockedWordListResolver(
        props.game,
        props.language,
      ).getBlockedWordsFilename(),
    )
      .then((data) => {
        return data.text();
      })
      .then((res) => {
        let lines: string[] = res
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean);
        setBlockedWordsList(lines);
        setBlockedWordChecker(new AhoCorasickBlockedWordChecker(lines));
        setNameInputDisabled(false);
      })
      .catch(() => {
        setFetchErrorMessage(
          `Either something went wrong, or the selected game language is not yet supported. Please try another language option.`,
        );
        setNameInputDisabled(true);
        setBlockedWordsList([]);
      });
    setBlockedListLoading(false);
  }, [props.game, props.language]);

  return (
    <Box>
      <Stack spacing={2}>
        {blockedListLoading && <CircularProgress />}
        {fetchErrorMessage && (
          <Alert severity={'error'}>
            <Typography
              sx={{
                typography: { xs: 'body1', md: 'h6' },
              }}
            >
              <strong>{`${fetchErrorMessage}`}</strong>
            </Typography>
          </Alert>
        )}
        <NameInputForm
          blockedWordFinder={blockedWordChecker}
          game={props.game}
          inputDisabled={nameInputDisabled}
        />

        <Divider />

        <BlockedListAccordion
          game={props.game}
          language={props.language}
          blockedWordsList={blockedWordsList}
          disabled={nameInputDisabled}
          onClick={props.onClick}
        />
      </Stack>
    </Box>
  );
}

export default NameCheckerPage;
