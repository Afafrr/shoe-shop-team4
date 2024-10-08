import { Container } from "@mui/material";
import ProfileAside from "../_components/ProfileAside";
import Wishlist from "./_components/Wishlist";

export default function MyWishlist() {
  return (
    <Container
      data-testid="my-wishlist-page"
      disableGutters
      style={{
        display: "flex",
        marginBottom: "50px",
        padding: "0",
        maxWidth: "none",
        margin: "0",
      }}
    >
      <ProfileAside activeBtnPath="my-wishlist" />
      <Wishlist />
    </Container>
  );
}
