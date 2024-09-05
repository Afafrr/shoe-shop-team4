import { Session } from "next-auth";

export type ErrorResponse = {
  data: {};
  error: {
    message: string;
  };
};

export type SuccessResponse = {
  jwt?: string;
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

export type SessionData = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type ContextType = {
  searchParams: { [k: string]: string };
  session: Session | null;
};
