import { Container, Typography, Avatar, Box } from "@mui/material";
import ProfileAside from "@/components/ProfileAside";

const Page = () => {
  return (
    <Box sx={{ p: 0, display: "flex" }}>
      <ProfileAside />
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: "20px", md: "60px" },
          pt: { xs: "24px", md: "50px" },
        }}
      >
        <Typography variant="h1" fontSize={30} fontWeight={500}>
          My Profile
        </Typography>
        <Box sx={{ mt: { xs: 1, md: "35px" } }}>
          <Avatar
            alt=""
            sx={{
              width: { xs: "100px", md: "150px" },
              height: "auto",
              aspectRatio: 1 / 1,
              padding: "15px",
              border: "4px solid",
            }}
          />
        </Box>
        <Typography
          fontSize={{ xs: "12px", md: "15px" }}
          fontWeight={300}
          sx={{ mt: { xs: "12px", md: "49px" } }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis minus
          cupiditate illum excepturi animi iure!
        </Typography>
      </Container>
    </Box>
  );
};

export default Page;
