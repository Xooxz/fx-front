import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    rate: {
      up: string;
      down: string;
      neutral: string;
    };
  }

  interface PaletteOptions {
    rate?: {
      up?: string;
      down?: string;
      neutral?: string;
    };
  }
}
