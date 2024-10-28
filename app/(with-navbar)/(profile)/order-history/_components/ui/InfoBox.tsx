import { Box, SxProps } from "@mui/material";
import React from "react";
import { BoldTypography, SecondaryTypography } from "./CustomTypographies";

type InfoBoxProps = {
  label: string;
  value: string;
  highlightValue?: boolean;
  sx?: SxProps;
};

export default function InfoBox({
  label,
  value,
  highlightValue = false,
  sx,
}: InfoBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <SecondaryTypography>
        {label}{" "}
        <BoldTypography
          component="span"
          color="textPrimary"
          sx={{
            fontSize: highlightValue ? "16px" : "14px",
          }}
        >
          {value}
        </BoldTypography>
      </SecondaryTypography>
    </Box>
  );
}
