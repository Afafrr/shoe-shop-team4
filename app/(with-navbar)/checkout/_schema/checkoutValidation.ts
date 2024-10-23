import { z } from "zod";
import { profileValidation } from "../../(profile)/settings/_schema/profileValidation";

const shippingValidation = z.object({
  country: z
    .string()
    .min(1, {
      message: "Please enter your country name",
    })
    .max(20, { message: "Maximum number of characters is 20!" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Only letters allowed!",
    }),
  city: z
    .string()
    .min(1, {
      message: "Please enter your city name",
    })
    .max(20, { message: "Maximum number of characters is 20!" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Only letters allowed!",
    }),
  state: z
    .string()
    .min(1, {
      message: "Please enter your state name",
    })
    .max(20, { message: "Maximum number of characters is 20!" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Only letters allowed!",
    }),
  zipCode: z
    .string()
    .min(1, {
      message: "Please enter your zip code",
    })
    .regex(/^\d+$/, {
      message: "Zip Code must be a number",
    }),
  address: z
    .string()
    .min(1, {
      message: "Please enter your address",
    })
    .max(50, { message: "Maximum number of characters is 50!" })
    .regex(/\d/, {
      message: "Address must contain at least one number",
    }),
});

const emailValidation = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .max(50, { message: "Maximum number of characters is 50!" }),
});

const surnameValidation = z.object({
  surname: z
    .string()
    .min(1, {
      message: "Please enter your surname",
    })
    .max(20, { message: "Maximum number of characters is 20!" })
    .trim()
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
});

const fullProfileValidation = profileValidation
  .omit({ lastName: true })
  .extend(surnameValidation.shape)
  .required()
  .extend(emailValidation.shape);

export const checkoutValidation = shippingValidation.extend(
  fullProfileValidation.shape
);
