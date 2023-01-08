import { createTheme } from '@mui/material/styles';

// import MulishRegular from '../fonts/Mulish-Regular.ttf';
// import MulishMedium from '../fonts/Mulish-Medium.ttf';

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 1280,
  lg: 1440,
  xl: 2160,
};

const theme = {
  palette: {
    background: {
      default: '#FFF',
    },
    primary: {
      main: '#3751FF',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#363740',
      contrastText: '#FFF',
    },
  },
  typography: {
    fontFamily: 'Mulish',
    color: 'rgba(23,28,38,1)',
    letterSpacing: '0px',
    fontWeight: '400',
    title1: {
      '@media (min-width:2160px)': {
        fontSize: '6rem',
        lineHeight: '6.5rem',
        letterSpacing: '-0.063rem',
      },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '5.063rem',
        lineHeight: '5.375rem',
        letterSpacing: '-0.025rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '3.938rem',
        lineHeight: '4.25rem',
        letterSpacing: '-0.025rem',
      },
      fontSize: '3.125rem',
      lineHeight: '3.375rem',
      letterSpacing: '-0.025rem',
    },
    title2: {
      '@media (min-width:2160px)': {
        fontSize: '3.75rem',
        lineHeight: '4.25rem',
        letterSpacing: '-0.025rem',
      },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '3.375rem',
        lineHeight: '3.813rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '2.938rem',
        lineHeight: '3.375rem',
      },
      fontSize: '2.625rem',
      lineHeight: '3rem',
    },
    title3: {
      '@media (min-width:2160px)': {
        fontSize: '2.625rem',
        lineHeight: '3.125rem',
      },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '2.438rem',
        lineHeight: '2.938rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '2.188rem',
        lineHeight: '2.563rem',
      },
      fontSize: '2rem',
      lineHeight: '2.313rem',
    },
    subtitle1: {
      '@media (min-width:2160px)': { fontSize: '1.75rem', lineHeight: '2.25rem' },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '1.688rem',
        lineHeight: '2.188rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '1.625rem',
        lineHeight: '2.063rem',
      },
      fontSize: '1.563rem',
      lineHeight: '2rem',
    },
    subtitle2: {
      '@media (min-width:2160px)': {
        fontSize: '1.188rem',
        lineHeight: '1.625rem',
        fontWeight: '600',
      },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '1.188rem',
        lineHeight: '1.625rem',
        fontWeight: '600',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '1.125rem',
        lineHeight: '1.563rem',
        fontWeight: '600',
      },
      fontSize: '1.125rem',
      lineHeight: '1.563rem',
      fontWeight: '600',
    },
    bodylarge: {
      '@media (min-width:2160px)': {
        fontSize: '1.313rem',
        lineHeight: '2.188rem',
      },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '1.313rem',
        lineHeight: '2.125',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '1.25rem',
        lineHeight: '2rem',
      },
      fontSize: '1.25rem',
      lineHeight: '1.938rem',
    },
    bodymedium: {
      '@media (min-width:2160px)': { fontSize: '1.125rem', lineHeight: '1.875rem' },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '1.125rem',
        lineHeight: '1.813rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
      },
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
    body: {
      '@media (min-width:2160px)': { fontSize: '1rem', lineHeight: '1.688rem' },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '1rem',
        lineHeight: '1.688rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '1rem',
        lineHeight: '1.625rem',
      },
      fontSize: '1rem',
      lineHeight: '1.563rem',
    },
    bodysmall: {
      '@media (min-width:2160px)': { fontSize: '0.875rem', lineHeight: '1.5rem' },
      '@media (min-width:1440px) and (max-width:2559px)': {
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
      },
      '@media (min-width:640px) and (max-width:1439px)': {
        fontSize: '0.875rem',
        lineHeight: '1.438rem',
      },
      fontSize: '0.875rem',
      lineHeight: '1.438rem',
    },
    label: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '600',
    },
    caption: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
      fontWeight: '600',
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
};

// Create a theme instance.
const muiTheme = createTheme({
  breakpoints: {
    values: BREAKPOINTS,
  },
  ...theme,
  components: {
    MuiCssBaseline: {},
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        size: 'large',

        disableElevation: true,
        disableRipple: true,
        variant: 'contained',
        sx: {
          borderWidth: '2px',
          borderRadius: '2px',
          padding: '0.5rem 1.2rem',
          fontSize: '1rem',
          fontWeight: '600',
          // '&.MuiButton-contained': {},
          '&.MuiButton-outlined': {
            // padding is added here differently than contained because the outlined button
            // has a border which sits outside the contained area and this makes the button looks larger
            // so the padding is reduced for contained
            paddingTop: '0.3rem',
            paddingBottom: '0.3rem',
          },
        },
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&:focus': {
            borderColor: 'rgba(227,228,230, 0.8)',
          },
          '&.MuiButton-contained': {
            '&:hover': {
              background: 'rgba(22,25,29,1)',
            },
            '&:disabled': {
              background: 'rgba(22,24,29,0.38)',
              color: 'rgba(255,255,255,1)',
            },
          },
          '&.MuiButton-outlined': {
            '&:disabled': {
              borderColor: 'rgba(22, 24, 29, 0.38)',
              color: 'rgba(22, 24, 29, 0.38)',
            },
            '&:hover': {
              border: '2px solid #3751FF',
            },
          },
          '&.MuiButton-sizeSmall': {
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
        color: 'primary',
      },
      styleOverrides: {
        root: {
          color: 'rgba(22,25,29,0.2)',
          transform: 'scale(0.8)',
          '&checked': {
            color: '#3751FF',
          },
        },
      },
    },

    //new ch circ-prog
    // MuiCircularProgress: {
    //   defaultProps: {
    //     color: 'primary',
    //     size: 'large',
    //     fontSize: '1rem',

    //     disableElevation: true,
    //     disableRipple: true,
    //     variant: 'contained',
    //     sx: {
    //       borderRadius: 0,
    //       paddingTop: '0.4rem',
    //       paddingBottom: '0.4rem',
    //       paddingLeft: '1rem',
    //       paddingRight: '1rem',
    //       textTransform: 'none',
    //       loadingIndicator: 'white',
    //       fontWeight: 'bold',
    //     },
    //   },
    // },

    //newch circ-prog
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          transform: 'scale(0.8)',
          color: 'rgba(22,25,29,0.2)',
          '&$checked': {
            color: '#3751FF',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: `2px`,
          },
        },
        input: {
          padding: '0.75rem 0.5rem',
          fontSize: '1rem',
          lineHeight: '1.5rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          marginRight: 0,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'body1',
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          subtitle1: 'h1',
          subtitle2: 'h3',

          body1: 'p',
          body2: 'p',
        },
      },
    },
  },
});

export default muiTheme;
