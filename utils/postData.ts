import { JWT } from "next-auth/jwt";
type HttpMethods = "PUT" | "POST" | "DELETE";
type PostOptions = {
  url: string;
  method: HttpMethods;
  token: JWT | null | undefined;
  data: any;
};

export async function postData({ url, method, token, data }: PostOptions) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error(res);
      return {
        data: null,
        error: `There was a problem with getting the data - ${res.statusText}`,
      };
    }

    return { data: await res.json(), error: "" };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: `There was a problem ${(error as Error)?.message}`,
    };
  }
}
