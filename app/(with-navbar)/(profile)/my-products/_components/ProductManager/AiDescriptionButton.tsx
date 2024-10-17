import { Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { Logo } from "@/public/svg/Logo";
import { useFormContext } from "react-hook-form-mui";
import { generateDescription } from "../../_lib/descriptionAction";
import { readStreamableValue } from "ai/rsc";
import errorToast from "@/components/Alerts/errorToast";
import useIsMobile from "../useIsMobile";

type AiDescriptionButtonProps = {
  isGeneratingDesc: boolean;
  setIsGeneratingDesc: Dispatch<SetStateAction<boolean>>;
};

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function AiDescriptionButton({
  isGeneratingDesc,
  setIsGeneratingDesc,
}: AiDescriptionButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const { getValues, setValue } = useFormContext();

  async function handleClick() {
    setIsGeneratingDesc(true);
    setValue("description", "");
    try {
      const { output } = await generateDescription(getValues("name"));

      for await (const delta of readStreamableValue(output)) {
        setValue("description", `${getValues("description")}${delta}`);
      }
    } catch (e) {
      errorToast("Sorry, something went wrong while generating the response.");
    } finally {
      setIsGeneratingDesc(false);
    }
  }

  return (
    <Button
      variant="text"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={isGeneratingDesc}
      onClick={handleClick}
      endIcon={<Logo color={hovered ? "white" : "#FE645E"} />}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        background:
          "linear-gradient(91.61deg, rgba(247, 99, 94, 0.1), rgba(247, 99, 94, 0.1))",
        "&:hover": {
          background:
            "linear-gradient(91.61deg, #FE645E 2.35%, #CD3C37 97.81%)",
        },
        "& .MuiButton-endIcon": {
          marginLeft: 0,
          marginRight: 0,
        },
      }}
    >
      <Collapse in={hovered} orientation="horizontal">
        <Box
          component="span"
          sx={{ whiteSpace: "nowrap", mr: 1, color: "white" }}
        >
          Use AI {!isMobile && "suggestion"}
        </Box>
      </Collapse>
    </Button>
  );
}
