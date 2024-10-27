import { Box, Skeleton } from "@mui/material";

export default function ProductDetailItemSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        py: "16px",
        px: "24px",
        gap: "24px",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          width: { xs: "100%", sm: "50%", lg: "70%" },
        }}
      >
        <Skeleton
          variant="rectangular"
          width={104}
          height={104}
          sx={{ borderRadius: "8px" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" width={120} height={20} />

          <Skeleton variant="text" width={80} height={20} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="text" width={80} height={20} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="text" width={60} height={20} />
      </Box>
    </Box>
  );
}
