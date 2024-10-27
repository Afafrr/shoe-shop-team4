import { Box } from "@mui/material";
import InfoBox from "../ui/InfoBox";

export default function AttachmentsDetails() {
  return (
    <Box
      sx={{
        display: "flex",
        py: "16px",
        px: "24px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Place invoice here */}
      </Box>

      <InfoBox label="Discount:" value="0$" />
    </Box>
  );
}
