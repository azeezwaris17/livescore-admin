// theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#42A605', // Main green color
      light: '#5bbd1a', // Slightly lighter version for hover/active

      contrastText: '#ffffff', // White text for better contrast on primary
    },
    secondary: {
      main: '#41414B', // Inactive icon color
    },
    text: {
      primary: '#737584', // Default text and heading color
      secondary: '#41414B', // Secondary text color
    },
    // Custom palette extensions for specific use cases
    custom: {
      iconActive: '#42A605',
      iconInactive: '#41414B',
      iconHoverBg: 'rgba(66, 166, 5, 0.08)', // Light background on hover
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 600,
      color: '#737584', // Heading color
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
      color: '#737584', // Heading color
    },
    h3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
      color: '#737584', // Heading color
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      color: '#737584', // Default text color
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      color: '#737584', // Default text color
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      color: '#737584', // Default text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#5bbd1a', // Use light variant
          },
          '&:active': {
            backgroundColor: '#5bbd1a', // Same as hover
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary', // Will use #42A605 as main color
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#41414B', // Inactive icon color
          '&:hover': {
            backgroundColor: 'rgba(66, 166, 5, 0.08)', // Light green bg on hover
            color: '#42A605', // Active color on hover
          },
          '&.Mui-selected, &.Mui-active': {
            color: '#42A605', // Active color
            backgroundColor: 'rgba(66, 166, 5, 0.12)',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          body1: 'p',
          body2: 'p',
          caption: 'span',
        },
      },
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          color: '#737584', // Default text color

        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          '& .MuiInputBase-root': {
            fontFamily: 'Inter, sans-serif',
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    // Add more component customizations as needed
  },
});

export default theme;