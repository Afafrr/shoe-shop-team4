export type ErrorResponse = {
  data: {};
  error: {
    message: string;
  };
};

export type SuccessResponse = {
  jwt?: string;
  user: {
    id: string;
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
