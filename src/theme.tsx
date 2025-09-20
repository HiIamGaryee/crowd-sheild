import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    light: PaletteColor;
    dark: PaletteColor;
    safe: PaletteColor;
    warning: PaletteColor;
    critical: PaletteColor;
    accent: PaletteColor;
  }

  interface PaletteOptions {
    light?: PaletteColorOptions;
    dark?: PaletteColorOptions;
    safe?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    critical?: PaletteColorOptions;
    accent?: PaletteColorOptions;
  }
}

const yesevaFont = "Yeseva One, sans-serif";
const montserratFont = "Montserrat, sans-serif";

// Function to create a theme based on the mode
const getTheme = (mode: any) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1E3A8A" : "#FFFFFF", // Navy Blue for light mode, White for dark mode
        light: "#3B82F6", // Sky Blue
        dark: "#1E40AF",
        contrastText: mode === "light" ? "#FFFFFF" : "#333333", // White text on primary color in light mode, dark text in dark mode
      },
      secondary: {
        main: mode === "light" ? "#9CA3AF" : "#676767", // Neutral Gray for light mode, grey for dark mode
        light: "#D1D5DB",
        dark: "#6B7280",
        contrastText: "#FFFFFF", // White text on secondary color
      },
      light: {
        main: mode === "light" ? "#F9FAFB" : "#F5F3EF", // Light gray background for light mode, original for dark mode
        light: "#FFFFFF", // White cards/panels
        dark: "#F3F4F6",
      },
      dark: {
        main: "#18100e", // Main dark background color
        light: "#514c4b",
        dark: "light.main",
      },
      // Alert & Status Colors
      safe: {
        main: "#10B981", // Green for safe/normal crowd flow
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#F59E0B", // Amber for moderate congestion
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#FFFFFF",
      },
      critical: {
        main: "#DC2626", // Red for urgent action required
        light: "#EF4444",
        dark: "#B91C1C",
        contrastText: "#FFFFFF",
      },
      accent: {
        main: "#06B6D4", // Teal for links, secondary buttons, data highlights
        light: "#22D3EE",
        dark: "#0891B2",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#DC2626", // Red for errors (using critical color)
        light: "#EF4444",
        dark: "#B91C1C",
      },
      info: {
        main: mode === "light" ? "#3B82F6" : "#BBDEFB", // Sky Blue for information in light mode, softer in dark mode
        light: "#60A5FA",
        dark: "#2563EB",
      },
      success: {
        main: "#10B981", // Green for successes (using safe color)
        light: "#34D399",
        dark: "#059669",
      },
      // Text colors
      text: {
        primary: mode === "light" ? "#111827" : "#FFFFFF", // Dark gray for light mode, white for dark mode
        secondary: mode === "light" ? "#4B5563" : "#9CA3AF", // Muted gray for labels/hints
      },
      background: {
        default: mode === "light" ? "#F9FAFB" : "#18100e", // Light gray background for light mode
        paper: mode === "light" ? "#FFFFFF" : "#2D2D2D", // White cards for light mode
      },
    },
    typography: {
      fontFamily: montserratFont,
      h1: { fontFamily: yesevaFont },
      h2: { fontFamily: yesevaFont },
      h3: { fontFamily: yesevaFont },
      h4: { fontFamily: yesevaFont },
      h5: { fontFamily: yesevaFont },
      h6: { fontFamily: yesevaFont },
      subtitle1: { fontFamily: yesevaFont },
      button: { fontFamily: montserratFont },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            // padding: "20px",
            backgroundColor: mode === "light" ? "#FFFFFF" : "#ffcdaa", // White for light mode, original for dark mode
            boxShadow:
              mode === "light"
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // Subtle shadow for light mode
            "&.table-paper": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },
          rounded: {
            borderRadius: "20px",
          },
          outlined: {
            borderColor: mode === "light" ? "#9CA3AF" : "#bdbdbd", // Neutral gray border for light mode
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "1px solid #444",
            borderRadius: "4px",
            background: "linear-gradient(45deg, #434343 0%, #000 100%)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "#fff",
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "#555",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#444",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          contained: {
            background: mode === "light" ? "#1E3A8A" : "#e2994f", // Navy Blue for light mode, original for dark mode
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "20px",
            boxShadow:
              mode === "light"
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              background: mode === "light" ? "#1E40AF" : "#e2994f", // Darker navy for light mode hover
              boxShadow:
                mode === "light"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            },
            "&:focus": {
              background: mode === "light" ? "#1E3A8A" : "#e2994f",
            },
          },
          text: {
            background: mode === "light" ? "#FFFFFF" : "#F5F3EF",
            color: mode === "light" ? "#1E3A8A" : "#e2994f",
            border:
              mode === "light" ? "1px solid #9CA3AF" : "1px solid error.main",
            borderRadius: "4px",
            "&:hover": {
              background: mode === "light" ? "#F9FAFB" : "#F5F3EF",
            },
            "&:focus": {
              background: mode === "light" ? "#FFFFFF" : "#F5F3EF",
            },
          },
          root: {
            background: mode === "light" ? "#1E3A8A" : "#e2994f",
            color: "#FFFFFF",
            borderRadius: "28px",
            p: "20px",
            boxShadow:
              mode === "light"
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              background: mode === "light" ? "#1E40AF" : "#c17d39",
              boxShadow:
                mode === "light"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            },
            "&.Mui-disabled": {
              color: mode === "light" ? "#9CA3AF" : "#666",
              background: mode === "light" ? "#F3F4F6" : "#333333",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#f7f3f0", // White for light mode, original for dark mode
            padding: "24px",
            borderRadius: "16px",
            height: "100%",
            boxShadow:
              mode === "light"
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: mode === "light" ? "1px solid #F3F4F6" : "none", // Subtle border for light mode
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#111827" : "#18100e", // Dark gray for light mode, original for dark mode
          },
        },
      },
    },
  });

export default getTheme;
