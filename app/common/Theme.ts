import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000000",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9c27b0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#000",
        },
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "4px",
          border: "1px solid #9c27b0",
          padding: "8px",
          color: "#000",
          fontSize: "14px",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover": {
            borderColor: "#673ab7",
          },
          "&.Mui-focused": {
            borderColor: "#673ab7",
            boxShadow: "0 0 5px #9c27b0",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#9c27b0",
          color: "#fff",
          padding: "10px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#7b1fa2",
          },
        },
      },
    },
  },
});
