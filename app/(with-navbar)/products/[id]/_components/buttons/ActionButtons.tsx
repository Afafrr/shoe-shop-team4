import { Button, Box } from "@mui/material";

type ActionButtonsProps = {
  buttonAction: () => void;
  buttonText: string;
  variant?: "text" | "contained" | "outlined";
};

export default function ActionButton({
  buttonAction,
  buttonText,
  variant,
}: ActionButtonsProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingBottom="70px"
      paddingTop="20px"
      sx={{ width: "50%" }}
    >
      <Button
        variant={variant || "contained"}
        size="large"
        onClick={buttonAction}
        sx={{
          width: "100%",
          height: "55px",
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
