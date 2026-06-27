import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled((props: TextFieldProps) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#ffffff",

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
      },
    },

    "& .MuiOutlinedInput-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },

    "& .MuiOutlinedInput-input.Mui-disabled::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },

    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
  })
);

export default CustomTextField;
