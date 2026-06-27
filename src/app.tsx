import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Router from "./routes/Router";
import { CustomizerContextProvider } from "./context/CustomizerContextProvider";
import { ThemeSettings } from "./utils/theme/Theme";

function AppContent() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomizerContextProvider>
      <AppContent />
    </CustomizerContextProvider>
  );
}

export default App;
