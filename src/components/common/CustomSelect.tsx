import Select from "@mui/material/Select";
import type { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const CustomSelect = styled((props: SelectProps) => <Select {...props} />)(() => ({}));

export default CustomSelect;
