import { Box, Typography, Button, Stack, Divider, Modal } from "@mui/material";

// This is a modal to delete selected file.

type ActionConfirmationModalProps = {
  name?: string;
  message?: string;
  description?: string;
  open: boolean;
  handleClose: (event: React.MouseEvent) => void;
  actionFn: () => void;
};
export default function ActionConfirmationModal({
  name,
  message,
  description,
  open,
  handleClose,
  actionFn,
}: ActionConfirmationModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          width: { xs: "90%", md: "35%" },
          height: "fit-content",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "30px",
          backgroundColor: "background.paper",
          borderRadius: "6.58px",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={{ xs: 1, md: 4.7 }}>
          <Typography
            id="modal-title"
            sx={{ width: "100%" }}
            fontSize={30}
            fontWeight={500}
            lineHeight={"35px"}
          >
            {message || "Are you sure?"}
          </Typography>
          <Typography
            id="modal-description"
            sx={{ width: "100%" }}
            fontWeight={300}
          >
            {description ||
              "Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur."}
          </Typography>
          <Box mb={"35px"} sx={{ width: "100%" }}>
            <Divider sx={{ color: "#EAECF0" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: "47%",
                borderRadius: "5.58px",
                height: { xs: "60px", lg: "50px" },
                fontWeight: 500,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "47%",
                borderRadius: "5.58px",
                backgroundColor: "#FE645E",
                color: "white",
                height: { xs: "60px", lg: "50px" },
                fontWeight: 500,
              }}
              type="submit"
              onClick={actionFn}
            >
              {name || "Accept"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
