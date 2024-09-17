import { Typography, Box } from "@mui/material";

import ProfileAside from "../_components/ProfileAside";
import AvatarBox from "./_components/AvatarBox";

export default function Page() {
  return (
    <Box sx={{ display: "flex", width: 1 }}>
      <ProfileAside activeBtnPath="settings" />
      <Box
        sx={{
          m: { xs: "auto", md: 0 },
          px: { xs: "20px", md: "60px" },
          pt: { xs: "24px", md: "50px" },
        }}
      >
        <Box sx={{ p: 0, m: 0 }}>
          <Typography variant="h1" fontSize={30} fontWeight={500}>
            My Profile
          </Typography>
          <AvatarBox />
          <Typography
            fontSize={{ xs: "12px", md: "15px" }}
            fontWeight={300}
            sx={{ mt: { xs: "12px", md: "49px" } }}
          >
            Welcome back! Please enter your details to log into your account.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
