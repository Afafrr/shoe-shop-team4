import { Stack, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormContainer, useForm } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import { inputs } from "../_schema/profileSchema";
import { profileValidation } from "../_schema/profileValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserData } from "@/types/types";
import WarningIcon from "@/components/Form/WarningIcon";
import { ResData } from "@/utils/getData";
import { updateUserData } from "../actions";
import { useSession } from "next-auth/react";
import { ReducedData } from "./PageClient";
import successToast from "@/components/Alerts/successToast";
import { z } from "zod";

type FieldValues = z.infer<typeof profileValidation>;

export default function MyProfileForm({ formData }: { formData: ReducedData }) {
  const [response, setResponse] = useState<ResData<UserData>>();
  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["userData"],
    mutationFn: async (userData: ReducedData) => {
      const res = await updateUserData(
        {
          ...formData,
          ...userData,
        },
        session
      );
      setResponse(res);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onSuccess: () => {
      successToast("Info updated successfully");
    },
  });

  const formContext = useForm<FieldValues>({
    defaultValues: formData,
    resolver: zodResolver(profileValidation),
  });
  const { handleSubmit } = formContext;

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit((data) => mutate(data))}
    >
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
        disabled={isPending}
        sx={{
          position: "relative",
          width: "152px",
          height: "40px",
          float: "right",
          mt: { xs: "36px", md: "56px" },
          mb: "30px",
        }}
      >
        {isPending ? "Loading..." : " Save changes"}
      </Button>
    </FormContainer>
  );
}
