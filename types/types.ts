import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Stripe from "stripe";

export type ErrorResponse = {
  data: {};
  error: {
    message: string;
  };
};

export type SuccessResponse = {
  jwt?: JWT;
  user: {
    id: number;
    username: string;
    email: string;
    [key: string]: any;
  };
};

export type BackResponse = ErrorResponse | SuccessResponse;

export type ActionSuccess = SuccessResponse & {
  redirect: string;
  message: string;
};

export type ActionResponse = ErrorResponse | ActionSuccess;

export type ContextType = {
  searchParams: { [k: string]: string };
  session: Session | null;
};

export type FiltersType = {
  [key: string]: string[] | undefined;
};

export type SearchParamsType = {
  [key: string]: string | string[] | undefined;
};

export type ImageData = {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  avatar: ImageData;
  customerId: string;
};

export type CheckoutForm = {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
  products: string[];
  customerId: string;
};

export type Order = {
  id: string;
  created: number;
  amount: number;
  status: Stripe.PaymentIntent.Status;
  paymentType: string;
  metadata: MetadataDetails;
};

export type MetadataDetails = {
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  firstName?: string;
  phoneNumber?: string;
  products?: string;
  state?: string;
  surname?: string;
  userId?: string;
  zipCode?: string;
};

export type ProductFromOrder = {
  id: number;
  size: number;
  quantity: number;
};
