"use client";
import { Typography, Box } from "@mui/material";
import { useState } from "react";
import ProfileAside from "../../_components/ProfileAside";
import AvatarBox from "./AvatarBox";
import MyProfileForm from "./MyProfileForm";
import { ResData } from "@/utils/getData";
import { UserData } from "@/types/types";
import { inputs } from "../_schema/profileSchema";
import WarningIcon from "@/components/Form/WarningIcon";

export type FormObj = Partial<Record<string, string>>;
export default function PageClient({
  initialData,
}: {
  initialData: ResData<UserData>;
}) {
  const reducedData: FormObj = {};
  const inputsName = inputs.map((input) => input.props.name);
  const { data, error } = initialData;
  //fetched data obj is reduced to keys that are used in inputs array
  if (data) {
    for (const key of inputsName) {
      const value = data[key as keyof UserData];
      if (value) reducedData[key] = String(value);
    }
  }
  const [formData, setFormData] = useState(reducedData);

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
          <AvatarBox setFormData={setFormData} formData={formData} />
          <Typography
            fontSize={{ xs: "12px", md: "15px" }}
            fontWeight={300}
            sx={{ mt: { xs: "12px", md: "49px" } }}
          >
            Welcome back! Please enter your details to log into your account.
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
    </Box>
  );
}
