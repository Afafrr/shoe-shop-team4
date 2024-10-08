"use client";
import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileAside from "../../_components/ProfileAside";
import AvatarBox from "./AvatarBox";
import MyProfileForm from "./MyProfileForm";
import { ResData } from "@/utils/getData";
import { UserData } from "@/types/types";
import { inputs } from "../_schema/profileSchema";
import WarningIcon from "@/components/Form/WarningIcon";
import { useActivePath } from "@/contexts/ActivePathProvider";

export type ReducedData = Partial<
  Record<string, UserData[keyof UserData] | File>
>;
export default function PageClient({
  initialData,
}: {
  initialData: ResData<UserData>;
}) {
  const reducedData: ReducedData = {};
  const inputsName = inputs.map((input) => input.props.name);
  //add avatar key to formData
  const { data, error } = initialData;
  //fetched data obj is reduced to keys that are used in inputs array
  if (data) {
    for (const key of inputsName) {
      const value = data[key as keyof typeof data];
      reducedData[key] = value;
    }
  }
  const [formData, setFormData] = useState<ReducedData>(reducedData);
  const [image, setImage] = useState<string | undefined>(
    initialData.data?.avatar?.url
  );
  const { setActivePath } = useActivePath();

  useEffect(() => {
    setActivePath("settings");

    return () => setActivePath("");
  }, [setActivePath]);

  return (
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
        <AvatarBox {...{ formData, setFormData }} {...{ image, setImage }} />
        <Typography
          fontSize={{ xs: "12px", md: "15px" }}
          fontWeight={300}
          sx={{ mt: { xs: "12px", md: "49px" } }}
        >
          Welcome back! Please enter your details into your profile.
        </Typography>
      </Box>
      <Box sx={{ mt: { xs: "24px", md: "48px" }, maxWidth: "436px" }}>
        {error ? (
          <Typography color="red">
            <WarningIcon /> {error}
          </Typography>
        ) : null}
        <MyProfileForm formData={formData} />
      </Box>
    </Box>
  );
}
