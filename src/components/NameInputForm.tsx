import { useEffect, useState, useCallback } from 'react';
import BlockedWordChecker from '../util/BlockedWordChecker';
import { maxNameLengthForGame } from '../model/Game';
import { Box, Stack, TextFieldProps, Typography } from '@mui/material';
import Game from '../model/Game';
import { getPublicImagePath } from '../util/AssetUtils';
import {
  generateBlockedNamePreview,
  NON_LETTER_NUMBER_REGEX_GLOBAL,
} from '../util/CensorUtils';

interface NameCheckerFormProps {
  blockedWordFinder: BlockedWordChecker;
  game: Game;
  inputDisabled: boolean;
}

import { SxProps } from '@mui/material/styles';
import { EldenRingTextField } from './EldenRingTextField';

export type ThemedTextFieldProps = TextFieldProps & {
  variantStyle?: Game;
  sx?: SxProps; // still allow sx passthrough
};

function NameInputForm(props: NameCheckerFormProps) {
  const [inputNameValue, setInputNameValue] = useState('');
  const [blockedWordsForName, setBlockedWordsForName] = useState<
    Array<string> | undefined
  >(undefined);

  const checkNameCensor = useCallback(
    (name: string) => {
      if (!name) {
        return;
      }
      // Check the word both with spaces/punctuation and without (some blocked word lists have phrases with spaces in them)
      const blockedWordsUnmodified = Array.from(
        props.blockedWordFinder.findBlockedWords(name.toLowerCase()),
      );

      const blockedWordsNoSpace = Array.from(
        props.blockedWordFinder.findBlockedWords(
          name.toLowerCase().replace(NON_LETTER_NUMBER_REGEX_GLOBAL, ''),
        ),
      );

      // Combine both sets of blocked words, removing duplicates
      const allBlockedWords = [
        ...new Set([...blockedWordsUnmodified, ...blockedWordsNoSpace]),
      ];

      if (allBlockedWords.length == 0) {
        setBlockedWordsForName(undefined);
      } else {
        setBlockedWordsForName(allBlockedWords);
      }
    },
    [props.blockedWordFinder],
  );

  // Re-check current input when blockedWordFinder changes (language selection change)
  useEffect(() => {
    if (inputNameValue) {
      checkNameCensor(inputNameValue);
    }
  }, [checkNameCensor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setInputNameValue(newValue.substring(0, maxNameLengthForGame(props.game)));

    checkNameCensor(newValue);
  };

  let nameIsBlocked = !!blockedWordsForName;
  let bannerImage = !inputNameValue
    ? 'banner-what-is-your-name.png'
    : nameIsBlocked
      ? 'banner-name-censored.png'
      : 'banner-filter-passed.png';

  // Preload images to avoid flicker when swapping them and switching tabs
  useEffect(() => {
    const sources = [
      'banner-what-is-your-name.png',
      'banner-name-censored.png',
      'banner-filter-passed.png',
    ];
    sources.forEach((src) => {
      const img = new Image();
      img.src = getPublicImagePath(src);
    });
  }, []);

  return (
    <Stack alignContent='center' alignSelf='center' spacing={0.5}>
      <img
        src={getPublicImagePath(bannerImage)}
        alt={'enter your name'}
        loading='eager'
        decoding='async'
        style={{
          transform: 'scale(2)',
          transformOrigin: 'center',
          width: '500px',
          maxWidth: '100%',
          height: '100px',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
          transition: 'opacity .3s ease',
        }}
      />

      <Stack
        alignSelf='center'
        alignContent='center'
        spacing={2}
        maxWidth={'100%'}
      >
        <EldenRingTextField
          placeholder={`(Max Length: ${maxNameLengthForGame(props.game)})`}
          variantStyle={props.game}
          fullWidth
          value={inputNameValue}
          onChange={handleInputChange}
          error={blockedWordsForName != null}
          disabled={props.inputDisabled}
        />
        <Box>
          {nameIsBlocked && (
            <Stack spacing={1} alignItems={'center'}>
              <Typography color={'error'} variant='h6'>
                Your name is censored:
              </Typography>
              <Typography variant='body1'>
                {generateBlockedNamePreview(
                  inputNameValue,
                  blockedWordsForName!,
                )}
              </Typography>

              <Typography variant='body1' color='error'>
                Blocked words:
              </Typography>
              <Typography variant='body2'>
                {blockedWordsForName?.join(', ')}
              </Typography>
            </Stack>
          )}
          {!nameIsBlocked && inputNameValue && (
            <Stack spacing={0.5} alignItems={'center'}>
              <Typography color={'success'} variant={'h6'}>
                Your name is not censored!
              </Typography>
              <Typography>{inputNameValue}</Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Stack>
  );
}

export default NameInputForm;
