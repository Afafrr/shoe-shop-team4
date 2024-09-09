import { Stack, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, FormContainer, useForm } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import { FormObj } from "./PageClient";
import { inputs } from "../_schema/profileSchema";
import { profileValidation } from "../_schema/profileValidation";
import { useMutation } from "@tanstack/react-query";
import { UserData } from "@/types/types";
import WarningIcon from "@/components/Form/WarningIcon";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import { ResData } from "@/app/(with-navbar)/_actions/getData";
import { updateUserData } from "../actions";
import { useSession } from "next-auth/react";

export default function MyProfileForm({ formData }: { formData: FormObj }) {
  const [response, setResponse] = useState<ResData<UserData>>();
  const [show, setShow] = useState(false);
  const session = useSession();

  const { mutate } = useMutation({
    mutationKey: ["userData"],
    mutationFn: async (userData: FormObj) => {
      setShow(false);
      const res = await updateUserData(
        {
          ...formData,
          ...userData,
        },
        session
      );
      setResponse(res);
      if (!res.error) setShow(true);
    },
  });

  const formContext = useForm<FieldValues>({
    defaultValues: formData,
    resolver: zodResolver(profileValidation),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formContext;

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit((data) => mutate(data))}
    >
      {show ? <SuccessAlert message="Changes saved!" /> : null}
      {response?.error ? (
        <Typography color="red">
          <WarningIcon /> {response?.error}
        </Typography>
      ) : null}
      <Stack spacing={"24px"}>
        {inputs.map((input) => (
          <Input key={input.label} label={input.label} props={input.props} />
        ))}
      </Stack>
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={{
          position: "relative",
          width: "152px",
          height: "40px",
          float: "right",
          mt: { xs: "36px", md: "56px" },
        }}
      >
        Save changes
      </Button>
    </FormContainer>
  );
}
