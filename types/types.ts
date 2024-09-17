import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

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
