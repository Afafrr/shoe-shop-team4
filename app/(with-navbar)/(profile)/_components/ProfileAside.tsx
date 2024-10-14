"use client";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { AsideNavbar } from "@/components/Profile/AsideNavbar";
import WarningIcon from "@/components/Form/WarningIcon";
import { useQuery } from "@tanstack/react-query";
import { ResData } from "@/utils/getData";
import { UserData } from "@/types/types";
type ProfileAsideProps = {
  breakpoint?: string;
};

export default function ProfileAside({ breakpoint = "md" }: ProfileAsideProps) {
  const { data } = useQuery<ResData<UserData>>({ queryKey: ["userData"] });

  const error = data?.error;
  const userData = data?.data;
  const avatar = userData?.avatar?.url;

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          [breakpoint]: "flex",
        },
        mt: "35px",
        flexDirection: "column",
        minWidth: "320px",
        height: 1,
        maxWidth: "350px",
      }}
    >
      <Box sx={{ display: "flex", ml: "40px" }}>
        <Avatar
          alt="User profile image"
          src={avatar}
          sx={{
            width: "64px",
            height: "64px",
            border: "1px solid #fff",
          }}
        >
          {error ? <WarningIcon /> : null}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ml: "16px",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>Welcome</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {userData?.firstName}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{ height: "1px", m: "32px 0px 32px 0px", color: "#EAECF0" }}
      />
      <AsideNavbar parentsSX={{ ml: "40px", mt: "30px" }} />
    </Box>
  );
}
