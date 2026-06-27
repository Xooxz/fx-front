import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";
import { IconDots } from "@tabler/icons-react";

type NavGroupItem = {
  navLabel?: boolean;
  subheader?: string;
};

type Props = {
  item: NavGroupItem;
  hideMenu: boolean;
};

interface StyledProps {
  hideMenu: boolean;
}

const ListSubheaderStyle = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== "hideMenu",
})<StyledProps>(({ theme, hideMenu }) => ({
  ...theme.typography.overline,
  fontWeight: 700,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: "26px",
  padding: "3px 12px",
  marginLeft: hideMenu ? 0 : "-10px",
}));

/**
 * 사이드바 메뉴 그룹(섹션 제목)
 */
const NavGroup = ({ item, hideMenu }: Props) => {
  return (
    <ListSubheaderStyle disableSticky hideMenu={hideMenu}>
      {hideMenu ? <IconDots size={14} /> : item.subheader}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
