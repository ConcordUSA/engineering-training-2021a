import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";

const AppTheme = {
  primary: colors.red.A400,
  primaryText: "#ffffff",
  secondary: colors.red.A700,
};

export default AppTheme;

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: AppTheme.primary,
    },
    secondary: {
      main: AppTheme.secondary,
    },
  },
});
