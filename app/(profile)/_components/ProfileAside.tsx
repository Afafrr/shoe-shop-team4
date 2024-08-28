import { Box, Typography, Avatar } from "@mui/material";
import { AsideNavbar } from "@/components/Profile/AsideNavbar";

const ProfileAside = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        mt: "35px",
        flexDirection: "column",
        width: "320px",
        height: 1,
      }}
    >
      <Box sx={{ display: "flex", ml: "40px" }}>
        <Avatar
          alt=""
          sx={{
            width: "64px",
            height: "64px",
            padding: "15px",
            border: "4px solid",
          }}
        />
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
            Jane
          </Typography>
        </Box>
      </Box>
      <hr
        style={{
          height: "1px",
          width: "100%",
          margin: "32px 0px 32px 0px",
          border: "none",
          backgroundColor: "#EAECF0",
        }}
      />
      <AsideNavbar
        parentsSX={{ ml: "40px", mt: "30px" }}
        activeBtnPath="settings"
      />
    </Box>
  );
};

export default ProfileAside;
