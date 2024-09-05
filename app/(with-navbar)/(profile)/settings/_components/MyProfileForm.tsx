import { Stack, Button } from "@mui/material";
import React from "react";
import { FieldValues, FormContainer, useForm } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import { FormObj } from "./PageClient";
import { inputs } from "../_schema/profileSchema";
import { profileValidation } from "../_schema/profileValidation";
import { updateUserData } from "../actions";
import { useMutation } from "@tanstack/react-query";

export default function MyProfileForm({ formData }: { formData: FormObj }) {
  //TODO: wait for queryClientProvider on development
  const { mutate } = useMutation({
    mutationKey: ["userData"],
    mutationFn: (userData: FormObj) =>
      updateUserData({ ...formData, ...userData }),
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
