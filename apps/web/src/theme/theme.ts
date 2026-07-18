import { createTheme } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

export const theme = createTheme({
    palette,

    typography,

    shape: {
        borderRadius: 12,
    },

    spacing: 8,

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    backgroundColor: palette.background?.default,
                    color: palette.text?.primary,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.background?.paper,
                    color: palette.text?.primary,
                    borderRadius: 12,
                    boxShadow: '0 6px 16px rgba(0,0,0,.35)',
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    color: palette.text?.primary,
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                root: {
                    color: palette.text?.primary,
                },
            },
        },
    },
});
