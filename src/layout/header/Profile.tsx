import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Divider, IconButton, Menu, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IconMail } from "@tabler/icons-react";

import * as dropdownData from "./data.ts";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="show profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? "primary.main" : "inherit",
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/profile.svg"
          alt="ProfileImg"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        sx={{
          "& .MuiMenu-paper": {
            width: 360,
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>

        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src="/images/profile/profile.svg"
            alt="ProfileImg"
            sx={{
              width: 95,
              height: 95,
            }}
          />

          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
              Mathew Anderson
            </Typography>

            <Typography variant="subtitle2" color="textSecondary">
              Designer
            </Typography>

            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              info@modernize.com
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {dropdownData.profile.map((item) => (
          <Box key={item.title}>
            <Box sx={{ py: 2 }} className="hover-text-primary">
              <Link
                to={item.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                onClick={handleClose2}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    width={45}
                    height={45}
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Avatar
                      src={item.icon}
                      alt={item.title}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      noWrap
                      sx={{ width: 240 }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      noWrap
                      sx={{ width: 240 }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}

        <Box mt={2}>
          <Button
            component={Link}
            to="/auth/auth1/login"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClose2}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
