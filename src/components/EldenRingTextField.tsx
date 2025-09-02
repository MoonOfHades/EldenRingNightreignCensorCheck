import {
  Box,
  keyframes,
  SxProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import Game, { maxNameLengthForGame } from '../model/Game';

export type ThemedTextFieldProps = TextFieldProps & {
  variantStyle: Game;
  sx?: SxProps;
};

const hoverPulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

/**
 * Themed text field mimicking the in-game name inputs:
 *  - brackets on the outsides that disappear on focus
 *  - Nightreign and ER background/outline colors
 *  - text alignment on focus (ER is left-aligned for some reason but Nightreign is centered)
 */
export function EldenRingTextField(props: ThemedTextFieldProps) {
  const {
    variantStyle = `${Game.ELDEN_RING}`,
    sx,
    variant = 'outlined',
    ...rest
  } = props;

  const variantConfig =
    variantStyle === `${Game.ELDEN_RING_NIGHTREIGN}`
      ? {
          // Nightreign rain at night
          bgColor: 'rgba(20,31,49,255)',
          bracketColor: '#c8e0f1ff',
          textColor: '#f0f8ff',
          bracketTextShadow: '0 0 8px rgba(126,199,255,0.7)',
          outlineColorFocus: 'rgba(52,57,83,255)',
          bgColorFocus: 'rgba(0,0,0,255)',
          boxShadowFocus: '0 0 16px rgba(126,199,255,0.08)',
          marginTop: '0rem',
          marginBottom: '0rem',
          marginTopFocus: '0rem',
          marginBottomFocus: '0rem',
          bracketDisplacement: '-.65rem',
          bracketLineHeight: 'scale(1, 1.5);',
          focusTextAlign: 'center',
        }
      : {
          bgColor: 'rgba(29,28,23,255)',
          bracketColor: '#dcdcdc',
          textColor: '#f0f8ff',
          bracketTextShadow: '0 0 6px rgba(255,255,255,0.6)',
          outlineColorFocus: 'rgba(67,67,56,255)',
          bgColorFocus: 'rgba(19,20,16,255)',
          boxShadowFocus: '0 0 10px rgba(255,255,255,0.06)',
          // Elden Ring name input box is thinner than the Nightreign one in-game, but that causes shifting
          // on mobile, so I'll keep the margins the same here (previously had -.2rem on top and -.3rem on bottom)
          marginTop: '0rem',
          marginBottom: '0rem',
          marginTopFocus: '0rem',
          marginBottomFocus: '0rem',
          bracketDisplacement: '-.65rem',
          bracketLineHeight: 'scale(1, 1.5);',
          focusTextAlign: 'left',
        };

  const coreSx: SxProps = {
    '& .MuiInputBase-root': {
      position: 'relative',
      width: '100%',
      backgroundColor: variantConfig.bgColor,
      color: variantConfig.textColor,
      fontSize: '1.5rem',
      padding: '0px 20px',
      borderRadius: 0,
      transition: 'background-color 180ms ease, box-shadow 180ms ease',

      // Add outline on focus based on in-game colors
      '&.Mui-focused fieldset': {
        borderColor: variantConfig.outlineColorFocus,
      },

      // Style input text (unfocused)
      '& input': {
        textAlign: 'center',
        padding: 0,
        marginTop: variantConfig.marginTop,
        marginBottom: variantConfig.marginBottom,
      },

      '&.Mui-focused input': {
        textAlign: variantConfig.focusTextAlign,
        padding: 0,
        marginTop: variantConfig.marginTopFocus,
        marginBottom: variantConfig.marginBottomFocus,
      },

      // Bracket around input
      '&::before, &::after': {
        position: 'absolute',
        zIndex: 2,
        color: variantConfig.bracketColor,
        textShadow: variantConfig.bracketTextShadow,
        fontSize: '2.15rem',
        transition: 'text-shadow 180ms ease',
        lineHeight: 2,
        pointerEvents: 'none',
      },
      '&::before': {
        content: '"["',
        left: variantConfig.bracketDisplacement,
        transform: variantConfig.bracketLineHeight,
        transformOrigin: 'center center',
      },
      '&::after': {
        content: '"]"',
        right: variantConfig.bracketDisplacement,
        transform: variantConfig.bracketLineHeight,
        transformOrigin: 'center center',
      },

      // Hide brackets on select
      '&.Mui-focused::before, &.Mui-focused::after': {
        opacity: 0,
      },

      '&.Mui-focused': {
        outlineColor: variantConfig.outlineColorFocus,
        backgroundColor: variantConfig.bgColorFocus,
        boxShadow: variantConfig.boxShadowFocus,
        textAlign: variantConfig.focusTextAlign,
      },

      // Hide placeholder on select
      '&.Mui-focused input::placeholder': {
        opacity: 0,
      },
    },

    // hide the label element if present
    '& .MuiInputLabel-root': {
      display: 'none',
    },

    // allow additional sx to be merged by the caller
    ...((sx as unknown) ?? {}),
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',

        '@media (hover: hover) and (pointer: fine)': {
          '&:hover:not(:has(.Mui-focused)) > .glow': {
            opacity: 1,
            animation: `${hoverPulse} 1.8s infinite ease-in-out`,
          },
        },
      }}
    >
      <Box
        className='glow'
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.2)) 30%',
          filter: 'blur(6px)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          '&:hover': {
            opacity: 1,
            animation: `${hoverPulse} 1.8s infinite ease-in-out`,
          },
        }}
      />
      <TextField
        {...(rest as TextFieldProps)}
        variant={variant}
        inputProps={{
          // Show "Done" submit key on mobile
          enterKeyHint: 'done',
          autoComplete: 'off',
          autoCorrect: 'off',
          spellCheck: false,
          inputMode: 'text',
        }}
        slotProps={{
          htmlInput: {
            maxLength: maxNameLengthForGame(props.variantStyle!),
          },
          input: {
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                (e.target as HTMLInputElement).blur();
              }
            },
          },
        }}
        sx={{
          ...coreSx, // brackets stay here on ::before/::after
          '& .MuiInputBase-root::before, & .MuiInputBase-root::after': {
            zIndex: 2, // ensure brackets above glow
          },
        }}
      />
    </Box>
  );
}
